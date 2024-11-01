"use server";
import z, { ZodError } from "zod";
import { HiraganaKatakanaGuessQuestionType, HiraganaKatakanaGuessResultsType } from "@/types/questionTypes";
import { getFilteredVocabularies } from "@/utils/supabase/fetcherApi/server/vocabularies";
import { generateRandomIndexes } from "@/utils/randomIndexes";
import { randomInt } from "crypto";

const generateHiraganaKatakanaGuessQuestionsSchema = z.object({
  type: z.enum(["both", "hiragana", "katakana"]),
  limit: z.number().min(5, { message: "Jumlah kata minimal 5" }).max(30, { message: "Jumlah kata maksimal 30" }),
  level: z.enum(["mix", "n5", "n4"]),
});

export async function generateHiraganaKatakanaGuessQuestions(data: FormData): Promise<{ success: boolean; data: HiraganaKatakanaGuessQuestionType[] }> {
  const { type, limit, level } = generateHiraganaKatakanaGuessQuestionsSchema.parse({
    type: data.get("type") as string,
    limit: parseInt(data.get("limit") as string),
    level: data.get("level") as string,
  });

  try {
    const data = await getFilteredVocabularies({ type, level, startRange: "random" });

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

        options = randomOptionIndexes.map((optionIndex) => data[optionIndex].romaji ?? "");
        attempts++;

        // Prevent infinite loop
        if (attempts > 10) {
          throw new Error("Could not generate unique options");
        }
      } while (new Set(options).size !== 4);

      return {
        id: data[index].id,
        question: data[index].word,
        answer: data[index].romaji,
        options,
        is_answered: false,
        is_correct: null,
        user_answer: null,
      };
    });

    return {
      success: true,
      data: questions,
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

export async function getHiraganaKatakanaGuessResults(
  questions: HiraganaKatakanaGuessQuestionType[]
): Promise<{ success: boolean; data: HiraganaKatakanaGuessResultsType }> {
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
