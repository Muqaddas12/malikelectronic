import React, { useMemo, useState } from 'react';
import {
    FlatList,
    Image,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { useLocalSearchParams } from 'expo-router';

import AppHeader from '@/components/AppHeader';
import DiagramViewerModal from '@/components/DiagramViewerModal';
import FaultCard from '@/components/FaultCard';
import PdfDocumentViewerModal from '@/components/PdfDocumentViewerModal';
import SearchBar from '@/components/SearchBar';
import {
    layout,
    lineFor,
    mono,
    radius,
    size,
    space,
    weight,
} from '@/constants/theme';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { getFaultsForInverter } from '@/data/inverterfaults';
import { inverters } from '@/data/inverters';
import { getMicrocontrollerDoc } from '@/data/microcontroller';
import { tr } from '@/data/translations';
import { useSafeNavigate } from '@/hooks/useSafeNavigate';

export default function InverterFaultsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [search, setSearch] = useState('');
  const { language, isHindi } = useLanguage();
  const { colors } = useTheme();
  const { safePush } = useSafeNavigate();

  const [isPcbModalOpen, setIsPcbModalOpen] = useState(false);
  const [isMcModalOpen, setIsMcModalOpen] = useState(false);

  const inverter = inverters.find((item) => item.id === id);

  const mcDoc = inverter
    ? getMicrocontrollerDoc(inverter.id, language)
    : undefined;

  const allFaults = useMemo(
    () => (inverter ? getFaultsForInverter(inverter.id, language) : []),
    [inverter, language],
  );

  const inverterFaults = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return allFaults;

    return allFaults.filter((fault) =>
      [fault.title, fault.subtitle, ...fault.symptoms]
        .join(' ')
        .toLowerCase()
        .includes(query),
    );
  }, [allFaults, search]);

  if (!inverter) {
    return (
      <SafeAreaView
        edges={['top', 'left', 'right']}
        style={[styles.safeArea, { backgroundColor: colors.surface }]}
      >
        <AppHeader showBack showMenu />

        <View style={styles.center}>
          <Text style={[styles.notFound, { color: colors.text }]}>
            {tr(language, 'inverterNotFound')}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const brand = isHindi ? inverter.brandHi ?? inverter.brand : inverter.brand;

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={[styles.safeArea, { backgroundColor: colors.surface }]}
    >
      <AppHeader
        showBack
        showMenu
        title={inverter.model}
        subtitle={brand}
      />

      <DiagramViewerModal
        visible={isPcbModalOpen}
        item={{
          id: `pcb:${inverter.id}`,
          title: `${brand} ${inverter.model} PCB`,
          route: `/inverter/${encodeURIComponent(inverter.id)}`,
        }}
        source={inverter.pcbImage}
        title={`${brand} ${inverter.model}`}
        subtitle={tr(language, 'zoomHint')}
        onClose={() => setIsPcbModalOpen(false)}
      />

      <PdfDocumentViewerModal
        visible={isMcModalOpen}
        doc={mcDoc}
        onClose={() => setIsMcModalOpen(false)}
      />

      <FlatList
        data={inverterFaults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FaultCard
            fault={item}
            inverterId={inverter.id}
            modelName={`${brand} ${inverter.model}`}
            onPress={() =>
              safePush({
                pathname: '/inverter/fault/[faultId]',
                params: { id: inverter.id, faultId: item.id },
              })
            }
          />
        )}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <>
            {inverter.pcbImage ? (
              <Pressable
                onPress={() => setIsPcbModalOpen(true)}
                accessibilityRole="button"
                accessibilityLabel={tr(language, 'viewPcbPhoto')}
                style={({ pressed }) => [
                  styles.mcCard,
                  {
                    borderColor: pressed ? colors.ruleStrong : colors.rule,
                    backgroundColor: pressed
                      ? colors.panelRaised
                      : colors.panel,
                  },
                ]}
              >
                <View
                  style={[styles.edge, { backgroundColor: colors.signal }]}
                />
                <View style={styles.mcInner}>
                  <View
                    style={[
                      styles.mcIconWell,
                      {
                        backgroundColor: colors.panelSunken,
                        borderColor: colors.rule,
                      },
                    ]}
                  >
                    <Text style={[styles.mcIcon, { color: colors.signal }]}>
                      🖼
                    </Text>
                  </View>
                  <View style={styles.mcText}>
                    <Text style={[styles.mcTitle, { color: colors.text }]}>
                      {isHindi ? 'पीसीबी फोटो देखें' : 'View PCB Photo'}
                    </Text>
                  </View>
                  <Text style={[styles.chevron, { color: colors.textFaint }]}>
                    ›
                  </Text>
                </View>
              </Pressable>
            ) : null}

            {mcDoc ? (
              <Pressable
                onPress={() => setIsMcModalOpen(true)}
                accessibilityRole="button"
                accessibilityLabel={`${mcDoc.chipName}. ${tr(
                  language,
                  'viewPinDetails',
                )}`}
                style={({ pressed }) => [
                  styles.mcCard,
                  {
                    borderColor: pressed ? colors.signal : colors.rule,
                    backgroundColor: pressed
                      ? colors.panelRaised
                      : colors.panel,
                  },
                ]}
              >
                <View
                  style={[
                    styles.mcIconWell,
                    {
                      backgroundColor: colors.panelSunken,
                      borderColor: colors.rule,
                    },
                  ]}
                >
                  <FontAwesome name="file-pdf-o" size={17} color={colors.readout} />
                </View>

                <View style={styles.mcText}>
                  <View style={styles.mcTitleRow}>
                    <Text
                      style={[styles.mcTitle, { color: colors.text }]}
                      numberOfLines={1}
                    >
                      {mcDoc.chipName}
                    </Text>

                    <View
                      style={[
                        styles.mcTag,
                        {
                          backgroundColor: colors.panelSunken,
                          borderColor: colors.rule,
                        },
                      ]}
                    >
                      <Text
                        style={[styles.mcTagText, { color: colors.readout }]}
                      >
                        PDF
                      </Text>
                    </View>
                  </View>

                  <Text
                    style={[styles.mcSubtitle, { color: colors.textDim }]}
                    numberOfLines={1}
                  >
                    {mcDoc.subtitle || tr(language, 'microcontrollerSubtitle')}
                  </Text>
                </View>

                <FontAwesome
                  name="chevron-right"
                  size={11}
                  color={colors.textFaint}
                  style={styles.chevron}
                />
              </Pressable>
            ) : null}

            <View style={styles.searchWrapper}>
              <SearchBar
                value={search}
                onChangeText={setSearch}
                placeholder={tr(language, 'searchFault')}
              />

              <Text
                style={[styles.count, { color: colors.textFaint }]}
                accessibilityLiveRegion="polite"
              >
                {inverterFaults.length} / {allFaults.length}
              </Text>
            </View>
          </>
        }
        ListEmptyComponent={
          <View
            style={[
              styles.empty,
              {
                borderColor: colors.rule,
                backgroundColor: colors.panelSunken,
              },
            ]}
          >
            <Text
              style={[
                styles.emptyTitle,
                {
                  color: colors.text,
                  lineHeight: lineFor('sub', isHindi),
                },
              ]}
            >
              {tr(language, 'noFaultFound')}
            </Text>

            {search.trim() ? (
              <Text
                style={[styles.emptyQuery, { color: colors.readout }]}
                numberOfLines={1}
              >
                {search.trim()}
              </Text>
            ) : null}
          </View>
        }
        ListFooterComponent={<View style={styles.bottomSpacer} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  content: {
    paddingHorizontal: layout.gutter,
    paddingTop: space.md,
    paddingBottom: space.xxxl,
  },

  /* HERO */

  hero: {
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: space.md,
    overflow: 'hidden',
  },

  heroBody: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: space.md,
    gap: space.md,
  },

  heroText: {
    flex: 1,
  },

  brand: {
    fontSize: size.small,
    fontWeight: weight.semi,
  },

  model: {
    fontSize: size.title,
    fontWeight: weight.bold,
    letterSpacing: -0.3,
    marginTop: 1,
  },

  type: {
    fontSize: size.small,
    marginTop: space.xs,
  },

  /* PCB THUMBNAIL — a viewport onto the board, labelled rather than badged. */

  pcbWell: {
    width: 84,
    height: 76,
    borderRadius: radius.sm,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  pcbImage: {
    width: '100%',
    height: '100%',
  },

  pcbLabel: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    paddingVertical: 2,
    borderTopWidth: StyleSheet.hairlineWidth,
  },

  pcbLabelText: {
    fontFamily: mono,
    fontSize: size.micro,
    fontWeight: weight.bold,
  },

  /* MICROCONTROLLER DOC */

  mcCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: space.sm,
    paddingVertical: 10,
    paddingHorizontal: space.sm + 2,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
    }),
  },

  edge: {
    width: 3,
  },

  mcInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: space.md,
    gap: space.md,
  },

  mcIconWell: {
    width: 42,
    height: 42,
    borderRadius: radius.sm + 2,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  mcIcon: {
    fontSize: 20,
  },

  mcText: {
    flex: 1,
    marginLeft: space.sm + 2,
    marginRight: space.xs,
    justifyContent: 'center',
  },

  mcTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
  },

  mcTitle: {
    flexShrink: 1,
    fontSize: 14.5,
    fontWeight: weight.bold,
    letterSpacing: -0.2,
  },

  mcTag: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: radius.pill,
    borderWidth: 1,
  },

  mcTagText: {
    fontSize: 9,
    fontWeight: weight.bold,
  },

  mcSubtitle: {
    fontSize: 11.5,
    marginTop: 2,
  },

  mcAction: {
    fontSize: size.micro,
    fontWeight: weight.bold,
    marginTop: space.sm,
  },

  chevron: {
    fontSize: 24,
  },

  /* SEARCH + COUNT */

  searchWrapper: {
    marginBottom: space.md,
  },

  count: {
    fontFamily: mono,
    fontSize: size.micro,
    fontWeight: weight.medium,
    marginTop: space.sm,
    marginLeft: 2,
  },

  /* EMPTY + NOT FOUND */

  empty: {
    marginTop: space.lg,
    padding: space.xl,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
  },

  emptyTitle: {
    fontSize: size.sub,
    fontWeight: weight.bold,
  },

  emptyQuery: {
    fontFamily: mono,
    fontSize: size.small,
    fontWeight: weight.semi,
    marginTop: space.md,
  },

  bottomSpacer: {
    height: space.xxxl,
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: space.xl,
  },

  notFound: {
    fontSize: size.sub,
    fontWeight: weight.bold,
  },
});
