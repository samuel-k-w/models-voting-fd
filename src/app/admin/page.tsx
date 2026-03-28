'use client';

import { useLeaderboardStore } from '@/store/leaderboardStore';
import { useVotingStore } from '@/store/votingStore';
import { useEffect } from 'react';
import { MOCK_MODELS } from '@/utils/mockData';

export default function AdminDashboard() {
  const { entries, setEntries } = useLeaderboardStore();
  const { models } = useVotingStore();

  useEffect(() => {
    if (models.length === 0) {
      const leaderboardEntries = MOCK_MODELS.map((model, idx) => ({
        ...model,
        rank: idx + 1,
        isTopThree: idx < 3,
      }));
      setEntries(leaderboardEntries as any);
    }
  }, []);

  const totalVotes = entries.reduce((sum, entry) => sum + (entry.votes || entry.voteCount || 0), 0);
  const topModel = entries[0];
  const averageVotes = entries.length > 0 ? Math.round(totalVotes / entries.length) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-foreground/60 mt-1">Welcome to the voting platform admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Models"
          value={entries.length}
          subtitle="Active models"
          icon="👤"
        />
        <StatCard
          title="Total Votes"
          value={totalVotes.toLocaleString()}
          subtitle="All time"
          icon="🗳️"
        />
        <StatCard
          title="Average Votes"
          value={averageVotes}
          subtitle="Per model"
          icon="📊"
        />
        <StatCard
          title="Top Model"
          value={topModel?.name || 'N/A'}
          subtitle={`${topModel?.votes || 0} votes`}
          icon="🏆"
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Top Models */}
        <div className="bg-white dark:bg-muted rounded-xl border border-border p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Top 5 Models</h2>
          <div className="space-y-3">
            {entries.slice(0, 5).map(entry => (
              <div key={entry.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">{entry.name}</p>
                  <p className="text-sm text-foreground/60">{entry.modelNumber}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">{entry.votes || entry.voteCount || 0}</p>
                  <p className="text-xs text-foreground/60">votes</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity */}
        <div className="bg-white dark:bg-muted rounded-xl border border-border p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Activity</h2>
          <div className="space-y-3">
            <ActivityItem
              label="Voting Status"
              status="Active"
              statusColor="success"
            />
            <ActivityItem
              label="WebSocket Connection"
              status="Connected"
              statusColor="success"
            />
            <ActivityItem
              label="Last Update"
              status="Just now"
              statusColor="foreground"
            />
            <ActivityItem
              label="Users Online"
              status="12 active"
              statusColor="primary"
            />
          </div>
        </div>
      </div>

      {/* Recent Votes */}
      <div className="bg-white dark:bg-muted rounded-xl border border-border p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Recent Votes</h2>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-b-0">
              <div>
                <p className="text-sm font-medium text-foreground">
                  User #{Math.random().toString(36).substr(2, 9)}
                </p>
                <p className="text-xs text-foreground/60">voted for {entries[i % entries.length]?.name || 'Model'}</p>
              </div>
              <span className="text-xs text-foreground/60">2 mins ago</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string;
  value: string | number;
  subtitle: string;
  icon: string;
}) {
  return (
    <div className="bg-white dark:bg-muted rounded-xl border border-border p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-foreground/60">{title}</p>
          <p className="text-2xl font-bold text-foreground mt-2">{value}</p>
          <p className="text-xs text-foreground/60 mt-1">{subtitle}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
}

function ActivityItem({
  label,
  status,
  statusColor,
}: {
  label: string;
  status: string;
  statusColor: 'success' | 'primary' | 'foreground';
}) {
  const colorMap = {
    success: 'text-success',
    primary: 'text-primary',
    foreground: 'text-foreground/60',
  };

  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-foreground">{label}</span>
      <span className={`text-sm font-medium ${colorMap[statusColor]}`}>{status}</span>
    </div>
  );
}
