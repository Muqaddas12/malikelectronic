import React, { useEffect } from 'react';
import { Alert, Pressable, Share, Text, View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { recordRecent, SavedItem, toggleFavorite, useBench } from '@/utils/benchStore';

export default function BenchActions({ item }: { item: SavedItem }) {
  const { colors } = useTheme();
  const { isHindi } = useLanguage();
  const { favorites } = useBench();
  useEffect(() => { void recordRecent(item).catch(() => {}); }, [item.id, item.title, item.route]);
  const saved = favorites.some(v => v.id === item.id);
  return <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
    <Pressable accessibilityRole="button" accessibilityState={{ selected: saved }} onPress={() => { void toggleFavorite(item).catch(() => Alert.alert(isHindi ? 'सेव नहीं हुआ' : 'Could not save')); }} style={{ minHeight: 48, padding: 12, justifyContent: 'center' }}><Text style={{ color: colors.signal }}>{saved ? '★' : '☆'} {isHindi ? 'पसंदीदा' : 'Favorite'}</Text></Pressable>
    <Pressable accessibilityRole="button" onPress={() => { void Share.share({ message: `Correction report / सुधार रिपोर्ट\n${item.title}\nReference: ${item.id}\n\nIssue / समस्या:\nExpected information / सही जानकारी:\nPCB revision / PCB रिवीजन:\nSource / स्रोत:` }).catch(() => Alert.alert(isHindi ? 'रिपोर्ट नहीं खुली' : 'Could not open report')); }} style={{ minHeight: 48, padding: 12, justifyContent: 'center' }}><Text style={{ color: colors.textDim }}>{isHindi ? 'गलती रिपोर्ट करें' : 'Report incorrect information'}</Text></Pressable>
  </View>;
}
