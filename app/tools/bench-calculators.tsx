import React, { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '@/components/AppHeader';
import CalculationActions from '@/components/CalculationActions';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useBench } from '@/utils/benchStore';
import { capacitorCode, combineResistors, positiveNumber, reverseResistor } from '@/utils/benchCalculators';
import { formatOhms } from '@/utils/resistorCalculators';

export default function BenchCalculatorsScreen() {
  const { colors } = useTheme(); const { isHindi } = useLanguage(); const { calculations } = useBench();
  const [mode, setMode] = useState('reverse'); const [input, setInput] = useState('4700'); const [second, setSecond] = useState('1000');
  const [digits, setDigits] = useState<2 | 3>(2); const [tolerance, setTolerance] = useState(5);
  let result = ''; let error = ''; let bands: ReturnType<typeof reverseResistor> = [];
  try {
    if (mode === 'reverse') { bands = reverseResistor(positiveNumber(input), digits, tolerance); result = `${formatOhms(positiveNumber(input))} ±${tolerance}% · ${bands.map(b => isHindi ? b.nameHi : b.name).join(' · ')}`; }
    else if (mode === 'series' || mode === 'parallel') result = formatOhms(combineResistors(input, mode === 'parallel'));
    else if (mode === 'capacitor') { const { pf, tolerance } = capacitorCode(input); result = `${pf} pF = ${pf / 1000} nF = ${pf / 1e6} µF ${tolerance}`; }
    else {
      const v = positiveNumber(input); const r = positiveNumber(second); const i = v / r; const p = v * i;
      if (!Number.isFinite(i) || !Number.isFinite(p) || i === 0 || p === 0) throw new Error('Values are outside the supported range.');
      result = `I = ${Number(i.toPrecision(8))} A · P = ${Number(p.toPrecision(8))} W`;
    }
  } catch (e) { error = e instanceof Error ? e.message : 'Invalid value'; }
  const options = [['reverse', isHindi ? 'मान → रंग' : 'Value → bands'], ['series', isHindi ? 'सीरीज' : 'Series'], ['parallel', isHindi ? 'पैरेलल' : 'Parallel'], ['ohm', isHindi ? 'ओम का नियम' : 'Ohm’s law'], ['capacitor', isHindi ? 'कैपेसिटर' : 'Capacitor']];
  const inputLabel = mode === 'capacitor' ? 'Code (104, 472J)' : mode === 'ohm' ? 'Voltage (V)' : mode === 'reverse' ? 'Resistance (Ω)' : 'Resistors in Ω (100, 220, 470)';
  return <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}><AppHeader showBack showMenu title={isHindi ? 'बेंच कैलकुलेटर' : 'Bench calculators'} /><ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: 16, gap: 12 }}>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>{options.map(([key, title]) => <Pressable key={key} accessibilityRole="tab" accessibilityState={{ selected: mode === key }} onPress={() => { setMode(key); setInput(key === 'capacitor' ? '104' : key === 'reverse' ? '4700' : key === 'ohm' ? '12' : '100, 220'); }} style={{ minHeight: 48, padding: 12, borderRadius: 10, justifyContent: 'center', backgroundColor: mode === key ? colors.signal : colors.panel }}><Text style={{ color: mode === key ? colors.signalInk : colors.text }}>{title}</Text></Pressable>)}</View>
    <Text style={{ color: colors.textDim }}>{inputLabel}</Text><TextInput accessibilityLabel={inputLabel} value={input} onChangeText={setInput} autoCapitalize="characters" maxLength={400} style={{ minHeight: 52, padding: 12, color: colors.text, backgroundColor: colors.panel, borderRadius: 10 }} />
    {mode === 'ohm' && <><Text style={{ color: colors.textDim }}>{isHindi ? 'रेजिस्टेंस (Ω)' : 'Resistance (Ω)'}</Text><TextInput accessibilityLabel="Resistance in ohms" value={second} onChangeText={setSecond} keyboardType="decimal-pad" maxLength={30} style={{ minHeight: 52, padding: 12, color: colors.text, backgroundColor: colors.panel, borderRadius: 10 }} /></>}
    {mode === 'reverse' && <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>{([2, 3] as const).map(n => <Pressable key={n} onPress={() => setDigits(n)} style={{ minHeight: 48, padding: 12 }}><Text style={{ color: digits === n ? colors.signal : colors.textDim }}>{n + 2} {isHindi ? 'बैंड' : 'bands'}</Text></Pressable>)}{[1, 2, 5, 10].map(n => <Pressable key={n} onPress={() => setTolerance(n)} style={{ minHeight: 48, padding: 12 }}><Text style={{ color: tolerance === n ? colors.signal : colors.textDim }}>±{n}%</Text></Pressable>)}</View>}
    {!!bands.length && <View style={{ flexDirection: 'row', gap: 6 }}>{bands.map((b, i) => <View key={i} style={{ flex: 1, minHeight: 48, borderRadius: 6, justifyContent: 'center', backgroundColor: b.hex }}><Text style={{ color: b.textColor, textAlign: 'center', fontSize: 11 }}>{isHindi ? b.nameHi : b.name}</Text></View>)}</View>}
    <Text selectable style={{ fontSize: 19, color: error ? colors.textDim : colors.readout }}>{error || result}</Text>
    {!!result && <CalculationActions value={`${options.find(v => v[0] === mode)?.[1]} · ${input}${mode === 'ohm' ? ` V / ${second} Ω` : ''} → ${result}`} />}
    <Text style={{ color: colors.text, fontWeight: '700' }}>{isHindi ? 'सेव किए गए परिणाम' : 'Recent saved calculations'}</Text>
    {calculations.map(value => <Text selectable key={value} style={{ padding: 12, color: colors.textDim, backgroundColor: colors.panel, borderRadius: 10 }}>{value}</Text>)}
  </ScrollView></SafeAreaView>;
}
