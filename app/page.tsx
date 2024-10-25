"use client";
import Heading from "@/components/Heading";
import LanguageSwitch from "@/components/LanguageSwitch";
import { useState } from "react";
import TranslateForm from "./TranslateForm";

export default function Home() {
  const [language, setLanguage] = useState<{ from: string; to: string }>({ from: "Indonesia", to: "Japanese" });

  const switchLanguage = () => {
    setLanguage({
      from: language.to,
      to: language.from,
    });
  };

  return (
    <div className='w-full my-10 lg:max-w-[1280px] lg:mx-auto'>
      <main className='w-full grid gap-4'>
        <Heading>Terjemahan</Heading>
        <LanguageSwitch
          language={language}
          switchLanguage={switchLanguage}
        />
        <TranslateForm language={language} />
      </main>
    </div>
  );
}
