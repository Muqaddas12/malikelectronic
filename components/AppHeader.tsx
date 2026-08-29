import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import Sidebar from '@/components/Sidebar';
import { useLanguage } from '@/context/LanguageContext';
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
  const { language } = useLanguage();
  const { safeBack } = useSafeNavigate();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      safeBack();
    }
  };

  return (
    <>
      <Sidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
      />

      <View style={styles.headerContainer}>
        {/* Top Action Row (Back Button / Brand on Left, Hamburger Menu on Right) */}
        <View style={styles.topRow}>
          {showBack ? (
            <Pressable
              onPress={handleBack}
              style={styles.backButton}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <Text style={styles.backText}>
                {backLabel || tr(language, 'back')}
              </Text>
            </Pressable>
          ) : (
            <View style={styles.brandRow}>
              <View style={styles.brandIconCircle}>
                <Text style={styles.brandIcon}>⚡</Text>
              </View>
              <Text style={styles.appName}>{tr(language, 'appName')}</Text>
            </View>
          )}

          <View style={styles.rightActions}>
            {rightComponent}

            {showMenu && (
              <Pressable
                onPress={() => setSidebarVisible(true)}
                style={({ pressed }) => [
                  styles.menuButton,
                  pressed && styles.menuButtonPressed,
                ]}
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                accessibilityLabel="Open navigation menu"
              >
                <View style={styles.hamburgerIcon}>
                  <View style={styles.hamburgerBar} />
                  <View style={styles.hamburgerBar} />
                  <View style={styles.hamburgerBar} />
                </View>
                <Text style={styles.langIndicator}>{language.toUpperCase()}</Text>
              </Pressable>
            )}
          </View>
        </View>

        {/* Title and Subtitle Row */}
        {title ? <Text style={styles.pageTitle}>{title}</Text> : null}
        {subtitle ? <Text style={styles.pageSubtitle}>{subtitle}</Text> : null}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 10,
    backgroundColor: '#F7F8FA',
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
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

  backButton: {
    paddingVertical: 6,
    paddingRight: 15,
  },

  backText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2563EB',
  },

  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
    fontSize: 22,
    fontWeight: '900',
    color: '#111827',
    marginTop: 2,
  },

  pageSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
});

