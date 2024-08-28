import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ORDER_TEXTS } from "@/constants/textConstants";
import { LastOrderType } from "@/interfaces";

type ResultDisplayProps = {
  lastOrder: LastOrderType;
  error: string;
};

const ResultDisplay = ({ lastOrder, error }: ResultDisplayProps) => {
  const {
    id: lastOrderId,
    side: lastOrderSide,
    type: lastOrderType,
    quantity: lastOrderQuantity,
    price: lastOrderPrice,
    status: lastOrderStatus,
  } = lastOrder;

  return (
    <View style={styles.content}>
      <Text>
        {ORDER_TEXTS.ORDER_STATUS}
        {lastOrderStatus}
      </Text>
      <Text>
        {ORDER_TEXTS.ORDER_ID}
        {lastOrderId}
      </Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    width: "100%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default ResultDisplay;
