import { cryptoService } from '@/services/cryptoService';
import type { OHLCData } from '@/types';
import { Client } from '@stomp/stompjs';
import { useCallback, useEffect, useRef } from 'react';

type UseCryptoWebSocketProps = {
  symbol: string | null;
  onNewCandle: (candle: OHLCData) => void;
};

export const useCryptoWebSocket = ({
  symbol,
  onNewCandle,
}: UseCryptoWebSocketProps) => {
  const stompClientRef = useRef<Client | null>(null);

  const subscribeToSymbol = useCallback(async (sym: string) => {
    try {
      await cryptoService.subscribeToSymbol(sym);
      console.log(`📡 Subscribed to symbol: ${sym}`);
    } catch (error) {
      console.error('Failed to subscribe to symbol:', error);
    }
  }, []);

  useEffect(() => {
    if (!symbol) return;

    // Hapus koneksi lama jika ada (saat ganti simbol)
    if (stompClientRef.current) {
      stompClientRef.current.deactivate();
      stompClientRef.current = null;
    }

    // Ambil URL gateway
    const url = import.meta.env.VITE_GATEWAY_URL as string;

    if (!url) {
      console.error('VITE_GATEWAY_URL is not defined in .env');
      return;
    }

    const client = new Client({
      // ✅ Gunakan WebSocket murni
      webSocketFactory: () => {
        const wsUrl = `${url}/ws`.replace(/^http/, 'ws'); // http:// → ws://, https:// → wss://
        console.log('🔌 Connecting to WebSocket:', wsUrl);
        return new WebSocket(wsUrl);
      },
      debug: (str) => console.log('STOMP:', str),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        client.subscribe(`/topic/candle/${symbol}/USDT`, (msg) => {
          const candle = JSON.parse(msg.body);
          onNewCandle(candle);
        });
        subscribeToSymbol(symbol);
      },
      onStompError: (frame) => {
        console.error('❌ STOMP error:', frame);
      },
      onWebSocketClose: (evt) => {
        console.warn('⚠️ WebSocket closed:', evt);
      },
    });

    stompClientRef.current = client;
    client.activate();

    // Cleanup saat unmount atau symbol berubah
    return () => {
      if (stompClientRef.current) {
        console.log('CloseOperation STOMP for symbol:', symbol);
        stompClientRef.current.deactivate();
        stompClientRef.current = null;
      }
    };
  }, [symbol, onNewCandle, subscribeToSymbol]);
};
