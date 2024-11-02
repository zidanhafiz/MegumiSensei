import { User } from "@supabase/supabase-js";

export function AccountDetails({ user }: { user: User }) {
  return (
    <>
      <DetailRow
        label='Type account'
        value='Free'
      />
      <DetailRow
        label='Email verified'
        value={user.email_confirmed_at ? "Yes" : "No"}
      />
      <DetailRow
        label='Joined'
        value={new Date(user.created_at).toLocaleString()}
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
