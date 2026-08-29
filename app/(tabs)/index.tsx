import React, { useMemo, useState } from 'react';

import {
    FlatList,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { router } from 'expo-router';

import InverterCard from '@/components/InverterCard';
import SearchBar from '@/components/SearchBar';
import SectionTitle from '@/components/SectionTitle';

import { inverters } from '@/data/inverters';

export default function TabOneScreen() {
  const [search, setSearch] = useState('');

  const filteredInverters = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    if (!query) {
      return inverters;
    }

    return inverters.filter((inverter) =>
      [
        inverter.brand,
        inverter.model,
        inverter.capacity,
        inverter.type,
        inverter.batteryVoltage,
      ]
        .join(' ')
        .toLowerCase()
        .includes(query),
    );
  }, [search]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F7F8FA"
      />

      <FlatList
        data={filteredInverters}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <InverterCard
            inverter={item}
            onPress={() =>
              router.push({
                pathname: '/inverter/[id]',
                params: {
                  id: item.id,
                },
              })
            }
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View>
            <Text style={styles.appName}>
              MaliK Electronic
            </Text>

            <Text style={styles.heading}>
              Inverter Troubleshooter
            </Text>

            <Text style={styles.description}>
              Select your inverter model to find
              faults, symptoms and troubleshooting
              information.
            </Text>

            <SearchBar
              value={search}
              onChangeText={setSearch}
              placeholder="Search model or brand..."
            />

            <SectionTitle
              title="Select Inverter"
              subtitle={`${filteredInverters.length} models available`}
            />
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>
              No inverter found
            </Text>

            <Text style={styles.emptyText}>
              Try another brand or model name.
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
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 40,
  },

  appName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#2563EB',
    marginBottom: 5,
  },

  heading: {
    fontSize: 30,
    fontWeight: '900',
    color: '#111827',
  },

  description: {
    fontSize: 14,
    lineHeight: 21,
    color: '#6B7280',
    marginTop: 8,
    marginBottom: 22,
  },

  empty: {
    alignItems: 'center',
    paddingTop: 60,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },

  emptyText: {
    marginTop: 5,
    color: '#6B7280',
  },
});