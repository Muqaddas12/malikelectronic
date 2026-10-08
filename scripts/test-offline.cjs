const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const Module = require('node:module');
require.extensions['.ts'] = (m, f) => m._compile(ts.transpileModule(fs.readFileSync(f, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true } }).outputText, f);
const files = new Map();
let failure = true;
let downloads = 0;
const rows = [{ faultId: 'a', link: 'https://example.com/a' }, { faultId: 'b', link: 'https://example.com/b' }];
const original = Module._load;
Module._load = function(request, parent, main) {
  if (request === 'react-native') return { Platform: { OS: 'android' }, Image: { getSize: (uri, ok, fail) => files.get(uri) === 'invalid' ? fail(new Error('not an image')) : ok(1000, 1000) } };
  if (request === '@/data/diagramCatalog') return { getConfiguredDiagrams: () => rows };
  if (request === '@/data/diagrams') return { formatDriveImageUrl: value => value };
  if (request === 'expo-file-system/legacy') return {
    documentDirectory: 'file:///app/',
    makeDirectoryAsync: async () => {},
    getInfoAsync: async uri => ({ exists: files.has(uri), size: files.has(uri) ? 128 : 0 }),
    readAsStringAsync: async uri => files.get(uri),
    writeAsStringAsync: async (uri, value) => files.set(uri, value),
    deleteAsync: async uri => files.delete(uri),
    moveAsync: async ({ from, to }) => { files.set(to, files.get(from)); files.delete(from); },
    createDownloadResumable: (remote, target) => ({ cancelAsync: async () => {}, downloadAsync: async () => { downloads++; files.set(target, remote.endsWith('/b') && failure ? 'invalid' : 'valid'); return { status: 200 }; } }),
  };
  return original.call(this, request, parent, main);
};
(async () => {
  const o = require('../utils/offlineDiagrams.ts');
  await o.loadOffline();
  assert.deepEqual(await o.downloadModel('model'), { total: 2, failed: 1 });
  assert.equal(o.offlineCount('model'), 1);
  assert.ok(o.offlineSource('model', 'a', {}).uri.startsWith('file:///app/'));
  assert.equal(o.offlineSource('model', 'b', 'remote'), 'remote');
  assert.ok(![...files.keys()].some(k => k.endsWith('.partial')));
  failure = false;
  assert.deepEqual(await o.downloadModel('model'), { total: 2, failed: 0 });
  assert.equal(downloads, 3, 'retry must retain the completed image');
  assert.equal(o.offlineCount('model'), 2);
  rows[0].link = 'https://example.com/updated';
  assert.equal(o.offlineSource('model', 'a', 'updated'), 'updated', 'changed URLs must invalidate stale files');
  assert.equal(o.offlineCount('model'), 1);
  await o.removeModel('model');
  assert.equal(o.offlineCount('model'), 0);
  assert.ok(![...files.keys()].some(k => k.endsWith('.img')));
  console.log('Offline validation, partial retry, stale URLs and removal checks passed.');
})().catch(e => { console.error(e); process.exitCode = 1; }).finally(() => { Module._load = original; });
