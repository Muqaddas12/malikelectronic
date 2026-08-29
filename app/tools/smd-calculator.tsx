import React, { useState } from 'react';

import {
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useLanguage } from '@/context/LanguageContext';
import { tr } from '@/data/translations';
import { useSafeNavigate } from '@/hooks/useSafeNavigate';
import { decodeSmdResistor } from '@/utils/resistorCalculators';

// Popular SMD codes found on Luminous, Microtek, and Livguard inverter PCBs
const POPULAR_SMD = [
  { code: '1001', label: '1kΩ (R126, R35, R46)' },
  { code: '1002', label: '10kΩ (R56 Sensing)' },
  { code: '1502', label: '15kΩ (R27 Battery Low)' },
  { code: '2201', label: '2.2kΩ (R78, R89 Relay)' },
  { code: '3301', label: '3.3kΩ (R28 Divider)' },
  { code: '4701', label: '4.7kΩ (R80 Buzzer)' },
  { code: '5101', label: '5.1kΩ (R1, R11 Heat Sensor)' },
  { code: '5601', label: '5.6kΩ (R26 Op-Amp)' },
  { code: '5600', label: '560Ω (R45-R52 LEDs)' },
  { code: '8200', label: '820Ω (R9 Reference)' },
  { code: '4R7', label: '4.7Ω (Gate Drive)' },
  { code: '01C', label: '10kΩ (EIA-96 1%)' },
];

export default function SmdCalculatorScreen() {
  const { language } = useLanguage();
  const { safeBack } = useSafeNavigate();

  const [smdInput, setSmdInput] = useState('1001');
  const smdResult = decodeSmdResistor(smdInput);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F8FA" />

      {/* Top Header Bar with Back Button */}
      <View style={styles.header}>
        <Pressable
          onPress={() => safeBack()}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backText}>
            {tr(language, 'back')}
          </Text>
        </Pressable>

        <Text style={styles.pageTitle}>
          📱 {tr(language, 'smdTitle')}
        </Text>
        <Text style={styles.pageSubtitle}>
          {tr(language, 'smdSubtitle')}
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Input & Simulation Card */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>
            {tr(language, 'enterSmdCode')}
          </Text>

          <View style={styles.inputRow}>
            <TextInput
              value={smdInput}
              onChangeText={(val) => setSmdInput(val.toUpperCase())}
              placeholder={tr(language, 'smdPlaceholder')}
              placeholderTextColor="#9CA3AF"
              style={styles.textInput}
              autoCapitalize="characters"
              maxLength={6}
            />
            {smdInput.length > 0 && (
              <Pressable
                onPress={() => setSmdInput('')}
                style={styles.clearBtn}
              >
                <Text style={styles.clearBtnText}>✕</Text>
              </Pressable>
            )}
          </View>

          {/* Graphic SMD Chip Simulation */}
          <View style={styles.smdChipContainer}>
            <View style={styles.smdChipLeadLeft} />
            <View style={styles.smdChipBody}>
              <Text style={styles.smdChipText}>
                {smdInput.trim() || '____'}
              </Text>
              <Text style={styles.smdChipSub}>SMD RESISTOR</Text>
            </View>
            <View style={styles.smdChipLeadRight} />
          </View>

          {/* Calculation Result */}
          {smdResult.isValid ? (
            <View style={styles.resultBox}>
              <Text style={styles.resultLabel}>
                {tr(language, 'calculatedResistance')}
              </Text>
              <Text style={styles.resultValue}>{smdResult.formatted}</Text>

              <View style={styles.metaGrid}>
                <View style={styles.metaItem}>
                  <Text style={styles.metaKey}>
                    {tr(language, 'codeFormat')}
                  </Text>
                  <Text style={styles.metaVal}>{smdResult.format}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Text style={styles.metaKey}>
                    {tr(language, 'multiplierVal')}
                  </Text>
                  <Text style={styles.metaVal}>{smdResult.multiplier}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Text style={styles.metaKey}>
                    {tr(language, 'tolerance')}
                  </Text>
                  <Text style={styles.metaVal}>{smdResult.tolerance}</Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>
                {smdResult.error || 'Invalid code format'}
              </Text>
            </View>
          )}
        </View>

        {/* Popular Inverter SMD Resistor Presets */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            ⚡ {tr(language, 'quickExamples')}
          </Text>
          <View style={styles.quickGrid}>
            {POPULAR_SMD.map((item) => (
              <Pressable
                key={item.code}
                onPress={() => setSmdInput(item.code)}
                style={[
                  styles.quickChip,
                  smdInput === item.code && styles.quickChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.quickChipCode,
                    smdInput === item.code && styles.quickChipCodeActive,
                  ]}
                >
                  {item.code}
                </Text>
                <Text style={styles.quickChipLabel}>{item.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },

  header: {
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 12,
  },

  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingRight: 15,
    marginBottom: 6,
  },

  backText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2563EB',
  },

  pageTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#111827',
  },

  pageSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 3,
  },

  content: {
    paddingHorizontal: 18,
    paddingBottom: 60,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },

  cardLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: '#374151',
    marginBottom: 10,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#111827',
    marginBottom: 12,
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2563EB',
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 14,
  },

  textInput: {
    flex: 1,
    height: 52,
    fontSize: 22,
    fontWeight: '900',
    color: '#111827',
    letterSpacing: 2,
  },

  clearBtn: {
    padding: 8,
  },

  clearBtnText: {
    fontSize: 16,
    color: '#9CA3AF',
    fontWeight: '800',
  },

  /* SMD CHIP GRAPHIC */

  smdChipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 18,
  },

  smdChipLeadLeft: {
    width: 22,
    height: 48,
    backgroundColor: '#94A3B8',
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },

  smdChipBody: {
    width: 140,
    height: 64,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },

  smdChipText: {
    color: '#F8FAFC',
    fontSize: 24,
    fontWeight: '900',
    fontFamily: 'monospace',
    letterSpacing: 3,
  },

  smdChipSub: {
    color: '#64748B',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 1,
    marginTop: 2,
  },

  smdChipLeadRight: {
    width: 22,
    height: 48,
    backgroundColor: '#94A3B8',
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },

  /* RESULT BOX */

  resultBox: {
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    alignItems: 'center',
  },

  resultLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#2563EB',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  resultValue: {
    fontSize: 26,
    fontWeight: '900',
    color: '#1E3A8A',
    marginVertical: 6,
    textAlign: 'center',
  },

  metaGrid: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#DBEAFE',
    justifyContent: 'space-between',
  },

  metaItem: {
    alignItems: 'center',
    flex: 1,
  },

  metaKey: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '700',
  },

  metaVal: {
    fontSize: 11,
    fontWeight: '800',
    color: '#1E3A8A',
    marginTop: 2,
    textAlign: 'center',
  },

  errorBox: {
    backgroundColor: '#FEF2F2',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FECACA',
  },

  errorText: {
    color: '#DC2626',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },

  /* QUICK SMD CHIPS */

  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  quickChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  quickChipActive: {
    backgroundColor: '#EFF6FF',
    borderColor: '#2563EB',
  },

  quickChipCode: {
    fontSize: 14,
    fontWeight: '900',
    color: '#111827',
  },

  quickChipCodeActive: {
    color: '#1D4ED8',
  },

  quickChipLabel: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 2,
  },
});

