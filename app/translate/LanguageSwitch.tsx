"use client";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageSwitch() {
  const { language, switchLanguage } = useLanguage();

  return (
    <button type='button' className='btn max-w-fit' onClick={switchLanguage}>
      {language.from} <HiOutlineSwitchHorizontal /> {language.to}
    </button>
  );
}
