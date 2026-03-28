'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { OtpInput } from '@/components/ui/OtpInput';

interface OtpVerificationProps {
  phone: string;
  onVerify: (otp: string) => Promise<void>;
  onResend: () => Promise<void>;
  onBack?: () => void;
  isLoading?: boolean;
}

export function OtpVerification({
  phone,
  onVerify,
  onResend,
  onBack,
  isLoading = false,
}: OtpVerificationProps) {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0 && !canResend) {
      setCanResend(false);
    }
    return () => clearInterval(interval);
  }, [resendTimer, canResend]);

  const handleOtpComplete = async (value: string) => {
    setOtp(value);
    await handleVerify(value);
  };

  const handleVerify = async (otpValue: string = otp) => {
    if (otpValue.length !== 6) {
      setError('OTP must be 6 digits');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      await onVerify(otpValue);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid OTP. Please try again.');
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setError('');
    try {
      await onResend();
      setOtp('');
      setResendTimer(60);
      setCanResend(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend OTP');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">Verify Your Phone</h2>
        <p className="text-foreground/60">
          We sent a code to <span className="font-medium">{phone}</span>
        </p>
      </div>

      {/* OTP Input */}
      <div className="space-y-4 py-8">
        <OtpInput
          value={otp}
          onChange={setOtp}
          length={6}
          disabled={isVerifying || isLoading}
          error={!!error}
          onComplete={handleOtpComplete}
        />
        {error && <p className="text-sm text-error text-center font-medium">{error}</p>}
      </div>

      {/* Verify Button */}
      <Button
        onClick={() => handleVerify()}
        variant="primary"
        size="lg"
        disabled={isVerifying || isLoading || otp.length !== 6}
        isLoading={isVerifying || isLoading}
        className="w-full"
      >
        Verify Phone
      </Button>

      {/* Resend Section */}
      <div className="space-y-3">
        {resendTimer > 0 ? (
          <div className="text-center">
            <p className="text-sm text-foreground/60">
              Resend code in <span className="font-semibold text-foreground">{resendTimer}s</span>
            </p>
          </div>
        ) : (
          <button
            onClick={handleResend}
            disabled={isResending || isLoading || !canResend}
            className="w-full text-center text-sm font-medium text-primary hover:text-primary-hover transition-colors disabled:text-foreground/40 disabled:cursor-not-allowed"
          >
            {isResending ? 'Sending...' : 'Didn&apos;t receive the code? Resend'}
          </button>
        )}

        {resendTimer === 0 && !canResend && (
          <button
            onClick={() => setCanResend(true)}
            className="w-full text-center text-sm font-medium text-primary hover:text-primary-hover transition-colors"
          >
            Ready to resend?
          </button>
        )}
      </div>

      {/* Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          disabled={isVerifying || isLoading}
          className="w-full text-center text-sm text-foreground/60 hover:text-foreground transition-colors disabled:opacity-50"
        >
          Back to phone number
        </button>
      )}
    </div>
  );
}
