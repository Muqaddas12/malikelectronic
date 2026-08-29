import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { InverterFaultDetail } from '@/types/faultDetail';
import { useLanguage } from '@/context/LanguageContext';
import { tr } from '@/data/translations';

type Props = {
  fault: InverterFaultDetail;
  onPress: () => void;
};

const severityColors = {
  low: '#16A34A',
  medium: '#CA8A04',
  high: '#EA580C',
  critical: '#DC2626',
};

const severityKeys: Record<string, string> = {
  low: 'lowRisk',
  medium: 'mediumRisk',
  high: 'highRisk',
  critical: 'criticalRisk',
};

export default function FaultCard({
  fault,
  onPress,
}: Props) {
  const { language } = useLanguage();
  const severityColor = severityColors[fault.severity];
  const severityKey = severityKeys[fault.severity] || 'mediumRisk';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>
          {fault.icon}
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>
            {fault.title}
          </Text>

          <View
            style={[
              styles.badge,
              {
                backgroundColor: severityColor,
              },
            ]}
          >
            <Text style={styles.badgeText}>
              {tr(language, severityKey)}
            </Text>
          </View>
        </View>

        <Text style={styles.subtitle} numberOfLines={1}>
          {fault.subtitle}
        </Text>

        <Text style={styles.tap}>
          {tr(language, 'tapToTroubleshoot')}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },

  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.99 }],
  },

  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    fontSize: 20,
  },

  content: {
    flex: 1,
    marginLeft: 10,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: '800',
    color: '#111827',
  },

  subtitle: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
    lineHeight: 16,
  },

  tap: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
    marginTop: 4,
  },

  badge: {
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 6,
  },

  badgeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '900',
  },
});