import { quicksand } from "@/utils/fonts";
import { ReactNode } from "react";

export default function Heading({ children }: { children: ReactNode }) {
  return <h2 className={`${quicksand.className} font-semibold flex items-center gap-2 leading-[2px]`}>{children}</h2>;
}
