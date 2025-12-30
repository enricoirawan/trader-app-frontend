import { kCandleStickStyle, kChartContainerStyle } from '@/constant';
import { cryptoService } from '@/services/cryptoService';
import useSelectedCryptoCoinStore from '@/store/useSelectedCryptoCoinStore';
import type { OHLCData } from '@/types';
import clsx from 'clsx';
import {
  CandlestickSeries,
  createChart,
  type IChartApi,
  type ISeriesApi,
  type UTCTimestamp,
} from 'lightweight-charts';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useCryptoWebSocket } from '@/hooks/useCryptoWebSocket';
import { Spinner } from './ui/spinner';

const CandleStickChart = () => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const chartDataRef = useRef<OHLCData[]>([]); // ✅ data mentah disimpan di sini

  const { selectedStringCoin, selectedTimeFrame } =
    useSelectedCryptoCoinStore();

  const [loading, setLoading] = useState<boolean>(false);

  // 💡 Tidak perlu state ohlcData terpisah, cukup pakai chartDataRef
  // Tapi kita tetap pakai untuk trigger useEffect di bawah
  const [ohlcData, setOhlcData] = useState<OHLCData[]>([]);

  // Fetch data awal
  useEffect(() => {
    if (!selectedStringCoin) return;

    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await cryptoService.getHistoryOHLCCoin(
          selectedTimeFrame,
          selectedStringCoin
        );

        if (isMounted && response.success) {
          setOhlcData(response.data);
          chartDataRef.current = response.data; // ✅ simpan ke ref
        }
      } catch (error) {
        console.error('Failed to fetch OHLC data:', error);
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
  }, [selectedStringCoin, selectedTimeFrame]);

  // Inisialisasi chart
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

    // Format dan set data awal
    const formattedData = ohlcData.map((item) => ({
      time: item.time as UTCTimestamp,
      open: Number(item.open),
      high: Number(item.high),
      low: Number(item.low),
      close: Number(item.close),
    }));
    candlestickSeries.setData(formattedData);
    chart.timeScale().fitContent();

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [ohlcData]);

  // ✅ Perbaikan utama: ganti getData() dengan chartDataRef.current
  const updateChartWithNewCandle = useCallback((newCandle: OHLCData) => {
    if (!candlestickSeriesRef.current) return;

    const formattedCandle = {
      time: newCandle.time as UTCTimestamp,
      open: Number(newCandle.open),
      high: Number(newCandle.high),
      low: Number(newCandle.low),
      close: Number(newCandle.close),
    };

    const currentData = chartDataRef.current; // ✅ gunakan ref, bukan series.getData()
    const lastCandle =
      currentData.length > 0 ? currentData[currentData.length - 1] : null;

    if (lastCandle && lastCandle.time === newCandle.time) {
      // Update candle terakhir
      const updatedData = [...currentData.slice(0, -1), newCandle];
      chartDataRef.current = updatedData;

      // Format ulang semua data untuk setData()
      const formattedUpdatedData = updatedData.map((d) => ({
        time: d.time as UTCTimestamp,
        open: Number(d.open),
        high: Number(d.high),
        low: Number(d.low),
        close: Number(d.close),
      }));
      candlestickSeriesRef.current.setData(formattedUpdatedData);
    } else {
      // Tambah candle baru
      chartDataRef.current = [...currentData, newCandle];
      candlestickSeriesRef.current.update(formattedCandle);
    }
  }, []);

  useCryptoWebSocket({
    symbol: selectedStringCoin,
    onNewCandle: (candle) => {
      console.log('🔥 New candle received:', candle); // ← tambahkan ini
      updateChartWithNewCandle(candle);
    },
  });

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
