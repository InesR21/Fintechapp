import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { PortfolioType } from "@/interfaces";
import { defaultStyles } from "@/constants/Styles";
import { usePortfolio } from "@/hooks/usePortfolio";
import CustomHeader from "@/components/CustomHeader";
import { useFilteredPortfolio } from "@/hooks/useFilteredPortfolio";
import PortfoliosBlock from "@/components/PortfoliosBlock";
import {
  calculateBalance,
  formatCurrency,
  calculateTotalProfit,
  calculateTotalPerformance,
} from "@/utils/financialUtils";
import Colors from "@/constants/Colors";

const Portfolio = () => {
  const { data: Portfoliolist = [], isLoading, error } = usePortfolio();
  const { searchQuery, setSearchQuery, filteredPortfolios } =
    useFilteredPortfolio(Portfoliolist);

  const hasPortfolios = filteredPortfolios.length > 0;
  const balance = calculateBalance(Portfoliolist);
  const formattedBalance = formatCurrency(parseFloat(balance));
  const totalProfit = calculateTotalProfit(Portfoliolist);
  const formatTotalProfit = formatCurrency(parseFloat(totalProfit));
  const totalPerformance = calculateTotalPerformance(Portfoliolist);
  const isPositiveProfit = Number(totalProfit) >= 0;
  const isPositivePerformance = Number(totalPerformance) >= 0;

  return (
    <>
      <CustomHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ScrollView>
        <View style={styles.account}>
          <View style={styles.row}>
            <Text style={styles.balance}>{formattedBalance}</Text>
          </View>
          <Text style={styles.currency}>
            <Text style={isPositiveProfit ? styles.positive : styles.negative}>
              {formatTotalProfit}
            </Text>
            <Text> / </Text>
            <Text
              style={isPositivePerformance ? styles.positive : styles.negative}
            >
              {totalPerformance}%
            </Text>
          </Text>
        </View>

        {isLoading && <Text style={defaultStyles.loadingText}>Loading...</Text>}
        {error && (
          <Text style={defaultStyles.errorText}>
            Error loading portfolio data
          </Text>
        )}
        {/* Datos de los instrumentos */}
        {hasPortfolios && <PortfoliosBlock portfolios={filteredPortfolios} />}
        {!hasPortfolios && (
          <Text style={defaultStyles.sectionHeader}>No Portfolios Found</Text>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  account: {
    margin: 20,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    marginBottom: 5,
  },
  balance: {
    fontSize: 50,
    fontWeight: "bold",
    color: Colors.dark,
  },
  currency: {
    fontSize: 18,
    fontWeight: "500",
  },
  positive: {
    color: "green",
  },
  negative: {
    color: "red",
  },
});

export default Portfolio;
