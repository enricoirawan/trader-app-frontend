import { cryptoService } from '@/services/cryptoService';
import type { CryptoCoinDetailStore } from '@/types';
import { create } from 'zustand';

const useCryptoCoinDetailStore = create<CryptoCoinDetailStore>((set) => ({
  coin: null,
  isLoading: false,
  error: null,
  fetchCoinDetail: async (symbol: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await cryptoService.getDetailCoin(symbol);

      if (response.success) {
        set({ coin: response.data, isLoading: false, error: null });
      }
    } catch (error: unknown) {
      const apiError = error as { message: string; statusCode: number };

      set(
        {
          coin: null,
          error: apiError.message || 'Failed to fetch coins',
          isLoading: false,
        },
        false
      );
    }
  },
}));

export default useCryptoCoinDetailStore;
