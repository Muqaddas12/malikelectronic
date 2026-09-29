import React, { useState } from 'react';
import { Linking, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '@/components/AppHeader';
import { useLanguage } from '@/context/LanguageContext';
import { tr } from '@/data/translations';
import { calculate3Band, calculate4Band, calculate5Band, calculate6Band, RESISTOR_COLORS, ResistorColor, getResistorColors, ResistorStandard } from '@/utils/resistorCalculators';

type Mode = 3 | 4 | 5 | 6;
type Role = 'digit' | 'multiplier' | 'tolerance' | 'temperatureCoefficient';
const NONE = RESISTOR_COLORS.findIndex(c => c.name === 'None');
const GOLD = RESISTOR_COLORS.findIndex(c => c.name === 'Gold');
const REFERENCE = 'https://cdn.standards.iteh.ai/samples/20940/b5fb592a1a1749c79f33e4d987f7fefb/IEC-60062-2016.pdf';

export default function DipCalculatorScreen() {
  const { language } = useLanguage();
  const hi = language === 'hi';
  const [standard, setStandard] = useState<ResistorStandard>('iec');
  const colors = getResistorColors(standard);
  const [mode, setMode] = useState<Mode>(4);
  const [band1, setBand1] = useState(3);
  const [band2, setBand2] = useState(7);
  const [band3, setBand3] = useState(0);
  const [mult, setMult] = useState(2);
  const [tol, setTol] = useState(GOLD);
  const [tcr, setTcr] = useState(1);
  const result = mode === 3 ? calculate3Band(band1, band2, mult)
    : mode === 4 ? calculate4Band(band1, band2, mult, tol, standard)
    : mode === 5 ? calculate5Band(band1, band2, band3, mult, tol, standard)
    : calculate6Band(band1, band2, band3, mult, tol, tcr, standard);

  const switchMode = (next: Mode) => {
    if (next >= 4 && tol === NONE) setTol(GOLD);
    setMode(next);
  };
  const columns: { label: string; role: Role; selected: number; select: (n: number) => void; first?: boolean }[] = [
    { label: hi ? 'पहला अंक' : '1st digit', role: 'digit', selected: band1, select: setBand1, first: true },
    { label: hi ? 'दूसरा अंक' : '2nd digit', role: 'digit', selected: band2, select: setBand2 },
    ...(mode >= 5 ? [{ label: hi ? 'तीसरा अंक' : '3rd digit', role: 'digit' as const, selected: band3, select: setBand3 }] : []),
    { label: hi ? 'गुणक' : 'Multiplier', role: 'multiplier', selected: mult, select: setMult },
    // No band remains selectable from 4-band mode and switches to 3-band mode.
    { label: hi ? 'टॉलरेंस' : 'Tolerance', role: 'tolerance', selected: mode === 3 ? NONE : tol,
      select: n => { setTol(n); if (n === NONE) setMode(3); else if (mode === 3) setMode(4); } },
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
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F8FA" />
      <AppHeader showBack title={`🎨 ${tr(language, 'dipTitle')}`} subtitle={tr(language, 'dipSubtitle')} showMenu />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.modes}>
          {([3, 4, 5, 6] as const).map(n => (
            <Pressable key={n} accessibilityRole="button" accessibilityState={{ selected: mode === n }} onPress={() => switchMode(n)} style={[styles.mode, mode === n && styles.activeMode]}>
              <Text style={[styles.modeText, mode === n && styles.activeText]}>{n} {hi ? 'बैंड' : 'bands'}</Text>
            </Pressable>
          ))}
        </View>
        <View style={styles.modes}>
          {(['iec', 'legacy'] as const).map(table => <Pressable key={table} accessibilityRole="button" accessibilityState={{ selected: standard === table }} onPress={() => {
            if (getResistorColors(table)[tol]?.tolerance === undefined) setTol(GOLD);
            setStandard(table);
          }} style={[styles.mode, standard === table && styles.activeMode]}><Text style={[styles.modeText, standard === table && styles.activeText]}>{table === 'iec' ? 'IEC 60062' : (hi ? 'पुरानी रंग तालिका' : 'Legacy chart')}</Text></Pressable>)}
        </View>
        <Text style={styles.note}>{standard === 'iec'
          ? (hi ? 'IEC: नारंगी ±0.05%, पीला ±0.02%, ग्रे ±0.01%।' : 'IEC: orange ±0.05%, yellow ±0.02%, grey ±0.01%.')
          : (hi ? 'पुरानी तालिका: ग्रे ±0.05%; नारंगी/पीला टॉलरेंस नहीं।' : 'Legacy: grey ±0.05%; no orange/yellow tolerance.')}
          {' '}{hi ? 'पार्ट निर्माता की तालिका से मिलाएँ।' : 'Match the component manufacturer’s chart.'}</Text>
        <View style={styles.result}>
          <View style={styles.graphic}>
            <View style={styles.lead} />
            <View style={styles.body}>
              {stripes.map((index, position) => <View key={position} style={[styles.stripe, { backgroundColor: RESISTOR_COLORS[index].hex }, position === (mode >= 5 ? 4 : 3) && { marginLeft: 12 }]} />)}
            </View>
            <View style={styles.lead} />
          </View>
          <Text selectable style={styles.resultValue}>{result.formatted}</Text>
          <Text style={styles.resultMeta}>{result.toleranceStr}{result.temperatureCoefficient !== undefined ? ` • ${result.temperatureCoefficient} ppm/°C` : ''}</Text>
          {mode === 3 && <Text style={styles.note}>{hi ? 'टॉलरेंस बैंड नहीं: ±20%' : 'No tolerance band: ±20%'}</Text>}
          {mode === 6 && <Text style={styles.note}>{hi ? 'छठा बैंड तापमान के साथ प्रतिरोध में बदलाव बताता है।' : 'The sixth band specifies resistance change with temperature.'}</Text>}
        </View>
        <Text style={styles.hint}>{hi ? 'रंग चुनें • सभी बैंड देखने के लिए दाएँ-बाएँ स्वाइप करें' : 'Choose colours • Swipe sideways to see all bands'}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator contentContainerStyle={styles.columns}>
          {columns.map((column, columnIndex) => (
            <View key={`${column.role}-${columnIndex}`} style={styles.column}>
              <Text style={styles.columnTitle}>{column.label}</Text>
              <Text style={styles.selectedValue}>{valueLabel(colors[column.selected], column.role)}</Text>
              {colors.map((color, index) => ({ color, index }))
                .filter(({ color }) => color[column.role] !== undefined && !(column.first && color.digit === 0) && !(mode >= 5 && color.name === 'None'))
                .map(({ color, index }) => (
                  <Pressable key={color.name} accessibilityRole="button" accessibilityLabel={`${column.label}: ${hi ? color.nameHi : color.name}, ${valueLabel(color, column.role)}`} accessibilityState={{ selected: index === column.selected }} onPress={() => column.select(index)} style={[styles.color, { backgroundColor: color.hex }, column.selected === index && styles.selected]}>
                    <Text style={[styles.colorName, { color: color.textColor }]}>{hi ? color.nameHi : color.name}{column.selected === index ? ' ✓' : ''}</Text>
                    <Text style={[styles.colorValue, { color: color.textColor }]}>{valueLabel(color, column.role)}</Text>
                  </Pressable>
                ))}
            </View>
          ))}
        </ScrollView>
        <Text style={styles.note}>{hi ? 'रंग केवल अपने सही स्थान पर उपलब्ध हैं। एक अकेला काला बैंड 0 Ω जम्पर है।' : 'Each column shows valid colours for that position. A single black band marks a 0 Ω jumper.'}</Text>
        <Pressable accessibilityRole="link" onPress={() => { void Linking.openURL(standard === 'iec' ? REFERENCE : 'https://www.vishay.com/docs/20143/colorcod.pdf').catch(() => {}); }}><Text style={styles.source}>{hi ? 'संदर्भ रंग तालिका खोलें' : 'Open reference colour table'}</Text></Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F7F8FA' },
  content: { padding: 14, paddingBottom: 40, gap: 12 },
  modes: { flexDirection: 'row', gap: 6 },
  mode: { flex: 1, paddingVertical: 12, borderRadius: 10, backgroundColor: '#E5E7EB', alignItems: 'center' },
  activeMode: { backgroundColor: '#2563EB' },
  modeText: { color: '#334155', fontWeight: '700' },
  activeText: { color: '#FFFFFF' },
  result: { padding: 18, gap: 8, alignItems: 'center', borderRadius: 16, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0' },
  graphic: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  lead: { width: 30, height: 4, backgroundColor: '#94A3B8' },
  body: { flexDirection: 'row', alignItems: 'center', height: 40, paddingHorizontal: 12, gap: 6, borderRadius: 10, backgroundColor: '#E7D7C1', overflow: 'hidden' },
  stripe: { width: 10, height: 40 },
  resultValue: { fontSize: 23, fontWeight: '800', color: '#15803D', textAlign: 'center' },
  resultMeta: { fontSize: 16, color: '#166534', fontWeight: '700' },
  hint: { color: '#475569', fontSize: 12 },
  columns: { gap: 8, paddingBottom: 12 },
  column: { width: 108, gap: 6 },
  columnTitle: { color: '#0F172A', textAlign: 'center', fontWeight: '800', fontSize: 13 },
  selectedValue: { color: '#2563EB', textAlign: 'center', fontSize: 12, marginBottom: 4 },
  color: { minHeight: 52, borderRadius: 8, borderWidth: 2, borderColor: 'transparent', padding: 5, justifyContent: 'center', alignItems: 'center' },
  selected: { borderColor: '#0F172A' },
  colorName: { fontSize: 12, fontWeight: '700', textAlign: 'center' },
  colorValue: { fontSize: 12, textAlign: 'center' },
  note: { color: '#64748B', fontSize: 12, lineHeight: 18, textAlign: 'center' },
  source: { color: '#2563EB', fontSize: 12, textAlign: 'center', padding: 8 },
});
