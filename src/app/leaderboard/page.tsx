import type { Metadata } from 'next';
import { LeaderboardContainer } from '@/components/leaderboard/LeaderboardContainer';

export const metadata: Metadata = {
  title: 'Leaderboard | Real-Time Voting Platform',
  description: 'View the real-time leaderboard of model votes',
  openGraph: {
    title: 'Leaderboard | Real-Time Voting Platform',
    description: 'View the real-time leaderboard of model votes',
  },
};

export default function LeaderboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-accent to-background">
      <LeaderboardContainer showHeader initialMode="normal" />
    </main>
  );
}
