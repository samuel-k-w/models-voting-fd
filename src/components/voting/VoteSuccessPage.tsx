'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Model } from '@/types';

interface VoteSuccessPageProps {
  model: Model;
  onViewResults?: () => void;
}

export function VoteSuccessPage({ model, onViewResults }: VoteSuccessPageProps) {
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    setConfetti(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent to-background flex items-center justify-center p-4">
      {/* Confetti effect */}
      {confetti && <Confetti />}

      <div className="w-full max-w-md">
        {/* Success card */}
        <div className="bg-white dark:bg-muted rounded-xl p-8 sm:p-12 shadow-xl text-center space-y-8">
          {/* Success icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center animate-bounce">
              <svg
                className="w-10 h-10 text-success"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-foreground">Vote Submitted!</h1>
            <p className="text-foreground/60">Your vote has been recorded successfully.</p>
          </div>

          {/* Model display */}
          <div className="space-y-4">
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              {model.image && (
                <img
                  src={model.image}
                  alt={model.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="text-center space-y-1">
              <p className="text-2xl font-semibold text-foreground">{model.name}</p>
              <p className="text-sm text-foreground/60">{model.modelNumber}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 py-6 border-y border-border">
            <div className="space-y-1">
              <p className="text-sm text-foreground/60">Total Votes</p>
              <p className="text-2xl font-bold text-primary">
                {(model.votes || model.voteCount || 0).toLocaleString()}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-foreground/60">Your Status</p>
              <p className="text-2xl font-bold text-success">Verified</p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Link href="/voting" className="block">
              <Button variant="primary" size="lg" className="w-full">
                Vote Again
              </Button>
            </Link>
            <Link href="/leaderboard" className="block">
              <Button variant="outline" size="lg" className="w-full">
                View Live Results
              </Button>
            </Link>
          </div>

          {/* Footer */}
          <p className="text-xs text-foreground/50">
            Share your vote on social media to help your favorite model win!
          </p>
        </div>
      </div>
    </div>
  );
}

// Confetti animation component
function Confetti() {
  const confettiPieces = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random(),
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-2 h-2 animate-bounce"
          style={{
            left: `${piece.left}%`,
            top: -10,
            animation: `fall ${piece.duration}s linear ${piece.delay}s forwards`,
            backgroundColor: ['#c2956d', '#6b9c71', '#d9a574'][Math.floor(Math.random() * 3)],
          }}
        />
      ))}
      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
