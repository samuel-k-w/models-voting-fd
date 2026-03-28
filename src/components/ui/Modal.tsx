'use client';

import { useEffect } from 'react';
import { cn } from '@/utils/cn';

interface ModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  cancelLabel?: string;
  confirmLabel?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'confirm' | 'success' | 'error';
  children?: React.ReactNode;
}

export function Modal({
  isOpen,
  title,
  description,
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
  isLoading = false,
  onConfirm,
  onCancel,
  variant = 'confirm',
  children,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="mx-4 w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-900">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          {description}
        </p>

        {children && <div className="mt-4">{children}</div>}

        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={cn(
              'flex-1 rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-colors disabled:opacity-50',
              {
                'bg-blue-600 hover:bg-blue-700': variant === 'confirm',
                'bg-green-600 hover:bg-green-700': variant === 'success',
                'bg-red-600 hover:bg-red-700': variant === 'error',
              }
            )}
          >
            {isLoading ? 'Loading...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
