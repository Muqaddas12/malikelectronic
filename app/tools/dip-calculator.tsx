import React, { useState } from 'react';
import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppHeader from '@/components/AppHeader';
import { useLanguage } from '@/context/LanguageContext';
import { tr } from '@/data/translations';
import {
  calculate4Band,
  calculate5Band,
  RESISTOR_COLORS,
  ResistorColor,
} from '@/utils/resistorCalculators';

type BandColumnConfig = {
  id: string;
  title: string;
  selectedColorIdx: number;
  type: 'digit' | 'multiplier' | 'tolerance';
  colors: ResistorColor[];
  onSelect: (colorIdx: number) => void;
};

export default function DipCalculatorScreen() {
  const { language } = useLanguage();
  const isHi = language === 'hi';

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

  const getMultiplierShort = (val: number | undefined): string => {
    if (val === undefined) return '-';
    if (val >= 1_000_000_000) return '1G';
    if (val >= 1_000_000) return `${val / 1_000_000}M`;
    if (val >= 1_000) return `${val / 1_000}k`;
    if (val === 0.1) return '0.1';
    if (val === 0.01) return '0.01';
    return `${val}`;
  };

  const getButtonLabel = (
    color: ResistorColor,
    type: 'digit' | 'multiplier' | 'tolerance',
  ): string => {
    if (type === 'digit') {
      if (dipBandsMode === 4) {
        const shortName = isHi ? color.nameHi : color.name.slice(0, 4);
        return `${color.digit} • ${shortName}`;
      }
      return `${color.digit}`;
    }
    if (type === 'multiplier') {
      const multStr = getMultiplierShort(color.multiplier);
      if (dipBandsMode === 4) {
        const shortName = isHi ? color.nameHi : color.name.slice(0, 4);
        return `${multStr} • ${shortName}`;
      }
      return multStr;
    }
    if (type === 'tolerance') {
      const tolStr = `±${color.tolerance}%`;
      if (dipBandsMode === 4) {
        const shortName = isHi ? color.nameHi : color.name.slice(0, 4);
        return `${tolStr} • ${shortName}`;
      }
      return tolStr;
    }
    return '';
  };

  const getHeaderValue = (
    colorIdx: number,
    type: 'digit' | 'multiplier' | 'tolerance',
  ): string => {
    const c = RESISTOR_COLORS[colorIdx];
    if (!c) return '';
    if (type === 'digit') return `${c.digit}`;
    if (type === 'multiplier') return `×${getMultiplierShort(c.multiplier)}`;
    if (type === 'tolerance') return `±${c.tolerance}%`;
    return '';
  };

  // Define columns for 4-band vs 5-band
  const columns: BandColumnConfig[] =
    dipBandsMode === 4
      ? [
          {
            id: 'band1',
            title: isHi ? '1st बैंड' : '1st Band',
            selectedColorIdx: band1,
            type: 'digit',
            colors: digitColors,
            onSelect: (idx) => setBand1(idx),
          },
          {
            id: 'band2',
            title: isHi ? '2nd बैंड' : '2nd Band',
            selectedColorIdx: band2,
            type: 'digit',
            colors: digitColors,
            onSelect: (idx) => setBand2(idx),
          },
          {
            id: 'mult',
            title: isHi ? 'गुणा (×)' : 'Multiplier',
            selectedColorIdx: multBand,
            type: 'multiplier',
            colors: multiplierColors,
            onSelect: (idx) => setMultBand(idx),
          },
          {
            id: 'tol',
            title: isHi ? 'टॉलरेंस' : 'Tolerance',
            selectedColorIdx: tolBand,
            type: 'tolerance',
            colors: toleranceColors,
            onSelect: (idx) => setTolBand(idx),
          },
        ]
      : [
          {
            id: 'band1',
            title: isHi ? '1st' : '1st Band',
            selectedColorIdx: band1,
            type: 'digit',
            colors: digitColors,
            onSelect: (idx) => setBand1(idx),
          },
          {
            id: 'band2',
            title: isHi ? '2nd' : '2nd Band',
            selectedColorIdx: band2,
            type: 'digit',
            colors: digitColors,
            onSelect: (idx) => setBand2(idx),
          },
          {
            id: 'band3',
            title: isHi ? '3rd' : '3rd Band',
            selectedColorIdx: band3,
            type: 'digit',
            colors: digitColors,
            onSelect: (idx) => setBand3(idx),
          },
          {
            id: 'mult',
            title: isHi ? 'गुणा (×)' : 'Multiplier',
            selectedColorIdx: multBand,
            type: 'multiplier',
            colors: multiplierColors,
            onSelect: (idx) => setMultBand(idx),
          },
          {
            id: 'tol',
            title: isHi ? 'टॉलरेंस' : 'Tolerance',
            selectedColorIdx: tolBand,
            type: 'tolerance',
            colors: toleranceColors,
            onSelect: (idx) => setTolBand(idx),
          },
        ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F8FA" />

      {/* Header Bar with Sidebar Menu */}
      <AppHeader
        showBack={true}
        title={`🎨 ${tr(language, 'dipTitle')}`}
        subtitle={tr(language, 'dipSubtitle')}
        showMenu={true}
      />

      <View style={styles.container}>
        {/* =========================================================
            TOP SECTION: MODE TOGGLE & RESISTOR RESULT CARD (COMPACT)
            ========================================================= */}
        <View style={styles.topSection}>
          {/* Row 1: Mode Switcher */}
          <View style={styles.topControlRow}>
            <View style={styles.segmentedToggle}>
              <Pressable
                onPress={() => setDipBandsMode(4)}
                style={[
                  styles.segmentBtn,
                  dipBandsMode === 4 && styles.segmentBtnActive,
                ]}
              >
                <Text
                  style={[
                    styles.segmentText,
                    dipBandsMode === 4 && styles.segmentTextActive,
                  ]}
                >
                  {tr(language, 'bands4')}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setDipBandsMode(5)}
                style={[
                  styles.segmentBtn,
                  dipBandsMode === 5 && styles.segmentBtnActive,
                ]}
              >
                <Text
                  style={[
                    styles.segmentText,
                    dipBandsMode === 5 && styles.segmentTextActive,
                  ]}
                >
                  {tr(language, 'bands5')}
                </Text>
              </Pressable>
            </View>

            <Text style={styles.hintText}>
              {isHi ? 'सीधे रंग चुनें (Tap colors directly)' : 'Tap colors below directly'}
            </Text>
          </View>

          {/* Row 2: Unified Resistor Graphic & Live Result */}
          <View style={styles.resistorResultCard}>
            {/* Graphic Resistor Body with Colored Stripes */}
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
                {/* Band 3 (5-Band only) */}
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
                {/* Spacing before Tolerance */}
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

            {/* Live Calculated Resistance */}
            <View style={styles.resultDisplay}>
              <Text style={styles.resultValueText} numberOfLines={1}>
                {dipResult.formatted}
              </Text>
              <View style={styles.tolerancePill}>
                <Text style={styles.tolerancePillText}>
                  {dipResult.toleranceStr}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* =========================================================
            COLUMNS: BAND HEADERS AT TOP & ALL COLORS BELOW EACH BAND
            (ZERO SCROLLING - USERS DIRECTLY TAP COLORS IN ANY COLUMN)
            ========================================================= */}
        <View style={styles.matrixCard}>
          <View style={styles.columnsRow}>
            {columns.map((col) => {
              const selectedColor = RESISTOR_COLORS[col.selectedColorIdx];
              const headerVal = getHeaderValue(col.selectedColorIdx, col.type);

              return (
                <View key={col.id} style={styles.columnWrapper}>
                  {/* Band Header at Top */}
                  <View style={styles.columnHeaderCard}>
                    <Text style={styles.columnTitle} numberOfLines={1}>
                      {col.title}
                    </Text>
                    <View style={styles.columnSelectedChip}>
                      <View
                        style={[
                          styles.chipColorDot,
                          { backgroundColor: selectedColor.hex },
                        ]}
                      />
                      <Text
                        style={styles.chipValText}
                        numberOfLines={1}
                      >
                        {headerVal}
                      </Text>
                    </View>
                  </View>

                  {/* All Colors for this Band Listed Directly Below */}
                  <View style={styles.columnItemsList}>
                    {col.colors.map((colorItem) => {
                      const colorIdx = RESISTOR_COLORS.findIndex(
                        (item) => item.name === colorItem.name,
                      );
                      const isSelected = col.selectedColorIdx === colorIdx;
                      const label = getButtonLabel(colorItem, col.type);

                      return (
                        <Pressable
                          key={colorItem.name}
                          onPress={() => col.onSelect(colorIdx)}
                          style={[
                            styles.colorButton,
                            { backgroundColor: colorItem.hex },
                            isSelected && styles.colorButtonSelected,
                          ]}
                        >
                          <Text
                            style={[
                              styles.colorButtonText,
                              { color: colorItem.textColor ?? '#FFFFFF' },
                              isSelected && styles.colorButtonTextSelected,
                            ]}
                            numberOfLines={1}
                          >
                            {label}
                          </Text>
                          {isSelected && (
                            <Text
                              style={[
                                styles.checkMarkIcon,
                                { color: colorItem.textColor ?? '#FFFFFF' },
                              ]}
                            >
                              ✓
                            </Text>
                          )}
                        </Pressable>
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },

  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 4,
    paddingBottom: 6,
  },

  /* TOP SECTION */
  topSection: {
    marginBottom: 6,
  },

  topControlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },

  segmentedToggle: {
    flexDirection: 'row',
    backgroundColor: '#E5E7EB',
    borderRadius: 9,
    padding: 2,
  },

  segmentBtn: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 7,
  },

  segmentBtnActive: {
    backgroundColor: '#2563EB',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  segmentText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4B5563',
  },

  segmentTextActive: {
    color: '#FFFFFF',
    fontWeight: '900',
  },

  hintText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },

  /* RESISTOR & LIVE RESULT CARD */
  resistorResultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 2,
  },

  dipResistorGraphic: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  leadLeft: {
    width: 12,
    height: 4,
    backgroundColor: '#94A3B8',
    borderRadius: 2,
  },

  leadRight: {
    width: 12,
    height: 4,
    backgroundColor: '#94A3B8',
    borderRadius: 2,
  },

  resistorBody: {
    width: 105,
    height: 32,
    backgroundColor: '#E7D7C1',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 7,
    borderWidth: 1.5,
    borderColor: '#D4C3A3',
    overflow: 'hidden',
  },

  colorStripe: {
    width: 8,
    height: '100%',
    marginRight: 4,
    borderRadius: 1,
  },

  toleranceStripe: {
    marginRight: 0,
  },

  resultDisplay: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingLeft: 8,
  },

  resultValueText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#15803D',
    letterSpacing: -0.3,
  },

  tolerancePill: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 5,
    marginTop: 2,
  },

  tolerancePillText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#166534',
  },

  /* MAIN MATRIX CARD */
  matrixCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },

  columnsRow: {
    flex: 1,
    flexDirection: 'row',
    gap: 4,
  },

  columnWrapper: {
    flex: 1,
    alignItems: 'center',
  },

  /* COLUMN HEADER */
  columnHeaderCard: {
    width: '100%',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 2,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 4,
  },

  columnTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#334155',
    textAlign: 'center',
  },

  columnSelectedChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 5,
    paddingVertical: 1.5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    marginTop: 2,
    gap: 3,
  },

  chipColorDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    borderWidth: 0.8,
    borderColor: 'rgba(0,0,0,0.15)',
  },

  chipValText: {
    fontSize: 9.5,
    fontWeight: '900',
    color: '#0F172A',
  },

  /* COLUMN ITEMS LIST */
  columnItemsList: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
  },

  colorButton: {
    flex: 1,
    width: '100%',
    minHeight: 22,
    maxHeight: 33,
    marginVertical: 1,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.12)',
  },

  colorButtonSelected: {
    borderColor: '#FFFFFF',
    borderWidth: 2.2,
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 3,
    elevation: 4,
    transform: [{ scale: 1.03 }],
  },

  colorButtonText: {
    fontSize: 9.5,
    fontWeight: '800',
    textAlign: 'center',
  },

  colorButtonTextSelected: {
    fontWeight: '900',
  },

  checkMarkIcon: {
    fontSize: 9,
    fontWeight: '900',
    marginLeft: 2,
  },
});
