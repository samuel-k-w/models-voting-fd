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

  const voteCount = model.votes || model.voteCount || 0;

  return (
    <Modal
      isOpen={isOpen}
      title="Confirm Your Vote"
      description={`Cast your vote for ${model.name}?`}
      cancelLabel="Cancel"
      confirmLabel="Cast Vote"
      isLoading={isLoading}
      onConfirm={onConfirm}
      onCancel={onCancel}
      variant="confirm"
    >
      <div className="space-y-5">
        {/* Model Preview */}
        {model.image && (
          <div className="rounded-xl overflow-hidden h-48">
            <img
              src={model.image}
              alt={model.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Model Info */}
        <div className="space-y-3">
          <div>
            <p className="text-sm text-foreground/60 font-medium">Model Name</p>
            <p className="text-lg font-semibold text-foreground">{model.name}</p>
          </div>
          <div>
            <p className="text-sm text-foreground/60 font-medium">Model Number</p>
            <p className="text-base font-semibold text-foreground">{model.modelNumber}</p>
          </div>
          <div>
            <p className="text-sm text-foreground/60 font-medium">Current Votes</p>
            <p className="text-2xl font-bold text-primary">{voteCount.toLocaleString()}</p>
          </div>
        </div>

        {/* Warning */}
        <div className="rounded-lg bg-primary-light/20 border border-primary/30 p-3">
          <p className="text-xs text-foreground font-medium">
            Your vote will be recorded and cannot be changed.
          </p>
        </div>
      </div>
    </Modal>
  );
}
