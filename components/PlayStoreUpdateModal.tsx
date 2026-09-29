import React from 'react';
import {
    Alert,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {
    lineFor,
    mono,
    radius,
    size,
    space,
    weight,
} from '@/constants/theme';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { openPlayStore, UpdateInfo } from '@/utils/appUpdateService';

type Props = {
  visible: boolean;
  updateInfo: UpdateInfo | null;
  onClose: () => void;
};

export default function PlayStoreUpdateModal({
  visible,
  updateInfo,
  onClose,
}: Props) {
  const { colors } = useTheme();
  const { isHindi } = useLanguage();

  if (!updateInfo) return null;

  const handleUpdatePress = () => {
    void openPlayStore(updateInfo.playStoreUrl).catch(() => Alert.alert(
      isHindi ? 'प्ले स्टोर नहीं खुल सका' : 'Could not open Play Store',
      isHindi ? 'कृपया Play Store में Malik Electronic खोजें।' : 'Please search for Malik Electronic in the Play Store.',
    ));
  };

  const currentVer = updateInfo.currentVersion ? `v${updateInfo.currentVersion}` : `${isHindi ? 'बिल्ड' : 'Build'} ${updateInfo.currentVersionCode}`;
  const latestVer = updateInfo.latestVersion ? `v${updateInfo.latestVersion}` : `${isHindi ? 'बिल्ड' : 'Build'} ${updateInfo.versionCode}`;

  const notes = isHindi
    ? updateInfo.releaseNotesHi ||
      'आपके ऐप का नया अपडेट उपलब्ध है। बदलाव देखने और अपडेट करने के लिए Play Store खोलें।'
    : updateInfo.releaseNotes ||
      'An update is available for your app. Open the Play Store to see what changed and install it.';

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={updateInfo.forceUpdate ? undefined : onClose}
    >
      <View style={styles.overlay}>
        <View
          style={[
            styles.dialog,
            {
              backgroundColor: colors.panel,
              borderColor: colors.severity.low,
            },
          ]}
        >
          {/* Top Edge Indicator */}
          <View
            style={[
              styles.accentEdge,
              { backgroundColor: colors.severity.low },
            ]}
          />

          {/* Icon and Play Store Tag */}
          <View style={styles.headerRow}>
            <View
              style={[
                styles.iconBadge,
                {
                  backgroundColor: colors.panelSunken,
                  borderColor: colors.rule,
                },
              ]}
            >
              <Text style={styles.icon}>🚀</Text>
            </View>

            <View style={styles.headerMeta}>
              <View
                style={[
                  styles.playStorePill,
                  {
                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                    borderColor: colors.severity.low,
                  },
                ]}
              >
                <Text
                  style={[styles.playStoreText, { color: colors.severity.low }]}
                >
                  ⚡ GOOGLE PLAY STORE
                </Text>
              </View>

              <Text
                style={[styles.appTitle, { color: colors.textDim }]}
                numberOfLines={1}
              >
                MaliK Electronic
              </Text>
            </View>
          </View>

          {/* Title */}
          <Text
            style={[
              styles.title,
              { color: colors.text, lineHeight: lineFor('title', isHindi) },
            ]}
          >
            {isHindi
              ? 'प्ले स्टोर पर नया अपडेट उपलब्ध है!'
              : 'New Update Available on Play Store!'}
          </Text>

          {/* Version Comparison Badges */}
          <View
            style={[
              styles.versionRow,
              {
                backgroundColor: colors.panelSunken,
                borderColor: colors.rule,
              },
            ]}
          >
            <View style={styles.versionCol}>
              <Text style={[styles.verLabel, { color: colors.textFaint }]}>
                {isHindi ? 'वर्तमान वर्शन' : 'Installed'}
              </Text>
              <Text style={[styles.verValue, { color: colors.textDim }]}>
                {currentVer}
              </Text>
            </View>

            <Text style={[styles.arrow, { color: colors.textFaint }]}>➔</Text>

            <View style={styles.versionCol}>
              <Text style={[styles.verLabel, { color: colors.severity.low }]}>
                {isHindi ? 'नया वर्शन' : 'Latest'}
              </Text>
              <Text
                style={[
                  styles.verValue,
                  styles.latestValue,
                  { color: colors.severity.low },
                ]}
              >
                {latestVer}
              </Text>
            </View>
          </View>

          {/* Description / What's New */}
          <View style={styles.notesContainer}>
            <Text
              style={[
                styles.notesTitle,
                { color: colors.textDim, lineHeight: lineFor('micro', isHindi) },
              ]}
            >
              {isHindi ? 'नया क्या है:' : "WHAT'S NEW:"}
            </Text>
            <Text
              style={[
                styles.notesText,
                { color: colors.text, lineHeight: lineFor('small', isHindi) },
              ]}
            >
              {notes}
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonGroup}>
            {/* Primary Update Button */}
            <Pressable
              onPress={handleUpdatePress}
              accessibilityRole="button"
              accessibilityLabel={
                isHindi ? 'अपडेट करने के लिए क्लिक करें' : 'Click to Update'
              }
              style={({ pressed }) => [
                styles.primaryBtn,
                {
                  backgroundColor: pressed
                    ? colors.severity.low
                    : colors.signal,
                },
              ]}
            >
              <Text style={styles.primaryBtnText}>
                {isHindi ? 'अपडेट करने के लिए क्लिक करें' : 'Click to Update'} ›
              </Text>
            </Pressable>

            {/* Later / Dismiss Button (if not forced) */}
            {!updateInfo.forceUpdate ? (
              <Pressable
                onPress={onClose}
                accessibilityRole="button"
                accessibilityLabel={isHindi ? 'बाद में' : 'Later'}
                style={({ pressed }) => [
                  styles.secondaryBtn,
                  {
                    backgroundColor: pressed
                      ? colors.panelRaised
                      : colors.panelSunken,
                    borderColor: colors.rule,
                  },
                ]}
              >
                <Text
                  style={[styles.secondaryBtnText, { color: colors.textDim }]}
                >
                  {isHindi ? 'बाद में (Later)' : 'Later'}
                </Text>
              </Pressable>
            ) : null}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: space.lg,
  },
  dialog: {
    width: '100%',
    maxWidth: 380,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    overflow: 'hidden',
    padding: space.lg,
    gap: space.md,
  },
  accentEdge: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    marginTop: space.xs,
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 22,
  },
  headerMeta: {
    flex: 1,
    gap: 2,
  },
  playStorePill: {
    alignSelf: 'flex-start',
    paddingHorizontal: space.xs + 2,
    paddingVertical: 2,
    borderRadius: radius.sm,
    borderWidth: StyleSheet.hairlineWidth,
  },
  playStoreText: {
    fontSize: size.micro,
    fontWeight: weight.bold,
    letterSpacing: 0.5,
  },
  appTitle: {
    fontSize: size.small,
    fontWeight: weight.medium,
  },
  title: {
    fontSize: size.sub + 1,
    fontWeight: weight.bold,
  },
  versionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: space.sm,
    paddingHorizontal: space.md,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
  },
  versionCol: {
    alignItems: 'center',
    gap: 2,
  },
  verLabel: {
    fontSize: size.micro,
    fontWeight: weight.medium,
    textTransform: 'uppercase',
  },
  verValue: {
    fontFamily: mono,
    fontSize: size.body,
    fontWeight: weight.semi,
  },
  latestValue: {
    fontWeight: weight.bold,
  },
  arrow: {
    fontSize: size.body,
    fontWeight: weight.bold,
  },
  notesContainer: {
    gap: 4,
  },
  notesTitle: {
    fontSize: size.micro,
    fontWeight: weight.bold,
    letterSpacing: 0.5,
  },
  notesText: {
    fontSize: size.small,
  },
  buttonGroup: {
    gap: space.xs + 2,
    marginTop: space.xs,
  },
  primaryBtn: {
    paddingVertical: space.sm + 2,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: {
    color: '#ffffff',
    fontSize: size.body,
    fontWeight: weight.bold,
    letterSpacing: 0.3,
  },
  secondaryBtn: {
    paddingVertical: space.sm,
    borderRadius: radius.sm,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: {
    fontSize: size.small,
    fontWeight: weight.medium,
  },
});

