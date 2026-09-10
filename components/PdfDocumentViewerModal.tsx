import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Animated,
    Easing,
    Image,
    Modal,
    NativeScrollEvent,
    NativeSyntheticEvent,
    PanResponder,
    Platform,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useLanguage } from '@/context/LanguageContext';
import { MicrocontrollerDoc } from '@/data/microcontroller';

type Props = {
  visible: boolean;
  doc: MicrocontrollerDoc | undefined;
  onClose: () => void;
};

/**
 * Native Google Drive-Style PDF Document Viewer.
 *
 * Enhanced for:
 *  - Zero left/right dead space: Page fills 100% of viewport width in portrait.
 *  - Strict horizontal edge clamping: When zoomed, PDF content stays flush to screen edges with zero gutters.
 *  - 60/120 FPS buttery smooth animations: Gestures update native Animated values without re-rendering component state on touch moves.
 *  - Continuous vertical multi-page scroll.
 *  - Double-tap quick zoom toggle (1.0x <-> 2.2x).
 *  - Floating Google Drive HUD with page indicator and zoom controls.
 */
export default function PdfDocumentViewerModal({
  visible,
  doc,
  onClose,
}: Props) {
  const { isHindi } = useLanguage();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  // Full edge-to-edge width in portrait to eliminate left/right white/black gutters
  const isLandscape = windowWidth > windowHeight;
  const pageWidth = isLandscape ? Math.min(windowWidth, 900) : windowWidth;
  const pageHeight = Math.round(pageWidth * 1.414); // Standard A4 proportion
  const pageItemHeight = pageHeight + 12; // Page height + vertical separator

  const totalPages = doc?.pages?.length ?? 0;
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(1.0);

  // Animated values for hardware-accelerated zoom and pan
  const scaleAnim = useRef(new Animated.Value(1.0)).current;
  const panAnim = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  // Imperative refs for gestures
  const currentScale = useRef(1.0);
  const currentPan = useRef({ x: 0, y: 0 });
  const initialDistance = useRef<number | null>(null);
  const pinchStartScale = useRef(1.0);
  const pinchStartPan = useRef({ x: 0, y: 0 });
  const lastTapTime = useRef(0);

  const scrollViewRef = useRef<ScrollView>(null);

  // Reset state when doc opens
  useEffect(() => {
    if (visible) {
      setCurrentPage(1);
      resetZoom(false);
    }
  }, [visible, doc?.chipName]);

  const resetZoom = (animated = true) => {
    currentScale.current = 1.0;
    currentPan.current = { x: 0, y: 0 };
    setZoomLevel(1.0);

    if (animated) {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1.0,
          duration: 220,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(panAnim, {
          toValue: { x: 0, y: 0 },
          duration: 220,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      scaleAnim.setValue(1.0);
      panAnim.setValue({ x: 0, y: 0 });
    }
  };

  const applyZoom = (targetScale: number) => {
    const clamped = Math.min(Math.max(targetScale, 1.0), 4.0);
    currentScale.current = clamped;
    setZoomLevel(clamped);

    if (clamped <= 1.05) {
      currentPan.current = { x: 0, y: 0 };
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1.0,
          duration: 220,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(panAnim, {
          toValue: { x: 0, y: 0 },
          duration: 220,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.timing(scaleAnim, {
        toValue: clamped,
        duration: 220,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    }
  };

  // Scroll to specific page
  const scrollToPage = (pageNumber: number) => {
    const targetY = (pageNumber - 1) * pageItemHeight;
    scrollViewRef.current?.scrollTo({ y: targetY, animated: true });
    setCurrentPage(pageNumber);
  };

  // Handle vertical scroll to update current page indicator dynamically
  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    const computed = Math.min(
      totalPages,
      Math.max(1, Math.floor((offsetY + pageItemHeight * 0.35) / pageItemHeight) + 1)
    );
    if (computed !== currentPage) {
      setCurrentPage(computed);
    }
  };

  // Distance helper for pinch
  const getTouchDistance = (t1: any, t2: any) => {
    const dx = t1.pageX - t2.pageX;
    const dy = t1.pageY - t2.pageY;
    return Math.hypot(dx, dy);
  };

  // Double-tap handler for zoom toggle
  const handlePageTap = () => {
    const now = Date.now();
    if (now - lastTapTime.current < 280) {
      if (currentScale.current > 1.2) {
        resetZoom(true);
      } else {
        applyZoom(2.2);
      }
      lastTapTime.current = 0;
    } else {
      lastTapTime.current = now;
    }
  };

  // PanResponder for Google Drive Pinch & Pan gestures
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

        if (touches.length >= 2) {
          initialDistance.current = getTouchDistance(touches[0], touches[1]);
          pinchStartScale.current = currentScale.current;
          pinchStartPan.current = { ...currentPan.current };
        } else if (currentScale.current > 1.05) {
          pinchStartPan.current = { ...currentPan.current };
          panAnim.setValue({ x: currentPan.current.x, y: currentPan.current.y });
        }
      },

      onPanResponderMove: (evt, gestureState) => {
        const touches = evt.nativeEvent.touches;

        // 2-FINGER FLUID PINCH-TO-ZOOM (No setState during motion for 60/120 FPS smoothness)
        if (touches.length >= 2 && initialDistance.current) {
          const currentDist = getTouchDistance(touches[0], touches[1]);
          const ratio = currentDist / initialDistance.current;
          const nextScale = Math.min(Math.max(pinchStartScale.current * ratio, 1.0), 4.0);

          currentScale.current = nextScale;
          scaleAnim.setValue(nextScale);
          return;
        }

        // 1-FINGER DRAG WHEN ZOOMED IN
        if (touches.length === 1 && currentScale.current > 1.05) {
          // Strict edge bounding: No empty dead gutters on left/right
          const maxPanX = ((currentScale.current - 1) * pageWidth) / 2;
          const maxPanY = ((currentScale.current - 1) * pageHeight) / 2;

          let targetX = pinchStartPan.current.x + gestureState.dx;
          let targetY = pinchStartPan.current.y + gestureState.dy;

          // Clamp strictly so the page never pulls away from viewport edges
          targetX = Math.min(Math.max(targetX, -maxPanX), maxPanX);
          targetY = Math.min(Math.max(targetY, -maxPanY), maxPanY);

          panAnim.setValue({ x: targetX, y: targetY });
        }
      },

      onPanResponderRelease: () => {
        initialDistance.current = null;

        if (currentScale.current <= 1.05) {
          resetZoom(true);
        } else {
          // @ts-ignore
          const finalX = panAnim.x._value ?? currentPan.current.x;
          // @ts-ignore
          const finalY = panAnim.y._value ?? currentPan.current.y;
          currentPan.current = { x: finalX, y: finalY };
          setZoomLevel(currentScale.current);
        }
      },
    })
  ).current;

  if (!doc) return null;

  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="fade"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <StatusBar barStyle="light-content" backgroundColor="#18181B" />
      <SafeAreaView edges={['top', 'left', 'right', 'bottom']} style={styles.safeArea}>
        {/* =========================================================
            GOOGLE DRIVE HEADER BAR
            ========================================================= */}
        <View style={styles.headerBar}>
          <View style={styles.headerLeft}>
            {/* Back Arrow */}
            <Pressable
              onPress={onClose}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              style={({ pressed }) => [styles.backBtn, pressed && styles.btnPressed]}
              accessibilityRole="button"
              accessibilityLabel="Back to inverter"
            >
              <Text style={styles.backIcon}>←</Text>
            </Pressable>

            {/* Red PDF Chip Badge */}
            <View style={styles.pdfBadge}>
              <Text style={styles.pdfBadgeText}>PDF</Text>
            </View>

            {/* Title & Subtitle */}
            <View style={styles.titleWrapper}>
              <Text style={styles.docTitle} numberOfLines={1}>
                {doc.chipName} Pinout.pdf
              </Text>
              <Text style={styles.docSubtitle} numberOfLines={1}>
                {totalPages} {isHindi ? 'पेज' : 'pages'} • {doc.title}
              </Text>
            </View>
          </View>

          {/* Right Header Actions */}
          <View style={styles.headerRight}>
            {/* Page Pill Counter */}
            <View style={styles.pagePill}>
              <Text style={styles.pagePillText}>
                {currentPage} / {totalPages}
              </Text>
            </View>

            {/* Reset / Fit Width */}
            {zoomLevel > 1.05 && (
              <Pressable
                onPress={() => resetZoom(true)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                style={({ pressed }) => [styles.toolBtn, pressed && styles.btnPressed]}
                accessibilityLabel="Fit to width"
              >
                <Text style={styles.toolIcon}>⤢</Text>
              </Pressable>
            )}

            {/* Close Button */}
            <Pressable
              onPress={onClose}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              style={({ pressed }) => [styles.closeBtn, pressed && styles.btnPressed]}
              accessibilityRole="button"
              accessibilityLabel="Close document"
            >
              <Text style={styles.closeIcon}>✕</Text>
            </Pressable>
          </View>
        </View>

        {/* =========================================================
            CONTINUOUS VERTICAL MULTI-PAGE CANVAS (EDGE-TO-EDGE)
            ========================================================= */}
        <View style={styles.canvasContainer}>
          <ScrollView
            ref={scrollViewRef}
            style={styles.scrollView}
            scrollEnabled={zoomLevel <= 1.05}
            showsVerticalScrollIndicator={true}
            indicatorStyle="white"
            contentContainerStyle={styles.scrollContent}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            nestedScrollEnabled={true}
          >
            <Animated.View
              {...panResponder.panHandlers}
              style={[
                styles.animatedWrapper,
                {
                  transform: [
                    { scale: scaleAnim },
                    { translateX: panAnim.x },
                    { translateY: panAnim.y },
                  ],
                },
              ]}
            >
              {doc.pages.map((pageSource, index) => (
                <Pressable
                  key={`page-${index}`}
                  onPress={handlePageTap}
                  style={[
                    styles.pageCard,
                    {
                      width: pageWidth,
                      height: pageHeight,
                      marginBottom: index === totalPages - 1 ? 120 : 12,
                    },
                  ]}
                >
                  <PdfPageImage
                    source={pageSource}
                    width={pageWidth}
                    height={pageHeight}
                  />

                  {/* Page Footer Watermark */}
                  <View style={styles.pageFooter}>
                    <Text style={styles.pageFooterText}>
                      — {isHindi ? `पेज ${index + 1} / ${totalPages}` : `Page ${index + 1} of ${totalPages}`} —
                    </Text>
                  </View>
                </Pressable>
              ))}
            </Animated.View>
          </ScrollView>
        </View>

        {/* =========================================================
            FLOATING GOOGLE DRIVE BOTTOM ACTION HUD
            ========================================================= */}
        <View style={styles.floatingHud}>
          {/* Quick Page Prev */}
          {totalPages > 1 && (
            <Pressable
              disabled={currentPage <= 1}
              onPress={() => scrollToPage(currentPage - 1)}
              style={({ pressed }) => [
                styles.hudBtn,
                currentPage <= 1 && styles.hudBtnDisabled,
                pressed && styles.btnPressed,
              ]}
            >
              <Text style={styles.hudBtnIcon}>◀</Text>
            </Pressable>
          )}

          {/* Current Page Indicator */}
          <View style={styles.hudPageBadge}>
            <Text style={styles.hudPageText}>
              {isHindi ? `पेज ${currentPage} / ${totalPages}` : `${currentPage} of ${totalPages}`}
            </Text>
          </View>

          {/* Quick Page Next */}
          {totalPages > 1 && (
            <Pressable
              disabled={currentPage >= totalPages}
              onPress={() => scrollToPage(currentPage + 1)}
              style={({ pressed }) => [
                styles.hudBtn,
                currentPage >= totalPages && styles.hudBtnDisabled,
                pressed && styles.btnPressed,
              ]}
            >
              <Text style={styles.hudBtnIcon}>▶</Text>
            </Pressable>
          )}

          {/* Divider */}
          <View style={styles.hudDivider} />

          {/* Zoom Out */}
          <Pressable
            onPress={() => applyZoom(zoomLevel - 0.4)}
            style={({ pressed }) => [styles.hudBtn, pressed && styles.btnPressed]}
          >
            <Text style={styles.hudBtnText}>−</Text>
          </Pressable>

          {/* Zoom Percent / Reset */}
          <Pressable
            onPress={() => (zoomLevel > 1.05 ? resetZoom(true) : applyZoom(2.2))}
            style={({ pressed }) => [styles.hudPercentBtn, pressed && styles.btnPressed]}
          >
            <Text style={styles.hudPercentText}>
              {Math.round(zoomLevel * 100)}%
            </Text>
          </Pressable>

          {/* Zoom In */}
          <Pressable
            onPress={() => applyZoom(zoomLevel + 0.4)}
            style={({ pressed }) => [styles.hudBtn, pressed && styles.btnPressed]}
          >
            <Text style={styles.hudBtnText}>+</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

/**
 * Individual Page Image Renderer with loader and error boundary
 */
function PdfPageImage({
  source,
  width,
  height,
}: {
  source: any;
  width: number;
  height: number;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <View style={[styles.pageImageWrapper, { width, height }]}>
      <Image
        source={source}
        style={{ width, height: height - 26 }}
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
        <View style={styles.pageLoader}>
          <ActivityIndicator size="large" color="#4285F4" />
        </View>
      )}

      {hasError && (
        <View style={styles.pageError}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorText}>Unable to load document page</Text>
        </View>
      )}
    </View>
  );
}

