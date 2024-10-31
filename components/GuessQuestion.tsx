"use client";
import { useHiraganaKatakanaGuess } from "@/contexts/HiraganaKatakanaGuessContext";
import { HiraganaKatakanaGuessQuestionType } from "@/types/questionTypes";
import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa6";

type GuessQuestionProps = {
  index: number;
  question: HiraganaKatakanaGuessQuestionType;
  isFinished: boolean;
  handleNextQuestion: () => void;
};

export default function GuessQuestion({ index, question, isFinished, handleNextQuestion }: GuessQuestionProps) {
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isAnswer, setIsAnswer] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [currentAnswer, setCurrentAnswer] = useState<string>("");

  const { checkAnswer } = useHiraganaKatakanaGuess();

  const handleCheckAnswer = (answer: string) => {
    if (isAnswer) return;
    setCurrentAnswer(answer);

    const result = checkAnswer(question.id, answer);

    setIsCorrect(result.isCorrect);
    setMessage(result.message);
    setIsAnswer(true);
  };

  const nextQuestion = () => {
    setCurrentAnswer("");
    setIsCorrect(null);
    setMessage("");
    setIsAnswer(false);
    handleNextQuestion();
  };

  useEffect(() => {
    setIsAnswer(question.isAnswer);
  }, [question]);

  return (
    <div className='w-fit mx-auto flex flex-col items-center'>
      <span className='text-gray-500'>Question {index + 1}</span>
      <h2 className='text-4xl font-semibold mt-6'>{question.question}</h2>
      <div className='flex flex-wrap gap-2 mt-10 justify-center'>
        {question.options.map((option) => (
          <button
            key={option}
            value={option}
            className={`btn btn-outline ${currentAnswer === option ? (isCorrect ? "btn-info" : "btn-error") : ""}`}
            onClick={() => handleCheckAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
      {isAnswer && (
        <div className='mt-8 text-center'>
          <p className='font-semibold'>{message}</p>
          <p className='italic my-4'>{question.answer}</p>
          <button className='btn btn-accent btn-wide' onClick={nextQuestion}>
            {isFinished ? "Lihat hasil latihan" : "Lanjut"}
            <FaArrowRight className='text-lg' />
          </button>
        </div>
      )}
    </div>
  );
}
