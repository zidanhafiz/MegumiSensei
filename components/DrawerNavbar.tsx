"use client";
import { CgMenuLeftAlt } from "react-icons/cg";
import Link from "next/link";
import { menuList } from "@/utils/menuList";

export default function DrawerNavbar() {
  return (
    <nav className='drawer w-fit'>
      <input id='my-drawer' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content w-fit absolute'>
        <label htmlFor='my-drawer' className='btn drawer-button'>
          <CgMenuLeftAlt className='text-2xl' />
        </label>
      </div>
      <div className='drawer-side z-50'>
        <label htmlFor='my-drawer' aria-label='close sidebar' className='drawer-overlay'></label>
        <ul className='menu bg-base-200 text-lg min-h-full w-80 py-8 px-4 space-y-1'>
          {menuList.map((item, index) => (
            <li key={index}>
              <Link href={item.href}>
                {item.icon} {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
