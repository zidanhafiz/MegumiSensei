"use client";
import GuessQuestion from "@/components/GuessQuestion";
import QuestionSteps from "@/components/QuestionSteps";
import { useHiraganaKatakanaGuess } from "@/contexts/HiraganaKatakanaGuessContext";
import { useEffect, useState } from "react";
import LoadingPage from "../../LoadingPage";
import { generateHiraganaKatakanaGuessQuestions } from "@/actions/hiraganaKatakanaGuess";
import { useRouter } from "next/navigation";
import { HiraganaKatakanaGuessQuestionType } from "@/types/questionTypes";
import { useUser } from "@/contexts/UserContext";

export default function StartPage() {
  const { questions, isStarted, questionsConfig, setQuestions, setIsStarted } = useHiraganaKatakanaGuess();
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
      const localQuestions = localStorage.getItem("hirakata_game");

      if (localQuestions) {
        const questions = JSON.parse(localQuestions) as HiraganaKatakanaGuessQuestionType[];
        const index = questions.findIndex((question: HiraganaKatakanaGuessQuestionType) => !question.is_answered);

        setQuestions(questions);

        if (index === -1) {
          setCurrentQuestionIndex(questions.length - 1);
          return;
        }

        setCurrentQuestionIndex(index);
        return;
      }
      router.push("/guess-words/hiragana-katakana-guess");
      return;
    }

    const createQuestions = async () => {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("type", questionsConfig.type);
      formData.append("limit", questionsConfig.limit.toString());
      formData.append("level", questionsConfig.level);

      const questions = await generateHiraganaKatakanaGuessQuestions(formData);

      if (questions.success && questions.data.length > 0) {
        setQuestions(questions.data);
        localStorage.setItem("hirakata_game", JSON.stringify(questions.data));
        getUser();
      } else {
        console.error("Failed to generate questions");
        setQuestions(null);
        localStorage.removeItem("hirakata_game");
        router.push("/guess-words/hiragana-katakana-guess");
      }

      localStorage.removeItem("hirakata_game_results");
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
      <GuessQuestion index={currentQuestionIndex} isFinished={isFinished} handleNextQuestion={handleNextQuestion} />
    </div>
  );
}
