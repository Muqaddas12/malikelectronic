import React, { useMemo, useState } from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppHeader from '@/components/AppHeader';
import InverterCard from '@/components/InverterCard';
import SearchBar from '@/components/SearchBar';

import { useLanguage } from '@/context/LanguageContext';
import { tr } from '@/data/translations';
import { inverters } from '@/data/inverters';
import { useSafeNavigate } from '@/hooks/useSafeNavigate';

export default function TabOneScreen() {
  const [search, setSearch] = useState('');
  const { language } = useLanguage();
  const { safePush } = useSafeNavigate();

  const filteredInverters = useMemo(() => {
    const query = search.trim().toLowerCase();

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

      {/* Header Bar with App Brand & Sidebar Hamburger Menu */}
      <AppHeader
        showBack={false}
        showMenu={true}
      />

      <FlatList
        data={filteredInverters}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <InverterCard
            inverter={item}
            onPress={() =>
              safePush({
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
          <View style={styles.listHeader}>
            <SearchBar
              value={search}
              onChangeText={setSearch}
              placeholder={tr(language, 'searchModelOrBrand')}
            />
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>
              {tr(language, 'noInverterFound')}
            </Text>

            <Text style={styles.emptyText}>
              {tr(language, 'tryAnotherBrand')}
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
    paddingTop: 4,
    paddingBottom: 40,
  },

  listHeader: {
    paddingBottom: 10,
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