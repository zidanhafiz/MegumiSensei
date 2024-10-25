import { caveat, quicksand } from "@/utils/fonts";

export default function Header() {
  return (
    <header className='w-full text-center'>
      <h1 className={`${caveat.className} text-4xl font-bold`}>Megumi Sensei</h1>
      <p className={`${quicksand.className} mt-2`}>Megumi-sensei will help you to speak Japanese</p>
    </header>
  );
}
