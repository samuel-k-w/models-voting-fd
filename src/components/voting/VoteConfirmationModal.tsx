'use client';

import { Modal } from '@/components/ui/Modal';
import type { Model } from '@/types';

interface VoteConfirmationModalProps {
  isOpen: boolean;
  model: Model | null;
  isLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function VoteConfirmationModal({
  isOpen,
  model,
  isLoading,
  onConfirm,
  onCancel,
}: VoteConfirmationModalProps) {
  if (!model) return null;

  return (
    <Modal
      isOpen={isOpen}
      title="Confirm Your Vote"
      description={`Are you sure you want to vote for ${model.name}?`}
      cancelLabel="Cancel"
      confirmLabel="Vote"
      isLoading={isLoading}
      onConfirm={onConfirm}
      onCancel={onCancel}
      variant="confirm"
    >
      <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Model: <span className="font-semibold">{model.name}</span>
        </p>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Number: <span className="font-semibold">#{model.modelNumber}</span>
        </p>
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          Your vote will be recorded and cannot be changed.
        </p>
      </div>
    </Modal>
  );
}
