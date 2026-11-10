import React, { useRef } from 'react';
import {
  Animated,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import {
  lineFor,
  mono,
  radius,
  space,
  weight,
} from '@/constants/theme';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { Inverter } from '@/types/inverter';

type Props = {
  inverter: Inverter;
  onPress: () => void;
};

export default function InverterCard({ inverter, onPress }: Props) {
  const { isHindi } = useLanguage();
  const { colors } = useTheme();

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.975,
      tension: 140,
      friction: 10,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 140,
      friction: 10,
      useNativeDriver: true,
    }).start();
  };

  const brand = isHindi
    ? inverter.brandHi ?? inverter.brand
    : inverter.brand;

  const capacity =
    inverter.capacity === '—'
      ? isHindi
        ? 'पुष्टि बाकी'
        : 'Unconfirmed'
      : inverter.capacity;

  const battery =
    inverter.batteryVoltage === '—'
      ? isHindi
        ? 'पुष्टि बाकी'
        : 'Unconfirmed'
      : inverter.batteryVoltage;

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        accessibilityRole="button"
        accessibilityLabel={`${brand} ${inverter.model}${inverter.newDiagramsCount ? `, ${inverter.newDiagramsCount} ${isHindi ? 'नए डायग्राम' : 'new diagrams'}` : ''}`}
        style={({ pressed }) => [
          styles.card,
          {
            borderColor: pressed ? colors.signal : colors.rule,
            backgroundColor: pressed ? colors.panelRaised : colors.panel,
          },
        ]}
      >
        {/* COMPACT IMAGE WELL */}
        <View
          style={[
            styles.imageContainer,
            {
              backgroundColor: colors.panelSunken,
              borderColor: colors.rule,
            },
          ]}
        >
          {inverter.image ? (
            <Image
              source={inverter.image}
              style={styles.image}
              resizeMode="contain"
            />
          ) : (
            <FontAwesome name="bolt" size={24} color={colors.signal} />
          )}
        </View>

        {/* MIDDLE COLUMN: BRAND + NEW BADGE, MODEL, SPECS */}
        <View style={styles.contentCol}>
          {/* BRAND + NEW DIAGRAM BADGE */}
          <View style={styles.topRow}>
            <Text
              style={[styles.brandText, { color: colors.signal }]}
              numberOfLines={1}
            >
              {brand}
            </Text>

            {/* ONLY DISPLAYED WHEN NEW DIAGRAMS ARE ADDED */}
            {Boolean(inverter.newDiagramsCount && inverter.newDiagramsCount > 0) && (
              <View
                style={[
                  styles.newBadge,
                  {
                    backgroundColor: colors.verifiedSoft,
                    borderColor: colors.verified,
                  },
                ]}
              >
                <Text style={[styles.newBadgeText, { color: colors.verified }]}>
                  ✨ +{inverter.newDiagramsCount} {isHindi ? 'नया' : 'NEW'}
                </Text>
              </View>
            )}
          </View>

          {/* MODEL NAME */}
          <Text
            style={[
              styles.modelName,
              {
                color: colors.text,
                lineHeight: lineFor('body', isHindi),
              },
            ]}
            numberOfLines={1}
          >
            {inverter.model}
          </Text>

          {/* COMPACT SPEC CHIPS */}
          <View style={styles.specsRow}>
            <View
              style={[
                styles.specChip,
                {
                  backgroundColor: colors.panelSunken,
                  borderColor: colors.rule,
                },
              ]}
            >
              <FontAwesome
                name="bolt"
                size={9}
                color={colors.textFaint}
                style={styles.specIcon}
              />
              <Text
                style={[styles.specText, { color: colors.textDim }]}
                numberOfLines={1}
              >
                {capacity}
              </Text>
            </View>

            <View
              style={[
                styles.specChip,
                {
                  backgroundColor: colors.panelSunken,
                  borderColor: colors.rule,
                },
              ]}
            >
              <FontAwesome
                name="battery-full"
                size={9}
                color={colors.verified}
                style={styles.specIcon}
              />
              <Text
                style={[styles.specText, { color: colors.textDim }]}
                numberOfLines={1}
              >
                {battery}
              </Text>
            </View>

            <View
              style={[
                styles.specChip,
                {
                  backgroundColor: colors.panelSunken,
                  borderColor: colors.rule,
                },
              ]}
            >
              <FontAwesome
                name="file-text-o"
                size={9}
                color={colors.readout}
                style={styles.specIcon}
              />
              <Text
                style={[styles.specText, { color: colors.readout }]}
                numberOfLines={1}
              >
                {inverter.faults.length} {isHindi ? 'डायग्राम' : 'Diags'}
              </Text>
            </View>
          </View>
        </View>

        {/* RIGHT CHEVRON */}
        <View style={styles.chevronWrapper}>
          <FontAwesome name="chevron-right" size={11} color={colors.textFaint} />
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: space.sm + 2,
    padding: space.sm + 2,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
    }),
  },

  imageContainer: {
    width: 58,
    height: 58,
    borderRadius: radius.sm + 2,
    borderWidth: 1,
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  contentCol: {
    flex: 1,
    marginLeft: space.sm + 3,
    justifyContent: 'center',
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.xs + 2,
    marginBottom: 2,
  },

  brandText: {
    fontSize: 11,
    fontWeight: weight.bold,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },

  newBadge: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: radius.pill,
    borderWidth: 1,
  },

  newBadgeText: {
    fontSize: 9,
    fontWeight: weight.bold,
  },

  modelName: {
    fontSize: 15,
    fontWeight: weight.bold,
    letterSpacing: -0.2,
  },

  specsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
    flexWrap: 'nowrap',
  },

  specChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.sm - 2,
    borderWidth: StyleSheet.hairlineWidth,
  },

  specIcon: {
    marginRight: 4,
  },

  specText: {
    fontSize: 10,
    fontWeight: weight.medium,
    fontFamily: mono,
  },

  chevronWrapper: {
    paddingLeft: space.xs,
    paddingRight: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
