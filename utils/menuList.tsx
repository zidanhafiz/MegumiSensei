import { GoHome } from "react-icons/go";
import { BsTranslate } from "react-icons/bs";
import { BiSpreadsheet } from "react-icons/bi";
import { RiTranslate } from "react-icons/ri";
import { FaGamepad } from "react-icons/fa6";

export const menuList = [
  {
    name: "Beranda",
    href: "/",
    description: "Beranda",
    icon: <GoHome />,
  },
  {
    name: "Terjemahkan",
    href: "/translate",
    description: "Terjemahkan teks dari bahasa Indonesia ke bahasa Jepang dan sebaliknya.",
    icon: <BsTranslate />,
  },
  {
    name: "Kartu Alfabet",
    href: "/alphabet-cards",
    description: "Kartu alfabet Jepang untuk belajar membaca dan menulis.",
    icon: <BiSpreadsheet />,
  },
  {
    name: "Kanji ⇆ Hiragana",
    href: "/kanji-converter",
    description: "Konversi antara kanji dan hiragana.",
    icon: <RiTranslate />,
  },
  {
    name: "Tebak Kata",
    href: "/guess-words",
    description: "Tebak kata Jepang untuk belajar kata-kata.",
    icon: <FaGamepad />,
  },
];
