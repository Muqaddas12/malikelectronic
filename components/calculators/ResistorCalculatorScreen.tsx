import { useTheme } from '@/context/ThemeContext';
import { Palette } from '@/constants/theme';
import React, { memo, useMemo, useState } from 'react';
import { Keyboard, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '@/components/AppHeader';
import DipCalculator from './DipCalculator';
import SmdCalculator from './SmdCalculator';

type CalculatorType = 'dip' | 'smd';
const DipPanel = memo(DipCalculator);
const SmdPanel = memo(SmdCalculator);

export default function ResistorCalculatorScreen({ initialType = 'dip' }: { initialType?: CalculatorType }) {
  const { colors, mode: themeMode } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [type, setType] = useState<CalculatorType>(initialType);
  const [visited, setVisited] = useState({ dip: initialType === 'dip', smd: initialType === 'smd' });

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.surface} />
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

const createStyles = (colors: Palette) => StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface },
  panel: { flex: 1 },
  hidden: { display: 'none' },
  switcher: { flexDirection: 'row', gap: 8, padding: 8, borderTopWidth: 1, borderTopColor: colors.rule, backgroundColor: colors.panel },
  tab: { flex: 1, minHeight: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: colors.panelSunken },
  activeTab: { backgroundColor: colors.signal },
  label: { fontSize: 14, fontWeight: '700', color: colors.textDim },
  activeLabel: { color: colors.signalInk },
});
