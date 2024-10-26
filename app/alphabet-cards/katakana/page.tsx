import katakana from "@/utils/alphabets/katakana.json";
import Content from "../Content";

const dataList = ["basic", "dakuten", "handakuten", "yoon"];

export default function KatakanaPage() {
  return (
    <div>
      <h3 className='text-xl font-semibold mt-2'>Katakana</h3>
      <div>
        {dataList.map((item, i) => (
          <Content key={i} title={`${i + 1}. ${item}`} data={katakana[item as keyof typeof katakana]} />
        ))}
      </div>
    </div>
  );
}
