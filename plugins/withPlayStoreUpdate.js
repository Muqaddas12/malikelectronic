const fs = require('node:fs');
const path = require('node:path');
const { withAppBuildGradle, withMainApplication, withDangerousMod } = require('@expo/config-plugins');

function addDependency(contents) {
  if (contents.includes('com.google.android.play:app-update:')) return contents;
  if (!contents.includes('dependencies {')) throw new Error('Cannot find Android dependencies block');
  return contents.replace('dependencies {', "dependencies {\n    implementation 'com.google.android.play:app-update:2.1.0'");
}
function registerPackage(contents) {
  if (contents.includes('add(PlayStoreUpdatePackage())')) return contents;
  const marker = 'PackageList(this).packages.apply {';
  if (!contents.includes(marker)) throw new Error('Cannot find Kotlin React package registration');
  return contents.replace(marker, `${marker}\n              add(PlayStoreUpdatePackage())`);
}
function writeNativeFiles(projectRoot, packageName) {
  const destination = path.join(projectRoot, 'android/app/src/main/java', ...packageName.split('.'));
  fs.mkdirSync(destination, { recursive: true });
  for (const name of ['PlayStoreUpdateModule.kt', 'PlayStoreUpdatePackage.kt']) {
    const source = fs.readFileSync(path.join(__dirname, 'play-store-update', name), 'utf8')
      .replace('package com.muqaddas123.malikelectronic', `package ${packageName}`);
    fs.writeFileSync(path.join(destination, name), source);
  }
}
module.exports = config => {
  config = withAppBuildGradle(config, mod => {
    mod.modResults.contents = addDependency(mod.modResults.contents);
    return mod;
  });
  config = withMainApplication(config, mod => {
    mod.modResults.contents = registerPackage(mod.modResults.contents);
    return mod;
  });
  return withDangerousMod(config, ['android', async mod => {
    writeNativeFiles(mod.modRequest.projectRoot, mod.android.package);
    return mod;
  }]);
};
// Also apply to this repository's existing native checkout without prebuilding
// unrelated files. Future Expo prebuilds run the same transformations.
module.exports.addDependency = addDependency;
module.exports.registerPackage = registerPackage;
module.exports.writeNativeFiles = writeNativeFiles;
