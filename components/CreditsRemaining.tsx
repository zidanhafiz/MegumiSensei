"use client";
import { useUser } from "@/contexts/UserContext";
import { usePathname } from "next/navigation";

export default function CreditsRemaining() {
  const { user } = useUser();
  const pathname = usePathname();

  if (
    pathname === "/login" ||
    pathname === "/sign-up" ||
    pathname === "/confirm" ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/alphabet-cards") ||
    pathname === "/guess-words" ||
    pathname.startsWith("/profile") ||
    pathname === "/guess-words/hiragana-katakana-guess/start" ||
    pathname === "/guess-words/hiragana-katakana-guess/finish"
  ) {
    return null;
  }

  return (
    <div className='flex items-center gap-2 w-fit'>
      <span className='text-sm text-gray-500'>Sisa kredit:</span>
      <span className='text-sm font-medium'>{user?.credits}</span>
    </div>
  );
}
