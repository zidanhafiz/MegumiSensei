"use client";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";
import { logout } from "@/actions/authentication";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";

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
        <div
          tabIndex={0}
          role='button'
          className='btn btn-ghost btn-circle avatar'
        >
          {user.avatar_url ? (
            <div className='w-10 rounded-full'>
              <Image
                alt='AV'
                src={user.avatar_url}
                width={40}
                height={40}
              />
            </div>
          ) : (
            <FaUserCircle className='w-10 h-10' />
          )}
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
}
