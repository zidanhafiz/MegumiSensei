export default function LoadingPage({ message }: { message: string }) {
  return (
    <div className='flex items-center justify-center gap-2 flex-col'>
      <span className='loading loading-dots loading-lg'></span>
      <p className='font-semibold'>{message}</p>
    </div>
  );
}
