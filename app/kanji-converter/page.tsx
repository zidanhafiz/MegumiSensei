import { RiTranslate } from "react-icons/ri";
import ConverterForm from "./ConverterForm";
import ConverterProvider from "@/contexts/ConverterContext";
import ConverterSwitch from "./ConverterSwitch";
import PageContainer from "@/components/PageContainer";

export default function KanjiConverterPage() {
  return (
    <ConverterProvider>
      <PageContainer title='Konversi Kanji' icon={<RiTranslate className='text-lg' />}>
        <ConverterSwitch />
        <ConverterForm />
      </PageContainer>
    </ConverterProvider>
  );
}
