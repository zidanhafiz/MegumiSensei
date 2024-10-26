import Heading from "@/components/Heading";
import LanguageSwitch from "@/components/LanguageSwitch";
import TranslateForm from "./TranslateForm";
import { BsTranslate } from "react-icons/bs";

export default function TranslatePage() {
  return (
    <div className='w-full my-10 lg:max-w-[1280px] lg:mx-auto'>
      <main className='w-full grid gap-4'>
        <Heading>
          <BsTranslate className="text-lg" /> Terjemahkan
        </Heading>
        <hr />
        <LanguageSwitch />
        <TranslateForm />
      </main>
    </div>
  );
}