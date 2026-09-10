import luminousConfig from '@/config/Luminous.json';
import microtekConfig from '@/config/Microtek.json';
import sukamConfig from '@/config/sukam.json';

/**
 * Converts Google Drive shareable link into direct displayable image URL
 * Converts Google Drive shareable link into a direct displayable image URL.
 * Uses Google's direct CDN endpoint (lh3.googleusercontent.com/d/<ID>) which
 * serves the image directly.
 */
export function formatDriveImageUrl(link?: string): string {
  if (!link) return '';
  const match =
    link.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
    link.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w2000`;
    return `https://lh3.googleusercontent.com/d/${match[1]}`;
  }
  return link;
}

export function getDriveImageSource(link?: string) {
  if (!link) return undefined;
  const uri = formatDriveImageUrl(link);
  return uri ? { uri } : undefined;
}

/**
 * Diagram map — maps [inverterId][faultId] to authentic circuit diagrams or links.
 * Diagram map — strictly populated from the official JSON data files
 * (Luminous.json, Microtek.json, sukam.json).
 */
export const diagramMap: Record<string, Record<string, any>> = {
  // ─── Luminous Eco Watt+ ────────────────────────────────────────────────────
  // ─── Luminous Eco Watt+ (from Luminous.json) ──────────────────────────────
  'LuminousEcoWatt': {
    /**
     * Cooling Fan Circuit:
     *   PIC16F722 Pin 6 → R126 (1kΩ) → ULN2003A (Pin 5/6) → Pin 11/12 → Fan Jack (-)
     *   Pin 17 → R66 (1kΩ) → R46 (1kΩ) sensing line from 5050 5V rail
     */
    'fan': require('@/assets/diagrams/LuminousEcoWatt+/pin 6 17 luminous fan diagram.png'),

    /**
     * Battery Low / Overcharge Sensing Circuit:
     *   12V/24V Battery (+) → R24 (9.1kΩ / 22kΩ) → 3.3V Node → R16 (1kΩ) → C13 (1µF/47V) → PIC16F722 Pin 4
     *   R31 (3.3kΩ) + C16 to GND
     */
    'low-battery': require('@/assets/diagrams/LuminousEcoWatt+/pin 4 battery low problem over charge problem_.png'),

    /**
     * Main Feedback (mFB) / Pin 5 Sensing Circuit:
     *   mFB → D8 (M7) → R32 (7501 / 7.5kΩ) → R39 (2401 / 2.4kΩ) || C19 (0.1µF) → C12 → R18 (1001 / 1kΩ) → PIC16F722 Pin 5
     */
    'main-feedback': require('@/assets/diagrams/LuminousEcoWatt+/Pin 5 Luminous eco watt mfb_.png'),

    /**
     * Changeover / Pin 1 & Pin 7 Mains Sensing Circuit:
     *   Mains L, N → R10, R11 (100kΩ) → TV31B02 Transformer → D1-D4 (M7) Bridge
     *   Path 1: R5 (22kΩ) → Q32 (1F) → GND
     *   Path 2: R1 (10kΩ) → R14 (10kΩ) → Q7 (1F) → R34/R131 to Pin 1 & R4/R19 to Pin 7
     */
    'relay': require('@/assets/diagrams/LuminousEcoWatt+/pin 7 1 change over diagram.jpg'),
    /** Battery Low | OverCharge | Not Charging | Low Back UP (Pin 4) */
    'low-battery': getDriveImageSource(luminousConfig['Luminous-Eco-Watt-Plus']?.[0]?.link),
    /** Main FeedBack | Buzzer Sound On Mains Mode (Pin 3) */
    'main-feedback': getDriveImageSource(luminousConfig['Luminous-Eco-Watt-Plus']?.[1]?.link),
  },

  // ─── Microtek Home UPS (EB 900 / V4–V7 Series) ────────────────────────────
  // ─── Microtek EB 900 / Semi Sine Wave (from Microtek.json) ────────────────
  'microtek-inverter': {
    /**
     * Microcontroller 28-Pin Details (EB 900 Sine Wave / EBHB-SGP-V3R3):
     */
    'microcontroller-pin-details': require('@/assets/diagrams/Microtek-V4-To-V7-Model/Microcontroller.png'),
    /** Battery Low | OverCharge | Not Charging | Low Back UP (Pin 3) */
    'low-battery': getDriveImageSource(microtekConfig['microtek-eb-semi-sine-wave']?.[0]?.link),
    /** Microcontroller */
    'microcontroller-pin-details': getDriveImageSource(microtekConfig['microtek-eb-semi-sine-wave']?.[1]?.link),
  },

    /**
     * Battery Low / Overcharge Sensing Circuit:
     *   +12V (D18 Anode) → D18 Diode (12V Pass) → R56 (51kΩ) → Sensing Node (3.36V, R34 20kΩ to GND) → R36 (1kΩ) → Pin 5
     */
    'low-battery': require('@/assets/diagrams/Microtek-V4-To-V7-Model/BatteryLow-OverChage.png'),

    /**
     * Fan / Overheating Circuit:
     *   Heat Sensor → R1 (5.1k) → LM324 (pins 1-7) → Pin 27 PIC16F72
     *   Pin 17 → R79 (2.2k) → BD139 (Q15) → Fan Jack (via D20)
     */
    'fan': require('@/assets/diagrams/Microtek-V4-To-V7-Model/Heatsensor.png'),
    'overheating': require('@/assets/diagrams/Microtek-V4-To-V7-Model/Heatsensor.png'),

    /**
     * Relay Changeover & Phase Switching Circuit:
     *   PIC16F72 Pin 6 → R89/R87 (2.2k) → Q18 (1F) → Relay-3 (Phase Out)
     *   Pin 16 → R78 (2.2k) → Q12 (1F) → Relay-1 (200V / 140V Changeover at CN7)
     */
    'relay': require('@/assets/diagrams/Microtek-V4-To-V7-Model/pin 6 16 relay Microtek diagram.png'),

    /**
     * Mains Changeover Fault (Pin 4 & Pin 28) Circuit:
     *   Mains N, L → R58, R66 (1003 / 100kΩ) → TV31B02 Transformer → D16, D17, D19, D22 (M7) Bridge
     *   Branch 1: R62 (2702), R67 (3901), R64 (1002), C22, R72 (1002), C20 → Q13 (1F) → Pin 4
     *   Branch 2: Q7 (1F) → R57 (1001 / 1kΩ) → Pin 28
     */
    'changeover': require('@/assets/diagrams/Microtek-V4-To-V7-Model/pin 4 28 Microteck Change over Falut.png'),

    /**
     * Display / Indicator LEDs & Buzzer Circuit:
     *   PIC16F72 Pins 11-15 (LEDs) + Q6 (1F) + Pin 25 → R80 (4.7k) → Q16 → Buzzer BZ1
     */
    'no-output': require('@/assets/diagrams/Microtek-V4-To-V7-Model/11 12 13 14 15 23 25 microtek display diagram.png'),
  // ─── Microtek Square Wave (from Microtek.json) ────────────────────────────
  'microtek-square-wave': {
    /** Microcontroller */
    'microcontroller-pin-details': getDriveImageSource(microtekConfig['microtek-eb-square-wave']?.[0]?.link),
  },

  // ─── Microtek 24x7 Hybrid Series ──────────────────────────────────────────
  // ─── Microtek 24x7 Non-SMD (from Microtek.json) ───────────────────────────
  'microtek-24x7': {
    /**
     * Microcontroller 20-Pin Details (Non-SMD DIP IC):
     */
    'microcontroller-pin-details': require('@/assets/diagrams/Microtek-24x7/Microcontroller.png'),
    /** Microcontroller */
    'microcontroller-pin-details': getDriveImageSource(microtekConfig['microtek-24x7-Non-Smd']?.[0]?.link),
  },

  // ─── Microtek Square Wave (JM1250 / Classic Series) ────────────────────────
  'microtek-square-wave': {
    /**
     * Microcontroller 28-Pin Details:
     */
    'microcontroller-pin-details': require('@/assets/diagrams/Microtek-Square-wave/Microcontroller.png'),
  },

  // ─── Su-Kam Shark SMD / DIP (Square Wave) ──────────────────────────────────
  // ─── Su-Kam Shark SMD / DIP (from sukam.json) ─────────────────────────────
  'sukam-shark-inverter': {
    /** Dead inverter | Only beep sound | Vcc supply problem (Pins 1, 20) */
    'dead-vcc': getDriveImageSource(sukamConfig['sukam-shark'][0]?.link),
    'dead-vcc': getDriveImageSource(sukamConfig['sukam-shark']?.[0]?.link),
    /** Change Over | Zero Cross Sense | Main Feedback (Pins 2, 22, 18) */
    'changeover': getDriveImageSource(sukamConfig['sukam-shark'][1]?.link),
    'changeover': getDriveImageSource(sukamConfig['sukam-shark']?.[1]?.link),
    /** Battery Low | OverCharge | Not Charging | Low Back UP (Pin 3) */
    'low-battery': getDriveImageSource(sukamConfig['sukam-shark'][2]?.link),
    'low-battery': getDriveImageSource(sukamConfig['sukam-shark']?.[2]?.link),
    /** Switch Not Working | Only Charging Light Blinking | Inverter on But Not Output | Relay Not Operating (Pins 6, 11, 23) */
    'switch-relay': getDriveImageSource(sukamConfig['sukam-shark'][3]?.link),
    'switch-relay': getDriveImageSource(sukamConfig['sukam-shark']?.[3]?.link),
    /** Fan | Buzzer | Heat Sensor | Inverter OverHeating (Pins 7, 17, 24) */
    'fan-overheating': getDriveImageSource(sukamConfig['sukam-shark'][4]?.link),
    /** Microcontroller 28-Pin Details & Voltage Guide */
    'microcontroller-pin-details': getDriveImageSource(sukamConfig['sukam-shark'][5]?.link),
    'fan-overheating': getDriveImageSource(sukamConfig['sukam-shark']?.[4]?.link),
    /** Microcontroller */
    'microcontroller-pin-details': getDriveImageSource(sukamConfig['sukam-shark']?.[5]?.link),
  },

  // ─── Su-Kam Shiny Sine Wave ───────────────────────────────────────────────
  // ─── Su-Kam Shiny Sine Wave (from sukam.json) ─────────────────────────────
  'sukam-shiny-inverter': {
    /** Change Over (Pin 2) */
    'changeover': getDriveImageSource(sukamConfig['sukam-shiny'][0]?.link),
    /** Microcontroller 28-Pin Details (PIC16F72) */
    'microcontroller-pin-details': getDriveImageSource(sukamConfig['sukam-shiny'][1]?.link),
    'changeover': getDriveImageSource(sukamConfig['sukam-shiny']?.[0]?.link),
    /** Microcontroller */
    'microcontroller-pin-details': getDriveImageSource(sukamConfig['sukam-shiny']?.[1]?.link),
  },

  // ─── Livguard LG-E Model ──────────────────────────────────────────────────
  'livguard-inverter': {
    /**
     * Battery Low Sensing Circuit:
     *   12V Battery → R27 (15kΩ) → R56 (10kΩ) → Microcontroller Pin 16 (2.86V / 3.17V)
     *   R28 (3.3kΩ) + C21 (1µF / 63V) to GND
     */
    'low-battery': require('@/assets/diagrams/Livguard-LG-E-Model/pin 16 Livguard 700E Battery low.png'),

    /**
     * Charging Circuit (LG900 / 700 / 1100 / 700E):
     *   Micro Pin 10 → R36 (220Ω) → MOC3021 Optocoupler → R35/R39 1W Gate Drive
     *   Micro Pin 9 → R65 (6.8kΩ) → Q17 (1F) → Relay-2 (125V Transformer Tap)
     */
    'charging': require('@/assets/diagrams/Livguard-LG-E-Model/pin 9 10 Livguard 700E Charging.png'),
  },
};

