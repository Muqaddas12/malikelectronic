import React from 'react';

import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { InverterFaultDetail } from '@/types/faultDetail';

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

export default function FaultCard({
  fault,
  onPress,
}: Props) {
  const severityColor =
    severityColors[fault.severity];

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
          <Text style={styles.title}>
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
              {fault.severity.toUpperCase()}
            </Text>
          </View>
        </View>

        <Text style={styles.subtitle}>
          {fault.subtitle}
        </Text>

        <Text style={styles.tap}>
          Tap to troubleshoot →
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',

    backgroundColor: '#FFFFFF',

    borderRadius: 18,

    padding: 15,

    marginBottom: 12,

    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  pressed: {
    opacity: 0.7,
  },

  iconContainer: {
    width: 52,
    height: 52,

    borderRadius: 16,

    backgroundColor: '#F3F4F6',

    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    fontSize: 25,
  },

  content: {
    flex: 1,
    marginLeft: 13,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    flex: 1,

    fontSize: 16,
    fontWeight: '800',

    color: '#111827',
  },

  subtitle: {
    fontSize: 13,
    color: '#6B7280',

    marginTop: 4,

    lineHeight: 19,
  },

  tap: {
    fontSize: 12,
    fontWeight: '700',

    color: '#2563EB',

    marginTop: 8,
  },

  badge: {
    borderRadius: 7,
    paddingHorizontal: 7,
    paddingVertical: 4,

    marginLeft: 6,
  },

  badgeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '900',
  },
});