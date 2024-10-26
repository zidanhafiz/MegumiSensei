import Heading from "@/components/Heading";
import { BiSpreadsheet } from "react-icons/bi";
import Tab from "./Tab";
import { ReactNode } from "react";

export default function AlphabetCardsLayout({ children }: { children: ReactNode }) {
  return (
    <div className='w-full my-10 lg:max-w-[1024px] lg:mx-auto'>
      <main className='w-full grid gap-4'>
        <Heading>
          <BiSpreadsheet className='text-lg' /> Kartu Alfabet
        </Heading>
        <hr />
        <Tab />
        {children}
      </main>
    </div>
  );
}