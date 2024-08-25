import { useQuery } from "@tanstack/react-query";
import { getInstruments } from "@/api/dummyApi";
import { InstrumentsType } from "@/interfaces";

export const useInstruments = () => {
  const { data, isLoading, error } = useQuery<InstrumentsType[]>({
    queryKey: ["instruments"],
    queryFn: getInstruments,
  });

  return { data, isLoading, error };
};
