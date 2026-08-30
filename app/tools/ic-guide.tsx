import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    BackHandler,
    Dimensions,
    FlatList,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppHeader from '@/components/AppHeader';
import { useLanguage } from '@/context/LanguageContext';
import { IC_DATABASE, IcDetail, IcPin } from '@/data/ics';
import { tr } from '@/data/translations';
import { useSafeNavigate } from '@/hooks/useSafeNavigate';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Pre-compute lowercase search index for instant zero-allocation search
const INDEXED_ICS = IC_DATABASE.map((ic) => ({
  ...ic,
  _searchIndex: [
    ic.name,
    ...ic.aliases,
    ic.category,
    ic.dipPackageName,
    ic.smdPackageName,
    ic.simpleSummaryEn,
    ic.simpleSummaryHi,
    ic.inverterApplicationEn,
    ic.inverterApplicationHi,
    ...ic.pins.map((p) => `${p.pin} ${p.name}`),
  ]
    .join(' ')
    .toLowerCase(),
}));

const ALL_CATEGORIES = ['All', ...Array.from(new Set(IC_DATABASE.map((item) => item.category)))];

const CATEGORY_NAMES_HI: Record<string, string> = {
  'All': 'सभी (All)',
  'Op-Amp': 'ऑप-एम्प (Op-Amp)',
  'PWM Driver': 'PWM ड्राइवर',
  'MOSFET Driver': 'MOSFET ड्राइवर',
  'Darlington Driver': 'डार्लिंगटन ड्राइवर',
  'Optocoupler': 'ऑप्टोकपलर',
  'Regulator': 'रेगुलेटर IC',
  'Microcontroller': 'माइक्रोकंट्रोलर',
  'Timer': 'टाइमर IC (555)',
  'Logic & Switch': 'लॉजिक व स्विच',
  'Memory & Interface': 'मेमोरी व इंटरफेस',
};

const PIN_TYPE_NAMES_HI: Record<IcPin['type'], string> = {
  Power: 'पावर VCC',
  Ground: 'ग्राउंड GND',
  Output: 'आउटपुट',
  Input: 'इनपुट',
  Control: 'कंट्रोल',
  Passive: 'पैसिव',
};

const PIN_TYPE_COLORS: Record<IcPin['type'], string> = {
  Power: '#DC2626',
  Ground: '#1E293B',
  Output: '#16A34A',
  Input: '#2563EB',
  Control: '#D97706',
  Passive: '#6B7280',
};

const CATEGORY_THEMES: Record<string, { bg: string; border: string; text: string; icon: string }> = {
  'Op-Amp': { bg: '#EFF6FF', border: '#BFDBFE', text: '#1D4ED8', icon: '⚡' },
  'PWM Driver': { bg: '#F5F3FF', border: '#DDD6FE', text: '#6D28D9', icon: '🎛️' },
  'MOSFET Driver': { bg: '#ECFDF5', border: '#A7F3D0', text: '#047857', icon: '🔌' },
  'Darlington Driver': { bg: '#FEF2F2', border: '#FECACA', text: '#B91C1C', icon: '⚙️' },
  'Optocoupler': { bg: '#FFFBEB', border: '#FDE68A', text: '#B45309', icon: '💡' },
  'Regulator': { bg: '#FDF2F8', border: '#FBCFE8', text: '#BE185D', icon: '🔋' },
  'Microcontroller': { bg: '#F0FDFA', border: '#99F6E4', text: '#0F766E', icon: '🧠' },
  'Timer': { bg: '#FFF7ED', border: '#FED7AA', text: '#C2410C', icon: '⏱️' },
  'Logic & Switch': { bg: '#F0FDF4', border: '#BBF7D0', text: '#15803D', icon: '🔀' },
  'Memory & Interface': { bg: '#F5F3FF', border: '#DDD6FE', text: '#7C3AED', icon: '💾' },
};

function getCategoryTheme(category: string) {
  return CATEGORY_THEMES[category] || { bg: '#F3F4F6', border: '#E5E7EB', text: '#374151', icon: '💾' };
}

// ─── Combined DIP & SMD Visual Graphic Component ─────────────────────────────

