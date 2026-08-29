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

        <Text style={styles.model} numberOfLines={1}>
          {inverter.model}
        </Text>

        <View style={styles.infoRow}>
          <Text style={styles.specsText}>
            {inverter.capacity} • {inverter.batteryVoltage}
          </Text>
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
    borderRadius: 16,
    marginBottom: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  pressed: {
    opacity: 0.75,
    transform: [
      {
        scale: 0.99,
      },
    ],
  },

  imageContainer: {
    width: 78,
    height: 72,
    borderRadius: 12,
    backgroundColor: '#F4F6F8',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  image: {
    width: '92%',
    height: '92%',
  },

  content: {
    flex: 1,
    paddingLeft: 12,
  },

  brand: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },

  model: {
    fontSize: 15,
    fontWeight: '900',
    color: '#111827',
    marginTop: 1,
    marginBottom: 3,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  specsText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5563',
  },

  faultCount: {
    marginTop: 4,
    fontSize: 11,
    color: '#15803D',
    fontWeight: '700',
  },

  arrow: {
    fontSize: 22,
    color: '#9CA3AF',
    fontWeight: '600',
    paddingHorizontal: 4,
  },
});