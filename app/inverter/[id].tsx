import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useLocalSearchParams } from 'expo-router';

import AppHeader from '@/components/AppHeader';
import DiagramViewerModal from '@/components/DiagramViewerModal';
import FaultCard from '@/components/FaultCard';
import PdfDocumentViewerModal from '@/components/PdfDocumentViewerModal';
import SearchBar from '@/components/SearchBar';
import SpecStrip, { Spec } from '@/components/SpecStrip';
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
  const type = isHindi ? inverter.typeHi ?? inverter.type : inverter.type;

  const specs: Spec[] = [
    {
      label: tr(language, 'specCapacity'),
      value: inverter.capacity,
      grow: 1.5,
    },
    {
      label: tr(language, 'specBattery'),
      value: inverter.batteryVoltage,
    },
    {
      label: tr(language, 'specSheets'),
      value: String(allFaults.length),
      tone: colors.signal,
    },
  ];

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={[styles.safeArea, { backgroundColor: colors.surface }]}
    >
      <AppHeader showBack showMenu />

      <DiagramViewerModal
        visible={isPcbModalOpen}
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
            <View
              style={[
                styles.hero,
                {
                  backgroundColor: colors.panel,
                  borderColor: colors.rule,
                },
              ]}
            >
              <View style={styles.heroBody}>
                <View style={styles.heroText}>
                  <Text
                    style={[styles.brand, { color: colors.textDim }]}
                    numberOfLines={1}
                  >
                    {brand}
                  </Text>

                  <Text
                    style={[
                      styles.model,
                      {
                        color: colors.text,
                        lineHeight: lineFor('title', isHindi),
                      },
                    ]}
                    numberOfLines={2}
                  >
                    {inverter.model}
                  </Text>

                  <Text
                    style={[
                      styles.type,
                      {
                        color: colors.textFaint,
                        lineHeight: lineFor('small', isHindi),
                      },
                    ]}
                    numberOfLines={2}
                  >
                    {type}
                  </Text>
                </View>

                {inverter.pcbImage ? (
                  <Pressable
                    onPress={() => setIsPcbModalOpen(true)}
                    accessibilityRole="button"
                    accessibilityLabel={tr(language, 'viewPcbPhoto')}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    style={({ pressed }) => [
                      styles.pcbWell,
                      {
                        backgroundColor: colors.panelSunken,
                        borderColor: pressed
                          ? colors.readout
                          : colors.rule,
                      },
                    ]}
                  >
                    <Image
                      source={inverter.pcbImage}
                      style={styles.pcbImage}
                      resizeMode="contain"
                    />

                    <View
                      style={[
                        styles.pcbLabel,
                        {
                          backgroundColor: colors.panel,
                          borderTopColor: colors.rule,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.pcbLabelText,
                          { color: colors.readout },
                        ]}
                      >
                        PCB
                      </Text>
                    </View>
                  </Pressable>
                ) : null}
              </View>

              <SpecStrip specs={specs} />
            </View>

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
                    borderColor: pressed ? colors.ruleStrong : colors.rule,
                    backgroundColor: pressed
                      ? colors.panelRaised
                      : colors.panel,
                  },
                ]}
              >
                <View
                  style={[styles.edge, { backgroundColor: colors.readout }]}
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
                    <Text
                      style={[styles.mcIcon, { color: colors.readout }]}
                    >
                      ⊞
                    </Text>
                  </View>

                  <View style={styles.mcText}>
                    <View style={styles.mcTitleRow}>
                      <Text
                        style={[
                          styles.mcTitle,
                          { color: colors.text },
                        ]}
                        numberOfLines={1}
                      >
                        {mcDoc.chipName}
                      </Text>

                      <View
                        style={[
                          styles.mcTag,
                          { borderColor: colors.rule },
                        ]}
                      >
                        <Text
                          style={[
                            styles.mcTagText,
                            { color: colors.readout },
                          ]}
                        >
                          PDF
                        </Text>
                      </View>
                    </View>

                    <Text
                      style={[
                        styles.mcSubtitle,
                        {
                          color: colors.textDim,
                          lineHeight: lineFor('small', isHindi),
                        },
                      ]}
                      numberOfLines={2}
                    >
                      {mcDoc.subtitle ||
                        tr(language, 'microcontrollerSubtitle')}
                    </Text>

                    <Text
                      style={[
                        styles.mcAction,
                        { color: colors.readout },
                      ]}
                    >
                      {tr(language, 'viewPinDetails')}
                    </Text>
                  </View>

                  <Text
                    style={[styles.chevron, { color: colors.textFaint }]}
                  >
                    ›
                  </Text>
                </View>
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
    paddingBottom: space.lg,
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
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: space.md,
    overflow: 'hidden',
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
    borderRadius: radius.sm,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },

  mcIcon: {
    fontSize: 20,
  },

  mcText: {
    flex: 1,
  },

  mcTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
  },

  mcTitle: {
    flexShrink: 1,
    fontSize: size.body,
    fontWeight: weight.bold,
  },

  mcTag: {
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: radius.sm,
    borderWidth: StyleSheet.hairlineWidth,
  },

  mcTagText: {
    fontFamily: mono,
    fontSize: size.micro,
    fontWeight: weight.bold,
  },

  mcSubtitle: {
    fontSize: size.small,
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