/**
 * Get the circuit diagram image source for a specific inverter fault.
 * Returns { uri: string } or require(...) asset, or undefined if not available.
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
 * Get the web / Google Drive link for a circuit diagram if available.
 * Get the Google Drive link for a circuit diagram strictly from JSON files.
 */
export function getDiagramLink(
  inverterId?: string,
  faultId?: string,
): string | undefined {
  if (!inverterId || !faultId) return undefined;

  if (inverterId === 'LuminousEcoWatt') {
    const list = luminousConfig['Luminous-Eco-Watt-Plus'];
    if (faultId === 'low-battery') return list?.[0]?.link;
    if (faultId === 'main-feedback') return list?.[1]?.link;
  }

  if (inverterId === 'microtek-inverter') {
    const list = microtekConfig['microtek-eb-semi-sine-wave'];
    if (faultId === 'low-battery') return list?.[0]?.link;
    if (faultId === 'microcontroller-pin-details') return list?.[1]?.link;
  }

  if (inverterId === 'microtek-square-wave') {
    return microtekConfig['microtek-eb-square-wave']?.[0]?.link;
  }

  if (inverterId === 'microtek-24x7') {
    return microtekConfig['microtek-24x7-Non-Smd']?.[0]?.link;
  }

  if (inverterId === 'sukam-shark-inverter' || inverterId === 'sukam-shark') {
    const shark = sukamConfig['sukam-shark'];
    if (faultId === 'dead-vcc') return shark[0]?.link;
    if (faultId === 'changeover') return shark[1]?.link;
    if (faultId === 'low-battery') return shark[2]?.link;
    if (faultId === 'switch-relay') return shark[3]?.link;
    if (faultId === 'fan-overheating') return shark[4]?.link;
    if (faultId === 'microcontroller-pin-details') return shark[5]?.link;
    if (faultId === 'dead-vcc') return shark?.[0]?.link;
    if (faultId === 'changeover') return shark?.[1]?.link;
    if (faultId === 'low-battery') return shark?.[2]?.link;
    if (faultId === 'switch-relay') return shark?.[3]?.link;
    if (faultId === 'fan-overheating') return shark?.[4]?.link;
    if (faultId === 'microcontroller-pin-details') return shark?.[5]?.link;
  }

  if (inverterId === 'sukam-shiny-inverter' || inverterId === 'sukam-shiny') {
    const shiny = sukamConfig['sukam-shiny'];
    if (faultId === 'changeover') return shiny[0]?.link;
    if (faultId === 'microcontroller-pin-details') return shiny[1]?.link;
    if (faultId === 'changeover') return shiny?.[0]?.link;
    if (faultId === 'microcontroller-pin-details') return shiny?.[1]?.link;
  }

  return undefined;
}
