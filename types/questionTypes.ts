export type HiraganaKatakanaGuessQuestionType = {
  id: number;
  question: string;
  options: string[];
  is_answered: boolean;
  user_answer: string | null;
  is_correct?: boolean | null;
  answer?: string | null;
};

export type HiraganaKatakanaGuessResultsType = {
  correctAnswers: number;
  wrongAnswers: number;
  totalQuestions: number;
  result: number;
  message: string;
};
