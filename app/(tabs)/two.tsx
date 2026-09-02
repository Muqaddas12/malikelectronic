import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppHeader from '@/components/AppHeader';
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

export default function ToolsListScreen() {
  const { language, isHindi } = useLanguage();
  const { colors } = useTheme();
  const { safePush } = useSafeNavigate();

  /**
   * Each tool carries an accent drawn from the palette's functional roles:
   * readout for the two value-decoders, signal for the pinout directory.
   */
  const toolsList = [
    {
      id: 'smd-calculator',
      icon: '⬚',
      accent: colors.readout,
      badge: isHindi ? 'SMD कोड' : 'SMD Code',
      title: tr(language, 'smdTitle'),
      subtitle: tr(language, 'smdSubtitle'),
      description: isHindi
        ? '3-डिजिट, 4-डिजिट और EIA-96 SMD कोड डिकोड करें। लाइव चिप सिमुलेटर और इन्वर्टर PCB प्रीसेट्स (1001, 1502, 2201, 4R7) उपलब्ध हैं।'
        : 'Decode 3-digit, 4-digit and EIA-96 SMD resistor markings instantly. Includes a live chip graphic and inverter PCB presets.',
      tags: ['3-Digit', '4-Digit 1%', 'EIA-96', 'Decimal R/K/M'],
      route: '/tools/smd-calculator' as const,
    },
    {
      id: 'dip-calculator',
      icon: '≡',
      accent: colors.verified,
      badge: isHindi ? 'कलर बैंड्स' : 'Color Bands',
      title: tr(language, 'dipTitle'),
      subtitle: tr(language, 'dipSubtitle'),
      description: isHindi
        ? '4-बैंड और 5-बैंड थ्रू-होल रेजिस्टेंस का मान और टॉलरेंस निकालें। लाइव कलर स्ट्राइप सिमुलेटर के साथ।'
        : 'Interactive 4-band and 5-band color code calculator with a live graphical resistor body.',
      tags: ['4-Band', '5-Band', 'Live Graphics', '±0.05% to ±10%'],
      route: '/tools/dip-calculator' as const,
    },
    {
      id: 'ic-guide',
      icon: '⊞',
      accent: colors.signal,
      badge: isHindi ? 'DIP व SMD ICs' : 'DIP & SMD ICs',
      title: tr(language, 'icGuideTitle'),
      subtitle: tr(language, 'icGuideSubtitle'),
      description: isHindi
        ? 'LM324, SG3525, ULN2003, 7805, MOC3021, PC817, PIC16F72 आदि 200+ मुख्य ICs के कंबाइंड DIP और SMD विजुअल डायग्राम, कार्यप्रणाली, पिन विवरण और टेस्टिंग टिप्स।'
        : '200+ IC directory with combined DIP & SMD graphics, complete pinout details, working principles, and multimeter testing voltages.',
      tags: [
        '200+ ICs',
        'DIP & SMD Graphic',
        'Working Principles',
        'Pin Tables',
      ],
      route: '/tools/ic-guide' as const,
    },
  ];

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={[styles.safeArea, { backgroundColor: colors.surface }]}
    >
      <AppHeader
        showBack={false}
        showMenu
        title={tr(language, 'tools')}
        subtitle={
          isHindi
            ? 'इन्वर्टर और इलेक्ट्रॉनिक PCB रिपेयरिंग के लिए उपयोगी टूल्स, कैलकुलेटर व IC गाइड।'
            : 'Calculators, pinout guides, and reference tables for inverter & PCB work.'
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {toolsList.map((tool) => (
          <Pressable
            key={tool.id}
            onPress={() => safePush(tool.route)}
            accessibilityRole="button"
            accessibilityLabel={`${tool.title}. ${tool.subtitle}`}
            style={({ pressed }) => [
              styles.card,
              {
                borderColor: pressed ? colors.ruleStrong : colors.rule,
                backgroundColor: pressed
                  ? colors.panelRaised
                  : colors.panel,
              },
            ]}
          >
            {/* Same structural edge the fault list uses, so the two read as siblings. */}
            <View style={[styles.edge, { backgroundColor: tool.accent }]} />

            <View style={styles.inner}>
              <View style={styles.headRow}>
                <View
                  style={[
                    styles.iconWell,
                    {
                      backgroundColor: colors.panelSunken,
                      borderColor: colors.rule,
                    },
                  ]}
                >
                  <Text style={[styles.icon, { color: tool.accent }]}>
                    {tool.icon}
                  </Text>
                </View>

                <View style={styles.headText}>
                  <Text
                    style={[styles.badge, { color: tool.accent }]}
                    numberOfLines={1}
                  >
                    {tool.badge}
                  </Text>

                  <Text
                    style={[
                      styles.title,
                      {
                        color: colors.text,
                        lineHeight: lineFor('sub', isHindi),
                      },
                    ]}
                  >
                    {tool.title}
                  </Text>

                  <Text
                    style={[
                      styles.subtitle,
                      {
                        color: colors.textDim,
                        lineHeight: lineFor('small', isHindi),
                      },
                    ]}
                  >
                    {tool.subtitle}
                  </Text>
                </View>
              </View>

              <Text
                style={[
                  styles.description,
                  {
                    color: colors.textDim,
                    lineHeight: lineFor('small', isHindi),
                  },
                ]}
              >
                {tool.description}
              </Text>

              <View style={styles.tagRow}>
                {tool.tags.map((tag) => (
                  <View
                    key={tag}
                    style={[
                      styles.tag,
                      {
                        borderColor: colors.rule,
                        backgroundColor: colors.panelSunken,
                      },
                    ]}
                  >
                    <Text style={[styles.tagText, { color: colors.textDim }]}>
                      {tag}
                    </Text>
                  </View>
                ))}
              </View>

              <View
                style={[styles.footRow, { borderTopColor: colors.rule }]}
              >
                <Text style={[styles.action, { color: colors.signal }]}>
                  {tr(language, 'openTool')}
                </Text>

                <Text style={[styles.chevron, { color: colors.signal }]}>
                  ›
                </Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
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
    gap: space.md,
  },

  card: {
    flexDirection: 'row',
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },

  edge: {
    width: 3,
  },

  inner: {
    flex: 1,
    padding: space.md,
  },

  headRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: space.md,
  },

  iconWell: {
    width: 42,
    height: 42,
    borderRadius: radius.sm,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    fontSize: 20,
  },

  headText: {
    flex: 1,
  },

  badge: {
    fontSize: size.micro,
    fontWeight: weight.bold,
  },

  title: {
    fontSize: size.sub,
    fontWeight: weight.bold,
    letterSpacing: -0.2,
    marginTop: 1,
  },

  subtitle: {
    fontSize: size.small,
    marginTop: 1,
  },

  description: {
    fontSize: size.small,
    marginTop: space.md,
  },

  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: space.xs + 2,
    marginTop: space.md,
  },

  tag: {
    paddingHorizontal: space.sm,
    paddingVertical: 3,
    borderRadius: radius.sm,
    borderWidth: StyleSheet.hairlineWidth,
  },

  tagText: {
    fontSize: size.micro,
    fontWeight: weight.medium,
  },

  footRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: space.xs,
    marginTop: space.md,
    paddingTop: space.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
  },

  action: {
    fontSize: size.small,
    fontWeight: weight.bold,
  },

  chevron: {
    fontSize: 19,
    marginTop: -2,
  },
});
