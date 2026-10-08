# MaliK Electronic

Hindi/English inverter repair reference built with Expo SDK 54, React Native 0.81 and React 19.

## Features

- Inverter model, brand, capacity and battery-voltage filters; per-model diagrams and fault information.
- Global model/IC/symptom search, favorites and recently opened references.
- Persistent light/dark/system theme and language preferences.
- Combined DIP/SMD resistor calculator. DIP supports IEC color data and 3/4/5/6 bands, compact columns and an optional enlarged picker.
- Reverse resistor bands, series/parallel resistance, voltage/resistance to current/power, and capacitor marking decoder.
- Copy/save calculation results and review recent saved calculations.
- Package-scoped IC pinouts with manufacturer datasheet links. Entries awaiting verification have no generated pin table. See `data/ic-reviewed.ts` for reviewed parts; `data/ic-catalog.json` is the searchable directory.
- Repair jobs with measurements, replaced components, outcome and a checklist, stored on the device.
- Android/iOS offline downloads for configured model diagrams, with progress, partial-failure retry, storage usage and removal. Downloaded diagrams open from persistent app storage. Other remote content, including datasheets, still needs an internet connection.
- Diagram zoom, reset, 90-degree rotation and load retry. Multi-page reference charts use a virtualized viewer.
- Correction report opens the system share sheet with a template; the user chooses the recipient and sends it. There is no report server or automatic submission.

## Setup

Use Node.js 22 LTS (Expo SDK 54 requires at least 20.19), npm, and Android Studio with Java 17 for Android development. Xcode on macOS is required for iOS.

```sh
npm ci
npm start
npm run android
```

After adding native modules, rebuild the native app. Reloading Metro alone is insufficient. Web preview: `npm run web`.

The local `android/app/build.gradle` and release signing keys are intentionally untracked. A fresh checkout needs native project generation in a separate clean checkout (`npx expo prebuild --platform android --clean`) or the maintainer's private native configuration. Do not run clean prebuild over customized native files without preserving them. Production signing credentials must stay outside source control.

## Validation

```sh
npm run check
npx expo export --platform android --output-dir .electronics-web-check/android
```

`check` runs TypeScript and regression suites for resistor/IC data, screen interactions, diagram resolution, app updates, gestures/preferences and bench calculators/library storage. GitHub Actions runs these checks and Android bundling on pushes and pull requests. It does not sign or publish an APK.

Native release testing requires a connected device and the local signing setup:

```sh
cd android
./gradlew assembleRelease
```

Before publishing, test the release APK on a lower-memory Android device: cold launch, theme/language persistence, downloaded diagrams with networking disabled, large diagrams, long document charts, repeated open/close, rotation, two-finger pinch to one-finger pan, and large font settings. Unit tests and bundling do not prove frame rate or peak memory usage.

## Content maintenance

Configured diagrams live in `config/*.json`. Use stable unique `faultId` values, a non-empty `name` and `link`. Optional `isNew: false` overrides announcement flags. Optional `pcbRevision`, `source` and `verifiedAt` (YYYY-MM-DD) fields are displayed on the detail page; absent values are shown as unconfirmed, never invented.

The parser safely skips malformed rows at runtime; the diagram regression suite validates catalogue resolution. Do not copy guessed IC pinouts: record the exact manufacturer, package and datasheet in `data/ic-reviewed.ts` and add pin-number regression checks.

SMD examples are generic code examples. Board references require a verified model and PCB revision before being added.

## Storage and network

No account or backend is required. Favorites, recents, notes, calculation history and settings are stored locally. Uninstalling or clearing app data removes them. Downloaded images live in app-private storage. Remote diagrams, manufacturer datasheets and update checks make network requests. Offline downloads are supported by the native app, not the web preview. Model packs cover configured diagram sheets, not linked manufacturer PDFs or every bundled microcontroller document.
