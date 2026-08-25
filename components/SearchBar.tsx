import React from 'react';

import {
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

type Props = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
};

export default function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search inverter...',
}: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 52,

    backgroundColor: '#FFFFFF',

    borderRadius: 16,

    borderWidth: 1,
    borderColor: '#E5E7EB',

    justifyContent: 'center',

    paddingHorizontal: 16,

    marginBottom: 20,
  },

  input: {
    fontSize: 15,
    color: '#111827',
  },
});