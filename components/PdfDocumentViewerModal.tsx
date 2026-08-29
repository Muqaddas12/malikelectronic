import React, { useState } from 'react';
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

  if (!doc) return null;

  const totalPages = doc.pages.length;
  const basePageWidth = SCREEN_WIDTH - 20;
  const basePageHeight = SCREEN_HEIGHT * 0.74;

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
                  {doc.chipName} — {language === 'hi' ? 'पिन विवरण' : 'Pin Details'}
                </Text>
                <Text style={styles.docSubtitle} numberOfLines={1}>
                  {doc.title}.pdf
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
                📄 {tr(language, 'page')}:
              </Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.pageStripRow}
              >
                {doc.pages.map((_, idx) => (
                  <Pressable
                    key={idx}
                    onPress={() => {
                      setActivePageIndex(idx);
                      setZoomScale(1.0);
                    }}
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

          {/* TWO-FINGER PINCH-TO-ZOOM CANVAS */}
          <View style={styles.canvasWrapper}>
            <View style={styles.paperShadowWrapper}>
              <InteractiveViewer
                key={`${doc.chipName}-page-${activePageIndex}`}
                source={doc.pages[activePageIndex]}
                baseWidth={basePageWidth}
                baseHeight={basePageHeight}
                onScaleChange={setZoomScale}
              />
            </View>
          </View>

          {/* FLOATING ZOOM CONTROLS (Google Drive Style Bottom HUD) */}
          <View style={styles.bottomHud}>
            {/* Prev Page Button if Multi-Page */}
            {totalPages > 1 && (
              <Pressable
                disabled={activePageIndex === 0}
                onPress={() => {
                  setActivePageIndex((prev) => Math.max(0, prev - 1));
                  setZoomScale(1.0);
                }}
                style={[
                  styles.navPageBtn,
                  activePageIndex === 0 && styles.navPageBtnDisabled,
                ]}
              >
                <Text style={styles.navPageBtnText}>◀</Text>
              </Pressable>
            )}

            <View style={styles.hudBadge}>
              <Text style={styles.hudBadgeText}>
                {Math.round(zoomScale * 100)}%
              </Text>
            </View>

            <View style={styles.hudHint}>
              <Text style={styles.hudHintText}>
                🤏 {language === 'hi' ? 'दो उंगलियों से ज़ूम करें' : 'Pinch with 2 fingers'}
              </Text>
            </View>

            {/* Next Page Button if Multi-Page */}
            {totalPages > 1 && (
              <Pressable
                disabled={activePageIndex === totalPages - 1}
                onPress={() => {
                  setActivePageIndex((prev) => Math.min(totalPages - 1, prev + 1));
                  setZoomScale(1.0);
                }}
                style={[
                  styles.navPageBtn,
                  activePageIndex === totalPages - 1 && styles.navPageBtnDisabled,
                ]}
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

const styles = StyleSheet.create({
  viewerContainer: {
    flex: 1,
    backgroundColor: '#1E2228', // Google Drive dark canvas background
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

  canvasWrapper: {
    flex: 1,
    backgroundColor: '#202124',
    alignItems: 'center',
    justifyContent: 'center',
  },

  paperShadowWrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* BOTTOM HUD CONTROLS */

  bottomHud: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(32, 33, 36, 0.95)',
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 24,
    gap: 10,
    borderWidth: 1,
    borderColor: '#3C4043',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  navPageBtn: {
    backgroundColor: '#1A73E8',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },

  navPageBtnDisabled: {
    backgroundColor: '#3C4043',
    opacity: 0.5,
  },

  navPageBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },

  hudBadge: {
    backgroundColor: '#303134',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },

  hudBadgeText: {
    color: '#8AB4F8',
    fontSize: 11,
    fontWeight: '900',
  },

  hudHint: {
    paddingHorizontal: 4,
  },

  hudHintText: {
    color: '#9AA0A6',
    fontSize: 11,
    fontWeight: '600',
  },
});
