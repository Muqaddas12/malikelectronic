import React, { useMemo, useState } from 'react';

import {
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  router,
  useLocalSearchParams,
} from 'expo-router';

import FaultCard from '@/components/FaultCard';
import SearchBar from '@/components/SearchBar';

import { faults } from '@/data/faults';
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
    if (!inverter) {
      return [];
    }

    const availableFaults = faults.filter(
      (fault) =>
        inverter.faults.includes(fault.id),
    );

    const query = search
      .trim()
      .toLowerCase();

    if (!query) {
      return availableFaults;
    }

    return availableFaults.filter((fault) =>
      [
        fault.title,
        fault.subtitle,
        ...fault.symptoms,
        ...fault.possibleCauses,
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
                pathname: '/inverter/fault/[faultId]',
                params: {
                  id: inverter.id,
                  faultId: item.id,
                },
              })
            }
          />
        )}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <Pressable
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Text style={styles.backText}>
                ‹ Back
              </Text>
            </Pressable>

            <View style={styles.hero}>
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

            <SearchBar
              value={search}
              onChangeText={setSearch}
              placeholder="Search fault..."
            />

            <Text style={styles.sectionTitle}>
              Troubleshooting
            </Text>

            <Text style={styles.sectionSubtitle}>
              Select the problem you are experiencing.
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>
              No fault found
            </Text>
          </View>
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
    padding: 18,
    paddingBottom: 40,
  },

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

  hero: {
    backgroundColor: '#111827',
    borderRadius: 24,
    padding: 22,
    marginBottom: 20,
  },

  brand: {
    color: '#93C5FD',
    fontSize: 13,
    fontWeight: '800',
  },

  model: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
    marginTop: 4,
  },

  specs: {
    color: '#D1D5DB',
    fontSize: 13,
    marginTop: 10,
    lineHeight: 20,
  },

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

  empty: {
    paddingTop: 50,
    alignItems: 'center',
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: '800',
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  notFound: {
    fontSize: 18,
    fontWeight: '800',
  },
});