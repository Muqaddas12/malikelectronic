import React, { useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Dimensions,
  Image,
} from 'react-native';
import { useLanguage, Language } from '@/context/LanguageContext';
import { tr } from '@/data/translations';

const SCREEN_WIDTH = Dimensions.get('window').width;
const DRAWER_WIDTH = Math.min(SCREEN_WIDTH * 0.78, 320);

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function Sidebar({ visible, onClose }: Props) {
  const { language, setLanguage } = useLanguage();
  const translateX = useRef(
    new Animated.Value(-DRAWER_WIDTH),
  ).current;
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
    onClose();
  };

  if (!visible) return null;

  return (
    <View style={styles.root}>
      {/* Dimmed overlay */}
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View
          style={[styles.overlay, { opacity: overlayOpacity }]}
        />
      </TouchableWithoutFeedback>

      {/* Drawer */}
      <Animated.View
        style={[
          styles.drawer,
          { transform: [{ translateX }] },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <View style={styles.logoBadge}>
              <Text style={styles.logoEmoji}>⚡</Text>
            </View>
            <View>
              <Text style={styles.drawerTitle}>
                {tr(language, 'sidebarTitle')}
              </Text>
              <Text style={styles.drawerSubtitle}>
                {tr(language, 'sidebarSubtitle')}
              </Text>
            </View>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Language Section */}
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

        {/* Divider */}
        <View style={styles.divider} />

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {tr(language, 'version')}
          </Text>
          <Text style={styles.footerSub}>
            Inverter Repair Reference App
          </Text>
        </View>
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
    backgroundColor: 'rgba(0,0,0,0.45)',
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

  /* HEADER */

  header: {
    backgroundColor: '#111827',
    paddingTop: 56,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },

  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },

  logoBadge: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoEmoji: {
    fontSize: 24,
  },

  drawerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },

  drawerSubtitle: {
    color: '#93C5FD',
    fontSize: 12,
    marginTop: 2,
  },

  /* DIVIDER */

  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginHorizontal: 0,
  },

  /* SECTION */

  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  sectionLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 12,
  },

  /* LANGUAGE OPTIONS */

  langOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
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
    fontSize: 15,
    fontWeight: '600',
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
    position: 'absolute',
    bottom: 32,
    left: 20,
    right: 20,
  },

  footerText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
  },

  footerSub: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 3,
  },
});
