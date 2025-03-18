import { useEffect, useRef, useState } from "react";

import {
  WS_RETRY_ATTEMPTS,
  WS_RETRY_INTERVAL_MAX,
  WS_RETRY_INTERVAL_MIN,
} from "@/constants";

const useWebSocket = <TData extends Array<unknown> | Record<string, unknown>>(
  url: string,
  onMessage: (data: TData) => void,
) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [attempts, setAttempts] = useState(0);
  const reconnectTimeout = useRef<number | null>(null);

  useEffect(() => {
    if (!url) return;

    const socket: WebSocket | null = new WebSocket(
      process.env.NEXT_PUBLIC_BINANCE_WEBSOCKET + url,
    );
    setWs(socket);

    socket.onopen = () => {
      console.log("WebSocket connected:", url);
      setAttempts(0);
    };

    socket.onmessage = (event) => {
      try {
        const data: TData = JSON.parse(event.data);
        onMessage(data);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      socket?.close();
    };

    socket.onclose = (event) => {
      console.log("WebSocket closed:", event.reason);
      if (attempts < WS_RETRY_ATTEMPTS) {
        // Calculate random exponential backoff delay
        const baseDelay = Math.min(
          WS_RETRY_INTERVAL_MIN * Math.pow(2, attempts),
          WS_RETRY_INTERVAL_MAX,
        );
        const jitter = Math.random() * baseDelay;
        const delay = baseDelay + jitter;

        console.log(
          `Reconnecting attempt ${attempts + 1} in ${Math.round(delay)}ms...`,
        );

        reconnectTimeout.current = setTimeout(() => {
          setAttempts((prev) => prev + 1);
          setWs(new WebSocket(url));
        }, delay);
      }
    };

    return () => {
      console.log("Cleaning up WebSocket:", url);
      if (socket) {
        socket.onclose = null; // Prevent reconnect loop on manual close
        socket.close();
      }
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
    };
  }, [url]); // eslint-disable-line react-hooks/exhaustive-deps

  return ws;
};

export default useWebSocket;
