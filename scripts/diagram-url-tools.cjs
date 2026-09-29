const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const runtime = { exports: {} };
const cryptoPath = path.resolve(__dirname, '../utils/crypto.ts');
// Test the implementation shipped in the app, not a second crypto copy.
new Function('exports', ts.transpileModule(fs.readFileSync(cryptoPath, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText)(runtime.exports);

function diagramFiles() {
  return ['config', 'data'].flatMap(directory => {
    const full = path.resolve(__dirname, '..', directory);
    return fs.readdirSync(full).filter(name => /\.(json|ts)$/.test(name)).map(name => path.join(full, name));
  });
}
function linkLiterals(file, text) {
  if (file.endsWith('.json')) JSON.parse(text.replace(/^\uFEFF/, ''));
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true,
    file.endsWith('.json') ? ts.ScriptKind.JSON : ts.ScriptKind.TS);
  const links = [];
  function visit(node) {
    if (ts.isPropertyAssignment(node) && ['link', 'diagramLink'].includes(node.name.getText(source).replace(/['"]/g, ''))
      && ts.isStringLiteral(node.initializer) && node.initializer.text) {
      links.push({ start: node.initializer.getStart(source), end: node.initializer.getEnd(), value: node.initializer.text });
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  return links;
}
function verifyUrl(value) {
  const decoded = runtime.exports.decryptUrl(value);
  const url = new URL(decoded);
  if (url.protocol !== 'https:' || url.hostname !== 'drive.google.com'
    || !(/\/file\/d\/[\w-]+/.test(url.pathname) || url.searchParams.get('id'))) {
    throw new Error('Diagram link did not resolve to an HTTPS Google Drive file');
  }
  return decoded;
}
module.exports = { ...runtime.exports, diagramFiles, linkLiterals, verifyUrl };
