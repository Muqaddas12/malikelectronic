import React from 'react';

import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Inverter } from '@/types/inverter';
import { useLanguage } from '@/context/LanguageContext';
import { tr } from '@/data/translations';

type Props = {
  inverter: Inverter;
  onPress: () => void;
};

export default function InverterCard({
  inverter,
  onPress,
}: Props) {
  const { language } = useLanguage();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={inverter.image}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.brand}>
          {inverter.brand}
        </Text>

        <Text style={styles.model}>
          {inverter.model}
        </Text>

        <View style={styles.infoRow}>
          <View style={styles.info}>
            <Text style={styles.label}>
              {tr(language, 'capacity')}
            </Text>

            <Text style={styles.value}>
              {inverter.capacity}
            </Text>
          </View>

          <View style={styles.info}>
            <Text style={styles.label}>
              {tr(language, 'battery')}
            </Text>

            <Text style={styles.value}>
              {inverter.batteryVoltage}
            </Text>
          </View>
        </View>

        <Text style={styles.faultCount}>
          {inverter.faults.length} {tr(language, 'troubleshootingTopics')}
        </Text>
      </View>

      <Text style={styles.arrow}>
        ›
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 16,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 3,
  },

  pressed: {
    opacity: 0.75,
    transform: [
      {
        scale: 0.98,
      },
    ],
  },

  imageContainer: {
    width: 115,
    height: 105,
    borderRadius: 16,
    backgroundColor: '#F4F6F8',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  image: {
    width: '95%',
    height: '95%',
  },

  content: {
    flex: 1,
    paddingLeft: 15,
  },

  brand: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 3,
  },

  model: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 10,
  },

  infoRow: {
    flexDirection: 'row',
    gap: 20,
  },

  info: {
    minWidth: 70,
  },

  label: {
    fontSize: 11,
    color: '#9CA3AF',
  },

  value: {
    fontSize: 13,
    fontWeight: '700',
    color: '#374151',
    marginTop: 2,
  },

  faultCount: {
    marginTop: 9,
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '600',
  },

  arrow: {
    fontSize: 32,
    color: '#9CA3AF',
    paddingHorizontal: 4,
  },
});