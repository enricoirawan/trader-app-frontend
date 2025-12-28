import CandlestickChart from '@/components/CandleStickChart';
import CoinList from '@/components/CoinList';
import CoinSelect from '@/components/CoinSelect';
import Header from '@/components/Header';
import TimeFrameOptions from '@/components/TimeFrameOptions';

const TradePage = () => {
  return (
    <div className="w-full h-full">
      <Header />

      <div
        className="grid
        grid-cols-1
        gap-4
        md:grid-cols-5
        md:grid-rows-5"
      >
        <div className="md:col-span-3 md:row-span-3 border-2 h-auto border-gray-800 p-5 rounded-lg">
          <div className="w-full flex items-start justify-between">
            <CoinSelect />
            <TimeFrameOptions />
          </div>
          <CandlestickChart />
        </div>

        <div className="md:col-span-2 md:row-span-5">
          <CoinList />
        </div>

        {/* Transaction */}
        <div className="md:col-span-3 md:row-span-2">19</div>
        {/* Transaction */}
      </div>
    </div>
  );
};

export default TradePage;
