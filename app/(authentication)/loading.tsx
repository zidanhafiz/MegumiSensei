export default function AuthenticationLoadingPage() {
  return (
    <div className='flex w-full max-w-md flex-col gap-4 mx-auto mt-16'>
      <div className='grid grid-cols-1 gap-4 mt-4'>
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className='skeleton h-8 w-full'
          ></div>
        ))}
      </div>
    </div>
  );
}
