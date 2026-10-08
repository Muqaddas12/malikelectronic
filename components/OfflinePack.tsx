import React from 'react';
import { Alert, Platform, Pressable, Text, View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { downloadModel, offlineCount, removeModel, useOffline } from '@/utils/offlineDiagrams';
import { getConfiguredDiagrams } from '@/data/diagramCatalog';
export default function OfflinePack({ model }: { model: string }) {
  const { colors } = useTheme();
  const { isHindi } = useLanguage();
  const { entries, busy, progress } = useOffline();
  if (Platform.OS === 'web' || !getConfiguredDiagrams(model).length) return null;
  const saved = offlineCount(model);
  const size = Object.entries(entries).filter(([k]) => k.startsWith(`${encodeURIComponent(model)}--`)).reduce((sum, [, v]) => sum + v.size, 0);
  const error = () => Alert.alert(isHindi ? 'डाउनलोड पूरा नहीं हुआ' : 'Could not complete operation', isHindi ? 'कनेक्शन और खाली जगह जाँचें, फिर प्रयास करें।' : 'Check your connection and available storage, then retry.');
  return <View style={{ padding: 12, borderRadius: 10, backgroundColor: colors.panelSunken }}>
    <Text style={{ color: colors.textDim }}>{isHindi ? 'ऑफलाइन डायग्राम' : 'Offline diagrams'}: {saved}/{getConfiguredDiagrams(model).length} · {(size / 1048576).toFixed(1)} MB</Text>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
      <Pressable disabled={busy} onPress={() => { void downloadModel(model).then(r => Alert.alert(r.failed ? (isHindi ? 'कुछ डाउनलोड बाकी हैं' : 'Some downloads failed') : (isHindi ? 'ऑफलाइन तैयार' : 'Ready offline'), `${r.total - r.failed}/${r.total}`)).catch(error); }} style={{ minHeight: 48, justifyContent: 'center' }}><Text style={{ color: colors.signal }}>{busy ? progress : (isHindi ? 'मॉडल डाउनलोड / पुनः प्रयास' : 'Download model / retry')}</Text></Pressable>
      {!!size && <Pressable disabled={busy} onPress={() => Alert.alert(isHindi ? 'डाउनलोड हटाएँ?' : 'Remove downloaded diagrams?', '', [{ text: isHindi ? 'रद्द' : 'Cancel', style: 'cancel' }, { text: isHindi ? 'हटाएँ' : 'Remove', style: 'destructive', onPress: () => { void removeModel(model).catch(error); } }])} style={{ minHeight: 48, justifyContent: 'center' }}><Text style={{ color: colors.textDim }}>{isHindi ? 'डाउनलोड हटाएँ' : 'Remove downloads'}</Text></Pressable>}
    </View>
  </View>;
}
