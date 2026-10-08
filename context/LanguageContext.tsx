import { useStoredPreference } from '@/hooks/useStoredPreference';
const LANGUAGES = ['en', 'hi'] as const;
import React, {
  createContext,
  useContext,
} from 'react';

export type Language = 'en' | 'hi';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  isHindi: boolean;
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'hi',
  setLanguage: () => {},
  isHindi: true,
});

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, setLanguage] =
    useStoredPreference<Language>('settings.language', 'hi', LANGUAGES);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        isHindi: language === 'hi',
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
