export type GuessQuestionType = {
  id: number;
  question: string;
  options: string[];
  is_answered: boolean;
  user_answer: string | null;
  is_correct?: boolean | null;
  answer?: string | null;
  translation?: string | null;
};

export type GuessResultsType = {
  correctAnswers: number;
  wrongAnswers: number;
  totalQuestions: number;
  result: number;
  message: string;
};

export type QuestionConfigType = {
  type?: string;
  limit?: number;
  level?: string;
};
