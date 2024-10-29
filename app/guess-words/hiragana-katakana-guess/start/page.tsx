"use client";
import GuessQuestion from "@/components/GuessQuestion";
import QuestionSteps from "@/components/QuestionSteps";
import { useHiraganaKatakanaGuess } from "@/contexts/HiraganaKatakanaGuessContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function StartPage() {
  const { questions } = useHiraganaKatakanaGuess();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const router = useRouter();

  const handleNextQuestion = () => {
    if (currentQuestionIndex === questions.length - 1) {
      router.push("/guess-words/hiragana-katakana-guess");
      return;
    }
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  if (questions.length === 0) {
    useEffect(() => {
      router.push("/guess-words/hiragana-katakana-guess");
    }, [questions, router]);

    return;
  }

  useEffect(() => {
    if (currentQuestionIndex === questions.length - 1) {
      setIsFinished(true);
      return;
    }

    setIsFinished(false);
  }, [currentQuestionIndex]);

  return (
    <div className='flex flex-col items-center'>
      <div className='overflow-x-auto'>
        <QuestionSteps questions={questions} />
      </div>
      <GuessQuestion question={questions[currentQuestionIndex]} isFinished={isFinished} handleNextQuestion={handleNextQuestion} />
    </div>
  );
}
