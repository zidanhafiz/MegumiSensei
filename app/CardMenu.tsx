import { menuList } from "@/utils/menuList";
import Link from "next/link";
import { LuMoveRight } from "react-icons/lu";

export default function CardMenu({ item }: { item: (typeof menuList)[number] }) {
  return (
    <Link
      href={item.href}
      key={item.name}
      className='border border-primary-content hover:bg-primary transition p-4 rounded-lg flex flex-col h-full first:bg-neutral first:text-white first:hover:text-primary-content shadow-md'
    >
      <div>
        <h3 className='text-lg font-semibold flex items-center gap-2'>
          {item.icon} {item.name}
        </h3>
        <p className='text-sm mt-1'>{item.description}</p>
      </div>
      <div className='mt-auto pt-2 ml-auto'>
        <LuMoveRight className='text-xl' />
      </div>
    </Link>
  );
}
