import { Platform } from 'react-native';

/**
 * Design tokens for MaliK Electronic.
 *
 * The app is a bench reference for inverter technicians, so the visual
 * language is borrowed from test equipment rather than from web dashboards:
 * a graphite instrument body, hairline rules instead of drop shadows, and
 * two signal colours with strictly separate jobs.
 *
 *   signal  (amber) — actions, live/current state. Never used for data.
 *   readout (cyan)  — measured values, pin numbers, markings. Never a button.
 *
 * Keeping those two roles apart is what stops the palette turning decorative.
 * Screens must read colour from useTheme(), never from a literal hex.
 */

export type ThemeMode = 'light' | 'dark';
export type ThemePreference = ThemeMode | 'system';
export type Severity = 'low' | 'medium' | 'high' | 'critical';

export type Palette = {
  mode: ThemeMode;

  /** Page background — the instrument body. */
  surface: string;
  /** A module sitting on the body. */
  panel: string;
  /** A module that needs to read as one step closer to the viewer. */
  panelRaised: string;
  /** A recess: image wells, table bodies, code blocks. */
  panelSunken: string;

  /** Hairline separators. */
  rule: string;
  /** Borders that carry structure rather than just separating. */
  ruleStrong: string;

  text: string;
  textDim: string;
  textFaint: string;

  /** Actions and live state. */
  signal: string;
  /** Text/icon colour that sits on a filled `signal` background. */
  signalInk: string;
  signalSoft: string;

  /** Measured values, pin references, markings. */
  readout: string;
  readoutSoft: string;

  /** Confirmed / checked-out state. */
  verified: string;
  verifiedSoft: string;

  /** Scrims behind drawers and fullscreen viewers. */
  overlay: string;

  severity: Record<Severity, string>;
};

const dark: Palette = {
  mode: 'dark',

  surface: '#101317',
  panel: '#181C22',
  panelRaised: '#20252D',
  panelSunken: '#0B0E12',

  rule: '#2B323B',
  ruleStrong: '#3A424E',

  text: '#E9ECF0',
  textDim: '#98A1AD',
  textFaint: '#6B7481',

  signal: '#F0A32B',
  signalInk: '#17120A',
  signalSoft: 'rgba(240, 163, 43, 0.12)',

  readout: '#5CC9E0',
  readoutSoft: 'rgba(92, 201, 224, 0.10)',

  verified: '#4FB477',
  verifiedSoft: 'rgba(79, 180, 119, 0.12)',

  overlay: 'rgba(4, 6, 9, 0.72)',

  severity: {
    low: '#4FB477',
    medium: '#E0A32B',
    high: '#E2762F',
    critical: '#E4574C',
  },
};

const light: Palette = {
  mode: 'light',

  surface: '#F1F3F5',
  panel: '#FFFFFF',
  panelRaised: '#F7F9FA',
  panelSunken: '#E9EDF0',

  rule: '#DBE0E6',
  ruleStrong: '#B8C1CA',

  text: '#131A21',
  textDim: '#57626E',
  textFaint: '#767F8A',

  /* Dark enough to clear 4.5:1 on panelSunken, where spec values sit. */
  signal: '#945000',
  signalInk: '#FFFFFF',
  signalSoft: 'rgba(148, 80, 0, 0.09)',

  readout: '#0D6478',
  readoutSoft: 'rgba(13, 100, 120, 0.08)',

  verified: '#1F7A4D',
  verifiedSoft: 'rgba(31, 122, 77, 0.09)',

  overlay: 'rgba(12, 16, 20, 0.55)',

  severity: {
    low: '#1F7A4D',
    medium: '#8A5A00',
    high: '#A8451A',
    critical: '#B0322A',
  },
};

export const palettes: Record<ThemeMode, Palette> = { light, dark };

/**
 * Type scale, 1.25 ratio off a 15px reading size. Sizes below 11 are
 * deliberately absent — this app is read at arm's length on a workbench.
 */
export const size = {
  micro: 11,
  small: 13,
  body: 15,
  sub: 17,
  title: 21,
  display: 26,
} as const;

export const line = {
  micro: 16,
  small: 19,
  body: 22,
  sub: 24,
  title: 27,
  display: 31,
} as const;

/**
 * Devanagari needs more room than Latin at the same size, so Hindi copy
 * gets a slightly looser leading rather than a smaller size.
 */
export function lineFor(key: keyof typeof line, isHindi: boolean): number {
  return isHindi ? line[key] + 3 : line[key];
}

/** 700 is the ceiling: system fonts fake anything heavier and it muddies. */
export const weight = {
  regular: '400',
  medium: '500',
  semi: '600',
  bold: '700',
} as const;

/** 4px baseline grid. */
export const space = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  xxxl: 40,
} as const;

/** One radius family. Structural cells use 0 and say so at the use site. */
export const radius = {
  sm: 6,
  md: 10,
  lg: 14,
  pill: 999,
} as const;

/** Values are data, so they get a real tabular face. */
export const mono = Platform.select({
  ios: 'Menlo',
  android: 'monospace',
  default: 'monospace',
}) as string;

export const layout = {
  /** Horizontal page inset, shared by every screen. */
  gutter: 18,
  /** Minimum comfortable target for a hand holding a soldering iron. */
  tap: 44,
} as const;
