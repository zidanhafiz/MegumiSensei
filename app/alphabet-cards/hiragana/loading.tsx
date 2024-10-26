export default function HiraganaLoadingPage() {
  return (
    <div className='flex w-full flex-col gap-5 my-5'>
      <div className='skeleton h-6 w-28'></div>
      <div className='skeleton h-4 w-24'></div>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className='grid grid-cols-4 gap-4 mt-2'>
          <div className='skeleton h-28 w-auto'></div>
          <div className='skeleton h-28 w-auto'></div>
          <div className='skeleton h-28 w-auto'></div>
          <div className='skeleton h-28 w-auto'></div>
        </div>
      ))}
    </div>
  );
}
