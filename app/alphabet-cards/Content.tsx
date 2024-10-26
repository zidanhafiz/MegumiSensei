import Card from "./Card";

type DataType = {
  romaji: string;
  [key: string]: string;
};

export default function Content({ title, data }: { title: string; data: DataType[] }) {
  return (
    <div className='my-8'>
      <h4 className='text-lg font-semibold capitalize'>{title}</h4>
      <hr />
      <div
        className={`grid gap-4 md:gap-5 mt-5 ${
          title.includes("combination") || title.includes("yoon") ? "grid-cols-3" : "grid-cols-4"
        } md:grid-cols-4 lg:grid-cols-5`}
      >
        {data.map((item, i) => (
          <Card key={i} word={item.hiragana || item.katakana} latin={item.romaji} />
        ))}
      </div>
    </div>
  );
}
