import { CRYPTO_COIN } from '@/constant/apiConstant';
import type { BaseResponse, CoinData, OHLCData } from '@/types';
import { apiService } from './apiService';

export const cryptoService = {
  getCoins: async (): Promise<BaseResponse<CoinData[]>> => {
    return apiService.get<BaseResponse<CoinData[]>>(CRYPTO_COIN);
  },
  getDetailCoin: async (symbol: string): Promise<BaseResponse<CoinData>> => {
    return apiService.get<BaseResponse<CoinData>>(CRYPTO_COIN + '/' + symbol);
  },
  getHistoryOHLCCoin: async (
    timeFrame: '1M' | '1H' | '1D',
    symbol: string
  ): Promise<BaseResponse<OHLCData[]>> => {
    return apiService.get<BaseResponse<OHLCData[]>>(
      `${CRYPTO_COIN}/history/${timeFrame}/${symbol}`
    );
  },
};
