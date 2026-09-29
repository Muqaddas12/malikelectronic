import { Linking, NativeModules, Platform } from 'react-native';
import appConfig from '@/app.json';

export const PACKAGE_NAME = appConfig.expo.android.package;
export const PLAY_STORE_MARKET_URI = `market://details?id=${PACKAGE_NAME}`;
export const PLAY_STORE_WEB_URL = `https://play.google.com/store/apps/details?id=${PACKAGE_NAME}`;

export interface UpdateInfo {
  updateAvailable: boolean;
  currentVersion: string;
  latestVersion: string;
  currentVersionCode?: number;
  versionCode?: number;
  releaseNotes?: string;
  releaseNotesHi?: string;
  forceUpdate?: boolean;
  playStoreUrl: string;
  status: 'checked' | 'unsupported';
}

type NativeUpdateResult = {
  updateAvailable: boolean;
  currentVersion: string;
  currentVersionCode: number;
  versionCode: number;
};

export async function openPlayStore(_customUrl?: string): Promise<void> {
  if (Platform.OS === 'android') {
    try {
      // Opening directly avoids Android package-visibility canOpenURL false negatives.
      await Linking.openURL(PLAY_STORE_MARKET_URI);
      return;
    } catch {
      // Devices without the Play Store can use the official web listing.
    }
  }
  await Linking.openURL(PLAY_STORE_WEB_URL);
}

export async function checkPlayStoreUpdate(): Promise<UpdateInfo> {
  const bridge = NativeModules.PlayStoreUpdate as { checkForUpdate(): Promise<NativeUpdateResult> } | undefined;
  if (Platform.OS !== 'android' || !bridge) {
    return {
      status: 'unsupported', updateAvailable: false,
      currentVersion: '', latestVersion: '', playStoreUrl: PLAY_STORE_WEB_URL,
    };
  }
  // Google Play determines availability for this installed binary, account,
  // device and rollout track. A version.json value or HTML scrape cannot do that.
  let timeout: ReturnType<typeof setTimeout> | undefined;
  try {
    const result = await Promise.race([
      bridge.checkForUpdate(),
      new Promise<never>((_, reject) => {
        timeout = setTimeout(() => reject(new Error('Google Play update check timed out')), 10000);
      }),
    ]);
    if (typeof result.updateAvailable !== 'boolean' || !Number.isSafeInteger(result.currentVersionCode)
      || !Number.isSafeInteger(result.versionCode) || result.currentVersionCode < 1
      || typeof result.currentVersion !== 'string'
      || (result.updateAvailable && result.versionCode <= result.currentVersionCode)) {
      throw new Error('Invalid Google Play update response');
    }
    return {
      status: 'checked', updateAvailable: result.updateAvailable,
      currentVersion: result.currentVersion, currentVersionCode: result.currentVersionCode,
      // Play Core exposes the available version code, not its marketing name.
      latestVersion: '', versionCode: result.updateAvailable ? result.versionCode : undefined,
      forceUpdate: false, playStoreUrl: PLAY_STORE_WEB_URL,
    };
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}
