import useSelectedCryptoCoinStore from '@/store/useSelectedCryptoCoinStore';
import clsx from 'clsx';

const TimeFrameOptions = () => {
  const { selectedTimeFrame, setSelectedTimeFrame } =
    useSelectedCryptoCoinStore();

  return (
    <div className="flex items-center justify-center gap-x-2">
      <button
        onClick={() => setSelectedTimeFrame('1M')}
        className={clsx(
          'text-xs p-1.5 rounded cursor-pointer',
          selectedTimeFrame === '1M' ? 'bg-primary' : 'bg-sidebar-accent'
        )}
      >
        1M
      </button>
      <button
        onClick={() => setSelectedTimeFrame('1H')}
        className={clsx(
          'text-xs p-1.5 rounded cursor-pointer',
          selectedTimeFrame === '1H' ? 'bg-primary' : 'bg-sidebar-accent'
        )}
      >
        1H
      </button>
      <button
        onClick={() => setSelectedTimeFrame('1D')}
        className={clsx(
          'text-xs p-1.5 rounded cursor-pointer',
          selectedTimeFrame === '1D' ? 'bg-primary' : 'bg-sidebar-accent'
        )}
      >
        1D
      </button>
    </div>
  );
};

export default TimeFrameOptions;
