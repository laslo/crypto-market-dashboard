"use client";

import { CandlestickSeries, createChart, IChartApi, ISeriesApi, TimeChartOptions } from "lightweight-charts";
import { useEffect, useRef, useState } from "react";

import fetchHistoricPriceData from "@/api/fetchHistoricPriceData";
import { useToast } from "@/components/ToastProvider";
import { IntervalType, PairType } from "@/constants";
import useWebSocket from "@/hooks/useWebSocket";
import mapHistoricPrice from "@/pipes/mapHistoricPrice";
import mapPriceMessage from "@/pipes/mapPriceMessage";
import { chartLayoutStyles, gridStyles } from "@/styles/chart.styles";
import { PriceMessage } from "@/types";

type PriceChartProps = {
  pair: PairType;
  interval: IntervalType;
};

const PriceChart = ({ pair, interval }: PriceChartProps) => {
  const [_loading, setLoading] = useState(false);
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const resizeObserver = useRef<ResizeObserver | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!pair || !chartContainerRef.current) return;

    // Create a chart pane with one candlestick series
    chartRef.current = createChart(chartContainerRef.current, {
      autoSize: true,
      layout: chartLayoutStyles,
      grid: gridStyles,
    } as unknown as TimeChartOptions);
    seriesRef.current = chartRef.current.addSeries(CandlestickSeries);

    // Fulfill the chart with a historic values from the API
    setLoading(true);
    fetchHistoricPriceData(pair, interval).then((priceData) => {
      const mappedData = priceData.map(mapHistoricPrice);
      seriesRef.current?.setData(mappedData);
      setLoading(false);
    });

    // Observe container resize
    resizeObserver.current = new ResizeObserver(() => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
      }
    });
    resizeObserver.current.observe(chartContainerRef.current);

    return () => {
      chartRef.current?.remove();
      resizeObserver.current?.disconnect();
    };
  }, [pair, interval]);

  // Real-time updates from the websocket
  useWebSocket<PriceMessage>(
    `/${pair.replace("/", "").toLowerCase()}@kline_${interval}`,
    (data) => {
      seriesRef.current?.update(mapPriceMessage(data));
    },
    {
      onOpen: () => toast("Connected to price live updates", "success"),
      onClose: () => toast("Disconnected from price live updates", "error"),
      onReconnect: () => toast("Reconnecting to price live updates..."),
      onError: () => toast("Error connecting to price live updates", "error"),
    },
  );

  return <div ref={chartContainerRef} className="w-full h-full" />;
};

export default PriceChart;
