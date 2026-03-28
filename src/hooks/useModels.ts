'use client';

import { useState, useEffect } from 'react';
import { useVotingStore } from '@/store/votingStore';
import { apiService } from '@/services/api';
import type { Model } from '@/types';

export function useModels() {
  const { models, setModels } = useVotingStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await apiService.getModels();
        setModels(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load models'
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (models.length === 0) {
      fetchModels();
    } else {
      setIsLoading(false);
    }
  }, []);

  return {
    models,
    isLoading,
    error,
  };
}
