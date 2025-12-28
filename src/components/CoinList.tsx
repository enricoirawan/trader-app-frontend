import useCryptoCoinListStore from '@/store/useCryptoCoinListStore';
import { useEffect } from 'react';
import CoinItem from './CoinItem';
import CoinSkeletonLoading from './CoinSkeletonLoading';

const CoinList = () => {
  const { coins, isLoading, isSuccess, isError, error, fetchCoins } =
    useCryptoCoinListStore();

  useEffect(() => {
    fetchCoins();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) => (
          <CoinSkeletonLoading key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return <div></div>;
  }

  if (isSuccess) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {coins.map((coin) => (
          <CoinItem key={coin.id} coin={coin} />
        ))}
      </div>
    );
  }
};

export default CoinList;
