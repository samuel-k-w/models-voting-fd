'use client';

import { memo } from 'react';
import type { LeaderboardEntry } from '@/store/leaderboardStore';
import { cn } from '@/utils/cn';

interface LeaderboardRowProps {
  entry: LeaderboardEntry;
  isBigScreen?: boolean;
}

const getMedalIcon = (rank: number): string => {
  switch (rank) {
    case 1:
      return '🥇';
    case 2:
      return '🥈';
    case 3:
      return '🥉';
    default:
      return '';
  }
};

export const LeaderboardRow = memo(function LeaderboardRow({
  entry,
  isBigScreen = false,
}: LeaderboardRowProps) {
  const votes = entry.votes || entry.voteCount || 0;
  const medal = getMedalIcon(entry.rank);

  return (
    <div
      className={cn(
        'flex items-center gap-4 border-b border-border transition-all duration-500 group',
        {
          'p-4 sm:p-6': !isBigScreen,
          'p-8 text-2xl': isBigScreen,
          'bg-primary-light/20 border-l-4 border-l-primary': entry.rank === 1,
          'bg-accent border-l-4 border-l-warning': entry.rank === 2,
          'bg-muted border-l-4 border-l-success': entry.rank === 3,
          'hover:bg-accent/50': !entry.isTopThree,
        }
      )}
    >
      {/* Rank */}
      <div
        className={cn(
          'flex items-center justify-center min-w-fit',
          {
            'w-12 h-12 rounded-lg bg-primary text-white font-bold text-lg': entry.rank <= 3,
            'w-10 h-10 font-bold text-foreground/60': entry.rank > 3,
          }
        )}
      >
        {medal ? (
          <span className={isBigScreen ? 'text-4xl' : 'text-2xl'}>{medal}</span>
        ) : (
          <span className={isBigScreen ? 'text-2xl' : ''}>#{entry.rank}</span>
        )}
      </div>

      {/* Model Info */}
      <div className="flex-1 min-w-0">
        <h3
          className={cn(
            'font-semibold text-foreground truncate',
            {
              'text-xl sm:text-2xl': !isBigScreen,
              'text-4xl': isBigScreen,
            }
          )}
        >
          {entry.name}
        </h3>
        <p
          className={cn(
            'text-foreground/60 truncate',
            {
              'text-sm sm:text-base': !isBigScreen,
              'text-2xl': isBigScreen,
            }
          )}
        >
          {entry.modelNumber}
        </p>
      </div>

      {/* Rank Change Indicator */}
      {entry.rankChanged && entry.previousRank !== undefined && (
        <div className="hidden sm:flex items-center gap-1 text-sm font-medium">
          {entry.previousRank > entry.rank ? (
            <span className="text-success flex items-center gap-1">
              ↑ {entry.previousRank - entry.rank}
            </span>
          ) : (
            <span className="text-error flex items-center gap-1">
              ↓ {entry.rank - entry.previousRank}
            </span>
          )}
        </div>
      )}

      {/* Vote Count */}
      <div className="text-right">
        <p
          className={cn(
            'font-bold text-primary',
            {
              'text-lg sm:text-2xl': !isBigScreen,
              'text-4xl': isBigScreen,
            }
          )}
        >
          {votes.toLocaleString()}
        </p>
        <p className={cn('text-foreground/60', {
          'text-xs sm:text-sm': !isBigScreen,
          'text-xl': isBigScreen,
        })}>
          votes
        </p>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison for memo optimization
  return (
    prevProps.entry.id === nextProps.entry.id &&
    prevProps.entry.rank === nextProps.entry.rank &&
    prevProps.entry.votes === nextProps.entry.votes &&
    prevProps.entry.voteCount === nextProps.entry.voteCount &&
    prevProps.isBigScreen === nextProps.isBigScreen
  );
});
