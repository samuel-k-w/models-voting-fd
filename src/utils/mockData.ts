import { Model } from '@/types';

export const MOCK_MODELS: Model[] = [
  {
    id: '1',
    name: 'Aisha Chen',
    modelNumber: 'M-001',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&h=600&fit=crop',
    votes: 3421,
    category: 'Fashion',
    featured: true,
  },
  {
    id: '2',
    name: 'Isabella Santos',
    modelNumber: 'M-002',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=600&fit=crop',
    votes: 2854,
    category: 'High Fashion',
    featured: true,
  },
  {
    id: '3',
    name: 'Zara Mitchell',
    modelNumber: 'M-003',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop',
    votes: 2641,
    category: 'Commercial',
  },
  {
    id: '4',
    name: 'Sofia Rossi',
    modelNumber: 'M-004',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=600&fit=crop',
    votes: 2230,
    category: 'Fashion',
  },
  {
    id: '5',
    name: 'Emma Anderson',
    modelNumber: 'M-005',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=600&fit=crop',
    votes: 1956,
    category: 'Runway',
  },
  {
    id: '6',
    name: 'Malia Thompson',
    modelNumber: 'M-006',
    image: 'https://images.unsplash.com/photo-1517849845537-1d51a20414de?w=500&h=600&fit=crop',
    votes: 1843,
    category: 'Editorial',
  },
];

export const getMockModelById = (id: string): Model | undefined => {
  return MOCK_MODELS.find((model) => model.id === id);
};

export const getMockModelsByCategory = (category: string): Model[] => {
  return MOCK_MODELS.filter((model) => model.category === category);
};

export const getTopModels = (limit: number = 5): Model[] => {
  return [...MOCK_MODELS].sort((a, b) => b.votes - a.votes).slice(0, limit);
};
