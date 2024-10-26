"use client";
import { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from 'react';

interface LanguageContextType {
  language: { from: string; to: string };
  setLanguage: Dispatch<SetStateAction<{ from: string; to: string }>>;
  switchLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<{ from: string; to: string }>({ from: "Indonesia", to: "Japanese" });

  const switchLanguage = () => {
    setLanguage(prevLanguage => ({
      from: prevLanguage.to,
      to: prevLanguage.from,
    }));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
