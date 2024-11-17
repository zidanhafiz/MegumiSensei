import PageContainer from "@/components/PageContainer";
import Link from "next/link";
import { FaCreditCard } from "react-icons/fa6";

export default function BuyCreditsErrorPage() {
  return (
    <PageContainer title='Beli Kredit' icon={<FaCreditCard />}>
      <div className='flex flex-col items-center justify-center'>
        <h2 className='text-2xl font-bold'>Pembelian kredit gagal</h2>
        <p className='text-sm text-gray-500 my-4'>
          Mohon maaf, pembelian kredit gagal. Silakan coba lagi atau hubungi admin kami jika masalah berlanjut.
        </p>
        <Link href='/profile/buy-credits'>
          <button className='btn btn-primary'>Coba lagi</button>
        </Link>
      </div>
    </PageContainer>
  );
}
