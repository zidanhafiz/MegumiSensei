"use client";
import { Credit } from "@/types/tableTypes";
import ProductCard from "./ProductCard";
import { useEffect, useTransition } from "react";
import { useUser } from "@/contexts/UserContext";
import { buyCredits } from "@/actions/credits";
import { useRouter } from "next/navigation";

export default function ProductList({ credits }: { credits: Credit[] }) {
  const [isPending, startTransition] = useTransition();
  const { user } = useUser();
  const router = useRouter();

  const handleBuy = async (id: number, sku: string) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("sku", sku);
      formData.append("id", id.toString());
      formData.append("userId", user?.user_id ?? "");

      const res = await buyCredits(formData);

      if (!res.success || !res.data) {
        console.error(res.error);
        router.push("/profile/error");
        return;
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.snap.pay(res.data);
    });
  };

  useEffect(() => {
    const midtransScriptUrl = process.env.NEXT_PUBLIC_MIDTRANS_URL!;

    const scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;

    const myMidtransClientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!;
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {credits.map((credit) => (
        <ProductCard
          key={credit.id}
          product={credit}
          handleBuy={handleBuy}
          isPending={isPending}
        />
      ))}
    </div>
  );
}
