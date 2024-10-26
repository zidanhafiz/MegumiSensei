import Link from "next/link";
import { MdError } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";

export default function NotFound() {
  return (
    <div className='w-full lg:max-w-[768px] lg:mx-auto mt-24 lg:mt-28 text-center'>
      <h2 className='text-2xl lg:text-4xl font-bold flex flex-col items-center justify-center gap-2'>
        <MdError className='text-6xl' />
        404 Not Found
      </h2>
      <p className='mt-5'>Maaf, halaman yang Anda cari tidak dapat ditemukan.</p>
      <Link href='/' className='btn btn-primary mt-5 w-fit mx-auto flex items-center gap-2'>
        <FaArrowRightLong />
        Kembali ke halaman utama
      </Link>
    </div>
  );
}
