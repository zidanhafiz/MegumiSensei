"use client";
import TextInput from "@/components/TextInput";
import { RiTranslate } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import ErrorInputMessage from "@/components/ErrorInputMessage";
import { useState } from "react";
import Accordion from "@/components/Accordion";
import { useConverter } from "@/contexts/ConverterContext";
import { convertKanji } from "@/actions/convertKanji";
import { useUser } from "@/contexts/UserContext";

const converterSchema = z.object({
  text: z.string().min(1, { message: "Minimal 1 huruf" }).max(1000, { message: "Maksimal 1000 huruf" }),
});

type ConverterSchema = z.infer<typeof converterSchema>;

const kanjiPlaceholder = `私はこの新しく買った本がとても好きです`;

const hiraganaPlaceholder = `わたしはこのあたらしくかったほんがとてもすきです`;

export default function ConverterForm() {
  const [result, setResult] = useState<string>("");
  const [romaji, setRomaji] = useState<string>("");

  const { converter } = useConverter();
  const { getUser, user } = useUser();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ConverterSchema>({
    resolver: zodResolver(converterSchema),
  });

  const onSubmit = async (data: ConverterSchema) => {
    if (isSubmitting) return;

    if (user && user.credits < 1) {
      setError("root.serverError", { message: "Credits anda habis!" });
      return;
    }

    const formData = new FormData();
    formData.append("content", data.text);
    formData.append("from", converter.from);
    formData.append("to", converter.to);

    const { data: content, success } = await convertKanji(formData);

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

  return (
    <form className='grid gap-2 md:grid-cols-2' onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        placeholder={converter.from === "Kanji" ? kanjiPlaceholder : hiraganaPlaceholder}
        variant='input'
        disabled={isSubmitting}
        className='md:col-start-1'
        {...register("text")}
      />
      <div className='md:col-start-1 md:row-start-2'>
        <ErrorInputMessage message={errors.text?.message} />
        {romaji && <Accordion title='Romaji text' content={romaji} />}
      </div>
      <TextInput
        placeholder={converter.to === "Hiragana" ? hiraganaPlaceholder : kanjiPlaceholder}
        variant='result'
        value={result}
        className='md:col-start-2'
      />
      <button type='submit' className='btn btn-primary md:col-start-2 md:row-start-2' disabled={isSubmitting}>
        {isSubmitting ? "Mengonversi..." : "Konversi"} <RiTranslate className='text-lg' />
      </button>
      <div className='flex justify-center mt-2 md:col-start-2'>
        <ErrorInputMessage message={errors.root?.serverError?.message} />
      </div>
    </form>
  );
}
