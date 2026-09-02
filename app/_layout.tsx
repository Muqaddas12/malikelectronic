import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

import {
  mono,
  size,
  space,
  weight,
} from '@/constants/theme';
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';

SplashScreen.preventAutoHideAsync();

/**
 * One orchestrated moment on cold start: the terminal post lights, a trace
 * runs out of it, then the name lands. Around 1.1s, because this is a tool
 * opened dozens of times a shift — anything longer is a tax on the user.
 */
function PowerUpSplash({ onFinished }: { onFinished: () => void }) {
  const { colors, reduceMotion } = useTheme();

  const core = useRef(new Animated.Value(0)).current;
  const trace = useRef(new Animated.Value(0)).current;
  const name = useRef(new Animated.Value(0)).current;
  const screen = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (reduceMotion) {
      onFinished();
      return;
    }

    Animated.sequence([
      Animated.spring(core, {
        toValue: 1,
        damping: 13,
        mass: 0.6,
        stiffness: 200,
        useNativeDriver: true,
      }),
      Animated.timing(trace, {
        toValue: 1,
        duration: 260,
        useNativeDriver: true,
      }),
      Animated.timing(name, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.delay(160),
      Animated.timing(screen, {
        toValue: 0,
        duration: 240,
        useNativeDriver: true,
      }),
    ]).start(onFinished);
  }, [reduceMotion, core, trace, name, screen, onFinished]);

  return (
    <Animated.View
      style={[
        styles.splash,
        { backgroundColor: colors.surface, opacity: screen },
      ]}
    >
      <View style={styles.splashRow}>
        <Animated.View
          style={[
            styles.splashMark,
            {
              borderColor: colors.signal,
              transform: [{ scale: core }],
            },
          ]}
        >
          <View
            style={[
              styles.splashCore,
              { backgroundColor: colors.signal },
            ]}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.splashTrace,
            {
              backgroundColor: colors.signal,
              opacity: trace,
              transform: [{ scaleX: trace }],
            },
          ]}
        />
      </View>

      <Animated.View style={{ opacity: name }}>
        <Text style={[styles.splashName, { color: colors.text }]}>
          MaliK Electronic
        </Text>

        <Text style={[styles.splashTag, { color: colors.readout }]}>
          Inverter repair reference
        </Text>
      </Animated.View>
    </Animated.View>
  );
}


function RootShell() {
  const { colors, mode } = useTheme();
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  const navigationTheme = {
    ...(mode === 'dark' ? DarkTheme : DefaultTheme),
    colors: {
      ...(mode === 'dark' ? DarkTheme : DefaultTheme).colors,
      background: colors.surface,
      card: colors.panel,
      text: colors.text,
      border: colors.rule,
      primary: colors.signal,
      notification: colors.severity.critical,
    },
  };

  if (!splashDone) {
    return (
      <>
        <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
        <PowerUpSplash onFinished={() => setSplashDone(true)} />
      </>
    );
  }

  return (
    <NavigationThemeProvider value={navigationTheme}>
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.surface },
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="inverter/[id]" />
        <Stack.Screen name="inverter/fault/[faultId]" />
        <Stack.Screen name="tools/smd-calculator" />
        <Stack.Screen name="tools/dip-calculator" />
        <Stack.Screen name="tools/ic-guide" />
      </Stack>
    </NavigationThemeProvider>
  );
}


export default function RootLayout() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <RootShell />
      </LanguageProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  splash: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: space.xxl,
  },

  splashRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: space.xl,
  },

  splashMark: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  splashCore: {
    width: 13,
    height: 13,
    borderRadius: 7,
  },

  /* The trace grows from the post, so it is pinned on its left edge. */
  splashTrace: {
    width: 120,
    height: 2,
    marginLeft: space.md,
    transform: [{ scaleX: 0 }],
  },

  splashName: {
    fontSize: size.display,
    fontWeight: weight.bold,
    letterSpacing: -0.6,
  },

  splashTag: {
    fontFamily: mono,
    fontSize: size.small,
    fontWeight: weight.medium,
    marginTop: space.sm,
  },
});
