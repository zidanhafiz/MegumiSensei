"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  {
    label: "Hiragana",
    href: "/alphabet-cards/hiragana",
  },
  {
    label: "Katakana",
    href: "/alphabet-cards/katakana",
  },
];

export default function Tab() {
  const pathname = usePathname();

  return (
    <div role='tablist' className='tabs tabs-bordered'>
      {tabs.map((tab) => (
        <Link role='tab' key={tab.label} className={`tab ${pathname === tab.href && "tab-active"}`} href={tab.href}>
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
