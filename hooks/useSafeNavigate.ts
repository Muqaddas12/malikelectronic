import { Href, router, usePathname, useLocalSearchParams } from 'expo-router';
import { useCallback, useRef } from 'react';

/**
 * Hook to prevent rapid double-clicks from opening multiple duplicate screens.
 * Debounces navigation calls by ignoring subsequent presses within the cooldown period.
 */
export function useSafeNavigate() {
  const pathname = usePathname();
  const { id } = useLocalSearchParams<{ id?: string }>();
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
    if (router.canGoBack()) router.back();
    else if (pathname.startsWith('/inverter/fault/') && typeof id === 'string') router.replace({ pathname: '/inverter/[id]', params: { id } });
    else router.replace(pathname.startsWith('/tools/') ? '/(tabs)/two' : '/(tabs)');
    setTimeout(() => {
      isNavigating.current = false;
    }, cooldownMs);
  }, [pathname, id]);

  return { safePush, safeBack };
}

