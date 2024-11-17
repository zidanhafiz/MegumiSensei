"use client";
import { useUser } from "@/contexts/UserContext";
import Link from "next/link";
import { FaCreditCard } from "react-icons/fa";

export function CreditSection() {
  const { user } = useUser();

  return (
    <>
      <div className='flex items-center justify-between'>
        <p className='text-lg font-bold'>Kredit Saat Ini</p>
        <p className='text-2xl font-bold'>{user?.credits ?? 0}</p>
      </div>
      <p className='text-xs text-gray-500'>
        Kredit digunakan untuk setiap penggunaan
        <br />
        Setiap user memiliki 100 kredit awal.
        <br />
        Setiap penggunaan layanan membutuhkan 1 kredit.
      </p>
      <Link
        href='/profile/buy-credits'
        className='btn btn-primary w-full'
      >
        Tambah Kredit
        <FaCreditCard />
      </Link>
    </>
  );
}
