import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useRef, useState } from 'react';

export function useStoredPreference<T extends string>(key: string, fallback: T, allowed: readonly T[]) {
  const [value, setValue] = useState<T>(fallback);
  const edited = useRef(false);
  const writes = useRef(Promise.resolve());
  useEffect(() => {
    let mounted = true;
    AsyncStorage.getItem(key).then(saved => {
      if (mounted && !edited.current && allowed.includes(saved as T)) setValue(saved as T);
    }).catch(() => {});
    return () => { mounted = false; };
  }, [key, allowed]);
  const update = useCallback((next: T) => {
    edited.current = true;
    setValue(next);
    writes.current = writes.current.then(() => AsyncStorage.setItem(key, next)).catch(() => {});
  }, [key]);
  return [value, update] as const;
}
