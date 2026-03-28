'use client';

import { create } from 'zustand';
import type { Model } from '@/types';

export interface LeaderboardEntry extends Model {
  rank: number;
  isTopThree: boolean;
  previousRank?: number;
  rankChanged?: boolean;
}

interface LeaderboardStore {
  entries: LeaderboardEntry[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  setEntries: (entries: LeaderboardEntry[]) => void;
  updateEntry: (id: string, votes: number) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setLastUpdated: (date: Date) => void;
  sortByVotes: () => void;
}

export const useLeaderboardStore = create<LeaderboardStore>((set, get) => ({
  entries: [],
  isLoading: false,
  error: null,
  lastUpdated: null,

  setEntries: (entries) => {
    const sortedEntries = entries
      .sort((a, b) => (b.votes || b.voteCount || 0) - (a.votes || a.voteCount || 0))
      .map((entry, index) => ({
        ...entry,
        rank: index + 1,
        isTopThree: index < 3,
        previousRank: get().entries.find(e => e.id === entry.id)?.rank,
      }))
      .map(entry => ({
        ...entry,
        rankChanged: entry.previousRank !== undefined && entry.previousRank !== entry.rank,
      }));

    set({ entries: sortedEntries, lastUpdated: new Date() });
  },

  updateEntry: (id, votes) => {
    const state = get();
    const updatedEntries = state.entries
      .map(entry => (entry.id === id ? { ...entry, votes } : entry))
      .sort((a, b) => (b.votes || b.voteCount || 0) - (a.votes || a.voteCount || 0))
      .map((entry, index) => ({
        ...entry,
        rank: index + 1,
        isTopThree: index < 3,
        rankChanged: entry.previousRank !== undefined && entry.previousRank !== index + 1,
      }));

    set({ entries: updatedEntries, lastUpdated: new Date() });
  },

  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setLastUpdated: (date) => set({ lastUpdated: date }),

  sortByVotes: () => {
    const state = get();
    const sorted = [...state.entries]
      .sort((a, b) => (b.votes || b.voteCount || 0) - (a.votes || a.voteCount || 0))
      .map((entry, index) => ({
        ...entry,
        rank: index + 1,
        isTopThree: index < 3,
      }));
    set({ entries: sorted });
  },
}));
