"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import Link from "next/link";
import { useHiraganaKatakanaGuess } from "@/contexts/HiraganaKatakanaGuessContext";
import { generateHiraganaKatakanaGuessQuestions } from "@/actions/hiraganaKatakanaGuess";
import { useRouter } from "next/navigation";

const RequirementFormSchema = z.object({
  language: z.enum(["both", "hiragana", "katakana"]),
  wordCount: z.number().min(5, { message: "Jumlah kata minimal 5" }).max(30, { message: "Jumlah kata maksimal 30" }),
  questionType: z.enum(["both", "word", "sentence"]),
});

type RequirementFormSchema = z.infer<typeof RequirementFormSchema>;

export default function RequirementForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RequirementFormSchema>({
    resolver: zodResolver(RequirementFormSchema),
    defaultValues: {
      language: "both",
      wordCount: 5,
      questionType: "both",
    },
  });

  const { setQuestions } = useHiraganaKatakanaGuess();
  const router = useRouter();

  const onSubmit = async (data: RequirementFormSchema) => {
    if (isSubmitting) return;

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    const response = await generateHiraganaKatakanaGuessQuestions(formData);
    setQuestions(response.data);
    router.push("/guess-words/hiragana-katakana-guess/start");
  };

  return (
    <form className='grid gap-6 md:gap-4' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between md:gap-20'>
        <h4 className='font-semibold'>Pilih Bahasa:</h4>
        <div className='flex gap-2 justify-end'>
          <div className='form-control'>
            <label className='label cursor-pointer gap-2'>
              <span className='label-text'>Keduanya</span>
              <input type='radio' {...register("language")} value='both' className='radio radio-info' />
            </label>
          </div>
          <div className='form-control'>
            <label className='label cursor-pointer gap-2'>
              <span className='label-text'>Hiragana</span>
              <input type='radio' {...register("language")} value='hiragana' className='radio radio-info' />
            </label>
          </div>
          <div className='form-control'>
            <label className='label cursor-pointer gap-2'>
              <span className='label-text'>Katakana</span>
              <input type='radio' {...register("language")} value='katakana' className='radio radio-info' />
            </label>
          </div>
        </div>
      </div>
      <div className='flex items-center justify-between'>
        <h4 className='font-semibold'>Jumlah Kata:</h4>
        <input
          type='number'
          className='input input-bordered input-info input-sm w-24'
          min={5}
          max={30}
          {...register("wordCount", {
            setValueAs: (value) => parseInt(value),
          })}
        />
      </div>
      {errors.wordCount && <p className='text-error'>{errors.wordCount.message}</p>}
      <div className='flex flex-col md:flex-row md:items-center md:justify-between md:gap-20'>
        <h4 className='font-semibold'>Tipe Pertanyaan:</h4>
        <div className='flex gap-2 justify-end'>
          <div className='form-control'>
            <label className='label cursor-pointer gap-2'>
              <span className='label-text'>Keduanya</span>
              <input type='radio' {...register("questionType")} value='both' className='radio radio-info' />
            </label>
          </div>
          <div className='form-control'>
            <label className='label cursor-pointer gap-2'>
              <span className='label-text'>Kata</span>
              <input type='radio' {...register("questionType")} value='word' className='radio radio-info' />
            </label>
          </div>
          <div className='form-control'>
            <label className='label cursor-pointer gap-2'>
              <span className='label-text'>Kalimat</span>
              <input type='radio' {...register("questionType")} value='sentence' className='radio radio-info' />
            </label>
          </div>
        </div>
      </div>
      <div className='flex gap-2 justify-end mt-7'>
        <Link href='/guess-words' className='btn'>
          Kembali
        </Link>
        <button type='submit' className='btn btn-primary' disabled={isSubmitting}>
          Mulai Main
        </button>
      </div>
    </form>
  );
}
