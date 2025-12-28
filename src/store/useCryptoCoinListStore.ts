import { cryptoService } from '@/services/cryptoService';
import type { CryptoCoinListStore } from '@/types';
import { create } from 'zustand';

const useCryptoCoinListStore = create<CryptoCoinListStore>((set) => ({
  coins: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null,
  fetchCoins: async () => {
    set({
      coins: [],
      isLoading: true,
      isSuccess: false,
      isError: false,
      error: null,
    });

    try {
      const response = await cryptoService.getCoins();

      if (response.success) {
        set({
          coins: response.data,
          isLoading: false,
          isSuccess: true,
          isError: false,
          error: null,
        });
      }
    } catch (error: unknown) {
      const apiError = error as { message: string; statusCode: number };

      set({
        coins: [],
        isLoading: false,
        isSuccess: false,
        isError: true,
        error: apiError.message || 'Failed to fetch coins',
      });
    }
  },
}));

export default useCryptoCoinListStore;
