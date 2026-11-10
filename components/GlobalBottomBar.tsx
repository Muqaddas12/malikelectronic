import React, { memo } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router, usePathname } from 'expo-router';

import { size, space, weight } from '@/constants/theme';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { tr } from '@/data/translations';
import { useBench } from '@/utils/benchStore';

function GlobalBottomBar() {
  const { language, isHindi } = useLanguage();
  const { colors } = useTheme();
  const { favorites } = useBench();

  let pathname = '';
  try {
    pathname = usePathname();
  } catch {
    pathname = '';
  }

  const isFavorites = pathname === '/favorites';
  const isTools =
    pathname === '/two' ||
    pathname === '/(tabs)/two' ||
    pathname.startsWith('/tools');

  const isInverters = !isFavorites && !isTools;

  const navigateToInverters = () => {
    if (pathname === '/' || pathname === '/(tabs)' || pathname === '/(tabs)/index') {
      return;
    }
    router.replace('/(tabs)');
  };

  const navigateToFavorites = () => {
    if (pathname === '/favorites') {
      return;
    }
    router.replace('/favorites');
  };

  const navigateToTools = () => {
    if (pathname === '/(tabs)/two') {
      return;
    }
    router.replace('/(tabs)/two');
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.panel,
          borderTopColor: colors.rule,
        },
      ]}
    >
      {/* INVERTERS TAB */}
      <Pressable
        accessibilityRole="tab"
        accessibilityState={{ selected: isInverters }}
        accessibilityLabel={tr(language, 'tabInverters')}
        onPress={navigateToInverters}
        style={styles.tabButton}
      >
        <FontAwesome
          name="bolt"
          size={20}
          color={isInverters ? colors.signal : colors.textFaint}
          style={styles.icon}
        />
        <Text
          style={[
            styles.label,
            {
              color: isInverters ? colors.signal : colors.textFaint,
              marginTop: isHindi ? 3 : 1,
            },
          ]}
          numberOfLines={1}
        >
          {tr(language, 'tabInverters')}
        </Text>
      </Pressable>

      {/* FAVORITES TAB */}
      <Pressable
        accessibilityRole="tab"
        accessibilityState={{ selected: isFavorites }}
        accessibilityLabel={tr(language, 'tabFavorites')}
        onPress={navigateToFavorites}
        style={styles.tabButton}
      >
        <View style={styles.iconContainer}>
          <FontAwesome
            name={isFavorites ? 'star' : 'star-o'}
            size={20}
            color={isFavorites ? colors.signal : colors.textFaint}
            style={styles.icon}
          />
          {favorites.length > 0 && (
            <View
              style={[
                styles.badge,
                {
                  backgroundColor: isFavorites ? colors.signal : colors.ruleStrong,
                },
              ]}
            >
              <Text
                style={[
                  styles.badgeText,
                  { color: isFavorites ? colors.signalInk : colors.text },
                ]}
              >
                {favorites.length > 99 ? '99+' : favorites.length}
              </Text>
            </View>
          )}
        </View>
        <Text
          style={[
            styles.label,
            {
              color: isFavorites ? colors.signal : colors.textFaint,
              marginTop: isHindi ? 3 : 1,
            },
          ]}
          numberOfLines={1}
        >
          {tr(language, 'tabFavorites')}
        </Text>
      </Pressable>

      {/* TOOLS TAB */}
      <Pressable
        accessibilityRole="tab"
        accessibilityState={{ selected: isTools }}
        accessibilityLabel={tr(language, 'tabTools')}
        onPress={navigateToTools}
        style={styles.tabButton}
      >
        <FontAwesome
          name="calculator"
          size={20}
          color={isTools ? colors.signal : colors.textFaint}
          style={styles.icon}
        />
        <Text
          style={[
            styles.label,
            {
              color: isTools ? colors.signal : colors.textFaint,
              marginTop: isHindi ? 3 : 1,
            },
          ]}
          numberOfLines={1}
        >
          {tr(language, 'tabTools')}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: StyleSheet.hairlineWidth,
    height: Platform.OS === 'ios' ? 76 : 58,
    paddingTop: space.xs + 2,
    paddingBottom: Platform.OS === 'ios' ? space.lg : space.xs + 2,
    elevation: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginBottom: 1,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -10,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 9,
    fontWeight: weight.bold,
    lineHeight: 11,
  },
  label: {
    fontSize: size.micro,
    fontWeight: weight.semi,
  },
});

export default memo(GlobalBottomBar);

