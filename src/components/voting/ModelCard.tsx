'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import type { Model } from '@/types';
import { cn } from '@/utils/cn';

interface ModelCardProps {
  model: Model;
  isSelected: boolean;
  isLoading: boolean;
  isDisabled: boolean;
  onVote: (modelId: string) => void;
}

export function ModelCard({
  model,
  isSelected,
  isLoading,
  isDisabled,
  onVote,
}: ModelCardProps) {
  const voteCount = model.votes || model.voteCount || 0;

  return (
    <div
      className={cn(
        'group flex flex-col overflow-hidden rounded-2xl border-2 transition-all duration-300 bg-white dark:bg-muted shadow-sm hover:shadow-xl',
        {
          'border-primary bg-primary-light/10 dark:bg-primary-light/5 ring-2 ring-primary/20':
            isSelected && !isDisabled,
          'border-border dark:border-border hover:border-primary/50': !isSelected && !isDisabled,
          'border-border/50 opacity-50 dark:border-border/30': isDisabled,
        }
      )}
    >
      {/* Image Container */}
      <div className="relative h-56 w-full overflow-hidden bg-muted sm:h-64">
        <img
          src={model.image || 'https://images.unsplash.com/photo-1469460340855-fff4a5d92341?w=500&h=600&fit=crop'}
          alt={model.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {model.featured && (
          <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
            Featured
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div>
          <h3 className="truncate text-xl font-bold text-foreground">
            {model.name}
          </h3>
          <p className="mt-1 text-sm text-foreground/60">
            {model.modelNumber}
          </p>
          {model.category && (
            <p className="mt-2 text-xs font-medium text-primary">
              {model.category}
            </p>
          )}
        </div>

        {/* Vote Count */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-foreground/60 uppercase tracking-wide font-medium">Votes</span>
            <span className="text-3xl font-bold text-primary">
              {voteCount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Vote Button */}
        <Button
          onClick={() => onVote(model.id)}
          disabled={isDisabled || isLoading}
          isLoading={isLoading && isSelected}
          variant={isSelected && !isDisabled ? 'primary' : 'outline'}
          size="lg"
          className="mt-6 w-full"
        >
          {isDisabled
            ? 'Verify to Vote'
            : isLoading && isSelected
              ? 'Submitting...'
              : 'Cast Vote'}
        </Button>
      </div>
    </div>
  );
}
