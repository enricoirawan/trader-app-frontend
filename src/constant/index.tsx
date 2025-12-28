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

export const kChartContainerStyle = {
  height: 500,
  layout: {
    background: { color: '#0a0a0a' },
    textColor: '#d1d4dc',
  },
  grid: {
    vertLines: { color: '#1a1a1a' },
    horzLines: { color: '#1a1a1a' },
  },
  crosshair: {
    mode: 1,
  },
  rightPriceScale: {
    borderColor: '#2a2a2a',
  },
  timeScale: {
    borderColor: '#2a2a2a',
    timeVisible: true,
    barSpacing: 12,
  },
  localization: {
    dateFormat: 'yyyy-MMM-dd',
  },
};

export const kCandleStickStyle = {
  upColor: '#22c55e',
  downColor: '#ef4444',
  borderVisible: false,
  wickUpColor: '#22c55e',
  wickDownColor: '#ef4444',
};
