import React, { useMemo, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppHeader from '@/components/AppHeader';
import DiagramViewerModal from '@/components/DiagramViewerModal';
import FaultCard from '@/components/FaultCard';
import PdfDocumentViewerModal from '@/components/PdfDocumentViewerModal';
import SearchBar from '@/components/SearchBar';

import { useLanguage } from '@/context/LanguageContext';
import { getFaultsForInverter } from '@/data/inverterfaults';
import { inverters } from '@/data/inverters';
import { getMicrocontrollerDoc } from '@/data/microcontroller';
import { tr } from '@/data/translations';
import { useSafeNavigate } from '@/hooks/useSafeNavigate';

export default function InverterFaultsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [search, setSearch] = useState('');
  const { language } = useLanguage();
  const { safePush } = useSafeNavigate();

  // Fullscreen interactive 2-finger zoom modal for PCB Image
  const [isPcbModalOpen, setIsPcbModalOpen] = useState(false);

  // Google Drive Style PDF Document Viewer Modal State
  const [isMcModalOpen, setIsMcModalOpen] = useState(false);

  const inverter = inverters.find((item) => item.id === id);
  const mcDoc = inverter ? getMicrocontrollerDoc(inverter.id) : undefined;

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

      {/* FULLSCREEN 2-FINGER PINCH-TO-ZOOM PCB IMAGE MODAL */}
      <DiagramViewerModal
        visible={isPcbModalOpen}
        source={inverter.pcbImage}
        title={`${inverter.brand} ${inverter.model} — PCB Photo`}
        subtitle={tr(language, 'zoomHint')}
        onClose={() => setIsPcbModalOpen(false)}
      />

      {/* GOOGLE DRIVE STYLE FULLSCREEN MICROCONTROLLER PDF DOCUMENT VIEWER */}
      <PdfDocumentViewerModal
        visible={isMcModalOpen}
        doc={mcDoc}
        onClose={() => setIsMcModalOpen(false)}
      />

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

              {/* RIGHT SIDE: PCB PHOTO (CLICKABLE FOR 2-FINGER PINCH-TO-ZOOM) */}
              {inverter.pcbImage ? (
                <Pressable
                  onPress={() => setIsPcbModalOpen(true)}
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

            {/* DIRECT MICROCONTROLLER PIN DETAILS PDF / DOCUMENT BUTTON */}
            {mcDoc && (
              <Pressable
                onPress={() => setIsMcModalOpen(true)}
                style={({ pressed }) => [
                  styles.mcCard,
                  pressed && styles.mcCardPressed,
                ]}
              >
                <View style={styles.mcIconBox}>
                  <Text style={styles.mcIcon}>📟</Text>
                </View>

                <View style={styles.mcContent}>
                  <View style={styles.mcHeaderRow}>
                    <Text style={styles.mcTitle} numberOfLines={1}>
                      {mcDoc.chipName}
                    </Text>
                    <View style={styles.mcBadge}>
                      <Text style={styles.mcBadgeText}>PDF PIN DETAILS</Text>
                    </View>
                  </View>

                  <Text style={styles.mcSubtitle} numberOfLines={1}>
                    {tr(language, 'microcontrollerSubtitle')}
                  </Text>

                  <Text style={styles.mcActionText}>
                    {tr(language, 'viewPinDetails')}
                  </Text>
                </View>
              </Pressable>
            )}

            {/* SEARCH BAR */}
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

  /* MICROCONTROLLER PIN DETAILS CARD */

  mcCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },

  mcCardPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.99 }],
  },

  mcIconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#38BDF8',
  },

  mcIcon: {
    fontSize: 22,
  },

  mcContent: {
    flex: 1,
    marginLeft: 12,
  },

  mcHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  mcTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#FFFFFF',
    flex: 1,
  },

  mcBadge: {
    backgroundColor: '#0284C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 6,
  },

  mcBadgeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  mcSubtitle: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },

  mcActionText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#38BDF8',
    marginTop: 4,
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
});