export default function LoadingPage() {
  return (
    <div className='flex w-full max-w-4xl flex-col gap-4 mx-auto mt-20'>
      <div className='space-y-3 mb-6'>
        <div className='skeleton h-10 w-1/3 mx-auto'></div>
        <div className='skeleton h-6 w-1/2 mx-auto'></div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className='skeleton h-28 w-full'
          ></div>
        ))}
      </div>
    </div>
  );
}
