import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Href } from 'expo-router';

import AppHeader from '@/components/AppHeader';
import { getMatchingDiagramIcon } from '@/components/FaultCard';
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
import { useSafeNavigate } from '@/hooks/useSafeNavigate';
import { SavedItem, toggleFavorite, useBench } from '@/utils/benchStore';

export default function FavoritesScreen() {
  const { colors } = useTheme();
  const { isHindi } = useLanguage();
  const { safePush } = useSafeNavigate();
  const { favorites } = useBench();
  const [search, setSearch] = useState('');

  const filteredFavorites = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return favorites;
    return favorites.filter((item) =>
      item.title.toLowerCase().includes(q),
    );
  }, [favorites, search]);

  const handleRemove = (item: SavedItem) => {
    void toggleFavorite(item);
  };

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={[styles.safeArea, { backgroundColor: colors.surface }]}
    >
      <AppHeader
        showBack={false}
        showMenu
        title={isHindi ? 'पसंदीदा डायग्राम' : 'Favorite Diagrams'}
        subtitle={
          isHindi
            ? `${favorites.length} सेव किए गए डायग्राम`
            : `${favorites.length} saved diagrams`
        }
      />

      {favorites.length > 0 && (
        <View style={styles.searchWrapper}>
          <View
            style={[
              styles.searchBar,
              {
                backgroundColor: colors.panel,
                borderColor: colors.rule,
              },
            ]}
          >
            <FontAwesome
              name="search"
              size={14}
              color={colors.textFaint}
              style={{ marginRight: 8 }}
            />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder={
                isHindi
                  ? 'पसंदीदा में खोजें...'
                  : 'Search in favorites...'
              }
              placeholderTextColor={colors.textFaint}
              style={[styles.searchInput, { color: colors.text }]}
            />
            {search.length > 0 && (
              <Pressable
                onPress={() => setSearch('')}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <FontAwesome name="times-circle" size={16} color={colors.textFaint} />
              </Pressable>
            )}
          </View>
        </View>
      )}

      <FlatList
        data={filteredFavorites}
        keyExtractor={(item) => item.id}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={Platform.OS === 'android'}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View
            style={[
              styles.emptyContainer,
              {
                backgroundColor: colors.panel,
                borderColor: colors.rule,
              },
            ]}
          >
            <View
              style={[
                styles.emptyIconCircle,
                { backgroundColor: colors.signalSoft },
              ]}
            >
              <FontAwesome name="star-o" size={36} color={colors.signal} />
            </View>

            <Text
              style={[
                styles.emptyTitle,
                {
                  color: colors.text,
                  lineHeight: lineFor('sub', isHindi),
                },
              ]}
            >
              {search.trim().length > 0
                ? isHindi
                  ? 'कोई परिणाम नहीं मिला'
                  : 'No matching favorites'
                : isHindi
                ? 'अभी कोई पसंदीदा डायग्राम नहीं है'
                : 'No favorite diagrams saved'}
            </Text>

            <Text
              style={[
                styles.emptySubtitle,
                {
                  color: colors.textDim,
                  lineHeight: lineFor('small', isHindi),
                },
              ]}
            >
              {search.trim().length > 0
                ? isHindi
                  ? 'कृपया दूसरा नाम खोजें।'
                  : 'Try searching with another keyword.'
                : isHindi
                ? 'किसी भी सर्किट डायग्राम के पास ★ बटन दबाकर उसे यहाँ त्वरित पहुंच के लिए सेव करें।'
                : 'Tap the ★ button on any circuit schematic or model sheet to save it here for quick reference at your workbench.'}
            </Text>

            {favorites.length === 0 && (
              <Pressable
                onPress={() => safePush('/(tabs)')}
                style={[
                  styles.browseButton,
                  { backgroundColor: colors.signal },
                ]}
              >
                <FontAwesome
                  name="bolt"
                  size={14}
                  color={colors.signalInk}
                  style={{ marginRight: 6 }}
                />
                <Text
                  style={[
                    styles.browseButtonText,
                    { color: colors.signalInk },
                  ]}
                >
                  {isHindi ? 'डायग्राम ब्राउज़ करें' : 'Browse Diagrams'}
                </Text>
              </Pressable>
            )}
          </View>
        }
        renderItem={({ item }) => {
          const isDiagram = item.id.startsWith('diagram:');
          const isPcb = item.id.startsWith('pcb:');
          const iconMeta = isDiagram ? getMatchingDiagramIcon(item.title, colors) : null;

          return (
            <Pressable
              onPress={() => safePush(item.route as Href)}
              accessibilityRole="button"
              accessibilityLabel={item.title}
              style={({ pressed }) => [
                styles.itemCard,
                {
                  backgroundColor: pressed
                    ? colors.panelRaised
                    : colors.panel,
                  borderColor: pressed ? colors.signal : colors.rule,
                },
              ]}
            >
              <View
                style={[
                  styles.itemIconWell,
                  {
                    backgroundColor: colors.panelSunken,
                    borderColor: colors.rule,
                  },
                ]}
              >
                <FontAwesome
                  name={isDiagram ? iconMeta!.name : isPcb ? 'image' : 'bolt'}
                  size={18}
                  color={isDiagram ? iconMeta!.color : isPcb ? colors.readout : colors.signal}
                />
              </View>

              <View style={styles.itemInfo}>
                <View style={styles.badgeRow}>
                  <View
                    style={[
                      styles.typeBadge,
                      {
                        backgroundColor: colors.panelSunken,
                        borderColor: colors.rule,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.typeBadgeText,
                        {
                          color: isDiagram ? colors.readout : colors.signal,
                        },
                      ]}
                    >
                      {isDiagram
                        ? isHindi
                          ? 'सर्किट डायग्राम'
                          : 'SCHEMATIC'
                        : isPcb
                        ? 'PCB'
                        : isHindi
                        ? 'इन्वर्टर मॉडल'
                        : 'MODEL'}
                    </Text>
                  </View>
                </View>

                <Text
                  style={[styles.itemTitle, { color: colors.text }]}
                  numberOfLines={2}
                >
                  {item.title}
                </Text>
              </View>

              {/* UNFAVORITE BUTTON */}
              <Pressable
                onPress={() => handleRemove(item)}
                accessibilityRole="button"
                accessibilityLabel="Remove from favorites"
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                style={styles.starRemoveBtn}
              >
                <FontAwesome name="star" size={20} color={colors.signal} />
              </Pressable>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  searchWrapper: {
    paddingHorizontal: layout.gutter,
    paddingTop: space.xs,
    paddingBottom: space.xs,
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: space.md,
    height: 44,
    borderRadius: radius.md,
    borderWidth: 1,
  },

  searchInput: {
    flex: 1,
    fontSize: size.small,
  },

  listContent: {
    paddingHorizontal: layout.gutter,
    paddingTop: space.sm,
    paddingBottom: space.xxxl + space.lg,
    gap: space.sm,
  },

  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: space.md,
    borderRadius: radius.lg,
    borderWidth: 1,
  },

  itemIconWell: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: space.md,
  },

  itemInfo: {
    flex: 1,
  },

  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },

  typeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: radius.sm - 2,
    borderWidth: StyleSheet.hairlineWidth,
  },

  typeBadgeText: {
    fontSize: 9,
    fontWeight: weight.bold,
    letterSpacing: 0.5,
  },

  itemTitle: {
    fontSize: size.body,
    fontWeight: weight.bold,
  },

  starRemoveBtn: {
    padding: space.xs,
    marginLeft: space.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyContainer: {
    marginTop: space.xl,
    padding: space.xxl,
    borderRadius: radius.lg,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: space.lg,
  },

  emptyTitle: {
    fontSize: size.sub,
    fontWeight: weight.bold,
    textAlign: 'center',
    marginBottom: space.xs,
  },

  emptySubtitle: {
    fontSize: size.small,
    textAlign: 'center',
    marginBottom: space.lg,
    paddingHorizontal: space.sm,
  },

  browseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: space.xl,
    paddingVertical: space.md - 2,
    borderRadius: radius.pill,
  },

  browseButtonText: {
    fontSize: size.small,
    fontWeight: weight.bold,
  },
});

