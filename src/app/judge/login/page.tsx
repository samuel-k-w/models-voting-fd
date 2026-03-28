import type { Metadata } from 'next';
import { JudgeAuthForm } from '@/components/judge/JudgeAuthForm';

export const metadata: Metadata = {
  title: 'Judge Login | Real-Time Voting Platform',
  description: 'Judge authentication portal for the voting system',
};

export default function JudgeLoginPage() {
  return <JudgeAuthForm />;
}
