import type { LucideProps } from 'lucide-react';
import type React from 'react';

export type BaseResponse<T> = {
  success: boolean;
  statusCode: number;
  data: T;
  message: string;
};

export type PageComponent = {
  label: string;
  description: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  path: string;
  component: React.JSX.Element;
  isPrivate: boolean;
};

export type CoinData = {
  id: string;
  name: string;
  fullName: string;
  imageUrl: string;
  fromSymbol: string;
  toSymbol: string;
  price: string;
  mktcap: string;
  volumeDay: string;
  change24Hour: string;
  weeklyHistoryCoin: OHLCData[];
};

export type OHLCData = {
  time: number;
  high: number;
  low: number;
  open: number;
  close: number;
};

// Zustand
export interface CryptoCoinListStore {
  coins: CoinData[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: string | null;
  fetchCoins: () => Promise<void>;
}

export interface CryptoCoinDetailStore {
  coin: CoinData | null;
  isLoading: boolean;
  error: string | null;
  fetchCoinDetail: (symbol: string) => Promise<void>;
}

export interface SelectedCryptoCoinStore {
  selectedStringCoin: string | null;
  setSelectedStringCoin: (coin: string) => void;
  selectedTimeFrame: '1M' | '1H' | '1D';
  setSelectedTimeFrame: (timeframe: '1M' | '1H' | '1D') => void;
}
