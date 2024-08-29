import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { formatCurrency } from "@/utils/financialUtils";
import Colors from "@/constants/Colors";

type StockInfoCardProps = {
  name: string;
  last_price: number;
  close_price: number;
  returnPercentage: number;
};

const StockInfoCard = ({
  name,
  last_price,
  close_price,
  returnPercentage,
}: StockInfoCardProps) => {
  const formattedPrice = formatCurrency(last_price);
  const isPositive = returnPercentage >= 0;
  const difPrice = (last_price - close_price).toFixed(2);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.infoContainer}>
        <Text style={styles.companyName}>{name}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>
          {formattedPrice} <Text style={styles.currency}>ARS</Text>
        </Text>
        <View style={styles.percentageChangeContainer}>
          <Text
            style={[
              styles.percentageChange,
              isPositive
                ? styles.percentageChangePositive
                : styles.percentageChangeNegative,
            ]}
          >
            ↑ {returnPercentage}%
          </Text>
          <Text
            style={[
              styles.changeValue,
              isPositive
                ? styles.percentageChangePositive
                : styles.percentageChangeNegative,
            ]}
          >
            AR$ {difPrice}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    marginVertical: 10,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginRight: 10,
  },
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  priceText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
  },
  currency: {
    fontSize: 16,
    color: Colors.gray,
  },
  percentageChangeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  percentageChange: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  percentageChangeNegative: {
    color: Colors.danger,
  },
  percentageChangePositive: {
    color: Colors.success,
  },
  changeValue: {
    fontSize: 16,
    color: Colors.success,
  }
});

export default StockInfoCard;
