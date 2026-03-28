'use client';

import type { Metadata } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { JudgeVotingInterface } from '@/components/judge/JudgeVotingInterface';
import { tokenManager } from '@/utils/security';
import { Card, CardContent } from '@/components/ui/Card';

export default function JudgeVotingPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = tokenManager.getToken();
    if (!token || !token.startsWith('judge_')) {
      router.push('/judge/login');
      return;
    }
    setIsAuthenticated(true);
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">Judge Voting</h1>
          <p className="mt-2 text-foreground-secondary">
            Cast your weighted vote for your favorite model
          </p>
        </div>

        {/* Info Card */}
        <Card className="mb-8" variant="outlined">
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-foreground-secondary font-medium">Vote Status</p>
              <p className="text-lg font-bold text-success mt-1">✓ Voting Enabled</p>
            </div>
            <div>
              <p className="text-sm text-foreground-secondary font-medium">Vote Weight</p>
              <p className="text-lg font-bold text-primary mt-1">2.0x</p>
            </div>
            <div>
              <p className="text-sm text-foreground-secondary font-medium">Current Round</p>
              <p className="text-lg font-bold text-foreground mt-1">Spring 2024</p>
            </div>
            <div>
              <p className="text-sm text-foreground-secondary font-medium">Votes Remaining</p>
              <p className="text-lg font-bold text-foreground mt-1">1</p>
            </div>
          </CardContent>
        </Card>

        {/* Voting Interface */}
        <JudgeVotingInterface
          judgeWeight={2}
          roundName="Spring Collection 2024"
          hasVoted={false}
        />
      </div>
    </main>
  );
}
