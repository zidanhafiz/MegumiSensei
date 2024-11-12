"use client";
import Image from "next/image";
import Link from "next/link";
import { MdEdit, MdLogout } from "react-icons/md";
import { logout } from "@/actions/authentication";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";

export function ProfileHeader() {
  const { user, setUser } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleLogout = async () => {
    setIsLoading(true);

    const res = await logout();

    if (!res.success) {
      setIsLoading(false);
      return;
    }

    setUser(null);
    setIsLoading(false);
    router.push("/login");
  };

  return (
    <div className='flex items-center gap-4 my-4 w-full justify-between'>
      {user?.avatar_url ? (
        <div className='md:w-20 md:h-20 w-12 h-12 rounded-full overflow-hidden'>
          <Image
            src={user.avatar_url}
            alt='user'
            width={100}
            height={100}
          />
        </div>
      ) : (
        <div className='md:w-20 md:h-20 w-12 h-12 rounded-full overflow-hidden'>
          <FaUserCircle className='w-10 h-10' />
        </div>
      )}
      <div className=''>
        <p className='md:text-2xl text-lg font-bold'>{user?.username ?? "Unknown"}</p>
        <p className='md:text-sm text-xs text-gray-500'>{user?.email}</p>
      </div>
      <div className='flex md:flex-row flex-col md:items-center gap-2 ml-auto'>
        <Link
          href='/profile/edit'
          className='btn btn-outline btn-info btn-sm text-sm'
        >
          Edit Profile
          <MdEdit />
        </Link>
        <button
          type='button'
          className='btn btn-outline btn-error btn-sm text-sm'
          onClick={handleLogout}
          disabled={isLoading}
        >
          Logout
          <MdLogout />
        </button>
      </div>
    </div>
  );
}
