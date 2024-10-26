import { bizUmin } from "@/utils/fonts";

export default function Card({ word, latin }: { word: string; latin: string }) {
  return (
    <div className='border border-primary-content shadow-md rounded-lg p-4 max-w-60 h-28 flex flex-col items-center justify-center'>
      <p className={`${bizUmin.className} text-4xl md:text-5xl`}>{word}</p>
      <p className='text-xl mt-2 text-secondary-content'>{latin}</p>
    </div>
  );
}
