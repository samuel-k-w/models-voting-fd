'use client';

import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/utils/cn';

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
  onComplete?: (value: string) => void;
  error?: boolean;
}

export function OtpInput({
  value,
  onChange,
  length = 6,
  disabled = false,
  onComplete,
  error = false,
}: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  const handleChange = (index: number, val: string) => {
    const numericValue = val.replace(/[^0-9]/g, '');
    if (numericValue.length > 1) {
      // Handle paste
      const newValue = (value + numericValue).slice(0, length);
      onChange(newValue);
      
      if (newValue.length === length) {
        onComplete?.(newValue);
      }
      
      // Focus last input or next empty
      const nextIndex = Math.min(newValue.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const newValue = value.slice(0, index) + numericValue + value.slice(index + 1);
    onChange(newValue);

    if (numericValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newValue.length === length && newValue === newValue.replace(/[^0-9]/g, '')) {
      onComplete?.(newValue);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace') {
      if (value[index]) {
        const newValue = value.slice(0, index) + value.slice(index + 1);
        onChange(newValue);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div className="flex gap-2 sm:gap-3 justify-center">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type={isMobile ? 'text' : 'tel'}
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ''}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          disabled={disabled}
          className={cn(
            'w-12 h-12 sm:w-14 sm:h-14 text-center text-xl sm:text-2xl font-semibold',
            'border-2 rounded-lg transition-all',
            'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-offset-2',
            error ? 'border-error focus:border-error focus:ring-error' : 'border-border',
            disabled ? 'bg-muted cursor-not-allowed' : 'bg-muted hover:border-primary',
          )}
          aria-label={`OTP digit ${index + 1}`}
        />
      ))}
    </div>
  );
}
