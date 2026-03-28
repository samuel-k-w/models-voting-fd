'use client';

import { useLeaderboardStore } from '@/store/leaderboardStore';
import { useVotingStore } from '@/store/votingStore';
import { useEffect } from 'react';
import { MOCK_MODELS } from '@/utils/mockData';

export default function AnalyticsPage() {
  const { entries, setEntries } = useLeaderboardStore();
  const { models } = useVotingStore();

  useEffect(() => {
    if (models.length === 0 && entries.length === 0) {
      const leaderboardEntries = MOCK_MODELS.map((model, idx) => ({
        ...model,
        rank: idx + 1,
        isTopThree: idx < 3,
      }));
      setEntries(leaderboardEntries as any);
    }
  }, []);

  const displayEntries = entries.length > 0 ? entries : MOCK_MODELS.map((m, idx) => ({ ...m, rank: idx + 1, isTopThree: idx < 3 }));
  const totalVotes = displayEntries.reduce((sum, entry) => sum + (entry.votes || entry.voteCount || 0), 0);
  const highestVotes = displayEntries[0]?.votes || displayEntries[0]?.voteCount || 0;
  const lowestVotes = displayEntries[displayEntries.length - 1]?.votes || displayEntries[displayEntries.length - 1]?.voteCount || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-foreground/60 mt-1">View voting statistics and trends</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Votes"
          value={totalVotes}
          change="+12%"
          positive
        />
        <MetricCard
          title="Active Models"
          value={displayEntries.length}
          change="+3%"
          positive
        />
        <MetricCard
          title="Avg Votes/Model"
          value={Math.round(totalVotes / displayEntries.length)}
          change="-2%"
          positive={false}
        />
        <MetricCard
          title="Engagement Rate"
          value="87%"
          change="+5%"
          positive
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Vote Distribution */}
        <div className="bg-white dark:bg-muted rounded-xl border border-border p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Top Models by Votes</h2>
          <div className="space-y-3">
            {displayEntries.slice(0, 5).map((entry, idx) => {
              const percentage = totalVotes > 0 ? Math.round(((entry.votes || entry.voteCount || 0) / totalVotes) * 100) : 0;
              return (
                <div key={entry.id}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-foreground">
                      {idx + 1}. {entry.name}
                    </p>
                    <p className="text-sm font-bold text-primary">{percentage}%</p>
                  </div>
                  <div className="w-full h-2 bg-accent rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-warning rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white dark:bg-muted rounded-xl border border-border p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Statistics</h2>
          <div className="space-y-4">
            <StatRow
              label="Highest Votes"
              value={`${highestVotes} (${displayEntries[0]?.name})`}
            />
            <StatRow
              label="Lowest Votes"
              value={`${lowestVotes} (${displayEntries[displayEntries.length - 1]?.name})`}
            />
            <StatRow
              label="Median Votes"
              value={Math.round(totalVotes / 2)}
            />
            <StatRow
              label="Vote Spread"
              value={`${highestVotes - lowestVotes} votes`}
            />
          </div>
        </div>
      </div>

      {/* Hourly Activity */}
      <div className="bg-white dark:bg-muted rounded-xl border border-border p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">Hourly Activity</h2>
        <div className="flex items-end justify-between h-40 gap-2">
          {[35, 42, 28, 55, 48, 61, 52, 67, 45, 58, 73, 68].map((value, idx) => (
            <div
              key={idx}
              className="flex-1 bg-gradient-to-t from-primary to-primary-light rounded-t-lg transition-all duration-500 hover:opacity-80 relative group"
              style={{ height: `${(value / 73) * 100}%` }}
            >
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-foreground text-background px-2 py-1 rounded text-xs font-bold whitespace-nowrap">
                {value}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-foreground/60">
          <span>00:00</span>
          <span>12:00</span>
          <span>23:00</span>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="bg-white dark:bg-muted rounded-xl border border-border p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">Model Performance</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border">
              <tr>
                <th className="text-left py-2 font-semibold text-foreground">Model</th>
                <th className="text-right py-2 font-semibold text-foreground">Votes</th>
                <th className="text-right py-2 font-semibold text-foreground">%</th>
                <th className="text-right py-2 font-semibold text-foreground">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {displayEntries.map(entry => {
                const votes = entry.votes || entry.voteCount || 0;
                const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
                return (
                  <tr key={entry.id} className="hover:bg-accent/50 transition-colors">
                    <td className="py-3 text-foreground">{entry.name}</td>
                    <td className="py-3 text-right font-semibold text-primary">{votes}</td>
                    <td className="py-3 text-right text-foreground">{percentage}%</td>
                    <td className="py-3 text-right">
                      <span className="text-success">↑ 12%</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  change,
  positive,
}: {
  title: string;
  value: string | number;
  change: string;
  positive: boolean;
}) {
  return (
    <div className="bg-white dark:bg-muted rounded-xl border border-border p-6">
      <p className="text-sm text-foreground/60">{title}</p>
      <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
      <p className={`text-sm font-medium mt-1 ${positive ? 'text-success' : 'text-error'}`}>
        {change}
      </p>
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border/50 last:border-b-0">
      <span className="text-foreground/70">{label}</span>
      <span className="font-semibold text-primary">{value}</span>
    </div>
  );
}
