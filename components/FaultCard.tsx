import React, { useRef } from 'react';
import {
  Animated,
  GestureResponderEvent,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import {
  lineFor,
  radius,
  space,
  weight,
} from '@/constants/theme';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { InverterFaultDetail } from '@/types/faultDetail';
import { toggleFavorite, useBench } from '@/utils/benchStore';

type Props = {
  fault: InverterFaultDetail;
  onPress: () => void;
  inverterId?: string;
  modelName?: string;
};

export type MatchedIcon = {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
};

export function getMatchingDiagramIcon(title: string, colors: any): MatchedIcon {
  const primary = (title.split(/[|\/]/)[0] || title).trim().toLowerCase();
  const full = title.toLowerCase();

  for (const t of [primary, full]) {
    if (
      t.includes('microcontroller') ||
      t.includes('माइक्रो') ||
      t.includes('pic') ||
      t.includes('pin details') ||
      t.includes('chip') ||
      t.includes('ic ')
    ) {
      return { name: 'microchip', color: colors.readout };
    }

    if (
      t.includes('battery') ||
      t.includes('बैटरी') ||
      t.includes('low back up') ||
      t.includes('backup') ||
      t.includes('back up') ||
      t.includes('overcharge')
    ) {
      return { name: 'battery-half', color: colors.verified };
    }

    if (
      t.includes('dead') ||
      t.includes('डेड') ||
      t.includes('vcc') ||
      t.includes('no output') ||
      t.includes('आउटपुट नहीं')
    ) {
      return { name: 'power-off', color: colors.severity.critical };
    }

    if (
      t.includes('mosfet') ||
      t.includes('मॉसफेट') ||
      t.includes('drive') ||
      t.includes('ड्राइव') ||
      t.includes('blast') ||
      t.includes('gate') ||
      t.includes('h-bridge')
    ) {
      return { name: 'bolt', color: colors.signal };
    }

    if (
      t.includes('relay') ||
      t.includes('रिले') ||
      t.includes('changeover') ||
      t.includes('चेंजओवर') ||
      t.includes('change over') ||
      t.includes('zero cross')
    ) {
      return { name: 'random', color: '#a855f7' };
    }

    if (
      t.includes('charging') ||
      t.includes('चार्जिंग') ||
      t.includes('charge')
    ) {
      return { name: 'plug', color: colors.signal };
    }

    if (
      t.includes('fan') ||
      t.includes('फैन') ||
      t.includes('पंखा') ||
      t.includes('cooling') ||
      t.includes('overheating') ||
      t.includes('गर्म') ||
      t.includes('heat')
    ) {
      return { name: 'snowflake-o', color: '#38bdf8' };
    }

    if (
      t.includes('switch') ||
      t.includes('स्विच') ||
      t.includes('on/off')
    ) {
      return { name: 'toggle-on', color: colors.readout };
    }

    if (
      t.includes('buzzer') ||
      t.includes('बज़र') ||
      t.includes('beep') ||
      t.includes('बीप') ||
      t.includes('sound') ||
      t.includes('आवाज') ||
      t.includes('alarm')
    ) {
      return { name: 'bell-o', color: colors.signal };
    }

    if (
      t.includes('feedback') ||
      t.includes('फीडबैक') ||
      t.includes('sensing') ||
      t.includes('सेंसिंग') ||
      t.includes('sense') ||
      t.includes('mfb')
    ) {
      return { name: 'tachometer', color: '#06b6d4' };
    }

    if (
      t.includes('overload') ||
      t.includes('ओवरलोड') ||
      t.includes('fuse') ||
      t.includes('फ्यूज') ||
      t.includes('protection') ||
      t.includes('सुरक्षा') ||
      t.includes('short circuit') ||
      t.includes('शॉर्ट')
    ) {
      return { name: 'shield', color: '#f97316' };
    }

    if (
      t.includes('display') ||
      t.includes('डिस्प्ले') ||
      t.includes('light') ||
      t.includes('लाइट') ||
      t.includes('led') ||
      t.includes('blinking')
    ) {
      return { name: 'lightbulb-o', color: '#eab308' };
    }
  }

  return { name: 'file-text-o', color: colors.readout };
}

export default function FaultCard({
  fault,
  onPress,
  inverterId,
  modelName,
}: Props) {
  const { isHindi } = useLanguage();
  const { colors } = useTheme();
  const { favorites } = useBench();

  const iconMeta = getMatchingDiagramIcon(fault.title, colors);

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
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

  const itemId = inverterId ? `diagram:${inverterId}:${fault.id}` : '';
  const isFavorite = itemId ? favorites.some((item) => item.id === itemId) : false;

  const handleToggleFavorite = (e: GestureResponderEvent) => {
    e.stopPropagation();
    if (!inverterId) return;

    void toggleFavorite({
      id: itemId,
      title: modelName ? `${modelName} - ${fault.title}` : fault.title,
      route: `/inverter/fault/${encodeURIComponent(fault.id)}?id=${encodeURIComponent(inverterId)}`,
    });
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        accessibilityRole="button"
        accessibilityLabel={fault.title}
        style={({ pressed }) => [
          styles.card,
          {
            borderColor: pressed ? colors.signal : colors.rule,
            backgroundColor: pressed ? colors.panelRaised : colors.panel,
          },
        ]}
      >
        {/* SCHEMATIC ICON WELL */}
        <View
          style={[
            styles.iconWell,
            {
              backgroundColor: colors.panelSunken,
              borderColor: colors.rule,
            },
          ]}
        >
          <FontAwesome name={iconMeta.name} size={17} color={iconMeta.color} />
        </View>

        {/* DIAGRAM INFO: TITLE + SUBTITLE / PIN DETAILS */}
        <View style={styles.contentCol}>
          <View style={styles.titleRow}>
            <Text
              style={[
                styles.title,
                {
                  color: colors.text,
                  lineHeight: lineFor('body', isHindi),
                },
              ]}
              numberOfLines={1}
            >
              {fault.title}
            </Text>

            {Boolean(fault.isNew) && (
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
                  ✨ {isHindi ? 'नया' : 'NEW'}
                </Text>
              </View>
            )}
          </View>

          {fault.subtitle ? (
            <Text
              style={[styles.subtitle, { color: colors.textDim }]}
              numberOfLines={1}
            >
              {fault.subtitle}
            </Text>
          ) : null}
        </View>

        {/* RIGHT ACTIONS: FAVORITE BUTTON + CHEVRON */}
        <View style={styles.actionsCol}>
          {inverterId ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              onPress={handleToggleFavorite}
              hitSlop={{ top: 12, bottom: 12, left: 10, right: 10 }}
              style={styles.favBtn}
            >
              <FontAwesome
                name={isFavorite ? 'star' : 'star-o'}
                size={18}
                color={isFavorite ? colors.signal : colors.textFaint}
              />
            </Pressable>
          ) : null}

          <FontAwesome
            name="chevron-right"
            size={11}
            color={colors.textFaint}
            style={styles.chevron}
          />
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
    marginBottom: space.sm,
    paddingVertical: 10,
    paddingHorizontal: space.sm + 2,
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

  iconWell: {
    width: 42,
    height: 42,
    borderRadius: radius.sm + 2,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  contentCol: {
    flex: 1,
    marginLeft: space.sm + 2,
    marginRight: space.xs,
    justifyContent: 'center',
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.xs + 2,
  },

  title: {
    fontSize: 14.5,
    fontWeight: weight.bold,
    letterSpacing: -0.2,
    flexShrink: 1,
  },

  subtitle: {
    fontSize: 11.5,
    marginTop: 2,
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

  actionsCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    paddingLeft: space.xs,
  },

  favBtn: {
    padding: space.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },

  chevron: {
    marginLeft: 2,
  },
});
