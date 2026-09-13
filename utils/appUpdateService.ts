import { Linking, Platform } from 'react-native';

import appConfig from '@/app.json';

export const PACKAGE_NAME =
  appConfig.expo?.android?.package || 'com.muqaddas123.malikelectronic';

export const CURRENT_VERSION = appConfig.expo?.version || '1.0.0';
export const CURRENT_VERSION_CODE = 1;

export const PLAY_STORE_MARKET_URI = `market://details?id=${PACKAGE_NAME}`;
export const PLAY_STORE_WEB_URL = `https://play.google.com/store/apps/details?id=${PACKAGE_NAME}`;

export const REMOTE_VERSION_CONFIG_URL =
  'https://raw.githubusercontent.com/Muqaddas12/malikelectronic/master/version.json';

export interface UpdateInfo {
  updateAvailable: boolean;
  currentVersion: string;
  latestVersion: string;
  versionCode?: number;
  releaseNotes?: string;
  releaseNotesHi?: string;
  forceUpdate?: boolean;
  playStoreUrl: string;
}

/**
 * Compares two semantic version strings (e.g. "1.0.1" and "1.0.0").
 * Returns 1 if v1 > v2, -1 if v1 < v2, and 0 if equal.
 */
export function compareVersions(v1: string, v2: string): number {
  const parts1 = v1.replace(/[^0-9.]/g, '').split('.').map(Number);
  const parts2 = v2.replace(/[^0-9.]/g, '').split('.').map(Number);
  const maxLen = Math.max(parts1.length, parts2.length);

  for (let i = 0; i < maxLen; i++) {
    const num1 = parts1[i] || 0;
    const num2 = parts2[i] || 0;
    if (num1 > num2) return 1;
    if (num1 < num2) return -1;
  }
  return 0;
}

/**
 * Opens the Google Play Store directly to the app's detail page.
 * Uses market:// on Android for a direct native transition,
 * falling back to the web Play Store URL if unavailable.
 */
export async function openPlayStore(customUrl?: string): Promise<void> {
  const targetUrl = customUrl || PLAY_STORE_WEB_URL;

  if (Platform.OS === 'android') {
    try {
      const canOpenMarket = await Linking.canOpenURL(PLAY_STORE_MARKET_URI);
      if (canOpenMarket) {
        await Linking.openURL(PLAY_STORE_MARKET_URI);
        return;
      }
    } catch {
      // Fallback to web link below
    }
  }

  try {
    await Linking.openURL(targetUrl);
  } catch (error) {
    console.warn('Unable to open Play Store link:', error);
  }
}

/**
 * Checks whether an updated version of the app is available on Google Play Store.
 * Reads remote version config or queries Play Store.
 */
export async function checkPlayStoreUpdate(): Promise<UpdateInfo> {
  // Default response (no update)
  const result: UpdateInfo = {
    updateAvailable: false,
    currentVersion: CURRENT_VERSION,
    latestVersion: CURRENT_VERSION,
    playStoreUrl: PLAY_STORE_WEB_URL,
    forceUpdate: false,
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(
      `${REMOTE_VERSION_CONFIG_URL}?t=${Date.now()}`,
      {
        signal: controller.signal,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
        },
      },
    );
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      const remoteVersion = String(data.version || data.latestVersion || '').trim();
      const remoteCode = Number(data.versionCode || 0);

      const isVersionHigher =
        remoteVersion && compareVersions(remoteVersion, CURRENT_VERSION) > 0;
      const isCodeHigher = remoteCode > CURRENT_VERSION_CODE;

      if (isVersionHigher || isCodeHigher) {
        result.updateAvailable = true;
        result.latestVersion = remoteVersion || CURRENT_VERSION;
        result.versionCode = remoteCode;
        result.releaseNotes = data.releaseNotes;
        result.releaseNotesHi = data.releaseNotesHi;
        result.forceUpdate = Boolean(data.forceUpdate);
        result.playStoreUrl = data.playStoreUrl || PLAY_STORE_WEB_URL;
        return result;
      }
    }
  } catch {
    // Network / abort fallback - continue to secondary check
  }

  // Fallback: Check Google Play Store web page (for live published updates)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const playResponse = await fetch(
      `https://play.google.com/store/apps/details?id=${PACKAGE_NAME}&hl=en&gl=US`,
      {
        signal: controller.signal,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
        },
      },
    );
    clearTimeout(timeoutId);

    if (playResponse.ok) {
      const html = await playResponse.text();
      // Match typical Play Store version string patterns: [[["1.0.1"]]]
      const match = html.match(/\[\[\["([0-9]+\.[0-9]+(?:\.[0-9]+)?)"\]/);
      if (match && match[1]) {
        const storeVersion = match[1];
        if (compareVersions(storeVersion, CURRENT_VERSION) > 0) {
          result.updateAvailable = true;
          result.latestVersion = storeVersion;
          return result;
        }
      }
    }
  } catch {
    // Silent fail on fallback
  }

  return result;
}

