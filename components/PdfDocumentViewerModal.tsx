import React, { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    Modal,
    PanResponder,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useLanguage } from '@/context/LanguageContext';
import { MicrocontrollerDoc } from '@/data/microcontroller';
import { tr } from '@/data/translations';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type Props = {
  visible: boolean;
  doc: MicrocontrollerDoc | undefined;
  onClose: () => void;
};

export default function PdfDocumentViewerModal({
  visible,
  doc,
  onClose,
}: Props) {
  const { language } = useLanguage();
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [zoomScale, setZoomScale] = useState(1.0);

  const scaleAnim = useRef(new Animated.Value(1.0)).current;
  const panAnim = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const currentScale = useRef(1.0);
  const currentPan = useRef({ x: 0, y: 0 });
  const initialDistance = useRef<number | null>(null);
  const scaleAtPinchStart = useRef(1.0);
  const lastTapTime = useRef(0);
  const scrollViewRef = useRef<ScrollView>(null);

  if (!doc) return null;

  const totalPages = doc.pages.length;
  const basePageWidth = SCREEN_WIDTH - 20;
  const basePageHeight = (SCREEN_WIDTH - 20) * 1.33; // Standard 4:3 / A4 aspect ratio

  const getDistance = (touches: any[]) => {
    const [t1, t2] = touches;
    const dx = t1.pageX - t2.pageX;
    const dy = t1.pageY - t2.pageY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const applyScale = (newScale: number) => {
    const clamped = Math.max(1.0, Math.min(newScale, 4.0));
    currentScale.current = clamped;
    setZoomScale(clamped);
    Animated.spring(scaleAnim, {
      toValue: clamped,
      useNativeDriver: true,
      friction: 7,
    }).start();
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,

    onPanResponderGrant: (evt) => {
      // Double tap to toggle zoom
      const now = Date.now();
      if (now - lastTapTime.current < 300) {
        const target = currentScale.current > 1.3 ? 1.0 : 2.5;
        applyScale(target);
        currentPan.current = { x: 0, y: 0 };
        Animated.spring(panAnim, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true,
        }).start();
        lastTapTime.current = 0;
        return;
      }
      lastTapTime.current = now;

      if (evt.nativeEvent.touches.length === 2) {
        initialDistance.current = getDistance(evt.nativeEvent.touches);
        scaleAtPinchStart.current = currentScale.current;
      } else {
        panAnim.setOffset({
          x: currentPan.current.x,
          y: currentPan.current.y,
        });
        panAnim.setValue({ x: 0, y: 0 });
      }
    },

    onPanResponderMove: (evt, gestureState) => {
      // TWO-FINGER PINCH
      if (evt.nativeEvent.touches.length === 2) {
        const dist = getDistance(evt.nativeEvent.touches);
        if (initialDistance.current && initialDistance.current > 0) {
          const factor = dist / initialDistance.current;
          let calculated = scaleAtPinchStart.current * factor;
          calculated = Math.max(0.8, Math.min(calculated, 4.5));
          currentScale.current = calculated;
          scaleAnim.setValue(calculated);
          setZoomScale(calculated);
        }
      }
      // SINGLE-FINGER PAN WHEN ZOOMED IN
      else if (evt.nativeEvent.touches.length === 1 && currentScale.current > 1.0) {
        panAnim.setValue({ x: gestureState.dx, y: gestureState.dy });
      }
    },

    onPanResponderRelease: () => {
      panAnim.flattenOffset();
      // @ts-ignore
      currentPan.current = { x: panAnim.x._value || 0, y: panAnim.y._value || 0 };
      initialDistance.current = null;

      if (currentScale.current < 1.0) {
        applyScale(1.0);
      }

      if (currentScale.current <= 1.0) {
        currentPan.current = { x: 0, y: 0 };
        Animated.spring(panAnim, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const pageIndex = Math.min(
      Math.max(0, Math.floor((offsetY + 100) / (basePageHeight + 24))),
      totalPages - 1,
    );
    if (pageIndex !== activePageIndex) {
      setActivePageIndex(pageIndex);
    }
  };

  const scrollToPage = (idx: number) => {
    setActivePageIndex(idx);
    scrollViewRef.current?.scrollTo({
      y: idx * (basePageHeight + 24),
      animated: true,
    });
  };

  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.viewerContainer}>
        <SafeAreaView style={styles.safeArea}>
          {/* GOOGLE DRIVE STYLE TOP APP BAR */}
          <View style={styles.driveHeader}>
            <View style={styles.titleInfo}>
              <View style={styles.pdfIconBadge}>
                <Text style={styles.pdfIconText}>PDF</Text>
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.docTitle} numberOfLines={1}>
                  {doc.title}.pdf
                </Text>
                <Text style={styles.docSubtitle} numberOfLines={1}>
                  {doc.chipName} • {totalPages} {totalPages === 1 ? 'page' : 'pages'}
                </Text>
              </View>
            </View>

            <View style={styles.headerRight}>
              {/* Current Page Pill */}
              <View style={styles.pagePill}>
                <Text style={styles.pagePillText}>
                  {activePageIndex + 1} / {totalPages}
                </Text>
              </View>

              {/* Close Button */}
              <Pressable
                onPress={onClose}
                style={styles.closeBtn}
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              >
                <Text style={styles.closeBtnText}>✕</Text>
              </Pressable>
            </View>
          </View>

          {/* QUICK JUMP PAGE STRIP (For multi-page PDFs) */}
          {totalPages > 1 && (
            <View style={styles.pageStrip}>
              <Text style={styles.pageStripLabel}>
                📄 Jump to:
              </Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.pageStripRow}
              >
                {doc.pages.map((_, idx) => (
                  <Pressable
                    key={idx}
                    onPress={() => scrollToPage(idx)}
                    style={[
                      styles.stripBtn,
                      activePageIndex === idx && styles.stripBtnActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.stripBtnText,
                        activePageIndex === idx && styles.stripBtnTextActive,
                      ]}
                    >
                      {tr(language, 'page')} {idx + 1}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          )}

          {/* MAIN PDF CANVAS — GOOGLE DRIVE CONTINUOUS FEED WITH PINCH TO ZOOM */}
          <View style={styles.canvas} {...panResponder.panHandlers}>
            <ScrollView
              ref={scrollViewRef}
              style={styles.scrollCanvas}
              contentContainerStyle={styles.scrollCanvasContent}
              showsVerticalScrollIndicator={true}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              scrollEnabled={currentScale.current <= 1.05}
            >
              <Animated.View
                style={[
                  styles.animatedFeed,
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
                  <View key={index} style={styles.pageSheetWrapper}>
                    {/* Page Divider Label */}
                    <View style={styles.sheetHeader}>
                      <Text style={styles.sheetHeaderText}>
                        PAGE {index + 1} OF {totalPages}
                      </Text>
                    </View>

                    {/* Realistic White PDF Paper with Elevation Shadow */}
                    <View style={styles.paperSheet}>
                      <Image
                        source={pageSource}
                        style={{
                          width: basePageWidth,
                          height: basePageHeight,
                        }}
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                ))}
              </Animated.View>
            </ScrollView>
          </View>

          {/* FLOATING ZOOM CONTROLS (Google Drive Style Bottom HUD) */}
          <View style={styles.bottomHud}>
            <Pressable
              onPress={() => applyScale(currentScale.current + 0.5)}
              style={styles.hudBtn}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={styles.hudBtnText}>➕ Zoom</Text>
            </Pressable>

            <View style={styles.hudBadge}>
              <Text style={styles.hudBadgeText}>
                {Math.round(zoomScale * 100)}%
              </Text>
            </View>

            <Pressable
              onPress={() => applyScale(currentScale.current - 0.5)}
              style={styles.hudBtn}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={styles.hudBtnText}>➖ Zoom</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                applyScale(1.0);
                currentPan.current = { x: 0, y: 0 };
                Animated.spring(panAnim, {
                  toValue: { x: 0, y: 0 },
                  useNativeDriver: true,
                }).start();
              }}
              style={styles.hudResetBtn}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={styles.hudResetText}>⟲ Fit Page</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  viewerContainer: {
    flex: 1,
    backgroundColor: '#1E2228', // Google Drive PDF dark canvas background
  },

  safeArea: {
    flex: 1,
  },

  /* GOOGLE DRIVE TOP BAR */

  driveHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#16191D',
    borderBottomWidth: 1,
    borderBottomColor: '#282C34',
  },

  titleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 8,
  },

  pdfIconBadge: {
    backgroundColor: '#EA4335', // Google PDF red
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },

  pdfIconText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  docTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },

  docSubtitle: {
    color: '#9AA0A6',
    fontSize: 11,
    marginTop: 1,
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  pagePill: {
    backgroundColor: '#282C34',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3C4043',
  },

  pagePillText: {
    color: '#E8EAED',
    fontSize: 12,
    fontWeight: '800',
  },

  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3C4043',
    alignItems: 'center',
    justifyContent: 'center',
  },

  closeBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },

  /* QUICK JUMP PAGE STRIP */

  pageStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1D21',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#282C34',
  },

  pageStripLabel: {
    color: '#9AA0A6',
    fontSize: 11,
    fontWeight: '700',
    marginRight: 8,
  },

  pageStripRow: {
    flexDirection: 'row',
    gap: 6,
  },

  stripBtn: {
    backgroundColor: '#282C34',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#3C4043',
  },

  stripBtnActive: {
    backgroundColor: '#1A73E8', // Google Drive Blue
    borderColor: '#8AB4F8',
  },

  stripBtnText: {
    color: '#9AA0A6',
    fontSize: 11,
    fontWeight: '700',
  },

  stripBtnTextActive: {
    color: '#FFFFFF',
    fontWeight: '900',
  },

  /* CANVAS */

  canvas: {
    flex: 1,
    backgroundColor: '#202124',
  },

  scrollCanvas: {
    flex: 1,
  },

  scrollCanvasContent: {
    alignItems: 'center',
    paddingVertical: 14,
    paddingBottom: 70,
  },

  animatedFeed: {
    alignItems: 'center',
  },

  pageSheetWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },

  sheetHeader: {
    marginBottom: 6,
  },

  sheetHeaderText: {
    color: '#9AA0A6',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },

  /* REALISTIC PDF PAPER SHEET */

  paperSheet: {
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },

  /* BOTTOM HUD CONTROLS */

  bottomHud: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(32, 33, 36, 0.95)',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 24,
    gap: 8,
    borderWidth: 1,
    borderColor: '#3C4043',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  hudBtn: {
    backgroundColor: '#1A73E8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },

  hudBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },

  hudBadge: {
    backgroundColor: '#303134',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 10,
  },

  hudBadgeText: {
    color: '#8AB4F8',
    fontSize: 11,
    fontWeight: '900',
  },

  hudResetBtn: {
    backgroundColor: '#3C4043',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
  },

  hudResetText: {
    color: '#E8EAED',
    fontSize: 11,
    fontWeight: '700',
  },
});

