"use client";
import { HiraganaKatakanaGuessQuestionType } from "@/types/QuestionTypes";

export default function QuestionSteps({ questions }: { questions: HiraganaKatakanaGuessQuestionType[] }) {
  return (
    <ul className='steps mx-auto mb-8 flex flex-wrap justify-center'>
      {questions.map((question) => (
        <li key={question.id} className={`step ${question.isAnswer ? (question.isCorrect ? "step-info" : "step-error") : ""}`}></li>
      ))}
    </ul>
  );
}
