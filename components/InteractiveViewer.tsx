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

  // Track values without triggering re-renders
  const currentScale = useRef(1.0);
  const currentPan = useRef({ x: 0, y: 0 });
  const initialDistance = useRef<number | null>(null);
  const scaleAtPinchStart = useRef(1.0);
  const lastTapTime = useRef(0);

  const getDistance = (touches: any[]) => {
    const [t1, t2] = touches;
    const dx = t1.pageX - t2.pageX;
    const dy = t1.pageY - t2.pageY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: (evt) => {
        // Double-tap detector
        const now = Date.now();
        if (now - lastTapTime.current < 300) {
          // Double tapped!
          const targetScale = currentScale.current > 1.5 ? 1.0 : 2.8;
          currentScale.current = targetScale;
          currentPan.current = { x: 0, y: 0 };

          Animated.parallel([
            Animated.spring(scale, {
              toValue: targetScale,
              useNativeDriver: true,
              friction: 7,
            }),
            Animated.spring(pan, {
              toValue: { x: 0, y: 0 },
              useNativeDriver: true,
              friction: 7,
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
        } else {
          pan.setOffset({
            x: currentPan.current.x,
            y: currentPan.current.y,
          });
          pan.setValue({ x: 0, y: 0 });
        }
      },

      onPanResponderMove: (evt, gestureState) => {
        // TWO-FINGER PINCH TO ZOOM
        if (evt.nativeEvent.touches.length === 2) {
          const distance = getDistance(evt.nativeEvent.touches);
          if (initialDistance.current && initialDistance.current > 0) {
            const factor = distance / initialDistance.current;
            let newScale = scaleAtPinchStart.current * factor;
            newScale = Math.max(minScale, Math.min(newScale, maxScale));
            currentScale.current = newScale;
            scale.setValue(newScale);
            if (onScaleChange) onScaleChange(newScale);
          }
        }
        // SINGLE-FINGER DRAG / PAN (only when zoomed in or moving)
        else if (evt.nativeEvent.touches.length === 1) {
          if (currentScale.current > 1.0) {
            pan.setValue({ x: gestureState.dx, y: gestureState.dy });
          }
        }
      },

      onPanResponderRelease: () => {
        pan.flattenOffset();
        // @ts-ignore
        currentPan.current = { x: pan.x._value || 0, y: pan.y._value || 0 };
        initialDistance.current = null;

        // Bounce back if scale went below minScale
        if (currentScale.current < minScale) {
          currentScale.current = minScale;
          Animated.spring(scale, {
            toValue: minScale,
            useNativeDriver: true,
          }).start();
        }

        // Limit pan boundaries so image doesn't fly off screen
        const maxPanX = (baseWidth * (currentScale.current - 1)) / 2 + 50;
        const maxPanY = (baseHeight * (currentScale.current - 1)) / 2 + 80;

        let boundedX = currentPan.current.x;
        let boundedY = currentPan.current.y;

        if (currentScale.current <= 1.0) {
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
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

