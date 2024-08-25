import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";

import InstrumentsBlock from "@/components/InstrumentsBlock";
import { useHeaderHeight } from "@react-navigation/elements";
import { useInstruments } from "@/hooks/useInstruments";
import CustomHeader from "@/components/CustomHeader";
import { useFilteredInstruments } from "@/hooks/useFilteredInstruments";

const Home = () => {
  const headerheight = useHeaderHeight();
  const { data: instruments = [], isLoading, error } = useInstruments();
  const { searchQuery, setSearchQuery, filteredInstruments } =
    useFilteredInstruments(instruments);
  const hasInstruments = filteredInstruments.length > 0;

  return (
    <>
      <CustomHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingTop: headerheight, paddingBottom: 100 }}
      >
        {isLoading && <Text style={defaultStyles.loadingText}>Loading...</Text>}
        {error && (
          <Text style={defaultStyles.errorText}>
            Error Loading Instruments Data
          </Text>
        )}
        {hasInstruments && (
          <>
            <Text style={defaultStyles.sectionHeader}>List Instruments</Text>

            <InstrumentsBlock instruments={filteredInstruments} />
          </>
        )}
        {!hasInstruments && (
          <Text style={defaultStyles.sectionHeader}>No instruments found</Text>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
  },
});

export default Home;
