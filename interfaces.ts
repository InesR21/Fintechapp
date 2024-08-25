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




export { InstrumentsType, PortfolioType };

