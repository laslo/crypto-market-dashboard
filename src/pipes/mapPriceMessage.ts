import { CandlestickItem, PriceMessage } from "@/types";

/**
 * Maps websocket message with OHLCV price to a candlestick for a chart.
 * @see https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams#klinecandlestick-streams-for-utc
 */
const mapPriceMessage = (message: PriceMessage) =>
  ({
    time: Math.floor(message.k.t / 1000),
    open: parseFloat(message.k.o),
    high: parseFloat(message.k.h),
    low: parseFloat(message.k.l),
    close: parseFloat(message.k.c),
    volume: parseFloat(message.k.v),
  }) as unknown as CandlestickItem;

export default mapPriceMessage;
