import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import { Alert, AppState, Platform } from 'react-native';

import PlayStoreUpdateModal from '@/components/PlayStoreUpdateModal';
import { useLanguage } from '@/context/LanguageContext';
import { checkPlayStoreUpdate, getUpdateCheckErrorMessage, openPlayStore, UpdateInfo } from '@/utils/appUpdateService';

interface UpdateContextType {
  updateInfo: UpdateInfo | null;
  isChecking: boolean;
  checkForUpdates: (manual?: boolean) => Promise<void>;
  showUpdateModal: () => void;
  hideUpdateModal: () => void;
}

const UpdateContext = createContext<UpdateContextType | undefined>(undefined);

export function UpdateProvider({ children }: { children: React.ReactNode }) {
  const [updateInfo, setUpdateInfo] = useState<UpdateInfo | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const { isHindi } = useLanguage();
  const checking = useRef(false);
  const mounted = useRef(false);
  const appState = useRef(AppState.currentState);

  const storeButtons = useCallback(() => [
    { text: isHindi ? 'बंद करें' : 'Close', style: 'cancel' as const },
    { text: isHindi ? 'Play Store खोलें' : 'Open Play Store', onPress: () => {
      void openPlayStore().catch(() => Alert.alert(
        isHindi ? 'स्टोर नहीं खुल सका' : 'Could not open store',
        isHindi ? 'Play Store ऐप में Malik Electronic खोजें।' : 'Search for Malik Electronic in the Play Store app.',
      ));
    } },
  ], [isHindi]);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  const checkForUpdates = useCallback(
    async (manual = false) => {
      if (checking.current) return;
      checking.current = true;
      try {
        setIsChecking(true);
        const result = await checkPlayStoreUpdate();
        if (!mounted.current) return;

        if (result.status === 'unsupported') {
          if (manual) Alert.alert(
            isHindi ? 'प्ले स्टोर जाँच उपलब्ध नहीं' : 'Play Store check unavailable',
            isHindi ? 'यह सुविधा Google Play से इंस्टॉल किए गए Android ऐप में उपलब्ध है।' : 'This check requires the Android app installed from Google Play.',
            storeButtons(),
          );
          return;
        }

        if (result.updateAvailable) {
          setUpdateInfo(result);
          setModalVisible(appState.current === 'active' || appState.current === null);
        } else {
          setUpdateInfo(null);
          setModalVisible(false);
          if (manual) {
            Alert.alert(
              isHindi ? 'ऐप अप-टू-डेट है' : 'App is Up to Date',
              isHindi
                ? `आपके इंस्टॉल किए गए ऐप (v${result.currentVersion}) के लिए Google Play पर अभी कोई अपडेट उपलब्ध नहीं है।`
                : `Google Play currently has no update available for your installed app (v${result.currentVersion}).`,
              [{ text: isHindi ? 'ठीक है' : 'OK' }],
            );
          }
        }
      } catch (error) {
        if (manual && mounted.current) {
          Alert.alert(
            isHindi ? 'त्रुटि' : 'Check Failed',
            getUpdateCheckErrorMessage(error, isHindi),
            storeButtons(),
          );
        }
      } finally {
        checking.current = false;
        if (mounted.current) setIsChecking(false);
      }
    },
    [isHindi, storeButtons],
  );

  const latestCheck = useRef(checkForUpdates);
  latestCheck.current = checkForUpdates;

  // No persisted dismissal: remind on every launch and return to the app.
  // Repeated active events and simultaneous manual checks do not stack requests.
  useEffect(() => {
    if (Platform.OS !== 'android') return;
    const timer = setTimeout(() => {
      if (appState.current === 'active' || appState.current === null) void latestCheck.current(false);
    }, 1500);
    const subscription = AppState.addEventListener('change', next => {
      const previous = appState.current;
      appState.current = next;
      if (next === 'active' && previous !== 'active') {
        clearTimeout(timer);
        void latestCheck.current(false);
      }
    });

    return () => { clearTimeout(timer); subscription.remove(); };
  }, []);

  const showUpdateModal = useCallback(() => {
    if (updateInfo?.updateAvailable) {
      setModalVisible(true);
    } else {
      checkForUpdates(true);
    }
  }, [updateInfo, checkForUpdates]);

  const hideUpdateModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  return (
    <UpdateContext.Provider
      value={{
        updateInfo,
        isChecking,
        checkForUpdates,
        showUpdateModal,
        hideUpdateModal,
      }}
    >
      {children}

      <PlayStoreUpdateModal
        visible={modalVisible}
        updateInfo={updateInfo}
        onClose={hideUpdateModal}
      />
    </UpdateContext.Provider>
  );
}

export function useAppUpdate() {
  const context = useContext(UpdateContext);
  if (!context) {
    throw new Error('useAppUpdate must be used within an UpdateProvider');
  }
  return context;
}

