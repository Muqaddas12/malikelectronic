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
  // A newly flagged config diagram must reach both model and sheet badges.
  const microtekConfig = require('../config/Microtek.json');
  const flaggedRow = Object.values(microtekConfig)[0][0];
  flaggedRow.isNew = true;
  const { inverterFaultsMap, getInverterFault, getFaultsForInverter } = require('../data/inverterfaults.ts');
  const { decryptUrl } = require('../utils/crypto.ts');
  const { formatDriveImageUrl, getDiagramLink } = require('../data/diagrams.ts');
  const { diagramCatalog } = require('../data/diagramCatalog.ts');
  const { parseDiagramRows } = require('../data/diagramCatalog.ts');
  assert.deepEqual(parseDiagramRows(null), []);
  assert.deepEqual(parseDiagramRows([null, {}, { id: 1, link: 'https://example.com' }, { name: 'Test', link: 42 }]), []);
  assert.equal(parseDiagramRows([{ id: 1, name: 'Test', link: 'https://example.com' }, { id: 1, name: 'Test', link: 'https://example.com' }]).length, 1);
  for (const filename of ['Luminous.json', 'Microtek.json', 'sukam.json']) {
    const groups = require('../config/' + filename);
    for (const [name, rows] of Object.entries(groups)) {
      assert.ok(Array.isArray(rows), `${filename}/${name}: rows must be an array`);
      assert.equal(parseDiagramRows(rows).length, rows.length, `${filename}/${name}: malformed or duplicate diagram entry`);
    }
  }
  const { inverters } = require('../data/inverters.ts');
  const { getMicrocontrollerDoc } = require('../data/microcontroller.ts');
  for (const model of diagramCatalog) {
    const inverter = inverters.find(item => item.id === model.id);
    assert.ok(inverter, `Missing model ${model.id}`);
    assert.equal(inverter.newDiagramsCount, getFaultsForInverter(model.id).filter(fault => fault.isNew).length);
    assert.equal(new Set(model.diagrams.map(row => row.faultId)).size, model.diagrams.length);
    for (const row of model.diagrams) {
      assert.ok(inverter.faults.includes(row.faultId), `Missing sheet ${model.id}/${row.faultId}`);
      for (const language of ['en', 'hi']) {
        const listed = getFaultsForInverter(model.id, language).find(item => item.id === row.faultId);
        const detail = getInverterFault(model.id, row.faultId, language);
        assert.equal(listed.diagramLink, decryptUrl(row.link));
        assert.equal(detail.diagramLink, listed.diagramLink);
        if (row.isNew === true) assert.equal(detail.isNew, true);
        if (row.usedPins) assert.equal(detail.usedPins, row.usedPins);
      }
      if (row.faultId === 'microcontroller-pin-details') {
        assert.equal(getMicrocontrollerDoc(model.id).pages[0].uri, formatDriveImageUrl(row.link));
      }
    }
  }
  for (const id of ['luminous-lb', 'luminous-shakti-charge', 'luminous-eco-watt']) assert.ok(inverters.some(model => model.id === id));
  assert.ok(inverters.find(model => model.id === 'luminous-lb').newDiagramsCount > 0);
  assert.equal(inverters.find(model => model.id === 'luminous-shakti-charge').capacity, '900 VA');
  assert.equal(inverters.find(model => model.id === 'luminous-shakti-charge').batteryVoltage, '12V');
  assert.equal(inverters.find(model => model.id === 'luminous-eco-watt').capacity, '700–1050 VA');
  assert.equal(inverters.find(model => model.id === 'luminous-eco-watt').batteryVoltage, '12V');
  assert.equal(inverters.find(model => model.id === 'luminous-lb').capacity, '675–1075 VA');
  assert.equal(inverters.find(model => model.id === 'luminous-lb').batteryVoltage, '12V');
  const luminous = require('../config/Luminous.json');
  assert.equal(getDiagramLink('LuminousEcoWatt', 'low-battery'), decryptUrl(luminous['Luminous-Eco-Watt-Plus'].find(row => row.faultId === 'low-battery').link));
  assert.equal(getDiagramLink('microtek-square-wave', 'unknown-fault'), undefined);
  // Reordering config rows must not remap existing bookmarks to another sheet.
  const before = getDiagramLink('LuminousEcoWatt', 'main-feedback');
  luminous['Luminous-Eco-Watt-Plus'].reverse();
  delete require.cache[require.resolve('../data/diagramCatalog.ts')];
  delete require.cache[require.resolve('../data/diagrams.ts')];
  assert.equal(require('../data/diagrams.ts').getDiagramLink('LuminousEcoWatt', 'main-feedback'), before);
  luminous['Luminous-Eco-Watt-Plus'].reverse();
  console.log(`All ${diagramCatalog.length} configured model groups and their sheets resolve in both languages.`);
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
  const sukam = require('../config/sukam.json');
  const updateRow = Object.values(sukam).flat().find(row => row.faultId === 'mosfet-drive');
  for (const enabled of [true, false]) {
    updateRow.isNew = enabled;
    delete require.cache[require.resolve('../data/diagramCatalog.ts')];
    delete require.cache[require.resolve('../data/diagramUpdates.ts')];
    const updates = require('../data/diagramUpdates.ts').DIAGRAM_UPDATES;
    const matches = updates.filter(u => u.inverterId === 'sukam-shark-inverter' && u.faultId === 'mosfet-drive');
    assert.equal(matches.length, enabled ? 1 : 0);
  }
} finally {
  Module._load = originalLoad;
}
