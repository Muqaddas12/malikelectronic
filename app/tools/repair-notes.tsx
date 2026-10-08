import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '@/components/AppHeader';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { deleteJob, RepairJob, saveJob, useBench } from '@/utils/benchStore';
const blank = (): RepairJob => ({ id: '', model: '', readings: '', components: '', outcome: '', checks: [], updated: '' });
export default function RepairNotesScreen() {
  const { colors } = useTheme(); const { isHindi } = useLanguage(); const { jobs } = useBench();
  const [draft, setDraft] = useState(blank); const [saving, setSaving] = useState(false);
  const labels = { model: isHindi ? 'जॉब / मॉडल / PCB रिवीजन' : 'Job / model / PCB revision', readings: isHindi ? 'माप (पिन, मान, यूनिट, मोड)' : 'Measurements (pin, value, unit, operating mode)', components: isHindi ? 'बदले गए कंपोनेंट' : 'Replaced components', outcome: isHindi ? 'नतीजा और बाकी काम' : 'Outcome and remaining work' };
  const checks = [['inspection', isHindi ? 'दृश्य जाँच पूरी' : 'Visual inspection complete'], ['readings', isHindi ? 'माप लिखे गए' : 'Measurements recorded'], ['retest', isHindi ? 'मरम्मत के बाद जाँच पूरी' : 'Post-repair check complete']];
  const save = async () => {
    if (!draft.model.trim()) { Alert.alert(isHindi ? 'मॉडल या जॉब नाम लिखें' : 'Enter a model or job name'); return; }
    setSaving(true);
    try { await saveJob({ ...draft, id: draft.id || `${Date.now()}-${Math.random().toString(36).slice(2)}`, updated: new Date().toISOString() }); setDraft(blank()); }
    catch { Alert.alert(isHindi ? 'सेव नहीं हुआ' : 'Could not save notes'); }
    finally { setSaving(false); }
  };
  return <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}><AppHeader showBack showMenu title={isHindi ? 'मरम्मत नोट्स' : 'Repair notes'} /><ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: 16, gap: 12 }}>
    {(Object.keys(labels) as Array<keyof typeof labels>).map(key => <View key={key}><Text style={{ color: colors.textDim, marginBottom: 6 }}>{labels[key]}</Text><TextInput accessibilityLabel={labels[key]} value={draft[key]} onChangeText={v => setDraft(s => ({ ...s, [key]: v }))} multiline={key !== 'model'} maxLength={key === 'model' ? 200 : 4000} style={{ color: colors.text, backgroundColor: colors.panel, borderRadius: 10, padding: 12, minHeight: key === 'model' ? 48 : 80, textAlignVertical: 'top' }} /></View>)}
    {checks.map(([id, title]) => <Pressable key={id} accessibilityRole="checkbox" accessibilityState={{ checked: draft.checks.includes(id) }} onPress={() => setDraft(s => ({ ...s, checks: s.checks.includes(id) ? s.checks.filter(c => c !== id) : [...s.checks, id] }))} style={{ minHeight: 48, justifyContent: 'center' }}><Text style={{ color: colors.text }}>{draft.checks.includes(id) ? '☑' : '☐'} {title}</Text></Pressable>)}
    <Pressable disabled={saving} onPress={() => { void save(); }} style={{ backgroundColor: colors.signal, padding: 14, borderRadius: 10 }}><Text style={{ color: colors.signalInk, textAlign: 'center' }}>{isHindi ? 'जॉब सेव करें' : 'Save job'}</Text></Pressable>
    {!!draft.id && <Pressable onPress={() => setDraft(blank())} style={{ minHeight: 48 }}><Text style={{ color: colors.signal }}>{isHindi ? 'एडिट रद्द' : 'Cancel edit'}</Text></Pressable>}
    {jobs.map(job => <View key={job.id} style={{ padding: 12, backgroundColor: colors.panel, borderRadius: 10, gap: 8 }}><Text style={{ color: colors.text, fontWeight: '700' }}>{job.model}</Text><Text style={{ color: colors.textDim }}>{job.outcome || job.readings}</Text><Text style={{ color: colors.textFaint }}>{new Date(job.updated).toLocaleDateString()}</Text><View style={{ flexDirection: 'row', gap: 24 }}><Pressable onPress={() => setDraft(job)} style={{ minHeight: 48, justifyContent: 'center' }}><Text style={{ color: colors.signal }}>{isHindi ? 'एडिट' : 'Edit'}</Text></Pressable><Pressable onPress={() => Alert.alert(isHindi ? 'जॉब हटाएँ?' : 'Delete job?', job.model, [{ text: isHindi ? 'रद्द' : 'Cancel' }, { text: isHindi ? 'हटाएँ' : 'Delete', style: 'destructive', onPress: () => { void deleteJob(job.id).catch(() => Alert.alert('Could not delete')); } }])} style={{ minHeight: 48, justifyContent: 'center' }}><Text style={{ color: colors.textDim }}>{isHindi ? 'हटाएँ' : 'Delete'}</Text></Pressable></View></View>)}
  </ScrollView></SafeAreaView>;
}
