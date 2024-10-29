import PageContainer from "@/components/PageContainer";
import LanguageProvider from "@/contexts/LanguageContext";
import LanguageSwitch from "./LanguageSwitch";
import TranslateForm from "./TranslateForm";
import { BsTranslate } from "react-icons/bs";
import LanguageProvider from "@/contexts/LanguageContext";

export default function TranslatePage() {
  return (
    <LanguageProvider>
      <PageContainer title='Terjemahkan' icon={<BsTranslate className='text-lg' />}>
        <LanguageSwitch />
        <TranslateForm />
      </PageContainer>
    </LanguageProvider>
  );
}