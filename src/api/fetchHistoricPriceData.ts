import { HISTORIC_PRICE_DATA_LENGTH, IntervalType, PairType } from "@/constants";
import { RawHistoricPrice } from "@/types";

const fetchHistoricPriceData = async (
  symbol: PairType,
  interval: IntervalType,
  limit = HISTORIC_PRICE_DATA_LENGTH,
): Promise<RawHistoricPrice[]> => {
  const params = new URLSearchParams({
    symbol: symbol.replace("/", ""),
    interval,
    limit,
  });
  const response = await fetch(`${process.env.NEXT_PUBLIC_BINANCE_API}/klines?${params.toString()}`);
  return await response.json();
};

export default fetchHistoricPriceData;
