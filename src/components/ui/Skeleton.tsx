import React from 'react';
import { cn } from '@/utils/cn';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = 'rectangular', width, height, ...props }, ref) => {
    const variantClasses = {
      text: 'rounded',
      circular: 'rounded-full',
      rectangular: 'rounded-lg',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'animate-pulse bg-gradient-to-r from-muted to-muted-hover',
          variantClasses[variant],
          className
        )}
        style={{
          width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
          height: height ? (typeof height === 'number' ? `${height}px` : height) : '16px',
        }}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

interface SkeletonCardProps {
  lines?: number;
  imageHeight?: number;
  showImage?: boolean;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  lines = 3,
  imageHeight = 200,
  showImage = true,
}) => {
  return (
    <div className="space-y-4 rounded-xl border border-border bg-background p-4">
      {showImage && <Skeleton variant="rectangular" height={imageHeight} />}
      <div className="space-y-2">
        <Skeleton height={24} />
        {Array.from({ length: lines - 1 }).map((_, i) => (
          <Skeleton key={i} height={16} width={i === lines - 2 ? '80%' : '100%'} />
        ))}
      </div>
    </div>
  );
};
