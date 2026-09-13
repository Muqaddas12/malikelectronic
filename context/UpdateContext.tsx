import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';
import { Alert } from 'react-native';

import PlayStoreUpdateModal from '@/components/PlayStoreUpdateModal';
import { useLanguage } from '@/context/LanguageContext';
import { checkPlayStoreUpdate, UpdateInfo } from '@/utils/appUpdateService';

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

  const checkForUpdates = useCallback(
    async (manual = false) => {
      try {
        setIsChecking(true);
        const result = await checkPlayStoreUpdate();

        if (result.updateAvailable) {
          setUpdateInfo(result);
          setModalVisible(true);
        } else if (manual) {
          Alert.alert(
            isHindi ? 'ऐप अप-टू-डेट है' : 'App is Up to Date',
            isHindi
              ? `आप पहले से ही नवीनतम वर्शन (v${result.currentVersion}) का उपयोग कर रहे हैं। प्ले स्टोर पर कोई नया अपडेट नहीं है।`
              : `You are already using the latest version (v${result.currentVersion}). No new updates on Play Store.`,
            [{ text: isHindi ? 'ठीक है' : 'OK' }],
          );
        }
      } catch {
        if (manual) {
          Alert.alert(
            isHindi ? 'त्रुटि' : 'Check Failed',
            isHindi
              ? 'अपडेट की जांच करने में असमर्थ। कृपया इंटरनेट कनेक्शन जांचें।'
              : 'Unable to check for updates. Please check your internet connection.',
            [{ text: isHindi ? 'ठीक है' : 'OK' }],
          );
        }
      } finally {
        setIsChecking(false);
      }
    },
    [isHindi],
  );

  // Automatically check on app startup after a brief delay
  useEffect(() => {
    const timer = setTimeout(() => {
      checkForUpdates(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [checkForUpdates]);

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

