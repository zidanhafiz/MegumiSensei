import PageContainer from "@/components/PageContainer";
import { FaCreditCard } from "react-icons/fa";
import ProductList from "./ProductList";
import { createClient } from "@/utils/supabase/server";

const getCredits = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("credits").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export default async function BuyCreditsPage() {
  const credits = await getCredits();

  return (
    <PageContainer
      title='Beli Kredit'
      icon={<FaCreditCard />}
    >
      <div>
        <p className='text-sm text-gray-500 mb-8'>
          Beli kredit untuk menggunakan layanan kami. <br />
          Pembayaran tersedia melalui e-wallet atau QRIS
        </p>
        <ProductList credits={credits} />
      </div>
    </PageContainer>
  );
}
