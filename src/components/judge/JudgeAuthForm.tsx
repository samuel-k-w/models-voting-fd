'use client';

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { useToast } from '@/hooks/useToast';
import { tokenManager, validateEmail, createDebounce } from '@/utils/security';

interface JudgeAuthFormProps {
  onSuccess?: (token: string) => void;
}

export const JudgeAuthForm: React.FC<JudgeAuthFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { success, error } = useToast();

  const handleSubmit = useCallback(
    createDebounce(async (e: React.FormEvent) => {
      e.preventDefault();

      if (!email || !password) {
        error('Please fill in all fields');
        return;
      }

      if (!validateEmail(email)) {
        error('Please enter a valid email address');
        return;
      }

      if (password.length < 6) {
        error('Password must be at least 6 characters');
        return;
      }

      setIsLoading(true);

      try {
        // Mock authentication - replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Generate mock token
        const mockToken = `judge_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        tokenManager.setToken(mockToken);
        success('Successfully logged in as judge');
        
        if (onSuccess) {
          onSuccess(mockToken);
        }
      } catch (err) {
        error('Authentication failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }, 500),
    [email, password, error, success, onSuccess]
  );

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Judge Login</CardTitle>
          <CardDescription>
            Sign in with your judge credentials to access voting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="judge@example.com"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-foreground-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                aria-label="Email address"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-foreground-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                aria-label="Password"
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>

            <p className="text-xs text-center text-foreground-secondary">
              Demo: Use any email and password (min 6 characters)
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
