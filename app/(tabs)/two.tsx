import React, { memo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import AppHeader from '@/components/AppHeader';
import { layout, lineFor, radius, size, space, weight } from '@/constants/theme';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { tr } from '@/data/translations';
import { useSafeNavigate } from '@/hooks/useSafeNavigate';

function ToolsListScreen() {
  const { language, isHindi } = useLanguage();
  const { colors } = useTheme();
  const { safePush } = useSafeNavigate();
  const tools = [
    {
      id: 'resistor',
      icon: 'calculator' as const,
      title: isHindi ? 'रेजिस्टेंस कैलकुलेटर' : 'Resistor Calculator',
      description: isHindi ? 'कलर बैंड और SMD कोड से मान निकालें।' : 'Read color bands and decode SMD markings.',
      detail: 'DIP · SMD · EIA-96',
      route: '/tools/resistor-calculator' as const,
      accent: colors.readout,
      background: colors.readoutSoft,
    },
    {
      id: 'ic',
      icon: 'microchip' as const,
      title: tr(language, 'icGuideTitle'),
      description: isHindi ? 'IC खोजें, पिनआउट और टेस्टिंग विवरण देखें।' : 'Find pinouts, diagrams and testing details.',
      detail: isHindi ? 'पिनआउट · डायग्राम' : 'Pinouts · Diagrams',
      route: '/tools/ic-guide' as const,
      accent: colors.signal,
      background: colors.signalSoft,
    },
  ];

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={[styles.safe, { backgroundColor: colors.surface }]}>
      <AppHeader showMenu title={tr(language, 'tools')} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={[styles.intro, { color: colors.textDim, lineHeight: lineFor('small', isHindi) }]}>
          {isHindi ? 'कैलकुलेटर और कंपोनेंट गाइड' : 'Calculators & component reference'}
        </Text>
        {tools.map(tool => (
          <Pressable
            key={tool.id}
            accessibilityRole="button"
            accessibilityLabel={tool.title}
            accessibilityHint={tool.description}
            onPress={() => safePush(tool.route)}
            android_ripple={{ color: colors.rule }}
            style={({ pressed }) => [styles.card, { backgroundColor: pressed ? colors.panelRaised : colors.panel, borderColor: pressed ? colors.ruleStrong : colors.rule }]}
          >
            <View style={[styles.icon, { backgroundColor: tool.background }]}>
              <FontAwesome name={tool.icon} size={21} color={tool.accent} />
            </View>
            <View style={styles.copy}>
              <Text style={[styles.title, { color: colors.text, lineHeight: lineFor('sub', isHindi) }]}>{tool.title}</Text>
              <Text style={[styles.description, { color: colors.textDim, lineHeight: lineFor('small', isHindi) }]}>{tool.description}</Text>
              <Text style={[styles.detail, { color: tool.accent }]}>{tool.detail}</Text>
            </View>
            <FontAwesome name="angle-right" size={22} color={colors.textFaint} />
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default memo(ToolsListScreen);

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { padding: layout.gutter, gap: space.md, paddingBottom: space.xxl, width: '100%', maxWidth: 720, alignSelf: 'center' },
  intro: { fontSize: size.small, marginBottom: space.xs },
  card: { flexDirection: 'row', alignItems: 'center', gap: space.md, padding: space.md, borderWidth: StyleSheet.hairlineWidth, borderRadius: radius.lg, overflow: 'hidden' },
  icon: { width: 44, height: 44, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center' },
  copy: { flex: 1, gap: space.xs },
  title: { fontSize: size.sub, fontWeight: weight.bold },
  description: { fontSize: size.small },
  detail: { fontSize: size.micro, fontWeight: weight.semi, marginTop: space.xs },
});
