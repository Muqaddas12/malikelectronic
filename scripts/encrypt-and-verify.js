const fs = require('fs');
const path = require('path');

// Port the crypto algorithm from utils/crypto.ts to vanilla JS for this script
const K1 = [0x54, 0x65, 0x63, 0x68, 0x4D, 0x61, 0x6C, 0x69];
const K2 = [0x6B, 0x45, 0x6C, 0x65, 0x63, 0x74, 0x72, 0x6F];
const K3 = [0x6E, 0x69, 0x63, 0x53, 0x65, 0x63, 0x75, 0x72];
const K4 = [0x65, 0x50, 0x43, 0x42, 0x32, 0x30, 0x32, 0x36];

function getMasterKey() {
  return [...K1, ...K2, ...K3, ...K4];
}

const PREFIX = 'enc_v1$';
const B64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

function bytesToBase64(bytes) {
  let result = '';
  const len = bytes.length;
  for (let i = 0; i < len; i += 3) {
    const b0 = bytes[i];
    const b1 = i + 1 < len ? bytes[i + 1] : 0;
    const b2 = i + 2 < len ? bytes[i + 2] : 0;
    const triplet = (b0 << 16) | (b1 << 8) | b2;
    result += B64_CHARS[(triplet >> 18) & 0x3f];
    result += B64_CHARS[(triplet >> 12) & 0x3f];
    result += i + 1 < len ? B64_CHARS[(triplet >> 6) & 0x3f] : '=';
    result += i + 2 < len ? B64_CHARS[triplet & 0x3f] : '=';
  }
  return result;
}

function base64ToBytes(str) {
  const bytes = [];
  const cleanStr = str.replace(/=+$/, '');
  const len = cleanStr.length;
  for (let i = 0; i < len; i += 4) {
    const c0 = B64_CHARS.indexOf(cleanStr[i]);
    const c1 = i + 1 < len ? B64_CHARS.indexOf(cleanStr[i + 1]) : 0;
    const c2 = i + 2 < len ? B64_CHARS.indexOf(cleanStr[i + 2]) : 0;
    const c3 = i + 3 < len ? B64_CHARS.indexOf(cleanStr[i + 3]) : 0;
    const triplet = (c0 << 18) | (c1 << 12) | (c2 << 6) | c3;
    bytes.push((triplet >> 16) & 0xff);
    if (i + 2 < len) bytes.push((triplet >> 8) & 0xff);
    if (i + 3 < len) bytes.push(triplet & 0xff);
  }
  return bytes;
}

function stringToUtf8Bytes(str) {
  return Buffer.from(str, 'utf8');
}

function utf8BytesToString(bytes) {
  return Buffer.from(bytes).toString('utf8');
}

function processCipher(data, salt) {
  const masterKey = getMasterKey();
  const key = [...masterKey, ...salt];
  const keyLen = key.length;

  const S = new Array(256);
  for (let i = 0; i < 256; i++) S[i] = i;

  let j = 0;
  for (let i = 0; i < 256; i++) {
    j = (j + S[i] + key[i % keyLen]) % 256;
    const temp = S[i];
    S[i] = S[j];
    S[j] = temp;
  }

  let x = 0;
  let y = 0;
  for (let drop = 0; drop < 1024; drop++) {
    x = (x + 1) % 256;
    y = (y + S[x]) % 256;
    const temp = S[x];
    S[x] = S[y];
    S[y] = temp;
  }

  const output = new Array(data.length);
  for (let k = 0; k < data.length; k++) {
    x = (x + 1) % 256;
    y = (y + S[x]) % 256;
    const temp = S[x];
    S[x] = S[y];
    S[y] = temp;
    const keystreamByte = S[(S[x] + S[y]) % 256];
    output[k] = data[k] ^ keystreamByte;
  }
  return output;
}

function encryptUrl(plainText) {
  if (!plainText) return '';
  const salt = [];
  for (let i = 0; i < 8; i++) salt.push(Math.floor(Math.random() * 256));
  const plainBytes = Array.from(stringToUtf8Bytes(plainText));
  const cipherBytes = processCipher(plainBytes, salt);
  const combined = [...salt, ...cipherBytes];
  return `${PREFIX}${bytesToBase64(combined)}`;
}

function decryptUrl(cipherText) {
  if (!cipherText || !cipherText.startsWith(PREFIX)) return cipherText;
  const rawBase64 = cipherText.slice(PREFIX.length);
  const combined = base64ToBytes(rawBase64);
  const salt = combined.slice(0, 8);
  const cipherBytes = combined.slice(8);
  const decryptedBytes = processCipher(cipherBytes, salt);
  return utf8BytesToString(decryptedBytes);
}

// Target config files
const configs = [
  path.join(__dirname, '../config/Luminous.json'),
  path.join(__dirname, '../config/Microtek.json'),
  path.join(__dirname, '../config/sukam.json'),
];

let totalEncrypted = 0;
let totalVerified = 0;

for (const filePath of configs) {
  console.log(`Processing: ${path.basename(filePath)}`);
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Traverse and encrypt all 'link' fields
  function processObject(obj) {
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        processObject(obj[key]);
      } else if (key === 'link' && typeof obj[key] === 'string' && obj[key].length > 0) {
        const originalUrl = obj[key];
        if (originalUrl.startsWith(PREFIX)) {
          console.log(`  Already encrypted: ${originalUrl.slice(0, 20)}...`);
          continue;
        }
        const encrypted = encryptUrl(originalUrl);
        const decrypted = decryptUrl(encrypted);

        if (decrypted !== originalUrl) {
          throw new Error(`Decryption verification failed for ${originalUrl} != ${decrypted}`);
        }

        obj[key] = encrypted;
        totalEncrypted++;
        totalVerified++;
        console.log(`  [OK] Encrypted & verified: ${originalUrl.slice(0, 35)}... -> ${encrypted.slice(0, 28)}...`);
      }
    }
  }

  processObject(content);
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');
}

console.log(`\nSuccess! Encrypted & verified ${totalEncrypted} URLs across all 3 config files.`);

