"use client";
import TextInput from "@/components/TextInput";
import { BsTranslate } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import ErrorInputMessage from "@/components/ErrorInputMessage";
import { translateText } from "@/actions/translate";
import { KeyboardEvent, useState } from "react";
import Accordion from "@/components/Accordion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUser } from "@/contexts/UserContext";

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
  const { getUser, user } = useUser();

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

    if (user && user.credits < 1) {
      setError("root.serverError", { message: "Credits anda habis!" });
      return;
    }

    const formData = new FormData();
    formData.append("content", data.text);
    formData.append("from", language.from);
    formData.append("to", language.to);

    const { data: content, success } = await translateText(formData);

    if (!success) {
      setError("root.serverError", { message: content });
      return;
    }

    const resultText = content.split("\n");

    if (resultText.length > 1) {
      setRomaji(resultText[1]);
      setResult(resultText[0]);
      getUser();
      return;
    }

    setResult(content);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.key === "Enter") {
      handleSubmit(onSubmit)();
    }
    return;
  };

  return (
    <form
      className='grid gap-2 md:grid-cols-2'
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        placeholder={language.from === "Indonesian" ? idPlaceholder : jpPlaceholder}
        variant='input'
        disabled={isSubmitting}
        className='md:col-start-1'
        onKeyDown={handleKeyDown}
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
      <div className='md:col-start-2 md:row-start-2 w-full'>
        <button
          type='submit'
          className='btn btn-primary w-full'
          disabled={isSubmitting}
        >
          {isSubmitting ? "Menerjemahkan..." : "Terjemahkan"} <BsTranslate />
        </button>
        <div className='flex justify-center mt-4 gap-2'>
          <p className='text-sm text-gray-500'>Atau tekan</p>
          <kbd className='kbd kbd-sm w-fit'>Ctrl + Enter</kbd>
        </div>
      </div>
      <div className='flex justify-center mt-2 md:col-start-2'>
        <ErrorInputMessage message={errors.root?.serverError?.message} />
      </div>
    </form>
  );
}
