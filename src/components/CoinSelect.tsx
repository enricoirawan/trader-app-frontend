import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useCryptoCoinListStore from '@/store/useCryptoCoinListStore';
import useSelectedCryptoCoinStore from '@/store/useSelectedCryptoCoinStore';
import { useEffect } from 'react';

const CoinSelect = () => {
  const { coins, isLoading, isSuccess, isError, error, fetchCoins } =
    useCryptoCoinListStore();
  const { selectedStringCoin, setSelectedStringCoin } =
    useSelectedCryptoCoinStore();

  useEffect(() => {
    fetchCoins();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setSelectedStringCoin(coins[0].name);
    }
  }, [isSuccess]);

  if (isLoading) {
    return (
      <Select
        value={selectedStringCoin ?? ''}
        onValueChange={(coin) => setSelectedStringCoin(coin)}
      >
        <SelectTrigger className="border-none bg-sidebar mb-3">
          <SelectValue placeholder="Loading..." />
        </SelectTrigger>
      </Select>
    );
  }

  if (isError) {
    return <div></div>;
  }

  if (isSuccess) {
    return (
      <Select
        value={selectedStringCoin ?? ''}
        onValueChange={(coin) => setSelectedStringCoin(coin)}
      >
        <SelectTrigger className="border-none bg-sidebar mb-3 flex items-center gap-2">
          <div className="flex items-center gap-2">
            <SelectValue placeholder="Select Coin" />
          </div>
        </SelectTrigger>

        <SelectContent>
          {coins.map((coin, index) => (
            <SelectItem key={index} value={coin.name}>
              <div className="flex items-center gap-3">
                <img
                  src={coin.imageUrl}
                  alt={coin.name}
                  className="w-5 h-5 object-contain"
                />
                <span className="font-medium text-sm uppercase">
                  {coin.name}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
};

export default CoinSelect;
