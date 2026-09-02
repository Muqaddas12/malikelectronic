import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  mono,
  size,
  space,
  weight,
} from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';

export type Spec = {
  /** Small caption under the value. */
  label: string;
  /** The reading itself. Kept short — this is a panel, not a sentence. */
  value: string;
  /** Overrides the readout colour when the value carries a warning. */
  tone?: string;
  /** Lets one cell take the slack when values are uneven in width. */
  grow?: number;
};

type Props = {
  specs: Spec[];
  /** Sunken wells read better inside an already-raised panel. */
  sunken?: boolean;
};

/**
 * The specification strip: labelled cells divided by hairline rules, lifted
 * from the silkscreen block printed on an inverter's own terminal panel.
 *
 * This is the one place the design raises its voice, so it stays structural —
 * square corners, no fill games, values in the readout colour and nothing
 * else in the strip competing for attention.
 */
export default function SpecStrip({ specs, sunken = true }: Props) {
  const { colors } = useTheme();

  if (specs.length === 0) return null;

  return (
    <View
      style={[
        styles.strip,
        {
          backgroundColor: sunken ? colors.panelSunken : 'transparent',
          borderColor: colors.rule,
        },
      ]}
    >
      {specs.map((spec, index) => (
        <View
          key={`${spec.label}-${index}`}
          style={[
            styles.cell,
            { flexGrow: spec.grow ?? 1 },
            index > 0 && {
              borderLeftWidth: StyleSheet.hairlineWidth,
              borderLeftColor: colors.rule,
            },
          ]}
        >
          <Text
            numberOfLines={1}
            style={[
              styles.value,
              { color: spec.tone ?? colors.readout },
            ]}
          >
            {spec.value}
          </Text>

          <Text
            numberOfLines={1}
            style={[styles.label, { color: colors.textFaint }]}
          >
            {spec.label}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  strip: {
    flexDirection: 'row',
    alignItems: 'stretch',
    /* Full-bleed inside a card, so it only needs the divider above it. */
    borderTopWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },

  cell: {
    flexBasis: 0,
    flexShrink: 1,
    paddingVertical: space.sm,
    paddingHorizontal: space.sm,
    justifyContent: 'center',
  },

  value: {
    fontFamily: mono,
    fontSize: size.small,
    fontWeight: weight.semi,
  },

  label: {
    fontSize: size.micro,
    fontWeight: weight.medium,
    marginTop: 2,
  },
});
