import luminousConfig from '@/config/Luminous.json';
import microtekConfig from '@/config/Microtek.json';
import sukamConfig from '@/config/sukam.json';
import { decryptUrl } from '@/utils/crypto';

/**
 * Converts Google Drive shareable link into a direct displayable image URL.
 * Automatically decrypts protected URLs in-memory and uses Google's direct CDN
 * endpoint (lh3.googleusercontent.com/d/<ID>) to display images directly.
 */
export function formatDriveImageUrl(link?: string): string {
  if (!link) return '';
  const resolvedLink = decryptUrl(link);
  const match =
    resolvedLink.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
    resolvedLink.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://lh3.googleusercontent.com/d/${match[1]}`;
  }
  return resolvedLink;
}

export function getDriveImageSource(link?: string) {
  if (!link) return undefined;
  const uri = formatDriveImageUrl(link);
  return uri ? { uri } : undefined;
}

/**
 * Diagram map — strictly populated from the official JSON data files
 * (Luminous.json, Microtek.json, sukam.json).
 */
export const diagramMap: Record<string, Record<string, any>> = {
  // ─── Luminous Eco Watt+ (from Luminous.json) ──────────────────────────────
  'LuminousEcoWatt': {
    /** Battery Low | OverCharge | Not Charging | Low Back UP (Pin 4) */
    'low-battery': getDriveImageSource(luminousConfig['Luminous-Eco-Watt-Plus']?.[0]?.link),
    /** Main FeedBack | Buzzer Sound On Mains Mode (Pin 3) */
    'main-feedback': getDriveImageSource(luminousConfig['Luminous-Eco-Watt-Plus']?.[1]?.link),
  },

  // ─── Microtek EB 900 / Semi Sine Wave (from Microtek.json) ────────────────
  'microtek-inverter': {
    /** Battery Low | OverCharge | Not Charging | Low Back UP (Pin 3) */
    'low-battery': getDriveImageSource(microtekConfig['microtek-eb-semi-sine-wave']?.[0]?.link),
    /** Microcontroller */
    'microcontroller-pin-details': getDriveImageSource(microtekConfig['microtek-eb-semi-sine-wave']?.[1]?.link),
  },

  // ─── Microtek Square Wave (from Microtek.json) ────────────────────────────
  'microtek-square-wave': {
    /** Microcontroller */
    'microcontroller-pin-details': getDriveImageSource(microtekConfig['microtek-eb-square-wave']?.[0]?.link),
  },

  // ─── Microtek 24x7 Non-SMD (from Microtek.json) ───────────────────────────
  'microtek-24x7': {
    /** Microcontroller */
    'microcontroller-pin-details': getDriveImageSource(microtekConfig['microtek-24x7-Non-Smd']?.[0]?.link),
  },

  // ─── Su-Kam Shark SMD / DIP (from sukam.json) ─────────────────────────────
  'sukam-shark-inverter': {
    /** Dead inverter | Only beep sound | Vcc supply problem (Pins 1, 20) */
    'dead-vcc': getDriveImageSource(sukamConfig['sukam-shark']?.[0]?.link),
    /** Change Over | Zero Cross Sense | Main Feedback (Pins 2, 22, 18) */
    'changeover': getDriveImageSource(sukamConfig['sukam-shark']?.[1]?.link),
    /** Battery Low | OverCharge | Not Charging | Low Back UP (Pin 3) */
    'low-battery': getDriveImageSource(sukamConfig['sukam-shark']?.[2]?.link),
    /** Switch Not Working | Only Charging Light Blinking | Inverter on But Not Output | Relay Not Operating (Pins 6, 11, 23) */
    'switch-relay': getDriveImageSource(sukamConfig['sukam-shark']?.[3]?.link),
    /** Fan | Buzzer | Heat Sensor | Inverter OverHeating (Pins 7, 17, 24) */
    'fan-overheating': getDriveImageSource(sukamConfig['sukam-shark']?.[4]?.link),
    /** Microcontroller */
    'microcontroller-pin-details': getDriveImageSource(sukamConfig['sukam-shark']?.[5]?.link),
  },

  // ─── Su-Kam Shiny Sine Wave (from sukam.json) ─────────────────────────────
  'sukam-shiny-inverter': {
    /** Change Over (Pin 2) */
    'changeover': getDriveImageSource(sukamConfig['sukam-shiny']?.[0]?.link),
    /** Microcontroller */
    'microcontroller-pin-details': getDriveImageSource(sukamConfig['sukam-shiny']?.[1]?.link),
  },
};

/**
 * Get the circuit diagram image source for a specific inverter fault.
 * Returns { uri: string } or undefined if not in JSON data.
 */
export function getDiagramImage(
  inverterId?: string,
  faultId?: string,
): any | undefined {
  if (!inverterId || !faultId) return undefined;
  return diagramMap[inverterId]?.[faultId];
}

/**
 * Get the Google Drive link for a circuit diagram strictly from JSON files.
 */
export function getDiagramLink(
  inverterId?: string,
  faultId?: string,
): string | undefined {
  if (!inverterId || !faultId) return undefined;

  let rawLink: string | undefined;

  if (inverterId === 'LuminousEcoWatt') {
    const list = luminousConfig['Luminous-Eco-Watt-Plus'];
    if (faultId === 'low-battery') rawLink = list?.[0]?.link;
    if (faultId === 'main-feedback') rawLink = list?.[1]?.link;
  }

  if (inverterId === 'microtek-inverter') {
    const list = microtekConfig['microtek-eb-semi-sine-wave'];
    if (faultId === 'low-battery') rawLink = list?.[0]?.link;
    if (faultId === 'microcontroller-pin-details') rawLink = list?.[1]?.link;
  }

  if (inverterId === 'microtek-square-wave') {
    rawLink = microtekConfig['microtek-eb-square-wave']?.[0]?.link;
  }

  if (inverterId === 'microtek-24x7') {
    rawLink = microtekConfig['microtek-24x7-Non-Smd']?.[0]?.link;
  }

  if (inverterId === 'sukam-shark-inverter' || inverterId === 'sukam-shark') {
    const shark = sukamConfig['sukam-shark'];
    if (faultId === 'dead-vcc') rawLink = shark?.[0]?.link;
    if (faultId === 'changeover') rawLink = shark?.[1]?.link;
    if (faultId === 'low-battery') rawLink = shark?.[2]?.link;
    if (faultId === 'switch-relay') rawLink = shark?.[3]?.link;
    if (faultId === 'fan-overheating') rawLink = shark?.[4]?.link;
    if (faultId === 'microcontroller-pin-details') rawLink = shark?.[5]?.link;
  }

  if (inverterId === 'sukam-shiny-inverter' || inverterId === 'sukam-shiny') {
    const shiny = sukamConfig['sukam-shiny'];
    if (faultId === 'changeover') rawLink = shiny?.[0]?.link;
    if (faultId === 'microcontroller-pin-details') rawLink = shiny?.[1]?.link;
  }

  return rawLink ? decryptUrl(rawLink) : undefined;
}
