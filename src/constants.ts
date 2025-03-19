export const WS_RETRY_INTERVAL_MIN = 1000;
export const WS_RETRY_INTERVAL_MAX = 30000;
export const WS_RETRY_ATTEMPTS = 3;

export const TOAST_DURATION = 3000;

export const pairsList = ["BTC/USDT", "ETH/USDT", "SOL/USDT", "XRP/USDT"];

export const intervalsList = ["1m", "3m", "5m", "15m", "30m", "1h", "2h", "4h", "6h"];

export type PairType = (typeof pairsList)[number];
export type IntervalType = (typeof pairsList)[number];

export const HISTORIC_PRICE_DATA_LENGTH = "500";

export const DEFAULT_DEPTH = "10";
