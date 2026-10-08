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
let language = 'en';
let themeMode = 'dark';
const originalLoad = Module._load;
Module._load = function (request, parent, isMain) {
  if (request === 'expo-router') return { useLocalSearchParams: () => ({}) };
  if (request === 'expo-clipboard') return { setStringAsync: async () => {} };
  if (request === '@react-native-async-storage/async-storage') return { getItem: async () => null, setItem: async () => {} };
  if (request === 'react-native') return {
    Modal: props => props.visible ? React.createElement('Modal', props, props.children) : null, View: 'View', Text: 'Text', Pressable: 'Pressable', ScrollView: 'ScrollView', StatusBar: 'StatusBar', TextInput: 'TextInput',
    Platform: { OS: 'android', select: options => options.android ?? options.default },
    Keyboard: { dismiss() {} }, useWindowDimensions: () => ({ width: 390, height: 844 }),
    StyleSheet: { create: value => value }, Dimensions: { get: () => ({ width: 390 }) },
    BackHandler: { addEventListener: () => ({ remove() {} }) }, Linking: { openURL: async () => {} }, Alert: { alert() {} },
    FlatList: props => React.createElement('View', null, props.ListHeaderComponent, ...props.data.map(item => React.createElement(React.Fragment, { key: item.id }, props.renderItem({ item })))),
  };
  if (request === 'react-native-safe-area-context') return { SafeAreaView: 'SafeAreaView' };
  if (request === '@/components/AppHeader') return { __esModule: true, default: 'AppHeader' };
  if (request === '@/context/ThemeContext') return { useTheme: () => ({ colors: require('../constants/theme.ts').palettes[themeMode], mode: themeMode }) };
  if (request === '@/context/LanguageContext') return { useLanguage: () => ({ language }) };
  if (request === '@/hooks/useSafeNavigate') return { useSafeNavigate: () => ({ safeBack() {} }) };
  if (request.startsWith('@/')) request = path.resolve(__dirname, '..', request.slice(2));
  return originalLoad.call(this, request, parent, isMain);
};
const Calculator = require('../app/tools/dip-calculator.tsx').default;
const Guide = require('../app/tools/ic-guide.tsx').default;
const visible = root => JSON.stringify(root.toJSON());
const textContent = node => typeof node === 'string' || typeof node === 'number' ? String(node)
  : Array.isArray(node) ? node.map(textContent).join('') : node?.props ? textContent(node.props.children) : '';
const button = (root, label) => root.root.findAllByType('Pressable').find(x => textContent(x.props.children).includes(label));
async function press(root, label) {
  const target = button(root, label);
  assert.ok(target, `Missing button: ${label}`);
  await act(() => target.props.onPress());
}

(async () => {
  let calculator;
  await act(() => { calculator = create(React.createElement(Calculator)); });
  assert.equal(calculator.root.findAllByType('TextInput').length, 0, 'SMD should not mount before it is opened');
  assert.equal(calculator.root.findByType('StatusBar').props.barStyle, 'light-content');
  for (const mode of [6, 3, 5, 4]) {
    const target = button(calculator, `${mode} bands`);
    assert.ok(target, `Mode ${mode}`);
    await act(() => target.props.onPress());
    if (mode === 6) assert.ok(calculator.root.findAllByType('Text').some(x => textContent(x.props.children) === '100 ppm/°C'));
    if (mode === 3) assert.ok(visible(calculator).includes('±20%'));
  }
  await press(calculator, 'Enlarge color picker');
  assert.equal(calculator.root.findAllByType('Modal').length, 1);
  await press(calculator, 'Close');
  assert.equal(calculator.root.findAllByType('Modal').length, 0);
  const pink = calculator.root.findAllByType('Pressable').find(x => x.props.accessibilityLabel?.includes('Multiplier: Pink'));
  assert.ok(pink);
  await act(() => pink.props.onPress());
  assert.ok(visible(calculator).includes('0.037 Ω'));
  const orangeTolerance = calculator.root.findAllByType('Pressable').find(x => x.props.accessibilityLabel?.includes('Tolerance: Orange'));
  await act(() => orangeTolerance.props.onPress());
  assert.ok(visible(calculator).includes('±0.05%'));
  assert.ok(!button(calculator, 'Legacy chart'));
  const noBand = calculator.root.findAllByType('Pressable').find(x => x.props.accessibilityLabel?.includes('Tolerance: None'));
  await act(() => noBand.props.onPress());
  assert.ok(visible(calculator).includes('±20%'));
  assert.equal(button(calculator, 'DIP').props.accessibilityState.selected, true);
  await press(calculator, 'SMD');
  assert.equal(button(calculator, 'SMD').props.accessibilityState.selected, true);
  await act(() => calculator.root.findByType('TextInput').props.onChangeText('472'));
  await press(calculator, 'DIP');
  assert.ok(visible(calculator).includes('0.037 Ω'));
  await press(calculator, 'SMD');
  assert.equal(calculator.root.findByType('TextInput').props.value, '472');
  assert.equal(calculator.root.findByType('AppHeader').props.title, undefined);
  await act(() => calculator.unmount());

  let guide;
  await act(() => { guide = create(React.createElement(Guide)); });
  assert.equal(guide.root.findByType('StatusBar').props.barStyle, 'light-content');
  assert.equal(guide.root.findByType('TextInput').props.placeholderTextColor, require('../constants/theme.ts').palettes.dark.textFaint);
  await act(() => guide.root.findByType('TextInput').props.onChangeText('lm339'));
  await press(guide, 'LM339');
  assert.ok(visible(guide).includes('Open manufacturer datasheet'));
  assert.ok(visible(guide).includes('2OUT'));
  await act(() => guide.root.findByType('AppHeader').props.onBackPress());
  await act(() => guide.root.findByType('TextInput').props.onChangeText('eg8010'));
  await press(guide, 'EG8010');
  assert.ok(visible(guide).includes('Pinout unavailable'));
  assert.ok(!visible(guide).includes('Top view'));
  await act(() => guide.unmount());
  language = 'hi';
  themeMode = 'light';
  await act(() => { calculator = create(React.createElement(Calculator)); });
  assert.equal(calculator.root.findByType('StatusBar').props.barStyle, 'dark-content');
  assert.ok(visible(calculator).includes('गुलाबी'));
  await act(() => calculator.unmount());
  console.log('Electronics screen interaction checks passed (English and Hindi).');
})().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => { Module._load = originalLoad; });
