import React, { useState } from 'react';

import {
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useLanguage } from '@/context/LanguageContext';
import { tr } from '@/data/translations';
import { useSafeNavigate } from '@/hooks/useSafeNavigate';
import {
    calculate4Band,
    calculate5Band,
    RESISTOR_COLORS,
} from '@/utils/resistorCalculators';

export default function DipCalculatorScreen() {
  const { language } = useLanguage();
  const { safeBack } = useSafeNavigate();

  const [dipBandsMode, setDipBandsMode] = useState<4 | 5>(4);
  const [band1, setBand1] = useState(3); // Orange (3)
  const [band2, setBand2] = useState(7); // Violet (7)
  const [band3, setBand3] = useState(0); // Black (0)
  const [multBand, setMultBand] = useState(2); // Red (x100)
  const [tolBand, setTolBand] = useState(10); // Gold (±5%)

  // Calculation
  const dipResult =
    dipBandsMode === 4
      ? calculate4Band(band1, band2, multBand, tolBand)
      : calculate5Band(band1, band2, band3, multBand, tolBand);

  const digitColors = RESISTOR_COLORS.filter((c) => c.digit !== undefined);
  const multiplierColors = RESISTOR_COLORS.filter(
    (c) => c.multiplier !== undefined,
  );
  const toleranceColors = RESISTOR_COLORS.filter(
    (c) => c.tolerance !== undefined,
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F8FA" />

      {/* Header Bar */}
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
          🎨 {tr(language, 'dipTitle')}
        </Text>
        <Text style={styles.pageSubtitle}>
          {tr(language, 'dipSubtitle')}
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* 4-Band vs 5-Band Toggle */}
        <View style={styles.bandToggleRow}>
          <Pressable
            onPress={() => setDipBandsMode(4)}
            style={[
              styles.bandToggleBtn,
              dipBandsMode === 4 && styles.bandToggleBtnActive,
            ]}
          >
            <Text
              style={[
                styles.bandToggleText,
                dipBandsMode === 4 && styles.bandToggleTextActive,
              ]}
            >
              {tr(language, 'bands4')}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setDipBandsMode(5)}
            style={[
              styles.bandToggleBtn,
              dipBandsMode === 5 && styles.bandToggleBtnActive,
            ]}
          >
            <Text
              style={[
                styles.bandToggleText,
                dipBandsMode === 5 && styles.bandToggleTextActive,
              ]}
            >
              {tr(language, 'bands5')}
            </Text>
          </Pressable>
        </View>

        {/* Resistor Visual Simulation Card */}
        <View style={styles.card}>
          <View style={styles.dipResistorGraphic}>
            <View style={styles.leadLeft} />
            <View style={styles.resistorBody}>
              {/* Band 1 */}
              <View
                style={[
                  styles.colorStripe,
                  { backgroundColor: RESISTOR_COLORS[band1].hex },
                ]}
              />
              {/* Band 2 */}
              <View
                style={[
                  styles.colorStripe,
                  { backgroundColor: RESISTOR_COLORS[band2].hex },
                ]}
              />
              {/* Band 3 (Only in 5-band mode) */}
              {dipBandsMode === 5 && (
                <View
                  style={[
                    styles.colorStripe,
                    { backgroundColor: RESISTOR_COLORS[band3].hex },
                  ]}
                />
              )}
              {/* Multiplier Band */}
              <View
                style={[
                  styles.colorStripe,
                  { backgroundColor: RESISTOR_COLORS[multBand].hex },
                ]}
              />
              {/* Space before Tolerance */}
              <View style={{ flex: 1 }} />
              {/* Tolerance Band */}
              <View
                style={[
                  styles.colorStripe,
                  styles.toleranceStripe,
                  { backgroundColor: RESISTOR_COLORS[tolBand].hex },
                ]}
              />
            </View>
            <View style={styles.leadRight} />
          </View>

          {/* Calculated Value Result Card */}
          <View style={styles.dipResultBox}>
            <Text style={styles.dipResultLabel}>
              {tr(language, 'calculatedResistance')}
            </Text>
            <Text style={styles.dipResultValue}>
              {dipResult.formatted}
            </Text>
            <Text style={styles.dipResultTol}>
              {tr(language, 'tolerance')}: {dipResult.toleranceStr}
            </Text>
          </View>
        </View>

        {/* Band 1 Selection */}
        <View style={styles.card}>
          <Text style={styles.bandPickerTitle}>
            1️⃣ {tr(language, 'band1')}
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.colorPillsScroll}
          >
            {digitColors.map((c) => {
              const colorIdx = RESISTOR_COLORS.findIndex(
                (item) => item.name === c.name,
              );
              const isSelected = band1 === colorIdx;
              return (
                <Pressable
                  key={c.name}
                  onPress={() => setBand1(colorIdx)}
                  style={[
                    styles.colorPill,
                    { backgroundColor: c.hex },
                    isSelected && styles.colorPillSelected,
                  ]}
                >
                  <Text
                    style={[styles.colorPillText, { color: c.textColor }]}
                  >
                    {c.digit} - {language === 'hi' ? c.nameHi : c.name}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Band 2 Selection */}
        <View style={styles.card}>
          <Text style={styles.bandPickerTitle}>
            2️⃣ {tr(language, 'band2')}
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.colorPillsScroll}
          >
            {digitColors.map((c) => {
              const colorIdx = RESISTOR_COLORS.findIndex(
                (item) => item.name === c.name,
              );
              const isSelected = band2 === colorIdx;
              return (
                <Pressable
                  key={c.name}
                  onPress={() => setBand2(colorIdx)}
                  style={[
                    styles.colorPill,
                    { backgroundColor: c.hex },
                    isSelected && styles.colorPillSelected,
                  ]}
                >
                  <Text
                    style={[styles.colorPillText, { color: c.textColor }]}
                  >
                    {c.digit} - {language === 'hi' ? c.nameHi : c.name}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Band 3 Selection (Only 5-Band) */}
        {dipBandsMode === 5 && (
          <View style={styles.card}>
            <Text style={styles.bandPickerTitle}>
              3️⃣ {tr(language, 'band3')}
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.colorPillsScroll}
            >
              {digitColors.map((c) => {
                const colorIdx = RESISTOR_COLORS.findIndex(
                  (item) => item.name === c.name,
                );
                const isSelected = band3 === colorIdx;
                return (
                  <Pressable
                    key={c.name}
                    onPress={() => setBand3(colorIdx)}
                    style={[
                      styles.colorPill,
                      { backgroundColor: c.hex },
                      isSelected && styles.colorPillSelected,
                    ]}
                  >
                    <Text
                      style={[styles.colorPillText, { color: c.textColor }]}
                    >
                      {c.digit} - {language === 'hi' ? c.nameHi : c.name}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        )}

        {/* Multiplier Band Selection */}
        <View style={styles.card}>
          <Text style={styles.bandPickerTitle}>
            ✖️ {tr(language, 'multiplierBand')}
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.colorPillsScroll}
          >
            {multiplierColors.map((c) => {
              const colorIdx = RESISTOR_COLORS.findIndex(
                (item) => item.name === c.name,
              );
              const isSelected = multBand === colorIdx;
              return (
                <Pressable
                  key={c.name}
                  onPress={() => setMultBand(colorIdx)}
                  style={[
                    styles.colorPill,
                    { backgroundColor: c.hex },
                    isSelected && styles.colorPillSelected,
                  ]}
                >
                  <Text
                    style={[styles.colorPillText, { color: c.textColor }]}
                  >
                    {c.multiplier}x - {language === 'hi' ? c.nameHi : c.name}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Tolerance Band Selection */}
        <View style={styles.card}>
          <Text style={styles.bandPickerTitle}>
            🎯 {tr(language, 'toleranceBand')}
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.colorPillsScroll}
          >
            {toleranceColors.map((c) => {
              const colorIdx = RESISTOR_COLORS.findIndex(
                (item) => item.name === c.name,
              );
              const isSelected = tolBand === colorIdx;
              return (
                <Pressable
                  key={c.name}
                  onPress={() => setTolBand(colorIdx)}
                  style={[
                    styles.colorPill,
                    { backgroundColor: c.hex },
                    isSelected && styles.colorPillSelected,
                  ]}
                >
                  <Text
                    style={[styles.colorPillText, { color: c.textColor }]}
                  >
                    ±{c.tolerance}% - {language === 'hi' ? c.nameHi : c.name}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
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

  /* BANDS MODE TOGGLE */

  bandToggleRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },

  bandToggleBtn: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },

  bandToggleBtnActive: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },

  bandToggleText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4B5563',
  },

  bandToggleTextActive: {
    color: '#1D4ED8',
    fontWeight: '900',
  },

  /* CARDS */

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

  /* DIP RESISTOR GRAPHIC */

  dipResistorGraphic: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },

  leadLeft: {
    width: 35,
    height: 6,
    backgroundColor: '#94A3B8',
    borderRadius: 3,
  },

  leadRight: {
    width: 35,
    height: 6,
    backgroundColor: '#94A3B8',
    borderRadius: 3,
  },

  resistorBody: {
    width: 170,
    height: 52,
    backgroundColor: '#E7D7C1',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderWidth: 1.5,
    borderColor: '#D4C3A3',
    overflow: 'hidden',
  },

  colorStripe: {
    width: 14,
    height: '100%',
    marginRight: 8,
    borderRadius: 1,
  },

  toleranceStripe: {
    marginRight: 0,
  },

  dipResultBox: {
    backgroundColor: '#F0FDF4',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#BBF7D0',
    alignItems: 'center',
    marginTop: 10,
  },

  dipResultLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#15803D',
    textTransform: 'uppercase',
  },

  dipResultValue: {
    fontSize: 26,
    fontWeight: '900',
    color: '#14532D',
    marginVertical: 4,
  },

  dipResultTol: {
    fontSize: 13,
    fontWeight: '700',
    color: '#166534',
  },

  /* COLOR PICKER PILLS */

  bandPickerTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: '#111827',
    marginBottom: 10,
  },

  colorPillsScroll: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 4,
  },

  colorPill: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.15)',
    minWidth: 80,
    alignItems: 'center',
  },

  colorPillSelected: {
    borderColor: '#2563EB',
    borderWidth: 3,
    transform: [{ scale: 1.05 }],
  },

  colorPillText: {
    fontSize: 11,
    fontWeight: '900',
    textAlign: 'center',
  },
});

