/**
 * Diagram map — maps [inverterId][faultId] to authentic hand-drawn / schematic circuit diagrams.
 * Only references genuine, dedicated pin-to-component diagrams.
 */
export const diagramMap: Record<string, Record<string, any>> = {
  // ─── Luminous Eco Watt+ ────────────────────────────────────────────────────
  'LuminousEcoWatt': {
    /**
     * Cooling Fan Circuit:
     *   PIC16F722 Pin 6 → R126 (1kΩ) → ULN2003A (Pin 5/6) → Pin 11/12 → Fan Jack (-)
     *   Pin 17 → R66 (1kΩ) → R46 (1kΩ) sensing line from 5050 5V rail
     */
    'fan': require('@/assets/diagrams/LuminousEcoWatt+/pin 6 17 luminous fan diagram.png'),
  },

  // ─── Microtek Home UPS (V4–V7) ────────────────────────────────────────────
  'microtek-inverter': {
    /**
     * Fan / Overheating Circuit:
     *   Heat Sensor → R1 (5.1k) → LM324 (pins 1-7) → Pin 27 PIC16F72
     *   Pin 17 → R79 (2.2k) → BD139 (Q15) → Fan Jack (via D20)
     */
    'fan': require('@/assets/diagrams/Microtek-V4-To-V7-Model/microtek fan problem.png'),
    'overheating': require('@/assets/diagrams/Microtek-V4-To-V7-Model/microtek fan problem.png'),

    /**
     * Relay Changeover & Phase Switching Circuit:
     *   PIC16F72 Pin 6 → R89/R87 (2.2k) → Q18 (1F) → Relay-3 (Phase Out)
     *   Pin 16 → R78 (2.2k) → Q12 (1F) → Relay-1 (200V / 140V Changeover at CN7)
     */
    'relay': require('@/assets/diagrams/Microtek-V4-To-V7-Model/pin 6 16 relay Microtek diagram.png'),

    /**
     * Display / Indicator LEDs & Buzzer Circuit:
     *   PIC16F72 Pins 11-15 (LEDs) + Q6 (1F) + Pin 25 → R80 (4.7k) → Q16 → Buzzer BZ1
     */
    'no-output': require('@/assets/diagrams/Microtek-V4-To-V7-Model/11 12 13 14 15 23 25 microtek display diagram.png'),
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

  // ─── Su-Kam Shark SMD / DIP (Square Wave) ──────────────────────────────────
  'sukam-shark-inverter': {
    /**
     * Microcontroller 28-Pin Details & Voltage Guide:
     *   Pins 1-28 complete functions, sensing, relay drives, switching & LED voltages
     */
    'microcontroller-pin-details': require('@/assets/diagrams/Sukam-Shark-Smd-Dip-Old-Model/Microcontroller.png'),
  },
};

/**
 * Get the circuit diagram image for a specific inverter fault.
 * Returns the diagram image or undefined if not available.
 */
export function getDiagramImage(
  inverterId?: string,
  faultId?: string,
): any | undefined {
  if (!inverterId || !faultId) return undefined;
  return diagramMap[inverterId]?.[faultId];
}
