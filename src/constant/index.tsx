import AssetsPage from '@/pages/AssetsPage';
import TradePage from '@/pages/TradePage';
import type { PageComponent } from '@/types';
import { ChartCandlestick, Bitcoin } from 'lucide-react';

export const pages: PageComponent[] = [
  {
    label: 'Trade',
    description: 'Explore your path to financial freedom.',
    icon: ChartCandlestick,
    path: '/',
    component: <TradePage />,
    isPrivate: false,
  },
  {
    label: 'Assets',
    description: 'Your portfolio at a glance.',
    icon: Bitcoin,
    path: '/assets',
    component: <AssetsPage />,
    isPrivate: true,
  },
];
