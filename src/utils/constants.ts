// API Endpoints
export const API_ENDPOINTS = {
  VOTE: '/api/vote',
  VERIFY_OTP: '/api/verify-otp',
  GET_MODELS: '/api/models',
  GET_LEADERBOARD: '/api/leaderboard',
} as const;

// WebSocket
export const WS_EVENTS = {
  VOTE_RECEIVED: 'vote:received',
  MODEL_UPDATED: 'model:updated',
  LEADERBOARD_UPDATED: 'leaderboard:updated',
  USER_VERIFIED: 'user:verified',
} as const;

// UI Constants
export const SKELETON_COUNT = 6;
export const VOTE_CONFIRMATION_DELAY = 300;
