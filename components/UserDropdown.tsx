"use client";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";
import { logout } from "@/actions/authentication";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import { FaCoins } from "react-icons/fa6";

export default function UserDropdown() {
  const { user, setUser, userLoading } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    const res = await logout();

    if (!res.success) {
      return;
    }

    setUser(null);
    router.push("/login");
  };

  if (!user && !userLoading) {
    return (
      <div>
        <Link
          href='/login'
          className='btn btn-primary btn-sm'
        >
          Login
        </Link>
      </div>
    );
  }

  if (user) {
    return (
      <div className='dropdown dropdown-end'>
        <div className='flex items-center w-full gap-2'>
          <div className='md:flex items-center gap-2 hidden'>
            <FaCoins className='text-secondary' size={16} />
            <span className='font-semibold leading-none'>{user.credits}</span>
          </div>
          <div
            tabIndex={0}
            role='button'
            className='btn btn-ghost btn-circle avatar'
          >
            <div className='w-10 rounded-full'>
              {user.avatar_url ? (
                <Image
                  alt='AV'
                  src={user.avatar_url}
                  width={40}
                  height={40}
                />
              ) : (
                <FaUserCircle className='w-10 h-10' />
              )}
            </div>
          </div>
        </div>
        <ul
          tabIndex={0}
          className='menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow'
        >
          <li className='font-bold text-start px-4 py-2'>{user.is_anonymous ? "Guest" : user.email}</li>
          {!user.is_anonymous && (
            <li>
              <Link href='/profile'>Profile</Link>
            </li>
          )}
          <li>
            <button
              type='button'
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    );
  }

  return <div className='skeleton p-2 h-10 w-10 rounded-full'></div>;
}
