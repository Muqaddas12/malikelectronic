import { RESISTOR_COLORS } from './resistorCalculators';
export function positiveNumber(raw: string): number {
  if (!/^\d+(?:\.\d+)?(?:e[+-]?\d+)?$/i.test(raw.trim())) throw new Error('Enter a positive number.');
  const n = Number(raw);
  if (!Number.isFinite(n) || n <= 0) throw new Error('Enter a finite value greater than zero.');
  return n;
}
export function combineResistors(raw: string, parallel: boolean) {
  const values = raw.split(/[,;\s]+/).filter(Boolean).map(positiveNumber);
  if (values.length < 2 || values.length > 50) throw new Error('Enter 2–50 resistor values in ohms.');
  // Normalize to the smallest resistor to avoid overflowing reciprocals.
  const min = Math.min(...values);
  const result = parallel ? min / values.reduce((sum, r) => sum + min / r, 0) : values.reduce((sum, r) => sum + r, 0);
  if (!Number.isFinite(result) || result <= 0) throw new Error('Values are outside the supported range.');
  return result;
}
export function capacitorCode(raw: string) {
  const code = raw.trim().toUpperCase();
  if (!/^\d{3}[JKM]?$/.test(code)) throw new Error('Use a three-digit code, optionally followed by J, K or M.');
  const exponent = Number(code[2]);
  const pf = Number(code.slice(0, 2)) * 10 ** (exponent === 8 ? -2 : exponent === 9 ? -1 : exponent);
  if (pf === 0) throw new Error('Zero is not a supported capacitor marking.');
  return { pf, tolerance: ({ J: '±5%', K: '±10%', M: '±20%' } as Record<string, string>)[code[3]] || '' };
}
export function reverseResistor(value: number, digits: 2 | 3, tolerance: number) {
  if (!Number.isFinite(value) || value <= 0) throw new Error('Enter resistance greater than zero.');
  const tol = RESISTOR_COLORS.find(c => c.tolerance === tolerance && c.name !== 'None');
  if (!tol) throw new Error('Unsupported tolerance.');
  for (const multiplier of RESISTOR_COLORS.filter(c => c.multiplier !== undefined)) {
    const base = value / multiplier.multiplier!;
    const rounded = Math.round(base);
    if (rounded >= 10 ** (digits - 1) && rounded < 10 ** digits && Math.abs(base - rounded) < 1e-7) {
      return [...String(rounded).split('').map(n => RESISTOR_COLORS.find(c => c.digit === Number(n))!), multiplier, tol];
    }
  }
  throw new Error('This value cannot be represented exactly with the selected band count.');
}
