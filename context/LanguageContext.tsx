import React, {
  createContext,
  useContext,
  useState,
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
    useState<Language>('hi');

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
