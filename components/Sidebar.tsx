import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { router } from 'expo-router';

import { useLanguage, Language } from '@/context/LanguageContext';
import { tr } from '@/data/translations';
import { useSafeNavigate } from '@/hooks/useSafeNavigate';

const SCREEN_WIDTH = Dimensions.get('window').width;
const DRAWER_WIDTH = Math.min(SCREEN_WIDTH * 0.82, 330);

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function Sidebar({ visible, onClose }: Props) {
  const { language, setLanguage } = useLanguage();
  const { safePush } = useSafeNavigate();
  const [supportModalVisible, setSupportModalVisible] = useState(false);

  const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(translateX, {
          toValue: 0,
          damping: 22,
          mass: 0.8,
          stiffness: 180,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: -DRAWER_WIDTH,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  const navigateToHome = () => {
    onClose();
    safePush('/(tabs)');
  };

  const navigateToTools = () => {
    onClose();
    safePush('/(tabs)/two');
  };

  if (!visible) return null;

  return (
    <View style={styles.root}>
      {/* Support & Contact Dialog Modal */}
      <Modal
        visible={supportModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSupportModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.supportModalBox}>
            <View style={styles.supportModalHeader}>
              <Text style={styles.supportModalTitle}>
                📞 {tr(language, 'supportModalTitle')}
              </Text>
              <Pressable
                onPress={() => setSupportModalVisible(false)}
                style={styles.modalCloseBtn}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text style={styles.modalCloseBtnText}>✕</Text>
              </Pressable>
            </View>

            <Text style={styles.supportModalDesc}>
              {tr(language, 'supportModalDesc')}
            </Text>

            <View style={styles.supportItem}>
              <Text style={styles.supportItemLabel}>
                📱 {tr(language, 'phone')}:
              </Text>
              <Text style={styles.supportItemValue}>
                {tr(language, 'phoneNum')}
              </Text>
            </View>

            <View style={styles.supportItem}>
              <Text style={styles.supportItemLabel}>
                💬 {tr(language, 'whatsapp')}:
              </Text>
              <Text style={styles.supportItemValue}>
                {tr(language, 'phoneNum')}
              </Text>
            </View>

            <View style={styles.supportItem}>
              <Text style={styles.supportItemLabel}>
                📍 {tr(language, 'address')}:
              </Text>
              <Text style={styles.supportItemValue}>
                {tr(language, 'addressText')}
              </Text>
            </View>

            <Pressable
              onPress={() => setSupportModalVisible(false)}
              style={styles.supportDoneBtn}
            >
              <Text style={styles.supportDoneBtnText}>
                {tr(language, 'close')}
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Dimmed Background Overlay */}
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View
          style={[styles.overlay, { opacity: overlayOpacity }]}
        />
      </TouchableWithoutFeedback>

      {/* Drawer Container */}
      <Animated.View
        style={[
          styles.drawer,
          { transform: [{ translateX }] },
        ]}
      >
        {/* 1. Header */}
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <View style={styles.logoBadge}>
              <Text style={styles.logoEmoji}>⚡</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.drawerTitle}>
                {tr(language, 'sidebarTitle')}
              </Text>
              <Text style={styles.drawerSubtitle}>
                {tr(language, 'sidebarSubtitle')}
              </Text>
            </View>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.drawerScroll}
        >
          {/* 2. Main Navigation Menu (Top section) */}
          <View style={styles.section}>
            {/* Homepage item */}
            <Pressable
              onPress={navigateToHome}
              style={({ pressed }) => [
                styles.navItem,
                pressed && styles.navItemPressed,
              ]}
            >
              <View style={styles.navIconBox}>
                <Text style={styles.navIcon}>🏠</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.navText}>
                  {tr(language, 'homepage')}
                </Text>
                <Text style={styles.navSub}>
                  Inverter Models & Faults
                </Text>
              </View>
              <Text style={styles.navArrow}>›</Text>
            </Pressable>

            {/* Electronics Tools item */}
            <Pressable
              onPress={navigateToTools}
              style={({ pressed }) => [
                styles.navItem,
                pressed && styles.navItemPressed,
              ]}
            >
              <View style={[styles.navIconBox, { backgroundColor: '#EFF6FF' }]}>
                <Text style={styles.navIcon}>🧮</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.navText}>
                  {tr(language, 'tools')}
                </Text>
                <Text style={styles.navSub}>
                  {tr(language, 'toolsSubtitle')}
                </Text>
              </View>
              <Text style={styles.navArrow}>›</Text>
            </Pressable>

            {/* Support & Help item */}
            <Pressable
              onPress={() => setSupportModalVisible(true)}
              style={({ pressed }) => [
                styles.navItem,
                pressed && styles.navItemPressed,
              ]}
            >
              <View style={[styles.navIconBox, { backgroundColor: '#F0FDF4' }]}>
                <Text style={styles.navIcon}>📞</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.navText}>
                  {tr(language, 'support')}
                </Text>
                <Text style={styles.navSub}>
                  Customer & Technical Help
                </Text>
              </View>
              <Text style={styles.navArrow}>›</Text>
            </Pressable>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* 3. Language Selector (at bottom as requested) */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>
              🌐 {tr(language, 'language')}
            </Text>

            {/* English Option */}
            <Pressable
              style={[
                styles.langOption,
                language === 'en' && styles.langOptionActive,
              ]}
              onPress={() => handleLanguage('en')}
            >
              <Text
                style={[
                  styles.langText,
                  language === 'en' && styles.langTextActive,
                ]}
              >
                🇬🇧  English
              </Text>
              {language === 'en' && (
                <View style={styles.checkDot} />
              )}
            </Pressable>

            {/* Hindi Option */}
            <Pressable
              style={[
                styles.langOption,
                language === 'hi' && styles.langOptionActive,
              ]}
              onPress={() => handleLanguage('hi')}
            >
              <Text
                style={[
                  styles.langText,
                  language === 'hi' && styles.langTextActive,
                ]}
              >
                🇮🇳  हिंदी (Hindi)
              </Text>
              {language === 'hi' && (
                <View style={styles.checkDot} />
              )}
            </Pressable>
          </View>

          {/* Footer Info */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              {tr(language, 'version')}
            </Text>
            <Text style={styles.footerSub}>
              MaliK Electronic Repair Companion
            </Text>
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
    elevation: 20,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 5, height: 0 },
    elevation: 20,
  },

  drawerScroll: {
    paddingBottom: 40,
  },

  /* HEADER */

  header: {
    backgroundColor: '#111827',
    paddingTop: 54,
    paddingBottom: 22,
    paddingHorizontal: 20,
  },

  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },

  logoBadge: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoEmoji: {
    fontSize: 22,
  },

  drawerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },

  drawerSubtitle: {
    color: '#93C5FD',
    fontSize: 11,
    marginTop: 2,
  },

  /* DIVIDER */

  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 4,
  },

  /* SECTION */

  section: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  sectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 10,
  },

  /* NAVIGATION ITEMS */

  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },

  navItemPressed: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
  },

  navIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#FFFBEB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  navIcon: {
    fontSize: 18,
  },

  navText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111827',
  },

  navSub: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },

  navArrow: {
    fontSize: 20,
    color: '#9CA3AF',
    fontWeight: '600',
  },

  /* LANGUAGE OPTIONS */

  langOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 13,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#F9FAFB',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },

  langOptionActive: {
    backgroundColor: '#EFF6FF',
    borderColor: '#2563EB',
  },

  langText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#374151',
  },

  langTextActive: {
    color: '#1D4ED8',
    fontWeight: '800',
  },

  checkDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2563EB',
  },

  /* FOOTER */

  footer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  footerText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#374151',
  },

  footerSub: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },

  /* SUPPORT MODAL */

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  supportModalBox: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
  },

  supportModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  supportModalTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#111827',
  },

  modalCloseBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalCloseBtnText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '800',
  },

  supportModalDesc: {
    fontSize: 12,
    lineHeight: 18,
    color: '#4B5563',
    marginBottom: 16,
  },

  supportItem: {
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  supportItemLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#2563EB',
    marginBottom: 2,
  },

  supportItemValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },

  supportDoneBtn: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 12,
  },

  supportDoneBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
});
