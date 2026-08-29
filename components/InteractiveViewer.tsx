import React, { useRef } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ImageSourcePropType,
  PanResponder,
  StyleSheet,
  View,
} from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type Props = {
  source: ImageSourcePropType;
  baseWidth?: number;
  baseHeight?: number;
  minScale?: number;
  maxScale?: number;
  onScaleChange?: (scale: number) => void;
};

export default function InteractiveViewer({
  source,
  baseWidth = SCREEN_WIDTH - 24,
  baseHeight = SCREEN_HEIGHT * 0.72,
  minScale = 1.0,
  maxScale = 5.0,
  onScaleChange,
}: Props) {
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const scale = useRef(new Animated.Value(1.0)).current;

  // Track values imperatively
  const currentScale = useRef(1.0);
  const currentPan = useRef({ x: 0, y: 0 });
  const initialDistance = useRef<number | null>(null);
  const scaleAtPinchStart = useRef(1.0);
  const panAtPinchStart = useRef({ x: 0, y: 0 });
  const initialCenter = useRef<{ x: number; y: number } | null>(null);
  const lastTapTime = useRef(0);

  const getDistance = (touches: any[]) => {
    const [t1, t2] = touches;
    const dx = t1.pageX - t2.pageX;
    const dy = t1.pageY - t2.pageY;
    return Math.hypot(dx, dy);
  };

  const getCenter = (touches: any[]) => {
    const [t1, t2] = touches;
    return {
      x: (t1.pageX + t2.pageX) / 2,
      y: (t1.pageY + t2.pageY) / 2,
    };
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponderCapture: (evt) => evt.nativeEvent.touches.length >= 2,

      onPanResponderGrant: (evt) => {
        // Handle double-tap
        const now = Date.now();
        if (now - lastTapTime.current < 300) {
          const targetScale = currentScale.current > 1.4 ? 1.0 : 2.5;
          currentScale.current = targetScale;
          currentPan.current = { x: 0, y: 0 };

          Animated.parallel([
            Animated.spring(scale, {
              toValue: targetScale,
              useNativeDriver: true,
              friction: 6,
            }),
            Animated.spring(pan, {
              toValue: { x: 0, y: 0 },
              useNativeDriver: true,
              friction: 6,
            }),
          ]).start();

          if (onScaleChange) onScaleChange(targetScale);
          lastTapTime.current = 0;
          return;
        }
        lastTapTime.current = now;

        if (evt.nativeEvent.touches.length === 2) {
          initialDistance.current = getDistance(evt.nativeEvent.touches);
          scaleAtPinchStart.current = currentScale.current;
          initialCenter.current = getCenter(evt.nativeEvent.touches);
          panAtPinchStart.current = { ...currentPan.current };
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

        // TWO-FINGER PINCH TO ZOOM & PAN
        if (touches.length === 2) {
          const distance = getDistance(touches);

          if (!initialDistance.current || initialDistance.current <= 0) {
            initialDistance.current = distance;
            scaleAtPinchStart.current = currentScale.current;
            initialCenter.current = getCenter(touches);
            panAtPinchStart.current = { ...currentPan.current };
          } else {
            const factor = distance / initialDistance.current;
            let newScale = scaleAtPinchStart.current * factor;
            newScale = Math.max(0.8, Math.min(newScale, maxScale));
            currentScale.current = newScale;
            scale.setValue(newScale);

            if (initialCenter.current) {
              const currentCenter = getCenter(touches);
              const dx = currentCenter.x - initialCenter.current.x;
              const dy = currentCenter.y - initialCenter.current.y;
              pan.setValue({
                x: panAtPinchStart.current.x + dx,
                y: panAtPinchStart.current.y + dy,
              });
            }

            if (onScaleChange) onScaleChange(newScale);
          }
        }
        // SINGLE-FINGER DRAG WHEN ZOOMED IN
        else if (touches.length === 1) {
          initialDistance.current = null;
          initialCenter.current = null;

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
        initialDistance.current = null;
        initialCenter.current = null;

        // Auto snap-back if zoomed out beyond 1.0
        if (currentScale.current < minScale) {
          currentScale.current = minScale;
          Animated.spring(scale, {
            toValue: minScale,
            useNativeDriver: true,
            friction: 7,
          }).start();
          if (onScaleChange) onScaleChange(minScale);
        }

        // Keep inside screen bounds
        const maxPanX = Math.max(0, (baseWidth * (currentScale.current - 1)) / 2 + 40);
        const maxPanY = Math.max(0, (baseHeight * (currentScale.current - 1)) / 2 + 60);

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
        />
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
});
