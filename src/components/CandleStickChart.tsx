import { kCandleStickStyle, kChartContainerStyle } from '@/constant';
import { cryptoService } from '@/services/cryptoService';
import useSelectedCryptoCoinStore from '@/store/useSelectedCryptoCoinStore';
import type { OHLCData } from '@/types';
import {
  CandlestickSeries,
  createChart,
  type IChartApi,
  type ISeriesApi,
  type UTCTimestamp,
} from 'lightweight-charts';
import { useEffect, useRef, useState } from 'react';
import { Spinner } from './ui/spinner';
import clsx from 'clsx';

const CandleStickChart = () => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);

  const { selectedStringCoin, selectedTimeFrame } =
    useSelectedCryptoCoinStore();

  const [ohlcData, setOhlcData] = useState<OHLCData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (selectedStringCoin) {
      let isMounted = true;

      const fetchData = async () => {
        try {
          setLoading(true);
          setOhlcData([]);
          const response = await cryptoService.getHistoryOHLCCoin(
            selectedTimeFrame,
            selectedStringCoin
          );

          if (isMounted && response.success) {
            setOhlcData(response.data);
          }
        } catch (error) {
          const apiError = error as { message: string; statusCode: number };
          // handle error
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      };

      fetchData();

      return () => {
        isMounted = false;
      };
    }
  }, [selectedStringCoin, selectedTimeFrame]);

  useEffect(() => {
    if (!chartContainerRef.current || ohlcData.length === 0) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      ...kChartContainerStyle,
    });
    chartRef.current = chart;

    const candlestickSeries = chart.addSeries(
      CandlestickSeries,
      kCandleStickStyle
    );
    candlestickSeries.applyOptions({
      priceFormat: {
        type: 'price',
        precision: 2,
        minMove: 0.00000001,
      },
    });
    candlestickSeriesRef.current = candlestickSeries;

    const formattedData = ohlcData.map((item) => ({
      time: item.time as UTCTimestamp,
      open: Number(item.open),
      high: Number(item.high),
      low: Number(item.low),
      close: Number(item.close),
    }));
    candlestickSeries.setData(formattedData);

    // Auto fit content
    chart.timeScale().fitContent();

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [ohlcData]);

  return (
    <div className="w-full h-full">
      <div
        ref={chartContainerRef}
        className={clsx('w-full h-full', loading ? 'hidden' : 'block')}
      />
      {loading && (
        <div className="w-full h-full flex items-center justify-center gap-x-2">
          <Spinner />
          <p className="text-sm">Loading Chart...</p>
        </div>
      )}
    </div>
  );
};

export default CandleStickChart;
