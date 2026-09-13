import React, { useMemo, useState } from 'react';
import {
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
import { DIAGRAM_UPDATES, DiagramUpdate } from '@/data/diagramUpdates';
import { useSafeNavigate } from '@/hooks/useSafeNavigate';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function NewDiagramsModal({ visible, onClose }: Props) {
  const { colors } = useTheme();
  const { isHindi } = useLanguage();
  const { safePush } = useSafeNavigate();
  const [filter, setFilter] = useState<'ALL' | 'NEW' | 'UPDATED'>('ALL');

  const filteredUpdates = useMemo(() => {
    if (filter === 'ALL') return DIAGRAM_UPDATES;
    return DIAGRAM_UPDATES.filter((item) => item.type === filter);
  }, [filter]);

  const newCount = useMemo(
    () => DIAGRAM_UPDATES.filter((u) => u.type === 'NEW').length,
    [],
  );
  const updatedCount = useMemo(
    () => DIAGRAM_UPDATES.filter((u) => u.type === 'UPDATED').length,
    [],
  );

  const handleOpenDiagram = (item: DiagramUpdate) => {
    onClose();
    safePush({
      pathname: '/inverter/fault/[faultId]',
      params: { id: item.inverterId, faultId: item.faultId },
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <SafeAreaView
        edges={['top', 'left', 'right', 'bottom']}
        style={[styles.container, { backgroundColor: colors.surface }]}
      >
        {/* Header */}
        <View
          style={[
            styles.header,
            { backgroundColor: colors.panel, borderBottomColor: colors.rule },
          ]}
        >
          <View style={styles.headerTitleGroup}>
            <View style={styles.titleRow}>
              <Text style={styles.headerIcon}>⚡</Text>
              <Text
                style={[
                  styles.headerTitle,
                  { color: colors.text, lineHeight: lineFor('title', isHindi) },
                ]}
              >
                {isHindi ? 'नए व अपडेटेड डायग्राम' : 'Newly Added Diagrams'}
              </Text>
            </View>
            <Text
              style={[
                styles.headerSubtitle,
                { color: colors.textDim, lineHeight: lineFor('small', isHindi) },
              ]}
            >
              {isHindi
                ? 'डायग्राम और रिपेयरिंग गाइड देखने के लिए किसी भी कार्ड पर टैप करें।'
                : 'Tap any diagram to open full schematic and troubleshooting guide.'}
            </Text>
          </View>

          <Pressable
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel={isHindi ? 'बंद करें' : 'Close'}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            style={({ pressed }) => [
              styles.closeBtn,
              {
                backgroundColor: pressed ? colors.panelRaised : colors.panelSunken,
                borderColor: colors.rule,
              },
            ]}
          >
            <Text style={[styles.closeText, { color: colors.text }]}>✕</Text>
          </Pressable>
        </View>

        {/* Filter Pills */}
        <View style={styles.filterRow}>
          <Pressable
            onPress={() => setFilter('ALL')}
            style={[
              styles.filterPill,
              {
                backgroundColor:
                  filter === 'ALL' ? colors.readout : colors.panelSunken,
                borderColor: filter === 'ALL' ? colors.readout : colors.rule,
              },
            ]}
          >
            <Text
              style={[
                styles.filterText,
                { color: filter === 'ALL' ? colors.surface : colors.text },
              ]}
            >
              {isHindi ? 'सभी' : 'All'} ({DIAGRAM_UPDATES.length})
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setFilter('NEW')}
            style={[
              styles.filterPill,
              {
                backgroundColor:
                  filter === 'NEW' ? colors.severity.low : colors.panelSunken,
                borderColor:
                  filter === 'NEW' ? colors.severity.low : colors.rule,
              },
            ]}
          >
            <Text
              style={[
                styles.filterText,
                { color: filter === 'NEW' ? '#ffffff' : colors.text },
              ]}
            >
              ✨ {isHindi ? 'नए जोड़े गए' : 'Newly Added'} ({newCount})
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setFilter('UPDATED')}
            style={[
              styles.filterPill,
              {
                backgroundColor:
                  filter === 'UPDATED' ? colors.signal : colors.panelSunken,
                borderColor:
                  filter === 'UPDATED' ? colors.signal : colors.rule,
              },
            ]}
          >
            <Text
              style={[
                styles.filterText,
                { color: filter === 'UPDATED' ? '#ffffff' : colors.text },
              ]}
            >
              🔄 {isHindi ? 'अपडेटेड' : 'Updated'} ({updatedCount})
            </Text>
          </Pressable>
        </View>

        {/* Diagram Cards List */}
        <FlatList
          data={filteredUpdates}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const isNew = item.type === 'NEW';
            const badgeColor = isNew ? colors.severity.low : colors.signal;
            const badgeText = isNew
              ? isHindi
                ? '✨ नया डायग्राम'
                : '✨ NEW DIAGRAM'
              : isHindi
                ? '🔄 अपडेटेड'
                : '🔄 UPDATED';

            return (
              <Pressable
                onPress={() => handleOpenDiagram(item)}
                accessibilityRole="button"
                accessibilityLabel={`${item.title}, ${item.inverterModel}`}
                style={({ pressed }) => [
                  styles.card,
                  {
                    backgroundColor: pressed ? colors.panelRaised : colors.panel,
                    borderColor: pressed ? colors.ruleStrong : colors.rule,
                  },
                ]}
              >
                {/* Left accent color strip */}
                <View style={[styles.cardEdge, { backgroundColor: badgeColor }]} />

                <View style={styles.cardBody}>
                  {/* Top Meta: Inverter Model & Badge */}
                  <View style={styles.cardHeaderRow}>
                    <View
                      style={[
                        styles.modelPill,
                        {
                          backgroundColor: colors.panelSunken,
                          borderColor: colors.rule,
                        },
                      ]}
                    >
                      <Text
                        style={[styles.modelText, { color: colors.textDim }]}
                        numberOfLines={1}
                      >
                        {item.inverterName} • {item.inverterModel}
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.badge,
                        {
                          backgroundColor: isNew
                            ? 'rgba(16, 185, 129, 0.15)'
                            : 'rgba(59, 130, 246, 0.15)',
                          borderColor: badgeColor,
                        },
                      ]}
                    >
                      <Text style={[styles.badgeText, { color: badgeColor }]}>
                        {badgeText}
                      </Text>
                    </View>
                  </View>

                  {/* Title */}
                  <Text
                    style={[
                      styles.cardTitle,
                      { color: colors.text, lineHeight: lineFor('sub', isHindi) },
                    ]}
                    numberOfLines={2}
                  >
                    {isHindi ? item.titleHi : item.title}
                  </Text>

                  {/* Description */}
                  <Text
                    style={[
                      styles.cardDesc,
                      {
                        color: colors.textDim,
                        lineHeight: lineFor('small', isHindi),
                      },
                    ]}
                    numberOfLines={3}
                  >
                    {isHindi ? item.descriptionHi : item.description}
                  </Text>

                  {/* Bottom details row: Pins and Action Button */}
                  <View style={styles.bottomRow}>
                    {item.usedPins ? (
                      <View
                        style={[
                          styles.pinsBadge,
                          {
                            backgroundColor: colors.panelSunken,
                            borderColor: colors.rule,
                          },
                        ]}
                      >
                        <Text style={[styles.pinsLabel, { color: colors.textFaint }]}>
                          {isHindi ? 'IC पिन:' : 'IC Pins:'}
                        </Text>
                        <Text style={[styles.pinsVal, { color: colors.readout }]}>
                          {item.usedPins}
                        </Text>
                      </View>
                    ) : (
                      <View />
                    )}

                    <View style={styles.actionBtn}>
                      <Text style={[styles.actionText, { color: colors.readout }]}>
                        {isHindi ? 'डायग्राम देखें' : 'View Diagram'} ›
                      </Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            );
          }}
        />
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: layout.gutter,
    paddingTop: space.md,
    paddingBottom: space.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerTitleGroup: {
    flex: 1,
    paddingRight: space.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.xs,
  },
  headerIcon: {
    fontSize: size.title,
  },
  headerTitle: {
    fontSize: size.title,
    fontWeight: weight.bold,
  },
  headerSubtitle: {
    fontSize: size.small,
    marginTop: 2,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  closeText: {
    fontSize: size.body,
    fontWeight: weight.bold,
  },
  filterRow: {
    flexDirection: 'row',
    gap: space.xs,
    paddingHorizontal: layout.gutter,
    paddingVertical: space.sm,
  },
  filterPill: {
    paddingHorizontal: space.sm + 2,
    paddingVertical: space.xs + 1,
    borderRadius: radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
  },
  filterText: {
    fontSize: size.micro,
    fontWeight: weight.semi,
  },
  listContent: {
    paddingHorizontal: layout.gutter,
    paddingTop: space.xs,
    paddingBottom: space.xxxl,
    gap: space.sm,
  },
  card: {
    flexDirection: 'row',
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  cardEdge: {
    width: 4,
  },
  cardBody: {
    flex: 1,
    padding: space.md,
    gap: space.xs,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space.sm,
    marginBottom: 2,
  },
  modelPill: {
    flex: 1,
    paddingHorizontal: space.xs + 2,
    paddingVertical: 2,
    borderRadius: radius.sm,
    borderWidth: StyleSheet.hairlineWidth,
  },
  modelText: {
    fontSize: size.micro,
    fontWeight: weight.medium,
  },
  badge: {
    paddingHorizontal: space.xs + 2,
    paddingVertical: 2,
    borderRadius: radius.sm,
    borderWidth: StyleSheet.hairlineWidth,
  },
  badgeText: {
    fontSize: size.micro,
    fontWeight: weight.bold,
    letterSpacing: 0.5,
  },
  cardTitle: {
    fontSize: size.sub,
    fontWeight: weight.bold,
  },
  cardDesc: {
    fontSize: size.small,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: space.xs,
  },
  pinsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: space.xs + 2,
    paddingVertical: 2,
    borderRadius: radius.sm,
    borderWidth: StyleSheet.hairlineWidth,
  },
  pinsLabel: {
    fontSize: size.micro,
  },
  pinsVal: {
    fontFamily: mono,
    fontSize: size.micro,
    fontWeight: weight.bold,
  },
  actionBtn: {
    paddingVertical: 2,
  },
  actionText: {
    fontSize: size.small,
    fontWeight: weight.bold,
  },
});
