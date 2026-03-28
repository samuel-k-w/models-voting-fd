// Domain Models
export interface Model {
  id: string;
  name: string;
  modelNumber: string;
  image?: string;
  imageUrl?: string;
  voteCount?: number;
  votes?: number;
  description?: string;
  category?: string;
  featured?: boolean;
}

export interface VotingState {
  selectedModelId: string | null;
  votingStatus: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
  isVerified: boolean;
  hasVoted: boolean;
  phone?: string;
  sessionToken?: string;
}

export interface OtpState {
  phone: string;
  otp: string;
  isVerified: boolean;
  isLoading: boolean;
  error: string | null;
  resendTimer: number;
  sessionToken?: string;
}

export interface VotePayload {
  modelId: string;
  sessionToken: string;
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
