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
import { tr } from '@/data/translations';
import { InverterFaultDetail } from '@/types/faultDetail';

type Props = {
  fault: InverterFaultDetail;
  onPress: () => void;
};

const severityKeys: Record<string, string> = {
  low: 'lowRisk',
  medium: 'mediumRisk',
  high: 'highRisk',
  critical: 'criticalRisk',
};

export default function FaultCard({ fault, onPress }: Props) {
  const { language, isHindi } = useLanguage();
  const { colors } = useTheme();

  const severityColor =
    colors.severity[fault.severity] ?? colors.severity.medium;
  const severityLabel = tr(
    language,
    severityKeys[fault.severity] ?? 'mediumRisk',
  );

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${fault.title}. ${severityLabel}`}
      style={({ pressed }) => [
        styles.card,
        {
          borderColor: pressed ? colors.ruleStrong : colors.rule,
          backgroundColor: pressed ? colors.panelRaised : colors.panel,
        },
      ]}
    >
      {/* Severity is safety information, so it gets structure, not a pill. */}
      <View style={[styles.edge, { backgroundColor: severityColor }]} />

      <View style={styles.inner}>
        <View
          style={[
            styles.iconWell,
            {
              backgroundColor: colors.panelSunken,
              borderColor: colors.rule,
            },
          ]}
        >
          <Text style={styles.icon}>{fault.icon}</Text>
        </View>

        <View style={styles.content}>
          <Text
            style={[
              styles.title,
              {
                color: colors.text,
                lineHeight: lineFor('body', isHindi),
              },
            ]}
            numberOfLines={2}
          >
            {fault.title}
          </Text>

          <Text
            style={[
              styles.subtitle,
              {
                color: colors.textDim,
                lineHeight: lineFor('small', isHindi),
              },
            ]}
            numberOfLines={2}
          >
            {fault.subtitle}
          </Text>

          <View style={styles.metaRow}>
            <Text style={[styles.severity, { color: severityColor }]}>
              {severityLabel}
            </Text>

            {fault.diagramImage ? (
              <View
                style={[styles.tag, { borderColor: colors.rule }]}
              >
                <Text
                  style={[styles.tagText, { color: colors.readout }]}
                >
                  {isHindi ? 'सर्किट डायग्राम' : 'Schematic'}
                </Text>
              </View>
            ) : null}
          </View>
        </View>

        <Text style={[styles.chevron, { color: colors.textFaint }]}>
          ›
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: space.sm,
    overflow: 'hidden',
  },

  edge: {
    width: 3,
  },

  inner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: space.md,
    gap: space.md,
  },

  iconWell: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    fontSize: 19,
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: size.body,
    fontWeight: weight.semi,
  },

  subtitle: {
    fontSize: size.small,
    marginTop: 2,
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    marginTop: space.sm,
  },

  severity: {
    fontSize: size.micro,
    fontWeight: weight.bold,
  },

  tag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.sm,
    borderWidth: StyleSheet.hairlineWidth,
  },

  tagText: {
    fontSize: size.micro,
    fontWeight: weight.semi,
  },

  chevron: {
    fontSize: 24,
    fontWeight: weight.regular,
  },
});
