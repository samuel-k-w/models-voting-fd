import type { Metadata } from 'next';
import { ClientVotingPage } from '@/components/voting/ClientVotingPage';

export const metadata: Metadata = {
  title: 'Vote Now | Real-Time Voting Platform',
  description:
    'Cast your vote for your favorite model in our real-time voting platform',
  openGraph: {
    title: 'Vote Now | Real-Time Voting Platform',
    description:
      'Cast your vote for your favorite model in our real-time voting platform',
  },
};

export default function VotingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-accent to-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <ClientVotingPage />
      </div>
    </main>
  );
}
