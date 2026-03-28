'use client';

import { useState, useEffect } from 'react';
import { useLeaderboard } from '@/hooks/useLeaderboard';
import { LeaderboardRow } from './LeaderboardRow';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';

interface LeaderboardContainerProps {
  showHeader?: boolean;
  initialMode?: 'normal' | 'big-screen';
}

export function LeaderboardContainer({
  showHeader = true,
  initialMode = 'normal',
}: LeaderboardContainerProps) {
  const [mode, setMode] = useState<'normal' | 'big-screen'>(initialMode);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const { entries, startPolling, stopPolling } = useLeaderboard({
    enableWebSocket: true,
    pollInterval: 5000,
  });

  useEffect(() => {
    if (autoRefresh && mode === 'big-screen') {
      startPolling();
    } else {
      stopPolling();
    }
  }, [autoRefresh, mode, startPolling, stopPolling]);

  const isBigScreen = mode === 'big-screen';

  return (
    <div className={cn('flex flex-col h-full', {
      'min-h-screen bg-gradient-to-br from-background via-accent to-background':
        isBigScreen,
    })}>
      {/* Header */}
      {showHeader && (
        <div className={cn(
          'border-b border-border bg-white dark:bg-muted',
          {
            'p-6': !isBigScreen,
            'p-8': isBigScreen,
          }
        )}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className={cn(
                'font-bold text-foreground',
                {
                  'text-3xl sm:text-4xl': !isBigScreen,
                  'text-6xl': isBigScreen,
                }
              )}>
                Leaderboard
              </h1>
              {!isBigScreen && (
                <p className="mt-1 text-sm text-foreground/60">
                  Real-time rankings
                </p>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3 flex-wrap justify-end">
              {isBigScreen && (
                <Button
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  variant={autoRefresh ? 'primary' : 'outline'}
                  size={isBigScreen ? 'lg' : 'sm'}
                  className={isBigScreen ? 'text-xl px-8' : ''}
                >
                  {autoRefresh ? 'Auto-Refresh ON' : 'Auto-Refresh OFF'}
                </Button>
              )}
              <Button
                onClick={() => setMode(isBigScreen ? 'normal' : 'big-screen')}
                variant="outline"
                size={isBigScreen ? 'lg' : 'sm'}
                className={isBigScreen ? 'text-xl px-8' : ''}
              >
                {isBigScreen ? '↙ Normal' : '↗ Big Screen'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard List */}
      <div className={cn(
        'flex-1 overflow-y-auto',
        {
          'bg-gradient-to-br from-background via-accent to-background': isBigScreen,
        }
      )}>
        {entries.length === 0 ? (
          <div className={cn(
            'flex items-center justify-center text-foreground/60',
            {
              'py-12': !isBigScreen,
              'py-32 text-3xl': isBigScreen,
            }
          )}>
            No data yet
          </div>
        ) : (
          <div className={cn({
            'divide-y divide-border': !isBigScreen,
          })}>
            {entries.map(entry => (
              <LeaderboardRow
                key={entry.id}
                entry={entry}
                isBigScreen={isBigScreen}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer - Auto-refresh animation for big screen */}
      {isBigScreen && autoRefresh && (
        <div className="border-t border-border bg-white dark:bg-muted p-8 text-center">
          <div className="flex items-center justify-center gap-2 text-2xl text-primary">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
            <span>Live Updates Active</span>
            <div className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          </div>
        </div>
      )}
    </div>
  );
}
