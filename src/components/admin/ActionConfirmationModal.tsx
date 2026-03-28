'use client';

import { Modal } from '@/components/ui/Modal';

interface ActionConfirmationModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  actionLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  variant?: 'danger' | 'warning' | 'success';
}

export function ActionConfirmationModal({
  isOpen,
  title,
  description,
  actionLabel,
  onConfirm,
  onCancel,
  isLoading = false,
  variant = 'warning',
}: ActionConfirmationModalProps) {
  if (!isOpen) return null;

  const variantStyles = {
    danger: 'border-error/30 bg-error/10',
    warning: 'border-warning/30 bg-warning/10',
    success: 'border-success/30 bg-success/10',
  };

  return (
    <Modal
      isOpen={isOpen}
      title={title}
      description={description}
      onCancel={onCancel}
      onConfirm={onConfirm}
      isLoading={isLoading}
      confirmLabel={actionLabel}
      variant={variant as 'confirm' | 'success' | 'error'}
    >
      <div className={`rounded-lg border p-4 ${variantStyles[variant]}`}>
        <p className="text-sm font-medium text-foreground">
          This action requires confirmation and cannot be undone.
        </p>
      </div>
    </Modal>
  );
}
