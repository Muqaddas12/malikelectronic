const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const React = require('react');
const { act, create } = require('react-test-renderer');
global.IS_REACT_ACT_ENVIRONMENT = true;
for (const extension of ['.ts', '.tsx']) require.extensions[extension] = (module, filename) => {
  module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true, jsx: ts.JsxEmit.ReactJSX },
  }).outputText, filename);
};
const rn = {
  Platform: { OS: 'android' }, NativeModules: {},
  Linking: { openURL: async () => {} }, Alert: { alert: (...args) => alerts.push(args) },
  AppState: { currentState: 'active', addEventListener: (_, callback) => { listener = callback; return { remove: () => { listener = null; } }; } },
};
let alerts = [], listener, context, checks = 0, providerCheck;
const originalLoad = Module._load;
Module._load = function (request, parent, isMain) {
  if (request === 'react-native') return rn;
  if (request === '@/context/LanguageContext') return { useLanguage: () => ({ isHindi: false }) };
  if (request === '@/components/PlayStoreUpdateModal') return { __esModule: true, default: 'UpdateModal' };
  if (request === '@/utils/appUpdateService') return { checkPlayStoreUpdate: () => { checks++; return providerCheck(); } };
  if (request.startsWith('@/')) request = path.resolve(__dirname, '..', request.slice(2));
  return originalLoad.call(this, request, parent, isMain);
};
const service = require('../utils/appUpdateService.ts');
const provider = require('../context/UpdateContext.tsx');
function Consumer() { context = provider.useAppUpdate(); return null; }
const update = { status: 'checked', updateAvailable: true, currentVersion: '1.0.1', currentVersionCode: 6, versionCode: 7, latestVersion: '', playStoreUrl: service.PLAY_STORE_WEB_URL };

(async () => {
  rn.NativeModules.PlayStoreUpdate = { checkForUpdate: async () => ({ ...update }) };
  assert.equal((await service.checkPlayStoreUpdate()).versionCode, 7);
  rn.NativeModules.PlayStoreUpdate.checkForUpdate = async () => ({ ...update, updateAvailable: false, versionCode: 0 });
  assert.equal((await service.checkPlayStoreUpdate()).updateAvailable, false);
  rn.NativeModules.PlayStoreUpdate.checkForUpdate = async () => ({ ...update, versionCode: 6 });
  await assert.rejects(service.checkPlayStoreUpdate(), /Invalid/);
  rn.NativeModules.PlayStoreUpdate.checkForUpdate = async () => { throw Error('offline'); };
  await assert.rejects(service.checkPlayStoreUpdate(), /offline/);
  delete rn.NativeModules.PlayStoreUpdate;
  assert.equal((await service.checkPlayStoreUpdate()).status, 'unsupported');
  rn.Platform.OS = 'web';
  assert.equal((await service.checkPlayStoreUpdate()).status, 'unsupported');
  rn.Platform.OS = 'android';
  const opened = [];
  rn.Linking.openURL = async url => { opened.push(url); if (url.startsWith('market:')) throw Error('no market'); };
  await service.openPlayStore('https://untrusted.example');
  assert.deepEqual(opened, [service.PLAY_STORE_MARKET_URI, service.PLAY_STORE_WEB_URL]);
  rn.Linking.openURL = async () => { throw Error('no browser'); };
  await assert.rejects(service.openPlayStore(), /no browser/);

  providerCheck = async () => update;
  let root;
  await act(() => { root = create(React.createElement(provider.UpdateProvider, null, React.createElement(Consumer))); });
  await act(async () => { await new Promise(resolve => setTimeout(resolve, 1600)); });
  assert.equal(checks, 1, 'startup checks once');
  assert.equal(root.root.findByType('UpdateModal').props.visible, true);
  await act(() => context.hideUpdateModal());
  assert.equal(root.root.findByType('UpdateModal').props.visible, false);
  await act(async () => { listener('background'); listener('active'); });
  assert.equal(checks, 2);
  assert.equal(root.root.findByType('UpdateModal').props.visible, true, 'dismissal does not suppress next foreground');
  await act(() => listener('active'));
  assert.equal(checks, 2, 'duplicate active does not recheck');
  let resolveCheck;
  providerCheck = () => new Promise(resolve => { resolveCheck = resolve; });
  await act(() => { void context.checkForUpdates(); void context.checkForUpdates(); });
  assert.equal(checks, 3, 'concurrent requests deduplicated');
  await act(async () => { resolveCheck({ ...update, updateAvailable: false }); });
  assert.equal(context.updateInfo, null);
  assert.equal(root.root.findByType('UpdateModal').props.visible, false, 'current version clears stale notice');
  providerCheck = async () => { throw Error('offline'); };
  await act(() => context.checkForUpdates(true));
  assert.equal(alerts.at(-1)[0], 'Check Failed', 'offline must not claim up-to-date');
  await act(() => root.unmount());
  assert.equal(listener, null);

  const plugin = require('../plugins/withPlayStoreUpdate');
  const gradle = 'dependencies {\n}';
  assert.equal(plugin.addDependency(plugin.addDependency(gradle)), plugin.addDependency(gradle));
  const application = 'PackageList(this).packages.apply {\n}';
  assert.equal(plugin.registerPackage(plugin.registerPackage(application)), plugin.registerPackage(application));
  console.log('Play Store service, foreground reminders, deduplication, failure handling and plugin tests passed.');
})().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => { Module._load = originalLoad; });
