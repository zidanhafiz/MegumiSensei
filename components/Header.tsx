import { caveat } from "@/utils/fonts";
import DrawerNavbar from "./DrawerNavbar";
import Link from "next/link";
import UserDropdown from "./UserDropdown";

export default async function Header() {
  return (
    <header className='w-full text-center flex relative justify-between items-center'>
      <DrawerNavbar />
      <div className='w-fit mx-auto'>
        <Link
          href='/'
          className={`${caveat.className} text-2xl md:text-4xl font-bold`}
        >
          Megumi Sensei
        </Link>
      </div>
      <UserDropdown />
    </header>
  );
}
