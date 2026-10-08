import React, { useMemo, useState } from 'react';
import { Alert, FlatList, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Href } from 'expo-router';
import AppHeader from '@/components/AppHeader';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useBench } from '@/utils/benchStore';
import { useSafeNavigate } from '@/hooks/useSafeNavigate';
import { inverters } from '@/data/inverters';
import { IC_DATABASE } from '@/data/ics';
import { getFaultsForInverter } from '@/data/inverterfaults';

export default function LibraryScreen() {
  const { colors } = useTheme();
  const { language, isHindi } = useLanguage();
  const { safePush } = useSafeNavigate();
  const saved = useBench();
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState('search');
  const index = useMemo(() => [
    ...inverters.map(i => ({ id: `model:${i.id}`, title: `${i.brand} ${i.model}`, detail: `${i.capacity} · ${i.batteryVoltage}`, route: `/inverter/${encodeURIComponent(i.id)}`, text: `${i.brand} ${i.model} ${i.capacity} ${i.batteryVoltage}` })),
    ...IC_DATABASE.map(i => ({ id: `ic:${i.id}`, title: i.name, detail: `${i.verification === 'verified' ? (isHindi ? 'पुष्टि हुई' : 'Verified') : (isHindi ? 'पुष्टि बाकी' : 'Pending')} · ${i.dipPackageName || i.smdPackageName}`, route: `/tools/ic-guide?ic=${encodeURIComponent(i.id)}`, text: `${i.name} ${i.aliases.join(' ')} ${i.category} ${i.simpleSummaryEn} ${i.simpleSummaryHi}` })),
    ...inverters.flatMap(i => getFaultsForInverter(i.id, language).map(f => ({ id: `diagram:${i.id}:${f.id}`, title: `${i.model} · ${f.title}`, detail: isHindi ? 'डायग्राम / खराबी' : 'Diagram / fault', route: `/inverter/fault/${encodeURIComponent(f.id)}?id=${encodeURIComponent(i.id)}`, text: `${i.brand} ${i.model} ${f.title} ${f.subtitle} ${f.symptoms.join(' ')}` }))),
  ].map(item => ({ ...item, text: item.text.toLowerCase() })), [language, isHindi]);
  const q = query.trim().toLowerCase();
  const rows = tab === 'search' ? index.filter(i => !q || q.split(/\s+/).every(word => i.text.includes(word))) : (tab === 'favorites' ? saved.favorites : saved.recent).filter(i => !q || i.title.toLowerCase().includes(q)).map(i => ({ ...i, detail: '' }));
  return <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
    <AppHeader showBack showMenu title={isHindi ? 'मेरी लाइब्रेरी' : 'My library'} />
    <TextInput accessibilityLabel={isHindi ? 'सभी में खोजें' : 'Global search'} value={query} onChangeText={setQuery} placeholder={isHindi ? 'मॉडल, IC या खराबी खोजें' : 'Search model, IC or symptom'} placeholderTextColor={colors.textFaint} style={{ margin: 12, padding: 12, minHeight: 48, borderRadius: 10, color: colors.text, backgroundColor: colors.panel }} />
    <View style={{ flexDirection: 'row', paddingHorizontal: 12 }}>{[['search', isHindi ? 'सभी' : 'All'], ['favorites', isHindi ? 'पसंदीदा' : 'Favorites'], ['recent', isHindi ? 'हाल में' : 'Recent']].map(([key, title]) => <Pressable key={key} accessibilityRole="tab" accessibilityState={{ selected: tab === key }} onPress={() => setTab(key)} style={{ flex: 1, minHeight: 48, justifyContent: 'center' }}><Text style={{ textAlign: 'center', color: tab === key ? colors.signal : colors.textDim }}>{title}</Text></Pressable>)}</View>
    <FlatList data={rows} keyExtractor={i => i.id} keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: 12, gap: 8 }} initialNumToRender={12} windowSize={5}
      ListEmptyComponent={<Text style={{ color: colors.textDim }}>{isHindi ? 'अभी कोई आइटम नहीं' : 'No items yet'}</Text>}
      renderItem={({ item }) => <Pressable accessibilityRole="button" onPress={() => safePush(item.route as Href)} style={{ padding: 14, minHeight: 64, borderRadius: 10, backgroundColor: colors.panel }}><Text style={{ color: colors.text, fontWeight: '700' }}>{item.title}</Text>{!!item.detail && <Text style={{ color: colors.textDim, marginTop: 4 }}>{item.detail}</Text>}</Pressable>} />
  </SafeAreaView>;
}
