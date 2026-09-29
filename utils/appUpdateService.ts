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

export function getUpdateCheckErrorMessage(error: unknown, isHindi = false): string {
  const code = (error as { code?: string } | null)?.code;
  if (code === 'PLAY_APP_NOT_OWNED') return isHindi
    ? 'Google Play खाते में यह ऐप उपलब्ध नहीं है। इसी खाते से Play Store से ऐप इंस्टॉल करें या स्टोर पर अपडेट देखें।'
    : 'Google Play does not recognise this app for the current account. Install it from the Play Store using this account, or check the store directly.';
  if (code === 'PLAY_STORE_NOT_FOUND') return isHindi
    ? 'इस डिवाइस पर Google Play Store उपलब्ध नहीं है। ब्राउज़र में स्टोर पेज देखें।'
    : 'Google Play Store is unavailable on this device. You can open the store page in your browser.';
  if (code === 'PLAY_API_UNAVAILABLE') return isHindi
    ? 'इस डिवाइस पर Google Play की स्वचालित अपडेट जाँच उपलब्ध नहीं है। स्टोर पर सीधे देखें।'
    : 'Google Play cannot check updates automatically on this device. Check the store directly.';
  return isHindi
    ? 'Google Play से अपडेट की पुष्टि नहीं हो सकी। दोबारा कोशिश करें या Play Store पर सीधे देखें।'
    : 'Google Play could not confirm whether an update is available. Try again or check the Play Store directly.';
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
