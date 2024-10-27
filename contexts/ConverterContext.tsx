"use client";
import { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from "react";

interface ConverterContextType {
  converter: { from: string; to: string };
  setConverter: Dispatch<SetStateAction<{ from: string; to: string }>>;
  switchConverter: () => void;
}

const ConverterContext = createContext<ConverterContextType | undefined>(undefined);

export default function ConverterProvider({ children }: { children: ReactNode }) {
  const [converter, setConverter] = useState<{ from: string; to: string }>({ from: "Kanji", to: "Hiragana" });

  const switchConverter = () => {
    setConverter((prevConverter) => ({
      from: prevConverter.to,
      to: prevConverter.from,
    }));
  };

  return <ConverterContext.Provider value={{ converter, setConverter, switchConverter }}>{children}</ConverterContext.Provider>;
}

export const useConverter = () => {
  const context = useContext(ConverterContext);
  if (context === undefined) {
    throw new Error("useConverter must be used within a ConverterProvider");
  }
  return context;
};
