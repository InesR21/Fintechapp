import { useState, useMemo } from "react";
import { InstrumentsType } from "@/interfaces";

export const useFilteredInstruments = (instruments: InstrumentsType[]) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredInstruments = useMemo(() => {
    if (!searchQuery) {
      return instruments;
    }
    return instruments.filter((instrument) =>
      instrument.ticker.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [instruments, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredInstruments,
  };
};
