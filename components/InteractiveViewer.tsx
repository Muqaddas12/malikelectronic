import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Animated,
    Easing,
    Image,
    ImageSourcePropType,
    PanResponder,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from 'react-native';

type Props = {
  source: ImageSourcePropType;
  baseWidth?: number;
  baseHeight?: number;
  minScale?: number;
  maxScale?: number;
  scaleValue?: number; // External scale control
  onScaleChange?: (scale: number) => void;
};

/**
 * Pure Native React Native Interactive Image/Diagram Viewer
 *
 * Enhanced for:
 *  - Zero dead space: Image fills viewport width in portrait.
 *  - Strict 2D edge clamping: Prevents black gutters on left, right, top, and bottom when zoomed.
 *  - Inverted matrix transform order [translateX, translateY, scale]: Gives 1:1 finger tracking without over-translating.
 *  - 60/120 FPS buttery smooth animations without mid-gesture React re-renders.
 *  - 2-Finger fluid pinch-to-zoom & double-tap quick toggle (1.0x <-> 2.5x).
 */
export default function InteractiveViewer({
  source,
  baseWidth: propWidth,
  baseHeight: propHeight,
  minScale = 1.0,
  maxScale = 4.5,
  scaleValue,
  onScaleChange,
}: Props) {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Full viewport width in portrait to eliminate side gutters
  const isLandscape = windowWidth > windowHeight;
  const baseWidth = propWidth ?? (isLandscape ? Math.min(windowWidth, 900) : windowWidth);
  const baseHeight = propHeight ?? Math.round(windowHeight * (isLandscape ? 0.88 : 0.76));

  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const scale = useRef(new Animated.Value(1.0)).current;

  // Imperative state for gestures
  const currentScale = useRef(1.0);
  const currentPan = useRef({ x: 0, y: 0 });
  const initialPinchDist = useRef<number | null>(null);
  const pinchStartScale = useRef(1.0);
  const pinchStartPan = useRef({ x: 0, y: 0 });
  const lastTapTime = useRef(0);

  // Sync external scale changes (from HUD buttons)
  useEffect(() => {
    if (scaleValue !== undefined && Math.abs(scaleValue - currentScale.current) > 0.05) {
      currentScale.current = scaleValue;
      if (scaleValue <= 1.05) {
        currentPan.current = { x: 0, y: 0 };
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 1.0,
            duration: 220,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(pan, {
            toValue: { x: 0, y: 0 },
            duration: 220,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]).start();
      } else {
        const maxPanX = Math.max(0, (baseWidth * (scaleValue - 1)) / 2);
        const maxPanY = Math.max(0, (baseHeight * (scaleValue - 1)) / 2);
        const targetX = Math.min(Math.max(currentPan.current.x, -maxPanX), maxPanX);
        const targetY = Math.min(Math.max(currentPan.current.y, -maxPanY), maxPanY);
        currentPan.current = { x: targetX, y: targetY };

        Animated.parallel([
          Animated.timing(scale, {
            toValue: scaleValue,
            duration: 220,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(pan, {
            toValue: { x: targetX, y: targetY },
            duration: 220,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]).start();
      }
    }
  }, [scaleValue, baseWidth, baseHeight]);

  const calcDistance = (t1: any, t2: any) => {
    const dx = t1.pageX - t2.pageX;
    const dy = t1.pageY - t2.pageY;
    return Math.hypot(dx, dy);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt) => {
        return evt.nativeEvent.touches.length >= 2 || currentScale.current > 1.05;
      },
      onMoveShouldSetPanResponder: (evt) => {
        return evt.nativeEvent.touches.length >= 2 || currentScale.current > 1.05;
      },
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponderCapture: (evt) => {
        return evt.nativeEvent.touches.length >= 2 || currentScale.current > 1.05;
      },

      onPanResponderGrant: (evt) => {
        const touches = evt.nativeEvent.touches;

        // Double-tap zoom toggle (1.0x <-> 2.5x)
        const now = Date.now();
        if (touches.length === 1 && now - lastTapTime.current < 280) {
          const targetScale = currentScale.current > 1.3 ? 1.0 : 2.5;
          currentScale.current = targetScale;

          if (targetScale <= 1.05) {
            currentPan.current = { x: 0, y: 0 };
            Animated.parallel([
              Animated.timing(scale, {
                toValue: 1.0,
                duration: 220,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
              }),
              Animated.timing(pan, {
                toValue: { x: 0, y: 0 },
                duration: 220,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
              }),
            ]).start();
          } else {
            Animated.timing(scale, {
              toValue: targetScale,
              duration: 220,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: true,
            }).start();
          }

          if (onScaleChange) onScaleChange(targetScale);
          lastTapTime.current = 0;
          return;
        }
        lastTapTime.current = now;

        if (touches.length >= 2) {
          initialPinchDist.current = calcDistance(touches[0], touches[1]);
          pinchStartScale.current = currentScale.current;
          pinchStartPan.current = { ...currentPan.current };
        } else if (currentScale.current > 1.05) {
          pinchStartPan.current = { ...currentPan.current };
        }
      },

      onPanResponderMove: (evt, gestureState) => {
        const touches = evt.nativeEvent.touches;

        // 2-FINGER FLUID PINCH-TO-ZOOM (60/120 FPS native transforms without mid-gesture re-renders)
        if (touches.length >= 2 && initialPinchDist.current) {
          const dist = calcDistance(touches[0], touches[1]);
          const ratio = dist / initialPinchDist.current;
          const nextScale = Math.min(Math.max(pinchStartScale.current * ratio, minScale), maxScale);

          currentScale.current = nextScale;
          scale.setValue(nextScale);

          // Clamped pan to prevent black borders during pinch
          const maxPanX = Math.max(0, (baseWidth * (nextScale - 1)) / 2);
          const maxPanY = Math.max(0, (baseHeight * (nextScale - 1)) / 2);
          const clampedX = Math.min(Math.max(currentPan.current.x, -maxPanX), maxPanX);
          const clampedY = Math.min(Math.max(currentPan.current.y, -maxPanY), maxPanY);
          pan.setValue({ x: clampedX, y: clampedY });
          return;
        }

        // 1-FINGER 2D PAN WHEN ZOOMED IN
        if (touches.length === 1 && currentScale.current > 1.05) {
          const maxPanX = Math.max(0, (baseWidth * (currentScale.current - 1)) / 2);
          const maxPanY = Math.max(0, (baseHeight * (currentScale.current - 1)) / 2);

          let targetX = pinchStartPan.current.x + gestureState.dx;
          let targetY = pinchStartPan.current.y + gestureState.dy;

          // Strict boundary clamping: diagram never pulls inside screen to expose black gutters
          targetX = Math.min(Math.max(targetX, -maxPanX), maxPanX);
          targetY = Math.min(Math.max(targetY, -maxPanY), maxPanY);

          pan.setValue({ x: targetX, y: targetY });
        }
      },

      onPanResponderRelease: () => {
        initialPinchDist.current = null;

        if (currentScale.current <= 1.05) {
          currentScale.current = 1.0;
          currentPan.current = { x: 0, y: 0 };
          Animated.parallel([
            Animated.timing(scale, {
              toValue: 1.0,
              duration: 200,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: true,
            }),
            Animated.timing(pan, {
              toValue: { x: 0, y: 0 },
              duration: 200,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: true,
            }),
          ]).start();
          if (onScaleChange) onScaleChange(1.0);
        } else {
          // @ts-ignore
          const finalX = pan.x._value ?? currentPan.current.x;
          // @ts-ignore
          const finalY = pan.y._value ?? currentPan.current.y;
          currentPan.current = { x: finalX, y: finalY };
          if (onScaleChange) onScaleChange(currentScale.current);
        }
      },
    })
  ).current;

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Animated.View
        style={[
          styles.imageWrapper,
          {
            transform: [
              { translateX: pan.x },
              { translateY: pan.y },
              { scale: scale },
            ],
          },
        ]}
      >
        <Image
          source={source}
          style={{
            width: baseWidth,
            height: baseHeight,
          }}
          resizeMode="contain"
          onLoadStart={() => {
            setIsLoading(true);
            setHasError(false);
          }}
          onLoadEnd={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        />
        {isLoading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#38BDF8" />
          </View>
        )}
        {hasError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorIcon}>⚠️</Text>
            <Text style={styles.errorTitle}>Diagram Not Accessible</Text>
            <Text style={styles.errorSubtitle}>
              Google Drive file access restricted. Please set file sharing to "Anyone with the link can view".
            </Text>
          </View>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: '#0B0F19',
    width: '100%',
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(11, 15, 25, 0.6)',
  },
  errorContainer: {
    padding: 24,
    backgroundColor: '#1F2937',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 320,
    borderWidth: 1,
    borderColor: '#374151',
  },
  errorIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  errorTitle: {
    color: '#F87171',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 6,
  },
  errorSubtitle: {
    color: '#9CA3AF',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
});
