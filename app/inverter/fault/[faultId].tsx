import React, { useState } from 'react';

import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppHeader from '@/components/AppHeader';
import DiagramViewerModal from '@/components/DiagramViewerModal';
import { useLanguage } from '@/context/LanguageContext';
import { getInverterFault } from '@/data/inverterfaults';
import { tr } from '@/data/translations';
import { useSafeNavigate } from '@/hooks/useSafeNavigate';
import {
  ComponentDetail,
  InverterFaultDetail,
} from '@/types/faultDetail';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get('window');

// ─── Generic bullet list section ─────────────────────────────────────────────

function BulletSection({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  if (!items || items.length === 0) return null;
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.list}>
        {items.map((item, i) => (
          <View key={i} style={styles.listItem}>
            <View style={styles.dot} />
            <Text style={styles.listText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// ─── Technical explanation with component table ───────────────────────────────

function TechnicalSection({
  fault,
  title,
  compTitle,
  funcTitle,
  valTitle,
}: {
  fault: InverterFaultDetail;
  title: string;
  compTitle: string;
  funcTitle: string;
  valTitle: string;
}) {
  const tech = fault.technicalExplanation;
  if (!tech) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>
        🔧 {tech.title || title}
      </Text>
      <Text style={styles.explanationText}>
        {tech.explanation}
      </Text>

      {/* Component Table */}
      <View style={styles.table}>
        {/* Header */}
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={[styles.tableCellBold, { flex: 1.2 }]}>
            {compTitle}
          </Text>
          <Text style={[styles.tableCellBold, { flex: 2 }]}>
            {funcTitle}
          </Text>
          <Text style={[styles.tableCellBold, { flex: 1 }]}>
            {valTitle}
          </Text>
        </View>

        {tech.components.map(
          (comp: ComponentDetail, i: number) => (
            <View
              key={i}
              style={[
                styles.tableRow,
                i % 2 === 0 && styles.tableRowAlt,
              ]}
            >
              <Text
                style={[
                  styles.tableCell,
                  styles.componentName,
                  { flex: 1.2 },
                ]}
              >
                {comp.component}
              </Text>
              <View style={{ flex: 2, paddingRight: 4 }}>
                <Text style={styles.tableCell}>
                  {comp.function}
                </Text>
                {comp.important ? (
                  <Text style={styles.importantInline}>
                    ⚠ {comp.important}
                  </Text>
                ) : null}
              </View>
              <Text
                style={[styles.tableCell, { flex: 1 }]}
              >
                {comp.value ??
                  comp.value12V ??
                  comp.package ??
                  '—'}
              </Text>
            </View>
          ),
        )}
      </View>
    </View>
  );
}

// ─── Resistor value table ─────────────────────────────────────────────────────

function ResistorSection({
  fault,
  pcbTypeTitle,
  valTitle,
}: {
  fault: InverterFaultDetail;
  pcbTypeTitle: string;
  valTitle: string;
}) {
  const rv = fault.resistorValues;
  if (!rv) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>
        📊 {rv.title}
      </Text>
      <Text style={styles.explanationText}>
        {rv.explanation}
      </Text>

      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text
            style={[styles.tableCellBold, { flex: 1 }]}
          >
            {pcbTypeTitle}
          </Text>
          <Text
            style={[styles.tableCellBold, { flex: 1 }]}
          >
            {valTitle}
          </Text>
          <Text
            style={[styles.tableCellBold, { flex: 1 }]}
          >
            Marking
          </Text>
        </View>

        {rv.values.map((v, i) => (
          <View
            key={i}
            style={[
              styles.tableRow,
              i % 2 === 0 && styles.tableRowAlt,
            ]}
          >
            <Text style={[styles.tableCell, { flex: 1 }]}>
              {v.pcb}
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.componentName,
                { flex: 1 },
              ]}
            >
              {v.r24}
            </Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>
              {v.marking}
            </Text>
          </View>
        ))}
      </View>

      {/* Reason notes */}
      <View style={{ marginTop: 10, gap: 6 }}>
        {rv.values.map((v, i) => (
          <Text key={i} style={styles.resistorReason}>
            • {v.pcb}: {v.reason}
          </Text>
        ))}
      </View>
    </View>
  );
}

// ─── Possible causes ──────────────────────────────────────────────────────────

function CausesSection({
  fault,
  title,
}: {
  fault: InverterFaultDetail;
  title: string;
}) {
  if (
    !fault.possibleCauses ||
    fault.possibleCauses.length === 0
  )
    return null;

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>
        🔍 {title}
      </Text>
      <View style={styles.list}>
        {fault.possibleCauses.map((item, i) => (
          <View key={i} style={styles.causeItem}>
            <Text style={styles.causeTitle}>
              {i + 1}. {item.cause}
            </Text>
            <Text style={styles.causeExplanation}>
              {item.explanation}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// ─── Repair procedure ─────────────────────────────────────────────────────────

function RepairSection({
  fault,
  title,
}: {
  fault: InverterFaultDetail;
  title: string;
}) {
  if (
    !fault.repairProcedure ||
    fault.repairProcedure.length === 0
  )
    return null;

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>
        🛠️ {title}
      </Text>
      <View style={styles.list}>
        {fault.repairProcedure.map((step) => (
          <View key={step.step} style={styles.stepItem}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepNumber}>
                {step.step}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.stepTitle}>
                {step.title}
              </Text>
              <Text style={styles.stepExplanation}>
                {step.explanation}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export default function FaultDetailScreen() {
  const { id, faultId } =
    useLocalSearchParams<{
      id: string;
      faultId: string;
    }>();

  const { language } = useLanguage();
  const { safeBack } = useSafeNavigate();

  // Fullscreen interactive zoom state
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1.0);

  const fault = getInverterFault(id, faultId, language);

  if (!fault) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <Text style={styles.notFound}>
            {tr(language, 'faultNotFound')}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleZoomIn = () => {
    setZoomScale((prev) => Math.min(prev + 0.5, 4.0));
  };

  const handleZoomOut = () => {
    setZoomScale((prev) => Math.max(prev - 0.5, 1.0));
  };

  const handleResetZoom = () => {
    setZoomScale(1.0);
  };

  const baseImageWidth = SCREEN_WIDTH - 24;
  const baseImageHeight = SCREEN_HEIGHT * 0.7;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F7F8FA"
      />

      {/* FULLSCREEN PINCH-TO-ZOOM DIAGRAM MODAL */}
      <DiagramViewerModal
        visible={isImageModalOpen}
        source={fault.diagramImage}
        title={fault.title}
        subtitle={tr(language, 'zoomHint')}
        onClose={() => setIsImageModalOpen(false)}
      />

      {/* HEADER WITH BACK BUTTON, TITLE & SIDEBAR MENU */}
      <AppHeader
        showBack={true}
        title={fault.title}
        showMenu={true}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* 1. SYMPTOMS (FIRST SECTION) */}
        <BulletSection
          title={tr(language, 'symptoms')}
          items={fault.symptoms}
        />

        {/* 2. SPECIFIC PCB CIRCUIT DIAGRAM IMAGE (WITH TAP TO VIEW BIG IMAGE) */}
        <View style={styles.diagramCard}>
          <View style={styles.diagramHeaderRow}>
            <Text style={styles.diagramLabel}>
              {tr(language, 'pcbDiagram')}
            </Text>
            {fault.diagramImage ? (
              <View style={styles.diagramAvailableBadge}>
                <Text style={styles.diagramAvailableText}>
                  LIVE SCHEMATIC
                </Text>
              </View>
            ) : null}
          </View>

          {fault.diagramImage ? (
            <Pressable
              onPress={() => {
                setZoomScale(1.0);
                setIsImageModalOpen(true);
              }}
              style={({ pressed }) => [
                styles.diagramImageWrap,
                pressed && styles.diagramPressed,
              ]}
            >
              <Image
                source={fault.diagramImage}
                style={styles.diagramImage}
                resizeMode="contain"
              />
              <View style={styles.zoomTapBadge}>
                <Text style={styles.zoomTapText}>
                  {tr(language, 'tapToZoom')}
                </Text>
              </View>
            </Pressable>
          ) : (
            <View style={styles.noImageContainer}>
              <Text style={styles.noImageIcon}>🖼️</Text>
              <Text style={styles.noImageTitle}>
                {tr(language, 'noDiagramTitle')}
              </Text>
              <Text style={styles.noImageText}>
                {tr(language, 'noDiagramText')}
              </Text>
            </View>
          )}
        </View>

        {/* 3. POSSIBLE CAUSES (DIRECTLY AFTER DIAGRAM) */}
        <CausesSection
          fault={fault}
          title={tr(language, 'possibleCauses')}
        />

        {/* 4. REPAIR PROCEDURE */}
        <RepairSection
          fault={fault}
          title={tr(language, 'repairProcedure')}
        />

        {/* 5. CIRCUIT FLOW */}
        {fault.circuitFlow ? (
          <View style={styles.flowCard}>
            <Text style={styles.cardTitleWhite}>
              ⚡ {tr(language, 'circuitFlow')}
            </Text>
            <Text style={styles.flowText}>
              {fault.circuitFlow}
            </Text>
          </View>
        ) : null}

        {/* 6. OTHER THINGS */}

        {/* BASIC CHECKS */}
        <BulletSection
          title={tr(language, 'basicChecks')}
          items={fault.basicChecks}
        />

        {/* RESISTOR VALUE TABLE */}
        <ResistorSection
          fault={fault}
          pcbTypeTitle={tr(language, 'pcbType')}
          valTitle={tr(language, 'value')}
        />

        {/* TECHNICAL EXPLANATION + COMPONENT TABLE */}
        <TechnicalSection
          fault={fault}
          title={tr(language, 'componentsTable')}
          compTitle={tr(language, 'component')}
          funcTitle={tr(language, 'function')}
          valTitle={tr(language, 'value')}
        />

        {/* IMPORTANT NOTE */}
        {fault.importantNote ? (
          <View style={styles.noteCard}>
            <Text style={styles.noteTitle}>
              {tr(language, 'importantNote')}
            </Text>
            <Text style={styles.noteText}>
              {fault.importantNote}
            </Text>
          </View>
        ) : null}

        {/* DIAGNOSIS SUMMARY */}
        {fault.diagnosis ? (
          <View style={styles.diagnosisCard}>
            <Text style={styles.diagnosisTitle}>
              {tr(language, 'diagnosisSummary')}
            </Text>
            <Text style={styles.diagnosisText}>
              {fault.diagnosis}
            </Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },

  content: {
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 60,
  },

  /* TOP BAR */

  topBar: {
    marginBottom: 12,
  },

  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingRight: 15,
    marginBottom: 6,
  },

  backText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2563EB',
  },

  faultHeaderTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#111827',
    marginTop: 2,
    lineHeight: 28,
  },

  /* PCB DIAGRAM CARD */

  diagramCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  diagramHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  diagramLabel: {
    fontSize: 16,
    fontWeight: '900',
    color: '#111827',
  },

  diagramAvailableBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },

  diagramAvailableText: {
    color: '#15803D',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  diagramImageWrap: {
    width: '100%',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 8,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    overflow: 'hidden',
  },

  diagramPressed: {
    opacity: 0.85,
    borderColor: '#2563EB',
  },

  diagramImage: {
    width: '100%',
    height: 220,
    borderRadius: 8,
  },

  zoomTapBadge: {
    marginTop: 10,
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },

  zoomTapText: {
    color: '#1D4ED8',
    fontSize: 12,
    fontWeight: '800',
  },

  /* MODAL FULLSCREEN VIEWER */

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

  /* SHARED CARD */

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#111827',
    marginBottom: 12,
  },

  cardTitleWhite: {
    fontSize: 16,
    fontWeight: '900',
    color: '#F8FAFC',
    marginBottom: 10,
  },

  /* BULLET LIST */

  list: { gap: 10 },

  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#2563EB',
    marginTop: 7,
    marginRight: 10,
    flexShrink: 0,
  },

  listText: {
    flex: 1,
    color: '#4B5563',
    fontSize: 14,
    lineHeight: 21,
  },

  /* TECHNICAL EXPLANATION */

  explanationText: {
    color: '#374151',
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 14,
  },

  /* TABLE */

  table: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },

  tableHeader: {
    backgroundColor: '#1E3A5F',
  },

  tableRow: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 9,
    gap: 6,
  },

  tableRowAlt: {
    backgroundColor: '#F8FAFC',
  },

  tableCellBold: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },

  tableCell: {
    color: '#374151',
    fontSize: 12,
    lineHeight: 17,
  },

  componentName: {
    fontWeight: '800',
    color: '#1D4ED8',
  },

  importantInline: {
    color: '#B45309',
    fontSize: 11,
    marginTop: 3,
    fontStyle: 'italic',
  },

  /* RESISTOR SECTION */

  resistorReason: {
    color: '#6B7280',
    fontSize: 12,
    lineHeight: 18,
  },

  /* POSSIBLE CAUSES */

  causeItem: {
    borderLeftWidth: 3,
    borderLeftColor: '#2563EB',
    paddingLeft: 12,
    paddingVertical: 6,
  },

  causeTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111827',
  },

  causeExplanation: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 19,
    marginTop: 3,
  },

  /* REPAIR STEPS */

  stepItem: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },

  stepBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 1,
  },

  stepNumber: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
  },

  stepTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111827',
  },

  stepExplanation: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 19,
    marginTop: 3,
  },

  /* CIRCUIT FLOW */

  flowCard: {
    backgroundColor: '#0F172A',
    borderRadius: 16,
    padding: 18,
    marginTop: 14,
  },

  flowText: {
    color: '#38BDF8',
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'monospace',
    letterSpacing: 0.5,
    lineHeight: 22,
  },

  /* IMPORTANT NOTE */

  noteCard: {
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FCD34D',
    borderRadius: 16,
    padding: 16,
    marginTop: 14,
  },

  noteTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#92400E',
    marginBottom: 8,
  },

  noteText: {
    color: '#78350F',
    fontSize: 13,
    lineHeight: 20,
  },

  /* DIAGNOSIS */

  diagnosisCard: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#86EFAC',
    borderRadius: 16,
    padding: 16,
    marginTop: 14,
  },

  diagnosisTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#15803D',
    marginBottom: 6,
  },

  diagnosisText: {
    color: '#14532D',
    fontSize: 13,
    lineHeight: 20,
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

  /* NO DIAGRAM PLACEHOLDER */

  noImageContainer: {
    width: '100%',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    paddingVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  noImageIcon: {
    fontSize: 40,
  },

  noImageTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#64748B',
  },

  noImageText: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 18,
  },
});