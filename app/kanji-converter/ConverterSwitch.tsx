"use client";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { useConverter } from "@/contexts/ConverterContext";

export default function ConverterSwitch() {
  const { converter, switchConverter } = useConverter();

  return (
    <button type='button' className='btn max-w-fit' onClick={switchConverter}>
      {converter.from} <HiOutlineSwitchHorizontal /> {converter.to}
    </button>
  );
}
