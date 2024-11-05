"use server";
import OpenAI from "openai";
import z, { ZodError } from "zod";
import { deductUserCredits } from "./profile";

const convertKanjiSchema = z.object({
  content: z.string().min(1, { message: "Minimal 1 huruf" }).max(1000, { message: "Maksimal 1000 huruf" }),
  from: z.string().min(3, { message: "Minimal 3 huruf" }).max(100, { message: "Maksimal 100 huruf" }).trim(),
  to: z.string().min(3, { message: "Minimal 3 huruf" }).max(100, { message: "Maksimal 100 huruf" }).trim(),
});

export async function convertKanji(data: FormData): Promise<{ success: boolean; data: string }> {
  const { content, from, to } = convertKanjiSchema.parse({
    content: data.get("content") as string,
    from: data.get("from") as string,
    to: data.get("to") as string,
  });

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const prompt = `
    Please act as an expert in Japanese language conversion. Convert the given text accurately based on the specified 'from' and 'to' parameters.

    Guidelines:
    1. If converting from Kanji to Hiragana:
      - Convert all Kanji characters to their Hiragana equivalents.
      - Keep any existing Hiragana, Katakana, or other characters as they are.
      - Provide the conversion result in a single line.

    2. If converting from Hiragana to Kanji:
      - Convert Hiragana to the most common Kanji representation where appropriate.
      - Keep any existing Kanji or Katakana as they are.
      - Provide the conversion result in a single line.

    3. For both conversion directions:
      - On a new line, provide the Romaji (Latin alphabet) representation of the converted text.

    The result format should be:
    "Converted text (in Japanese characters)
    Romaji representation"

    Additional Notes:
    - Maintain the original meaning and nuance of the text as much as possible.
    - If a word or phrase doesn't have a direct conversion, keep it in its original form.
    - For words with multiple possible Kanji representations, choose the most common or contextually appropriate one.

    Examples:
    1. From: Kanji, To: Hiragana
       Input: 私は日本語を勉強しています。
       Output:
       わたしはにほんごをべんきょうしています。
       Watashi wa nihongo wo benkyou shiteimasu.

    2. From: Hiragana, To: Kanji
       Input: わたしはにほんごをべんきょうしています。
       Output:
       私は日本語を勉強しています。
       Watashi wa nihongo wo benkyou shiteimasu.
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: prompt,
        },
        {
          role: "user",
          content: `From: ${from}\nTo: ${to}\nContent: ${content}`,
        },
      ],
      temperature: 0,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
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
      data: response ?? "No response from AI",
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
      data: "Error converting text",
    };
  }
}
