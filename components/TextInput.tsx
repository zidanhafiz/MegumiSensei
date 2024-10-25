import { TextareaHTMLAttributes } from "react";

type TextInputProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  variant?: 'input' | 'result';
  className?: string;
}

export default function TextInput({ variant, className, ...props }: TextInputProps) {
  if (variant === 'input') {
    return (
      <div>
        <textarea
          className={`textarea textarea-primary w-full ${className}`}
          rows={7}
          {...props}
        />
      </div>
    );
  }
  return (
    <div>
      <textarea
        className={`textarea textarea-info w-full ${className}`}
        rows={7}
        readOnly
        {...props}
      />
    </div>
  );
}
