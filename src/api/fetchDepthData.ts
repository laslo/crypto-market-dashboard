import { DEFAULT_DEPTH, PairType } from "@/constants";
import { DepthResponse } from "@/types";

const fetchDepthData = async (symbol: PairType, limit = DEFAULT_DEPTH): Promise<DepthResponse> => {
  const params = new URLSearchParams({
    symbol: symbol.replace("/", ""),
    limit,
  });
  const response = await fetch(`${process.env.NEXT_PUBLIC_BINANCE_API}/depth?${params.toString()}`);
  return await response.json();
};

export default fetchDepthData;
