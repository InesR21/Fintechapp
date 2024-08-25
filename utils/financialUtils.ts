import { PortfolioType } from "@/interfaces";

export const calculateReturn = (
  lastPrice: number,
  closePrice: number
): number => {
  if (closePrice === 0) {
    return 0;
  }
  const returnPercentage = ((lastPrice - closePrice) / closePrice) * 100;
  return parseFloat(returnPercentage.toFixed(2)); // Redondea a 2 decimales
};


export const calculateBalance = (portfolios: PortfolioType[]): string => {
  return portfolios
    .reduce((total, portfolio) => {
      return total + portfolio.quantity * portfolio.last_price;
    }, 0)
    .toFixed(2);
};


export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

// Función para calcular la ganancia total
export const calculateTotalProfit = (portfolios: PortfolioType[]): string => {
  const totalProfit = portfolios.reduce((total, portfolio) => {
    const profit = (portfolio.last_price - portfolio.avg_cost_price) * portfolio.quantity;
    return total + profit;
  }, 0);

  return totalProfit.toFixed(2);
};

// Función para calcular el rendimiento total ponderado
export const calculateTotalPerformance = (portfolios: PortfolioType[]): string => {
  const totalInvestment = portfolios.reduce((total, portfolio) => {
    return total + (portfolio.avg_cost_price * portfolio.quantity);
  }, 0);

  const totalMarketValue = portfolios.reduce((total, portfolio) => {
    return total + (portfolio.last_price * portfolio.quantity);
  }, 0);

  const totalPerformance = ((totalMarketValue - totalInvestment) / totalInvestment) * 100;

  return totalPerformance.toFixed(2);
};