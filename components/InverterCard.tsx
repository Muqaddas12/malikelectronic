import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import SpecStrip, { Spec } from '@/components/SpecStrip';
import {
  lineFor,
  radius,
  size,
  space,
  weight,
} from '@/constants/theme';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { tr } from '@/data/translations';
import { Inverter } from '@/types/inverter';

type Props = {
  inverter: Inverter;
  onPress: () => void;
};

export default function InverterCard({ inverter, onPress }: Props) {
  const { language, isHindi } = useLanguage();
  const { colors } = useTheme();

  const brand = isHindi
    ? inverter.brandHi ?? inverter.brand
    : inverter.brand;

  const type = isHindi
    ? inverter.typeHi ?? inverter.type
    : inverter.type;

  const specs: Spec[] = [
    {
      label: tr(language, 'specCapacity'),
      value: inverter.capacity,
      grow: 1.4,
    },
    {
      label: tr(language, 'specBattery'),
      value: inverter.batteryVoltage,
    },
    {
      label: tr(language, 'specSheets'),
      value: String(inverter.faults.length),
      tone: colors.signal,
    },
  ];

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${brand} ${inverter.model}`}
      style={({ pressed }) => [
        styles.card,
        {
          borderColor: pressed ? colors.ruleStrong : colors.rule,
          backgroundColor: pressed ? colors.panelRaised : colors.panel,
        },
      ]}
    >
      <View style={styles.body}>
        <View
          style={[
            styles.well,
            {
              backgroundColor: colors.panelSunken,
              borderColor: colors.rule,
            },
          ]}
        >
          <Image
            source={inverter.image}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.text}>
          <Text
            style={[styles.brand, { color: colors.textDim }]}
            numberOfLines={1}
          >
            {brand}
          </Text>

          <Text
            style={[
              styles.model,
              {
                color: colors.text,
                lineHeight: lineFor('sub', isHindi),
              },
            ]}
            numberOfLines={2}
          >
            {inverter.model}
          </Text>

          <Text
            style={[
              styles.type,
              {
                color: colors.textFaint,
                lineHeight: lineFor('micro', isHindi),
              },
            ]}
            numberOfLines={1}
          >
            {type}
          </Text>
        </View>

        <Text style={[styles.chevron, { color: colors.textFaint }]}>
          ›
        </Text>
      </View>

      <SpecStrip specs={specs} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: space.md,
    overflow: 'hidden',
  },

  body: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: space.md,
    gap: space.md,
  },

  well: {
    width: 66,
    height: 66,
    borderRadius: radius.sm,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  image: {
    width: '86%',
    height: '86%',
  },

  text: {
    flex: 1,
  },

  brand: {
    fontSize: size.micro,
    fontWeight: weight.semi,
  },

  model: {
    fontSize: size.sub,
    fontWeight: weight.bold,
    letterSpacing: -0.2,
    marginTop: 1,
  },

  type: {
    fontSize: size.micro,
    fontWeight: weight.regular,
    marginTop: 2,
  },

  chevron: {
    fontSize: 24,
    fontWeight: weight.regular,
    marginTop: -2,
  },
});
