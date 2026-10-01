import React, { memo, useState } from 'react';
import { Keyboard, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '@/components/AppHeader';
import DipCalculator from './DipCalculator';
import SmdCalculator from './SmdCalculator';

type CalculatorType = 'dip' | 'smd';
const DipPanel = memo(DipCalculator);
const SmdPanel = memo(SmdCalculator);

export default function ResistorCalculatorScreen({ initialType = 'dip' }: { initialType?: CalculatorType }) {
  const [type, setType] = useState<CalculatorType>(initialType);
  const [visited, setVisited] = useState({ dip: initialType === 'dip', smd: initialType === 'smd' });

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F8FA" />
      <AppHeader showBack showMenu />
      <View style={[styles.panel, type !== 'dip' && styles.hidden]}>
        {visited.dip && <DipPanel />}
      </View>
      <View style={[styles.panel, type !== 'smd' && styles.hidden]}>
        {visited.smd && <SmdPanel />}
      </View>
      <View style={styles.switcher}>
        {(['dip', 'smd'] as const).map(option => (
          <Pressable
            key={option}
            accessibilityRole="tab"
            accessibilityLabel={option.toUpperCase()}
            accessibilityState={{ selected: type === option }}
            onPress={() => {
              if (type === option) return;
              Keyboard.dismiss();
              if (!visited[option]) setVisited(current => ({ ...current, [option]: true }));
              setType(option);
            }}
            style={[styles.tab, type === option && styles.activeTab]}
          >
            <Text style={[styles.label, type === option && styles.activeLabel]}>{option.toUpperCase()}</Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F7F8FA' },
  panel: { flex: 1 },
  hidden: { display: 'none' },
  switcher: { flexDirection: 'row', gap: 8, padding: 8, borderTopWidth: 1, borderTopColor: '#E2E8F0', backgroundColor: '#FFFFFF' },
  tab: { flex: 1, minHeight: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: '#E5E7EB' },
  activeTab: { backgroundColor: '#2563EB' },
  label: { fontSize: 14, fontWeight: '700', color: '#334155' },
  activeLabel: { color: '#FFFFFF' },
});
