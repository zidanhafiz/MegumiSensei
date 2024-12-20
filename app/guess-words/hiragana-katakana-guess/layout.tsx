import PageContainer from "@/components/PageContainer";
import GuessWordsProvider from "@/contexts/GuessWordsProvider";
import { ReactNode } from "react";
import { TbLanguageHiragana } from "react-icons/tb";

export default function HiraganaKatakanaGuessLayout({ children }: { children: ReactNode }) {
  return (
    <GuessWordsProvider>
      <div className='my-6 w-full max-w-[600px] mx-auto'>
        <PageContainer
          title='Tebak Hiragana/Katakana'
          icon={<TbLanguageHiragana className='text-lg' />}
        >
          {children}
        </PageContainer>
      </div>
    </GuessWordsProvider>
  );
}
