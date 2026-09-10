import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

import {
    layout,
    lineFor,
    mono,
    radius,
    size,
    space,
    ThemePreference,
    weight,
} from '@/constants/theme';
import { Language, useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { tr } from '@/data/translations';
import { useSafeNavigate } from '@/hooks/useSafeNavigate';

const DRAWER_WIDTH = Math.min(
  Dimensions.get('window').width * 0.84,
  340,
);

type Props = {
  visible: boolean;
  onClose: () => void;
};

type Option<T extends string> = {
  value: T;
  label: string;
};

/**
 * Two-or-three way switch. Used for language and appearance, which are both
 * settings a technician flips mid-job, so they sit in view rather than
 * behind a submenu.
 */
function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: Option<T>[];
  value: T;
  onChange: (next: T) => void;
}) {
  const { colors } = useTheme();

  return (
    <View style={styles.group}>
      <Text style={[styles.groupLabel, { color: colors.textFaint }]}>
        {label}
      </Text>

      <View
        style={[
          styles.segmented,
          {
            borderColor: colors.rule,
            backgroundColor: colors.panelSunken,
          },
        ]}
      >
        {options.map((option, index) => {
          const active = option.value === value;

          return (
            <Pressable
              key={option.value}
              onPress={() => onChange(option.value)}
              accessibilityRole="radio"
              accessibilityState={{ selected: active }}
              accessibilityLabel={option.label}
              style={[
                styles.segment,
                index > 0 && {
                  borderLeftWidth: StyleSheet.hairlineWidth,
                  borderLeftColor: colors.rule,
                },
                active && { backgroundColor: colors.signal },
              ]}
            >
              <Text
                numberOfLines={1}
                style={[
                  styles.segmentText,
                  {
                    color: active ? colors.signalInk : colors.textDim,
                  },
                ]}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function NavRow({
  title,
  detail,
  onPress,
}: {
  title: string;
  detail: string;
  onPress: () => void;
}) {
  const { colors } = useTheme();
  const { isHindi } = useLanguage();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      style={({ pressed }) => [
        styles.navRow,
        {
          borderBottomColor: colors.rule,
          backgroundColor: pressed ? colors.panelRaised : 'transparent',
        },
      ]}
    >
      <View style={styles.navText}>
        <Text
          style={[
            styles.navTitle,
            {
              color: colors.text,
              lineHeight: lineFor('body', isHindi),
            },
          ]}
        >
          {title}
        </Text>

        <Text
          style={[
            styles.navDetail,
            {
              color: colors.textDim,
              lineHeight: lineFor('micro', isHindi),
            },
          ]}
        >
          {detail}
        </Text>
      </View>

      <Text style={[styles.navChevron, { color: colors.textFaint }]}>
        ›
      </Text>
    </Pressable>
  );
}

export default function Sidebar({ visible, onClose }: Props) {
  const { language, setLanguage, isHindi } = useLanguage();
  const { colors, preference, setPreference, reduceMotion } = useTheme();
  const { safePush } = useSafeNavigate();
  const [supportVisible, setSupportVisible] = useState(false);
  const [privacyVisible, setPrivacyVisible] = useState(false);

  const translateX = useRef(
    new Animated.Value(-DRAWER_WIDTH),
  ).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const duration = reduceMotion ? 0 : 200;

    Animated.parallel([
      Animated.timing(translateX, {
        toValue: visible ? 0 : -DRAWER_WIDTH,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: visible ? 1 : 0,
        duration,
        useNativeDriver: true,
      }),
    ]).start();
  }, [visible, reduceMotion, translateX, overlayOpacity]);

  if (!visible) return null;

  const go = (path: '/(tabs)' | '/(tabs)/two') => {
    onClose();
    safePush(path);
  };

  return (
    <View style={styles.root}>
      <SupportDialog
        visible={supportVisible}
        onClose={() => setSupportVisible(false)}
      />
      <PrivacyDialog
        visible={privacyVisible}
        onClose={() => setPrivacyVisible(false)}
      />

      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View
          style={[
            styles.overlay,
            {
              backgroundColor: colors.overlay,
              opacity: overlayOpacity,
            },
          ]}
        />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[
          styles.drawer,
          {
            backgroundColor: colors.panel,
            borderRightColor: colors.rule,
            transform: [{ translateX }],
          },
        ]}
      >
        <View
          style={[
            styles.header,
            {
              backgroundColor: colors.panelSunken,
              borderBottomColor: colors.rule,
            },
          ]}
        >
          <View
            style={[styles.mark, { borderColor: colors.signal }]}
          >
            <View
              style={[
                styles.markCore,
                { backgroundColor: colors.signal },
              ]}
            />
          </View>

          <Text style={[styles.brandName, { color: colors.text }]}>
            {tr(language, 'sidebarTitle')}
          </Text>

          <Text
            style={[
              styles.brandLine,
              {
                color: colors.textDim,
                lineHeight: lineFor('small', isHindi),
              },
            ]}
          >
            {tr(language, 'sidebarSubtitle')}
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
        >
          <NavRow
            title={tr(language, 'homepage')}
            detail={tr(language, 'modelsAndFaults')}
            onPress={() => go('/(tabs)')}
          />

          <NavRow
            title={tr(language, 'tools')}
            detail={tr(language, 'toolsSubtitle')}
            onPress={() => go('/(tabs)/two')}
          />

          <NavRow
            title={tr(language, 'support')}
            detail={tr(language, 'customerAndTechHelp')}
            onPress={() => setSupportVisible(true)}
          />

          <NavRow
            title={tr(language, 'privacyPolicy')}
            detail={tr(language, 'privacyPolicySubtitle')}
            onPress={() => setPrivacyVisible(true)}
          />

          <View style={styles.settings}>
            <Segmented<Language>
              label={tr(language, 'language')}
              value={language}
              onChange={setLanguage}
              options={[
                { value: 'en', label: 'English' },
                { value: 'hi', label: 'हिंदी' },
              ]}
            />

            <Segmented<ThemePreference>
              label={tr(language, 'appearance')}
              value={preference}
              onChange={setPreference}
              options={[
                { value: 'system', label: tr(language, 'themeSystem') },
                { value: 'light', label: tr(language, 'themeLight') },
                { value: 'dark', label: tr(language, 'themeDark') },
              ]}
            />
          </View>

          <View
            style={[styles.footer, { borderTopColor: colors.rule }]}
          >
            <Text
              style={[styles.footerVersion, { color: colors.textDim }]}
            >
              {tr(language, 'version')}
            </Text>

            <Text
              style={[styles.footerNote, { color: colors.textFaint }]}
            >
              {tr(language, 'inverterRepairCompanion')}
            </Text>
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
}

function SupportDialog({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const { language, isHindi } = useLanguage();
  const { colors } = useTheme();

  const rows = [
    { label: tr(language, 'phone'), value: tr(language, 'phoneNum') },
    { label: tr(language, 'whatsapp'), value: tr(language, 'phoneNum') },
    { label: tr(language, 'address'), value: tr(language, 'addressText') },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        style={[styles.dialogScrim, { backgroundColor: colors.overlay }]}
      >
        <View
          style={[
            styles.dialog,
            {
              backgroundColor: colors.panel,
              borderColor: colors.rule,
            },
          ]}
        >
          <Text style={[styles.dialogTitle, { color: colors.text }]}>
            {tr(language, 'supportModalTitle')}
          </Text>

          <Text
            style={[
              styles.dialogBody,
              {
                color: colors.textDim,
                lineHeight: lineFor('small', isHindi),
              },
            ]}
          >
            {tr(language, 'supportModalDesc')}
          </Text>

          <View
            style={[
              styles.dialogTable,
              {
                borderColor: colors.rule,
                backgroundColor: colors.panelSunken,
              },
            ]}
          >
            {rows.map((row, index) => (
              <View
                key={row.label}
                style={[
                  styles.dialogRow,
                  index > 0 && {
                    borderTopWidth: StyleSheet.hairlineWidth,
                    borderTopColor: colors.rule,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.dialogRowLabel,
                    { color: colors.textFaint },
                  ]}
                >
                  {row.label}
                </Text>

                <Text
                  style={[
                    styles.dialogRowValue,
                    { color: colors.readout },
                  ]}
                  selectable
                >
                  {row.value}
                </Text>
              </View>
            ))}
          </View>

          <Pressable
            onPress={onClose}
            accessibilityRole="button"
            style={({ pressed }) => [
              styles.dialogButton,
              {
                backgroundColor: colors.signal,
                opacity: pressed ? 0.85 : 1,
              },
            ]}
          >
            <Text
              style={[
                styles.dialogButtonText,
                { color: colors.signalInk },
              ]}
            >
              {tr(language, 'close')}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

function PrivacyDialog({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const { language, isHindi } = useLanguage();
  const { colors } = useTheme();

  const points = isHindi
    ? [
        {
          title: '🔒 शून्य व्यक्तिगत डेटा संग्रह',
          desc: 'यह ऐप आपका कोई भी निजी डेटा (नाम, ईमेल, फोन नंबर, लोकेशन, फोटो, फाइल्स, कैमरा आदि) एकत्र या शेयर नहीं करता है।',
        },
        {
          title: '📱 डिवाइस पर लोकल सेटिंग्स',
          desc: 'केवल भाषा (English/हिंदी) और थीम (Light/Dark) प्राथमिकताएं आपके फोन में सुरक्षित रखी जाती हैं, जो कभी किसी सर्वर पर नहीं भेजी जातीं।',
        },
        {
          title: '🌐 इंटरनेट और सर्किट डायग्राम',
          desc: 'इंटरनेट की अनुमति केवल उच्च-गुणवत्ता वाले सर्किट डायग्राम सुरक्षित HTTPS से लोड करने के लिए ली जाती है। डायग्राम लिंक इन-ऐप एन्क्रिप्टेड हैं।',
        },
        {
          title: '🚫 कोई विज्ञापन या ट्रैकिंग नहीं',
          desc: 'ऐप में शून्य विज्ञापन हैं और कोई एनालिटिक्स या ट्रैकिंग SDK शामिल नहीं है।',
        },
        {
          title: '👶 बच्चों की गोपनीयता (COPPA)',
          desc: 'ऐप किसी भी आयु वर्ग के उपयोगकर्ता का कोई व्यक्तिगत डेटा नहीं लेता है।',
        },
        {
          title: '✉️ संपर्क',
          desc: 'MaliK Electronic Repair & Spares | Email: support@mtbyown.com',
        },
      ]
    : [
        {
          title: '🔒 Zero Personal Data Collection',
          desc: 'The App does not collect, track, or share any personal identifiable information (no name, email, phone, location, camera, or storage files).',
        },
        {
          title: '📱 Local On-Device Preferences',
          desc: 'Only your language (English/Hindi) and theme (Light/Dark) preferences are stored locally in your device sandbox. Never sent to any server.',
        },
        {
          title: '🌐 Internet & Schematic Diagrams',
          desc: 'Internet permission is used solely to stream high-resolution schematic diagrams over encrypted HTTPS. Diagram references are cryptographically protected.',
        },
        {
          title: '🚫 No Advertisements or Trackers',
          desc: 'The App contains zero ads and integrates no third-party tracking or analytics SDKs.',
        },
        {
          title: '👶 Children\'s Privacy (COPPA)',
          desc: 'Complies with COPPA and Google Play Families policy. Zero personal data collected from any user.',
        },
        {
          title: '✉️ Contact & Support',
          desc: 'MaliK Electronic Repair & Spares | Email: support@mtbyown.com',
        },
      ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={[styles.dialogScrim, { backgroundColor: colors.overlay }]}>
        <View
          style={[
            styles.dialog,
            {
              backgroundColor: colors.panel,
              borderColor: colors.rule,
              maxHeight: '82%',
            },
          ]}
        >
          <Text style={[styles.dialogTitle, { color: colors.text }]}>
            {tr(language, 'privacyPolicy')}
          </Text>

          <Text
            style={[
              styles.dialogBody,
              {
                color: colors.textDim,
                lineHeight: lineFor('small', isHindi),
                marginBottom: space.sm,
              },
            ]}
          >
            {isHindi
              ? 'मालिक इलेक्ट्रॉनिक (com.muqaddas123.malikelectronic) आपकी गोपनीयता का पूरा सम्मान करता है।'
              : 'MaliK Electronic (com.muqaddas123.malikelectronic) respects your privacy.'}
          </Text>

          <ScrollView showsVerticalScrollIndicator={false} style={{ marginVertical: space.sm }}>
            <View
              style={[
                styles.dialogTable,
                {
                  borderColor: colors.rule,
                  backgroundColor: colors.panelSunken,
                },
              ]}
            >
              {points.map((pt, index) => (
                <View
                  key={index}
                  style={[
                    styles.dialogRow,
                    index > 0 && {
                      borderTopWidth: StyleSheet.hairlineWidth,
                      borderTopColor: colors.rule,
                    },
                  ]}
                >
                  <Text style={[styles.dialogRowLabel, { color: colors.signal, fontWeight: '700' }]}>
                    {pt.title}
                  </Text>
                  <Text style={[styles.dialogBody, { color: colors.textDim, marginTop: 3 }]}>
                    {pt.desc}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>

          <Pressable
            onPress={onClose}
            accessibilityRole="button"
            style={({ pressed }) => [
              styles.dialogButton,
              {
                backgroundColor: colors.signal,
                opacity: pressed ? 0.85 : 1,
              },
            ]}
          >
            <Text
              style={[
                styles.dialogButtonText,
                { color: colors.signalInk },
              ]}
            >
              {tr(language, 'close')}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
    elevation: 20,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
  },

  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    borderRightWidth: StyleSheet.hairlineWidth,
  },

  scroll: {
    paddingBottom: space.xxxl,
  },

  header: {
    paddingTop: 56,
    paddingBottom: space.xl,
    paddingHorizontal: space.xl,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  mark: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: space.md,
  },

  markCore: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },

  brandName: {
    fontSize: size.sub,
    fontWeight: weight.bold,
    letterSpacing: -0.2,
  },

  brandLine: {
    fontSize: size.small,
    marginTop: 2,
  },

  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: layout.tap + 14,
    paddingHorizontal: space.xl,
    paddingVertical: space.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  navText: {
    flex: 1,
  },

  navTitle: {
    fontSize: size.body,
    fontWeight: weight.semi,
  },

  navDetail: {
    fontSize: size.micro,
    marginTop: 1,
  },

  navChevron: {
    fontSize: 22,
  },

  settings: {
    paddingHorizontal: space.xl,
    paddingTop: space.xl,
    gap: space.xl,
  },

  group: {
    gap: space.sm,
  },

  groupLabel: {
    fontSize: size.micro,
    fontWeight: weight.semi,
  },

  segmented: {
    flexDirection: 'row',
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },

  segment: {
    flex: 1,
    minHeight: 38,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: space.xs,
  },

  segmentText: {
    fontSize: size.small,
    fontWeight: weight.semi,
  },

  footer: {
    marginTop: space.xxl,
    marginHorizontal: space.xl,
    paddingTop: space.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
  },

  footerVersion: {
    fontFamily: mono,
    fontSize: size.micro,
    fontWeight: weight.medium,
  },

  footerNote: {
    fontSize: size.micro,
    marginTop: 2,
  },

  /* SUPPORT DIALOG */

  dialogScrim: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: space.xl,
  },

  dialog: {
    width: '100%',
    maxWidth: 360,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    padding: space.xl,
  },

  dialogTitle: {
    fontSize: size.sub,
    fontWeight: weight.bold,
  },

  dialogBody: {
    fontSize: size.small,
    marginTop: space.sm,
  },

  dialogTable: {
    marginTop: space.lg,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },

  dialogRow: {
    paddingHorizontal: space.md,
    paddingVertical: space.md,
  },

  dialogRowLabel: {
    fontSize: size.micro,
    fontWeight: weight.medium,
  },

  dialogRowValue: {
    fontFamily: mono,
    fontSize: size.small,
    fontWeight: weight.semi,
    marginTop: 3,
  },

  dialogButton: {
    marginTop: space.lg,
    minHeight: layout.tap,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },

  dialogButtonText: {
    fontSize: size.body,
    fontWeight: weight.bold,
  },
});
