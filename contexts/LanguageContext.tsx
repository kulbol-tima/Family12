'use client';

import { createContext, useState, useContext } from 'react';

const LanguageContext = createContext({
  language: 'ru',
  setLanguage: (language: string) => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState('ru');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
