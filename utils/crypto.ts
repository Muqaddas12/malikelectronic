/**
 * Native Zero-Dependency Cryptographic Module for URL Protection.
 *
 * Designed to prevent plain-text URL extraction from the compiled app / APK.
 * Features:
 *  - 100% Pure TypeScript / JavaScript — zero third-party npm packages.
 *  - High-security RC4-Drop1024 stream cipher with 64-bit dynamic per-payload salt.
 *  - Key obfuscation: Encryption key is assembled dynamically from discrete byte fragments.
 *  - Custom self-contained Base64 encoder/decoder (runs universally in Node & React Native).
 *  - Graceful fallback: Non-encrypted URLs pass through unchanged.
 */

// Obfuscated key fragments (split so the raw key never appears as a string literal in decompiled code)
const K1 = [0x54, 0x65, 0x63, 0x68, 0x4D, 0x61, 0x6C, 0x69]; // TechMali
const K2 = [0x6B, 0x45, 0x6C, 0x65, 0x63, 0x74, 0x72, 0x6F]; // kElectro
const K3 = [0x6E, 0x69, 0x63, 0x53, 0x65, 0x63, 0x75, 0x72]; // nicSecur
const K4 = [0x65, 0x50, 0x43, 0x42, 0x32, 0x30, 0x32, 0x36]; // ePCB2026

function getMasterKey(): number[] {
  return [...K1, ...K2, ...K3, ...K4];
}

const PREFIX = 'enc_v1$';

// Self-contained Base64 implementation (zero dependency, universal across Node.js & React Native)
const B64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

function bytesToBase64(bytes: number[]): string {
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

function base64ToBytes(str: string): number[] {
  const bytes: number[] = [];
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

function stringToUtf8Bytes(str: string): number[] {
  const bytes: number[] = [];
  for (let i = 0; i < str.length; i++) {
    let charCode = str.charCodeAt(i);
    if (charCode < 0x80) {
      bytes.push(charCode);
    } else if (charCode < 0x800) {
      bytes.push(0xc0 | (charCode >> 6));
      bytes.push(0x80 | (charCode & 0x3f));
    } else if (charCode < 0xd800 || charCode >= 0xe000) {
      bytes.push(0xe0 | (charCode >> 12));
      bytes.push(0x80 | ((charCode >> 6) & 0x3f));
      bytes.push(0x80 | (charCode & 0x3f));
    } else {
      // Surrogate pair
      i++;
      charCode = 0x10000 + (((charCode & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff));
      bytes.push(0xf0 | (charCode >> 18));
      bytes.push(0x80 | ((charCode >> 12) & 0x3f));
      bytes.push(0x80 | ((charCode >> 6) & 0x3f));
      bytes.push(0x80 | (charCode & 0x3f));
    }
  }
  return bytes;
}

function utf8BytesToString(bytes: number[]): string {
  let result = '';
  let i = 0;
  const len = bytes.length;
  while (i < len) {
    const b1 = bytes[i++];
    if (b1 < 0x80) {
      result += String.fromCharCode(b1);
    } else if (b1 > 0xbf && b1 < 0xe0) {
      const b2 = bytes[i++];
      result += String.fromCharCode(((b1 & 0x1f) << 6) | (b2 & 0x3f));
    } else if (b1 > 0xdf && b1 < 0xf0) {
      const b2 = bytes[i++];
      const b3 = bytes[i++];
      result += String.fromCharCode(((b1 & 0x0f) << 12) | ((b2 & 0x3f) << 6) | (b3 & 0x3f));
    } else {
      const b2 = bytes[i++];
      const b3 = bytes[i++];
      const b4 = bytes[i++];
      let code =
        ((b1 & 0x07) << 18) |
        ((b2 & 0x3f) << 12) |
        ((b3 & 0x3f) << 6) |
        (b4 & 0x3f);
      code -= 0x10000;
      result += String.fromCharCode(0xd800 + (code >> 10));
      result += String.fromCharCode(0xdc00 + (code & 0x3ff));
    }
  }
  return result;
}

/**
 * Keystream Generator (RC4-Drop1024 with Salt)
 */
function processCipher(data: number[], salt: number[]): number[] {
  const masterKey = getMasterKey();
  const key = [...masterKey, ...salt];
  const keyLen = key.length;

  // Key-Scheduling Algorithm (KSA)
  const S: number[] = new Array(256);
  for (let i = 0; i < 256; i++) {
    S[i] = i;
  }

  let j = 0;
  for (let i = 0; i < 256; i++) {
    j = (j + S[i] + key[i % keyLen]) % 256;
    const temp = S[i];
    S[i] = S[j];
    S[j] = temp;
  }

  // Drop first 1024 keystream bytes to eliminate initial state bias
  let x = 0;
  let y = 0;
  for (let drop = 0; drop < 1024; drop++) {
    x = (x + 1) % 256;
    y = (y + S[x]) % 256;
    const temp = S[x];
    S[x] = S[y];
    S[y] = temp;
  }

  // Pseudo-Random Generation Algorithm (PRGA) & XOR transformation
  const output: number[] = new Array(data.length);
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

/**
 * Encrypt a plain-text URL using native zero-dependency crypto.
 * Returns a URL-safe prefixed string: "enc_v1$<base64-payload>"
 */
export function encryptUrl(plainText: string): string {
  if (!plainText) return '';

  // Generate 8-byte dynamic salt
  const salt: number[] = [];
  for (let i = 0; i < 8; i++) {
    salt.push(Math.floor(Math.random() * 256));
  }

  const plainBytes = stringToUtf8Bytes(plainText);
  const cipherBytes = processCipher(plainBytes, salt);

  // Combine: [8 bytes Salt] + [Cipher Bytes]
  const combined = [...salt, ...cipherBytes];
  return `${PREFIX}${bytesToBase64(combined)}`;
}

/**
 * Decrypt a protected URL.
 * Gracefully returns non-encrypted URLs unchanged.
 */
export function decryptUrl(cipherText?: string): string {
  if (!cipherText) return '';
  if (!cipherText.startsWith(PREFIX)) {
    // Not encrypted, return as-is
    return cipherText;
  }

  try {
    const rawBase64 = cipherText.slice(PREFIX.length);
    const combined = base64ToBytes(rawBase64);
    if (combined.length < 9) return '';

    const salt = combined.slice(0, 8);
    const cipherBytes = combined.slice(8);

    const decryptedBytes = processCipher(cipherBytes, salt);
    return utf8BytesToString(decryptedBytes);
  } catch (err) {
    console.error('Error decrypting URL:', err);
    return '';
  }
}

