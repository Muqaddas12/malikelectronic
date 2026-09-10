import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useLocalSearchParams } from 'expo-router';

import AppHeader from '@/components/AppHeader';
import DiagramViewerModal from '@/components/DiagramViewerModal';
import {
    layout,
    lineFor,
    mono,
    radius,
    size,
    space,
    weight,
} from '@/constants/theme';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { getInverterFault } from '@/data/inverterfaults';
import { tr } from '@/data/translations';
import { ComponentDetail, InverterFaultDetail } from '@/types/faultDetail';

const severityKeys: Record<string, string> = {
  low: 'lowRisk',
  medium: 'mediumRisk',
  high: 'highRisk',
  critical: 'criticalRisk',
};

/**
 * Every section on this screen is the same panel with the same header rule —
 * a datasheet, not a stack of differently-shaped cards. Only the note and the
 * diagnosis break the pattern, because they carry a different kind of weight.
 */
function Card({
  title,
  lead,
  children,
}: {
  title: string;
  lead?: string;
  children: React.ReactNode;
}) {
  const { colors } = useTheme();
  const { isHindi } = useLanguage();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.panel, borderColor: colors.rule },
      ]}
    >
      <Text
        style={[
          styles.cardTitle,
          { color: colors.text, lineHeight: lineFor('sub', isHindi) },
        ]}
      >
        {title}
      </Text>

      <View style={[styles.cardRule, { backgroundColor: colors.rule }]} />

      {lead ? (
        <Text
          style={[
            styles.lead,
            { color: colors.textDim, lineHeight: lineFor('small', isHindi) },
          ]}
        >
          {lead}
        </Text>
      ) : null}

      {children}
    </View>
  );
}

function BulletSection({ title, items }: { title: string; items: string[] }) {
  const { colors } = useTheme();
  const { isHindi } = useLanguage();

  if (!items || items.length === 0) return null;

  return (
    <Card title={title}>
      <View style={styles.list}>
        {items.map((item, i) => (
          <View key={i} style={styles.listItem}>
            {/* A dash, the way a spec sheet marks an entry. */}
            <View
              style={[styles.dash, { backgroundColor: colors.textFaint }]}
            />

            <Text
              style={[
                styles.listText,
                {
                  color: colors.textDim,
                  lineHeight: lineFor('body', isHindi),
                },
              ]}
            >
              {item}
            </Text>
          </View>
        ))}
      </View>
    </Card>
  );
}

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
  const { colors } = useTheme();
  const { isHindi } = useLanguage();

  const tech = fault.technicalExplanation;
  if (!tech) return null;

  return (
    <Card title={tech.title || title} lead={tech.explanation}>
      <View style={[styles.table, { borderColor: colors.rule }]}>
        <View
          style={[
            styles.tableRow,
            { backgroundColor: colors.panelSunken },
          ]}
        >
          <Text style={[styles.headCell, { color: colors.textDim, flex: 1.2 }]}>
            {compTitle}
          </Text>
          <Text style={[styles.headCell, { color: colors.textDim, flex: 2 }]}>
            {funcTitle}
          </Text>
          <Text style={[styles.headCell, { color: colors.textDim, flex: 1 }]}>
            {valTitle}
          </Text>
        </View>

        {tech.components.map((comp: ComponentDetail, i: number) => (
          <View
            key={i}
            style={[
              styles.tableRow,
              {
                borderTopWidth: StyleSheet.hairlineWidth,
                borderTopColor: colors.rule,
              },
            ]}
          >
            <Text
              style={[styles.refCell, { color: colors.readout, flex: 1.2 }]}
            >
              {comp.component}
            </Text>

            <View style={styles.funcCell}>
              <Text
                style={[
                  styles.bodyCell,
                  {
                    color: colors.textDim,
                    lineHeight: lineFor('small', isHindi),
                  },
                ]}
              >
                {comp.function}
              </Text>

              {comp.important ? (
                <Text
                  style={[
                    styles.warnCell,
                    { color: colors.severity.high },
                  ]}
                >
                  ⚠ {comp.important}
                </Text>
              ) : null}
            </View>

            <Text style={[styles.valueCell, { color: colors.text, flex: 1 }]}>
              {comp.value ?? comp.value12V ?? comp.package ?? '—'}
            </Text>
          </View>
        ))}
      </View>
    </Card>
  );
}

