'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { ModelCard } from './ModelCard';
import { ModelCardSkeleton } from './ModelCardSkeleton';
import { VoteConfirmationModal } from './VoteConfirmationModal';
import { Model } from '@/types';
import { MOCK_MODELS } from '@/utils/mockData';

export function ClientVotingPage() {
  const router = useRouter();
  const [models, setModels] = useState<Model[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isVoting, setIsVoting] = useState(false);

  // Check verification status
  useEffect(() => {
    const verified = localStorage.getItem('is_verified') === 'true';
    setIsVerified(verified);

    // Simulate loading models
    const timer = setTimeout(() => {
      setModels(MOCK_MODELS);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const selectedModel = models.find((m) => m.id === selectedModelId) || null;

  const handleVoteClick = (modelId: string) => {
    if (!isVerified) {
      router.push('/verify');
      return;
    }
    setSelectedModelId(modelId);
    setShowConfirmation(true);
  };

  const handleConfirmVote = async () => {
    if (!selectedModelId) return;

    setIsVoting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Update vote count
      setModels((prev) =>
        prev.map((m) =>
          m.id === selectedModelId ? { ...m, votes: (m.votes || 0) + 1 } : m
        )
      );

      // Show success and redirect
      setShowConfirmation(false);
      router.push(`/vote-success?modelId=${selectedModelId}`);
    } catch (error) {
      console.error('Vote submission failed:', error);
      setIsVoting(false);
    }
  };

  const handleCancelVote = () => {
    setShowConfirmation(false);
    setSelectedModelId(null);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8 sm:mb-12 space-y-3">
        <h1 className="text-balance text-4xl sm:text-5xl font-bold text-foreground">
          Vote for Your Favorite Model
        </h1>
        <p className="text-lg text-foreground/60 max-w-2xl">
          {!isVerified
            ? 'Verify your phone number to cast your vote in our real-time voting platform'
            : 'Select a model and cast your vote. Each vote counts toward determining the winner.'}
        </p>
      </div>

      {/* Verification CTA */}
      {!isVerified && (
        <div className="mb-8 sm:mb-12 bg-primary-light/20 dark:bg-primary-light/10 border border-primary/30 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Verify to Vote</h3>
              <p className="mt-1 text-foreground/60">
                We need to verify your phone number to ensure fair voting
              </p>
            </div>
            <Button
              onClick={() => router.push('/verify')}
              variant="primary"
              size="lg"
              className="whitespace-nowrap"
            >
              Verify Now
            </Button>
          </div>
        </div>
      )}

      {/* Models Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          // Skeleton loaders
          Array.from({ length: 6 }).map((_, i) => (
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
              isDisabled={!isVerified}
              onVote={handleVoteClick}
            />
          ))
        ) : (
          // Empty state
          <div className="col-span-full rounded-2xl border-2 border-dashed border-border p-12 sm:p-16 text-center">
            <svg
              className="mx-auto w-12 h-12 text-foreground/30 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-foreground/60 text-lg">
              No models available at this time.
            </p>
            <p className="text-foreground/40 text-sm mt-2">
              Please check back later to cast your vote.
            </p>
          </div>
        )}
      </div>

      {/* Vote Confirmation Modal */}
      <VoteConfirmationModal
        isOpen={showConfirmation}
        model={selectedModel}
        isLoading={isVoting}
        onConfirm={handleConfirmVote}
        onCancel={handleCancelVote}
      />
    </div>
  );
}
