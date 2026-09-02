import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppHeader from '@/components/AppHeader';
import InverterCard from '@/components/InverterCard';
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
import { inverters } from '@/data/inverters';
import { tr } from '@/data/translations';
import { useSafeNavigate } from '@/hooks/useSafeNavigate';

export default function TabOneScreen() {
  const [search, setSearch] = useState('');
  const { language, isHindi } = useLanguage();
  const { colors } = useTheme();
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

  const searching = search.trim().length > 0;

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={[styles.safeArea, { backgroundColor: colors.surface }]}
    >
      <AppHeader
        showBack={false}
        showMenu
        title={tr(language, 'appTagline')}
        subtitle={tr(language, 'appDescription')}
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
                params: { id: item.id },
              })
            }
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <SearchBar
              value={search}
              onChangeText={setSearch}
              placeholder={tr(language, 'searchModelOrBrand')}
            />

            {/* A live count: the technician sees the filter working. */}
            <Text
              style={[styles.count, { color: colors.textFaint }]}
              accessibilityLiveRegion="polite"
            >
              {filteredInverters.length}
              <Text style={{ color: colors.textFaint }}>
                {' / '}
                {inverters.length}
              </Text>
            </Text>
          </View>
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
              {tr(language, 'noInverterFound')}
            </Text>

            <Text
              style={[
                styles.emptyText,
                {
                  color: colors.textDim,
                  lineHeight: lineFor('small', isHindi),
                },
              ]}
            >
              {tr(language, 'tryAnotherBrand')}
            </Text>

            {searching ? (
              <Text
                style={[styles.emptyQuery, { color: colors.readout }]}
                numberOfLines={1}
              >
                {search.trim()}
              </Text>
            ) : null}
          </View>
        }
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

  listHeader: {
    paddingBottom: space.md,
  },

  count: {
    fontFamily: mono,
    fontSize: size.micro,
    fontWeight: weight.medium,
    marginTop: space.sm,
    marginLeft: 2,
  },

  empty: {
    marginTop: space.xl,
    padding: space.xl,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
  },

  emptyTitle: {
    fontSize: size.sub,
    fontWeight: weight.bold,
  },

  emptyText: {
    fontSize: size.small,
    marginTop: space.xs,
  },

  emptyQuery: {
    fontFamily: mono,
    fontSize: size.small,
    fontWeight: weight.semi,
    marginTop: space.md,
  },
});
