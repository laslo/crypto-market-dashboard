import { CandlestickItem, RawHistoricPrice } from "@/types";

/**
 * Maps OHLCV price from REST API response to a candlestick for a chart.
 * @see https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams#klinecandlestick-streams-for-utc
 */
const mapHistoricPrice = ([
  time,
  open,
  high,
  low,
  close,
  volume,
]: RawHistoricPrice) =>
  ({
    time: Math.floor(time / 1000),
    open: parseFloat(open),
    high: parseFloat(high),
    low: parseFloat(low),
    close: parseFloat(close),
    volume: parseFloat(volume),
  }) as unknown as CandlestickItem;

export default mapHistoricPrice;
