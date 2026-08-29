/**
 * Diagram map — maps [inverterId][faultId] to the specific circuit diagram image.
 * These are hand-drawn/annotated PCB circuit diagrams (not PCB photos).
 * Images analyzed from assets/diagrams/*.
 */
export const diagramMap: Record<string, Record<string, any>> = {
  // ─── Luminous Eco Watt+ ────────────────────────────────────────────────────
  'LuminousEcoWatt': {
    /**
     * Fan circuit: PIC16F722 Pin6 → R126(1kΩ) → ULN2003A (Pin5/6) →
     *   R114 → D8 transistor → C45(63V10µF) → Fan Jack
     *   Pin17 → R66(1kΩ) → R46(1kΩ) (5V sense from 5050 ke 5Volt wali pin)
     */
    'fan': require('@/assets/diagrams/LuminousEcoWatt+/pin 6 17 luminous fan diagram.png'),
  },

  // ─── Microtek Home UPS (V4–V7) ────────────────────────────────────────────
  'microtek-inverter': {
    /**
     * Fan / Overheating circuit:
     *   Heat Sensor → R1(5101) → LM324 op-amp (pins 1-7):
     *     Comparator A: NR 3.14, OV HT > 0.74
     *     Comparator B: NR 0.79, OV HT > 3.14
     *   R9(8200) → R11(5101) → D7(4148) → positive common line
     *   R26(560) → Q15(BD139) transistor → Fan Jack (via D20)
     *   Pin 17 → R79(2201) → Q15; Pin 27 → R35(1001)
     */
    'fan': require('@/assets/diagrams/Microtek-V4-To-V7-Model/microtek fan problem.png'),
    'overheating': require('@/assets/diagrams/Microtek-V4-To-V7-Model/microtek fan problem.png'),

    /**
     * Relay changeover circuit:
     *   PIC16F72 Pin6 → R89(2201)/R87(2201)/R88(2701) → Q18(1F transistor) → Relay-3
     *   Pin16 → R78(2201) → Q12(1F transistor) → Relay-1 (200V/100V changeover at CN7)
     *   ZD2 zener diode + D30 protection; Relay-3 output pin → Main Line Phase
     */
    'relay': require('@/assets/diagrams/Microtek-V4-To-V7-Model/pin 6 16 relay Microtek diagram.png'),

    /**
     * Display / Indicator circuit:
     *   PIC16F72 Pin11→R45(5600)→Charging LED; Pin12→R48(5600)→Mains LED
     *   Pin13→R49(5600)→Battery Low LED; Pin14→R50(5600)→Overload LED
     *   Pin15→R52(5600); Pins11-14→Q6(1F)→R2(5600)→D14/D15
     *   Pin23→Q6(1F); Pin25→R80(4701)→Q16(1F)→Buzzer (Positive common line)
     */
    'no-output': require('@/assets/diagrams/Microtek-V4-To-V7-Model/11 12 13 14 15 23 25 microtek display diagram.png'),
  },

  // ─── Livguard LG-E Model ──────────────────────────────────────────────────
  'livguard-inverter': {
    /**
     * Battery Low sensing circuit:
     *   12V battery → R27(1502=15kΩ) → junction →
     *     R56(1002=10kΩ) in series with voltage node → 2.86V or 3.17V →
     *     micro ki pin number 16
     *   R28(3301=33kΩ) parallel → C21(1UF/63V) → GND
     *   Applies to LG1100/900/700/700E models
     */
    'low-battery': require('@/assets/diagrams/Livguard-LG-E-Model/pin 16 Livguard 700E Battery low.png'),

    /**
     * Charging circuit (LG900/700/1100 or LG700E):
     *   DC Section:
     *     Micro Pin10 → R36(2200=220Ω) → MOC3021 optocoupler → R35(4700=470Ω 1W)
     *       → power transistor (TO-220) → R40(1001=100Ω) → AC section
     *     Micro Pin9 → R65(6801=680Ω) → Q17(1F NPN) → Relay-2 coil (D9 flyback)
     *       Relay-2 COM → 125V wali tapping
     *   AC Section:
     *     R38(470E=470Ω 1W) → C12(D473K2J) metallized film cap → AC line
     *     Second D473K2J cap also in AC section
     */
    'charging': require('@/assets/diagrams/Livguard-LG-E-Model/pin 9 10 Livguard 700E Charging.png'),
  },
};

/**
 * Get the circuit diagram image for a specific inverter fault.
 * Returns the diagram image or undefined if not available.
 */
export function getDiagramImage(
  inverterId: string,
  faultId: string,
): any | undefined {
  return diagramMap[inverterId]?.[faultId];
}
