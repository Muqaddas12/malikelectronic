# MaliK Electronic

![Expo SDK 54](https://img.shields.io/badge/Expo-SDK%2054-000020?logo=expo&logoColor=white)
![React Native 0.81](https://img.shields.io/badge/React%20Native-0.81-20232a?logo=react)
![TypeScript strict](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![Platforms](https://img.shields.io/badge/platforms-Android%20%7C%20iOS%20%7C%20Web-4FB477)
![License MIT](https://img.shields.io/badge/license-MIT-informational)

A bilingual (Hindi/English) bench reference for inverter and PCB repair technicians,
built with Expo and React Native.

It carries the diagnosis knowledge for seven common Indian home-UPS boards — symptoms,
sensing-circuit explanations, measured pin voltages, annotated schematics and numbered
repair procedures — next to the tools a technician reaches for anyway: an SMD resistor
decoder, a colour-band calculator, and a 202-part IC pinout directory.

Everything ships inside the app. There is no backend and no account, and the app makes no
network requests of its own, so it works on a bench with no signal. Hindi is the default
language, not a translation layer added afterwards.

## What's inside

| | |
| --- | --- |
| Inverter models | 7 — Luminous, Microtek (×3), Su-Kam (×2), Livguard |
| Documented faults | 55 entries across 8 board profiles (the 7 models plus a generic fallback) |
| IC directory | 202 parts across 10 categories |
| Bench calculators | SMD (3-digit, 4-digit, EIA-96) and colour band (4- and 5-band) |
| Languages | Hindi (default) and English, switchable at runtime |

## Features

**Fault library, per board.** Pick a model, search its faults, and each one opens with
symptoms, an annotated circuit diagram, possible causes with an explanation for each, a
numbered repair procedure, basic multimeter checks, a component table (function, marking,
package, and separate 12V/24V values where they differ), the circuit flow, and a closing
diagnosis. Severity is graded low → critical and colour-coded.

**Real schematics, not stock art.** `data/diagrams.ts` maps each board-and-fault pair to
a dedicated hand-drawn or traced diagram, opened in a pinch-to-zoom fullscreen viewer.
Faults with no diagram asset are deliberately hidden from the list rather than shown empty.

**Microcontroller pin charts.** Multi-page voltage charts for the PIC16F722 / PIC16F72
class of controllers, showing pin function and expected voltage in Mains, UPS and Normal
modes, in a paged document viewer.

**SMD resistor decoder.** Handles 3-digit, 4-digit 1%, EIA-96 and decimal `R`/`K`/`M`
codes, with a live chip graphic and presets for the markings that actually turn up on
inverter PCBs (1001, 1502, 2201, 4R7).

**Colour-band calculator.** 4- and 5-band through-hole resistors with a live resistor
body drawn from the selected bands, tolerance from ±0.05% to ±10%.

**IC directory.** 202 ICs — op-amps, PWM drivers, MOSFET and Darlington drivers,
optocouplers, regulators, microcontrollers, timers, logic and memory. Each entry has a
combined DIP + SMD package graphic, a full pin table typed per pin (Power, Ground, Input,
Output, Control, Passive) with descriptions in both languages, the working principle, its
role in an inverter, and a multimeter testing tip.

**Built for the bench.** Dark and light palettes on one token system, following the phone
by default with a manual override in the sidebar; hairline rules instead of drop shadows;
monospaced numerals for anything measured; 11px minimum text size; 44px minimum tap target.
The cold-start animation short-circuits when the OS asks for reduced motion.

## Screenshots

Drop PNGs at the paths below and they will render here.

| Inverter list | Fault detail | IC guide | Tools |
| --- | --- | --- | --- |
| ![Inverter list](docs/screenshots/inverters.png) | ![Fault detail](docs/screenshots/fault-detail.png) | ![IC guide](docs/screenshots/ic-guide.png) | ![Tools](docs/screenshots/tools.png) |

## Tech stack

- **Expo SDK 54** with **expo-router 6** — file-based routing, typed routes enabled
- **React Native 0.81** / **React 19**, new architecture (`newArchEnabled: true`)
- **TypeScript 5.9**, `strict: true`, `@/*` path alias resolving to the repo root
- Data lives in plain typed TypeScript modules under `data/` — no database, no API
- No state library: two React contexts (`ThemeContext`, `LanguageContext`) plus local state
- `react-native-reanimated` and `@expo/vector-icons` for motion and icons

## Getting started

**Prerequisites** — Node.js 20 or newer, and either Android Studio (SDK + an emulator or a
USB device with developer mode on) or Xcode for iOS. No Expo account or API key is needed.

```bash
git clone https://github.com/Muqaddas12/malikelectronic.git
cd malikelectronic
npm install
npm start
```

| Command | What it runs |
| --- | --- |
| `npm start` | `expo start` — Metro bundler and the dev menu |
| `npm run android` | `expo run:android` — builds and installs the native debug app |
| `npm run ios` | `expo run:ios` |
| `npm run web` | `expo start --web` |
| `npx tsc --noEmit` | typecheck; this is the project's only automated gate today |

Two notes on native builds. `android/` is tracked, but `android/app/build.gradle` is
listed in `.gitignore`, so a fresh clone has to restore that file before `npm run android`
will work — see [Known limitations](#known-limitations). `ios/` is not tracked at all;
generate it with `npx expo prebuild -p ios` first.

## Project structure

```
app/                        expo-router routes
  _layout.tsx               providers, navigation theme, cold-start splash
  (tabs)/index.tsx          inverter list + search
  (tabs)/two.tsx            tools list
  inverter/[id].tsx         board detail: specs, PCB photo, MCU doc, fault list
  inverter/fault/[faultId].tsx   the fault sheet
  tools/smd-calculator.tsx  SMD code decoder
  tools/dip-calculator.tsx  colour-band calculator
  tools/ic-guide.tsx        202-IC directory
components/                 AppHeader, Sidebar, InverterCard, FaultCard, SpecStrip,
                            SearchBar, SectionTitle, and the zoom/PDF viewers
constants/theme.ts          the single source of colour, type, space and radius tokens
context/                    ThemeContext (palette + reduceMotion), LanguageContext
data/                       inverters, inverterfaults, diagrams, ics, microcontroller,
                            translations, faultTranslationsHi
types/                      Inverter, Fault, InverterFaultDetail and friends
utils/resistorCalculators.ts   decodeSmdResistor, calculate4Band, calculate5Band
assets/                     inverter photos, PCB photos, per-model diagram folders
```

## How the data fits together

Content is authored as typed TypeScript, so a bad entry fails `tsc` instead of failing on
a technician's bench. Four modules do the work:

```
data/inverters.ts        the board list; each board names its fault ids
data/inverterfaults.ts   inverterFaultsMap[inverterId][faultId] → the full English fault
data/diagrams.ts         diagramMap[inverterId][faultId] → require()'d schematic image
data/faultTranslationsHi.ts   Hindi overrides, same two-level key, field by field
```

`getFaultsForInverter(inverterId, language)` joins them: it walks the board's faults, looks
up a diagram, **skips any fault with no diagram asset**, then applies the Hindi override if
the language is `hi`. That diagram gate is the one rule that surprises people — a fault can
be fully written up and still not appear until its image is mapped in `data/diagrams.ts`.
`getInverterFault(inverterId, faultId, language)` does the same for a single fault.

Hindi overrides are partial and merged per field (`title`, `symptoms`, `basicChecks`,
`possibleCauses`, `repairProcedure`, `technicalExplanation`, `resistorValues`, `circuitFlow`,
`importantNote`, `diagnosis`), so an untranslated field quietly falls back to English rather
than rendering blank.

### Adding a board

1. Add an `Inverter` to `data/inverters.ts` — `id`, brand and model, capacity, battery
   voltage, type, the Hindi variants (`brandHi`, `typeHi`), `require()`'d `image` and
   `pcbImage` (`null` is allowed), and the `faults` id list.
2. Add a `data/inverterfaults.ts` entry keyed by that same `id`.
3. Drop diagrams in `assets/diagrams/<Model>/` and map them in `data/diagrams.ts`.
4. Optionally add a `microcontrollerDocs` entry in `data/microcontroller.ts` for a pin chart.

### Adding a fault

Write an `InverterFaultDetail` (see `types/faultDetail.ts`) under the board's key, list its
id in that board's `faults` array, map a diagram, then mirror the prose into
`data/faultTranslationsHi.ts`. Repair steps are numbered because they are a real sequence;
possible causes deliberately are not.

### Adding an IC

Append an `IcDetail` to `IC_DATABASE` in `data/ics.ts`: aliases (they are searchable, and
show as "Equivalents" in the UI), one of the ten categories, pin count, DIP and SMD package
names, a summary / working principle / inverter application / testing tip in both `En` and
`Hi`, and one `IcPin` per pin with `type`, `descEn` and `descHi`.

### Adding UI strings

Add the key to both `en` and `hi` in `data/translations.ts` and read it with
`tr(language, 'key')`. Missing keys fall back to English, then to the key itself.

## Design system

The visual language is borrowed from test equipment rather than from web dashboards. All of
it comes out of `constants/theme.ts`; screens read colour through `useTheme()` and never
from a literal hex. If you contribute UI, these are the rules that keep it coherent:

- **Colour roles are strict.** `signal` (amber) is for actions and live state only.
  `readout` (cyan) is for measured values, pin numbers and component references only — never
  a button. `verified` (green) means confirmed or diagnosed. `severity.*` grades risk.
  Mixing these roles is the fastest way to break the design.
- **Hierarchy comes from panel level**, not elevation: `surface` → `panel` → `panelRaised` →
  `panelSunken`, separated by hairline rules. There are no drop shadows anywhere.
- **`SpecStrip` is the signature element** — labelled, hairline-divided cells in mono, lifted
  off an inverter's silkscreen. Use it for specs instead of middle-dot meta strings, so 12V
  is distinguishable from 24V at a glance.
- **Typography:** 1.25 scale off a 15px reading size, 11px floor, `700` weight ceiling, and
  no `textTransform: 'uppercase'` (a no-op in Devanagari, and letter-spacing damages
  conjuncts). Devanagari gets 3px more leading via `lineFor(key, isHindi)`.
- **Layout:** 4px space grid, 18px page gutter, 44px minimum tap target — the hand holding
  the phone may also be holding a soldering iron.
- **Motion:** one orchestrated splash on cold start, and every animation must short-circuit
  when `reduceMotion` from `useTheme()` is true.
- Static layout belongs in module-scope `StyleSheet.create`; colour is applied inline.

Both palettes were swept for WCAG contrast — every ink/ground pair clears 4.5:1 and labels
clear 3:1. Light-mode `signal` is `#945000` specifically because a lighter amber failed
4.5:1 on `panelSunken`, where spec values sit.

## Known limitations

Honest state of the repo, highest impact first:

- **`.gitignore` excludes `android/app/build.gradle`.** A fresh clone cannot build the
  Android app until that file is restored, and `versionCode`, `versionName` and the signing
  config are untracked. This is the one item that blocks another machine outright.
- **The release build type is signed with the checked-in `debug.keystore`**, so release
  artifacts are not distributable as-is. Generate a real keystore before shipping.
- **No linter, formatter or test runner.** There is no ESLint, Prettier or Jest config, so
  the tracked `components/__tests__/StyledText-test.js` cannot run. `npx tsc --noEmit` is
  the only gate.
- **`assets/fonts/SpaceMono-Regular.ttf` is never loaded**, although `components/StyledText.tsx`
  asks for `fontFamily: 'SpaceMono'`. Mono text falls back to the platform face from
  `constants/theme.ts`.
- **Three `NativeZoom*.java` files under `android/` are unreferenced from JS** and would be
  lost by an `expo prebuild --clean`.
- **`app.json` has no `android.versionCode`, no `ios.bundleIdentifier` and no EAS project id**,
  so it is not yet EAS-build ready.
- **Some screens still use hardcoded hex** rather than theme tokens: the three tool screens
  and the three viewer components. Expo-template leftovers (`app/modal.tsx`,
  `app/+not-found.tsx`, `components/EditScreenInfo.tsx`, `components/Themed.tsx`,
  `constants/Colors.ts`) are also untouched.

## Contributing

Fork, branch, and keep changes tokenised — no raw hex in screens, both languages populated
for any new string, and `npx tsc --noEmit` clean before you open a PR. New fault content is
the most valuable contribution; measured voltages beat guessed ones.

## License

MIT — see [LICENSE](LICENSE).
