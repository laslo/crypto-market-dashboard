"use client";

import { useState } from "react";

import OrderBook from "@/components/OrderBook";
import PriceChart from "@/components/PriceChart";
import SelectBox from "@/components/SelectBox";
import { intervalsList, IntervalType, pairsList, PairType } from "@/constants";

export default function Home() {
  const [pair, setPair] = useState<PairType>(pairsList[0]);
  const [interval, setInterval] = useState<IntervalType>(intervalsList[0]);

  return (
    <div className="min-h-screen flex flex-col p-4">
      <header className="flex flex-col md:flex-row md:items-center md:gap-4">
        <h1 className="text-2xl font-bold">Market Data | {pair}</h1>
        <div className="flex flex-1 justify-between md:justify-start md:mt-2 md:space-x-4">
          <SelectBox options={pairsList.map((pair) => ({ label: pair, value: pair }))} onChange={setPair} />
          <SelectBox
            options={intervalsList.map((pair) => ({
              label: pair,
              value: pair,
            }))}
            onChange={setInterval}
          />
        </div>
      </header>

      <main
        className="flex-1 grid gap-4
                  sm:grid-cols-1 sm:grid-rows-2
                  xl:grid-cols-4
                  2xl:grid-cols-5"
      >
        <section
          className="p-4
                    min-h-96
                    xl:col-span-3
                    2xl:col-span-4"
        >
          <PriceChart pair={pair} interval={interval} />
        </section>

        <section className="xl:col-span-1">
          <OrderBook pair={pair} />
        </section>
      </main>
    </div>
  );
}
