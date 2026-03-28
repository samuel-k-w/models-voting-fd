'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { VoteSuccessPage } from '@/components/voting/VoteSuccessPage';
import { Model } from '@/types';
import { MOCK_MODELS } from '@/utils/mockData';

export default function VoteSuccessRoute() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [model, setModel] = useState<Model | null>(null);

  useEffect(() => {
    const modelId = searchParams.get('modelId');
    if (!modelId) {
      router.push('/voting');
      return;
    }

    const selectedModel = MOCK_MODELS.find((m) => m.id === modelId);
    if (!selectedModel) {
      router.push('/voting');
      return;
    }

    setModel(selectedModel);
  }, [searchParams, router]);

  if (!model) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse">
          <p className="text-foreground/60">Loading...</p>
        </div>
      </div>
    );
  }

  return <VoteSuccessPage model={model} />;
}
