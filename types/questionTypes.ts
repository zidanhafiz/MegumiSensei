export type HiraganaKatakanaGuessQuestionType = {
  id: number;
  question: string;
  answer: string;
  options: string[];
  isAnswer: boolean;
  isCorrect?: boolean | null;
};

export type HiraganaKatakanaGuessResultsType = {
  correctAnswers: number;
  wrongAnswers: number;
  totalQuestions: number;
  result: number;
  message: string;
};
