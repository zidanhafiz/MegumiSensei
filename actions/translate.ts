"use server";
import OpenAI from "openai";
import z, { ZodError } from "zod";
import { deductUserCredits } from "./profile";

const translateTextSchema = z.object({
  content: z.string().min(3, { message: "Minimal 3 huruf" }).max(1000, { message: "Maksimal 1000 huruf" }),
  from: z.string().min(3, { message: "Minimal 3 huruf" }).max(100, { message: "Maksimal 100 huruf" }).trim(),
  to: z.string().min(3, { message: "Minimal 3 huruf" }).max(100, { message: "Maksimal 100 huruf" }).trim(),
});

export async function translateText(data: FormData): Promise<{ success: boolean; data: string }> {
  const { content, from, to } = translateTextSchema.parse({
    content: data.get("content") as string,
    from: data.get("from") as string,
    to: data.get("to") as string,
  });

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const prompt = `
    Please act as an expert translator between Japanese and Indonesian, translating text accurately in a casual, friendly tone as if two friends were speaking.

    Guidelines:
    1. If translating from Indonesian to Japanese:
      - Provide the translation in two forms:
        1. Japanese (using kanji/hiragana/katakana as appropriate).
        2. Romaji (Japanese pronunciation in Latin characters).
      - The result format should be:
          "今日は雨だね \nKyou wa ame da ne"

    2. If translating from Japanese to Indonesian:
      - If the Japanese text contains kanji/hiragana/katakana, provide the translation in two forms:
        1. Indonesian (using standard Latin characters).
        2. Romaji version of the Japanese.
      - The result format should be:
          "Apa kabar? \nGenki desu ka?"

      - If the Japanese text is in Latin characters, provide only the Indonesian translation in a single line. Example:
          "Apa kabar?"

    Additional Conditions:
    - If the "From" language is Indonesian, but the content is in Japanese, return the original content. Example:
        "cara kerja di jepang bagaimana ya?"

    - If the "From" language is Japanese, but the content is in Indonesian, return the original content. Example:
        "今日は雨だね"

    **Name Handling**:
    - Do not translate personal names or proper nouns; keep them in their original form in both languages.
    - If unsure whether a word is a name, keep it in its original form rather than translating it.

    Extra Context:
    - Use native expressions that are suitable for informal, conversational settings. Avoid formal or robotic language. 
    - Where appropriate, add brief cultural notes if they enhance understanding or clarify context, like slang or common phrases unique to either language.
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: [{ type: "text", text: prompt }],
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `From: Indonesian\nTo: Japanese\nContent: cara kerja di jepang bagaimana ya?`,
            },
          ],
        },
        {
          role: "assistant",
          content: [
            {
              type: "text",
              text: "日本で働くにはどうしたらいいの？\nNihon de hataraku ni wa doushitara ii no?",
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `From: ${from}\nTo: ${to}\nContent: ${content}`,
            },
          ],
        },
      ],
      temperature: 0,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      response_format: {
        type: "text",
      },
    });

    const response = completion.choices[0].message.content;

    if (!response) {
      throw new Error("No response from AI");
    }

    const credits = await deductUserCredits(1);

    if (!credits.success) {
      return {
        success: false,
        data: credits.data,
      };
    }

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    console.error(error);

    if (error instanceof ZodError) {
      return {
        success: false,
        data: error.errors[0].message,
      };
    }

    return {
      success: false,
      data: "Error translating text",
    };
  }
}
