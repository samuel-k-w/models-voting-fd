'use client';

import { useState, useEffect } from 'react';

interface CountdownResult {
  timeLeft: number;
  isActive: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  formatted: string;
}

export function useCountdown(initialSeconds: number = 3600): CountdownResult {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) {
      if (timeLeft <= 0) setIsActive(false);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    timeLeft,
    isActive,
    start: () => setIsActive(true),
    pause: () => setIsActive(false),
    reset: () => {
      setTimeLeft(initialSeconds);
      setIsActive(false);
    },
    formatted: formatTime(timeLeft),
  };
}
