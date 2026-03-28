'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface Round {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'pending';
  startTime: string;
  endTime: string;
  totalVotes: number;
  models: number;
}

const MOCK_ROUNDS: Round[] = [
  {
    id: '1',
    name: 'Spring Collection 2024',
    status: 'active',
    startTime: 'Mar 20, 2024',
    endTime: 'Mar 27, 2024',
    totalVotes: 12450,
    models: 8,
  },
  {
    id: '2',
    name: 'Winter Finale 2024',
    status: 'completed',
    startTime: 'Dec 15, 2023',
    endTime: 'Dec 22, 2023',
    totalVotes: 8920,
    models: 6,
  },
  {
    id: '3',
    name: 'Summer Preview 2024',
    status: 'pending',
    startTime: 'Jun 1, 2024',
    endTime: 'Jun 8, 2024',
    totalVotes: 0,
    models: 10,
  },
];

export default function RoundsPage() {
  const [rounds, setRounds] = useState<Round[]>(MOCK_ROUNDS);
  const [showNewRoundForm, setShowNewRoundForm] = useState(false);

  const activeRound = rounds.find(r => r.status === 'active');
  const completedRounds = rounds.filter(r => r.status === 'completed');
  const pendingRounds = rounds.filter(r => r.status === 'pending');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Rounds Management</h1>
          <p className="text-foreground/60 mt-1">Create and manage voting rounds</p>
        </div>
        <Button
          variant="primary"
          size="lg"
          onClick={() => setShowNewRoundForm(!showNewRoundForm)}
        >
          New Round
        </Button>
      </div>

      {/* New Round Form */}
      {showNewRoundForm && (
        <div className="bg-white dark:bg-muted rounded-xl border border-border p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Create New Round</h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Round Name
              </label>
              <input
                type="text"
                placeholder="e.g., Spring Collection 2024"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Select Models
              </label>
              <input
                type="number"
                placeholder="Number of models"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Start Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                End Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <Button variant="primary" size="lg">
              Create Round
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowNewRoundForm(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Active Round */}
      {activeRound && (
        <div className="bg-gradient-to-r from-primary/10 to-primary-light/20 rounded-xl border-2 border-primary p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-success text-white text-xs font-bold">
                  ACTIVE
                </span>
                <h2 className="text-2xl font-bold text-foreground">{activeRound.name}</h2>
              </div>
              <p className="text-foreground/70 mt-2">{activeRound.startTime} - {activeRound.endTime}</p>
              <div className="flex gap-6 mt-4">
                <div>
                  <p className="text-xs text-foreground/60 font-medium">MODELS</p>
                  <p className="text-2xl font-bold text-primary">{activeRound.models}</p>
                </div>
                <div>
                  <p className="text-xs text-foreground/60 font-medium">TOTAL VOTES</p>
                  <p className="text-2xl font-bold text-primary">{activeRound.totalVotes.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="primary" size="lg">
                End Round
              </Button>
              <Button variant="outline" size="lg">
                Settings
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Pending Rounds */}
      {pendingRounds.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-foreground">Upcoming Rounds</h3>
          {pendingRounds.map(round => (
            <RoundCard key={round.id} round={round} />
          ))}
        </div>
      )}

      {/* Completed Rounds */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-foreground">Completed Rounds</h3>
        {completedRounds.length > 0 ? (
          completedRounds.map(round => (
            <RoundCard key={round.id} round={round} />
          ))
        ) : (
          <div className="bg-white dark:bg-muted rounded-xl border border-border p-6 text-center">
            <p className="text-foreground/60">No completed rounds yet</p>
          </div>
        )}
      </div>

      {/* Round Stats */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-3">
        <StatBox
          label="Total Rounds"
          value={rounds.length}
          icon="🔄"
        />
        <StatBox
          label="Active Rounds"
          value={rounds.filter(r => r.status === 'active').length}
          icon="🟢"
        />
        <StatBox
          label="Total Votes"
          value={rounds.reduce((sum, r) => sum + r.totalVotes, 0).toLocaleString()}
          icon="🗳️"
        />
      </div>
    </div>
  );
}

function RoundCard({ round }: { round: Round }) {
  return (
    <div className="bg-white dark:bg-muted rounded-xl border border-border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`px-2 py-1 rounded-full text-xs font-bold text-white ${
                round.status === 'completed' ? 'bg-foreground/60' : 'bg-warning'
              }`}
            >
              {round.status.toUpperCase()}
            </span>
            <h3 className="text-lg font-bold text-foreground">{round.name}</h3>
          </div>
          <p className="text-sm text-foreground/60 mb-4">
            {round.startTime} - {round.endTime}
          </p>
          <div className="flex gap-4 text-sm">
            <div>
              <p className="text-foreground/60">Models: <span className="font-bold text-foreground">{round.models}</span></p>
            </div>
            <div>
              <p className="text-foreground/60">Votes: <span className="font-bold text-primary">{round.totalVotes.toLocaleString()}</span></p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-2 rounded-lg border border-border hover:bg-accent transition-colors text-sm font-medium text-foreground">
            View
          </button>
          {round.status !== 'completed' && (
            <button className="px-3 py-2 rounded-lg border border-error text-error hover:bg-error/10 transition-colors text-sm font-medium">
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function StatBox({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: string;
}) {
  return (
    <div className="bg-white dark:bg-muted rounded-xl border border-border p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-foreground/60 font-medium">{label}</p>
          <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
}
