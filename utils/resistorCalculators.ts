// ─── EIA-96 1% SMD Resistor Lookup Table ──────────────────────────────────────
const EIA96_VALUES: Record<string, number> = {
  '01': 100, '02': 102, '03': 105, '04': 107, '05': 110, '06': 113, '07': 115, '08': 118,
  '09': 121, '10': 124, '11': 127, '12': 130, '13': 133, '14': 137, '15': 140, '16': 143,
  '17': 147, '18': 150, '19': 154, '20': 158, '21': 162, '22': 165, '23': 169, '24': 174,
  '25': 178, '26': 182, '27': 187, '28': 191, '29': 196, '30': 200, '31': 205, '32': 210,
  '33': 215, '34': 221, '35': 226, '36': 232, '37': 237, '38': 243, '39': 249, '40': 255,
  '41': 261, '42': 267, '43': 274, '44': 280, '45': 287, '46': 294, '47': 301, '48': 309,
  '49': 316, '50': 324, '51': 332, '52': 340, '53': 348, '54': 357, '55': 365, '56': 374,
  '57': 383, '58': 392, '59': 402, '60': 412, '61': 422, '62': 432, '63': 442, '64': 453,
  '65': 464, '66': 475, '67': 487, '68': 499, '69': 511, '70': 523, '71': 536, '72': 549,
  '73': 562, '74': 576, '75': 590, '76': 604, '77': 619, '78': 634, '79': 649, '80': 665,
  '81': 681, '82': 698, '83': 715, '84': 732, '85': 750, '86': 768, '87': 787, '88': 806,
  '89': 825, '90': 845, '91': 866, '92': 887, '93': 909, '94': 931, '95': 953, '96': 976,
};

const EIA96_MULTIPLIERS: Record<string, number> = {
  Z: 0.001,
  Y: 0.01,
  R: 0.01,
  X: 0.1,
  S: 0.1,
  A: 1,
  B: 10,
  C: 100,
  D: 1000,
  E: 10000,
  F: 100000,
};

export type SmdResult = {
  isValid: boolean;
  valueNum: number;
  formatted: string;
  format: string;
  multiplier: string;
  tolerance: string;
  error?: string;
};

/**
 * Format numeric ohms into human readable string (Ω, kΩ, MΩ).
 */
export function formatOhms(ohms: number): string {
  if (ohms === 0) return '0 Ω (Jumper)';
  if (ohms >= 1_000_000) {
    const val = ohms / 1_000_000;
    return `${Number(val.toFixed(3))} MΩ (${ohms.toLocaleString()} Ω)`;
  }
  if (ohms >= 1000) {
    const val = ohms / 1000;
    return `${Number(val.toFixed(3))} kΩ (${ohms.toLocaleString()} Ω)`;
  }
  return `${Number(ohms.toFixed(3))} Ω`;
}

/**
 * Decode any SMD Resistor Code (3-digit, 4-digit, Decimal with R/K/M, EIA-96).
 */
export function decodeSmdResistor(rawCode: string): SmdResult {
  const code = rawCode.trim().toUpperCase();

  if (!code) {
    return {
      isValid: false,
      valueNum: 0,
      formatted: '—',
      format: '—',
      multiplier: '—',
      tolerance: '—',
      error: 'Please enter a code',
    };
  }

  // 0 Ohm Jumper
  if (/^0+$/.test(code)) {
    return {
      isValid: true,
      valueNum: 0,
      formatted: '0 Ω (Jumper / Zero Ohm)',
      format: '0-Ohm Jumper',
      multiplier: '1x',
      tolerance: '±5% (0 Ω)',
    };
  }

  // Codes containing 'R', 'K', 'M' as decimal point (e.g. 4R7, R10, 0R22, 1K2, 2M2, R010, 1R00)
  if (/^[0-9]*[RKM][0-9]*$/.test(code)) {
    let multiplier = 1;
    let sep = 'R';
    if (code.includes('K')) {
      multiplier = 1000;
      sep = 'K';
    } else if (code.includes('M')) {
      multiplier = 1000000;
      sep = 'M';
    }

    const parts = code.split(sep);
    const wholeStr = parts[0] || '0';
    const decStr = parts[1] || '0';
    const num = parseFloat(`${wholeStr}.${decStr}`) * multiplier;

    return {
      isValid: true,
      valueNum: num,
      formatted: formatOhms(num),
      format: `Decimal Code with '${sep}'`,
      multiplier: `${multiplier}x`,
      tolerance: code.length >= 4 ? '±1%' : '±5%',
    };
  }

  // 3-digit EIA standard code (e.g. 103, 472, 100, 220)
  if (/^[0-9]{3}$/.test(code)) {
    const sig = parseInt(code.substring(0, 2), 10);
    const exp = parseInt(code[2], 10);
    const mult = Math.pow(10, exp);
    const num = sig * mult;

    return {
      isValid: true,
      valueNum: num,
      formatted: formatOhms(num),
      format: '3-Digit EIA (5% Tolerance)',
      multiplier: `10^${exp} (${mult.toLocaleString()}x)`,
      tolerance: '±5%',
    };
  }

  // 4-digit EIA precision code (e.g. 1001, 1002, 1502, 2201, 4701, 5101, 5601, 8200)
  if (/^[0-9]{4}$/.test(code)) {
    const sig = parseInt(code.substring(0, 3), 10);
    const exp = parseInt(code[3], 10);
    const mult = Math.pow(10, exp);
    const num = sig * mult;

    return {
      isValid: true,
      valueNum: num,
      formatted: formatOhms(num),
      format: '4-Digit Precision EIA (1% Tolerance)',
      multiplier: `10^${exp} (${mult.toLocaleString()}x)`,
      tolerance: '±1%',
    };
  }

  // EIA-96 Code (2 Digits + 1 Letter, e.g. 01C, 68A, 34B)
  if (/^[0-9]{2}[A-Z]$/.test(code)) {
    const digits = code.substring(0, 2);
    const letter = code[2];

    const baseVal = EIA96_VALUES[digits];
    const mult = EIA96_MULTIPLIERS[letter];

    if (baseVal !== undefined && mult !== undefined) {
      const num = baseVal * mult;
      return {
        isValid: true,
        valueNum: num,
        formatted: formatOhms(num),
        format: 'EIA-96 Precision System (1% Tolerance)',
        multiplier: `${mult}x (Letter ${letter})`,
        tolerance: '±1%',
      };
    }
  }

  return {
    isValid: false,
    valueNum: 0,
    formatted: 'Invalid Code',
    format: 'Unrecognized',
    multiplier: '—',
    tolerance: '—',
    error: 'Unrecognized SMD code. Examples: 103, 472, 1001, 5601, 4R7, 01C',
  };
}

