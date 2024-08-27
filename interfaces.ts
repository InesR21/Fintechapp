interface InstrumentsType {
  id: number;
  ticker: string;
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



export { InstrumentsType, PortfolioType, OrderType };

