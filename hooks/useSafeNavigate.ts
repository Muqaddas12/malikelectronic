import { Href, router } from 'expo-router';
import { useCallback, useRef } from 'react';

/**
 * Hook to prevent rapid double-clicks from opening multiple duplicate screens.
 * Debounces navigation calls by ignoring subsequent presses within the cooldown period.
 */
export function useSafeNavigate() {
  const isNavigating = useRef(false);

  const safePush = useCallback((href: Href, cooldownMs = 600) => {
    if (isNavigating.current) {
      return;
    }
    isNavigating.current = true;
    router.push(href);
    setTimeout(() => {
      isNavigating.current = false;
    }, cooldownMs);
  }, []);

  const safeBack = useCallback((cooldownMs = 500) => {
    if (isNavigating.current) {
      return;
    }
    isNavigating.current = true;
    router.back();
    setTimeout(() => {
      isNavigating.current = false;
    }, cooldownMs);
  }, []);

  return { safePush, safeBack };
}

