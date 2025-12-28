import type { SelectedCryptoCoinStore } from '@/types';
import { create } from 'zustand';

const useSelectedCryptoCoinStore = create<SelectedCryptoCoinStore>(
  (set, get) => ({
    selectedStringCoin: null,
    setSelectedStringCoin: (coin: string) => {
      set({ selectedStringCoin: coin });
    },
    selectedTimeFrame: '1D',
    setSelectedTimeFrame: (timeframe) => {
      if (get().selectedStringCoin) {
        set({ selectedTimeFrame: timeframe });
      }
    },
  })
);

export default useSelectedCryptoCoinStore;
