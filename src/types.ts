import { SeriesDataItemTypeMap, Time } from "lightweight-charts";

export type OrderType = {
  price: number;
  volume: number;
};

export type RawOrderType = [string, string];

export type DepthResponse = {
  lastUpdateId: number;
  bids: RawOrderType[];
  asks: RawOrderType[];
};

/**
 * Represents OHLCV price data from REST API response.
 * @see https://developers.binance.com/docs/binance-spot-api-docs/rest-api/market-data-endpoints#klinecandlestick-data
 */
export type RawHistoricPrice = [
  number,
  string,
  string,
  string,
  string,
  string,
  number,
  string,
  number,
  string,
  string,
  string,
];

/**
 * Represents a OHLCV price data from an WS message.
 * @see https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams#klinecandlestick-streams-for-utc
 */
export type PriceMessage = {
  E: number;
  e: string;
  k: {
    B: string;
    L: number;
    Q: string;
    T: number;
    V: string;
    f: number;
    c: string;
    h: string;
    i: string;
    l: string;
    n: string;
    o: string;
    q: string;
    s: string;
    t: number;
    v: string;
    x: boolean;
  };
  s: string;
};

export type DepthMessage = {
  E: number;
  U: number;
  a: [string, string][];
  b: [string, string][];
  e: string;
  s: string;
  u: number;
};

export type CandlestickItem = SeriesDataItemTypeMap<Time>["Candlestick"];
