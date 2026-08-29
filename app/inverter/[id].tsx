import React, { useMemo, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppHeader from '@/components/AppHeader';
import FaultCard from '@/components/FaultCard';
import SearchBar from '@/components/SearchBar';

import { useLanguage } from '@/context/LanguageContext';
import { getFaultsForInverter } from '@/data/inverterfaults';
import { inverters } from '@/data/inverters';
import { tr } from '@/data/translations';
import { useSafeNavigate } from '@/hooks/useSafeNavigate';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function InverterFaultsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [search, setSearch] = useState('');
  const { language } = useLanguage();
  const { safePush } = useSafeNavigate();

  // Fullscreen interactive zoom state for PCB Image
  const [isPcbModalOpen, setIsPcbModalOpen] = useState(false);
  const [pcbZoomScale, setPcbZoomScale] = useState(1.0);

  const inverter = inverters.find((item) => item.id === id);

  const inverterFaults = useMemo(() => {
    if (!inverter) return [];

    const allFaults = getFaultsForInverter(inverter.id, language);
    const query = search.trim().toLowerCase();

    if (!query) return allFaults;

    return allFaults.filter((fault) =>
      [fault.title, fault.subtitle, ...fault.symptoms]
        .join(' ')
        .toLowerCase()
        .includes(query),
    );
  }, [inverter, search, language]);

  if (!inverter) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <AppHeader showBack={true} showMenu={true} />
        <View style={styles.center}>
          <Text style={styles.notFound}>
            {tr(language, 'inverterNotFound')}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleZoomIn = () => {
    setPcbZoomScale((prev) => Math.min(prev + 0.5, 4.0));
  };

  const handleZoomOut = () => {
    setPcbZoomScale((prev) => Math.max(prev - 0.5, 1.0));
  };

  const handleResetZoom = () => {
    setPcbZoomScale(1.0);
  };

  const baseImageWidth = SCREEN_WIDTH - 24;
  const baseImageHeight = SCREEN_HEIGHT * 0.7;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F7F8FA"
      />

      {/* Header Bar with Back Button & Sidebar Drawer */}
      <AppHeader
        showBack={true}
        showMenu={true}
      />

      {/* FULLSCREEN INTERACTIVE PCB IMAGE MODAL */}
      {inverter.pcbImage && (
        <Modal
          visible={isPcbModalOpen}
          transparent={true}
          animationType="fade"
          onRequestClose={() => {
            setIsPcbModalOpen(false);
            setPcbZoomScale(1.0);
          }}
        >
          <View style={styles.modalBackdrop}>
            <SafeAreaView style={styles.modalSafeArea}>
              {/* Modal Top Header with Title and Close Button */}
              <View style={styles.modalHeader}>
                <View style={{ flex: 1, paddingRight: 10 }}>
                  <Text style={styles.modalTitle} numberOfLines={1}>
                    {inverter.brand} {inverter.model} — PCB Photo
                  </Text>
                  <Text style={styles.modalSubtitle}>
                    {tr(language, 'zoomHint')}
                  </Text>
                </View>

                <Pressable
                  onPress={() => {
                    setIsPcbModalOpen(false);
                    setPcbZoomScale(1.0);
                  }}
                  style={styles.modalCloseButton}
                  hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                >
                  <Text style={styles.modalCloseText}>
                    {tr(language, 'closeImage')}
                  </Text>
                </Pressable>
              </View>

              {/* On-screen Zoom Control Bar */}
              <View style={styles.zoomControlBar}>
                <Pressable
                  onPress={handleZoomIn}
                  style={styles.zoomBtn}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Text style={styles.zoomBtnText}>
                    ➕ {language === 'hi' ? 'बड़ा करें' : 'Zoom In'}
                  </Text>
                </Pressable>

                <View style={styles.zoomBadge}>
                  <Text style={styles.zoomBadgeText}>
                    {Math.round(pcbZoomScale * 100)}%
                  </Text>
                </View>

                <Pressable
                  onPress={handleZoomOut}
                  style={styles.zoomBtn}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Text style={styles.zoomBtnText}>
                    ➖ {language === 'hi' ? 'छोटा करें' : 'Zoom Out'}
                  </Text>
                </Pressable>

                <Pressable
                  onPress={handleResetZoom}
                  style={styles.zoomResetBtn}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Text style={styles.zoomResetText}>⟲ Reset</Text>
                </Pressable>
              </View>

              {/* Two-Way Scrollable Container for Pan and Inspect Traces */}
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={true}
                contentContainerStyle={styles.horizontalScrollContent}
              >
                <ScrollView
                  showsVerticalScrollIndicator={true}
                  contentContainerStyle={styles.verticalScrollContent}
                >
                  <Image
                    source={inverter.pcbImage}
                    style={{
                      width: baseImageWidth * pcbZoomScale,
                      height: baseImageHeight * pcbZoomScale,
                    }}
                    resizeMode="contain"
                  />
                </ScrollView>
              </ScrollView>
            </SafeAreaView>
          </View>
        </Modal>
      )}

      <FlatList
        data={inverterFaults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FaultCard
            fault={item}
            onPress={() =>
              safePush({
                pathname: '/inverter/fault/[faultId]',
                params: {
                  id: inverter.id,
                  faultId: item.id,
                },
              })
            }
          />
        )}
        ListHeaderComponent={
          <>
            {/* COMPACT HERO CARD SHOWING INVERTER DETAILS & PCB IMAGE */}
            <View style={styles.hero}>
              {/* LEFT SIDE: INVERTER SPECS */}
              <View style={styles.heroInfo}>
                <Text style={styles.brand}>
                  {inverter.brand}
                </Text>

                <Text style={styles.model} numberOfLines={1}>
                  {inverter.model}
                </Text>

                <Text style={styles.specs}>
                  {inverter.capacity} • {inverter.batteryVoltage}
                </Text>
              </View>

              {/* RIGHT SIDE: PCB PHOTO (CLICKABLE FOR FULLSCREEN ZOOM) */}
              {inverter.pcbImage ? (
                <Pressable
                  onPress={() => {
                    setPcbZoomScale(1.0);
                    setIsPcbModalOpen(true);
                  }}
                  style={({ pressed }) => [
                    styles.imageContainer,
                    pressed && styles.imagePressed,
                  ]}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Image
                    source={inverter.pcbImage}
                    style={styles.pcbImage}
                    resizeMode="contain"
                  />
                  <View style={styles.pcbBadge}>
                    <Text style={styles.pcbBadgeText}>🔍 PCB</Text>
                  </View>
                </Pressable>
              ) : null}
            </View>

            {/* SEARCH BAR (NO TROUBLESHOOTING TITLE AS REQUESTED) */}
            <View style={styles.searchWrapper}>
              <SearchBar
                value={search}
                onChangeText={setSearch}
                placeholder={tr(language, 'searchFault')}
              />
            </View>
          </>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>
              {tr(language, 'noFaultFound')}
            </Text>
          </View>
        }
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={styles.bottomSpacer} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },

  content: {
    paddingHorizontal: 18,
    paddingTop: 4,
    paddingBottom: 20,
  },

  /* COMPACT HERO */

  hero: {
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 80,
  },

  heroInfo: {
    flex: 1,
    paddingRight: 10,
  },

  brand: {
    color: '#93C5FD',
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },

  model: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
  },

  specs: {
    color: '#D1D5DB',
    fontSize: 11,
    marginTop: 3,
    fontWeight: '600',
  },

  /* PCB IMAGE THUMBNAIL */

  imageContainer: {
    width: 82,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 2,
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },

  imagePressed: {
    opacity: 0.8,
    borderColor: '#2563EB',
  },

  pcbImage: {
    width: 76,
    height: 64,
  },

  pcbBadge: {
    position: 'absolute',
    bottom: 2,
    right: 3,
    backgroundColor: '#2563EB',
    paddingHorizontal: 5,
    paddingVertical: 1.5,
    borderRadius: 4,
  },

  pcbBadgeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '900',
  },

  searchWrapper: {
    marginBottom: 10,
  },

  /* EMPTY */

  empty: {
    paddingTop: 50,
    alignItems: 'center',
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
  },

  /* BOTTOM SPACE */

  bottomSpacer: {
    height: 40,
  },

  /* NOT FOUND */

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  notFound: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },

  /* MODAL FULLSCREEN PCB VIEWER */

  modalBackdrop: {
    flex: 1,
    backgroundColor: '#0A0F1E',
  },

  modalSafeArea: {
    flex: 1,
  },

  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: '#111827',
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },

  modalTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },

  modalSubtitle: {
    color: '#9CA3AF',
    fontSize: 11,
    marginTop: 2,
  },

  modalCloseButton: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 8,
  },

  modalCloseText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },

  /* ZOOM CONTROLS */

  zoomControlBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#1E293B',
    paddingVertical: 9,
    paddingHorizontal: 12,
  },

  zoomBtn: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },

  zoomBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },

  zoomBadge: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },

  zoomBadgeText: {
    color: '#38BDF8',
    fontSize: 12,
    fontWeight: '900',
  },

  zoomResetBtn: {
    backgroundColor: '#334155',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },

  zoomResetText: {
    color: '#E2E8F0',
    fontSize: 12,
    fontWeight: '700',
  },

  horizontalScrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  verticalScrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});