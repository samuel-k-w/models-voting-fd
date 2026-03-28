import type { Metadata, Viewport } from 'next';
import { LeaderboardContainer } from '@/components/leaderboard/LeaderboardContainer';

export const metadata: Metadata = {
  title: 'Leaderboard - Big Screen Mode | Real-Time Voting Platform',
  description: 'Fullscreen leaderboard display for event screens',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function BigScreenLeaderboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent to-background flex flex-col">
      <LeaderboardContainer showHeader initialMode="big-screen" />
    </div>
  );
}
