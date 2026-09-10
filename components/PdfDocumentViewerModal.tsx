import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
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
 * Engineered with a Dual-Axis Native Layout:
 *  - NO clipping: Top (y=0) and Bottom (full content height) are 100% accessible at any zoom level.
 *  - NO black space on left/right: Document width expands to fill the viewport and horizontal scroll view with white paper.
 *  - 100% Native 120 FPS vertical & horizontal scrolling powered by React Native ScrollView physics.
 *  - 2-finger fluid pinch-to-zoom & double-tap zoom toggle (1.0x <-> 2.0x).
 *  - Live page tracking & Google Drive HUD with jump buttons.
 */
export default function PdfDocumentViewerModal({
  visible,
  doc,
  onClose,
}: Props) {
  const { isHindi } = useLanguage();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const totalPages = doc?.pages?.length ?? 0;
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomScale, setZoomScale] = useState(1.0);

  // Base page dimensions: standard A4 proportion (1 : 1.414)
  const isLandscape = windowWidth > windowHeight;
  const baseWidth = isLandscape ? Math.min(windowWidth, 900) : windowWidth;
  const baseHeight = Math.round(baseWidth * 1.414);

  // Scaled dimensions that dynamically resize content without clipping
  const displayWidth = Math.round(baseWidth * zoomScale);
  const displayHeight = Math.round(baseHeight * zoomScale);
  const displayItemHeight = displayHeight + 16; // Page height + margin

  const scrollViewRef = useRef<ScrollView>(null);
  const horizontalScrollRef = useRef<ScrollView>(null);
  const currentScrollY = useRef(0);
  const lastTapTime = useRef(0);

  // Pinch gesture tracking
  const initialDistance = useRef<number | null>(null);
  const pinchStartScale = useRef(1.0);
  const zoomScaleRef = useRef(1.0);

  // Reset when new document opens
  useEffect(() => {
    if (visible) {
      setCurrentPage(1);
      setZoomScale(1.0);
      zoomScaleRef.current = 1.0;
      currentScrollY.current = 0;
    }
  }, [visible, doc?.chipName]);

  const updateZoom = (nextScale: number) => {
    const clamped = Math.min(Math.max(nextScale, 1.0), 3.2);
    const oldScale = zoomScaleRef.current;
    zoomScaleRef.current = clamped;
    setZoomScale(clamped);

    // Smoothly preserve relative scroll position
    if (scrollViewRef.current && oldScale > 0) {
      const ratio = clamped / oldScale;
      const targetY = currentScrollY.current * ratio;
      currentScrollY.current = targetY;
      scrollViewRef.current.scrollTo({ y: targetY, animated: false });
    }

    if (clamped <= 1.05 && horizontalScrollRef.current) {
      horizontalScrollRef.current.scrollTo({ x: 0, animated: true });
    }
  };

  // Scroll to a specific page
  const scrollToPage = (pageNumber: number) => {
    const targetY = (pageNumber - 1) * displayItemHeight;
    scrollViewRef.current?.scrollTo({ y: targetY, animated: true });
    setCurrentPage(pageNumber);
  };

  // Track vertical scroll to update current page indicator in real time
  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    currentScrollY.current = offsetY;
    const computed = Math.min(
      totalPages,
      Math.max(1, Math.floor((offsetY + displayItemHeight * 0.35) / displayItemHeight) + 1)
    );
    if (computed !== currentPage) {
      setCurrentPage(computed);
    }
  };

  const getTouchDistance = (t1: any, t2: any) => {
    const dx = t1.pageX - t2.pageX;
    const dy = t1.pageY - t2.pageY;
    return Math.hypot(dx, dy);
  };

  // Double-tap handler on pages
  const handlePageDoubleTap = () => {
    const now = Date.now();
    if (now - lastTapTime.current < 350 && now - lastTapTime.current > 40) {
      if (zoomScaleRef.current > 1.2) {
        updateZoom(1.0);
      } else {
        updateZoom(2.0);
      }
      lastTapTime.current = 0;
    } else {
      lastTapTime.current = now;
    }
  };

  // 2-Finger Pinch-to-Zoom PanResponder (only intercepts multi-touch; leaves 1-finger scroll untouched)
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt) => evt.nativeEvent.touches.length >= 2,
      onMoveShouldSetPanResponder: (evt) => evt.nativeEvent.touches.length >= 2,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponderCapture: (evt) => evt.nativeEvent.touches.length >= 2,

      onPanResponderGrant: (evt) => {
        if (evt.nativeEvent.touches.length >= 2) {
          initialDistance.current = getTouchDistance(
            evt.nativeEvent.touches[0],
            evt.nativeEvent.touches[1]
          );
          pinchStartScale.current = zoomScaleRef.current;
        }
      },

      onPanResponderMove: (evt) => {
        if (evt.nativeEvent.touches.length >= 2) {
          const dist = getTouchDistance(
            evt.nativeEvent.touches[0],
            evt.nativeEvent.touches[1]
          );
          if (!initialDistance.current || initialDistance.current <= 0) {
            initialDistance.current = dist;
            pinchStartScale.current = zoomScaleRef.current;
            return;
          }
          const ratio = dist / initialDistance.current;
          const target = Math.min(Math.max(pinchStartScale.current * ratio, 1.0), 3.2);
          updateZoom(Number(target.toFixed(2)));
        }
      },

      onPanResponderRelease: () => {
        initialDistance.current = null;
      },
      onPanResponderTerminate: () => {
        initialDistance.current = null;
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
            GOOGLE DRIVE TOP HEADER BAR
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

            {/* Red PDF Badge */}
            <View style={styles.pdfBadge}>
              <Text style={styles.pdfBadgeText}>PDF</Text>
            </View>

            {/* Document Title & Subtitle */}
            <View style={styles.titleWrapper}>
              <Text style={styles.docTitle} numberOfLines={1}>
                {doc.chipName} Pinout.pdf
              </Text>
              <Text style={styles.docSubtitle} numberOfLines={1}>
                {totalPages} {isHindi ? 'पेज' : 'pages'} • {doc.title}
              </Text>
            </View>
          </View>

          {/* Header Controls */}
          <View style={styles.headerRight}>
            {/* Page Counter Pill */}
            <View style={styles.pagePill}>
              <Text style={styles.pagePillText}>
                {currentPage} / {totalPages}
              </Text>
            </View>

            {/* Reset / Fit-to-Width Button */}
            {zoomScale > 1.05 && (
              <Pressable
                onPress={() => updateZoom(1.0)}
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
            DUAL-AXIS NATIVE SCROLL CANVAS (ZERO CLIPPING & ZERO BLACK SPACE)
            ========================================================= */}
        <View style={styles.canvasContainer} {...panResponder.panHandlers}>
          <ScrollView
            ref={horizontalScrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
            style={styles.horizontalScrollView}
            contentContainerStyle={[
              styles.horizontalContent,
              { width: Math.max(displayWidth, windowWidth) },
            ]}
          >
            <ScrollView
              ref={scrollViewRef}
              style={{ width: displayWidth, flex: 1 }}
              contentContainerStyle={[
                styles.verticalContent,
                { width: displayWidth },
              ]}
              showsVerticalScrollIndicator={true}
              indicatorStyle="white"
              onScroll={handleScroll}
              scrollEventThrottle={16}
              nestedScrollEnabled={true}
              bounces={true}
            >
              {doc.pages.map((pageSource, index) => (
                <Pressable
                  key={`page-${index}`}
                  onPress={handlePageDoubleTap}
                  style={[
                    styles.pageCard,
                    {
                      width: displayWidth,
                      height: displayHeight,
                      marginBottom: index === totalPages - 1 ? 120 : 16,
                    },
                  ]}
                >
                  <PdfPageImage
                    source={pageSource}
                    width={displayWidth}
                    height={displayHeight}
                  />

                  {/* Page Footer Watermark */}
                  <View style={styles.pageFooter}>
                    <Text style={styles.pageFooterText}>
                      — {isHindi ? `पेज ${index + 1} / ${totalPages}` : `Page ${index + 1} of ${totalPages}`} —
                    </Text>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </ScrollView>
        </View>

        {/* =========================================================
            FLOATING GOOGLE DRIVE BOTTOM ACTION HUD
            ========================================================= */}
        <View style={styles.floatingHud}>
          {/* Previous Page */}
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

          {/* Current Page Pill */}
          <View style={styles.hudPageBadge}>
            <Text style={styles.hudPageText}>
              {isHindi ? `पेज ${currentPage} / ${totalPages}` : `${currentPage} of ${totalPages}`}
            </Text>
          </View>

          {/* Next Page */}
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
            onPress={() => updateZoom(zoomScale - 0.3)}
            style={({ pressed }) => [styles.hudBtn, pressed && styles.btnPressed]}
          >
            <Text style={styles.hudBtnText}>−</Text>
          </Pressable>

          {/* Zoom Percent / Reset */}
          <Pressable
            onPress={() => (zoomScale > 1.05 ? updateZoom(1.0) : updateZoom(2.0))}
            style={({ pressed }) => [styles.hudPercentBtn, pressed && styles.btnPressed]}
          >
            <Text style={styles.hudPercentText}>
              {Math.round(zoomScale * 100)}%
            </Text>
          </Pressable>

          {/* Zoom In */}
          <Pressable
            onPress={() => updateZoom(zoomScale + 0.3)}
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
 * Individual Page Image Renderer with loader & error handling
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

  /* CANVAS & SCROLL CONTENT */
  canvasContainer: {
    flex: 1,
    backgroundColor: '#1E1E20',
    width: '100%',
  },

  horizontalScrollView: {
    flex: 1,
    width: '100%',
  },

  horizontalContent: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  verticalContent: {
    paddingTop: 0,
    paddingBottom: 20,
  },

  pageCard: {
    backgroundColor: '#FFFFFF', // Clean White A4 Paper Sheet
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