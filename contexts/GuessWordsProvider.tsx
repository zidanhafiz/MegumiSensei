"use client";
import { GuessQuestionType, QuestionConfigType } from "@/types/questionTypes";
import { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from "react";

type GuessWordsContextType = {
  questions: GuessQuestionType[] | null;
  setQuestions: Dispatch<SetStateAction<GuessQuestionType[] | null>>;
  setupQuestions: (questionsConfig: QuestionConfigType) => void;
  questionsConfig: QuestionConfigType | null;
  isStarted: boolean;
  setIsStarted: Dispatch<SetStateAction<boolean>>;
  gameType: string | null;
  setGameType: Dispatch<SetStateAction<string | null>>;
};

const GuessWordsContext = createContext<GuessWordsContextType | undefined>(undefined);

export default function GuessWordsProvider({ children }: { children: ReactNode }) {
  const [questions, setQuestions] = useState<GuessQuestionType[] | null>(null);
  const [questionsConfig, setQuestionsConfig] = useState<QuestionConfigType | null>(null);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [gameType, setGameType] = useState<string | null>(null);

  const setupQuestions = (questionsConfig: QuestionConfigType) => {
    setQuestionsConfig(questionsConfig);
    return;
  };

  return (
    <GuessWordsContext.Provider value={{ questions, setQuestions, setupQuestions, questionsConfig, isStarted, setIsStarted, gameType, setGameType }}>
      {children}
    </GuessWordsContext.Provider>
  );
}

export const useGuessWords = () => {
  const context = useContext(GuessWordsContext);
  if (context === undefined) {
    throw new Error("useGuessWords must be used within a GuessWordsProvider");
  }
  return context;
};
