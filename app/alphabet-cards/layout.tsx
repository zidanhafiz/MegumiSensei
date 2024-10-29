import { BiSpreadsheet } from "react-icons/bi";
import Tab from "./Tab";
import { ReactNode } from "react";
import PageContainer from "@/components/PageContainer";

export default function AlphabetCardsLayout({ children }: { children: ReactNode }) {
  return (
    <PageContainer title='Kartu Alfabet' icon={<BiSpreadsheet className='text-lg' />}>
      <Tab />
      {children}
    </PageContainer>
  );
}