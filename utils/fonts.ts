import { BIZ_UDMincho, Caveat, Noto_Sans_JP, Quicksand, Zen_Old_Mincho } from "next/font/google";

export const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const bizUmin = BIZ_UDMincho({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const zenOmin = Zen_Old_Mincho({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const notoSans = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
