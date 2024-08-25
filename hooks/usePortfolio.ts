import { useQuery } from "@tanstack/react-query";
import { getPortfolio } from "@/api/dummyApi";
import { PortfolioType } from "@/interfaces";

export const usePortfolio = () => {
  const { data, isLoading, error } = useQuery<PortfolioType[]>({
    queryKey: ["portfolio"],
    queryFn: getPortfolio,
  });

  return { data, isLoading, error };
};
