import { HiraganaKatakanaGuessResultsType } from "@/types/questionTypes";
import Link from "next/link";
import { ReactNode } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { RiCloseCircleFill } from "react-icons/ri";
import { TiThList } from "react-icons/ti";
import { FaReply } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";

export default function FinishMockup({ data }: { data: HiraganaKatakanaGuessResultsType }) {
  const { correctAnswers, wrongAnswers, totalQuestions, result, message } = data;

  list.forEach((item) => {
    item.value = item.name === "correct" ? correctAnswers : item.name === "wrong" ? wrongAnswers : totalQuestions;
  });

  return (
    <div className='flex flex-col items-center'>
      <h2 className='text-xl font-bold text-center'>
        Selamat, <br />
        Kamu telah menyelesaikan latihan!
      </h2>
      <div className='mt-6'>
        <ResultCard result={result} message={message} />
        <hr className='my-5' />
        <div className='text-xs grid grid-cols-3 gap-3'>
          {list.map((item) => (
            <ItemList key={item.name} icon={item.icon} title={item.title} value={item.value.toString()} />
          ))}
        </div>
      </div>
      <ButtonGroup pathname='/hiragana-katakana-guess' />
    </div>
  );
}

const list = [
  { name: "correct", icon: <FaCheckCircle size={20} className='text-green-600' />, title: "Jawaban benar", value: 0 },
  { name: "wrong", icon: <RiCloseCircleFill size={24} className='text-red-600' />, title: "Jawaban salah", value: 0 },
  { name: "total", icon: <TiThList size={24} />, title: "Total pertanyaan", value: 0 },
];

function ItemList({ icon, title, value }: { icon: ReactNode; title: string; value: string }) {
  return (
    <div className='flex flex-col items-center justify-end gap-2'>
      {icon}
      <p>
        {title}: <span className='font-semibold'>{value}</span>
      </p>
    </div>
  );
}

function ResultCard({ result, message }: { result: number; message: string }) {
  return (
    <div className='flex flex-col items-center justify-center gap-2'>
      <p className='text-sm'>Nilaimu adalah</p>
      <div className='flex items-end justify-center mt-4'>
        <p className='text-[4rem] font-bold leading-none'>{result}</p>
        <span className='font-bold leading-8'>/100</span>
      </div>
      <p className='mt-10 text-2xl font-semibold'>{message}</p>
    </div>
  );
}

function ButtonGroup({ pathname }: { pathname: string }) {
  return (
    <div className='mt-14 flex gap-3'>
      <Link href='/' className='btn'>
        <GoHomeFill />
        Kembali ke beranda
      </Link>
      <Link href={`/guess-words${pathname}`} className='btn btn-primary'>
        <FaReply />
        Latihan lagi
      </Link>
    </div>
  );
}
