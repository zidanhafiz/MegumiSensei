"use client";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body className='max-w-[768px] mx-auto text-center my-8'>
        <h2 className='text-2xl font-bold'>Something went wrong!</h2>
        <p className='text-sm text-gray-500 my-4'>{error.message}</p>
        <button onClick={() => reset()} className='btn btn-primary w-fit'>
          Try again
        </button>
      </body>
    </html>
  );
}
