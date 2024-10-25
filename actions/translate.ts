"use server";
import OpenAI from "openai";
import z, { ZodError } from "zod";

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
    Translate the following text casually, as if friends are talking. 

    If translating from Indonesian to Japanese:
    - Use everyday, friendly Japanese language.
    - Provide the translation in two forms:
      1. Japanese (using kanji/hiragana/katakana as appropriate).
      2. Romaji (Japanese pronunciation in Latin characters).
      The format text should be: "
        今日は雨だね
        Kyou wa ame da ne
      "

    If translating from Japanese to Indonesian:
    - Use an informal, friendly tone suitable for casual conversation.
    - If the Japanese text is in kanji/hiragana/katakana, provide the translation in two forms:
      1. Indonesian (using standard Latin characters).
      2. Romaji text from Japanese.
      The format text should be: "
        Apa kabar?
        Genki desu ka?
      "
    - Otherwise, provide the translation in Indonesian only. 
      The format text should be in one line, Example:
      "Apa kabar?"

    The text to translate is:
    From: ${from}
    To: ${to}
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
              text: "cara kerja di jepang bagaimana ya?",
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
              text: content,
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
      data: "Error translating text",
    };
  }
}
