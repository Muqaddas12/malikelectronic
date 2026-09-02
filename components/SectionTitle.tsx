import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  lineFor,
  size,
  space,
  weight,
} from '@/constants/theme';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

type Props = {
  title: string;
  subtitle?: string;
};

export default function SectionTitle({ title, subtitle }: Props) {
  const { colors } = useTheme();
  const { isHindi } = useLanguage();

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          {
            color: colors.text,
            lineHeight: lineFor('title', isHindi),
          },
        ]}
      >
        {title}
      </Text>

      {subtitle ? (
        <Text
          style={[
            styles.subtitle,
            {
              color: colors.textDim,
              lineHeight: lineFor('small', isHindi),
            },
          ]}
        >
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: space.lg,
  },

  title: {
    fontSize: size.title,
    fontWeight: weight.bold,
    letterSpacing: -0.3,
  },

  subtitle: {
    fontSize: size.small,
    fontWeight: weight.regular,
    marginTop: space.xs,
    maxWidth: 460,
  },
});
