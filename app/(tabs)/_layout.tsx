import React from 'react';
import { Platform, StyleSheet } from 'react-native';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

import { size, space, weight } from '@/constants/theme';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { tr } from '@/data/translations';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={21} style={{ marginBottom: -2 }} {...props} />;
}

export default function TabLayout() {
  const { language, isHindi } = useLanguage();
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.signal,
        tabBarInactiveTintColor: colors.textFaint,

        /* A hairline rule, not a shadow — the bar reads as part of the panel. */
        tabBarStyle: {
          backgroundColor: colors.panel,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: colors.rule,
          height: Platform.OS === 'ios' ? 82 : 62,
          paddingTop: space.sm,
          paddingBottom: Platform.OS === 'ios' ? space.xxl : space.sm,
          elevation: 0,
        },

        tabBarLabelStyle: {
          fontSize: size.micro,
          fontWeight: weight.semi,
          /* Devanagari matras need the extra room above the baseline. */
          marginTop: isHindi ? 3 : 1,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: tr(language, 'tabInverters'),
          tabBarIcon: ({ color }) => <TabBarIcon name="bolt" color={color} />,
        }}
      />

      <Tabs.Screen
        name="two"
        options={{
          title: tr(language, 'tabTools'),
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="calculator" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
