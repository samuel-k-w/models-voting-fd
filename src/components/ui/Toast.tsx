import { Toast as ToastType, ToastType as ToastTypeEnum } from '@/hooks/useToast';
import React from 'react';

interface ToastProps extends ToastType {
  onClose: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({
  id,
  message,
  type,
  onClose,
}) => {
  const getStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-success-light',
          border: 'border-success',
          icon: '✓',
          text: 'text-success',
        };
      case 'error':
        return {
          bg: 'bg-error-light',
          border: 'border-error',
          icon: '✕',
          text: 'text-error',
        };
      case 'warning':
        return {
          bg: 'bg-warning-light',
          border: 'border-warning',
          icon: '⚠',
          text: 'text-warning',
        };
      case 'info':
      default:
        return {
          bg: 'bg-info-light',
          border: 'border-info',
          icon: 'ℹ',
          text: 'text-info',
        };
    }
  };

  const styles = getStyles();

  return (
    <div
      className={`flex items-start gap-3 rounded-lg border-2 ${styles.bg} ${styles.border} ${styles.text} px-4 py-3 shadow-lg animate-in fade-in slide-in-from-right-4 duration-300`}
      role="alert"
      aria-live="polite"
    >
      <span className="flex-shrink-0 text-lg font-bold">{styles.icon}</span>
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={() => onClose(id)}
        className="flex-shrink-0 text-lg leading-none opacity-70 hover:opacity-100 transition-opacity"
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
};

interface ToastContainerProps {
  toasts: ToastType[];
  onClose: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onClose,
}) => {
  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 pointer-events-none"
      role="region"
      aria-label="Notifications"
    >
      {toasts.map(toast => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast {...toast} onClose={onClose} />
        </div>
      ))}
    </div>
  );
};
