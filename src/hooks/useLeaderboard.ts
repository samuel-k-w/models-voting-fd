'use client';

import { useEffect, useRef } from 'react';
import { useLeaderboardStore } from '@/store/leaderboardStore';
import { useVotingStore } from '@/store/votingStore';
import { wsService } from '@/services/websocket';
import type { Model } from '@/types';

interface UseLeaderboardOptions {
  enableWebSocket?: boolean;
  pollInterval?: number;
}

export function useLeaderboard(options: UseLeaderboardOptions = {}) {
  const { enableWebSocket = true, pollInterval = 5000 } = options;
  const { entries, setEntries, updateEntry, setIsLoading, setError } = useLeaderboardStore();
  const { models } = useVotingStore();
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initialize with models from voting store
    if (models.length > 0) {
      const leaderboardEntries = models.map(model => ({
        ...model,
        votes: model.votes || model.voteCount || 0,
      }));
      setEntries(leaderboardEntries as any);
    }
  }, [models, setEntries]);

  useEffect(() => {
    if (!enableWebSocket) return;

    const connectAndListen = async () => {
      try {
        await wsService.connect();
        
        // Subscribe to vote updates
        unsubscribeRef.current = wsService.on('vote-updated', (data: any) => {
          if (data?.modelId && data?.newVoteCount) {
            updateEntry(data.modelId, data.newVoteCount);
          }
        });

        // Subscribe to leaderboard updates
        wsService.on('leaderboard-update', (data: any) => {
          if (data?.models) {
            const leaderboardEntries = data.models.map((model: Model) => ({
              ...model,
              votes: model.votes || model.voteCount || 0,
            }));
            setEntries(leaderboardEntries as any);
          }
        });
      } catch (error) {
        console.error('[useLeaderboard] WebSocket connection failed:', error);
        // Fall back to polling
        startPolling();
      }
    };

    connectAndListen();

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [enableWebSocket, updateEntry, setEntries]);

  const startPolling = () => {
    if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);

    pollIntervalRef.current = setInterval(() => {
      // Trigger leaderboard fetch
      setIsLoading(true);
      fetch('/api/models')
        .then(res => res.json())
        .then(data => {
          if (data?.models) {
            const leaderboardEntries = data.models.map((model: Model) => ({
              ...model,
              votes: model.votes || model.voteCount || 0,
            }));
            setEntries(leaderboardEntries as any);
          }
        })
        .catch(error => {
          console.error('[useLeaderboard] Polling error:', error);
          setError('Failed to fetch leaderboard');
        })
        .finally(() => setIsLoading(false));
    }, pollInterval);
  };

  const startPollingManually = () => startPolling();

  const stopPolling = () => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
  };

  return {
    entries,
    startPolling: startPollingManually,
    stopPolling,
  };
}
