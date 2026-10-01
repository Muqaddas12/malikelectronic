import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useLanguage } from '@/context/LanguageContext';
import { calculate3Band, calculate4Band, calculate5Band, calculate6Band, RESISTOR_COLORS, ResistorColor, getResistorColors } from '@/utils/resistorCalculators';

type Mode = 3 | 4 | 5 | 6;
type Role = 'digit' | 'multiplier' | 'tolerance' | 'temperatureCoefficient';
const NONE = RESISTOR_COLORS.findIndex(c => c.name === 'None');
const GOLD = RESISTOR_COLORS.findIndex(c => c.name === 'Gold');

export default function DipCalculator() {
  const { language } = useLanguage();
  const hi = language === 'hi';
  const colors = getResistorColors('iec');
  const [mode, setMode] = useState<Mode>(4);
  const { height } = useWindowDimensions();
  const swatchHeight = Math.max(18, Math.min(32, Math.floor((height - 370) / colors.length) - 3));
  const [band1, setBand1] = useState(3);
  const [band2, setBand2] = useState(7);
  const [band3, setBand3] = useState(0);
  const [mult, setMult] = useState(2);
  const [tol, setTol] = useState(GOLD);
  const [tcr, setTcr] = useState(1);
  const result = mode === 3 ? calculate3Band(band1, band2, mult)
    : mode === 4 ? calculate4Band(band1, band2, mult, tol, 'iec')
    : mode === 5 ? calculate5Band(band1, band2, band3, mult, tol, 'iec')
    : calculate6Band(band1, band2, band3, mult, tol, tcr, 'iec');

  const switchMode = (next: Mode) => {
    if (next >= 4 && tol === NONE) setTol(GOLD);
    setMode(next);
  };
  const columns: { label: string; role: Role; selected: number; select: (n: number) => void }[] = [
    { label: hi ? 'पहला अंक' : '1st digit', role: 'digit', selected: band1, select: setBand1 },
    { label: hi ? 'दूसरा अंक' : '2nd digit', role: 'digit', selected: band2, select: setBand2 },
    ...(mode >= 5 ? [{ label: hi ? 'तीसरा अंक' : '3rd digit', role: 'digit' as const, selected: band3, select: setBand3 }] : []),
    { label: hi ? 'गुणक' : 'Multiplier', role: 'multiplier', selected: mult, select: setMult },
    // No band remains selectable from 4-band mode and switches to 3-band mode.
    ...(mode >= 4 ? [{ label: hi ? 'टॉलरेंस' : 'Tolerance', role: 'tolerance' as const, selected: mode === 3 ? NONE : tol,
      select: (n: number) => { setTol(n); if (n === NONE) setMode(3); } }] : []),
    ...(mode === 6 ? [{ label: hi ? 'ताप गुणांक' : 'TCR', role: 'temperatureCoefficient' as const, selected: tcr, select: setTcr }] : []),
  ];
  const stripes = [band1, band2, ...(mode >= 5 ? [band3] : []), mult, ...(mode >= 4 ? [tol] : []), ...(mode === 6 ? [tcr] : [])];
  const valueLabel = (color: ResistorColor, role: Role) => {
    const value = color[role];
    if (role === 'digit') return String(value);
    if (role === 'tolerance') return `±${value}%`;
    if (role === 'temperatureCoefficient') return `${value} ppm/°C`;
    return `×${value! >= 1e9 ? `${value! / 1e9}G` : value! >= 1e6 ? `${value! / 1e6}M` : value! >= 1e3 ? `${value! / 1e3}k` : value}`;
  };

  return (
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.modes}>
          {([3, 4, 5, 6] as const).map(n => (
            <Pressable key={n} accessibilityRole="button" accessibilityState={{ selected: mode === n }} onPress={() => switchMode(n)} style={[styles.mode, mode === n && styles.activeMode]}>
              <Text style={[styles.modeText, mode === n && styles.activeText]}>{`${n} ${hi ? 'बैंड' : 'bands'}`}</Text>
            </Pressable>
          ))}
        </View>
        <View style={styles.result}>
          <View style={styles.graphic}>
            <View style={styles.lead} />
            <View style={styles.body}>
              {stripes.map((index, position) => <View key={position} style={[styles.stripe, { backgroundColor: RESISTOR_COLORS[index].hex }, position === (mode >= 5 ? 4 : 3) && { marginLeft: 12 }]} />)}
            </View>
            <View style={styles.lead} />
          </View>
          <Text selectable numberOfLines={1} adjustsFontSizeToFit style={styles.resultValue}>
            {result.formatted}
            {result.toleranceStr ? <Text style={styles.resultMeta}>{`  ${result.toleranceStr}`}</Text> : null}
          </Text>
          {result.temperatureCoefficient !== undefined && <Text style={styles.resultMeta}>{result.temperatureCoefficient} ppm/°C</Text>}
        </View>
        <View style={styles.columns}>
          {columns.map((column, columnIndex) => (
            <View key={`${column.role}-${columnIndex}`} style={styles.column}>
              {colors.map((color, index) => {
                const valid = color[column.role] !== undefined
                  && !(mode >= 5 && color.name === 'None');
                if (!valid) return <View key={color.name} style={{ height: swatchHeight }} />;
                return (
                  <Pressable
                    key={color.name}
                    accessibilityRole="button"
                    accessibilityLabel={`${hi ? 'बैंड' : 'Band'} ${columnIndex + 1}, ${column.label}: ${hi ? color.nameHi : color.name}, ${valueLabel(color, column.role)}`}
                    accessibilityState={{ selected: index === column.selected }}
                    onPress={() => column.select(index)}
                    style={[styles.color, { height: swatchHeight, backgroundColor: color.hex }]}
                  >
                    <Text numberOfLines={1} adjustsFontSizeToFit style={[styles.colorName, { color: color.textColor }]}>
                      {hi ? color.nameHi.split(' / ')[0] : color.name}
                    </Text>
                    {column.selected === index && <View style={[styles.selectionMark, { borderColor: color.textColor }]} />}
                  </Pressable>
                );
              })}
            </View>
          ))}
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 12, paddingBottom: 24, gap: 8 },
  modes: { flexDirection: 'row', gap: 6 },
  mode: { flex: 1, paddingVertical: 12, borderRadius: 10, backgroundColor: '#E5E7EB', alignItems: 'center' },
  activeMode: { backgroundColor: '#2563EB' },
  modeText: { color: '#334155', fontWeight: '700' },
  activeText: { color: '#FFFFFF' },
  result: { padding: 10, gap: 4, alignItems: 'center', borderRadius: 16, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0' },
  graphic: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  lead: { width: 30, height: 4, backgroundColor: '#94A3B8' },
  body: { flexDirection: 'row', alignItems: 'center', height: 40, paddingHorizontal: 12, gap: 6, borderRadius: 10, backgroundColor: '#E7D7C1', overflow: 'hidden' },
  stripe: { width: 10, height: 40 },
  resultValue: { width: '100%', fontSize: 23, fontWeight: '800', color: '#15803D', textAlign: 'center' },
  resultMeta: { fontSize: 16, color: '#166534', fontWeight: '700' },
  columns: { flexDirection: 'row', gap: 6 },
  column: { flex: 1, gap: 3 },
  color: { borderRadius: 5, borderWidth: 1, borderColor: '#CBD5E1', alignItems: 'center', justifyContent: 'center' },
  colorName: { fontSize: 9, fontWeight: '600', textAlign: 'center', paddingHorizontal: 3 },
  selectionMark: { position: 'absolute', top: 1, bottom: 1, left: 1, right: 1, borderRadius: 3, borderWidth: 2, pointerEvents: 'none' },
});
