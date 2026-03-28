'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/hooks/useToast';
import { createDebounce } from '@/utils/security';
import { MOCK_MODELS } from '@/utils/mockData';
import { Model } from '@/types';
import Image from 'next/image';

interface JudgeVotingInterfaceProps {
  judgeWeight?: number;
  roundName?: string;
  hasVoted?: boolean;
  onVoteSubmit?: (modelId: string) => Promise<void>;
}

export const JudgeVotingInterface: React.FC<JudgeVotingInterfaceProps> = ({
  judgeWeight = 2,
  roundName = 'Current Round',
  hasVoted = false,
  onVoteSubmit,
}) => {
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
  const [isVoting, setIsVoting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { success, error } = useToast();

  const selectedModel = useMemo(
    () => MOCK_MODELS.find(m => m.id === selectedModelId),
    [selectedModelId]
  );

  const handleVoteClick = useCallback((modelId: string) => {
    if (hasVoted) {
      error('You have already voted in this round');
      return;
    }
    setSelectedModelId(modelId);
    setShowConfirmation(true);
  }, [hasVoted, error]);

  const handleConfirmVote = useCallback(
    createDebounce(async () => {
      if (!selectedModel) return;

      setIsVoting(true);
      try {
        if (onVoteSubmit) {
          await onVoteSubmit(selectedModel.id);
        }
        success(`Vote for ${selectedModel.name} submitted with weight ${judgeWeight}x`);
        setShowConfirmation(false);
        setSelectedModelId(null);
      } catch (err) {
        error('Failed to submit vote. Please try again.');
      } finally {
        setIsVoting(false);
      }
    }, 500),
    [selectedModel, judgeWeight, onVoteSubmit, success, error]
  );

  return (
    <div className="space-y-6">
      {/* Judge Status Bar */}
      <Card variant="outlined">
        <CardContent className="flex items-center justify-between">
          <div>
            <p className="text-sm text-foreground-secondary">Judge Vote Weight</p>
            <p className="text-2xl font-bold text-primary">{judgeWeight}x</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-foreground-secondary">Round: {roundName}</p>
            <p className={`text-sm font-medium ${hasVoted ? 'text-success' : 'text-warning'}`}>
              {hasVoted ? '✓ Voted' : 'Voting Enabled'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Models Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_MODELS.map(model => (
          <JudgeModelCard
            key={model.id}
            model={model}
            isSelected={selectedModelId === model.id}
            isDisabled={hasVoted}
            judgeWeight={judgeWeight}
            onVote={handleVoteClick}
          />
        ))}
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirmation}
        title="Confirm Your Vote"
        description={`Submit your judge vote for ${selectedModel?.name} with ${judgeWeight}x weight?`}
        onConfirm={handleConfirmVote}
        onCancel={() => setShowConfirmation(false)}
        confirmLabel={`Vote (${judgeWeight}x)`}
        isLoading={isVoting}
        variant="confirm"
      >
        {selectedModel && (
          <div className="space-y-4">
            <div className="relative h-48 rounded-lg overflow-hidden bg-muted">
              <img
                src={selectedModel.image || 'https://images.unsplash.com/photo-1469460340855-fff4a5d92341?w=500&h=600&fit=crop'}
                alt={selectedModel.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm text-foreground-secondary">Model Name</p>
              <p className="text-lg font-bold text-foreground">{selectedModel.name}</p>
            </div>
            <div className="flex gap-4">
              <div>
                <p className="text-sm text-foreground-secondary">Model Number</p>
                <p className="font-semibold text-foreground">{selectedModel.modelNumber}</p>
              </div>
              <div>
                <p className="text-sm text-foreground-secondary">Vote Weight</p>
                <p className="font-semibold text-primary text-lg">{judgeWeight}x</p>
              </div>
            </div>
            <div className="rounded-lg bg-info-light border border-info p-3">
              <p className="text-xs text-info font-medium">
                Your vote will count as {judgeWeight} vote(s) in this round. This action cannot be undone.
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

interface JudgeModelCardProps {
  model: Model;
  isSelected: boolean;
  isDisabled: boolean;
  judgeWeight: number;
  onVote: (modelId: string) => void;
}

const JudgeModelCard: React.FC<JudgeModelCardProps> = ({
  model,
  isSelected,
  isDisabled,
  judgeWeight,
  onVote,
}) => {
  return (
    <Card
      className={`transition-all cursor-pointer ${
        isSelected ? 'ring-2 ring-primary' : ''
      } ${isDisabled ? 'opacity-75' : ''}`}
      onClick={() => !isDisabled && onVote(model.id)}
    >
      <div className="relative h-48 overflow-hidden rounded-t-lg bg-muted -m-6 mb-4">
        <img
          src={model.image || 'https://images.unsplash.com/photo-1469460340855-fff4a5d92341?w=500&h=600&fit=crop'}
          alt={model.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {isSelected && (
          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
            <span className="text-4xl font-bold text-white">✓</span>
          </div>
        )}
      </div>
      <CardContent>
        <h3 className="text-lg font-bold text-foreground truncate">{model.name}</h3>
        <p className="text-sm text-foreground-secondary">{model.modelNumber}</p>
        {isDisabled ? (
          <Button variant="outline" size="lg" className="w-full mt-4" disabled>
            Already Voted
          </Button>
        ) : (
          <Button
            variant={isSelected ? 'primary' : 'outline'}
            size="lg"
            className="w-full mt-4"
            onClick={(e) => {
              e.stopPropagation();
              onVote(model.id);
            }}
          >
            Vote ({judgeWeight}x)
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
