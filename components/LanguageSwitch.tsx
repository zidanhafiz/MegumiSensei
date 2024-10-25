"use client";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";

export default function LanguageSwitch({ language, switchLanguage }: { language: { from: string; to: string }; switchLanguage: () => void }) {
  return (
    <button
      type="button"
      className='btn max-w-fit'
      onClick={switchLanguage}
    >
      {language.from} <HiOutlineSwitchHorizontal /> {language.to}
    </button>
  );
}
