import PageContainer from "@/components/PageContainer";
import HiraganaKatakanaGuessProvider from "@/contexts/HiraganaKatakanaGuessContext";
import { ReactNode } from "react";
import { TbLanguageHiragana } from "react-icons/tb";

export default function HiraganaKatakanaGuessLayout({ children }: { children: ReactNode }) {
  return (
    <HiraganaKatakanaGuessProvider>
      <div className='my-6 w-full max-w-[600px] mx-auto'>
        <PageContainer
          title='Tebak Hiragana/Katakana'
          icon={<TbLanguageHiragana className='text-lg' />}
        >
          {children}
        </PageContainer>
      </div>
    </HiraganaKatakanaGuessProvider>
  );
}
