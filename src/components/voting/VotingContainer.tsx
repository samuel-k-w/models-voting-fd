'use client';

import { useState, useCallback, useMemo } from 'react';
import { useVoting, useModels } from '@/hooks';
import { ModelCard } from './ModelCard';
import { ModelCardSkeleton } from './ModelCardSkeleton';
import { VoteConfirmationModal } from './VoteConfirmationModal';
import { VoteSuccessModal } from './VoteSuccessModal';
import { SKELETON_COUNT } from '@/utils/constants';

export function VotingContainer() {
  const { models, isLoading: isModelsLoading } = useModels();
  const {
    selectedModelId,
    votingStatus,
    isVerified,
    hasVoted,
    submitVote,
    resetVotingUI,
  } = useVoting();

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const selectedModel = useMemo(
    () => models.find((m) => m.id === selectedModelId) || null,
    [models, selectedModelId]
  );

  const handleVoteClick = useCallback(
    (modelId: string) => {
      if (!isVerified || hasVoted) {
        return;
      }
      // Find the model and show confirmation
      const model = models.find((m) => m.id === modelId);
      if (model) {
        setShowConfirmation(true);
        submitVote(modelId);
      }
    },
    [isVerified, hasVoted, models, submitVote]
  );

  const handleConfirmVote = useCallback(() => {
    // Vote is already submitted, just show success
    if (votingStatus === 'success') {
      setShowConfirmation(false);
      setShowSuccess(true);
    }
  }, [votingStatus]);

  const handleCancelVote = useCallback(() => {
    setShowConfirmation(false);
    resetVotingUI();
  }, [resetVotingUI]);

  const handleCloseSuccess = useCallback(() => {
    setShowSuccess(false);
    resetVotingUI();
  }, [resetVotingUI]);

  const isVoting = votingStatus === 'loading';

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-balance text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
          Vote for Your Favorite Model
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {!isVerified
            ? 'Verify your identity to start voting'
            : hasVoted
              ? 'Thank you for voting!'
              : 'Select a model and cast your vote'}
        </p>
      </div>

      {/* Verification Notice */}
      {!isVerified && (
        <div className="mb-6 rounded-lg border-l-4 border-orange-500 bg-orange-50 p-4 dark:bg-orange-900/20">
          <p className="text-sm font-medium text-orange-900 dark:text-orange-200">
            Please verify your phone number to vote
          </p>
        </div>
      )}

      {/* Success Notice */}
      {hasVoted && (
        <div className="mb-6 rounded-lg border-l-4 border-green-500 bg-green-50 p-4 dark:bg-green-900/20">
          <p className="text-sm font-medium text-green-900 dark:text-green-200">
            Your vote has been recorded successfully!
          </p>
        </div>
      )}

      {/* Error Notice */}
      {votingStatus === 'error' && (
        <div className="mb-6 rounded-lg border-l-4 border-red-500 bg-red-50 p-4 dark:bg-red-900/20">
          <p className="text-sm font-medium text-red-900 dark:text-red-200">
            Failed to submit your vote. Please try again.
          </p>
        </div>
      )}

      {/* Models Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isModelsLoading ? (
          // Skeleton loaders
          Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <ModelCardSkeleton key={`skeleton-${i}`} />
          ))
        ) : models.length > 0 ? (
          // Model cards
          models.map((model) => (
            <ModelCard
              key={model.id}
              model={model}
              isSelected={selectedModelId === model.id}
              isLoading={isVoting && selectedModelId === model.id}
              isDisabled={!isVerified || hasVoted}
              onVote={handleVoteClick}
            />
          ))
        ) : (
          // Empty state
          <div className="col-span-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">
              No models available at this time.
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      <VoteConfirmationModal
        isOpen={showConfirmation}
        model={selectedModel}
        isLoading={isVoting}
        onConfirm={handleConfirmVote}
        onCancel={handleCancelVote}
      />

      <VoteSuccessModal
        isOpen={showSuccess}
        model={selectedModel}
        onClose={handleCloseSuccess}
      />
    </div>
  );
}
