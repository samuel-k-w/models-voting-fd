import { cn } from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={cn(
        'relative inline-flex items-center justify-center font-medium transition-colors rounded-lg',
        // Sizes
        {
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2.5 text-base': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        },
        // Variants
        {
          'bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50':
            variant === 'primary',
          'bg-gray-200 text-gray-900 hover:bg-gray-300 disabled:opacity-50 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600':
            variant === 'secondary',
          'border-2 border-gray-300 text-gray-900 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-600 dark:text-white dark:hover:bg-gray-800':
            variant === 'outline',
        },
        className
      )}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="absolute inset-0 rounded-lg bg-black/10" />
          <span className="opacity-0">{children}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
