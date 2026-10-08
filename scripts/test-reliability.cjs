const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const React = require('react');
const { act, create } = require('react-test-renderer');
global.IS_REACT_ACT_ENVIRONMENT = true;
for (const ext of ['.ts', '.tsx']) require.extensions[ext] = (m, f) => m._compile(ts.transpileModule(fs.readFileSync(f, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true, jsx: ts.JsxEmit.ReactJSX },
}).outputText, f);
class Value {
  constructor(value) { this.value = value; }
  setValue(value) { this.value = value; }
  stopAnimation() {}
}
class ValueXY extends Value {
  constructor(value) { super(value); this.x = new Value(value.x); this.y = new Value(value.y); }
  setValue(value) { super.setValue(value); this.x.setValue(value.x); this.y.setValue(value.y); }
}
let dimensions = { width: 390, height: 844 };
const stored = new Map();
let read = key => Promise.resolve(stored.get(key) ?? null);
const originalLoad = Module._load;
Module._load = function(request, parent, isMain) {
  if (request === '@react-native-async-storage/async-storage') return {
    getItem: key => read(key), setItem: async (key, value) => { stored.set(key, value); },
  };
  if (request === 'react-native') return {
    View: 'View', Image: 'Image', Text: 'Text', Pressable: 'Pressable', ScrollView: 'ScrollView',
    FlatList: 'FlatList', Modal: 'Modal', StatusBar: 'StatusBar', ActivityIndicator: 'ActivityIndicator',
    Platform: { OS: 'android' }, StyleSheet: { create: s => s, absoluteFillObject: {} },
    useWindowDimensions: () => dimensions,
    PanResponder: { create: handlers => ({ panHandlers: handlers }) },
    Easing: { cubic: x => x, out: x => x },
    Animated: { Value, ValueXY, View: 'AnimatedView',
      timing: (value, options) => ({ start: () => value.setValue(options.toValue) }),
      parallel: animations => ({ start: () => animations.forEach(a => a.start()) }),
    },
  };
  if (request === 'react-native-safe-area-context') return { SafeAreaView: 'SafeAreaView' };
  if (request === '@/context/LanguageContext') return { useLanguage: () => ({ isHindi: false }) };
  if (request.startsWith('@/')) request = path.resolve(__dirname, '..', request.slice(2));
  return originalLoad.call(this, request, parent, isMain);
};
const Viewer = require('../components/InteractiveViewer.tsx').default;
const Document = require('../components/PdfDocumentViewerModal.tsx').default;
const { useStoredPreference } = require('../hooks/useStoredPreference.ts');
const touch = points => ({ nativeEvent: { touches: points.map(([pageX, pageY]) => ({ pageX, pageY })) } });
const gesture = root => root.root.findAllByType('View').find(v => v.props.onPanResponderMove).props;
const transforms = root => root.root.findByType('AnimatedView').props.style.find(s => s.transform).transform;
const values = ['en', 'hi'];
let preference;
function Preference() { preference = useStoredPreference('language', 'hi', values); return null; }

(async () => {
  let root;
  await act(() => { root = create(React.createElement(Viewer, { source: { uri: 'https://example.com/test.png' }, scaleValue: 2 })); });
  let g = gesture(root);
  await act(() => {
    g.onPanResponderGrant(touch([[0, 0]]));
    g.onPanResponderMove(touch([[999, 0]]), { dx: 999, dy: 0 });
  });
  assert.equal(transforms(root)[0].translateX.value, 195);
  dimensions = { width: 844, height: 390 };
  await act(() => root.update(React.createElement(Viewer, { source: { uri: 'https://example.com/test.png' }, scaleValue: 2 })));
  g = gesture(root);
  await act(() => {
    g.onPanResponderGrant(touch([[0, 0], [100, 0]]));
    g.onPanResponderMove(touch([[0, 0], [100, 0]]), { dx: 50, dy: 0 });
    g.onPanResponderMove(touch([[100, 0]]), { dx: 50, dy: 0 });
  });
  assert.equal(transforms(root)[0].translateX.value, 0, 'lifting one finger must not jump');
  await act(() => g.onPanResponderMove(touch([[999, 0]]), { dx: 999, dy: 0 }));
  assert.equal(transforms(root)[0].translateX.value, 422, 'rotation uses new width');
  const oldImage = root.root.findByType('Image');
  await act(() => oldImage.props.onError());
  assert.ok(JSON.stringify(root.toJSON()).includes('Check your connection'));
  await act(() => root.root.findByType('Pressable').props.onPress());
  assert.notEqual(root.root.findByType('Image'), oldImage, 'Retry remounts image');
  await act(() => root.unmount());

  const doc = { chipName: 'Test', pages: [{ uri: 'test' }], title: 'Test' };
  await act(() => { root = create(React.createElement(Document, { visible: true, doc, onClose() {} })); });
  const width = root.root.findByType('FlatList').props.style.width;
  g = gesture(root);
  await act(() => {
    g.onPanResponderGrant(touch([[0, 0], [100, 0]]));
    g.onPanResponderMove(touch([[0, 0], [200, 0]]));
  });
  assert.equal(root.root.findByType('FlatList').props.style.width, width, 'pinch preview avoids page relayout');
  await act(() => g.onPanResponderRelease());
  assert.equal(root.root.findByType('FlatList').props.style.width, width * 2);
  await act(() => root.update(React.createElement(Document, { visible: false, doc, onClose() {} })));
  assert.equal(root.toJSON(), null, 'closed document releases page tree');
  await act(() => root.unmount());

  stored.set('language', 'en');
  await act(async () => { root = create(React.createElement(Preference)); });
  assert.equal(preference[0], 'en');
  await act(() => preference[1]('hi'));
  assert.equal(stored.get('language'), 'hi');
  await act(() => root.unmount());
  await act(async () => { root = create(React.createElement(Preference)); });
  assert.equal(preference[0], 'hi');
  await act(() => root.unmount());
  let resolveRead;
  read = () => new Promise(resolve => { resolveRead = resolve; });
  await act(async () => { root = create(React.createElement(Preference)); });
  await act(() => preference[1]('en'));
  await act(() => resolveRead('hi'));
  assert.equal(preference[0], 'en', 'late storage read must not override new selection');
  await act(() => root.unmount());
  read = () => Promise.reject(new Error('Storage unavailable'));
  await act(async () => { root = create(React.createElement(Preference)); });
  assert.equal(preference[0], 'hi');
  await act(() => root.unmount());
  console.log('Viewer rotation, pinch transitions, retry, document zoom and preference recovery checks passed.');
})().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => { Module._load = originalLoad; });
