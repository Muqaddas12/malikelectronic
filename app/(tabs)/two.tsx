import React, { useState } from 'react';

import {
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import Sidebar from '@/components/Sidebar';
import { useLanguage } from '@/context/LanguageContext';
import { tr } from '@/data/translations';
import { useSafeNavigate } from '@/hooks/useSafeNavigate';

export default function ToolsListScreen() {
  const { language } = useLanguage();
  const { safePush } = useSafeNavigate();
  const [sidebarVisible, setSidebarVisible] = useState(false);

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
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F8FA" />

      {/* Slide-in Sidebar Drawer */}
      <Sidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
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

        {/* Page Heading */}
        <Text style={styles.pageTitle}>
          {tr(language, 'tools')}
        </Text>
        <Text style={styles.pageSubtitle}>
          {language === 'hi'
            ? 'इन्वर्टर और इलेक्ट्रॉनिक PCB रिपेयरिंग के लिए उपयोगी टूल्स व कैलकुलेटर।'
            : 'Essential calculators and reference tools for inverter & PCB technicians.'}
        </Text>

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
                  {language === 'hi' ? 'कैलकुलेटर खोलें →' : 'Open Calculator →'}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Quick Inverter Resistor Reference Card */}
        <View style={styles.referenceCard}>
          <Text style={styles.referenceTitle}>
            ⚡ {language === 'hi' ? 'मुख्य इन्वर्टर SMD कोड्स' : 'Common Inverter SMD Resistor Codes'}
          </Text>
          <Text style={styles.referenceDesc}>
            {language === 'hi'
              ? 'ल्युमिनस, माइक्रोटेक और लिवगार्ड इन्वर्टर PCB में इस्तेमाल होने वाले महत्वपूर्ण कोड:'
              : 'Important resistor values used in Luminous, Microtek & Livguard PCBs:'}
          </Text>

          <View style={styles.refGrid}>
            <View style={styles.refItem}>
              <Text style={styles.refCode}>1001</Text>
              <Text style={styles.refVal}>1 kΩ (1,000 Ω)</Text>
            </View>
            <View style={styles.refItem}>
              <Text style={styles.refCode}>1002</Text>
              <Text style={styles.refVal}>10 kΩ (10,000 Ω)</Text>
            </View>
            <View style={styles.refItem}>
              <Text style={styles.refCode}>1502</Text>
              <Text style={styles.refVal}>15 kΩ (15,000 Ω)</Text>
            </View>
            <View style={styles.refItem}>
              <Text style={styles.refCode}>2201</Text>
              <Text style={styles.refVal}>2.2 kΩ (2,200 Ω)</Text>
            </View>
            <View style={styles.refItem}>
              <Text style={styles.refCode}>5101</Text>
              <Text style={styles.refVal}>5.1 kΩ (5,100 Ω)</Text>
            </View>
            <View style={styles.refItem}>
              <Text style={styles.refCode}>4R7</Text>
              <Text style={styles.refVal}>4.7 Ω (Gate Resistor)</Text>
            </View>
          </View>
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

  pageTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#111827',
    marginTop: 6,
  },

  pageSubtitle: {
    fontSize: 13,
    lineHeight: 20,
    color: '#6B7280',
    marginTop: 4,
    marginBottom: 18,
  },

  /* TOOLS LIST */

  toolsContainer: {
    gap: 14,
  },

  toolCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },

  toolCardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },

  toolHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },

  toolIconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  toolIconText: {
    fontSize: 26,
  },

  badgeRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },

  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },

  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  toolTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#111827',
  },

  toolSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },

  toolDescription: {
    fontSize: 13,
    lineHeight: 19,
    color: '#4B5563',
    marginTop: 12,
  },

  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 12,
  },

  tagPill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
  },

  tagText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },

  actionStrip: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  actionText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#2563EB',
  },

  /* REFERENCE CARD */

  referenceCard: {
    backgroundColor: '#0F172A',
    borderRadius: 20,
    padding: 18,
    marginTop: 20,
  },

  referenceTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#F8FAFC',
  },

  referenceDesc: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 4,
    marginBottom: 12,
  },

  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  refItem: {
    width: '48%',
    backgroundColor: '#1E293B',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },

  refCode: {
    color: '#38BDF8',
    fontSize: 14,
    fontWeight: '900',
    fontFamily: 'monospace',
  },

  refVal: {
    color: '#E2E8F0',
    fontSize: 11,
    marginTop: 2,
  },
});
