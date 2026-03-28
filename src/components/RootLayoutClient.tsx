'use client';

import React from 'react';
import { useToast } from '@/hooks/useToast';
import { ToastContainer } from '@/components/ui/Toast';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

interface RootLayoutClientProps {
  children: React.ReactNode;
}

export const RootLayoutClient: React.FC<RootLayoutClientProps> = ({ children }) => {
  const { toasts, removeToast } = useToast();

  return (
    <ErrorBoundary>
      {children}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </ErrorBoundary>
  );
};
