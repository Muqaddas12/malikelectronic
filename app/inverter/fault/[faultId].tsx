import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useLocalSearchParams } from 'expo-router';

import AppHeader from '@/components/AppHeader';
import InteractiveViewer from '@/components/InteractiveViewer';
import { radius, size, space, weight } from '@/constants/theme';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { getInverterFault } from '@/data/inverterfaults';
import { tr } from '@/data/translations';
import { toggleFavorite, useBench } from '@/utils/benchStore';

export default function FaultDetailScreen() {
  const { id, faultId } = useLocalSearchParams<{
    id: string;
    faultId: string;
  }>();

  const { language, isHindi } = useLanguage();
  const { colors } = useTheme();
  const { favorites } = useBench();

  const [rotation, setRotation] = useState(0);
  const [currentScale, setCurrentScale] = useState(1.0);

  const fault = getInverterFault(id, faultId, language);

  if (!fault) {
    return (
      <SafeAreaView
        edges={['top', 'left', 'right']}
        style={[styles.safeArea, { backgroundColor: colors.surface }]}
      >
        <AppHeader showBack showMenu />

        <View style={styles.center}>
          <Text style={[styles.notFound, { color: colors.text }]}>
            {tr(language, 'faultNotFound')}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const itemId = `diagram:${id}:${faultId}`;
  const isFavorite = favorites.some((v) => v.id === itemId);

  const handleToggleFavorite = () => {
    void toggleFavorite({
      id: itemId,
      title: fault.title,
      route: `/inverter/fault/${encodeURIComponent(faultId)}?id=${encodeURIComponent(id)}`,
    }).catch(() => {
      Alert.alert(isHindi ? 'सेव नहीं हुआ' : 'Could not save');
    });
  };

  const handleRotate = () => {
    setRotation((r) => (r + 90) % 360);
    setCurrentScale(1.0);
  };

  const diagramSource = fault.diagramImage;

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={[styles.safeArea, { backgroundColor: '#0B0F19' }]}
    >
      <AppHeader
        showBack
        showMenu
        title={fault.title}
        subtitle={fault.usedPins ? `Pins: ${fault.usedPins}` : fault.subtitle}
      />

      {diagramSource ? (
        <View style={styles.viewerContainer}>
          {/* FULL UNWRAPPED DIRECT VIEW OF THE DIAGRAM */}
          <InteractiveViewer
            key={rotation}
            rotation={rotation}
            source={diagramSource}
            scaleValue={currentScale}
            onScaleChange={setCurrentScale}
          />

          {/* FLOATING HUD CONTROLS */}
          <View style={styles.bottomHud}>
            {/* ROTATE BUTTON */}
            <Pressable
              onPress={handleRotate}
              accessibilityRole="button"
              accessibilityLabel={isHindi ? '90° घुमाएँ' : 'Rotate 90°'}
              style={styles.hudBtn}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <FontAwesome name="repeat" size={13} color="#E2E8F0" style={{ marginRight: 5 }} />
              <Text style={styles.hudBtnText}>
                {isHindi ? '90° घुमाएँ' : '90°'}
              </Text>
            </Pressable>

            {/* ZOOM IN */}
            <Pressable
              onPress={() => setCurrentScale((prev) => Math.min(prev + 0.5, 4.5))}
              accessibilityRole="button"
              accessibilityLabel="Zoom In"
              style={styles.hudBtn}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <FontAwesome name="plus" size={12} color="#E2E8F0" style={{ marginRight: 4 }} />
              <Text style={styles.hudBtnText}>Zoom</Text>
            </Pressable>

            {/* ZOOM PERCENTAGE BADGE */}
            <View style={styles.hudBadge}>
              <Text style={styles.hudBadgeText}>
                {Math.round(currentScale * 100)}%
              </Text>
            </View>

            {/* ZOOM OUT */}
            <Pressable
              onPress={() => setCurrentScale((prev) => Math.max(prev - 0.5, 1.0))}
              accessibilityRole="button"
              accessibilityLabel="Zoom Out"
              style={styles.hudBtn}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <FontAwesome name="minus" size={12} color="#E2E8F0" style={{ marginRight: 4 }} />
              <Text style={styles.hudBtnText}>Zoom</Text>
            </Pressable>

            {/* RESET BUTTON */}
            {currentScale > 1.05 && (
              <Pressable
                onPress={() => setCurrentScale(1.0)}
                accessibilityRole="button"
                accessibilityLabel="Reset Zoom"
                style={styles.hudBtn}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text style={styles.hudBtnText}>⟲ Reset</Text>
              </Pressable>
            )}

            {/* FAVORITE BUTTON */}
            <Pressable
              onPress={handleToggleFavorite}
              accessibilityRole="button"
              accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              style={[
                styles.hudBtn,
                isFavorite && {
                  backgroundColor: 'rgba(245, 158, 11, 0.25)',
                  borderColor: colors.signal,
                  borderWidth: 1,
                },
              ]}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <FontAwesome
                name={isFavorite ? 'star' : 'star-o'}
                size={14}
                color={isFavorite ? colors.signal : '#E2E8F0'}
              />
            </Pressable>
          </View>
        </View>
      ) : (
        <View style={styles.center}>
          <Text style={[styles.notFound, { color: colors.textDim }]}>
            {tr(language, 'noDiagramTitle')}
          </Text>
          <Text style={{ color: colors.textFaint, marginTop: 8 }}>
            {tr(language, 'noDiagramText')}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: space.xl,
  },

  notFound: {
    fontSize: size.body,
    fontWeight: weight.semi,
  },

  viewerContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#0B0F19',
    width: '100%',
  },

  /* FLOATING ZOOM & TOOL HUD */
  bottomHud: {
    position: 'absolute',
    bottom: space.md,
    left: space.md,
    right: space.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.xs + 2,
  },

  hudBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.92)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: 'rgba(71, 85, 105, 0.6)',
  },

  hudBtnText: {
    color: '#E2E8F0',
    fontSize: size.small,
    fontWeight: weight.semi,
  },

  hudBadge: {
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: 'rgba(71, 85, 105, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  hudBadgeText: {
    color: '#38BDF8',
    fontSize: size.micro + 1,
    fontWeight: weight.bold,
  },
});
