"use client";
import { usePathname, useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  const handleBack = () => {
    const previousPath = pathname.split("/").slice(0, -1).join("/");

    if (previousPath === "/alphabet-cards" || previousPath === "") {
      router.push("/");
      return;
    }

    router.push(previousPath);
  };

  if (pathname === "/login" || pathname === "/sign-up" || pathname.startsWith("/forgot-password")) return null;

  return (
    <button
      className='w-fit flex gap-2 items-center text-gray-600 my-2'
      onClick={handleBack}
    >
      <FaArrowLeft />
      Back
    </button>
  );
}
