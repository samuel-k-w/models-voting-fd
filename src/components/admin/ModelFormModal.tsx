'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Model } from '@/types';

interface ModelFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (model: Omit<Model, 'id'> & { id?: string }) => void;
  editingModel?: Model | null;
}

export function ModelFormModal({
  isOpen,
  onClose,
  onSubmit,
  editingModel,
}: ModelFormModalProps) {
  const [formData, setFormData] = useState({
    name: editingModel?.name || '',
    modelNumber: editingModel?.modelNumber || '',
    category: editingModel?.category || '',
    image: editingModel?.image || '',
    featured: editingModel?.featured || false,
    votes: editingModel?.votes || 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Model name is required';
    }
    if (!formData.modelNumber.trim()) {
      newErrors.modelNumber = 'Model number is required';
    }
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      onSubmit({
        id: editingModel?.id,
        ...formData,
      });

      setFormData({
        name: '',
        modelNumber: '',
        category: '',
        image: '',
        featured: false,
        votes: 0,
      });
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      title={editingModel ? 'Edit Model' : 'Add New Model'}
      description={editingModel ? 'Update model details' : 'Add a new model to the system'}
      onCancel={onClose}
      onConfirm={handleSubmit}
      isLoading={isLoading}
      confirmLabel={editingModel ? 'Update' : 'Create'}
      cancelLabel="Cancel"
    >
      <div className="space-y-5">
        {/* Image Preview */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Model Image</label>
          {formData.image && (
            <div className="rounded-lg overflow-hidden mb-3">
              <img
                src={formData.image}
                alt="Preview"
                className="w-full h-48 object-cover"
              />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full px-4 py-2 border-2 border-border rounded-lg text-sm text-foreground file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-hover cursor-pointer"
          />
        </div>

        {/* Name */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Model Name *</label>
          <input
            type="text"
            placeholder="e.g. Alexandra Stone"
            value={formData.name}
            onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-4 py-2 border-2 border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary"
          />
          {errors.name && <p className="text-xs text-error">{errors.name}</p>}
        </div>

        {/* Model Number */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Model Number *</label>
          <input
            type="text"
            placeholder="e.g. M-001"
            value={formData.modelNumber}
            onChange={e => setFormData(prev => ({ ...prev, modelNumber: e.target.value }))}
            className="w-full px-4 py-2 border-2 border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary"
          />
          {errors.modelNumber && <p className="text-xs text-error">{errors.modelNumber}</p>}
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Category *</label>
          <select
            value={formData.category}
            onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
            className="w-full px-4 py-2 border-2 border-border rounded-lg text-foreground focus:outline-none focus:border-primary bg-background"
          >
            <option value="">Select a category</option>
            <option value="Runway">Runway</option>
            <option value="Editorial">Editorial</option>
            <option value="Commercial">Commercial</option>
            <option value="Plus Size">Plus Size</option>
            <option value="Youth">Youth</option>
          </select>
          {errors.category && <p className="text-xs text-error">{errors.category}</p>}
        </div>

        {/* Featured */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="featured"
            checked={formData.featured}
            onChange={e => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
            className="w-5 h-5 rounded border-2 border-border cursor-pointer"
          />
          <label htmlFor="featured" className="text-sm font-medium text-foreground cursor-pointer">
            Mark as featured model
          </label>
        </div>
      </div>
    </Modal>
  );
}
