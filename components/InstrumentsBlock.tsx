import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { InstrumentsType } from "@/interfaces";
import { useRouter } from "expo-router";
import { calculateReturn } from "@/utils/financialUtils";
import { defaultStyles } from "@/constants/Styles";
import { formatCurrency } from "@/utils/financialUtils";

const InstrumentsBlock = ({
  instruments,
}: {
  instruments: InstrumentsType[];
}) => {
  const router = useRouter();

  const handlePress = (instrument: InstrumentsType) => {
    router.push({
      pathname: "/(modals)/createOrderModal",
      params: { ...instrument },
    });
  };

  return (
    <View style={styles.contentLis}>
      {instruments.map((instrument, index) => {
        const isLastItem = index === instruments.length - 1;
        const returnPercentage = calculateReturn(
          instrument.last_price,
          instrument.close_price
        );
        const isPositive = returnPercentage >= 0;
        const isNeutral = returnPercentage === 0;
        const formattedPrice = formatCurrency(instrument.last_price);

        return (
          <TouchableOpacity
            style={[defaultStyles.blockItem, isLastItem && { borderBottomWidth: 0 }]}
            key={instrument.id}
            onPress={() => handlePress(instrument)}
          >
            <Text style={styles.ticker}>{instrument.ticker}</Text>
            <Text style={styles.name}>{instrument.name}</Text>
            <Text style={styles.price}>{formattedPrice}</Text>
            <Text
              style={[
                styles.return,
                isPositive && styles.positiveReturn,
                !isPositive && !isNeutral && styles.negativeReturn,
                isNeutral && styles.neutralReturn,
              ]}
            >
              {returnPercentage}%
            </Text>
          </TouchableOpacity>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  ticker: {
    flex: 2,
    textAlign: "left",
    fontSize: 16,
  },
  name: {
    flex: 3,
    textAlign: "left",
    fontSize: 16,
  },
  price: {
    flex: 2,
    textAlign: "right",
    fontSize: 16,
  },
  return: {
    flex: 2,
    textAlign: "right",
    fontSize: 16,
  },
  positiveReturn: {
    color: "green",
  },
  negativeReturn: {
    color: "red",
  },
  neutralReturn: {
    color: "gray",
  },
});

export default InstrumentsBlock;
