'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';

interface PhoneInputProps {
  onPhoneSubmit: (phone: string) => Promise<void>;
  isLoading?: boolean;
}

export function PhoneInput({ onPhoneSubmit, isLoading = false }: PhoneInputProps) {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validatePhone = (value: string): boolean => {
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
    return phoneRegex.test(value.replace(/\s/g, ''));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone.trim()) {
      setError('Phone number is required');
      return;
    }

    if (!validatePhone(phone)) {
      setError('Please enter a valid phone number');
      return;
    }

    setIsSubmitting(true);
    try {
      await onPhoneSubmit(phone);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send OTP');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full">
      <div className="space-y-2">
        <label htmlFor="phone" className="block text-sm font-medium text-foreground">
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          inputMode="tel"
          placeholder="+1 (555) 000-0000"
          value={phone}
          onChange={handleChange}
          disabled={isSubmitting || isLoading}
          className={cn(
            'w-full px-4 py-3 rounded-lg border-2 transition-all',
            'text-foreground placeholder-foreground/40',
            'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20',
            error ? 'border-error bg-error/5' : 'border-border bg-muted hover:border-primary',
            (isSubmitting || isLoading) && 'opacity-50 cursor-not-allowed',
          )}
          autoComplete="tel"
        />
        {error && <p className="text-sm text-error font-medium">{error}</p>}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isSubmitting || isLoading || !phone.trim()}
        isLoading={isSubmitting || isLoading}
        className="w-full"
      >
        Send OTP
      </Button>

      <p className="text-xs text-foreground/60 text-center">
        We&apos;ll send a verification code to your phone number
      </p>
    </form>
  );
}
