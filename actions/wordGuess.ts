"use server";
import z, { ZodError } from "zod";
import { GuessQuestionType, GuessResultsType } from "@/types/questionTypes";
import { getFilteredVocabularies } from "@/utils/supabase/fetcherApi/server/vocabularies";
import { generateRandomIndexes } from "@/utils/randomIndexes";
import { randomInt } from "crypto";
import { deductUserCredits } from "./profile";

const generateWordGuessQuestionsSchema = z.object({
  type: z.enum(["japan-to-indonesia", "indonesia-to-japan"]),
  limit: z.number().min(5, { message: "Jumlah kata minimal 5" }).max(30, { message: "Jumlah kata maksimal 30" }),
  level: z.enum(["mix", "n5", "n4"]),
});

export async function generateWordGuessQuestions(data: FormData): Promise<{ success: boolean; data: GuessQuestionType[] }> {
  const { type, limit, level } = generateWordGuessQuestionsSchema.parse({
    type: data.get("type") as string,
    limit: parseInt(data.get("limit") as string),
    level: data.get("level") as string,
  });

  try {
    const data = await getFilteredVocabularies({ type: "both", level, startRange: "random", kanji: "mix" });
    const questionType = type === "japan-to-indonesia" ? "word" : "meaning";
    const answerType = type === "japan-to-indonesia" ? "meaning" : "word";

    if (!data || data.length === 0 || data.length < limit) {
      throw new Error("No data found");
    }

    const randomIndexes = generateRandomIndexes(limit, data.length);

    const questions = randomIndexes.map((index) => {
      let attempts = 0;
      let options: string[];

      do {
        const randomOptionIndexes = generateRandomIndexes(4, data.length, randomIndexes);
        const randomOptionIndex = randomInt(0, 3);
        randomOptionIndexes.splice(randomOptionIndex, 1, index);

        options = randomOptionIndexes.map((optionIndex) => data[optionIndex][answerType] ?? "");
        attempts++;

        // Prevent infinite loop
        if (attempts > 10) {
          throw new Error("Could not generate unique options");
        }
      } while (new Set(options).size !== 4);

      return {
        id: data[index].id,
        question: data[index][questionType],
        answer: data[index][answerType],
        options,
        is_answered: false,
        is_correct: null,
        user_answer: null,
        translation: data[index].kanji ?? null,
      };
    });

    const credits = await deductUserCredits(1);

    if (!credits.success) {
      return {
        success: false,
        data: [],
      };
    }

    return {
      success: true,
      data: questions as GuessQuestionType[],
    };
  } catch (error) {
    console.error(error);

    if (error instanceof ZodError) {
      return {
        success: false,
        data: [],
      };
    }

    return {
      success: false,
      data: [],
    };
  }
}

export async function getWordGuessResults(questions: GuessQuestionType[]): Promise<{ success: boolean; data: GuessResultsType }> {
  let correctAnswers = 0;
  let wrongAnswers = 0;

  questions.forEach((question) => {
    if (question.is_correct) correctAnswers++;
    else wrongAnswers++;
  });

  const totalQuestions = questions.length;

  const result = Math.round((correctAnswers / totalQuestions) * 100) || 0;

  let message = "";

  if (result === 100) message = "おめでとう！君はヒーローだね！";
  else if (result >= 80) message = "すごい！80%以上の正解率だよ！";
  else if (result >= 60) message = "まあまあ！60%以上の正解率だよ！";
  else message = "残念！60%未満の正解率だよ！";

  return {
    success: true,
    data: { correctAnswers, wrongAnswers, totalQuestions, result, message },
  };
}
