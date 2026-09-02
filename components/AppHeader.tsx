import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import Sidebar from '@/components/Sidebar';
import {
  layout,
  lineFor,
  radius,
  size,
  space,
  weight,
} from '@/constants/theme';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { tr } from '@/data/translations';
import { useSafeNavigate } from '@/hooks/useSafeNavigate';

type AppHeaderProps = {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  backLabel?: string;
  onBackPress?: () => void;
  showMenu?: boolean;
  rightComponent?: React.ReactNode;
};

export default function AppHeader({
  title,
  subtitle,
  showBack = false,
  backLabel,
  onBackPress,
  showMenu = true,
  rightComponent,
}: AppHeaderProps) {
  const { language, isHindi } = useLanguage();
  const { colors } = useTheme();
  const { safeBack } = useSafeNavigate();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleBack = () => {
    if (onBackPress) onBackPress();
    else safeBack();
  };

  return (
    <>
      <Sidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
      />

      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.surface,
            borderBottomColor: colors.rule,
          },
        ]}
      >
        <View style={styles.topRow}>
          <View style={styles.leftActions}>
            {showBack && (
              <Pressable
                onPress={handleBack}
                accessibilityRole="button"
                accessibilityLabel={backLabel || tr(language, 'back')}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                style={({ pressed }) => [
                  styles.iconButton,
                  {
                    borderColor: colors.rule,
                    backgroundColor: pressed
                      ? colors.panelRaised
                      : colors.panel,
                  },
                ]}
              >
                <Text
                  style={[styles.chevron, { color: colors.text }]}
                >
                  ‹
                </Text>
              </Pressable>
            )}

            {showMenu && (
              <Pressable
                onPress={() => setSidebarVisible(true)}
                accessibilityRole="button"
                accessibilityLabel="Open menu"
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                style={({ pressed }) => [
                  styles.menuButton,
                  {
                    borderColor: colors.rule,
                    backgroundColor: pressed
                      ? colors.panelRaised
                      : colors.panel,
                  },
                ]}
              >
                <View style={styles.bars}>
                  <View
                    style={[styles.bar, { backgroundColor: colors.text }]}
                  />
                  <View
                    style={[styles.bar, { backgroundColor: colors.text }]}
                  />
                  <View
                    style={[
                      styles.bar,
                      styles.barShort,
                      { backgroundColor: colors.text },
                    ]}
                  />
                </View>

                <View
                  style={[
                    styles.langPill,
                    { backgroundColor: colors.signalSoft },
                  ]}
                >
                  <Text
                    style={[styles.langText, { color: colors.signal }]}
                  >
                    {language === 'hi' ? 'हि' : 'EN'}
                  </Text>
                </View>
              </Pressable>
            )}
          </View>

          <View style={styles.rightActions}>
            {rightComponent ?? (
              <View style={styles.brand}>
                <View
                  style={[
                    styles.brandMark,
                    { borderColor: colors.signal },
                  ]}
                >
                  <View
                    style={[
                      styles.brandCore,
                      { backgroundColor: colors.signal },
                    ]}
                  />
                </View>

                <Text
                  style={[styles.brandName, { color: colors.textDim }]}
                  numberOfLines={1}
                >
                  {tr(language, 'appName')}
                </Text>
              </View>
            )}
          </View>
        </View>

        {title ? (
          <Text
            style={[
              styles.title,
              {
                color: colors.text,
                lineHeight: lineFor('title', isHindi),
              },
            ]}
          >
            {title}
          </Text>
        ) : null}

        {subtitle ? (
          <Text
            style={[
              styles.subtitle,
              {
                color: colors.textDim,
                lineHeight: lineFor('small', isHindi),
              },
            ]}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: layout.gutter,
    paddingTop: space.sm,
    paddingBottom: space.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: layout.tap,
  },

  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
  },

  iconButton: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },

  chevron: {
    fontSize: 26,
    lineHeight: 28,
    fontWeight: weight.medium,
    marginTop: -4,
    marginLeft: -2,
  },

  menuButton: {
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    paddingHorizontal: space.md,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
  },

  bars: {
    width: 16,
    height: 11,
    justifyContent: 'space-between',
  },

  bar: {
    height: 1.5,
    width: '100%',
    borderRadius: 1,
  },

  barShort: {
    width: '65%',
  },

  langPill: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },

  langText: {
    fontSize: size.micro,
    fontWeight: weight.bold,
  },

  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    marginLeft: space.md,
  },

  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    flexShrink: 1,
  },

  /* A terminal post: ring with a live core. */
  brandMark: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  brandCore: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },

  brandName: {
    fontSize: size.small,
    fontWeight: weight.semi,
    flexShrink: 1,
  },

  title: {
    fontSize: size.title,
    fontWeight: weight.bold,
    letterSpacing: -0.3,
    marginTop: space.md,
  },

  subtitle: {
    fontSize: size.small,
    marginTop: space.xs,
    maxWidth: 520,
  },
});
