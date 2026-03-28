'use client';

import { Modal } from '@/components/ui/Modal';
import type { Model } from '@/types';

interface VoteSuccessModalProps {
  isOpen: boolean;
  model: Model | null;
  onClose: () => void;
}

export function VoteSuccessModal({
  isOpen,
  model,
  onClose,
}: VoteSuccessModalProps) {
  if (!model) return null;

  return (
    <Modal
      isOpen={isOpen}
      title="Vote Submitted!"
      description="Thank you for voting"
      cancelLabel=""
      confirmLabel="Done"
      onConfirm={onClose}
      onCancel={onClose}
      variant="success"
    >
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <span className="text-xl">✓</span>
        </div>
        <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
          Your vote for <span className="font-semibold">{model.name}</span> has been recorded successfully.
        </p>
      </div>
    </Modal>
  );
}
