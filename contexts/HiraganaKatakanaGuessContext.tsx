"use client";
import { HiraganaKatakanaGuessQuestionType } from "@/types/questionTypes";
import { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from "react";

type HiraganaKatakanaGuessContextType = {
  questions: HiraganaKatakanaGuessQuestionType[] | null;
  setQuestions: Dispatch<SetStateAction<HiraganaKatakanaGuessQuestionType[] | null>>;
  setupQuestions: (questionsConfig: { type: string; limit: number; level: string }) => void;
  questionsConfig: { type: string; limit: number; level: string } | null;
  isStarted: boolean;
  setIsStarted: Dispatch<SetStateAction<boolean>>;
};

const HiraganaKatakanaGuessContext = createContext<HiraganaKatakanaGuessContextType | undefined>(undefined);

export default function HiraganaKatakanaGuessProvider({ children }: { children: ReactNode }) {
  const [questions, setQuestions] = useState<HiraganaKatakanaGuessQuestionType[] | null>(null);
  const [questionsConfig, setQuestionsConfig] = useState<{ type: string; limit: number; level: string } | null>(null);
  const [isStarted, setIsStarted] = useState<boolean>(false);

  const setupQuestions = (questionsConfig: { type: string; limit: number; level: string }) => {
    setQuestionsConfig(questionsConfig);
    return;
  };

  return (
    <HiraganaKatakanaGuessContext.Provider value={{ questions, setQuestions, setupQuestions, questionsConfig, isStarted, setIsStarted }}>
      {children}
    </HiraganaKatakanaGuessContext.Provider>
  );
}

export const useHiraganaKatakanaGuess = () => {
  const context = useContext(HiraganaKatakanaGuessContext);
  if (context === undefined) {
    throw new Error("useHiraganaKatakanaGuess must be used within a HiraganaKatakanaGuessProvider");
  }
  return context;
};
