import { caveat } from "@/utils/fonts";
import DrawerNavbar from "./DrawerNavbar";
import Link from "next/link";
import Image from "next/image";
import { User } from "@supabase/supabase-js";
import { getUserSession, logout } from "@/actions/authentication";
import { getUserAvatar } from "@/actions/profile";
import { FaUserCircle } from "react-icons/fa";

export default async function Header() {
  const user = await getUserSession();

  const avatar = user?.is_anonymous ? "" : await getUserAvatar(user?.user_metadata.avatar_url);

  return (
    <header className='w-full text-center flex relative justify-between items-center'>
      <DrawerNavbar />
      <div className='w-fit mx-auto'>
        <Link
          href='/'
          className={`${caveat.className} text-2xl md:text-4xl font-bold`}
        >
          Megumi Sensei
        </Link>
      </div>
      <div className=''>
        <UserButton
          user={user}
          avatar={avatar}
        />
      </div>
    </header>
  );
}

function UserButton({ user, avatar }: { user: User | null; avatar: string | null }) {
  if (!user) {
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

  return (
    <div className='dropdown dropdown-end'>
      <div
        tabIndex={0}
        role='button'
        className='btn btn-ghost btn-circle avatar'
      >
        {avatar ? (  
          <div className='w-10 rounded-full'>
            <Image
              alt='AV'
              src={avatar}
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
            onClick={logout}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
