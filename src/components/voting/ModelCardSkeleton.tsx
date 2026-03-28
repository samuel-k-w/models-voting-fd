import { Skeleton } from '@/components/ui/Skeleton';

export function ModelCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border-2 border-gray-200 dark:border-gray-700">
      {/* Image Skeleton */}
      <Skeleton className="h-48 w-full sm:h-56" />

      {/* Content Skeleton */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <Skeleton className="h-6 w-3/4 rounded-lg" />
          <Skeleton className="mt-2 h-4 w-2/4 rounded-lg" />
          <Skeleton className="mt-3 h-4 w-full rounded-lg" />
        </div>

        {/* Vote Count Skeleton */}
        <Skeleton className="mt-4 h-4 w-1/3 rounded-lg" />

        {/* Button Skeleton */}
        <Skeleton className="mt-4 h-11 w-full rounded-lg" />
      </div>
    </div>
  );
}
