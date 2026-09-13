import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import {
    lineFor,
    radius,
    size,
    space,
    weight,
} from '@/constants/theme';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { DIAGRAM_UPDATES } from '@/data/diagramUpdates';

type Props = {
  onPressViewAll: () => void;
  onDismiss?: () => void;
};

export default function UpdateBanner({ onPressViewAll, onDismiss }: Props) {
  const { colors } = useTheme();
  const { isHindi } = useLanguage();

  const newItemsCount = DIAGRAM_UPDATES.filter((u) => u.type === 'NEW').length;

  return (
    <View
      style={[
        styles.banner,
        {
          backgroundColor: colors.panel,
          borderColor: colors.severity.low,
        },
      ]}
    >
      {/* Accent edge indicator */}
      <View
        style={[
          styles.accentEdge,
          { backgroundColor: colors.severity.low },
        ]}
      />

      <View style={styles.bannerContent}>
        {/* Top bar: Update badge & Dismiss */}
        <View style={styles.topRow}>
          <View
            style={[
              styles.badge,
              {
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                borderColor: colors.severity.low,
              },
            ]}
          >
            <Text style={[styles.badgeText, { color: colors.severity.low }]}>
              ⚡ {isHindi ? 'नया अपडेट उपलब्ध' : 'UPDATE AVAILABLE'}
            </Text>
          </View>

          {onDismiss ? (
            <Pressable
              onPress={onDismiss}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              accessibilityRole="button"
              accessibilityLabel={isHindi ? 'हटाएं' : 'Dismiss'}
              style={styles.dismissBtn}
            >
              <Text style={[styles.dismissText, { color: colors.textFaint }]}>
                ✕
              </Text>
            </Pressable>
          ) : null}
        </View>

        {/* Title */}
        <Text
          style={[
            styles.title,
            { color: colors.text, lineHeight: lineFor('body', isHindi) },
          ]}
        >
          {isHindi
            ? 'नए सर्किट डायग्राम जोड़े गए हैं!'
            : 'New Circuit Diagrams Added!'}
        </Text>

        {/* Description summary */}
        <Text
          style={[
            styles.description,
            { color: colors.textDim, lineHeight: lineFor('small', isHindi) },
          ]}
          numberOfLines={2}
        >
          {isHindi
            ? `Su-Kam Shark (मॉस्फेट ब्लास्ट पिन 27,28), Luminous Eco Watt (28-पिन माइक्रोकंट्रोलर) व 4 अपडेटेड डायग्राम उपलब्ध हैं।`
            : `Su-Kam Shark (Mosfet Blast Pins 27,28), Luminous Eco Watt (28-Pin MC) & 4 updated schematics available.`}
        </Text>

        {/* Action Button */}
        <Pressable
          onPress={onPressViewAll}
          accessibilityRole="button"
          accessibilityLabel={
            isHindi ? 'नए डायग्राम देखें' : 'View New Diagrams'
          }
          style={({ pressed }) => [
            styles.actionButton,
            {
              backgroundColor: pressed
                ? colors.panelRaised
                : colors.panelSunken,
              borderColor: colors.ruleStrong,
            },
          ]}
        >
          <Text style={[styles.actionButtonText, { color: colors.readout }]}>
            ✨ {isHindi ? 'नए जोड़े गए डायग्राम देखें' : 'View Newly Added Diagrams'}{' '}
            ({newItemsCount} {isHindi ? 'नए' : 'new'}) ›
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    borderRadius: radius.lg,
    borderWidth: 1.5,
    marginBottom: space.md,
    overflow: 'hidden',
  },
  accentEdge: {
    width: 4,
  },
  bannerContent: {
    flex: 1,
    padding: space.md,
    gap: space.xs,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badge: {
    paddingHorizontal: space.xs + 2,
    paddingVertical: 2,
    borderRadius: radius.sm,
    borderWidth: StyleSheet.hairlineWidth,
  },
  badgeText: {
    fontSize: size.micro,
    fontWeight: weight.bold,
    letterSpacing: 0.5,
  },
  dismissBtn: {
    padding: 2,
  },
  dismissText: {
    fontSize: size.micro,
    fontWeight: weight.bold,
  },
  title: {
    fontSize: size.body,
    fontWeight: weight.bold,
  },
  description: {
    fontSize: size.small,
  },
  actionButton: {
    marginTop: space.xs,
    paddingVertical: space.xs + 2,
    paddingHorizontal: space.sm,
    borderRadius: radius.sm,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    fontSize: size.small,
    fontWeight: weight.bold,
  },
});

