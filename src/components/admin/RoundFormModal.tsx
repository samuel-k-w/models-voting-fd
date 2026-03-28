'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Model } from '@/types';

interface Round {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  models: string[];
  status: 'active' | 'completed' | 'pending';
}

interface RoundFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (round: Omit<Round, 'id'> & { id?: string }) => void;
  editingRound?: Round | null;
  availableModels: Model[];
}

export function RoundFormModal({
  isOpen,
  onClose,
  onSubmit,
  editingRound,
  availableModels,
}: RoundFormModalProps) {
  const [formData, setFormData] = useState({
    name: editingRound?.name || '',
    startTime: editingRound?.startTime || '',
    endTime: editingRound?.endTime || '',
    models: editingRound?.models || [],
    status: editingRound?.status || 'pending' as const,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Round name is required';
    }
    if (!formData.startTime) {
      newErrors.startTime = 'Start date is required';
    }
    if (!formData.endTime) {
      newErrors.endTime = 'End date is required';
    }
    if (formData.models.length === 0) {
      newErrors.models = 'Select at least one model';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      onSubmit({
        id: editingRound?.id,
        ...formData,
      });

      setFormData({
        name: '',
        startTime: '',
        endTime: '',
        models: [],
        status: 'pending',
      });
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const toggleModel = (modelId: string) => {
    setFormData(prev => ({
      ...prev,
      models: prev.models.includes(modelId)
        ? prev.models.filter(id => id !== modelId)
        : [...prev.models, modelId],
    }));
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      title={editingRound ? 'Edit Round' : 'Create New Round'}
      description={editingRound ? 'Update round details' : 'Create a new voting round'}
      onCancel={onClose}
      onConfirm={handleSubmit}
      isLoading={isLoading}
      confirmLabel={editingRound ? 'Update' : 'Create'}
      cancelLabel="Cancel"
    >
      <div className="space-y-5 max-h-96 overflow-y-auto">
        {/* Round Name */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Round Name *</label>
          <input
            type="text"
            placeholder="e.g. Spring Collection 2024"
            value={formData.name}
            onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-4 py-2 border-2 border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary"
          />
          {errors.name && <p className="text-xs text-error">{errors.name}</p>}
        </div>

        {/* Start Date */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Start Date *</label>
          <input
            type="date"
            value={formData.startTime}
            onChange={e => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
            className="w-full px-4 py-2 border-2 border-border rounded-lg text-foreground focus:outline-none focus:border-primary bg-background"
          />
          {errors.startTime && <p className="text-xs text-error">{errors.startTime}</p>}
        </div>

        {/* End Date */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">End Date *</label>
          <input
            type="date"
            value={formData.endTime}
            onChange={e => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
            className="w-full px-4 py-2 border-2 border-border rounded-lg text-foreground focus:outline-none focus:border-primary bg-background"
          />
          {errors.endTime && <p className="text-xs text-error">{errors.endTime}</p>}
        </div>

        {/* Status */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Status</label>
          <select
            value={formData.status}
            onChange={e => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
            className="w-full px-4 py-2 border-2 border-border rounded-lg text-foreground focus:outline-none focus:border-primary bg-background"
          >
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Model Selection */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-foreground">Select Models *</label>
          <div className="space-y-2 max-h-48 overflow-y-auto border border-border rounded-lg p-3">
            {availableModels.length === 0 ? (
              <p className="text-sm text-foreground/60">No models available</p>
            ) : (
              availableModels.map(model => (
                <label
                  key={model.id}
                  className="flex items-center gap-3 p-2 rounded hover:bg-accent/50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.models.includes(model.id)}
                    onChange={() => toggleModel(model.id)}
                    className="w-5 h-5 rounded border-2 border-border cursor-pointer"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{model.name}</p>
                    <p className="text-xs text-foreground/60">{model.modelNumber}</p>
                  </div>
                </label>
              ))
            )}
          </div>
          {errors.models && <p className="text-xs text-error">{errors.models}</p>}
          <p className="text-xs text-foreground/60">
            Selected: {formData.models.length} model(s)
          </p>
        </div>
      </div>
    </Modal>
  );
}
