'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { useVotingStore } from '@/store/votingStore';
import { MOCK_MODELS } from '@/utils/mockData';

export default function ModelsPage() {
  const { models, setModels } = useVotingStore();
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (models.length === 0) {
      setModels(MOCK_MODELS);
    }
  }, []);

  const displayModels = models.length > 0 ? models : MOCK_MODELS;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Models Management</h1>
          <p className="text-foreground/60 mt-1">Add, edit, and manage models</p>
        </div>
        <Button variant="primary" size="lg">
          Add Model
        </Button>
      </div>

      {/* Models Table */}
      <div className="bg-white dark:bg-muted rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border bg-accent">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Model #</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Votes</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Featured</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {displayModels.map(model => (
                <tr
                  key={model.id}
                  className="hover:bg-accent/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {model.image && (
                        <img
                          src={model.image}
                          alt={model.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                      )}
                      <div>
                        <p className="font-medium text-foreground">{model.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-foreground">{model.modelNumber}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-primary">{model.votes || model.voteCount || 0}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-light text-primary">
                      {model.category || 'General'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`w-5 h-5 rounded-full ${model.featured ? 'bg-success' : 'bg-border'}`}></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1 text-xs font-medium text-primary hover:bg-primary-light rounded transition-colors">
                        Edit
                      </button>
                      <button className="px-3 py-1 text-xs font-medium text-error hover:bg-error/10 rounded transition-colors">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-3">
        <StatBox label="Total Models" value={displayModels.length} />
        <StatBox
          label="Total Votes"
          value={displayModels.reduce((sum, m) => sum + (m.votes || m.voteCount || 0), 0)}
        />
        <StatBox
          label="Featured"
          value={displayModels.filter(m => m.featured).length}
        />
      </div>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white dark:bg-muted rounded-xl border border-border p-6 text-center">
      <p className="text-sm text-foreground/60">{label}</p>
      <p className="text-4xl font-bold text-primary mt-2">{value}</p>
    </div>
  );
}
