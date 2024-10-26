"use client";
import { caveat } from "@/utils/fonts";
import DrawerNavbar from "./DrawerNavbar";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className='w-full text-center flex relative'>
      <DrawerNavbar />
      {pathname !== "/" && (
        <div className="w-fit mx-auto">
          <h1 className={`${caveat.className} text-3xl md:text-5xl font-bold`}>Megumi Sensei</h1>
          <p className='mt-2 text-sm md:text-base'>Megumi-sensei will help your needs.</p>
        </div>
      )}
    </header>
  );
}
