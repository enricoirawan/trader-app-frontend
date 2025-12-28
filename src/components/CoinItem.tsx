import { format2Decimal, getVolumeChangeType } from '@/lib/utils';
import type { CoinData } from '@/types';
import clsx from 'clsx';
import CoinSparkline from './CoinSparkline';
import useSelectedCryptoCoinStore from '@/store/useSelectedCryptoCoinStore';

interface CoinItem {
  coin: CoinData;
}

const CoinItem = ({ coin }: CoinItem) => {
  const { selectedStringCoin } = useSelectedCryptoCoinStore();

  const getChangeClass = () => {
    const type = getVolumeChangeType(coin.change24Hour);

    if (type === 'plus') {
      return {
        dot: 'bg-green-700 group-hover:bg-green-500',
        text: 'text-green-700 group-hover:text-green-500',
        selectedDot: 'bg-green-500!',
        selectedText: 'text-green-500!',
      };
    }

    if (type === 'minus') {
      return {
        dot: 'bg-red-700 group-hover:bg-red-500',
        text: 'text-red-700 group-hover:text-red-500',
        selectedDot: 'bg-red-500!',
        selectedText: 'text-red-500!',
      };
    }

    return {
      dot: 'bg-muted-foreground',
      text: 'text-muted-foreground',
      selectedDot: 'bg-gray-500!',
      selectedText: 'text-gray-500!',
    };
  };

  return (
    <div
      className={clsx(
        `group
        w-full
        rounded-lg
        border-2
        border-gray-800
        p-3
        flex
        flex-col
        gap-y-2
        cursor-pointer
        transition
        hover:border-gray-700`,
        selectedStringCoin === coin.name && 'border-gray-700!'
      )}
    >
      <div className="w-full flex items-start justify-between">
        <img src={coin.imageUrl} className="w-10 h-10" />
        <CoinSparkline data={coin.weeklyHistoryCoin} />
      </div>
      {/* Coin Fullname */}
      <p
        className={clsx(
          'text-sm text-muted-foreground group-hover:text-white transition-colors',
          selectedStringCoin === coin.name && 'text-white!'
        )}
      >
        {coin.fullName}
      </p>
      {/* Coin Fullname */}
      {/* Coin Price */}
      <p
        className={clsx(
          'text-xl text-muted-foreground group-hover:text-white transition-colors',
          selectedStringCoin === coin.name && 'text-white!'
        )}
      >
        ${format2Decimal(coin.price)}
      </p>
      {/* Coin Price */}
      {/* Day Volume */}
      <p
        className={clsx(
          'text-xs text-muted-foreground group-hover:text-white transition-colors',
          selectedStringCoin === coin.name && 'text-white!'
        )}
      >
        24h Volume ${format2Decimal(coin.volumeDay)}
      </p>
      {/* Day Volume */}
      {/* Change 24 hour */}
      <div className="flex items-center justify-start gap-x-1">
        <div
          className={clsx(
            'w-2 h-2 rounded-full',
            getChangeClass().dot,
            selectedStringCoin === coin.name && getChangeClass().selectedDot
          )}
        ></div>
        <p
          className={clsx(
            getChangeClass().text,
            'text-xs',
            selectedStringCoin === coin.name && getChangeClass().selectedText
          )}
        >
          {coin.change24Hour}
        </p>
      </div>
      {/* Change 24 hour */}
    </div>
  );
};

export default CoinItem;
