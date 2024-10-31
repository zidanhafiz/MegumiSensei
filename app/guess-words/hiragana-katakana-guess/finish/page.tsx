"use client";
import { useHiraganaKatakanaGuess } from "@/contexts/HiraganaKatakanaGuessContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import FinishMockup from "../../FinishMockup";
import { HiraganaKatakanaGuessResultsType } from "@/types/questionTypes";
import { getHiraganaKatakanaGuessResults } from "@/actions/hiraganaKatakanaGuess";
import LoadingPage from "../../LoadingPage";

export default function FinishPage() {
  const { questions } = useHiraganaKatakanaGuess();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [results, setResults] = useState<HiraganaKatakanaGuessResultsType | null>(null);
  const [isQuestionsExist, setIsQuestionsExist] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);

    if (questions.length === 0) {
      setIsQuestionsExist(false);
      router.push("/guess-words/hiragana-katakana-guess");
    } else {
      setIsQuestionsExist(true);
      const getResults = async () => {
        const results = await getHiraganaKatakanaGuessResults(questions);
        setResults(results.data);
        setIsLoading(false);
      };

      getResults();
    }
  }, [questions, router]);

  if (isLoading || !isQuestionsExist || !results) {
    return (
      <div className='h-[calc(100vh-28rem)] flex items-center justify-center'>
        <LoadingPage message='Memproses hasil latihan...' />
      </div>
    );
  }

  return <FinishMockup data={results} />;
}
