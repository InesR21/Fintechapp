import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { PortfolioType } from "@/interfaces";
import { defaultStyles } from "@/constants/Styles";
import { formatCurrency } from "@/utils/financialUtils";

const PortfoliosBlock = ({ portfolios }: { portfolios: PortfolioType[] }) => {
  return (
    <View style={styles.contentLis}>
      {portfolios.map((portfolio: PortfolioType, index: number) => {
        const isLastItem = index === portfolios.length - 1;
        const marketValue = (portfolio.quantity * portfolio.last_price).toFixed(
          2
        );

        const profit = (
          (portfolio.last_price - portfolio.avg_cost_price) *
          portfolio.quantity
        ).toFixed(2);

        const totalPerformance = (
          ((portfolio.last_price - portfolio.avg_cost_price) /
            portfolio.avg_cost_price) *
          100
        ).toFixed(2);

        const isProfitPositive = Number(profit) >= 0;
        const isTotalPerformancePositive = Number(totalPerformance) >= 0;
        const fortmattedMarketValue = formatCurrency(Number(marketValue));
        const formattedProfit = formatCurrency(Number(profit));

        return (
          <View
            key={`${portfolio.instrument_id}-${index}`}
            style={[
              defaultStyles.blockItem,
              isLastItem && { borderBottomWidth: 0 },
            ]}
          >
            <Text style={styles.ticker}>{portfolio.ticker}</Text>
            <Text style={styles.quantity}>{portfolio.quantity}</Text>
            <Text style={styles.lastPrice}>{fortmattedMarketValue}</Text>
            <Text
              style={[
                styles.profit,
                isProfitPositive ? styles.positive : styles.negative,
              ]}
            >
              {formattedProfit}
            </Text>
            <Text
              style={[
                styles.totalPerformance,
                isTotalPerformancePositive ? styles.positive : styles.negative,
              ]}
            >
              {totalPerformance}%
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  contentLis: {
    ...defaultStyles.block,
    marginVertical: 20,
  },
  ticker: {
    flex: 2,
    textAlign: "left",
  },
  quantity: {
    flex: 1,
    textAlign: "left",
  },
  lastPrice: {
    flex: 3,
    textAlign: "center",
  },
  profit: {
    flex: 3,
    textAlign: "center",
  },
  totalPerformance: {
    flex: 2,
    textAlign: "right",
  },
  positive: {
    color: "green",
  },
  negative: {
    color: "red",
  },
});

export default PortfoliosBlock;
