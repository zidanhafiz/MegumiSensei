import PageContainer from "@/components/PageContainer";
import { TbLanguageHiragana } from "react-icons/tb";
import { getAllVocabularies } from "@/utils/supabase/fetcherApi/server/vocabularies";

export default async function VocabulariesPage() {
  const vocabularies = await getAllVocabularies();

  return (
    <PageContainer title='Vocabularies' icon={<TbLanguageHiragana />}>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg my-5'>
        <table className='table text-lg'>
          <thead className='uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                No
              </th>
              <th scope='col' className='px-6 py-3'>
                Kanji
              </th>
              <th scope='col' className='px-6 py-3'>
                Kata
              </th>
              <th scope='col' className='px-6 py-3'>
                Romaji
              </th>
              <th scope='col' className='px-6 py-3'>
                Arti
              </th>
              <th scope='col' className='px-6 py-3'>
                Level
              </th>
            </tr>
          </thead>
          <tbody>
            {vocabularies?.map((vocabulary, index) => (
              <tr key={vocabulary.id} className=''>
                <td className='px-6 py-4 font-medium text-gray-900'>{index + 1}</td>
                <td className='px-6 py-4'>{vocabulary.kanji}</td>
                <td className='px-6 py-4'>{vocabulary.word}</td>
                <td className='px-6 py-4'>{vocabulary.romaji}</td>
                <td className='px-6 py-4'>{vocabulary.meaning}</td>
                <td className='px-6 py-4'>{vocabulary.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageContainer>
  );
}
