"use client";
import { useUser } from "@/contexts/UserContext";

export function AccountDetails() {
  const { user } = useUser();

  return (
    <>
      <DetailRow
        label='Tipe akun'
        value='Standar'
      />
      <DetailRow
        label='Email terverifikasi'
        value={user?.is_verified ? "Ya" : "Tidak"}
      />
      <DetailRow
        label='Bergabung'
        value={new Date(user?.created_at ?? "").toLocaleString()}
      />
    </>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className='flex items-center justify-between'>
      <p className='text-sm text-gray-500'>{label}</p>
      <p className='text-sm text-gray-500'>{value}</p>
    </div>
  );
}
