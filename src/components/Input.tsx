import { cn } from '../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ className, label, ...props }: InputProps) {
  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-gray-400">{label}</label>}
      <input
        className={cn(
          'w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-gray-100',
          'placeholder:text-gray-500',
          'focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )}
        {...props}
      />
    </div>
  );
}