function ResistorSection({
  fault,
  pcbTypeTitle,
  valTitle,
}: {
  fault: InverterFaultDetail;
  pcbTypeTitle: string;
  valTitle: string;
}) {
  const { colors } = useTheme();
  const { isHindi } = useLanguage();

  const rv = fault.resistorValues;
  if (!rv) return null;

  return (
    <Card title={rv.title} lead={rv.explanation}>
      <View style={[styles.table, { borderColor: colors.rule }]}>
        <View
          style={[styles.tableRow, { backgroundColor: colors.panelSunken }]}
        >
          <Text style={[styles.headCell, { color: colors.textDim, flex: 1.3 }]}>
            {pcbTypeTitle}
          </Text>
          <Text style={[styles.headCell, { color: colors.textDim, flex: 1 }]}>
            {valTitle}
          </Text>
          <Text style={[styles.headCell, { color: colors.textDim, flex: 1 }]}>
            {isHindi ? 'मार्किंग' : 'Marking'}
          </Text>
        </View>

        {rv.values.map((v, i) => (
          <View
            key={i}
            style={[
              styles.tableRow,
              {
                borderTopWidth: StyleSheet.hairlineWidth,
                borderTopColor: colors.rule,
              },
            ]}
          >
            <Text
              style={[
                styles.bodyCell,
                {
                  color: colors.textDim,
                  flex: 1.3,
                  lineHeight: lineFor('small', isHindi),
                },
              ]}
            >
              {v.pcb}
            </Text>

            <Text style={[styles.valueCell, { color: colors.readout, flex: 1 }]}>
              {v.r24}
            </Text>

            <Text style={[styles.valueCell, { color: colors.text, flex: 1 }]}>
              {v.marking}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.reasons}>
        {rv.values.map((v, i) => (
          <View key={i} style={styles.listItem}>
            <View
              style={[styles.dash, { backgroundColor: colors.textFaint }]}
            />

            <Text
              style={[
                styles.listText,
                {
                  color: colors.textFaint,
                  lineHeight: lineFor('small', isHindi),
                  fontSize: size.small,
                },
              ]}
            >
              <Text style={{ color: colors.textDim, fontWeight: weight.semi }}>
                {v.pcb}
              </Text>
              {`: ${v.reason}`}
            </Text>
          </View>
        ))}
      </View>
    </Card>
  );
}

/**
 * Causes are alternatives, not a sequence — so they get separators, not
 * numbers. Numbering them would imply a check order that does not exist.
 */
function CausesSection({
  fault,
  title,
}: {
  fault: InverterFaultDetail;
  title: string;
}) {
  const { colors } = useTheme();
  const { isHindi } = useLanguage();

  if (!fault.possibleCauses || fault.possibleCauses.length === 0) return null;

  return (
    <Card title={title}>
      <View>
        {fault.possibleCauses.map((item, i) => (
          <View
            key={i}
            style={[
              styles.cause,
              i > 0 && {
                borderTopWidth: StyleSheet.hairlineWidth,
                borderTopColor: colors.rule,
              },
            ]}
          >
            <Text
              style={[
                styles.causeTitle,
                { color: colors.text, lineHeight: lineFor('body', isHindi) },
              ]}
            >
              {item.cause}
            </Text>

            <Text
              style={[
                styles.causeText,
                {
                  color: colors.textDim,
                  lineHeight: lineFor('small', isHindi),
                },
              ]}
            >
              {item.explanation}
            </Text>
          </View>
        ))}
      </View>
    </Card>
  );
}

/** Repair steps are a real sequence, so here the numbering earns its place. */
function RepairSection({
  fault,
  title,
}: {
  fault: InverterFaultDetail;
  title: string;
}) {
  const { colors } = useTheme();
  const { isHindi } = useLanguage();

  if (!fault.repairProcedure || fault.repairProcedure.length === 0) return null;

  return (
    <Card title={title}>
      <View>
        {fault.repairProcedure.map((step, i) => (
          <View
            key={step.step}
            style={[
              styles.step,
              i > 0 && {
                borderTopWidth: StyleSheet.hairlineWidth,
                borderTopColor: colors.rule,
              },
            ]}
          >
            <View
              style={[
                styles.stepMark,
                {
                  backgroundColor: colors.panelSunken,
                  borderColor: colors.rule,
                },
              ]}
            >
              <Text style={[styles.stepNumber, { color: colors.signal }]}>
                {step.step}
              </Text>
            </View>

            <View style={styles.stepText}>
              <Text
                style={[
                  styles.stepTitle,
                  { color: colors.text, lineHeight: lineFor('body', isHindi) },
                ]}
              >
                {step.title}
              </Text>

              <Text
                style={[
                  styles.stepBody,
                  {
                    color: colors.textDim,
                    lineHeight: lineFor('small', isHindi),
                  },
                ]}
              >
                {step.explanation}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </Card>
  );
}

export default function FaultDetailScreen() {
  const { id, faultId } = useLocalSearchParams<{
    id: string;
    faultId: string;
  }>();

  const { language, isHindi } = useLanguage();
  const { colors } = useTheme();
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

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

  const severityColor =
    colors.severity[fault.severity] ?? colors.severity.medium;

  const severityLabel = tr(
    language,
    severityKeys[fault.severity] ?? 'mediumRisk',
  );

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={[styles.safeArea, { backgroundColor: colors.surface }]}
    >
      <AppHeader showBack showMenu title={fault.title} subtitle={fault.subtitle} />

      <DiagramViewerModal
        visible={isImageModalOpen}
        source={fault.diagramImage}
        title={fault.title}
        subtitle={tr(language, 'zoomHint')}
        onClose={() => setIsImageModalOpen(false)}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Severity is the first thing a technician needs, before any procedure. */}
        <View
          style={[
            styles.severityBar,
            { backgroundColor: colors.panel, borderColor: colors.rule },
          ]}
        >
          <View style={[styles.edge, { backgroundColor: severityColor }]} />

          <View style={styles.severityInner}>
            <Text style={styles.severityIcon}>{fault.icon}</Text>

            <Text style={[styles.severityLabel, { color: severityColor }]}>
              {severityLabel}
            </Text>
          </View>
        </View>

        {fault.usedPins ? (
          <View
            style={[
              styles.pinsBar,
              { backgroundColor: colors.panel, borderColor: colors.rule },
            ]}
          >
            <Text style={[styles.pinsLabel, { color: colors.textDim }]}>
              {isHindi ? 'IC पिन विवरण:' : 'Microcontroller Pins:'}
            </Text>
            <View
              style={[
                styles.pinsBadge,
                {
                  backgroundColor: colors.panelSunken,
                  borderColor: colors.ruleStrong,
                },
              ]}
            >
              <Text style={[styles.pinsValue, { color: colors.readout }]}>
                Pins: {fault.usedPins}
              </Text>
            </View>
          </View>
        ) : null}

        <BulletSection
          title={tr(language, 'symptoms')}
          items={fault.symptoms}
        />

        <Card title={tr(language, 'pcbDiagram')}>
          {fault.diagramImage ? (
            <Pressable
              onPress={() => setIsImageModalOpen(true)}
              accessibilityRole="button"
              accessibilityLabel={tr(language, 'viewSchematic')}
              style={({ pressed }) => [
                styles.diagramWell,
                {
                  backgroundColor: colors.panelSunken,
                  borderColor: pressed ? colors.readout : colors.rule,
                },
              ]}
            >
              <Image
                source={fault.diagramImage}
                style={styles.diagramImage}
                resizeMode="contain"
              />

              <View
                style={[
                  styles.zoomHint,
                  {
                    backgroundColor: colors.panel,
                    borderTopColor: colors.rule,
                  },
                ]}
              >
                <Text style={[styles.zoomHintText, { color: colors.readout }]}>
                  {tr(language, 'tapToZoom')}
                </Text>
              </View>
            </Pressable>
          ) : (
            <View
              style={[
                styles.noDiagram,
                {
                  borderColor: colors.rule,
                  backgroundColor: colors.panelSunken,
                },
              ]}
            >
              <Text
                style={[styles.noDiagramTitle, { color: colors.textDim }]}
              >
                {tr(language, 'noDiagramTitle')}
              </Text>

              <Text
                style={[
                  styles.noDiagramText,
                  {
                    color: colors.textFaint,
                    lineHeight: lineFor('small', isHindi),
                  },
                ]}
              >
                {tr(language, 'noDiagramText')}
              </Text>
            </View>
          )}
        </Card>

        <CausesSection
          fault={fault}
          title={tr(language, 'possibleCauses')}
        />

        <RepairSection
          fault={fault}
          title={tr(language, 'repairProcedure')}
        />

        {fault.circuitFlow ? (
          <Card title={tr(language, 'circuitFlow')}>
            <View
              style={[
                styles.flowWell,
                {
                  backgroundColor: colors.panelSunken,
                  borderColor: colors.rule,
                },
              ]}
            >
              <Text style={[styles.flowText, { color: colors.readout }]}>
                {fault.circuitFlow}
              </Text>
            </View>
          </Card>
        ) : null}

        <BulletSection
          title={tr(language, 'basicChecks')}
          items={fault.basicChecks}
        />

        <ResistorSection
          fault={fault}
          pcbTypeTitle={tr(language, 'pcbType')}
          valTitle={tr(language, 'value')}
        />

        <TechnicalSection
          fault={fault}
          title={tr(language, 'componentsTable')}
          compTitle={tr(language, 'component')}
          funcTitle={tr(language, 'function')}
          valTitle={tr(language, 'value')}
        />

        {fault.importantNote ? (
          <View
            style={[
              styles.flagCard,
              {
                backgroundColor: colors.panel,
                borderColor: colors.rule,
              },
            ]}
          >
            <View
              style={[
                styles.edge,
                { backgroundColor: colors.severity.high },
              ]}
            />

            <View style={styles.flagInner}>
              <Text
                style={[
                  styles.flagTitle,
                  { color: colors.severity.high },
                ]}
              >
                {tr(language, 'importantNote')}
              </Text>

              <Text
                style={[
                  styles.flagText,
                  {
                    color: colors.text,
                    lineHeight: lineFor('small', isHindi),
                  },
                ]}
              >
                {fault.importantNote}
              </Text>
            </View>
          </View>
        ) : null}

        {fault.diagnosis ? (
          <View
            style={[
              styles.flagCard,
              {
                backgroundColor: colors.verifiedSoft,
                borderColor: colors.rule,
              },
            ]}
          >
            <View
              style={[styles.edge, { backgroundColor: colors.verified }]}
            />

            <View style={styles.flagInner}>
              <Text style={[styles.flagTitle, { color: colors.verified }]}>
                {tr(language, 'diagnosisSummary')}
              </Text>

              <Text
                style={[
                  styles.flagText,
                  {
                    color: colors.text,
                    lineHeight: lineFor('small', isHindi),
                  },
                ]}
              >
                {fault.diagnosis}
              </Text>
            </View>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  content: {
    paddingHorizontal: layout.gutter,
    paddingTop: space.md,
    paddingBottom: space.xxxl + space.xl,
    gap: space.md,
  },

  /* SEVERITY BAR */

  severityBar: {
    flexDirection: 'row',
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },

  edge: {
    width: 3,
  },

  severityInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    paddingHorizontal: space.md,
    paddingVertical: space.sm,
  },

  severityIcon: {
    fontSize: 15,
  },

  severityLabel: {
    fontSize: size.small,
    fontWeight: weight.bold,
  },

  /* SHARED CARD */

  card: {
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    padding: space.lg,
  },

  cardTitle: {
    fontSize: size.sub,
    fontWeight: weight.bold,
    letterSpacing: -0.2,
  },

  cardRule: {
    height: StyleSheet.hairlineWidth,
    marginTop: space.md,
    marginBottom: space.md,
  },

  lead: {
    fontSize: size.small,
    marginBottom: space.md,
  },

  /* BULLET LIST */

  list: {
    gap: space.md,
  },

  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: space.md,
  },

  dash: {
    width: 9,
    height: 1.5,
    marginTop: 10,
    flexShrink: 0,
  },

  listText: {
    flex: 1,
    fontSize: size.body,
  },

  reasons: {
    marginTop: space.md,
    gap: space.sm,
  },

  /* TABLES */

  table: {
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },

  tableRow: {
    flexDirection: 'row',
    paddingHorizontal: space.md,
    paddingVertical: space.sm + 1,
    gap: space.sm,
  },

  headCell: {
    fontSize: size.micro,
    fontWeight: weight.semi,
  },

  bodyCell: {
    fontSize: size.small,
  },

  funcCell: {
    flex: 2,
    paddingRight: space.xs,
  },

  /* Component references and measured values both read as data, so both are mono. */
  refCell: {
    fontFamily: mono,
    fontSize: size.small,
    fontWeight: weight.semi,
  },

  valueCell: {
    fontFamily: mono,
    fontSize: size.small,
    fontWeight: weight.semi,
  },

  warnCell: {
    fontSize: size.micro,
    fontWeight: weight.medium,
    marginTop: 3,
  },

  /* CAUSES */

  cause: {
    paddingVertical: space.md,
  },

  causeTitle: {
    fontSize: size.body,
    fontWeight: weight.semi,
  },

  causeText: {
    fontSize: size.small,
    marginTop: 2,
  },

  /* REPAIR STEPS */

  step: {
    flexDirection: 'row',
    gap: space.md,
    paddingVertical: space.md,
  },

  stepMark: {
    width: 28,
    height: 28,
    borderRadius: radius.sm,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 1,
  },

  stepNumber: {
    fontFamily: mono,
    fontSize: size.small,
    fontWeight: weight.bold,
  },

  stepText: {
    flex: 1,
  },

  stepTitle: {
    fontSize: size.body,
    fontWeight: weight.semi,
  },

  stepBody: {
    fontSize: size.small,
    marginTop: 2,
  },

  /* PINS BAR */

  pinsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: space.md,
    paddingVertical: space.sm,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    gap: space.sm,
  },

  pinsLabel: {
    fontSize: size.small,
    fontWeight: weight.semi,
  },

  pinsBadge: {
    paddingHorizontal: space.sm,
    paddingVertical: 2,
    borderRadius: radius.sm,
    borderWidth: StyleSheet.hairlineWidth,
  },

  pinsValue: {
    fontFamily: mono,
    fontSize: size.small,
    fontWeight: weight.bold,
  },

  /* DIAGRAM LINK BUTTON */

  diagramLinkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: space.md,
    paddingHorizontal: space.lg,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    gap: space.sm,
  },

  diagramLinkIcon: {
    fontSize: 16,
  },

  diagramLinkText: {
    fontSize: size.body,
    fontWeight: weight.bold,
  },

  diagramLinkArrow: {
    fontSize: 16,
    fontWeight: weight.bold,
  },

  /* DIAGRAM */

  diagramWell: {
    width: '100%',
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },

  diagramImage: {
    width: '100%',
    height: 220,
  },

  zoomHint: {
    alignItems: 'center',
    paddingVertical: space.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
  },

  zoomHintText: {
    fontSize: size.small,
    fontWeight: weight.semi,
  },

  noDiagram: {
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'dashed',
    paddingVertical: space.xxl,
    paddingHorizontal: space.lg,
    alignItems: 'center',
    gap: space.xs,
  },

  noDiagramTitle: {
    fontSize: size.body,
    fontWeight: weight.semi,
  },

  noDiagramText: {
    fontSize: size.small,
    textAlign: 'center',
  },

  /* CIRCUIT FLOW — a readout window, not a card. */

  flowWell: {
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    padding: space.md,
  },

  flowText: {
    fontFamily: mono,
    fontSize: size.small,
    fontWeight: weight.medium,
    lineHeight: 22,
  },

  /* NOTE + DIAGNOSIS */

  flagCard: {
    flexDirection: 'row',
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },

  flagInner: {
    flex: 1,
    padding: space.lg,
  },

  flagTitle: {
    fontSize: size.body,
    fontWeight: weight.bold,
    marginBottom: space.sm,
  },

  flagText: {
    fontSize: size.small,
  },

  /* NOT FOUND */

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: space.xl,
  },

  notFound: {
    fontSize: size.sub,
    fontWeight: weight.bold,
  },
});

