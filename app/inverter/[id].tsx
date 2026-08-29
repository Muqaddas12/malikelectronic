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

import { SafeAreaView } from 'react-native-safe-area-context';

import {
    router,
    useLocalSearchParams,
} from 'expo-router';

import FaultCard from '@/components/FaultCard';
import SearchBar from '@/components/SearchBar';

import { getFaultsForInverter } from '@/data/inverterfaults';
import { inverters } from '@/data/inverters';

export default function InverterFaultsScreen() {
  const { id } =
    useLocalSearchParams<{
      id: string;
    }>();

  const [search, setSearch] = useState('');

  const inverter = inverters.find(
    (item) => item.id === id,
  );

  const inverterFaults = useMemo(() => {
    if (!inverter) return [];

    const allFaults = getFaultsForInverter(
      inverter.id,
    );

    const query = search
      .trim()
      .toLowerCase();

    if (!query) return allFaults;

    return allFaults.filter((fault) =>
      [
        fault.title,
        fault.subtitle,
        ...fault.symptoms,
      ]
        .join(' ')
        .toLowerCase()
        .includes(query),
    );
  }, [inverter, search]);

  if (!inverter) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <Text style={styles.notFound}>
            Inverter not found
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
              router.push({
                pathname:
                  '/inverter/fault/[faultId]',
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
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Text style={styles.backText}>
                ‹ Back
              </Text>
            </Pressable>

            {/* HERO */}
            <View style={styles.hero}>
              {/* LEFT SIDE */}
              <View style={styles.heroInfo}>
                <Text style={styles.brand}>
                  {inverter.brand}
                </Text>

                <Text style={styles.model}>
                  {inverter.model}
                </Text>

                <Text style={styles.specs}>
                  {inverter.capacity} •{' '}
                  {inverter.batteryVoltage} •{' '}
                  {inverter.type}
                </Text>
              </View>

              {/* RIGHT SIDE */}
              {inverter.pcbImage ? (
                <View
                  style={styles.imageContainer}
                >
                  <Image
                    source={inverter.pcbImage}
                    style={styles.pcbImage}
                    resizeMode="contain"
                  />
                </View>
              ) : null}
            </View>

            {/* SEARCH */}
            <SearchBar
              value={search}
              onChangeText={setSearch}
              placeholder="Search fault..."
            />

            {/* TITLE */}
            <Text style={styles.sectionTitle}>
              Troubleshooting
            </Text>

            <Text style={styles.sectionSubtitle}>
              {inverterFaults.length} fault
              {inverterFaults.length !== 1
                ? 's'
                : ''}{' '}
              available — tap to view details.
            </Text>
          </>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>
              No fault found
            </Text>
          </View>
        }
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <View style={styles.bottomSpacer} />
        }
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
    padding: 20,
    marginBottom: 20,

    flexDirection: 'row',
    alignItems: 'center',

    minHeight: 155,
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
    fontSize: 27,
    fontWeight: '900',
  },

  specs: {
    color: '#D1D5DB',
    fontSize: 13,
    marginTop: 10,
    lineHeight: 20,
  },

  /* PCB IMAGE */

  imageContainer: {
    width: 135,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },

  pcbImage: {
    width: 130,
    height: 115,
  },

  /* SECTION */

  sectionTitle: {
    fontSize: 23,
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