// ─── DIP Through-Hole Color Code Definitions ───────────────────────────────────

export type ResistorColor = {
  name: string;
  nameHi: string;
  hex: string;
  digit?: number;
  multiplier?: number;
  tolerance?: number;
  textColor?: string;
};

export const RESISTOR_COLORS: ResistorColor[] = [
  { name: 'Black', nameHi: 'काला', hex: '#1C1917', digit: 0, multiplier: 1, textColor: '#FFFFFF' },
  { name: 'Brown', nameHi: 'भूरा', hex: '#78350F', digit: 1, multiplier: 10, tolerance: 1, textColor: '#FFFFFF' },
  { name: 'Red', nameHi: 'लाल', hex: '#DC2626', digit: 2, multiplier: 100, tolerance: 2, textColor: '#FFFFFF' },
  { name: 'Orange', nameHi: 'नारंगी', hex: '#EA580C', digit: 3, multiplier: 1000, textColor: '#FFFFFF' },
  { name: 'Yellow', nameHi: 'पीला', hex: '#EAB308', digit: 4, multiplier: 10000, textColor: '#000000' },
  { name: 'Green', nameHi: 'हरा', hex: '#16A34A', digit: 5, multiplier: 100000, tolerance: 0.5, textColor: '#FFFFFF' },
  { name: 'Blue', nameHi: 'नीला', hex: '#2563EB', digit: 6, multiplier: 1000000, tolerance: 0.25, textColor: '#FFFFFF' },
  { name: 'Violet', nameHi: 'बैंगनी', hex: '#7C3AED', digit: 7, multiplier: 10000000, tolerance: 0.1, textColor: '#FFFFFF' },
  { name: 'Gray', nameHi: 'धूसर / ग्रे', hex: '#6B7280', digit: 8, multiplier: 100000000, tolerance: 0.05, textColor: '#FFFFFF' },
  { name: 'White', nameHi: 'सफेद', hex: '#F3F4F6', digit: 9, multiplier: 1000000000, textColor: '#000000' },
  { name: 'Gold', nameHi: 'सुनहरा / गोल्ड', hex: '#D97706', multiplier: 0.1, tolerance: 5, textColor: '#FFFFFF' },
  { name: 'Silver', nameHi: 'चांदी / सिल्वर', hex: '#94A3B8', multiplier: 0.01, tolerance: 10, textColor: '#000000' },
];

export type DipCalculation = {
  valueNum: number;
  formatted: string;
  toleranceStr: string;
};

/**
 * Calculate 4-Band Resistor Value.
 */
export function calculate4Band(
  band1Index: number,
  band2Index: number,
  multIndex: number,
  tolIndex: number,
): DipCalculation {
  const d1 = RESISTOR_COLORS[band1Index]?.digit ?? 0;
  const d2 = RESISTOR_COLORS[band2Index]?.digit ?? 0;
  const mult = RESISTOR_COLORS[multIndex]?.multiplier ?? 1;
  const tol = RESISTOR_COLORS[tolIndex]?.tolerance ?? 5;

  const ohms = (d1 * 10 + d2) * mult;

  return {
    valueNum: ohms,
    formatted: formatOhms(ohms),
    toleranceStr: `±${tol}%`,
  };
}

/**
 * Calculate 5-Band Resistor Value.
 */
export function calculate5Band(
  band1Index: number,
  band2Index: number,
  band3Index: number,
  multIndex: number,
  tolIndex: number,
): DipCalculation {
  const d1 = RESISTOR_COLORS[band1Index]?.digit ?? 0;
  const d2 = RESISTOR_COLORS[band2Index]?.digit ?? 0;
  const d3 = RESISTOR_COLORS[band3Index]?.digit ?? 0;
  const mult = RESISTOR_COLORS[multIndex]?.multiplier ?? 1;
  const tol = RESISTOR_COLORS[tolIndex]?.tolerance ?? 1;

  const ohms = (d1 * 100 + d2 * 10 + d3) * mult;

  return {
    valueNum: ohms,
    formatted: formatOhms(ohms),
    toleranceStr: `±${tol}%`,
  };
}

