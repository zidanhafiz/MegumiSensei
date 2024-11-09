import PageContainer from "@/components/PageContainer";
import GuessWordsProvider from "@/contexts/GuessWordsProvider";
import { ReactNode } from "react";
import { HiOutlineTranslate } from "react-icons/hi";

export default function WordGuessLayout({ children }: { children: ReactNode }) {
  return (
    <GuessWordsProvider>
      <div className='my-6 w-full max-w-[600px] mx-auto'>
        <PageContainer
          title='Tebak Kata'
          icon={<HiOutlineTranslate className='text-lg' />}
        >
          {children}
        </PageContainer>
      </div>
    </GuessWordsProvider>
  );
}
