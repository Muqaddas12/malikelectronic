import CalculationActions from '@/components/CalculationActions';
import { useTheme } from '@/context/ThemeContext';
import { Palette } from '@/constants/theme';
import React, { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useLanguage } from '@/context/LanguageContext';
import { tr } from '@/data/translations';
import { decodeSmdResistor } from '@/utils/resistorCalculators';

// Generic marking examples; no specific board has been verified.
const POPULAR_SMD = [
  { code: '1001', label: '1kΩ' },
  { code: '1002', label: '10kΩ' },
  { code: '1502', label: '15kΩ' },
  { code: '2201', label: '2.2kΩ' },
  { code: '3301', label: '3.3kΩ' },
  { code: '4701', label: '4.7kΩ' },
  { code: '5101', label: '5.1kΩ' },
  { code: '5601', label: '5.6kΩ' },
  { code: '5600', label: '560Ω' },
  { code: '8200', label: '820Ω' },
  { code: '4R7', label: '4.7Ω' },
  { code: '01C', label: '10kΩ' },
];

export default function SmdCalculator() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { language } = useLanguage();
  const [smdInput, setSmdInput] = useState('1001');
  const smdResult = decodeSmdResistor(smdInput);

  return (
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={{ color: colors.textDim, fontSize: 12, marginBottom: 8 }}>{language === 'hi' ? 'सामान्य उदाहरण • PCB मॉडल की पुष्टि नहीं' : 'Generic examples • PCB model not verified'}</Text>
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
              placeholderTextColor={colors.textFaint}
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
              <Text style={styles.resultValue}>{smdResult.formatted} <Text style={{ fontSize: 16 }}>{smdResult.tolerance}</Text></Text>
              <CalculationActions value={`SMD ${smdInput} → ${smdResult.formatted} ${smdResult.tolerance}`} />

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
  );
}

const createStyles = (colors: Palette) => StyleSheet.create({
  content: {
    paddingHorizontal: 18,
    paddingTop: 6,
    paddingBottom: 60,
  },

  card: {
    backgroundColor: colors.panel,
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.rule,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },

  cardLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textDim,
    marginBottom: 10,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 12,
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.signal,
    borderRadius: 14,
    backgroundColor: colors.panelRaised,
    paddingHorizontal: 14,
  },

  textInput: {
    flex: 1,
    height: 52,
    fontSize: 22,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: 2,
  },

  clearBtn: {
    padding: 8,
  },

  clearBtnText: {
    fontSize: 16,
    color: colors.textFaint,
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
    backgroundColor: colors.readoutSoft,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.rule,
    alignItems: 'center',
  },

  resultLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.signal,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  resultValue: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.readout,
    marginVertical: 6,
    textAlign: 'center',
  },

  metaGrid: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.rule,
    justifyContent: 'space-between',
  },

  metaItem: {
    alignItems: 'center',
    flex: 1,
  },

  metaKey: {
    fontSize: 10,
    color: colors.textDim,
    fontWeight: '700',
  },

  metaVal: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.readout,
    marginTop: 2,
    textAlign: 'center',
  },

  errorBox: {
    backgroundColor: colors.panelSunken,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.rule,
  },

  errorText: {
    color: colors.severity.critical,
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
    backgroundColor: colors.panelRaised,
    borderWidth: 1,
    borderColor: colors.rule,
  },

  quickChipActive: {
    backgroundColor: colors.readoutSoft,
    borderColor: colors.signal,
  },

  quickChipCode: {
    fontSize: 14,
    fontWeight: '900',
    color: colors.text,
  },

  quickChipCodeActive: {
    color: colors.readout,
  },

  quickChipLabel: {
    fontSize: 10,
    color: colors.textDim,
    marginTop: 2,
  },
});
