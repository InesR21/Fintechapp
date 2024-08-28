
interface InstrumentsType {
  id?: number;
  ticker?: string;
  name: string;
  type: string;
  last_price: number;
  close_price: number;
}


interface PortfolioType {
  instrument_id: number;
  ticker: string;
  quantity: number;
  last_price: number;
  close_price: number;
  avg_cost_price: number;
}

interface OrderType {
  instrument_id: number | string;
  side: string;
  type: string;
  quantity: number | string;
  price?: number | string;
}

interface OrderResponse {
  instrument_id?: string;
  side: "BUY" | "SELL";
  type: "MARKET" | "LIMIT";
  quantity: number;
  id: number;
  price: number;
  status: "FILLED" | "PENDING";
}


type ParamsInstruments = {
  id: string;
  name: string;
  last_price: number;
  close_price: number;
  returnPercentage: number;
};

interface LastOrderType {
  id: number | null;
  side: string | null;
  type: string  | null;
  quantity: number  | null;
  price: number  | null;
  status: string  | null;
}

export {
  InstrumentsType,
  PortfolioType,
  OrderType,
  OrderResponse,
  ParamsInstruments,
  LastOrderType,
};

