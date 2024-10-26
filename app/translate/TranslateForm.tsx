"use client";
import TextInput from "@/components/TextInput";
import { BsTranslate } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import ErrorInputMessage from "@/components/ErrorInputMessage";
import { translateText } from "@/actions/translate";
import { useState } from "react";
import Accordion from "@/components/Accordion";
import { useLanguage } from "@/contexts/LanguageContext";

const translateSchema = z.object({
  text: z.string().min(3, { message: "Minimal 3 huruf" }).max(1000, { message: "Maksimal 1000 huruf" }),
});

type TranslateSchema = z.infer<typeof translateSchema>;

const idPlaceholder = `Aku mencintaimu Megumi-san!`;
const jpPlaceholder = `僕はメグミさんを愛してるよ！ \nBoku wa Megumi-san o aishiteru yo!`;

export default function TranslateForm() {
  const [result, setResult] = useState<string>("");
  const [romaji, setRomaji] = useState<string>("");

  const { language } = useLanguage();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TranslateSchema>({
    resolver: zodResolver(translateSchema),
  });

  const onSubmit = async (data: TranslateSchema) => {
    if (isSubmitting) return;

    const formData = new FormData();
    formData.append("content", data.text);
    formData.append("from", language.from);
    formData.append("to", language.to);

    const { data: content, success } = await translateText(formData);

    if (!success) {
      setError("text", { message: data.text });
      return;
    }

    const resultText = content.split("\n");

    if (resultText.length > 1) {
      setRomaji(resultText[1]);
      setResult(resultText[0]);
      return;
    }

    setResult(content);
  };

  return (
    <form
      className='grid gap-2 md:grid-cols-2'
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        placeholder={language.from === "Indonesia" ? idPlaceholder : jpPlaceholder}
        variant='input'
        disabled={isSubmitting}
        className='md:col-start-1'
        {...register("text")}
      />
      <div className='md:col-start-1 md:row-start-2'>
        <ErrorInputMessage message={errors.text?.message} />
        {romaji && (
          <Accordion
            title='Romaji text'
            content={romaji}
          />
        )}
      </div>
      <TextInput
        placeholder={language.to === "Japanese" ? jpPlaceholder : idPlaceholder}
        variant='result'
        value={result}
        className='md:col-start-2'
      />
      <button
        type='submit'
        className='btn btn-primary md:col-start-2 md:row-start-2'
        disabled={isSubmitting}
      >
        {isSubmitting ? "Menerjemahkan..." : "Terjemahkan"} <BsTranslate />
      </button>
    </form>
  );
}
