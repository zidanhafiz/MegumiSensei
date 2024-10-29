"use client";
import { HiraganaKatakanaGuessQuestionType } from "@/types/QuestionTypes";
import { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from "react";

interface HiraganaKatakanaGuessContextType {
  questions: HiraganaKatakanaGuessQuestionType[];
  setQuestions: Dispatch<SetStateAction<HiraganaKatakanaGuessQuestionType[]>>;
  toggleAnswer: (id: number) => void;
  checkAnswer: (id: number, answer: string) => { isCorrect: boolean; message: string };
}

const HiraganaKatakanaGuessContext = createContext<HiraganaKatakanaGuessContextType | undefined>(undefined);

export default function HiraganaKatakanaGuessProvider({ children }: { children: ReactNode }) {
  const [questions, setQuestions] = useState<HiraganaKatakanaGuessQuestionType[]>([]);

  const toggleAnswer = (id: number) => {
    setQuestions((prevQuestions) => prevQuestions.map((question) => ({ ...question, isAnswer: question.id === id ? !question.isAnswer : question.isAnswer })));
  };

  const checkAnswer = (id: number, answer: string) => {
    const question = questions.find((question) => question.id === id);

    const isCorrect = question?.answer === answer;

    if (isCorrect) {
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) => ({
          ...question,
          isAnswer: question.id === id ? true : question.isAnswer,
          isCorrect: question.id === id ? true : question.isCorrect,
        }))
      );

      return {
        isCorrect: true,
        message: "Jawaban benar!",
      };
    }

    setQuestions((prevQuestions) =>
      prevQuestions.map((question) => ({
        ...question,
        isAnswer: question.id === id ? true : question.isAnswer,
        isCorrect: question.id === id ? false : question.isCorrect,
      }))
    ); 

    return {
      isCorrect: false,
      message: "Jawaban salah!",
    };
  };

  return (
    <HiraganaKatakanaGuessContext.Provider value={{ questions, setQuestions, toggleAnswer, checkAnswer }}>{children}</HiraganaKatakanaGuessContext.Provider>
  );
}

export const useHiraganaKatakanaGuess = () => {
  const context = useContext(HiraganaKatakanaGuessContext);
  if (context === undefined) {
    throw new Error("useHiraganaKatakanaGuess must be used within a HiraganaKatakanaGuessProvider");
  }
  return context;
};
