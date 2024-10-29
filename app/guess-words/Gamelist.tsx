import { TbLanguageHiragana } from "react-icons/tb";
import { HiOutlineTranslate } from "react-icons/hi";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import GameCard from "./GameCard";

const gameList = [
  {
    name: "Latihan Hiragana & Katakana",
    description: "Latihan menebak hiragana dan katakana.",
    href: "/guess-words/hiragana-katakana-guess",
    icon: <TbLanguageHiragana />,
  },
  {
    name: "Latihan Kanji",
    description: "Latihan menebak kanji.",
    href: "/guess-words/kanji-guess",
    icon: <HiOutlineTranslate />,
  },
  {
    name: "Latihan Kata",
    description: "Latihan menebak kata.",
    href: "/guess-words/word-guess",
    icon: <GiPerspectiveDiceSixFacesRandom />,
  },
]

export default function Gamelist() {
  return (
    <div className="mt-3">
      <h3 className="text-lg font-semibold">Daftar Permainan</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {gameList.map((game) => (
          <GameCard key={game.name} {...game} />
        ))}
      </div>
    </div>
  )
}
