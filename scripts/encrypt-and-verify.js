const fs = require('node:fs');
const path = require('node:path');
const { encryptUrl, diagramFiles, linkLiterals, verifyUrl } = require('./diagram-url-tools.cjs');
let encrypted = 0;
let verified = 0;
const changes = [];
// Validate all files before changing any; preserve surrounding user edits.
for (const file of diagramFiles()) {
  const original = fs.readFileSync(file, 'utf8');
  let text = original;
  for (const link of linkLiterals(file, original).reverse()) {
    const plain = verifyUrl(link.value);
    verified++;
    if (link.value.startsWith('enc_v1$')) continue;
    const encoded = encryptUrl(plain);
    if (verifyUrl(encoded) !== plain) throw new Error(`Round-trip failed in ${path.basename(file)}`);
    text = text.slice(0, link.start) + JSON.stringify(encoded) + text.slice(link.end);
    encrypted++;
  }
  if (text !== original) changes.push({ file, original, text });
}
for (const { file, original } of changes) {
  if (fs.readFileSync(file, 'utf8') !== original) throw new Error(`File changed during encryption: ${file}`);
}
for (const { file, text } of changes) fs.writeFileSync(file, text);
console.log(`Encrypted ${encrypted} new diagram links in ${changes.length} files; verified ${verified} links with the app runtime.`);
