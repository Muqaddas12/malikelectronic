import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from '@react-navigation/native';

import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { LanguageProvider } from '@/context/LanguageContext';

// Keep native splash visible until we are ready
SplashScreen.preventAutoHideAsync();

const { width: SCREEN_W, height: SCREEN_H } =
  Dimensions.get('window');

// ─── Animated App Splash ─────────────────────────────────────────────────────

function AnimatedSplash({
  onFinished,
}: {
  onFinished: () => void;
}) {
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      // 1. Logo pops in
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          damping: 12,
          mass: 0.7,
          stiffness: 180,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
      ]),
      // 2. Title fades in
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      // 3. Tagline fades in
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      // 4. Hold for a moment
      Animated.delay(800),
      // 5. Whole screen fades out
      Animated.timing(screenOpacity, {
        toValue: 0,
        duration: 450,
        useNativeDriver: true,
      }),
    ]).start(() => onFinished());
  }, []);

  return (
    <Animated.View
      style={[
        styles.splashRoot,
        { opacity: screenOpacity },
      ]}
    >
      {/* Background gradient effect using layered views */}
      <View style={styles.splashBgTop} />
      <View style={styles.splashBgBottom} />

      {/* Decorative circles */}
      <View style={styles.circle1} />
      <View style={styles.circle2} />

      {/* Logo badge */}
      <Animated.View
        style={[
          styles.logoWrap,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          },
        ]}
      >
        <View style={styles.logoBg}>
          <Text style={styles.logoIcon}>⚡</Text>
        </View>
      </Animated.View>

      {/* App name */}
      <Animated.Text
        style={[styles.splashTitle, { opacity: titleOpacity }]}
      >
        MaliK Electronic
      </Animated.Text>

      {/* Tagline */}
      <Animated.Text
        style={[
          styles.splashTagline,
          { opacity: taglineOpacity },
        ]}
      >
        Inverter Repair Guide
      </Animated.Text>

      {/* Dots loader */}
      <Animated.View
        style={[
          styles.dotsRow,
          { opacity: taglineOpacity },
        ]}
      >
        {[0, 1, 2].map((i) => (
          <View key={i} style={styles.dot} />
        ))}
      </Animated.View>
    </Animated.View>
  );
}

// ─── Root Layout ─────────────────────────────────────────────────────────────

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [appReady, setAppReady] = useState(false);
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    // Hide native splash immediately — we show our own
    SplashScreen.hideAsync();
    setAppReady(true);
  }, []);

  // Show animated splash until it finishes
  if (!appReady || !splashDone) {
    return (
      <LanguageProvider>
        {appReady && (
          <AnimatedSplash onFinished={() => setSplashDone(true)} />
        )}
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <ThemeProvider
        value={
          colorScheme === 'dark'
            ? DarkTheme
            : DefaultTheme
        }
      >
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="inverter/[id]"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="inverter/fault/[faultId]"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="tools/smd-calculator"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="tools/dip-calculator"
            options={{ headerShown: false }}
          />
        </Stack>
      </ThemeProvider>
    </LanguageProvider>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  splashRoot: {
    flex: 1,
    width: SCREEN_W,
    height: SCREEN_H,
    backgroundColor: '#0A0F1E',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 9999,
  },

  splashBgTop: {
    position: 'absolute',
    top: -80,
    right: -80,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#1E3A6E',
    opacity: 0.5,
  },

  splashBgBottom: {
    position: 'absolute',
    bottom: -60,
    left: -60,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: '#1B3250',
    opacity: 0.4,
  },

  circle1: {
    position: 'absolute',
    top: SCREEN_H * 0.15,
    left: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: '#2563EB',
    opacity: 0.3,
  },

  circle2: {
    position: 'absolute',
    bottom: SCREEN_H * 0.2,
    right: 40,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#60A5FA',
    opacity: 0.25,
  },

  logoWrap: {
    marginBottom: 28,
  },

  logoBg: {
    width: 100,
    height: 100,
    borderRadius: 28,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563EB',
    shadowOpacity: 0.7,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 0 },
    elevation: 20,
  },

  logoIcon: {
    fontSize: 52,
  },

  splashTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 0.5,
    textAlign: 'center',
  },

  splashTagline: {
    color: '#93C5FD',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },

  dotsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 40,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2563EB',
  },
});