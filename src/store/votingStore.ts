'use client';

import { create } from 'zustand';
import type { VotingState, Model } from '@/types';

interface VotingStore extends VotingState {
  models: Model[];
  setModels: (models: Model[]) => void;
  setSelectedModelId: (id: string | null) => void;
  setVotingStatus: (status: 'idle' | 'loading' | 'success' | 'error') => void;
  setError: (error: string | null) => void;
  setIsVerified: (verified: boolean) => void;
  setHasVoted: (voted: boolean) => void;
  resetVotingState: () => void;
}

const initialState: VotingState = {
  selectedModelId: null,
  votingStatus: 'idle',
  error: null,
  isVerified: false,
  hasVoted: false,
};

export const useVotingStore = create<VotingStore>((set) => ({
  ...initialState,
  models: [],

  setModels: (models) => set({ models }),
  setSelectedModelId: (id) => set({ selectedModelId: id }),
  setVotingStatus: (status) => set({ votingStatus: status }),
  setError: (error) => set({ error }),
  setIsVerified: (verified) => set({ isVerified: verified }),
  setHasVoted: (voted) => set({ hasVoted: voted }),

  resetVotingState: () => set(initialState),
}));
