import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import InteractiveViewer from '@/components/InteractiveViewer';
import { useLanguage } from '@/context/LanguageContext';
import { MicrocontrollerDoc } from '@/data/microcontroller';
import { tr } from '@/data/translations';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get('window');

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

  /*
   * Reset page/zoom when a different document is opened.
   */
  useEffect(() => {
    if (visible) {
      setActivePageIndex(0);
      setZoomScale(1.0);
    }
  }, [visible, doc?.chipName]);

  if (!doc) {
    return null;
  }

  const totalPages = doc.pages.length;

  const goToPage = (index: number) => {
    if (index < 0 || index >= totalPages) {
      return;
    }

    setActivePageIndex(index);
    setZoomScale(1.0);
  };

  const previousPage = () => {
    goToPage(Math.max(0, activePageIndex - 1));
  };

  const nextPage = () => {
    goToPage(Math.min(totalPages - 1, activePageIndex + 1));
  };

  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="fade"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <View style={styles.viewerContainer}>
        <SafeAreaView style={styles.safeArea}>
          {/* =================================================
              GOOGLE DRIVE STYLE TOP BAR
              ================================================= */}
          <View style={styles.driveHeader}>
            {/* LEFT SIDE */}
            <View style={styles.titleInfo}>
              <View style={styles.pdfIconBadge}>
                <Text style={styles.pdfIconText}>PDF</Text>
              </View>

              <View style={styles.titleTextContainer}>
                <Text
                  style={styles.docTitle}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {doc.chipName} —{' '}
                  {language === 'hi'
                    ? 'पिन विवरण'
                    : 'Pin Details'}
                </Text>

                <Text
                  style={styles.docSubtitle}
                  numberOfLines={1}
                  ellipsizeMode="middle"
                >
                  {doc.title}.pdf
                </Text>
              </View>
            </View>

            {/* RIGHT SIDE */}
            <View style={styles.headerRight}>
              {/* PAGE NUMBER */}
              <View style={styles.pagePill}>
                <Text style={styles.pagePillText}>
                  {activePageIndex + 1} / {totalPages}
                </Text>
              </View>

              {/* PROTECTED BADGE */}
              <View style={styles.protectedBadge}>
                <Text style={styles.protectedIcon}>🔒</Text>
              </View>

              {/* CLOSE */}
              <Pressable
                onPress={onClose}
                style={({ pressed }) => [
                  styles.closeBtn,
                  pressed && styles.closeBtnPressed,
                ]}
                hitSlop={{
                  top: 12,
                  bottom: 12,
                  left: 12,
                  right: 12,
                }}
                accessibilityRole="button"
                accessibilityLabel={
                  language === 'hi'
                    ? 'बंद करें'
                    : 'Close document'
                }
              >
                <Text style={styles.closeBtnText}>✕</Text>
              </Pressable>
            </View>
          </View>

          {/* =================================================
              QUICK PAGE STRIP
              ================================================= */}
          {totalPages > 1 && (
            <View style={styles.pageStrip}>
              <Text style={styles.pageStripLabel}>
                📄 {tr(language, 'page')}:
              </Text>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.pageStripRow}
              >
                {doc.pages.map((_, idx) => {
                  const isActive =
                    activePageIndex === idx;

                  return (
                    <Pressable
                      key={idx}
                      onPress={() => goToPage(idx)}
                      style={({ pressed }) => [
                        styles.stripBtn,
                        isActive &&
                          styles.stripBtnActive,
                        pressed &&
                          styles.stripBtnPressed,
                      ]}
                      accessibilityRole="button"
                      accessibilityLabel={`Page ${idx + 1}`}
                    >
                      <Text
                        style={[
                          styles.stripBtnText,
                          isActive &&
                            styles.stripBtnTextActive,
                        ]}
                      >
                        {tr(language, 'page')} {idx + 1}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>
          )}

          {/* =================================================
              DOCUMENT CANVAS
              ================================================= */}
          <View style={styles.canvasWrapper}>
            <View style={styles.paperShadowWrapper}>
              <InteractiveViewer
                key={`${doc.chipName}-page-${activePageIndex}`}
                source={doc.pages[activePageIndex]}
                scaleValue={zoomScale}
                onScaleChange={setZoomScale}
              />
            </View>
          </View>

          {/* =================================================
              BOTTOM GOOGLE DRIVE STYLE HUD
              ================================================= */}
          <View style={styles.bottomHud}>
            {/* PREVIOUS PAGE */}
            {totalPages > 1 && (
              <Pressable
                disabled={activePageIndex === 0}
                onPress={previousPage}
                style={({ pressed }) => [
                  styles.navPageBtn,
                  activePageIndex === 0 &&
                    styles.navPageBtnDisabled,
                  pressed &&
                    activePageIndex !== 0 &&
                    styles.navPageBtnPressed,
                ]}
                accessibilityRole="button"
                accessibilityLabel="Previous page"
              >
                <Text style={styles.navPageBtnText}>◀</Text>
              </Pressable>
            )}

            {/* ZOOM LEVEL */}
            <View style={styles.hudBadge}>
              <Text style={styles.hudBadgeText}>
                {Math.round(zoomScale * 100)}%
              </Text>
            </View>

            {/* PROTECTED VIEWER MESSAGE */}
            <View style={styles.hudHint}>
              <Text style={styles.hudHintIcon}>🔒</Text>

              <Text style={styles.hudHintText}>
                {language === 'hi'
                  ? 'केवल देखने के लिए'
                  : 'View only'}
              </Text>
            </View>

            {/* NEXT PAGE */}
            {totalPages > 1 && (
              <Pressable
                disabled={
                  activePageIndex === totalPages - 1
                }
                onPress={nextPage}
                style={({ pressed }) => [
                  styles.navPageBtn,
                  activePageIndex === totalPages - 1 &&
                    styles.navPageBtnDisabled,
                  pressed &&
                    activePageIndex !== totalPages - 1 &&
                    styles.navPageBtnPressed,
                ]}
                accessibilityRole="button"
                accessibilityLabel="Next page"
              >
                <Text style={styles.navPageBtnText}>▶</Text>
              </Pressable>
            )}
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

/* =========================================================
   STYLES
   ========================================================= */

const styles = StyleSheet.create({
  viewerContainer: {
    flex: 1,
    backgroundColor: '#1E2228',
  },

  safeArea: {
    flex: 1,
    backgroundColor: '#1E2228',
  },

  /* =======================================================
     TOP APP BAR
     ======================================================= */

  driveHeader: {
    minHeight: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#16191D',
    borderBottomWidth: 1,
    borderBottomColor: '#282C34',
  },

  titleInfo: {
    flex: 1,
    minWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 8,
  },

  pdfIconBadge: {
    backgroundColor: '#EA4335',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },

  pdfIconText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  titleTextContainer: {
    flex: 1,
    marginLeft: 10,
    minWidth: 0,
  },

  docTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },

  docSubtitle: {
    color: '#9AA0A6',
    fontSize: 11,
    marginTop: 2,
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  pagePill: {
    backgroundColor: '#282C34',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3C4043',
  },

  pagePillText: {
    color: '#E8EAED',
    fontSize: 12,
    fontWeight: '800',
  },

  protectedBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#282C34',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#3C4043',
  },

  protectedIcon: {
    fontSize: 13,
  },

  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3C4043',
    alignItems: 'center',
    justifyContent: 'center',
  },

  closeBtnPressed: {
    opacity: 0.65,
  },

  closeBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },

  /* =======================================================
     PAGE STRIP
     ======================================================= */

  pageStrip: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16191D',
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
    paddingRight: 10,
  },

  stripBtn: {
    backgroundColor: '#282C34',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#3C4043',
  },

  stripBtnActive: {
    backgroundColor: '#1A73E8',
    borderColor: '#8AB4F8',
  },

  stripBtnPressed: {
    opacity: 0.7,
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

  /* =======================================================
     DOCUMENT CANVAS
     ======================================================= */

  canvasWrapper: {
    flex: 1,
    backgroundColor: '#202124',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  paperShadowWrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* =======================================================
     BOTTOM HUD
     ======================================================= */

  bottomHud: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',

    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: 'rgba(32, 33, 36, 0.96)',

    paddingVertical: 7,
    paddingHorizontal: 12,

    borderRadius: 24,
    gap: 9,

    borderWidth: 1,
    borderColor: '#3C4043',

    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 8,
  },

  navPageBtn: {
    minWidth: 34,
    height: 28,
    backgroundColor: '#1A73E8',
    paddingHorizontal: 9,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  navPageBtnPressed: {
    opacity: 0.7,
  },

  navPageBtnDisabled: {
    backgroundColor: '#3C4043',
    opacity: 0.45,
  },

  navPageBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
  },

  hudBadge: {
    backgroundColor: '#303134',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
  },

  hudBadgeText: {
    color: '#8AB4F8',
    fontSize: 11,
    fontWeight: '900',
  },

  hudHint: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    gap: 4,
  },

  hudHintIcon: {
    fontSize: 11,
  },

  hudHintText: {
    color: '#9AA0A6',
    fontSize: 11,
    fontWeight: '600',
  },
});