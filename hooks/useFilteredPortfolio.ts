import { useState, useMemo } from "react";
import { PortfolioType } from "@/interfaces";

export const useFilteredPortfolio = (portfolios: PortfolioType[]) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPortfolios = useMemo(() => {
    if (!searchQuery) {
      return portfolios;
    }
    return portfolios.filter((portfolio) =>
      portfolio.ticker.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [portfolios, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredPortfolios,
  };
};
