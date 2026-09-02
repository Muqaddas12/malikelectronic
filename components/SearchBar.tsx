import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {
  layout,
  radius,
  size,
  space,
  weight,
} from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';

type Props = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
};

export default function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search inverter',
}: Props) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.panel,
          borderColor: colors.rule,
        },
      ]}
    >
      <View
        style={[styles.glyph, { borderColor: colors.textFaint }]}
      />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textFaint}
        selectionColor={colors.signal}
        style={[styles.input, { color: colors.text }]}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        accessibilityLabel={placeholder}
      />

      {value.length > 0 && (
        <Pressable
          onPress={() => onChangeText('')}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          style={({ pressed }) => [
            styles.clear,
            {
              backgroundColor: pressed
                ? colors.ruleStrong
                : colors.panelSunken,
            },
          ]}
        >
          <Text style={[styles.clearMark, { color: colors.textDim }]}>
            ✕
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: layout.tap + 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: space.md,
  },

  /* A lens outline, drawn rather than shipped as an emoji. */
  glyph: {
    width: 13,
    height: 13,
    borderRadius: 7,
    borderWidth: 1.5,
    marginLeft: 2,
  },

  input: {
    flex: 1,
    fontSize: size.body,
    fontWeight: weight.medium,
    paddingVertical: space.md,
  },

  clear: {
    width: 26,
    height: 26,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },

  clearMark: {
    fontSize: size.micro,
    fontWeight: weight.bold,
  },
});
