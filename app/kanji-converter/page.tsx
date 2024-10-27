import Heading from "@/components/Heading";
import { RiTranslate } from "react-icons/ri";
import ConverterForm from "./ConverterForm";
import ConverterProvider from "@/contexts/ConverterContext";
import ConverterSwitch from "./ConverterSwitch";

export default function KanjiConverterPage() {
  return (
    <ConverterProvider>
      <div className='w-full my-10 lg:max-w-[1280px] lg:mx-auto'>
        <main className='w-full grid gap-4'>
          <Heading>
            <RiTranslate className='text-lg' /> Konversi Kanji
          </Heading>
          <hr />
          <ConverterSwitch />
          <ConverterForm />
        </main>
      </div>
    </ConverterProvider>
  );
}
