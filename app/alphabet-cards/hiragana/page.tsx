import hiragana from "@/utils/alphabets/hiragana.json";
import Content from "../Content";

const dataList = ["basic", "dakuon", "combination"];

export default function HiraganaPage() {
  return (
    <div>
      <h3 className='text-xl font-semibold mt-2'>Hiragana</h3>
      <div>
        {dataList.map((item, i) => (
          <Content key={i} title={`${i + 1}. ${item}`} data={hiragana[item as keyof typeof hiragana]} />
        ))}
      </div>
    </div>
  );
}
