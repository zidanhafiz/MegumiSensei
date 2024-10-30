"use client";
import PageContainer from "@/components/PageContainer";
import { useEffect } from "react";
import { TbAlertCircle } from "react-icons/tb";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageContainer title='Error' icon={<TbAlertCircle />}>
      <div className='flex flex-col items-center justify-center my-7 gap-5'>
        <h2 className='text-lg font-medium'>Maaf ada kesalahan teknis</h2>
        <p>{error?.message}</p>
        <button className='btn btn-primary' onClick={() => reset()}>
          Coba lagi
        </button>
      </div>
    </PageContainer>
  );
}
