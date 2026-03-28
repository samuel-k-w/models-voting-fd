// Domain Models
export interface Model {
  id: string;
  name: string;
  modelNumber: string;
  imageUrl: string;
  voteCount: number;
  description?: string;
}

export interface VotingState {
  selectedModelId: string | null;
  votingStatus: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
  isVerified: boolean;
  hasVoted: boolean;
}

export interface VotePayload {
  modelId: string;
  userId?: string;
  timestamp: number;
}

export interface VoteResponse {
  success: boolean;
  modelId: string;
  newVoteCount: number;
  message?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}
