const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');

// Load the actual TypeScript data/calculators without adding a test dependency.
require.extensions['.ts'] = (module, filename) => {
  module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
  }).outputText, filename);
};
const r = require('../utils/resistorCalculators.ts');
const { IC_DATABASE } = require('../data/ics.ts');
const color = name => r.RESISTOR_COLORS.findIndex(c => c.name === name);
const four = (...names) => r.calculate4Band(...names.map(color));
assert.equal(four('Brown', 'Black', 'Red', 'Gold').valueNum, 1000);
assert.equal(four('Yellow', 'Violet', 'Orange', 'Silver').valueNum, 47000);
assert.equal(four('Brown', 'Black', 'Pink', 'Gold').valueNum, 0.01);
assert.equal(four('Brown', 'Black', 'Pink', 'Gold').formatted, '0.01 Ω');
assert.equal(r.calculate3Band(color('Blue'), color('Gray'), color('Red')).toleranceStr, '±20%');
assert.equal(r.calculate5Band(...['Red', 'Yellow', 'White', 'Orange', 'Brown'].map(color)).valueNum, 249000);
const six = r.calculate6Band(...['Brown', 'Black', 'Black', 'Red', 'Brown', 'Red'].map(color));
assert.equal(six.valueNum, 10000);
assert.equal(six.temperatureCoefficient, 50);
assert.equal(four('Brown', 'Black', 'Red', 'Orange').toleranceStr, '±0.05%');
assert.equal(four('Brown', 'Black', 'Red', 'Yellow').toleranceStr, '±0.02%');
assert.equal(four('Brown', 'Black', 'Red', 'Gray').toleranceStr, '±0.01%');
assert.equal(r.calculate4Band(...['Brown', 'Black', 'Red', 'Gray'].map(color), 'legacy').toleranceStr, '±0.05%');
assert.throws(() => r.calculate4Band(...['Brown', 'Black', 'Red', 'Orange'].map(color), 'legacy'), RangeError);
assert.throws(() => r.calculate4Band(99, 0, 2, 10), RangeError);
assert.equal(four('Black', 'Brown', 'Red', 'Gold').valueNum, 100);
assert.deepEqual(four('Black', 'Black', 'Gold', 'Gold'), { valueNum: 0, formatted: '0 Ω (Jumper)', toleranceStr: '±5%' });
assert.equal(r.calculate5Band(...['Black', 'Brown', 'Black', 'Silver', 'Gold'].map(color)).valueNum, 0.1);
assert.deepEqual(r.calculateZeroOhm(), { valueNum: 0, formatted: '0 Ω (Jumper)', toleranceStr: '' });
// Every IEC multiplier and TCR colour is available, including pink and black.
assert.deepEqual(r.getResistorColors('iec').filter(c => c.multiplier !== undefined).map(c => c.name),
  ['Black', 'Brown', 'Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Violet', 'Gray', 'White', 'Gold', 'Silver', 'Pink']);
for (const [name, expected] of Object.entries({ Black: 250, Brown: 100, Red: 50, Orange: 15, Yellow: 25, Green: 20, Blue: 10, Violet: 5, Gray: 1 })) {
  assert.equal(r.calculate6Band(...['Brown', 'Black', 'Black', 'Red', 'Brown', name].map(color)).temperatureCoefficient, expected);
}
assert.throws(() => four('Gold', 'Brown', 'Red', 'Gold'), RangeError);
assert.throws(() => r.calculate5Band(...['Brown', 'Black', 'Black', 'Red', 'None'].map(color)), RangeError);
assert.throws(() => r.calculate6Band(...['Brown', 'Black', 'Black', 'Red', 'Brown', 'Gold'].map(color)), RangeError);

const ic = id => {
  const result = IC_DATABASE.find(x => x.id === id);
  assert.ok(result, id);
  return result;
};
const names = id => ic(id).pins.map(p => p.name).join(' ');
assert.equal(names('lm339'), '2OUT 1OUT VCC 1IN- 1IN+ 2IN- 2IN+ 3IN- 3IN+ 4IN- 4IN+ GND 4OUT 3OUT');
assert.equal(names('tl494'), '1IN+ 1IN- FEEDBACK DTC CT RT GND C1 E1 E2 C2 VCC OUTPUT_CTRL REF 2IN- 2IN+');
assert.equal(names('ne555'), 'GND TRIG OUT RESET CONT THRES DISCH VCC');
assert.equal(names('lm317'), 'ADJ OUT IN');
assert.equal(names('lm337'), 'ADJ IN OUT');
assert.equal(names('7905'), 'GND IN OUT');
assert.equal(names('max485'), 'RO /RE DE DI GND A B VCC');
assert.equal(names('uln2003'), '1B 2B 3B 4B 5B 6B 7B GND COM 7C 6C 5C 4C 3C 2C 1C');
assert.equal(names('uln2803'), '1B 2B 3B 4B 5B 6B 7B 8B GND COM 8C 7C 6C 5C 4C 3C 2C 1C');
assert.equal(ic('lm321').totalPins, 5);
assert.equal(ic('lm321').diagramLayout, 'none');
assert.equal(ic('lm339').category, 'Comparator');
assert.notEqual(names('cd4011'), names('74hc00'));
assert.equal(new Set(IC_DATABASE.map(x => x.id)).size, IC_DATABASE.length);
for (const item of IC_DATABASE) {
  if (item.verification === 'pending') {
    assert.equal(item.pins.length, 0, `${item.id}: no guessed pin table`);
    assert.equal(item.totalPins, 0);
    assert.equal(item.diagramLayout, 'none');
    continue;
  }
  assert.ok(item.datasheetUrl?.startsWith('https://'), item.id);
  assert.ok(item.dipPackageName || item.smdPackageName, item.id);
  assert.equal(item.pins.length, item.totalPins, item.id);
  assert.deepEqual(item.pins.map(p => p.pin), Array.from({ length: item.totalPins }, (_, i) => i + 1), item.id);
  assert.ok(item.pins.every(p => p.descEn && p.descHi), item.id);
  if (item.diagramLayout === 'dual-row') assert.equal(item.totalPins % 2, 0, item.id);
}
console.log(`Electronics regression checks passed. ${IC_DATABASE.filter(x => x.verification === 'verified').length} reviewed ICs; ${IC_DATABASE.filter(x => x.verification === 'pending').length} explicitly pending.`);