/* =========================================================
   GOOGLE DRIVE STYLES
   ========================================================= */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#18181B',
  },

  /* TOP HEADER BAR */
  headerBar: {
    height: 56,
    backgroundColor: '#18181B',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#27272A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    zIndex: 10,
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },

  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },

  backIcon: {
    color: '#E4E4E7',
    fontSize: 22,
    fontWeight: '400',
    marginTop: -2,
  },

  pdfBadge: {
    backgroundColor: '#EA4335', // Google Drive PDF Red
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
    marginRight: 8,
  },

  pdfBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  titleWrapper: {
    flex: 1,
  },

  docTitle: {
    color: '#FAFAFA',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: -0.2,
  },

  docSubtitle: {
    color: '#A1A1AA',
    fontSize: 11,
    marginTop: 1,
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  pagePill: {
    backgroundColor: '#27272A',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#3F3F46',
  },

  pagePillText: {
    color: '#F4F4F5',
    fontSize: 11,
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },

  toolBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#27272A',
    alignItems: 'center',
    justifyContent: 'center',
  },

  toolIcon: {
    color: '#E4E4E7',
    fontSize: 15,
    fontWeight: 'bold',
  },

  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#27272A',
    alignItems: 'center',
    justifyContent: 'center',
  },

  closeIcon: {
    color: '#E4E4E7',
    fontSize: 13,
    fontWeight: '700',
  },

  btnPressed: {
    opacity: 0.7,
    backgroundColor: '#3F3F46',
  },

  /* CANVAS & SCROLL CONTENT (EDGE-TO-EDGE) */
  canvasContainer: {
    flex: 1,
    backgroundColor: '#1E1E20',
    width: '100%',
  },

  scrollView: {
    flex: 1,
    width: '100%',
  },

  scrollContent: {
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: 20,
    width: '100%',
  },

  animatedWrapper: {
    alignItems: 'center',
    width: '100%',
  },

  pageCard: {
    backgroundColor: '#FFFFFF', // Full width white paper sheet
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderBottomColor: '#27272A',
  },

  pageImageWrapper: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  pageFooter: {
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#FAFAFA',
  },

  pageFooterText: {
    color: '#6B7280',
    fontSize: 10,
    fontWeight: '500',
  },

  pageLoader: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
  },

  pageError: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEE2E2',
    padding: 16,
  },

  errorIcon: {
    fontSize: 28,
    marginBottom: 6,
  },

  errorText: {
    color: '#DC2626',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },

  /* FLOATING GOOGLE DRIVE BOTTOM ACTION HUD */
  floatingHud: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(24, 24, 27, 0.94)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#3F3F46',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 10,
    elevation: 10,
    gap: 5,
  },

  hudBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#27272A',
    alignItems: 'center',
    justifyContent: 'center',
  },

  hudBtnDisabled: {
    opacity: 0.35,
  },

  hudBtnIcon: {
    color: '#F4F4F5',
    fontSize: 11,
  },

  hudBtnText: {
    color: '#F4F4F5',
    fontSize: 17,
    fontWeight: '600',
    marginTop: -2,
  },

  hudPageBadge: {
    paddingHorizontal: 6,
    paddingVertical: 3,
  },

  hudPageText: {
    color: '#E4E4E7',
    fontSize: 11,
    fontWeight: '600',
  },

  hudDivider: {
    width: 1,
    height: 16,
    backgroundColor: '#3F3F46',
    marginHorizontal: 3,
  },

  hudPercentBtn: {
    backgroundColor: '#09090B',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#3F3F46',
  },

  hudPercentText: {
    color: '#60A5FA',
    fontSize: 11,
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
});