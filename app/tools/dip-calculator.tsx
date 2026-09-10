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

type BandInfo = {
  id: number;
  key: 'band1' | 'band2' | 'band3' | 'mult' | 'tol';
  shortLabel: string;
  fullLabel: string;
  colorIdx: number;
  type: 'digit' | 'multiplier' | 'tolerance';
};

export default function DipCalculatorScreen() {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const [dipBandsMode, setDipBandsMode] = useState<4 | 5>(4);
  const [selectedBandIndex, setSelectedBandIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'list' | 'table'>('list');

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

  // Band list definitions
  const bands: BandInfo[] =
    dipBandsMode === 4
      ? [
          {
            id: 0,
            key: 'band1',
            shortLabel: isHi ? '1st बैंड' : '1st Band',
            fullLabel: isHi ? 'पहला अंक (1st Band)' : '1st Band (Digit 1)',
            colorIdx: band1,
            type: 'digit',
          },
          {
            id: 1,
            key: 'band2',
            shortLabel: isHi ? '2nd बैंड' : '2nd Band',
            fullLabel: isHi ? 'दूसरा अंक (2nd Band)' : '2nd Band (Digit 2)',
            colorIdx: band2,
            type: 'digit',
          },
          {
            id: 2,
            key: 'mult',
            shortLabel: isHi ? 'गुणा (×)' : 'Multiplier',
            fullLabel: isHi ? 'मल्टीप्लायर (Multiplier)' : 'Multiplier Band',
            colorIdx: multBand,
            type: 'multiplier',
          },
          {
            id: 3,
            key: 'tol',
            shortLabel: isHi ? 'टॉलरेंस' : 'Tolerance',
            fullLabel: isHi ? 'टॉलरेंस (Tolerance)' : 'Tolerance Band',
            colorIdx: tolBand,
            type: 'tolerance',
          },
        ]
      : [
          {
            id: 0,
            key: 'band1',
            shortLabel: isHi ? '1st' : '1st Band',
            fullLabel: isHi ? 'पहला अंक (1st Band)' : '1st Band (Digit 1)',
            colorIdx: band1,
            type: 'digit',
          },
          {
            id: 1,
            key: 'band2',
            shortLabel: isHi ? '2nd' : '2nd Band',
            fullLabel: isHi ? 'दूसरा अंक (2nd Band)' : '2nd Band (Digit 2)',
            colorIdx: band2,
            type: 'digit',
          },
          {
            id: 2,
            key: 'band3',
            shortLabel: isHi ? '3rd' : '3rd Band',
            fullLabel: isHi ? 'तीसरा अंक (3rd Band)' : '3rd Band (Digit 3)',
            colorIdx: band3,
            type: 'digit',
          },
          {
            id: 3,
            key: 'mult',
            shortLabel: isHi ? 'गुणा (×)' : 'Multiplier',
            fullLabel: isHi ? 'मल्टीप्लायर (Multiplier)' : 'Multiplier Band',
            colorIdx: multBand,
            type: 'multiplier',
          },
          {
            id: 4,
            key: 'tol',
            shortLabel: isHi ? 'टॉलरेंस' : 'Tolerance',
            fullLabel: isHi ? 'टॉलरेंस (Tolerance)' : 'Tolerance Band',
            colorIdx: tolBand,
            type: 'tolerance',
          },
        ];

  // Active band safety
  const safeActiveIndex = Math.min(selectedBandIndex, bands.length - 1);
  const activeBand = bands[safeActiveIndex];

  // Colors applicable for current active band
  const activeColors: ResistorColor[] =
    activeBand.type === 'digit'
      ? digitColors
      : activeBand.type === 'multiplier'
      ? multiplierColors
      : toleranceColors;

  const handleColorSelect = (colorIdx: number) => {
    if (activeBand.key === 'band1') setBand1(colorIdx);
    else if (activeBand.key === 'band2') setBand2(colorIdx);
    else if (activeBand.key === 'band3') setBand3(colorIdx);
    else if (activeBand.key === 'mult') setMultBand(colorIdx);
    else if (activeBand.key === 'tol') setTolBand(colorIdx);

    // Auto-advance to next band for ultra-fast sequential selection
    if (safeActiveIndex < bands.length - 1) {
      setSelectedBandIndex(safeActiveIndex + 1);
    }
  };

  const handleModeChange = (mode: 4 | 5) => {
    setDipBandsMode(mode);
    if (mode === 4 && selectedBandIndex > 3) {
      setSelectedBandIndex(3);
    }
  };

  const getBandValueLabel = (color: ResistorColor, type: 'digit' | 'multiplier' | 'tolerance') => {
    if (type === 'digit') {
      return color.digit !== undefined ? `${color.digit}` : '-';
    }
    if (type === 'multiplier') {
      if (color.multiplier === undefined) return '-';
      if (color.multiplier >= 1_000_000_000) return '×1 GΩ';
      if (color.multiplier >= 1_000_000) return `×${color.multiplier / 1_000_000} MΩ`;
      if (color.multiplier >= 1_000) return `×${color.multiplier / 1_000} kΩ`;
      if (color.multiplier === 0.1) return '×0.1 Ω';
      if (color.multiplier === 0.01) return '×0.01 Ω';
      return `×${color.multiplier} Ω`;
    }
    if (type === 'tolerance') {
      return color.tolerance !== undefined ? `±${color.tolerance}%` : '-';
    }
    return '';
  };

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
            TOP CONTROLS & RESISTOR CARD (COMPACT, NO-SCROLL)
            ========================================================= */}
        <View style={styles.topSection}>
          {/* Header Row: 4-Band / 5-Band Toggle + View Mode Toggle */}
          <View style={styles.topControlRow}>
            {/* 4-Band / 5-Band Toggle */}
            <View style={styles.segmentedToggle}>
              <Pressable
                onPress={() => handleModeChange(4)}
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
                onPress={() => handleModeChange(5)}
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

            {/* View Mode Toggle: List View vs Table View */}
            <View style={styles.viewModeToggle}>
              <Pressable
                onPress={() => setViewMode('list')}
                style={[
                  styles.viewModeBtn,
                  viewMode === 'list' && styles.viewModeBtnActive,
                ]}
              >
                <Text
                  style={[
                    styles.viewModeText,
                    viewMode === 'list' && styles.viewModeTextActive,
                  ]}
                >
                  📋 {isHi ? 'सूची' : 'List'}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setViewMode('table')}
                style={[
                  styles.viewModeBtn,
                  viewMode === 'table' && styles.viewModeBtnActive,
                ]}
              >
                <Text
                  style={[
                    styles.viewModeText,
                    viewMode === 'table' && styles.viewModeTextActive,
                  ]}
                >
                  📊 {isHi ? 'टेबल' : 'Table'}
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Unified Resistor Graphic & Live Result */}
          <View style={styles.resistorResultCard}>
            {/* Resistor Visual */}
            <View style={styles.dipResistorGraphic}>
              <View style={styles.leadLeft} />
              <View style={styles.resistorBody}>
                {/* Band 1 */}
                <Pressable
                  onPress={() => setSelectedBandIndex(0)}
                  style={[
                    styles.colorStripe,
                    { backgroundColor: RESISTOR_COLORS[band1].hex },
                    safeActiveIndex === 0 && styles.colorStripeActive,
                  ]}
                />
                {/* Band 2 */}
                <Pressable
                  onPress={() => setSelectedBandIndex(1)}
                  style={[
                    styles.colorStripe,
                    { backgroundColor: RESISTOR_COLORS[band2].hex },
                    safeActiveIndex === 1 && styles.colorStripeActive,
                  ]}
                />
                {/* Band 3 (5-Band only) */}
                {dipBandsMode === 5 && (
                  <Pressable
                    onPress={() => setSelectedBandIndex(2)}
                    style={[
                      styles.colorStripe,
                      { backgroundColor: RESISTOR_COLORS[band3].hex },
                      safeActiveIndex === 2 && styles.colorStripeActive,
                    ]}
                  />
                )}
                {/* Multiplier Band */}
                <Pressable
                  onPress={() => setSelectedBandIndex(dipBandsMode === 4 ? 2 : 3)}
                  style={[
                    styles.colorStripe,
                    { backgroundColor: RESISTOR_COLORS[multBand].hex },
                    safeActiveIndex === (dipBandsMode === 4 ? 2 : 3) &&
                      styles.colorStripeActive,
                  ]}
                />
                {/* Space before Tolerance */}
                <View style={{ flex: 1 }} />
                {/* Tolerance Band */}
                <Pressable
                  onPress={() => setSelectedBandIndex(dipBandsMode === 4 ? 3 : 4)}
                  style={[
                    styles.colorStripe,
                    styles.toleranceStripe,
                    { backgroundColor: RESISTOR_COLORS[tolBand].hex },
                    safeActiveIndex === (dipBandsMode === 4 ? 3 : 4) &&
                      styles.colorStripeActive,
                  ]}
                />
              </View>
              <View style={styles.leadRight} />
            </View>

            {/* Calculated Result Display */}
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

          {/* Band Selector Tabs (In List View mode) */}
          {viewMode === 'list' && (
            <View style={styles.bandTabsRow}>
              {bands.map((b, idx) => {
                const isTabActive = idx === safeActiveIndex;
                const bandColor = RESISTOR_COLORS[b.colorIdx];
                const valLabel = getBandValueLabel(bandColor, b.type);
                return (
                  <Pressable
                    key={b.key}
                    onPress={() => setSelectedBandIndex(idx)}
                    style={[
                      styles.bandTab,
                      isTabActive && styles.bandTabActive,
                    ]}
                  >
                    <View style={styles.bandTabHeader}>
                      <View
                        style={[
                          styles.tabColorDot,
                          { backgroundColor: bandColor.hex },
                        ]}
                      />
                      <Text
                        style={[
                          styles.bandTabLabel,
                          isTabActive && styles.bandTabLabelActive,
                        ]}
                        numberOfLines={1}
                      >
                        {b.shortLabel}
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.bandTabVal,
                        isTabActive && styles.bandTabValActive,
                      ]}
                      numberOfLines={1}
                    >
                      {valLabel}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          )}
        </View>

        {/* =========================================================
            LIST VIEW: ALL COLORS FOR ACTIVE BAND FIT ON SCREEN
            ========================================================= */}
        {viewMode === 'list' ? (
          <View style={styles.listViewCard}>
            <View style={styles.listHeaderRow}>
              <Text style={styles.listHeaderTitle}>
                {activeBand.fullLabel}
              </Text>
              <Text style={styles.listHeaderSub}>
                {isHi ? 'रंग चुनें (Tap to pick)' : 'Tap color to select'}
              </Text>
            </View>

            <View style={styles.listItemsWrapper}>
              {activeColors.map((c) => {
                const colorIdx = RESISTOR_COLORS.findIndex(
                  (item) => item.name === c.name,
                );
                const isSelected = activeBand.colorIdx === colorIdx;
                const valStr = getBandValueLabel(c, activeBand.type);

                return (
                  <Pressable
                    key={c.name}
                    onPress={() => handleColorSelect(colorIdx)}
                    style={[
                      styles.colorRow,
                      isSelected && styles.colorRowSelected,
                    ]}
                  >
                    {/* Left: Color swatch circle */}
                    <View
                      style={[
                        styles.colorSwatch,
                        { backgroundColor: c.hex },
                      ]}
                    >
                      {activeBand.type === 'digit' && c.digit !== undefined && (
                        <Text
                          style={[
                            styles.colorSwatchDigit,
                            { color: c.textColor ?? '#FFFFFF' },
                          ]}
                        >
                          {c.digit}
                        </Text>
                      )}
                    </View>

                    {/* Middle: Color Name in English and Hindi */}
                    <View style={styles.colorNameBlock}>
                      <Text
                        style={[
                          styles.colorNameTitle,
                          isSelected && styles.colorNameTitleSelected,
                        ]}
                        numberOfLines={1}
                      >
                        {c.name}
                        {c.nameHi ? (
                          <Text style={styles.colorNameHi}> • {c.nameHi}</Text>
                        ) : null}
                      </Text>
                    </View>

                    {/* Right: Value badge */}
                    <View
                      style={[
                        styles.valBadge,
                        isSelected && styles.valBadgeSelected,
                      ]}
                    >
                      <Text
                        style={[
                          styles.valBadgeText,
                          isSelected && styles.valBadgeTextSelected,
                        ]}
                      >
                        {valStr}
                      </Text>
                    </View>

                    {/* Selection Indicator */}
                    <View
                      style={[
                        styles.selectionCheck,
                        isSelected && styles.selectionCheckActive,
                      ]}
                    >
                      {isSelected && <Text style={styles.checkText}>✓</Text>}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>
        ) : (
          /* =========================================================
             TABLE VIEW: ALL BANDS SHOWN IN SIDE-BY-SIDE COLUMNS
             ========================================================= */
          <View style={styles.tableCard}>
            <View style={styles.tableColumnsRow}>
              {bands.map((bandCol) => {
                const colColors =
                  bandCol.type === 'digit'
                    ? digitColors
                    : bandCol.type === 'multiplier'
                    ? multiplierColors
                    : toleranceColors;

                return (
                  <View key={bandCol.key} style={styles.tableCol}>
                    <Text style={styles.tableColHeader} numberOfLines={1}>
                      {bandCol.shortLabel}
                    </Text>
                    <View style={styles.tableColItems}>
                      {colColors.map((c) => {
                        const colorIdx = RESISTOR_COLORS.findIndex(
                          (item) => item.name === c.name,
                        );
                        const isSelected = bandCol.colorIdx === colorIdx;
                        const shortVal = getBandValueLabel(c, bandCol.type);

                        return (
                          <Pressable
                            key={c.name}
                            onPress={() => {
                              if (bandCol.key === 'band1') setBand1(colorIdx);
                              else if (bandCol.key === 'band2') setBand2(colorIdx);
                              else if (bandCol.key === 'band3') setBand3(colorIdx);
                              else if (bandCol.key === 'mult') setMultBand(colorIdx);
                              else if (bandCol.key === 'tol') setTolBand(colorIdx);
                            }}
                            style={[
                              styles.tablePill,
                              { backgroundColor: c.hex },
                              isSelected && styles.tablePillSelected,
                            ]}
                          >
                            <Text
                              style={[
                                styles.tablePillText,
                                { color: c.textColor ?? '#FFFFFF' },
                                isSelected && styles.tablePillTextSelected,
                              ]}
                              numberOfLines={1}
                            >
                              {shortVal}
                            </Text>
                          </Pressable>
                        );
                      })}
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        )}
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
    paddingHorizontal: 12,
    paddingTop: 4,
    paddingBottom: 8,
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
    gap: 8,
  },

  segmentedToggle: {
    flexDirection: 'row',
    backgroundColor: '#E5E7EB',
    borderRadius: 9,
    padding: 2,
  },

  segmentBtn: {
    paddingVertical: 5,
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

  viewModeToggle: {
    flexDirection: 'row',
    backgroundColor: '#E5E7EB',
    borderRadius: 9,
    padding: 2,
  },

  viewModeBtn: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 7,
  },

  viewModeBtnActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },

  viewModeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6B7280',
  },

  viewModeTextActive: {
    color: '#1E293B',
    fontWeight: '900',
  },

  /* RESISTOR & RESULT CARD */
  resistorResultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },

  dipResistorGraphic: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  leadLeft: {
    width: 14,
    height: 4,
    backgroundColor: '#94A3B8',
    borderRadius: 2,
  },

  leadRight: {
    width: 14,
    height: 4,
    backgroundColor: '#94A3B8',
    borderRadius: 2,
  },

  resistorBody: {
    width: 110,
    height: 34,
    backgroundColor: '#E7D7C1',
    borderRadius: 9,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderWidth: 1.5,
    borderColor: '#D4C3A3',
    overflow: 'hidden',
  },

  colorStripe: {
    width: 9,
    height: '100%',
    marginRight: 5,
    borderRadius: 1,
  },

  colorStripeActive: {
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderColor: '#2563EB',
    transform: [{ scaleY: 1.15 }],
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
    fontSize: 16,
    fontWeight: '900',
    color: '#15803D',
    letterSpacing: -0.3,
  },

  tolerancePill: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 6,
    marginTop: 2,
  },

  tolerancePillText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#166534',
  },

  /* BAND TABS ROW */
  bandTabsRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 6,
  },

  bandTab: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 9,
    paddingVertical: 5,
    paddingHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },

  bandTabActive: {
    backgroundColor: '#EFF6FF',
    borderColor: '#2563EB',
    shadowColor: '#2563EB',
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 2,
  },

  bandTabHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  tabColorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.15)',
  },

  bandTabLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
  },

  bandTabLabelActive: {
    color: '#1D4ED8',
    fontWeight: '900',
  },

  bandTabVal: {
    fontSize: 10,
    fontWeight: '800',
    color: '#334155',
    marginTop: 1,
  },

  bandTabValActive: {
    color: '#1E40AF',
    fontWeight: '900',
  },

  /* LIST VIEW CARD */
  listViewCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 8,
    paddingTop: 6,
    paddingBottom: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },

  listHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    marginBottom: 2,
  },

  listHeaderTitle: {
    fontSize: 12,
    fontWeight: '900',
    color: '#0F172A',
  },

  listHeaderSub: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
  },

  listItemsWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 2,
  },

  colorRow: {
    flex: 1,
    minHeight: 26,
    maxHeight: 38,
    marginVertical: 1,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    flexDirection: 'row',
    alignItems: 'center',
  },

  colorRowSelected: {
    backgroundColor: '#EFF6FF',
    borderColor: '#3B82F6',
    borderWidth: 1.5,
    shadowColor: '#3B82F6',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },

  colorSwatch: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },

  colorSwatchDigit: {
    fontSize: 10,
    fontWeight: '900',
  },

  colorNameBlock: {
    flex: 1,
    justifyContent: 'center',
  },

  colorNameTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
  },

  colorNameTitleSelected: {
    color: '#1D4ED8',
    fontWeight: '900',
  },

  colorNameHi: {
    fontSize: 10,
    fontWeight: '500',
    color: '#64748B',
  },

  valBadge: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
    marginRight: 8,
  },

  valBadgeSelected: {
    backgroundColor: '#DBEAFE',
  },

  valBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#334155',
  },

  valBadgeTextSelected: {
    color: '#1E40AF',
    fontWeight: '900',
  },

  selectionCheck: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  selectionCheckActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },

  checkText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#FFFFFF',
    lineHeight: 12,
  },

  /* TABLE VIEW CARD */
  tableCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  tableColumnsRow: {
    flex: 1,
    flexDirection: 'row',
    gap: 5,
  },

  tableCol: {
    flex: 1,
    alignItems: 'center',
  },

  tableColHeader: {
    fontSize: 10,
    fontWeight: '800',
    color: '#334155',
    marginBottom: 4,
    textAlign: 'center',
  },

  tableColItems: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
  },

  tablePill: {
    flex: 1,
    width: '100%',
    minHeight: 22,
    maxHeight: 34,
    marginVertical: 1,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.12)',
  },

  tablePillSelected: {
    borderColor: '#FFFFFF',
    borderWidth: 2.5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },

  tablePillText: {
    fontSize: 10,
    fontWeight: '800',
    textAlign: 'center',
  },

  tablePillTextSelected: {
    fontWeight: '900',
  },
});
