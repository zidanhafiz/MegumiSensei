"use client";
import { useGuessWords } from "@/contexts/GuessWordsProvider";
import { GuessQuestionType } from "@/types/questionTypes";
import { notoSans } from "@/utils/fonts";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa6";

type GuessQuestionProps = {
  index: number;
  isFinished: boolean;
  handleNextQuestion: () => void;
  gameType: string | null;
};

export default function GuessQuestion({ index, isFinished, handleNextQuestion, gameType }: GuessQuestionProps) {
  const [message, setMessage] = useState<string>("");
  const [currentAnswer, setCurrentAnswer] = useState<string>("");
  const [question, setQuestion] = useState<GuessQuestionType | null>(null);

  const { questions, setQuestions } = useGuessWords();

  const nextQuestion = () => {
    setCurrentAnswer("");
    setMessage("");
    handleNextQuestion();
  };

  const handleAnswer = (answer: string) => {
    if (question?.is_answered) return;
    setCurrentAnswer(answer);

    let isCorrect = false;
    if (question?.answer === answer) {
      setMessage("Jawaban Benar!");
      isCorrect = true;
    } else {
      setMessage("Jawaban Salah!");
      isCorrect = false;
    }

    const updatedQuestion = question && { ...question, user_answer: answer, is_answered: true, is_correct: isCorrect };
    const updatedQuestions = questions && questions.map((question) => (question.id === updatedQuestion?.id ? updatedQuestion : question));

    localStorage.setItem("guess_words_game", JSON.stringify(updatedQuestions));

    setQuestion(updatedQuestion);
    setQuestions(updatedQuestions);
  };

  useEffect(() => {
    setQuestion(questions?.[index] ?? null);
    setCurrentAnswer(questions?.[index]?.user_answer ?? "");
    setMessage(questions?.[index]?.is_correct ? "Jawaban Benar!" : "Jawaban Salah!");
  }, [index, questions]);

  if (!question) return null;

  return (
    <div className='w-fit mx-auto flex flex-col items-center'>
      <span className='text-gray-500'>Question {index + 1}</span>
      <h2 className='text-4xl font-semibold mt-6'>{question.question}</h2>
      <div className='flex flex-wrap gap-2 mt-10 justify-center'>
        {question.options.map((option) => (
          <button
            key={option}
            value={option}
            className={`btn btn-outline ${
              currentAnswer === option ? (question.is_correct !== null ? (question.is_correct === true ? "btn-info" : "btn-error") : "") : ""
            } ${notoSans.className} text-lg`}
            onClick={() => handleAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
      {question.is_answered && (
        <div className='mt-8 text-center'>
          <p className='font-semibold'>{message}</p>
          <p className='italic mt-4'>{question.answer}</p>
          <hr className='my-2' />
          <p className='italic mb-4'>{question.translation ?? "-"}</p>
          {isFinished ? (
            <Link
              className='btn btn-accent btn-wide'
              href={`/guess-words/${gameType}-guess/finish`}
            >
              Lihat hasil latihan
              <FaArrowRight className='text-lg' />
            </Link>
          ) : (
            <button
              className='btn btn-primary btn-wide'
              onClick={nextQuestion}
            >
              Lanjut
              <FaArrowRight className='text-lg' />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
