const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
}).outputText, filename);
const originalLoad = Module._load;
Module._load = function (request, parent, isMain) {
  if (request.startsWith('@/assets/')) return 1;
  if (request.startsWith('@/')) request = path.resolve(__dirname, '..', request.slice(2));
  return originalLoad.call(this, request, parent, isMain);
};
try {
  const { inverterFaultsMap, getInverterFault, getFaultsForInverter } = require('../data/inverterfaults.ts');
  const { decryptUrl } = require('../utils/crypto.ts');
  const { formatDriveImageUrl, getDiagramLink } = require('../data/diagrams.ts');
  let count = 0;
  for (const [inverterId, faults] of Object.entries(inverterFaultsMap)) {
    for (const fault of Object.values(faults)) {
      if (!fault.diagramLink?.startsWith('enc_v1$')) continue;
      const expected = decryptUrl(getDiagramLink(inverterId, fault.id) ?? fault.diagramLink);
      for (const language of ['en', 'hi']) {
        const single = getInverterFault(inverterId, fault.id, language);
        const listed = getFaultsForInverter(inverterId, language).find(x => x.id === fault.id);
        assert.equal(single.diagramLink, expected);
        assert.equal(listed.diagramLink, expected);
        assert.ok(single.diagramImage, 'encrypted fallback still has an image');
        if (!fault.diagramImage) assert.equal(single.diagramImage.uri, formatDriveImageUrl(expected));
      }
      count++;
    }
  }
  assert.equal(count, 8);
  console.log(`All ${count} encrypted fault links resolve through list/detail helpers in both languages.`);
} finally {
  Module._load = originalLoad;
}
