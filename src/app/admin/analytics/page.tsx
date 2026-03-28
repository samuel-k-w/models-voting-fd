'use client';

import { useLeaderboardStore } from '@/store/leaderboardStore';
import { useVotingStore } from '@/store/votingStore';
import { useEffect } from 'react';
import { MOCK_MODELS } from '@/utils/mockData';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Color palette for pie chart
const pieColors = [
  'var(--color-primary)',
  '#d9a574',
  '#6b9c71',
  '#a78bc9',
  '#f4c4b8',
];

// Hourly activity data
const hourlyData = [
  { hour: '00:00', votes: 35 },
  { hour: '01:00', votes: 42 },
  { hour: '02:00', votes: 28 },
  { hour: '03:00', votes: 55 },
  { hour: '04:00', votes: 48 },
  { hour: '05:00', votes: 61 },
  { hour: '06:00', votes: 52 },
  { hour: '07:00', votes: 67 },
  { hour: '08:00', votes: 45 },
  { hour: '09:00', votes: 58 },
  { hour: '10:00', votes: 73 },
  { hour: '11:00', votes: 68 },
];

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

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Hourly Activity Line Chart */}
        <div className="bg-white dark:bg-muted rounded-xl border border-border p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Hourly Activity Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="hour" stroke="var(--color-foreground)" />
              <YAxis stroke="var(--color-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-background)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: 'var(--color-foreground)' }}
              />
              <Line
                type="monotone"
                dataKey="votes"
                stroke="var(--color-primary)"
                strokeWidth={2}
                dot={{ fill: 'var(--color-primary)', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Models Bar Chart */}
        <div className="bg-white dark:bg-muted rounded-xl border border-border p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Top Models Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={displayEntries.slice(0, 5)}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" stroke="var(--color-foreground)" angle={-45} textAnchor="end" height={80} />
              <YAxis stroke="var(--color-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-background)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: 'var(--color-foreground)' }}
              />
              <Bar dataKey="votes" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Vote Distribution Pie Chart */}
      <div className="bg-white dark:bg-muted rounded-xl border border-border p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">Vote Distribution by Model</h2>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={displayEntries.map(e => ({
                name: e.name,
                value: e.votes || e.voteCount || 0,
              }))}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={120}
              fill="var(--color-primary)"
              dataKey="value"
            >
              {displayEntries.map((_, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-background)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
              }}
              labelStyle={{ color: 'var(--color-foreground)' }}
            />
          </PieChart>
        </ResponsiveContainer>
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
