export default function Accordion({ title, content, className }: { title: string; content: string, className?: string }) {
  return (
    <div className={`collapse collapse-arrow bg-base-200 ${className}`}>
      <input
        type='checkbox'
        name='my-accordion-2'
      />
      <div className='collapse-title font-medium'>{title}</div>
      <div className='collapse-content'>
        <p>{content}</p>
      </div>
    </div>
  );
}
