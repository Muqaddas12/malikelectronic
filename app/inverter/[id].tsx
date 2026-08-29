import React, { useMemo, useState } from 'react';

import {
    FlatList,
    Image,
    Pressable,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import FaultCard from '@/components/FaultCard';
import SearchBar from '@/components/SearchBar';

import { useLanguage } from '@/context/LanguageContext';
import { getFaultsForInverter } from '@/data/inverterfaults';
import { inverters } from '@/data/inverters';
import { tr } from '@/data/translations';
import { useSafeNavigate } from '@/hooks/useSafeNavigate';

export default function InverterFaultsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [search, setSearch] = useState('');
  const { language } = useLanguage();
  const { safePush, safeBack } = useSafeNavigate();

  const inverter = inverters.find((item) => item.id === id);

  const inverterFaults = useMemo(() => {
    if (!inverter) return [];

    const allFaults = getFaultsForInverter(inverter.id, language);
    const query = search.trim().toLowerCase();

    if (!query) return allFaults;

    return allFaults.filter((fault) =>
      [fault.title, fault.subtitle, ...fault.symptoms]
        .join(' ')
        .toLowerCase()
        .includes(query),
    );
  }, [inverter, search, language]);

  if (!inverter) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <Text style={styles.notFound}>
            {tr(language, 'inverterNotFound')}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F7F8FA"
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
                params: {
                  id: inverter.id,
                  faultId: item.id,
                },
              })
            }
          />
        )}
        ListHeaderComponent={
          <>
            {/* BACK BUTTON */}
            <Pressable
              onPress={() => safeBack()}
              style={styles.backButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.backText}>
                {tr(language, 'back')}
              </Text>
            </Pressable>

            {/* HERO BANNER SHOWING INVERTER DETAILS & PCB IMAGE */}
            <View style={styles.hero}>
              {/* LEFT SIDE: INVERTER SPECS */}
              <View style={styles.heroInfo}>
                <Text style={styles.brand}>
                  {inverter.brand}
                </Text>

                <Text style={styles.model}>
                  {inverter.model}
                </Text>

                <Text style={styles.specs}>
                  {inverter.capacity} • {inverter.batteryVoltage} • {inverter.type}
                </Text>
              </View>

              {/* RIGHT SIDE: PCB PHOTO */}
              {inverter.pcbImage ? (
                <View style={styles.imageContainer}>
                  <Image
                    source={inverter.pcbImage}
                    style={styles.pcbImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.pcbBadge}>PCB</Text>
                </View>
              ) : null}
            </View>

            {/* SEARCH */}
            <SearchBar
              value={search}
              onChangeText={setSearch}
              placeholder={tr(language, 'searchFault')}
            />

            {/* SECTION HEADING */}
            <Text style={styles.sectionTitle}>
              {tr(language, 'troubleshooting')}
            </Text>

            <Text style={styles.sectionSubtitle}>
              {inverterFaults.length} {tr(language, 'selectProblem')}
            </Text>
          </>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>
              {tr(language, 'noFaultFound')}
            </Text>
          </View>
        }
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={styles.bottomSpacer} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },

  content: {
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 20,
  },

  /* BACK BUTTON */

  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingRight: 15,
    marginBottom: 10,
  },

  backText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2563EB',
  },

  /* HERO */

  hero: {
    backgroundColor: '#111827',
    borderRadius: 24,
    padding: 18,
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 150,
  },

  heroInfo: {
    flex: 1,
    paddingRight: 10,
  },

  brand: {
    color: '#93C5FD',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 4,
  },

  model: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
  },

  specs: {
    color: '#D1D5DB',
    fontSize: 13,
    marginTop: 8,
    lineHeight: 19,
  },

  /* PCB IMAGE */

  imageContainer: {
    width: 125,
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    padding: 4,
    position: 'relative',
  },

  pcbImage: {
    width: 115,
    height: 100,
  },

  pcbBadge: {
    position: 'absolute',
    bottom: 4,
    right: 6,
    backgroundColor: '#2563EB',
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
  },

  /* SECTION */

  sectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#111827',
  },

  sectionSubtitle: {
    color: '#6B7280',
    fontSize: 13,
    marginTop: 4,
    marginBottom: 15,
  },

  /* EMPTY */

  empty: {
    paddingTop: 50,
    alignItems: 'center',
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111827',
  },

  /* BOTTOM SPACE */

  bottomSpacer: {
    height: 40,
  },

  /* NOT FOUND */

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  notFound: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
});