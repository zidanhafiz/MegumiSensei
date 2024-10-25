import { quicksand } from "@/utils/fonts";
import { ReactNode } from "react";

export default function Heading({ children }: { children: ReactNode }) {
  return <h2 className={`${quicksand.className} font-semibold`}>{children}</h2>;
}
