import React from "react";

import { OrderType } from "@/types";

type OrderBookTableProps = {
  title: string;
  orders: OrderType[];
  baseCurrency: string;
  quoteCurrency: string;
  textColor: string;
  backgroundColor: string;
};

const OrdersTable = ({
  title,
  orders,
  baseCurrency,
  quoteCurrency,
  textColor,
  backgroundColor,
}: OrderBookTableProps) => {
  const totalVolume = orders.reduce((total, order) => total + order.volume, 0);

  return (
    <>
      <h2 className={`text-lg font-semibold ${textColor} mb-4`}>{title}</h2>
      <table className="table-auto w-full relative">
        <thead>
          <tr>
            <th></th>
            <th className="text-left text-sm font-medium text-gray-500 py-2 px-4">
              Price ({quoteCurrency})
            </th>
            <th className="text-left text-sm font-medium text-gray-500 py-2 px-4">
              Amount ({baseCurrency})
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => {
            const volumePercentage = (order.volume / totalVolume) * 100;

            return (
              <tr key={index} className="relative">
                {/* Background visualization */}
                <td
                  className={`absolute inset-0 ${backgroundColor} opacity-50`}
                  style={{
                    width: `${volumePercentage}%`,
                  }}
                ></td>
                {/* Price */}
                <td className={`${textColor} py-2 px-4 relative z-10`}>
                  {order.price.toFixed(2)}
                </td>
                {/* Volume */}
                <td className="text-gray-400 py-2 px-4 relative z-10">
                  {order.volume.toFixed(4)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default OrdersTable;
