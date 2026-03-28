'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PhoneInput } from '@/components/auth/PhoneInput';
import { OtpVerification } from '@/components/auth/OtpVerification';

type VerificationStep = 'phone' | 'otp';

export default function VerifyPage() {
  const router = useRouter();
  const [step, setStep] = useState<VerificationStep>('phone');
  const [phone, setPhone] = useState('');
  const [sessionToken, setSessionToken] = useState('');

  const handlePhoneSubmit = async (phoneNumber: string) => {
    try {
      // Simulate API call to send OTP
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // Mock session token generation
      const token = `session_${Date.now()}`;
      
      setPhone(phoneNumber);
      setSessionToken(token);
      setStep('otp');
    } catch (error) {
      throw new Error('Failed to send OTP');
    }
  };

  const handleOtpVerify = async (otp: string) => {
    try {
      // Simulate API call to verify OTP
      await new Promise((resolve) => setTimeout(resolve, 1200));
      
      // Mock verification - accept any 6 digits that aren't all same
      const isValid = /^[0-9]{6}$/.test(otp) && !/^(.)\1{5}$/.test(otp);
      
      if (!isValid) {
        throw new Error('Invalid OTP. Try 123456');
      }

      // Store verification data
      localStorage.setItem('session_token', sessionToken);
      localStorage.setItem('verified_phone', phone);
      localStorage.setItem('is_verified', 'true');

      // Redirect to voting page
      router.push('/voting');
    } catch (error) {
      throw error;
    }
  };

  const handleResendOtp = async () => {
    try {
      // Simulate API call to resend OTP
      await new Promise((resolve) => setTimeout(resolve, 600));
    } catch (error) {
      throw new Error('Failed to resend OTP');
    }
  };

  const handleBackToPhone = () => {
    setStep('phone');
    setPhone('');
    setSessionToken('');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-accent to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-12 text-center space-y-3">
          <h1 className="text-4xl font-bold text-foreground text-balance">
            {step === 'phone' ? 'Verify Your Phone' : 'Enter Code'}
          </h1>
          <p className="text-foreground/60">
            {step === 'phone'
              ? 'To vote, we need to verify your phone number'
              : 'Check your messages for the verification code'}
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white dark:bg-muted rounded-2xl p-8 sm:p-10 shadow-lg">
          {step === 'phone' ? (
            <PhoneInput onPhoneSubmit={handlePhoneSubmit} />
          ) : (
            <OtpVerification
              phone={phone}
              onVerify={handleOtpVerify}
              onResend={handleResendOtp}
              onBack={handleBackToPhone}
            />
          )}
        </div>

        {/* Footer info */}
        <div className="mt-8 text-center text-xs text-foreground/50">
          <p>Your phone number is safe. We only use it for voting verification.</p>
        </div>
      </div>
    </main>
  );
}
