"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useRouter } from "next/navigation";
import { RiGamepadFill } from "react-icons/ri";
import { useHiraganaKatakanaGuess } from "@/contexts/HiraganaKatakanaGuessContext";
import { useEffect } from "react";

const RequirementFormSchema = z.object({
  type: z.enum(["both", "hiragana", "katakana"]),
  limit: z.number().min(5, { message: "Jumlah kata minimal 5" }).max(30, { message: "Jumlah kata maksimal 30" }),
  level: z.enum(["mix", "n5", "n4"]),
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
      type: "both",
      limit: 5,
      level: "mix",
    },
  });

  const { setupQuestions, setIsStarted } = useHiraganaKatakanaGuess();

  const router = useRouter();

  const onSubmit = async (data: RequirementFormSchema) => {
    if (isSubmitting) return;
    setupQuestions(data);
    setIsStarted(true);
    router.push("/guess-words/hiragana-katakana-guess/start");
  };

  useEffect(() => {
    localStorage.removeItem("hirakata_game_results");
  }, []);

  return (
    <form className='grid gap-6 md:gap-4' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between md:gap-20'>
        <h4 className='font-semibold'>Pilih Bahasa:</h4>
        <div className='flex gap-2 justify-end'>
          <div className='form-control'>
            <label className='label cursor-pointer gap-2'>
              <span className='label-text'>Keduanya</span>
              <input type='radio' {...register("type")} value='both' className='radio radio-info' />
            </label>
          </div>
          <div className='form-control'>
            <label className='label cursor-pointer gap-2'>
              <span className='label-text'>Hiragana</span>
              <input type='radio' {...register("type")} value='hiragana' className='radio radio-info' />
            </label>
          </div>
          <div className='form-control'>
            <label className='label cursor-pointer gap-2'>
              <span className='label-text'>Katakana</span>
              <input type='radio' {...register("type")} value='katakana' className='radio radio-info' />
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
          {...register("limit", {
            setValueAs: (value) => parseInt(value),
          })}
        />
      </div>
      {errors.limit && <p className='text-error'>{errors.limit.message}</p>}
      <div className='flex flex-col md:flex-row md:items-center md:justify-between md:gap-20'>
        <h4 className='font-semibold'>JLPT Level:</h4>
        <div className='flex gap-2 justify-end'>
          <div className='form-control'>
            <label className='label cursor-pointer gap-2'>
              <span className='label-text'>Campuran</span>
              <input type='radio' {...register("level")} value='mix' className='radio radio-info' />
            </label>
          </div>
          <div className='form-control'>
            <label className='label cursor-pointer gap-2'>
              <span className='label-text'>N5</span>
              <input type='radio' {...register("level")} value='n5' className='radio radio-info' />
            </label>
          </div>
          <div className='form-control'>
            <label className='label cursor-pointer gap-2'>
              <span className='label-text'>N4</span>
              <input type='radio' {...register("level")} value='n4' className='radio radio-info' />
            </label>
          </div>
        </div>
      </div>
      <div className='flex gap-2 justify-end mt-7'>
        <button type='button' onClick={() => router.push("/guess-words")} className='btn' disabled={isSubmitting}>
          Kembali
        </button>
        <button type='submit' className='btn btn-primary' disabled={isSubmitting}>
          <RiGamepadFill />
          Mulai Main
        </button>
      </div>
    </form>
  );
}
