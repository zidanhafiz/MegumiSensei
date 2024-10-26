"use client";
import { CgMenuLeftAlt } from "react-icons/cg";
import { GoHome } from "react-icons/go";
import { BsTranslate } from "react-icons/bs";
import { BiSpreadsheet } from "react-icons/bi";
import { RiTranslate } from "react-icons/ri";
import { FaGamepad } from "react-icons/fa6";
import Link from "next/link";

const menuList = [
  {
    name: "Beranda",
    href: "/",
    icon: <GoHome />
  },
  {
    name: "Terjemahkan",
    href: "/translate",
    icon: <BsTranslate />
  },
  {
    name: "Kartu Alfabet",
    href: "/alphabet-cards",
    icon: <BiSpreadsheet />
  },
  {
    name: "Kanji ⇆ Hiragana",
    href: "/kanji-hiragana",
    icon: <RiTranslate />
  },
  {
    name: "Tebak Kata",
    href: "/guess-the-word",
    icon: <FaGamepad />
  }
];

export default function DrawerNavbar() {
  return (
    <div className="drawer w-fit">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content w-fit absolute">
        <label htmlFor="my-drawer" className="btn drawer-button">
          <CgMenuLeftAlt className="text-2xl" />
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-lg min-h-full w-80 py-8 px-4 space-y-1">
          {menuList.map((item, index) => (
            <li key={index}><Link href={item.href}>{item.icon} {item.name}</Link></li>
          ))}
        </ul>
      </div>
    </div>
  )
}
