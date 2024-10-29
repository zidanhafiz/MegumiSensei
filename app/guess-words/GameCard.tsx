import Link from "next/link";
import { ReactNode } from "react";
import { LuMoveRight } from "react-icons/lu";

type GameCardProps = {
  name: string;
  description: string;
  href: string;
  icon: ReactNode;
};

export default function GameCard({ name, description, href, icon }: GameCardProps) {
  return (
    <Link href={href} className="border border-primary-content first:bg-neutral first:text-white rounded-lg py-6 px-4 flex justify-between items-center hover:bg-primary first:hover:text-primary-content transition shadow-md">
      <div>
        <h3 className="flex items-center gap-2 font-bold">
          {icon} {name}
        </h3>
        <p className="text-sm first:text-white first:font-bold mt-2 opacity-90">{description}</p>
      </div>
      <LuMoveRight className='text-3xl mr-2' />
    </Link>
  );
}
