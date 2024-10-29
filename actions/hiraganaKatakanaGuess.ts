"use server";
import OpenAI from "openai";
import z, { ZodError } from "zod";
import { HiraganaKatakanaGuessQuestionType } from "@/types/QuestionTypes";

const generateHiraganaKatakanaGuessQuestionsSchema = z.object({
  language: z.enum(["both", "hiragana", "katakana"]),
  wordCount: z.number().min(5, { message: "Jumlah kata minimal 5" }).max(30, { message: "Jumlah kata maksimal 30" }),
  questionType: z.enum(["both", "word", "sentence"]),
});

type JsonResponse = {
  questions: HiraganaKatakanaGuessQuestionType[];
};

export async function generateHiraganaKatakanaGuessQuestions(data: FormData): Promise<{ success: boolean; data: HiraganaKatakanaGuessQuestionType[] }> {
  const { language, wordCount, questionType } = generateHiraganaKatakanaGuessQuestionsSchema.parse({
    language: data.get("language") as string,
    wordCount: parseInt(data.get("wordCount") as string),
    questionType: data.get("questionType") as string,
  });

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const prompt = `
    You are an expert in Japanese language. 
    Generate the multiple choice questions for guessing the Hiragana or Katakana with romaji representation

    Rules:
    1. Generate questions with the given word count.

    2. You can generate questions with the following LanguageType:
      - If the LanguageType is "hiragana", the questions are about Hiragana.
      Example:
      question: こんにちは (Hiragana)
      answer: Konnichiwa
      options: Konbanwa, Konnichiwa, Kuruma, Denwa

      - If the LanguageType is "katakana", the questions are about Katakana.
      Example:
      question: コンニチハ (Katakana)
      answer: Konnichiwa
      options: Konbanwa, Konnichiwa, Kuruma, Denwa

      - If the LanguageType is "both", So the questions can be either Hiragana or Katakana.
    3. You can generate questions with the following QuestionType:
      - If the QuestionType is "word", the questions are about words.
      Example:
      question: は (Hiragana)
      answer: Ha
      options: Ka, Ki, Ha, Ke

      - If the QuestionType is "sentence", the questions are about sentences.
      Example:
      question: こんにちは (Hiragana)
      answer: Konnichiwa
      options: Konbanwa, Konnichiwa, Kuruma, Denwa

      - If the QuestionType is "both", So the questions can be either word or sentence.

    For each item, provide:
    1. The question id (number)
    2. The question (Japanese text in Hiragana or Katakana)
    3. The answer (Romaji representation)
    4. The options (4 options of romaji representation)
    5. The isAnswer (boolean) set to false for default
    6. The isCorrect (boolean | null) set to null for default

    Format the response as a JSON object with the following structure:
    {
      "questions": [  
        {
          "id": "number",
          "question": "string",
          "answer": "string",
          "options": ["string", "string", "string", "string"],
          "isAnswer": "boolean",
          "isCorrect": "boolean"
        }
      ]
    }
    
    Example:
    user input: Generate 3 questions with the LanguageType: hiragana and QuestionType: sentence

    response:
    {
      "questions": [
        {
          "id": 1,
          "question": "こんにちは",
          "answer": "Konnichiwa",
          "options": ["Konbanwa", "Konnichiwa", "Kuruma", "Denwa"],
          "isAnswer": false,
          "isCorrect": null
        },
        {
          "id": 2,
          "question": "ありがとう",
          "answer": "Arigatou",
          "options": ["Arigatou", "Konnichiwa", "Kuruma", "Denwa"],
          "isAnswer": false,
          "isCorrect": null
        },
        {
          "id": 3,
          "question": "おひようび",
          "answer": "Ohiyoo",
          "options": ["Ohiyoo", "Konnichiwa", "Kuruma", "Denwa"],
          "isAnswer": false,
          "isCorrect": null
        }
      ]
    }
    `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: prompt,
        },
        {
          role: "user",
          content: `Generate ${wordCount} questions with the LanguageType: ${language} and QuestionType: ${questionType}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 4096,
      top_p: 1,
      frequency_penalty: 0.2,
      presence_penalty: 0.2,
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "hiraganaKatakanaGuessQuestions",
          schema: {
            type: "object",
            properties: {
              questions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "number" },
                    question: { type: "string" },
                    answer: { type: "string" },
                    options: { type: "array", items: { type: "string" } },
                    isAnswer: { type: "boolean" },
                    isCorrect: { type: "boolean" },
                  },
                  required: ["id", "question", "answer", "options", "isAnswer", "isCorrect"],
                  additionalProperties: false,
                },
              },
            },
            required: ["questions"],
            additionalProperties: false,
          },
        },
      },
    });

    const response = completion.choices[0].message.content;

    if (!response) throw new Error("No response from AI");

    const data = JSON.parse(response) as JsonResponse;

    return {
      success: true,
      data: data.questions,
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
