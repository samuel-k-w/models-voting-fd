'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ActionConfirmationModal } from '@/components/admin/ActionConfirmationModal';
import { useCountdown } from '@/hooks/useCountdown';

type VotingStatus = 'active' | 'paused' | 'ended';

export default function VotingControlPage() {
  const [votingStatus, setVotingStatus] = useState<VotingStatus>('active');
  const [otpRequired, setOtpRequired] = useState(true);
  const [voteLimit, setVoteLimit] = useState(1);
  const [confirmAction, setConfirmAction] = useState<{
    type: 'pause' | 'resume' | 'end' | 'reset' | null;
    isOpen: boolean;
  }>({ type: null, isOpen: false });
  const [successMessage, setSuccessMessage] = useState('');

  const timer = useCountdown(3600); // 1 hour countdown

  const handleActionConfirm = () => {
    switch (confirmAction.type) {
      case 'pause':
        setVotingStatus('paused');
        timer.pause();
        setSuccessMessage('Voting paused successfully');
        break;
      case 'resume':
        setVotingStatus('active');
        timer.start();
        setSuccessMessage('Voting resumed successfully');
        break;
      case 'end':
        setVotingStatus('ended');
        timer.pause();
        setSuccessMessage('Voting ended successfully');
        break;
      case 'reset':
        setVotingStatus('active');
        timer.reset();
        timer.start();
        setSuccessMessage('Voting reset and restarted successfully');
        break;
    }
    setConfirmAction({ type: null, isOpen: false });
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const openConfirmation = (type: typeof confirmAction.type) => {
    setConfirmAction({ type, isOpen: true });
  };

  const closeConfirmation = () => {
    setConfirmAction({ type: null, isOpen: false });
  };

  const getStatusColor = () => {
    switch (votingStatus) {
      case 'active':
        return 'border-success bg-success/10 text-success';
      case 'paused':
        return 'border-warning bg-warning/10 text-warning';
      case 'ended':
        return 'border-error bg-error/10 text-error';
      default:
        return 'border-border bg-accent';
    }
  };

  const getStatusLabel = () => {
    return votingStatus.charAt(0).toUpperCase() + votingStatus.slice(1);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Success Message */}
      {successMessage && (
        <div className="rounded-lg bg-success/10 border border-success px-4 py-3 text-sm font-medium text-success">
          {successMessage}
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Voting Control</h1>
        <p className="text-foreground/60 mt-1">Manage voting session and system configuration</p>
      </div>

      {/* Status & Timer Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Current Status */}
        <SettingCard
          title="Voting Status"
          description="Current voting session status"
        >
          <div className={`rounded-lg border-2 px-6 py-4 ${getStatusColor()}`}>
            <p className="text-sm font-medium mb-1">Status</p>
            <p className="text-2xl font-bold">{getStatusLabel()}</p>
          </div>
        </SettingCard>

        {/* Timer */}
        <SettingCard
          title="Session Timer"
          description="Time remaining for current session"
        >
          <div className="rounded-lg border-2 border-primary bg-primary-light/20 px-6 py-4">
            <p className="text-sm font-medium text-foreground mb-2">Time Remaining</p>
            <p className="text-4xl font-bold text-primary font-mono">{timer.formatted}</p>
          </div>
        </SettingCard>
      </div>

      {/* Action Buttons */}
      <div className="rounded-xl border border-border bg-white dark:bg-muted p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {votingStatus === 'active' && (
            <>
              <Button
                variant="outline"
                size="lg"
                onClick={() => openConfirmation('pause')}
                className="text-warning border-warning"
              >
                Pause Voting
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => openConfirmation('end')}
                className="text-error border-error"
              >
                End Voting
              </Button>
            </>
          )}
          {votingStatus === 'paused' && (
            <>
              <Button
                variant="primary"
                size="lg"
                onClick={() => openConfirmation('resume')}
              >
                Resume Voting
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => openConfirmation('end')}
                className="text-error border-error"
              >
                End Voting
              </Button>
            </>
          )}
          {votingStatus === 'ended' && (
            <Button
              variant="primary"
              size="lg"
              onClick={() => openConfirmation('reset')}
              className="sm:col-span-2 lg:col-span-4"
            >
              Reset & Start New Session
            </Button>
          )}
        </div>
      </div>

      {/* Settings */}
      <div className="space-y-6">
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

      {/* Confirmation Modal */}
      <ActionConfirmationModal
        isOpen={confirmAction.isOpen}
        title={
          confirmAction.type === 'pause'
            ? 'Pause Voting?'
            : confirmAction.type === 'resume'
              ? 'Resume Voting?'
              : confirmAction.type === 'end'
                ? 'End Voting Session?'
                : 'Reset Voting Session?'
        }
        description={
          confirmAction.type === 'pause'
            ? 'Users will not be able to cast votes while voting is paused.'
            : confirmAction.type === 'resume'
              ? 'Voting will resume and users can cast votes again.'
              : confirmAction.type === 'end'
                ? 'This will end the current voting session. Users will not be able to vote.'
                : 'This will reset all votes and start a new voting session.'
        }
        actionLabel={
          confirmAction.type === 'pause'
            ? 'Pause Voting'
            : confirmAction.type === 'resume'
              ? 'Resume Voting'
              : confirmAction.type === 'end'
                ? 'End Session'
                : 'Reset & Start New'
        }
        onConfirm={handleActionConfirm}
        onCancel={closeConfirmation}
        variant={confirmAction.type === 'reset' ? 'warning' : confirmAction.type === 'end' ? 'danger' : 'warning'}
      />
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
