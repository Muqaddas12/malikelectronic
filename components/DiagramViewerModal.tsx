import React, { useState } from 'react';
import {
    Dimensions,
    ImageSourcePropType,
    Linking,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import InteractiveViewer from '@/components/InteractiveViewer';
import { useLanguage } from '@/context/LanguageContext';
import { tr } from '@/data/translations';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type Props = {
  visible: boolean;
  source: ImageSourcePropType | undefined;
  link?: string;
  title: string;
  subtitle?: string;
  onClose: () => void;
};

export default function DiagramViewerModal({
  visible,
  source,
  link,
  title,
  subtitle,
  onClose,
}: Props) {
  const { language } = useLanguage();
  const [currentScale, setCurrentScale] = useState(1.0);

  if (!source) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => {
        setCurrentScale(1.0);
        onClose();
      }}
    >
      <View style={styles.modalBackdrop}>
        <SafeAreaView style={styles.safeArea}>
          {/* TOP HEADER */}
          <View style={styles.header}>
            <View style={styles.titleWrapper}>
              <Text style={styles.title} numberOfLines={1}>
                {title}
              </Text>
              <Text style={styles.subtitle} numberOfLines={1}>
                {subtitle || tr(language, 'zoomHint')}
              </Text>
            </View>

            <View style={styles.headerActions}>
              {link ? (
                <Pressable
                  onPress={() => Linking.openURL(link)}
                  style={styles.driveBtn}
                  hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                >
                  <Text style={styles.driveBtnText}>↗ Drive</Text>
                </Pressable>
              ) : null}

              <Pressable
                onPress={() => {
                  setCurrentScale(1.0);
                  onClose();
                }}
                style={styles.closeBtn}
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              >
                <Text style={styles.closeBtnText}>
                  {tr(language, 'closeImage')}
                </Text>
              </Pressable>
            </View>
            <Pressable
              onPress={() => {
                setCurrentScale(1.0);
                onClose();
              }}
              style={styles.closeBtn}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <Text style={styles.closeBtnText}>
                {tr(language, 'closeImage')}
              </Text>
            </Pressable>
          </View>

          {/* CANVAS WITH NATIVE HARDWARE PINCH-TO-ZOOM */}
          <View style={styles.viewerCanvas}>
            <InteractiveViewer
              source={source}
              scaleValue={currentScale}
              onScaleChange={setCurrentScale}
            />
          </View>

          {/* FLOATING ZOOM HUD CONTROLS */}
          <View style={styles.bottomHud}>
            <Pressable
              onPress={() => setCurrentScale((prev) => Math.min(prev + 0.5, 4.5))}
              style={styles.hudBtn}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={styles.hudBtnText}>➕ Zoom</Text>
            </Pressable>

            <View style={styles.hudBadge}>
              <Text style={styles.hudBadgeText}>
                {Math.round(currentScale * 100)}%
              </Text>
            </View>

            <Pressable
              onPress={() => setCurrentScale((prev) => Math.max(prev - 0.5, 1.0))}
              style={styles.hudBtn}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={styles.hudBtnText}>➖ Zoom</Text>
            </Pressable>

            <Pressable
              onPress={() => setCurrentScale(1.0)}
              style={styles.hudResetBtn}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={styles.hudResetText}>⟲ Reset</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: '#0B0F19',
  },

  safeArea: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#111827',
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },

  titleWrapper: {
    flex: 1,
    paddingRight: 10,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },

  subtitle: {
    color: '#9CA3AF',
    fontSize: 11,
    marginTop: 2,
  },

  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  driveBtn: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },

  driveBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },

  closeBtn: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },

  closeBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },

  viewerCanvas: {
    flex: 1,
  },

  /* BOTTOM FLOATING HUD */

  bottomHud: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(17, 24, 39, 0.95)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 24,
    gap: 8,
    borderWidth: 1,
    borderColor: '#374151',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  hudBtn: {
    backgroundColor: '#2563EB',
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
    backgroundColor: '#0F172A',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 10,
  },

  hudBadgeText: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '900',
  },

  hudResetBtn: {
    backgroundColor: '#374151',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
  },

  hudResetText: {
    color: '#E5E7EB',
    fontSize: 11,
    fontWeight: '700',
  },
});
