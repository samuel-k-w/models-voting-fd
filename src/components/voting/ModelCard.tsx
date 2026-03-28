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
  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-xl border-2 transition-all duration-200',
        {
          'border-blue-500 bg-blue-50 dark:bg-blue-900/20':
            isSelected && !isDisabled,
          'border-gray-200 dark:border-gray-700': !isSelected && !isDisabled,
          'border-gray-300 opacity-60 dark:border-gray-600':
            isDisabled,
        }
      )}
    >
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-800 sm:h-56">
        <Image
          src={model.imageUrl}
          alt={model.name}
          fill
          className="object-cover"
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h3 className="truncate text-lg font-bold text-gray-900 dark:text-white">
            {model.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Model #{model.modelNumber}
          </p>
          {model.description && (
            <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
              {model.description}
            </p>
          )}
        </div>

        {/* Vote Count */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Votes: <span className="text-blue-600 dark:text-blue-400">{model.voteCount}</span>
          </span>
        </div>

        {/* Vote Button */}
        <Button
          onClick={() => onVote(model.id)}
          disabled={isDisabled || isLoading}
          isLoading={isLoading && isSelected}
          variant={isSelected && !isDisabled ? 'primary' : 'outline'}
          size="md"
          className="mt-4 w-full min-h-11"
        >
          {isDisabled
            ? 'Verify to Vote'
            : isLoading && isSelected
              ? 'Voting...'
              : 'Vote'}
        </Button>
      </div>
    </div>
  );
}
