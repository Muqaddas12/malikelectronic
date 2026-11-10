import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppHeader from '@/components/AppHeader';
import InverterCard from '@/components/InverterCard';
import NewDiagramsModal from '@/components/NewDiagramsModal';
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
  const [isNewDiagramsModalOpen, setIsNewDiagramsModalOpen] = useState(false);
  const { language, isHindi } = useLanguage();
  const { colors } = useTheme();
  const { safePush } = useSafeNavigate();

  const filteredInverters = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return inverters;
    }

    return inverters.filter((inverter) => {
      const fullText = `${inverter.brand} ${inverter.model} ${inverter.capacity} ${inverter.type} ${inverter.batteryVoltage}`.toLowerCase();
      return fullText.includes(query);
    });
  }, [search]);

  const handleSelectInverter = useCallback(
    (item: (typeof inverters)[0]) => {
      safePush({
        pathname: '/inverter/[id]',
        params: { id: item.id },
      });
    },
    [safePush],
  );

  const renderItem = useCallback(
    ({ item }: { item: (typeof inverters)[0] }) => (
      <InverterCard
        inverter={item}
        onPress={() => handleSelectInverter(item)}
      />
    ),
    [handleSelectInverter],
  );

  const keyExtractor = useCallback((item: (typeof inverters)[0]) => item.id, []);

  const searching = search.trim().length > 0;

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={[styles.safeArea, { backgroundColor: colors.surface }]}
    >
      <AppHeader
        showBack={false}
        showMenu
       />

      <FlatList
        data={filteredInverters}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={5}
        removeClippedSubviews={Platform.OS === 'android'}
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

            <View style={styles.headerInfoRow}>
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

              {/* Quick action to open newly added diagrams modal */}
              <Pressable
                onPress={() => setIsNewDiagramsModalOpen(true)}
                accessibilityRole="button"
                accessibilityLabel="Newly added diagrams"
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                style={({ pressed }) => [
                  styles.quickUpdatesBtn,
                  {
                    backgroundColor: pressed
                      ? colors.panelRaised
                      : colors.panelSunken,
                    borderColor: colors.rule,
                  },
                ]}
              >
                <Text
                  style={[styles.quickUpdatesText, { color: colors.readout }]}
                >
                  ⚡ {isHindi ? 'नए डायग्राम' : 'New Diagrams'}
                </Text>
              </Pressable>
            </View>
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

      <NewDiagramsModal
        visible={isNewDiagramsModalOpen}
        onClose={() => setIsNewDiagramsModalOpen(false)}
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

  headerInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: space.sm,
    paddingHorizontal: 2,
  },

  count: {
    fontFamily: mono,
    fontSize: size.micro,
    fontWeight: weight.medium,
  },

  quickUpdatesBtn: {
    paddingHorizontal: space.sm,
    paddingVertical: 3,
    borderRadius: radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
  },

  quickUpdatesText: {
    fontSize: size.micro,
    fontWeight: weight.bold,
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
