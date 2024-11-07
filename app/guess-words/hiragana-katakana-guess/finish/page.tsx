"use client";
import { useGuessWords } from "@/contexts/GuessWordsProvider";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import FinishMockup from "../../FinishMockup";
import { GuessResultsType } from "@/types/questionTypes";
import { getHiraganaKatakanaGuessResults } from "@/actions/hiraganaKatakanaGuess";
import LoadingPage from "../../LoadingPage";

export default function FinishPage() {
  const { questions, setGameType } = useGuessWords();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [results, setResults] = useState<GuessResultsType | null>(null);

  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);

    const localResults = localStorage.getItem("guess_words_results");

    if (localResults) {
      setResults(JSON.parse(localResults));
      setIsLoading(false);
      return;
    } else if (!localResults && questions) {
      const getResults = async () => {
        const results = await getHiraganaKatakanaGuessResults(questions);
        setResults(results.data);
        setIsLoading(false);
        localStorage.setItem("guess_words_results", JSON.stringify(results.data));
      };

      getResults();
      setGameType(null);
      localStorage.removeItem("guess_words_game");
    } else {
      router.push("/guess-words/hiragana-katakana-guess");
      return;
    }
  }, [questions, router, setGameType]);

  if (isLoading || !results) {
    return (
      <div className='h-[calc(100vh-28rem)] flex items-center justify-center'>
        <LoadingPage message='Memproses hasil latihan...' />
      </div>
    );
  }

  return <FinishMockup data={results} />;
}
