import { OrderType, RawOrderType } from "@/types";

const mapHistoricPrice = ([price, volume]: RawOrderType): OrderType => ({
  price: parseFloat(price),
  volume: parseFloat(volume),
});

export default mapHistoricPrice;
