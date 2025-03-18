"use client";

import { useEffect, useState } from "react";

import fetchDepthData from "@/api/fetchDepthData";
import OrdersTable from "@/components/OrdersTable";
import { DEFAULT_DEPTH } from "@/constants";
import useWebSocket from "@/hooks/useWebSocket";
import mapDepthOrder from "@/pipes/mapDepthOrder";
import { DepthResponse, OrderType } from "@/types";

const OrderBook = ({ pair }: { pair: string }) => {
  const [bids, setBids] = useState<OrderType[] | null>([]);
  const [asks, setAsks] = useState<OrderType[] | null>([]);
  const [baseCurrency, quoteCurrency] = pair.split("/");

  useEffect(() => {
    if (!pair) return;

    fetchDepthData(pair).then((data) => {
      setBids(data.bids.map(mapDepthOrder));
      setAsks(data.asks.map(mapDepthOrder));
    });
  }, [pair]);

  // Real-time updates from the websocket
  useWebSocket<DepthResponse>(
    `/${pair.replace("/", "").toLowerCase()}@depth${DEFAULT_DEPTH}@100ms`,
    (data) => {
      setBids(data.bids.map(mapDepthOrder));
      setAsks(data.asks.map(mapDepthOrder));
    },
  );

  return (
    <div
      className="flex flex-col gap-4
                    grid grid-cols-2"
    >
      <section
        className="min-w-2xs border-gray-300 p-4
                  col-span-2
                  md:col-span-1
                  xl:col-span-2 xl:min-w-xs"
      >
        <OrdersTable
          title="Buy Orders"
          orders={bids || []}
          baseCurrency={baseCurrency}
          quoteCurrency={quoteCurrency}
          textColor="text-green-300"
          backgroundColor="bg-green-600"
        />
      </section>
      <section
        className="min-w-2xs border-gray-300 p-4
                  col-span-2
                  md:col-span-1
                  xl:col-span-2 xl:min-w-xs"
      >
        <OrdersTable
          title="Sell Orders"
          orders={asks || []}
          baseCurrency={baseCurrency}
          quoteCurrency={quoteCurrency}
          textColor="text-red-300"
          backgroundColor="bg-red-900"
        />
      </section>
    </div>
  );
};

export default OrderBook;
