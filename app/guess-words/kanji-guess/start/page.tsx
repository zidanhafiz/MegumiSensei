"use client";
import GuessQuestion from "@/components/GuessQuestion";
import QuestionSteps from "@/components/QuestionSteps";
import { useEffect, useState } from "react";
import LoadingPage from "../../LoadingPage";
import { useRouter } from "next/navigation";
import { GuessQuestionType } from "@/types/questionTypes";
import { useUser } from "@/contexts/UserContext";
import { generateKanjiGuessQuestions } from "@/actions/kanjiGuess";
import { useGuessWords } from "@/contexts/GuessWordsProvider";

export default function StartPage() {
  const { questions, isStarted, questionsConfig, setQuestions, setIsStarted } = useGuessWords();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { getUser } = useUser();

  const router = useRouter();

  const handleNextQuestion = () => {
    if (!questions || currentQuestionIndex === questions.length - 1) return;

    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
    if (!questions) return;

    if (currentQuestionIndex === questions.length - 1) {
      setIsFinished(true);
      setIsStarted(false);
    }
  }, [currentQuestionIndex, questions, setIsStarted]);

  useEffect(() => {
    if (!isStarted || !questionsConfig) {
      const localQuestions = localStorage.getItem("guess_words_game");

      if (localQuestions) {
        const questions = JSON.parse(localQuestions) as GuessQuestionType[];
        const index = questions.findIndex((question: GuessQuestionType) => !question.is_answered);

        setQuestions(questions);

        if (index === -1) {
          setCurrentQuestionIndex(questions.length - 1);
          return;
        }

        setCurrentQuestionIndex(index);
        return;
      }
      router.push("/guess-words/kanji-guess");
      return;
    }

    const createQuestions = async () => {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("limit", questionsConfig.limit?.toString() || "5");
      formData.append("level", questionsConfig.level || "mix");

      const questions = await generateKanjiGuessQuestions(formData);

      if (questions.success && questions.data.length > 0) {
        setQuestions(questions.data);
        localStorage.setItem("guess_words_game", JSON.stringify(questions.data));
        getUser();
      } else {
        console.error("Failed to generate questions");
        setQuestions(null);
        localStorage.removeItem("guess_words_game");
        router.push("/guess-words/kanji-guess");
      }

      localStorage.removeItem("guess_words_results");
      setIsLoading(false);
      return;
    };

    createQuestions();
  }, [isStarted, questionsConfig, setQuestions, router, getUser]);

  if (isLoading || !questions)
    return (
      <div className='h-[calc(100vh-28rem)] flex items-center justify-center'>
        <LoadingPage message='Memuat soal latihan...' />
      </div>
    );

  return (
    <div className='flex flex-col items-center'>
      <div className='overflow-x-auto'>
        <QuestionSteps questions={questions} />
      </div>
      <GuessQuestion
        index={currentQuestionIndex}
        isFinished={isFinished}
        handleNextQuestion={handleNextQuestion}
        gameType='kanji'
      />
    </div>
  );
}
