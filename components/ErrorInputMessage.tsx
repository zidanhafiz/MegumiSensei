export default function ErrorInputMessage({ message, className }: { message?: string, className?: string }) {
  if (!message) return null;

  return (
    <span className={`text-red-500 text-sm my-1 mx-3 italic ${className}`}>
      {message}      
    </span>
  )
}
