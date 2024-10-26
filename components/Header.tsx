import { caveat, quicksand } from "@/utils/fonts";
import DrawerNavbar from "./DrawerNavbar";

export default function Header() {
  return (
    <header className='w-full text-center flex relative'>
      <DrawerNavbar />
      <div className="w-fit mx-auto">
        <h1 className={`${caveat.className} text-3xl md:text-5xl font-bold`}>Megumi Sensei</h1>
        <p className={`${quicksand.className} mt-2 text-sm md:text-base`}>Megumi-sensei will help your needs.</p>
      </div>
    </header>
  );
}
