import PageContainer from "@/components/PageContainer";
import { FaGamepad } from "react-icons/fa6";
import Gamelist from "./Gamelist";

export default function GuessWordsPage() {
  return (
    <PageContainer title='Tebak Kata' icon={<FaGamepad className='text-lg' />}>
      <Gamelist />
    </PageContainer>
  );
}
