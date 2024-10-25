import { menuList } from "@/utils/menuList";
import CardMenu from "./CardMenu";

export default function Home() {
  return (
    <div className='w-full lg:max-w-[1024px] lg:mx-auto mt-24 lg:mt-28'>
      <main className='w-full'>
        <div className='space-y-3 w-[80%] max-w-[400px] text-center mx-auto'>
          <h2 className='text-2xl lg:text-3xl font-bold'>Selamat datang di Megumi Sensei App!</h2>
          <p>Megumi Sensei adalah aplikasi yang membantu Anda belajar bahasa Jepang.</p>
        </div>
        <div className='mt-8 grid grid-cols-2 gap-4'>{menuList.map((item, i) => i > 0 && <CardMenu key={item.name} item={item} />)}</div>
      </main>
    </div>
  );
}
