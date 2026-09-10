const { decryptUrl } = require('../utils/crypto.ts');
const luminous = require('../config/Luminous.json');
const microtek = require('../config/Microtek.json');
const sukam = require('../config/sukam.json');

console.log('--- Testing In-Memory Decryption of Config URLs ---');

function testLink(name, encryptedLink) {
  const decrypted = decryptUrl(encryptedLink);
  const match = decrypted.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  const fileId = match ? match[1] : null;
  const cdnUrl = fileId ? `https://lh3.googleusercontent.com/d/${fileId}` : null;
  
  if (!cdnUrl) {
    console.error(`❌ FAILED for ${name}: Decrypted: "${decrypted}"`);
    process.exit(1);
  }
  console.log(`✅ [${name}] -> File ID: ${fileId} -> ${cdnUrl}`);
}

// Luminous
testLink('Luminous Pin 4', luminous['Luminous-Eco-Watt-Plus'][0].link);
testLink('Luminous Pin 3', luminous['Luminous-Eco-Watt-Plus'][1].link);

// Microtek
testLink('Microtek EB Pin 3', microtek['microtek-eb-semi-sine-wave'][0].link);
testLink('Microtek EB Micro', microtek['microtek-eb-semi-sine-wave'][1].link);
testLink('Microtek Square Micro', microtek['microtek-eb-square-wave'][0].link);
testLink('Microtek 24x7 Micro', microtek['microtek-24x7-Non-Smd'][0].link);

// Su-Kam
testLink('Su-Kam Shark Dead', sukam['sukam-shark'][0].link);
testLink('Su-Kam Shark Changeover', sukam['sukam-shark'][1].link);
testLink('Su-Kam Shark Battery Low', sukam['sukam-shark'][2].link);
testLink('Su-Kam Shark Relay', sukam['sukam-shark'][3].link);
testLink('Su-Kam Shark Fan', sukam['sukam-shark'][4].link);
testLink('Su-Kam Shark Micro', sukam['sukam-shark'][5].link);
testLink('Su-Kam Shiny Changeover', sukam['sukam-shiny'][0].link);
testLink('Su-Kam Shiny Micro', sukam['sukam-shiny'][1].link);

console.log('\nAll 14 URLs successfully decrypted in memory and resolved to Google Direct CDN URLs!');
