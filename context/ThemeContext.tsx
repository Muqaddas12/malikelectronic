import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  AccessibilityInfo,
  useColorScheme as useSystemColorScheme,
} from 'react-native';

import {
  Palette,
  palettes,
  ThemeMode,
  ThemePreference,
} from '@/constants/theme';

type ThemeContextValue = {
  /** Resolved palette to draw with. */
  colors: Palette;
  /** The mode actually in effect right now. */
  mode: ThemeMode;
  /** What the user asked for: 'system' follows the phone. */
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
  /** True when the OS asks apps to limit animation. */
  reduceMotion: boolean;
};

const ThemeContext = createContext<ThemeContextValue>({
  colors: palettes.dark,
  mode: 'dark',
  preference: 'system',
  setPreference: () => {},
  reduceMotion: false,
});

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const systemScheme = useSystemColorScheme();
  const [preference, setPreference] =
    useState<ThemePreference>('system');
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    let cancelled = false;

    AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
      if (!cancelled) setReduceMotion(enabled);
    });

    const subscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      setReduceMotion,
    );

    return () => {
      cancelled = true;
      subscription.remove();
    };
  }, []);

  const mode: ThemeMode =
    preference === 'system'
      ? systemScheme === 'light'
        ? 'light'
        : 'dark'
      : preference;

  const handleSetPreference = useCallback(
    (next: ThemePreference) => setPreference(next),
    [],
  );

  const value = useMemo<ThemeContextValue>(
    () => ({
      colors: palettes[mode],
      mode,
      preference,
      setPreference: handleSetPreference,
      reduceMotion,
    }),
    [mode, preference, handleSetPreference, reduceMotion],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
