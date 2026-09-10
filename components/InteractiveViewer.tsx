import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Animated,
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
 * Pure Native React Native Interactive Viewer with Dynamic Orientation Support
 * Features:
 *  - Supports both Portrait and Landscape orientations dynamically
 *  - 2-Finger Fluid Pinch-to-Zoom using native animated transforms
 *  - 1-Finger Pan / Drag when zoomed in with boundary protection
 *  - Double-Tap quick zoom (1.0x <-> 2.6x)
 *  - 60/120 FPS hardware-accelerated animations (useNativeDriver: true)
 */
export default function InteractiveViewer({
  source,
  baseWidth: propWidth,
  baseHeight: propHeight,
  minScale = 1.0,
  maxScale = 5.0,
  scaleValue,
  onScaleChange,
}: Props) {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Dynamic responsive dimensions for portrait and landscape
  const baseWidth = propWidth ?? (windowWidth - 24);
  const baseHeight = propHeight ?? (windowHeight * (windowWidth > windowHeight ? 0.85 : 0.72));

  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const scale = useRef(new Animated.Value(1.0)).current;

  // Imperative state for gesture calculations
  const currentScale = useRef(1.0);
  const currentPan = useRef({ x: 0, y: 0 });
  const initialPinchDist = useRef<number | null>(null);
  const pinchStartScale = useRef(1.0);
  const pinchStartPan = useRef({ x: 0, y: 0 });
  const pinchStartCenter = useRef<{ x: number; y: number } | null>(null);
  const lastTapTime = useRef(0);

  // Sync external scale changes if provided
  useEffect(() => {
    if (scaleValue !== undefined && Math.abs(scaleValue - currentScale.current) > 0.05) {
      currentScale.current = scaleValue;
      if (scaleValue <= 1.05) {
        currentPan.current = { x: 0, y: 0 };
        Animated.parallel([
          Animated.spring(scale, {
            toValue: scaleValue,
            useNativeDriver: true,
            friction: 7,
          }),
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
            friction: 7,
          }),
        ]).start();
      } else {
        Animated.spring(scale, {
          toValue: scaleValue,
          useNativeDriver: true,
          friction: 7,
        }).start();
      }
    }
  }, [scaleValue]);

  const calcDistance = (t1: any, t2: any) => {
    const dx = t1.pageX - t2.pageX;
    const dy = t1.pageY - t2.pageY;
    return Math.hypot(dx, dy);
  };

  const calcCenter = (t1: any, t2: any) => ({
    x: (t1.pageX + t2.pageX) / 2,
    y: (t1.pageY + t2.pageY) / 2,
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponderCapture: (evt) => {
        return evt.nativeEvent.touches.length >= 2;
      },

      onPanResponderGrant: (evt) => {
        const touches = evt.nativeEvent.touches;

        // Double-tap handler
        const now = Date.now();
        if (touches.length === 1 && now - lastTapTime.current < 300) {
          const targetScale = currentScale.current > 1.3 ? 1.0 : 2.6;
          currentScale.current = targetScale;
          currentPan.current = { x: 0, y: 0 };

          Animated.parallel([
            Animated.spring(scale, {
              toValue: targetScale,
              useNativeDriver: true,
              friction: 6,
              tension: 40,
            }),
            Animated.spring(pan, {
              toValue: { x: 0, y: 0 },
              useNativeDriver: true,
              friction: 6,
              tension: 40,
            }),
          ]).start();

          if (onScaleChange) onScaleChange(targetScale);
          lastTapTime.current = 0;
          return;
        }
        lastTapTime.current = now;

        if (touches.length === 2) {
          initialPinchDist.current = calcDistance(touches[0], touches[1]);
          pinchStartScale.current = currentScale.current;
          pinchStartCenter.current = calcCenter(touches[0], touches[1]);
          pinchStartPan.current = { ...currentPan.current };
        } else {
          pan.setOffset({
            x: currentPan.current.x,
            y: currentPan.current.y,
          });
          pan.setValue({ x: 0, y: 0 });
        }
      },

      onPanResponderMove: (evt, gestureState) => {
        const touches = evt.nativeEvent.touches;

        // TWO-FINGER PINCH-TO-ZOOM
        if (touches.length === 2) {
          const dist = calcDistance(touches[0], touches[1]);

          if (!initialPinchDist.current || initialPinchDist.current <= 0) {
            initialPinchDist.current = dist;
            pinchStartScale.current = currentScale.current;
            pinchStartCenter.current = calcCenter(touches[0], touches[1]);
            pinchStartPan.current = { ...currentPan.current };
          } else {
            const factor = dist / initialPinchDist.current;
            let newScale = pinchStartScale.current * factor;
            newScale = Math.max(0.75, Math.min(newScale, maxScale));
            currentScale.current = newScale;
            scale.setValue(newScale);

            if (pinchStartCenter.current) {
              const currentCenter = calcCenter(touches[0], touches[1]);
              const dx = currentCenter.x - pinchStartCenter.current.x;
              const dy = currentCenter.y - pinchStartCenter.current.y;
              pan.setValue({
                x: pinchStartPan.current.x + dx,
                y: pinchStartPan.current.y + dy,
              });
            }

            if (onScaleChange) onScaleChange(newScale);
          }
        }
        // SINGLE-FINGER DRAG WHEN ZOOMED IN
        else if (touches.length === 1) {
          initialPinchDist.current = null;
          pinchStartCenter.current = null;

          if (currentScale.current > 1.05) {
            pan.setValue({ x: gestureState.dx, y: gestureState.dy });
          }
        }
      },

      onPanResponderRelease: () => {
        pan.flattenOffset();
        // @ts-ignore
        const finalX = pan.x._value ?? 0;
        // @ts-ignore
        const finalY = pan.y._value ?? 0;
        currentPan.current = { x: finalX, y: finalY };
        initialPinchDist.current = null;
        pinchStartCenter.current = null;

        // Auto bounce back if scale went below minScale
        if (currentScale.current < minScale) {
          currentScale.current = minScale;
          Animated.spring(scale, {
            toValue: minScale,
            useNativeDriver: true,
            friction: 7,
          }).start();
          if (onScaleChange) onScaleChange(minScale);
        }

        // Limit pan bounds to prevent losing image off screen
        const maxPanX = Math.max(0, (baseWidth * (currentScale.current - 1)) / 2 + 50);
        const maxPanY = Math.max(0, (baseHeight * (currentScale.current - 1)) / 2 + 80);

        let boundedX = currentPan.current.x;
        let boundedY = currentPan.current.y;

        if (currentScale.current <= 1.05) {
          boundedX = 0;
          boundedY = 0;
        } else {
          boundedX = Math.max(-maxPanX, Math.min(boundedX, maxPanX));
          boundedY = Math.max(-maxPanY, Math.min(boundedY, maxPanY));
        }

        currentPan.current = { x: boundedX, y: boundedY };
        Animated.spring(pan, {
          toValue: { x: boundedX, y: boundedY },
          useNativeDriver: true,
          friction: 7,
        }).start();
      },
    }),
  ).current;

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Animated.View
        style={[
          styles.imageWrapper,
          {
            transform: [
              { scale: scale },
              { translateX: pan.x },
              { translateY: pan.y },
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
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
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
