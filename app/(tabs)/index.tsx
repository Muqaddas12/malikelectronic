import React, { useMemo, useState } from 'react';

import {
  FlatList,
  Pressable,
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
import Sidebar from '@/components/Sidebar';

import { useLanguage } from '@/context/LanguageContext';
import { tr } from '@/data/translations';
import { inverters } from '@/data/inverters';

export default function TabOneScreen() {
  const [search, setSearch] = useState('');
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const { language } = useLanguage();

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

      {/* Slide-in Sidebar Drawer */}
      <Sidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
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
            {/* Top Navigation Bar with App Name and Sidebar Hamburger Menu */}
            <View style={styles.topBar}>
              <View style={styles.brandRow}>
                <View style={styles.brandIconCircle}>
                  <Text style={styles.brandIcon}>⚡</Text>
                </View>
                <Text style={styles.appName}>
                  {tr(language, 'appName')}
                </Text>
              </View>

              <Pressable
                onPress={() => setSidebarVisible(true)}
                style={({ pressed }) => [
                  styles.menuButton,
                  pressed && styles.menuButtonPressed,
                ]}
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                accessibilityLabel="Open settings menu"
              >
                <View style={styles.hamburgerIcon}>
                  <View style={styles.hamburgerBar} />
                  <View style={styles.hamburgerBar} />
                  <View style={styles.hamburgerBar} />
                </View>
                <Text style={styles.langIndicator}>
                  {language.toUpperCase()}
                </Text>
              </Pressable>
            </View>

            <Text style={styles.heading}>
              {tr(language, 'appTagline')}
            </Text>

            <Text style={styles.description}>
              {tr(language, 'appDescription')}
            </Text>

            <SearchBar
              value={search}
              onChangeText={setSearch}
              placeholder={tr(language, 'searchModelOrBrand')}
            />

            <SectionTitle
              title={tr(language, 'selectInverter')}
              subtitle={`${filteredInverters.length} ${tr(
                language,
                'modelsAvailable',
              )}`}
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
    paddingTop: 12,
    paddingBottom: 40,
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  brandIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  brandIcon: {
    fontSize: 14,
  },

  appName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#2563EB',
    letterSpacing: 0.2,
  },

  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: '#FFFFFF',
    paddingVertical: 7,
    paddingHorizontal: 11,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },

  menuButtonPressed: {
    opacity: 0.7,
    backgroundColor: '#F3F4F6',
  },

  hamburgerIcon: {
    width: 15,
    height: 12,
    justifyContent: 'space-between',
  },

  hamburgerBar: {
    width: '100%',
    height: 2,
    backgroundColor: '#111827',
    borderRadius: 1,
  },

  langIndicator: {
    fontSize: 11,
    fontWeight: '800',
    color: '#2563EB',
  },

  heading: {
    fontSize: 28,
    fontWeight: '900',
    color: '#111827',
    marginTop: 6,
  },

  description: {
    fontSize: 14,
    lineHeight: 21,
    color: '#6B7280',
    marginTop: 8,
    marginBottom: 20,
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