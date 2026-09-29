const fs = require('node:fs');
const path = require('node:path');
const { diagramFiles, linkLiterals, verifyUrl } = require('./diagram-url-tools.cjs');
let count = 0;
for (const file of diagramFiles()) {
  for (const { value } of linkLiterals(file, fs.readFileSync(file, 'utf8'))) {
    if (!value.startsWith('enc_v1$')) throw new Error(`Unencrypted diagram link in ${path.basename(file)}`);
    verifyUrl(value);
    count++;
  }
}
if (!count) throw new Error('No diagram links found');
console.log(`All ${count} diagram links are encrypted and decrypt to valid Drive file URLs.`);
