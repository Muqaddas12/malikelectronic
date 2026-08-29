import React, { useState } from 'react';
import {
    Dimensions,
    ImageSourcePropType,
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
  title: string;
  subtitle?: string;
  onClose: () => void;
};

export default function DiagramViewerModal({
  visible,
  source,
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
      onRequestClose={onClose}
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

            <Pressable
              onPress={onClose}
              style={styles.closeBtn}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <Text style={styles.closeBtnText}>
                {tr(language, 'closeImage')}
              </Text>
            </Pressable>
          </View>

          {/* HINT BAR */}
          <View style={styles.hintBar}>
            <Text style={styles.hintText}>
              🤏 {language === 'hi' ? 'दो उंगलियों से पिंच करके ज़ूम करें • डबल टैप करें' : 'Pinch with two fingers to zoom • Double tap to zoom'}
            </Text>
            <View style={styles.scaleBadge}>
              <Text style={styles.scaleText}>
                {Math.round(currentScale * 100)}%
              </Text>
            </View>
          </View>

          {/* INTERACTIVE 2-FINGER PINCH & PAN VIEWER */}
          <View style={styles.viewerCanvas}>
            <InteractiveViewer
              source={source}
              baseWidth={SCREEN_WIDTH - 16}
              baseHeight={SCREEN_HEIGHT * 0.76}
              onScaleChange={setCurrentScale}
            />
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

  hintBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: '#1E293B',
  },

  hintText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '700',
    flex: 1,
  },

  scaleBadge: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#334155',
  },

  scaleText: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '900',
  },

  viewerCanvas: {
    flex: 1,
  },
});

