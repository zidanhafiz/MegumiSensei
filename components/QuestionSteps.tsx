"use client";
import { GuessQuestionType } from "@/types/questionTypes";

export default function QuestionSteps({ questions }: { questions: GuessQuestionType[] }) {
  return (
    <ul className='steps mx-auto mb-8 flex flex-wrap justify-center'>
      {questions.map((question) => (
        <li key={question.id} className={`step ${question.is_answered ? (question.is_correct ? "step-info" : "step-error") : ""}`}></li>
      ))}
    </ul>
  );
}
