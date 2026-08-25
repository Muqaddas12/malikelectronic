import React from 'react';

import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  router,
  useLocalSearchParams,
} from 'expo-router';

import { getFaultById } from '@/data/faults';

const severityColors = {
  low: '#16A34A',
  medium: '#CA8A04',
  high: '#EA580C',
  critical: '#DC2626',
};

type BulletSectionProps = {
  title: string;
  items: string[];
};

function BulletSection({
  title,
  items,
}: BulletSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>
        {title}
      </Text>

      <View style={styles.list}>
        {items.map((item, index) => (
          <View
            key={`${item}-${index}`}
            style={styles.listItem}
          >
            <View style={styles.dot} />

            <Text style={styles.listText}>
              {item}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default function FaultDetailScreen() {
  const { faultId } =
    useLocalSearchParams<{
      faultId: string;
    }>();

  const fault = getFaultById(faultId);

  if (!fault) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <Text style={styles.notFound}>
            Fault not found
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const severityColor =
    severityColors[fault.severity];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F7F8FA"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>
            ‹ Back
          </Text>
        </Pressable>

        <View style={styles.hero}>
          <View style={styles.iconCircle}>
            <Text style={styles.icon}>
              {fault.icon}
            </Text>
          </View>

          <Text style={styles.title}>
            {fault.title}
          </Text>

          <Text style={styles.subtitle}>
            {fault.subtitle}
          </Text>

          <View
            style={[
              styles.severity,
              {
                backgroundColor:
                  severityColor,
              },
            ]}
          >
            <Text style={styles.severityText}>
              {fault.severity.toUpperCase()} RISK
            </Text>
          </View>
        </View>

        <View style={styles.warning}>
          <Text style={styles.warningTitle}>
            ⚠ Safety First
          </Text>

          <Text style={styles.warningText}>
            Disconnect mains and battery power
            before opening the inverter. Work on
            mains-voltage and high-current circuits
            only if you are properly trained and
            equipped.
          </Text>
        </View>

        <BulletSection
          title="Symptoms"
          items={fault.symptoms}
        />

        <BulletSection
          title="Possible Causes"
          items={fault.possibleCauses}
        />

        <BulletSection
          title="Checks"
          items={fault.checks}
        />

        <BulletSection
          title="Recommended Solution"
          items={fault.solution}
        />

        {fault.components &&
          fault.components.length > 0 && (
            <BulletSection
              title="Components Involved"
              items={fault.components}
            />
          )}

        {fault.safety &&
          fault.safety.length > 0 && (
            <BulletSection
              title="Important Safety Notes"
              items={fault.safety}
            />
          )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },

  content: {
    padding: 18,
    paddingBottom: 50,
  },

  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingRight: 15,
    marginBottom: 12,
  },

  backText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2563EB',
  },

  hero: {
    backgroundColor: '#111827',
    borderRadius: 26,
    padding: 22,
    alignItems: 'center',
  },

  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,

    backgroundColor: '#FFFFFF',

    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: 14,
  },

  icon: {
    fontSize: 34,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
  },

  subtitle: {
    color: '#D1D5DB',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 7,
    lineHeight: 20,
  },

  severity: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginTop: 15,
  },

  severityText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
  },

  warning: {
    backgroundColor: '#FFF7ED',
    borderWidth: 1,
    borderColor: '#FED7AA',
    borderRadius: 18,

    padding: 16,

    marginTop: 16,
  },

  warningTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#C2410C',
  },

  warningText: {
    color: '#7C2D12',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 6,
  },

  section: {
    backgroundColor: '#FFFFFF',

    borderRadius: 18,

    padding: 18,

    marginTop: 14,

    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#111827',
    marginBottom: 12,
  },

  list: {
    gap: 11,
  },

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
  },

  listText: {
    flex: 1,

    color: '#4B5563',

    fontSize: 14,
    lineHeight: 21,
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  notFound: {
    fontSize: 18,
    fontWeight: '800',
  },
});