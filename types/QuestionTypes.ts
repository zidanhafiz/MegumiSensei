export type HiraganaKatakanaGuessQuestionType = {
  id: number;
  question: string;
  answer: string;
  options: string[];
  isAnswer: boolean;
  isCorrect?: boolean | null;
};
