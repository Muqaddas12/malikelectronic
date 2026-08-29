import React from 'react';
import {
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppHeader from '@/components/AppHeader';
import { useLanguage } from '@/context/LanguageContext';
import { tr } from '@/data/translations';
import { useSafeNavigate } from '@/hooks/useSafeNavigate';

export default function ToolsListScreen() {
  const { language } = useLanguage();
  const { safePush } = useSafeNavigate();

  const toolsList = [
    {
      id: 'smd-calculator',
      icon: '📱',
      badge: language === 'hi' ? 'SMD कोड' : 'SMD Code',
      badgeColor: '#2563EB',
      title: tr(language, 'smdTitle'),
      subtitle: tr(language, 'smdSubtitle'),
      description:
        language === 'hi'
          ? '3-डिजिट, 4-डिजिट और EIA-96 SMD कोड डिकोड करें। लाइव चिप सिमुलेटर और इन्वर्टर PCB प्रीसेट्स (1001, 1502, 2201, 4R7) उपलब्ध हैं।'
          : 'Decode 3-digit, 4-digit and EIA-96 SMD resistor markings instantly. Includes live chip graphic and inverter PCB presets.',
      tags: ['3-Digit', '4-Digit 1%', 'EIA-96', 'Decimal R/K/M'],
      route: '/tools/smd-calculator' as const,
    },
    {
      id: 'dip-calculator',
      icon: '🎨',
      badge: language === 'hi' ? 'कलर बैंड्स' : 'Color Bands',
      badgeColor: '#16A34A',
      title: tr(language, 'dipTitle'),
      subtitle: tr(language, 'dipSubtitle'),
      description:
        language === 'hi'
          ? '4-बैंड और 5-बैंड थ्रू-होल रेजिस्टेंस का मान और टॉलरेंस निकालें। लाइव कलर स्ट्राइप सिमुलेटर के साथ।'
          : 'Interactive 4-band and 5-band color code calculator with live graphical resistor body simulation.',
      tags: ['4-Band', '5-Band', 'Live Graphics', '±0.05% to ±10%'],
      route: '/tools/dip-calculator' as const,
    },
    {
      id: 'ic-guide',
      icon: '💾',
      badge: language === 'hi' ? 'DIP व SMD ICs' : 'DIP & SMD ICs',
      badgeColor: '#7C3AED',
      title: tr(language, 'icGuideTitle'),
      subtitle: tr(language, 'icGuideSubtitle'),
      description:
        language === 'hi'
          ? 'LM324, SG3525, ULN2003, 7805, MOC3021, PC817, PIC16F72 आदि 200+ मुख्य ICs के कंबाइंड DIP और SMD विजुअल डायग्राम, कार्यप्रणाली, पिन विवरण और टेस्टिंग टिप्स।'
          : '200+ IC directory with combined DIP & SMD visual graphics, complete pinout details, simple working principles, and multimeter testing voltages.',
      tags: ['200+ ICs Directory', 'DIP & SMD Graphic', 'Working Principles', 'Pin Tables'],
      route: '/tools/ic-guide' as const,
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F8FA" />

      {/* Header Bar with App Name and Sidebar Drawer */}
      <AppHeader
        showBack={false}
        title={tr(language, 'tools')}
        subtitle={
          language === 'hi'
            ? 'इन्वर्टर और इलेक्ट्रॉनिक PCB रिपेयरिंग के लिए उपयोगी टूल्स, कैलकुलेटर व IC गाइड।'
            : 'Essential calculators, pinout guides, and reference tools for inverter & PCB technicians.'
        }
        showMenu={true}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Tools Cards List */}
        <View style={styles.toolsContainer}>
          {toolsList.map((tool) => (
            <Pressable
              key={tool.id}
              onPress={() => safePush(tool.route)}
              style={({ pressed }) => [
                styles.toolCard,
                pressed && styles.toolCardPressed,
              ]}
            >
              <View style={styles.toolHeaderRow}>
                <View style={styles.toolIconBox}>
                  <Text style={styles.toolIconText}>{tool.icon}</Text>
                </View>

                <View style={{ flex: 1 }}>
                  <View style={styles.badgeRow}>
                    <View
                      style={[
                        styles.badge,
                        { backgroundColor: tool.badgeColor },
                      ]}
                    >
                      <Text style={styles.badgeText}>{tool.badge}</Text>
                    </View>
                  </View>

                  <Text style={styles.toolTitle}>{tool.title}</Text>
                  <Text style={styles.toolSubtitle}>{tool.subtitle}</Text>
                </View>
              </View>

              <Text style={styles.toolDescription}>
                {tool.description}
              </Text>

              {/* Feature Tags */}
              <View style={styles.tagRow}>
                {tool.tags.map((tag) => (
                  <View key={tag} style={styles.tagPill}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>

              {/* Action Button Strip */}
              <View style={styles.actionStrip}>
                <Text style={styles.actionText}>
                  {language === 'hi' ? 'खोलें / Open →' : 'Open →'}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
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
    paddingTop: 8,
    paddingBottom: 40,
  },

  /* TOOLS LIST */

  toolsContainer: {
    gap: 10,
  },

  toolCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },

  toolCardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },

  toolHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },

  toolIconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  toolIconText: {
    fontSize: 20,
  },

  badgeRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },

  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
  },

  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  toolTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#111827',
  },

  toolSubtitle: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 1,
  },

  toolDescription: {
    fontSize: 12,
    lineHeight: 17,
    color: '#4B5563',
    marginTop: 8,
  },

  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginTop: 8,
  },

  tagPill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
  },

  tagText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
  },

  actionStrip: {
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  actionText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#2563EB',
  },
});
