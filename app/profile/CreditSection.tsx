"use client";
import { useUser } from "@/contexts/UserContext";
import Link from "next/link";
import { FaCreditCard } from "react-icons/fa";

export function CreditSection() {
  const { user } = useUser();

  return (
    <>
      <div className='flex items-center justify-between'>
        <p className='text-lg font-bold'>Current Credit</p>
        <p className='text-2xl font-bold'>{user?.credits ?? 0}</p>
      </div>
      <p className='text-xs text-gray-500'>
        Credit are used for each feature usage.
        <br />
        Each user starts with 100 credits.
        <br />
        Each feature usage consumes 1 credit.
      </p>
      <Link
        href='/profile/billing'
        className='btn btn-primary w-full'
      >
        Add Credit
        <FaCreditCard />
      </Link>
    </>
  );
}