const CombinedIcGraphic = React.memo(function CombinedIcGraphic({ ic }: { ic: IcDetail }) {
  const { language } = useLanguage();
  const [selectedView, setSelectedView] = useState<'both' | 'dip' | 'smd'>('both');
  const halfPins = Math.ceil(ic.totalPins / 2);

  const leftPins = useMemo(() => Array.from({ length: halfPins }, (_, i) => i + 1), [halfPins]);
  const rightPins = useMemo(() => Array.from({ length: halfPins }, (_, i) => ic.totalPins - i), [halfPins, ic.totalPins]);

  const pinMap = useMemo(() => {
    const map = new Map<number, IcPin>();
    ic.pins.forEach((p) => map.set(p.pin, p));
    return map;
  }, [ic.pins]);

  return (
    <View style={styles.graphicCard}>
      {/* View Switcher */}
      <View style={styles.graphicSwitchRow}>
        <Pressable
          onPress={() => setSelectedView('both')}
          style={[styles.switchBtn, selectedView === 'both' && styles.switchBtnActive]}
        >
          <Text
            style={[
              styles.switchBtnText,
              selectedView === 'both' && styles.switchBtnTextActive,
            ]}
          >
            {tr(language, 'bothDipSmd')}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setSelectedView('dip')}
          style={[styles.switchBtn, selectedView === 'dip' && styles.switchBtnActive]}
        >
          <Text
            style={[
              styles.switchBtnText,
              selectedView === 'dip' && styles.switchBtnTextActive,
            ]}
          >
            {tr(language, 'dipOnly')}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setSelectedView('smd')}
          style={[styles.switchBtn, selectedView === 'smd' && styles.switchBtnActive]}
        >
          <Text
            style={[
              styles.switchBtnText,
              selectedView === 'smd' && styles.switchBtnTextActive,
            ]}
          >
            {tr(language, 'smdOnly')}
          </Text>
        </Pressable>
      </View>

      <View style={styles.graphicsRow}>
        {/* DIP PACKAGE SIMULATION */}
        {(selectedView === 'both' || selectedView === 'dip') && (
          <View style={styles.packageColumn}>
            <View style={styles.packageBadgeDIP}>
              <Text style={styles.packageBadgeTextDIP}>
                {ic.dipPackageName}
              </Text>
            </View>

            <View style={styles.dipBodyWrapper}>
              <View style={styles.dipTopNotch} />
              <View style={styles.pin1Dot} />

              <View style={styles.dipBody}>
                <Text style={styles.icChipName}>{ic.name.split(' ')[0]}</Text>
                <Text style={styles.icChipType}>DIP-{ic.totalPins}</Text>
              </View>

              <View style={styles.dipPinsContainer}>
                {leftPins.map((pNum, idx) => {
                  const rNum = rightPins[idx];
                  const leftPinObj = pinMap.get(pNum);
                  const rightPinObj = pinMap.get(rNum);

                  return (
                    <View key={pNum} style={styles.pinPairRow}>
                      <View style={styles.pinRowHalfLeft}>
                        <Text style={styles.pinLabelText} numberOfLines={1}>
                          {leftPinObj?.name || `P${pNum}`}
                        </Text>
                        <View style={styles.dipMetalLead} />
                        <View style={styles.pinNumberCircle}>
                          <Text style={styles.pinNumberText}>{pNum}</Text>
                        </View>
                      </View>

                      <View style={styles.pinRowHalfRight}>
                        <View style={styles.pinNumberCircle}>
                          <Text style={styles.pinNumberText}>{rNum}</Text>
                        </View>
                        <View style={styles.dipMetalLead} />
                        <Text style={styles.pinLabelText} numberOfLines={1}>
                          {rightPinObj?.name || `P${rNum}`}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        )}

        {/* SMD PACKAGE SIMULATION */}
        {(selectedView === 'both' || selectedView === 'smd') && (
          <View style={styles.packageColumn}>
            <View style={styles.packageBadgeSMD}>
              <Text style={styles.packageBadgeTextSMD}>
                {ic.smdPackageName}
              </Text>
            </View>

            <View style={styles.smdBodyWrapper}>
              <View style={styles.pin1DotSmd} />

              <View style={styles.smdBody}>
                <Text style={styles.smdChipName}>{ic.name.split(' ')[0]}</Text>
                <Text style={styles.smdChipSub}>SOIC-{ic.totalPins}</Text>
              </View>

              <View style={styles.smdPinsContainer}>
                {leftPins.map((pNum, idx) => {
                  const rNum = rightPins[idx];
                  const leftPinObj = pinMap.get(pNum);
                  const rightPinObj = pinMap.get(rNum);

                  return (
                    <View key={pNum} style={styles.smdPinPairRow}>
                      <View style={styles.smdPinLeft}>
                        <Text style={styles.smdPinLabel} numberOfLines={1}>
                          {leftPinObj?.name || `P${pNum}`}
                        </Text>
                        <View style={styles.smdGullLead} />
                        <Text style={styles.smdNum}>{pNum}</Text>
                      </View>

                      <View style={styles.smdPinRight}>
                        <Text style={styles.smdNum}>{rNum}</Text>
                        <View style={styles.smdGullLead} />
                        <Text style={styles.smdPinLabel} numberOfLines={1}>
                          {rightPinObj?.name || `P${rNum}`}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
});

// ─── Memoized IC Card Item in Directory ──────────────────────────────────────

interface IcCardItemProps {
  ic: typeof INDEXED_ICS[0];
  language: 'en' | 'hi';
  onSelect: (id: string) => void;
}

const IcCardItem = React.memo(function IcCardItem({ ic, language, onSelect }: IcCardItemProps) {
  const theme = getCategoryTheme(ic.category);

  return (
    <Pressable
      onPress={() => onSelect(ic.id)}
      style={({ pressed }) => [
        styles.icCard,
        pressed && styles.icCardPressed,
      ]}
    >
      {/* Top Row: Category Pill + Pins Pill */}
      <View style={styles.icCardTopRow}>
        <View
          style={[
            styles.icCatBadge,
            { backgroundColor: theme.bg, borderColor: theme.border },
          ]}
        >
          <Text style={styles.icCatIcon}>{theme.icon}</Text>
          <Text style={[styles.icCatText, { color: theme.text }]}>
            {language === 'hi' ? (CATEGORY_NAMES_HI[ic.category] ?? ic.category) : ic.category}
          </Text>
        </View>

        <View style={styles.icPinsBadge}>
          <Text style={styles.icPinsBadgeText}>
            {ic.totalPins} {language === 'hi' ? 'पिन' : 'Pins'} ({ic.dipPackageName} / {ic.smdPackageName.split(' ')[0]})
          </Text>
        </View>
      </View>

      {/* IC Name & Aliases */}
      <Text style={styles.icTitleText}>{ic.name}</Text>
      {ic.aliases && ic.aliases.length > 0 && (
        <Text style={styles.icAliasesText} numberOfLines={1}>
          {language === 'hi' ? 'समतुल्य:' : 'Equivalents:'} {ic.aliases.join(', ')}
        </Text>
      )}

      {/* Short Description */}
      <Text style={styles.icDescText} numberOfLines={2}>
        {language === 'hi' ? ic.simpleSummaryHi : ic.simpleSummaryEn}
      </Text>

      {/* Inverter Application Snippet */}
      <View style={styles.icAppSnippet}>
        <Text style={styles.icAppSnippetText} numberOfLines={1}>
          ⚡ {language === 'hi' ? ic.inverterApplicationHi : ic.inverterApplicationEn}
        </Text>
      </View>

      {/* Bottom Action Footer */}
      <View style={styles.icCardFooter}>
        <Text style={styles.icCardFooterAction}>
          {tr(language, 'viewIcDetails')}
        </Text>
      </View>
    </Pressable>
  );
});

// ─── Memoized IC Detail View ─────────────────────────────────────────────────

interface IcDetailViewProps {
  ic: IcDetail;
  language: 'en' | 'hi';
  onBack: () => void;
}

const IcDetailView = React.memo(function IcDetailView({ ic, language, onBack }: IcDetailViewProps) {
  const theme = getCategoryTheme(ic.category);

  return (
    <View style={{ flex: 1 }}>
      {/* Header Bar with Back to IC List & Sidebar Menu */}
      <AppHeader
        showBack={true}
        backLabel={tr(language, 'backToIcsList')}
        onBackPress={onBack}
        title={ic.name}
        subtitle={`${ic.category} • ${ic.totalPins} Pins (${ic.dipPackageName} & ${ic.smdPackageName})`}
        showMenu={true}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.detailScrollContent}
      >
        {/* IC Summary Card */}
        <View style={styles.icTitleCard}>
          <View style={styles.icTitleRow}>
            <View style={styles.icMainIcon}>
              <Text style={styles.icMainIconText}>{theme.icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.activeIcName}>{ic.name}</Text>
              <Text style={styles.activeIcAliases}>
                Aliases / Direct equivalents: {ic.aliases.join(', ')}
              </Text>
            </View>
          </View>

          <Text style={styles.icSummaryText}>
            {language === 'hi' ? ic.simpleSummaryHi : ic.simpleSummaryEn}
          </Text>
        </View>

        {/* Combined DIP & SMD Visual Package Graphic */}
        <CombinedIcGraphic ic={ic} />

        {/* 1. Working Principle (सरल शब्दों में) */}
        <View style={styles.card}>
          <Text style={styles.cardSectionHeading}>
            💡 {tr(language, 'workingTitle')}
          </Text>
          <Text style={styles.cardSectionBody}>
            {language === 'hi' ? ic.workingPrincipleHi : ic.workingPrincipleEn}
          </Text>
        </View>

        {/* 2. Inverter Circuit Application */}
        <View style={styles.card}>
          <Text style={styles.cardSectionHeading}>
            ⚡ {tr(language, 'inverterApplication')}
          </Text>
          <Text style={styles.cardSectionBody}>
            {language === 'hi' ? ic.inverterApplicationHi : ic.inverterApplicationEn}
          </Text>
        </View>

        {/* 3. Multimeter Testing & Key Voltages */}
        <View style={styles.testingCard}>
          <Text style={styles.testingCardTitle}>
            🩺 {tr(language, 'testingTitle')}
          </Text>
          <Text style={styles.testingCardText}>
            {language === 'hi' ? ic.testingTipHi : ic.testingTipEn}
          </Text>
        </View>

        {/* 4. Complete Pin-by-Pin Details Table */}
        <View style={styles.card}>
          <Text style={styles.cardSectionHeading}>
            📌 {tr(language, 'pinDetails')} ({ic.totalPins} Pins)
          </Text>

          <View style={styles.pinTable}>
            {/* Table Header */}
            <View style={[styles.pinTableRow, styles.pinTableHeader]}>
              <Text style={[styles.pinTableCellHeader, { width: 45 }]}>
                {tr(language, 'pinNumber')}
              </Text>
              <Text style={[styles.pinTableCellHeader, { width: 85 }]}>
                {tr(language, 'pinName')}
              </Text>
              <Text style={[styles.pinTableCellHeader, { flex: 1 }]}>
                {tr(language, 'pinFunction')}
              </Text>
            </View>

            {/* Pin Rows */}
            {ic.pins.map((p, idx) => {
              const isEven = idx % 2 === 0;
              const typeColor = PIN_TYPE_COLORS[p.type] || '#6B7280';
              const typeLabel = language === 'hi' ? (PIN_TYPE_NAMES_HI[p.type] ?? p.type) : p.type;

              return (
                <View
                  key={p.pin}
                  style={[
                    styles.pinTableRow,
                    isEven && styles.pinTableRowAlt,
                  ]}
                >
                  {/* Pin Number */}
                  <View style={{ width: 45, alignItems: 'center' }}>
                    <View style={styles.pinBadge}>
                      <Text style={styles.pinBadgeText}>{p.pin}</Text>
                    </View>
                  </View>

                  {/* Pin Name with Type Tag */}
                  <View style={{ width: 85, paddingRight: 4 }}>
                    <Text style={styles.pinNameBold}>{p.name}</Text>
                    <View
                      style={[
                        styles.pinTypePill,
                        { backgroundColor: `${typeColor}15` },
                      ]}
                    >
                      <Text
                        style={[
                          styles.pinTypePillText,
                          { color: typeColor },
                        ]}
                      >
                        {typeLabel}
                      </Text>
                    </View>
                  </View>

                  {/* Function Description */}
                  <View style={{ flex: 1, paddingLeft: 4 }}>
                    <Text style={styles.pinDescText}>
                      {language === 'hi' ? p.descHi : p.descEn}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Bottom Return Button */}
        <Pressable
          onPress={onBack}
          style={styles.bottomReturnBtn}
        >
          <Text style={styles.bottomReturnBtnText}>
            {tr(language, 'backToIcsList')}
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
});

// ─── Main Screen Component ───────────────────────────────────────────────────

export default function IcGuideScreen() {
  const { language } = useLanguage();
  const { safeBack } = useSafeNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedIcId, setSelectedIcId] = useState<string | null>(null);

  // Hardware Back button handling: return to list view if detail view is open
  useEffect(() => {
    if (!selectedIcId) return;

    const backAction = () => {
      setSelectedIcId(null);
      return true; // prevent popping whole route
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [selectedIcId]);

  const filteredIcs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return INDEXED_ICS.filter((ic) => {
      const matchCat =
        selectedCategory === 'All' || ic.category === selectedCategory;
      if (!matchCat) return false;
      if (!q) return true;
      return ic._searchIndex.includes(q);
    });
  }, [searchQuery, selectedCategory]);

  const activeIc = useMemo(() => {
    if (!selectedIcId) return null;
    return IC_DATABASE.find((item) => item.id === selectedIcId) || null;
  }, [selectedIcId]);

  const handleSelectIc = useCallback((id: string) => {
    setSelectedIcId(id);
  }, []);

  const handleBackToList = useCallback(() => {
    setSelectedIcId(null);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: typeof INDEXED_ICS[0] }) => (
      <IcCardItem ic={item} language={language} onSelect={handleSelectIc} />
    ),
    [language, handleSelectIc]
  );

  const keyExtractor = useCallback((item: typeof INDEXED_ICS[0]) => item.id, []);

  // List Header with Search & Filter
  const ListHeader = useMemo(
    () => (
      <View style={styles.listHeaderContainer}>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={tr(language, 'searchIc')}
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')} style={{ padding: 4 }}>
              <Text style={{ color: '#9CA3AF', fontWeight: '800' }}>✕</Text>
            </Pressable>
          )}
        </View>

        {/* Category Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.catScroll}
        >
          {ALL_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            const catLabel = language === 'hi' ? (CATEGORY_NAMES_HI[cat] ?? cat) : cat;
            return (
              <Pressable
                key={cat}
                onPress={() => setSelectedCategory(cat)}
                style={[
                  styles.catPill,
                  isSelected && styles.catPillSelected,
                ]}
              >
                <Text
                  style={[
                    styles.catPillText,
                    isSelected && styles.catPillTextSelected,
                  ]}
                >
                  {catLabel}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Count Badge */}
        <View style={styles.countBadgeRow}>
          <Text style={styles.countBadgeText}>
            {filteredIcs.length} {tr(language, 'totalIcsAvailable')}
          </Text>
        </View>
      </View>
    ),
    [searchQuery, selectedCategory, language, filteredIcs.length]
  );

  const ListEmpty = useMemo(
    () => (
      <View style={styles.noResultBox}>
        <Text style={styles.noResultIcon}>🔍</Text>
        <Text style={styles.noResultText}>
          {tr(language, 'noIcFound')}
        </Text>
      </View>
    ),
    [language]
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F8FA" />

      {activeIc ? (
        <IcDetailView ic={activeIc} language={language} onBack={handleBackToList} />
      ) : (
        <View style={{ flex: 1 }}>
          {/* Header Bar with Sidebar Menu */}
          <AppHeader
            showBack={true}
            backLabel={tr(language, 'back')}
            onBackPress={() => safeBack()}
            title={`💾 ${tr(language, 'icListTitle')}`}
            subtitle={tr(language, 'icListSubtitle')}
            showMenu={true}
          />

          {/* High performance virtualized FlatList */}
          <FlatList
            data={filteredIcs}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            ListHeaderComponent={ListHeader}
            ListEmptyComponent={ListEmpty}
            contentContainerStyle={styles.flatListContent}
            initialNumToRender={8}
            maxToRenderPerBatch={10}
            windowSize={5}
            removeClippedSubviews={true}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },

  flatListContent: {
    paddingHorizontal: 18,
    paddingBottom: 60,
    gap: 12,
  },

  detailScrollContent: {
    paddingHorizontal: 18,
    paddingBottom: 60,
  },

  listHeaderContainer: {
    paddingBottom: 4,
  },

  /* SEARCH & CATEGORIES */

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 10,
  },

  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
  },

  catScroll: {
    gap: 8,
    paddingBottom: 8,
  },

  catPill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  catPillSelected: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },

  catPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4B5563',
  },

  catPillTextSelected: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  countBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
    marginTop: 2,
  },

  countBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  /* IC LIST CARDS */

  icCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 11,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
    marginBottom: 1,
  },

  icCardPressed: {
    borderColor: '#2563EB',
    backgroundColor: '#F8FAFC',
    transform: [{ scale: 0.99 }],
  },

  icCardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },

  icCatBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
  },

  icCatIcon: {
    fontSize: 10,
  },

  icCatText: {
    fontSize: 10,
    fontWeight: '800',
  },

  icPinsBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
  },

  icPinsBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
  },

  icTitleText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 1,
  },

  icAliasesText: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 4,
    fontWeight: '600',
  },

  icDescText: {
    fontSize: 12,
    lineHeight: 17,
    color: '#334155',
    marginBottom: 6,
  },

  icAppSnippet: {
    backgroundColor: '#F8FAFC',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderLeftWidth: 3,
    borderLeftColor: '#2563EB',
    marginBottom: 8,
  },

  icAppSnippetText: {
    fontSize: 11,
    color: '#1E40AF',
    fontWeight: '600',
  },

  icCardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 6,
  },

  icCardFooterAction: {
    fontSize: 12,
    fontWeight: '800',
    color: '#2563EB',
  },

  /* DETAIL VIEW CONTAINER */

  icTitleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 14,
  },

  icTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },

  icMainIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icMainIconText: {
    fontSize: 22,
  },

  activeIcName: {
    fontSize: 20,
    fontWeight: '900',
    color: '#111827',
  },

  activeIcAliases: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },

  icSummaryText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#374151',
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  /* COMBINED GRAPHIC CARD */

  graphicCard: {
    backgroundColor: '#0F172A',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1E293B',
    marginBottom: 14,
  },

  graphicSwitchRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 16,
  },

  switchBtn: {
    flex: 1,
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: '#1E293B',
    alignItems: 'center',
  },

  switchBtnActive: {
    backgroundColor: '#2563EB',
  },

  switchBtnText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '700',
  },

  switchBtnTextActive: {
    color: '#FFFFFF',
    fontWeight: '900',
  },

  graphicsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
  },

  packageColumn: {
    flex: 1,
    alignItems: 'center',
  },

  packageBadgeDIP: {
    backgroundColor: '#1E3A8A',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 10,
  },

  packageBadgeTextDIP: {
    color: '#93C5FD',
    fontSize: 10,
    fontWeight: '800',
  },

  packageBadgeSMD: {
    backgroundColor: '#14532D',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 10,
  },

  packageBadgeTextSMD: {
    color: '#86EFAC',
    fontSize: 10,
    fontWeight: '800',
  },

  /* DIP PACKAGE */

  dipBodyWrapper: {
    width: '100%',
    backgroundColor: '#18181B',
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#27272A',
    paddingVertical: 10,
    paddingHorizontal: 4,
    alignItems: 'center',
    position: 'relative',
  },

  dipTopNotch: {
    width: 24,
    height: 10,
    backgroundColor: '#09090B',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    position: 'absolute',
    top: 0,
  },

  pin1Dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E4E4E7',
    position: 'absolute',
    top: 14,
    left: 8,
  },

  dipBody: {
    alignItems: 'center',
    marginVertical: 4,
  },

  icChipName: {
    color: '#F4F4F5',
    fontSize: 13,
    fontWeight: '900',
    fontFamily: 'monospace',
    letterSpacing: 1,
  },

  icChipType: {
    color: '#71717A',
    fontSize: 9,
    fontWeight: '700',
    marginTop: 2,
  },

  dipPinsContainer: {
    width: '100%',
    gap: 6,
    marginTop: 8,
  },

  pinPairRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  pinRowHalfLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },

  pinRowHalfRight: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
  },

  pinLabelText: {
    color: '#38BDF8',
    fontSize: 9,
    fontWeight: '700',
    maxWidth: 42,
  },

  dipMetalLead: {
    width: 10,
    height: 4,
    backgroundColor: '#CBD5E1',
    marginHorizontal: 3,
  },

  pinNumberCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#27272A',
    alignItems: 'center',
    justifyContent: 'center',
  },

  pinNumberText: {
    color: '#F8FAFC',
    fontSize: 8,
    fontWeight: '900',
  },

  /* SMD PACKAGE */

  smdBodyWrapper: {
    width: '100%',
    backgroundColor: '#09090B',
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#1E293B',
    paddingVertical: 10,
    paddingHorizontal: 4,
    alignItems: 'center',
    position: 'relative',
  },

  pin1DotSmd: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#38BDF8',
    position: 'absolute',
    top: 10,
    left: 8,
  },

  smdBody: {
    alignItems: 'center',
    marginVertical: 4,
  },

  smdChipName: {
    color: '#E2E8F0',
    fontSize: 12,
    fontWeight: '900',
    fontFamily: 'monospace',
    letterSpacing: 1,
  },

  smdChipSub: {
    color: '#64748B',
    fontSize: 8,
    fontWeight: '700',
  },

  smdPinsContainer: {
    width: '100%',
    gap: 6,
    marginTop: 8,
  },

  smdPinPairRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  smdPinLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },

  smdPinRight: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
  },

  smdPinLabel: {
    color: '#34D399',
    fontSize: 9,
    fontWeight: '700',
    maxWidth: 42,
  },

  smdGullLead: {
    width: 8,
    height: 3,
    backgroundColor: '#94A3B8',
    marginHorizontal: 3,
  },

  smdNum: {
    color: '#94A3B8',
    fontSize: 8,
    fontWeight: '800',
  },

  /* SHARED DETAIL CARD */

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 14,
  },

  cardSectionHeading: {
    fontSize: 15,
    fontWeight: '900',
    color: '#111827',
    marginBottom: 8,
  },

  cardSectionBody: {
    fontSize: 13,
    lineHeight: 20,
    color: '#374151',
  },

  /* TESTING CARD */

  testingCard: {
    backgroundColor: '#F0FDF4',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#BBF7D0',
    marginBottom: 14,
  },

  testingCardTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#15803D',
    marginBottom: 6,
  },

  testingCardText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#14532D',
  },

  /* PIN TABLE */

  pinTable: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
    marginTop: 8,
  },

  pinTableHeader: {
    backgroundColor: '#1E3A5F',
  },

  pinTableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 8,
    alignItems: 'center',
  },

  pinTableRowAlt: {
    backgroundColor: '#F8FAFC',
  },

  pinTableCellHeader: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },

  pinBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  pinBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
  },

  pinNameBold: {
    fontSize: 12,
    fontWeight: '900',
    color: '#111827',
  },

  pinTypePill: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 2,
    alignSelf: 'flex-start',
  },

  pinTypePillText: {
    fontSize: 9,
    fontWeight: '800',
  },

  pinDescText: {
    fontSize: 12,
    lineHeight: 17,
    color: '#4B5563',
  },

  bottomReturnBtn: {
    backgroundColor: '#2563EB',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 20,
  },

  bottomReturnBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  noResultBox: {
    paddingVertical: 60,
    alignItems: 'center',
  },

  noResultIcon: {
    fontSize: 32,
    marginBottom: 8,
  },

  noResultText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '700',
  },
});
