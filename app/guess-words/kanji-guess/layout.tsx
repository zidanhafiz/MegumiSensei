import PageContainer from "@/components/PageContainer";
import GuessWordsProvider from "@/contexts/GuessWordsProvider";
import { ReactNode } from "react";
import { HiOutlineTranslate } from "react-icons/hi";

export default function KanjiGuessLayout({ children }: { children: ReactNode }) {
  return (
    <GuessWordsProvider>
      <div className='my-6 w-full max-w-[600px] mx-auto'>
        <PageContainer
          title='Tebak Kanji'
          icon={<HiOutlineTranslate className='text-lg' />}
        >
          {children}
        </PageContainer>
      </div>
    </GuessWordsProvider>
  );
}
