'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { RoundFormModal } from '@/components/admin/RoundFormModal';
import { MOCK_MODELS } from '@/utils/mockData';

interface Round {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'pending';
  startTime: string;
  endTime: string;
  totalVotes: number;
  models: string[];
}

const MOCK_ROUNDS: Round[] = [
  {
    id: '1',
    name: 'Spring Collection 2024',
    status: 'active',
    startTime: 'Mar 20, 2024',
    endTime: 'Mar 27, 2024',
    totalVotes: 12450,
    models: ['1', '2', '3', '4', '5', '6', '7', '8'],
  },
  {
    id: '2',
    name: 'Winter Finale 2024',
    status: 'completed',
    startTime: 'Dec 15, 2023',
    endTime: 'Dec 22, 2023',
    totalVotes: 8920,
    models: ['1', '2', '3', '4', '5', '6'],
  },
  {
    id: '3',
    name: 'Summer Preview 2024',
    status: 'pending',
    startTime: 'Jun 1, 2024',
    endTime: 'Jun 8, 2024',
    totalVotes: 0,
    models: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  },
];

export default function RoundsPage() {
  const [rounds, setRounds] = useState<Round[]>(MOCK_ROUNDS);
  const [editingRound, setEditingRound] = useState<Round | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const activeRound = rounds.find(r => r.status === 'active');
  const completedRounds = rounds.filter(r => r.status === 'completed');
  const pendingRounds = rounds.filter(r => r.status === 'pending');

  const handleAddRound = (roundData: Omit<Round, 'id'> & { id?: string }) => {
    const newRound: Round = {
      id: roundData.id || `round-${Date.now()}`,
      name: roundData.name,
      status: roundData.status,
      startTime: roundData.startTime,
      endTime: roundData.endTime,
      models: roundData.models,
      totalVotes: 0,
    };

    if (editingRound) {
      setRounds(rounds.map(r => (r.id === editingRound.id ? newRound : r)));
      setSuccessMessage(`Round "${newRound.name}" updated successfully`);
    } else {
      setRounds([...rounds, newRound]);
      setSuccessMessage(`Round "${newRound.name}" created successfully`);
    }

    setEditingRound(null);
    setIsFormOpen(false);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleSetActive = (roundId: string) => {
    setRounds(rounds.map(r => ({
      ...r,
      status: r.id === roundId ? 'active' : r.status === 'active' ? 'completed' : r.status,
    })));
    const round = rounds.find(r => r.id === roundId);
    if (round) {
      setSuccessMessage(`${round.name} is now active`);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleDeleteRound = (roundId: string) => {
    if (confirm('Are you sure you want to delete this round?')) {
      const deletedRound = rounds.find(r => r.id === roundId);
      setRounds(rounds.filter(r => r.id !== roundId));
      if (deletedRound) {
        setSuccessMessage(`Round "${deletedRound.name}" deleted successfully`);
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    }
  };

  const handleEditRound = (round: Round) => {
    setEditingRound(round);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setEditingRound(null);
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {successMessage && (
        <div className="rounded-lg bg-success/10 border border-success px-4 py-3 text-sm font-medium text-success">
          {successMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Rounds Management</h1>
          <p className="text-foreground/60 mt-1">Create and manage voting rounds</p>
        </div>
        <Button
          variant="primary"
          size="lg"
          onClick={() => {
            setEditingRound(null);
            setIsFormOpen(true);
          }}
        >
          New Round
        </Button>
      </div>

      {/* Active Round */}
      {activeRound && (
        <div className="bg-gradient-to-r from-primary/10 to-primary-light/20 rounded-xl border-2 border-primary p-6">
          <div className="flex items-start justify-between flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-success text-white text-xs font-bold">
                  ACTIVE
                </span>
                <h2 className="text-2xl font-bold text-foreground">{activeRound.name}</h2>
              </div>
              <p className="text-foreground/70 mt-2">{activeRound.startTime} - {activeRound.endTime}</p>
              <div className="flex gap-6 mt-4">
                <div>
                  <p className="text-xs text-foreground/60 font-medium">MODELS</p>
                  <p className="text-2xl font-bold text-primary">{activeRound.models.length}</p>
                </div>
                <div>
                  <p className="text-xs text-foreground/60 font-medium">TOTAL VOTES</p>
                  <p className="text-2xl font-bold text-primary">{activeRound.totalVotes.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleEditRound(activeRound)}
              >
                Edit
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleDeleteRound(activeRound.id)}
                className="text-error border-error"
              >
                End Round
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
        />
        <StatBox
          label="Active Rounds"
          value={rounds.filter(r => r.status === 'active').length}
        />
        <StatBox
          label="Total Votes"
          value={rounds.reduce((sum, r) => sum + r.totalVotes, 0).toLocaleString()}
        />
      </div>

      {/* Modal */}
      <RoundFormModal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleAddRound}
        editingRound={editingRound}
        availableModels={MOCK_MODELS}
      />
    </div>
  );
}

function RoundCard({ round }: { round: Round }) {
  const handleSetActive = (roundId: string) => {
    const updatedRounds = rounds.map(r => ({
      ...r,
      status: r.id === roundId ? 'active' : r.status === 'active' ? 'completed' : r.status,
    }));
    // This would need to be passed as prop in real implementation
  };

  return (
    <div className="bg-white dark:bg-muted rounded-xl border border-border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between flex-col sm:flex-row gap-4">
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
          <div className="flex gap-4 text-sm flex-wrap">
            <div>
              <p className="text-foreground/60">Models: <span className="font-bold text-foreground">{round.models.length}</span></p>
            </div>
            <div>
              <p className="text-foreground/60">Votes: <span className="font-bold text-primary">{round.totalVotes.toLocaleString()}</span></p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {round.status === 'pending' && (
            <button className="px-3 py-2 rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors text-sm font-medium">
              Set Active
            </button>
          )}
          <button className="px-3 py-2 rounded-lg border border-border hover:bg-accent transition-colors text-sm font-medium text-foreground">
            Edit
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
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-white dark:bg-muted rounded-xl border border-border p-6">
      <p className="text-sm text-foreground/60 font-medium">{label}</p>
      <p className="text-3xl font-bold text-primary mt-2">{value}</p>
    </div>
  );
}
