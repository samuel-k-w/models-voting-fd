'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { LazyImage } from '@/components/ui/LazyImage';
import type { Model } from '@/types';
import { cn } from '@/utils/cn';

interface ModelCardProps {
  model: Model;
  isSelected: boolean;
  isLoading: boolean;
  isDisabled: boolean;
  onVote: (modelId: string) => void;
}

const ModelCardComponent = ({
  model,
  isSelected,
  isLoading,
  isDisabled,
  onVote,
}: ModelCardProps) => {
  const voteCount = model.votes || model.voteCount || 0;

  return (
    <div
      className={cn(
        'group flex flex-col overflow-hidden rounded-2xl border-2 transition-all duration-300 bg-background shadow-sm hover:shadow-md',
        {
          'border-primary bg-primary-light ring-2 ring-primary/20':
            isSelected && !isDisabled,
          'border-border hover:border-primary/50': !isSelected && !isDisabled,
          'border-border/50 opacity-50': isDisabled,
        }
      )}
    >
      {/* Image Container */}
      <LazyImage
        src={model.image || 'https://images.unsplash.com/photo-1469460340855-fff4a5d92341?w=500&h=600&fit=crop'}
        alt={model.name}
        aspectRatio="video"
        containerClassName="relative h-56 w-full overflow-hidden bg-muted sm:h-64 transition-transform duration-300 group-hover:scale-105"
        className="transition-transform duration-300"
      />
      {model.featured && (
        <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
          Featured
        </div>
      )}

      {/* Content Container */}
      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div>
          <h3 className="truncate text-xl font-bold text-foreground">
            {model.name}
          </h3>
          <p className="mt-1 text-sm text-foreground-secondary">
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
            <span className="text-xs text-foreground-secondary uppercase tracking-wide font-medium">Votes</span>
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
          aria-label={`Vote for ${model.name}`}
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
};

// Export memoized component to prevent unnecessary re-renders
export const ModelCard = React.memo(ModelCardComponent, (prevProps, nextProps) => {
  return (
    prevProps.model.id === nextProps.model.id &&
    prevProps.isSelected === nextProps.isSelected &&
    prevProps.isLoading === nextProps.isLoading &&
    prevProps.isDisabled === nextProps.isDisabled &&
    prevProps.onVote === nextProps.onVote
  );
});
