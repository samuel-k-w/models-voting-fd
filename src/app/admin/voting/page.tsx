'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

export default function VotingControlPage() {
  const [votingEnabled, setVotingEnabled] = useState(true);
  const [otpRequired, setOtpRequired] = useState(true);
  const [voteLimit, setVoteLimit] = useState(1);

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Voting Control</h1>
        <p className="text-foreground/60 mt-1">Configure voting rules and restrictions</p>
      </div>

      {/* Settings */}
      <div className="space-y-6">
        {/* Enable/Disable Voting */}
        <SettingCard
          title="Voting Status"
          description="Enable or disable voting for all users"
        >
          <div className="flex items-center gap-4">
            <div className={`flex-1 px-4 py-3 rounded-lg border-2 ${votingEnabled ? 'border-success bg-success/10' : 'border-error bg-error/10'}`}>
              <p className="text-sm font-medium text-foreground">
                {votingEnabled ? '✓ Voting Enabled' : '✗ Voting Disabled'}
              </p>
            </div>
            <Button
              onClick={() => setVotingEnabled(!votingEnabled)}
              variant={votingEnabled ? 'primary' : 'outline'}
              size="lg"
            >
              {votingEnabled ? 'Disable' : 'Enable'}
            </Button>
          </div>
        </SettingCard>

        {/* OTP Requirement */}
        <SettingCard
          title="OTP Verification"
          description="Require OTP for vote verification"
        >
          <div className="flex items-center gap-4">
            <div className={`flex-1 px-4 py-3 rounded-lg border-2 ${otpRequired ? 'border-success bg-success/10' : 'border-error bg-error/10'}`}>
              <p className="text-sm font-medium text-foreground">
                {otpRequired ? '✓ OTP Required' : '✗ OTP Optional'}
              </p>
            </div>
            <Button
              onClick={() => setOtpRequired(!otpRequired)}
              variant={otpRequired ? 'primary' : 'outline'}
              size="lg"
            >
              {otpRequired ? 'Disable' : 'Enable'}
            </Button>
          </div>
        </SettingCard>

        {/* Vote Limit */}
        <SettingCard
          title="Votes Per User"
          description="Maximum votes allowed per user"
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setVoteLimit(Math.max(1, voteLimit - 1))}
                className="px-4 py-3 rounded-lg border-2 border-border hover:bg-accent transition-colors font-medium text-foreground"
              >
                −
              </button>
              <div className="w-20 px-4 py-3 rounded-lg border-2 border-primary bg-primary-light/20 text-center">
                <p className="font-bold text-primary text-xl">{voteLimit}</p>
              </div>
              <button
                onClick={() => setVoteLimit(voteLimit + 1)}
                className="px-4 py-3 rounded-lg border-2 border-border hover:bg-accent transition-colors font-medium text-foreground"
              >
                +
              </button>
            </div>
          </div>
        </SettingCard>

        {/* Reset Votes */}
        <SettingCard
          title="Reset Voting Data"
          description="Clear all votes and start fresh (irreversible)"
        >
          <Button variant="outline" size="lg" className="border-error text-error hover:bg-error/10">
            Reset All Votes
          </Button>
        </SettingCard>
      </div>

      {/* Status Section */}
      <div className="bg-white dark:bg-muted rounded-xl border border-border p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">System Status</h2>
        <div className="space-y-3">
          <StatusRow label="Voting Service" status="online" />
          <StatusRow label="OTP Service" status="online" />
          <StatusRow label="WebSocket Connection" status="online" />
          <StatusRow label="Database" status="online" />
          <StatusRow label="Cache" status="online" />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="primary" size="lg">
          Save Changes
        </Button>
        <Button variant="outline" size="lg">
          Cancel
        </Button>
      </div>
    </div>
  );
}

function SettingCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-muted rounded-xl border border-border p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-foreground/60 mt-1">{description}</p>
      </div>
      {children}
    </div>
  );
}

function StatusRow({ label, status }: { label: string; status: 'online' | 'offline' | 'error' }) {
  const statusMap = {
    online: { color: 'bg-success text-white', text: 'Online' },
    offline: { color: 'bg-warning text-foreground', text: 'Offline' },
    error: { color: 'bg-error text-white', text: 'Error' },
  };

  return (
    <div className="flex items-center justify-between py-2 border-b border-border/50 last:border-b-0">
      <span className="text-foreground">{label}</span>
      <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusMap[status].color}`}>
        {statusMap[status].text}
      </div>
    </div>
  );
}
