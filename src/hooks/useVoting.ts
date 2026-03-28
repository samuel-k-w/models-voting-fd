'use client';

import { useCallback } from 'react';
import { useVotingStore } from '@/store/votingStore';
import { apiService } from '@/services/api';
import { VOTE_CONFIRMATION_DELAY } from '@/utils/constants';

export function useVoting() {
  const {
    selectedModelId,
    votingStatus,
    error,
    isVerified,
    hasVoted,
    setVotingStatus,
    setError,
    setSelectedModelId,
    setHasVoted,
  } = useVotingStore();

  const submitVote = useCallback(
    async (modelId: string) => {
      if (!isVerified || hasVoted) {
        return;
      }

      setSelectedModelId(modelId);
      setVotingStatus('loading');
      setError(null);

      try {
        await new Promise((resolve) =>
          setTimeout(resolve, VOTE_CONFIRMATION_DELAY)
        );

        const response = await apiService.submitVote({
          modelId,
          timestamp: Date.now(),
        });

        if (response.success) {
          setVotingStatus('success');
          setHasVoted(true);
        } else {
          setVotingStatus('error');
          setError(response.message || 'Failed to submit vote');
        }
      } catch (err) {
        setVotingStatus('error');
        setError(
          err instanceof Error ? err.message : 'An unexpected error occurred'
        );
      }
    },
    [isVerified, hasVoted, setVotingStatus, setError, setSelectedModelId, setHasVoted]
  );

  const resetVotingUI = useCallback(() => {
    setVotingStatus('idle');
    setError(null);
    setSelectedModelId(null);
  }, [setVotingStatus, setError, setSelectedModelId]);

  return {
    selectedModelId,
    votingStatus,
    error,
    isVerified,
    hasVoted,
    submitVote,
    resetVotingUI,
  };
}
