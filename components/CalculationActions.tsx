import React from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { saveCalculation } from '@/utils/benchStore';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
export default function CalculationActions({ value }: { value: string }) {
  const { colors } = useTheme();
  const { isHindi } = useLanguage();
  const run = async (copy: boolean) => {
    try {
      if (copy) await Clipboard.setStringAsync(value);
      await saveCalculation(value);
      Alert.alert(isHindi ? (copy ? 'कॉपी किया' : 'सेव किया') : (copy ? 'Copied' : 'Saved to recent calculations'));
    } catch { Alert.alert(isHindi ? 'सेव नहीं हुआ' : 'Could not save result'); }
  };
  return <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 12 }}>{[true, false].map(copy => <Pressable key={String(copy)} accessibilityRole="button" onPress={() => { void run(copy); }} style={{ minHeight: 48, padding: 12, justifyContent: 'center' }}><Text style={{ color: colors.signal }}>{copy ? (isHindi ? 'कॉपी' : 'Copy') : (isHindi ? 'सेव' : 'Save')}</Text></Pressable>)}</View>;
}
