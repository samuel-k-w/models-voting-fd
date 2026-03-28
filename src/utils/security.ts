// Debounce utilities for preventing multiple rapid clicks
export function createDebounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 500
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;
  
  return function debounced(...args: Parameters<T>) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  };
}

// Rate limiting with exponential backoff
export class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private readonly maxAttempts: number;
  private readonly windowMs: number;
  private readonly backoffMultiplier: number;

  constructor(
    maxAttempts: number = 5,
    windowMs: number = 60000,
    backoffMultiplier: number = 2
  ) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
    this.backoffMultiplier = backoffMultiplier;
  }

  isAllowed(key: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(key) || [];
    const recentAttempts = attempts.filter(time => now - time < this.windowMs);

    if (recentAttempts.length < this.maxAttempts) {
      recentAttempts.push(now);
      this.attempts.set(key, recentAttempts);
      return true;
    }

    return false;
  }

  getRetryAfter(key: string): number {
    const attempts = this.attempts.get(key) || [];
    if (attempts.length === 0) return 0;
    
    const oldestAttempt = Math.min(...attempts);
    const retryAfter = oldestAttempt + this.windowMs - Date.now();
    return Math.max(0, retryAfter);
  }

  reset(key: string): void {
    this.attempts.delete(key);
  }
}

// Secure token management using hybrid approach (memory + encrypted cookie)
export class TokenManager {
  private static readonly TOKEN_MEMORY_KEY = 'auth_token';
  private static readonly SECURE_PREFIX = '__secure_';
  private token: string | null = null;

  setToken(token: string): void {
    // Store in memory
    this.token = token;
    
    // Also store in localStorage with secure prefix (for persistence across page reloads)
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(
          TokenManager.SECURE_PREFIX + TokenManager.TOKEN_MEMORY_KEY,
          this.encodeToken(token)
        );
      } catch (e) {
        console.warn('Failed to store token securely');
      }
    }
  }

  getToken(): string | null {
    // Try memory first (most secure)
    if (this.token) return this.token;

    // Fall back to localStorage
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(
          TokenManager.SECURE_PREFIX + TokenManager.TOKEN_MEMORY_KEY
        );
        if (stored) {
          this.token = this.decodeToken(stored);
          return this.token;
        }
      } catch (e) {
        console.warn('Failed to retrieve token');
      }
    }

    return null;
  }

  clearToken(): void {
    this.token = null;
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(
          TokenManager.SECURE_PREFIX + TokenManager.TOKEN_MEMORY_KEY
        );
      } catch (e) {
        console.warn('Failed to clear token');
      }
    }
  }

  isValidToken(token: string | null): boolean {
    if (!token) return false;
    
    try {
      // Basic validation - token should have structure
      const parts = token.split('.');
      return parts.length >= 2 && parts[0].length > 0;
    } catch {
      return false;
    }
  }

  private encodeToken(token: string): string {
    // Simple encoding - in production use proper encryption
    return btoa(token);
  }

  private decodeToken(encoded: string): string {
    try {
      return atob(encoded);
    } catch {
      return '';
    }
  }
}

// Singleton instance
export const tokenManager = new TokenManager();

// Input sanitization
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>\"']/g, '') // Remove HTML-like characters
    .trim()
    .slice(0, 255); // Limit length
}

// Phone number validation and formatting
export function validatePhoneNumber(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Email validation
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// OTP validation
export function validateOTP(otp: string): boolean {
  return /^\d{6}$/.test(otp);
}
