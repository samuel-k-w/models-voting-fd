import type { VotePayload, VoteResponse, Model, ApiError } from '@/types';
import { API_ENDPOINTS } from '@/utils/constants';

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.message || `HTTP ${response.status}`);
      }

      return response.json() as Promise<T>;
    } catch (error) {
      console.error('[API Error]', endpoint, error);
      throw error;
    }
  }

  async getModels(): Promise<Model[]> {
    return this.request<Model[]>(API_ENDPOINTS.GET_MODELS);
  }

  async submitVote(payload: VotePayload): Promise<VoteResponse> {
    return this.request<VoteResponse>(API_ENDPOINTS.VOTE, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async verifyOtp(otp: string): Promise<{ success: boolean; userId: string }> {
    return this.request(API_ENDPOINTS.VERIFY_OTP, {
      method: 'POST',
      body: JSON.stringify({ otp }),
    });
  }

  async getLeaderboard() {
    return this.request(API_ENDPOINTS.GET_LEADERBOARD);
  }
}

export const apiService = new ApiService();
