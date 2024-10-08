import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { ORDER_TEXTS } from "@/constants/textConstants";
import Colors from "@/constants/Colors";

type OrderTypeButtonsProps = {
  onSelectOrderType: (orderType: string) => void;
    isOrderTypeBuy: boolean;
    isOrderTypeSell: boolean;
};


const OrderTypeButtons = ({
  onSelectOrderType,
    isOrderTypeSell,
    isOrderTypeBuy,
}: OrderTypeButtonsProps) => {

  return (
    <View style={styles.orderTypeButtonsContainer}>
      <TouchableOpacity
        style={[styles.button, isOrderTypeSell && styles.sellButtonActive]}
        onPress={() => onSelectOrderType(ORDER_TEXTS.SELL)}
      >
        <Text
          style={[
            styles.buttonText,
            !isOrderTypeSell && styles.buttonTextSellInactive,
          ]}
        >
          Vender
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, isOrderTypeBuy && styles.buyButtonActive]}
        onPress={() => onSelectOrderType(ORDER_TEXTS.BUY)}
      >
        <Text
          style={[
            styles.buttonText,
            !isOrderTypeBuy && styles.buttonTextBuyInactive,
          ]}
        >
          Comprar
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // ... (existing styles for OrderTypeButtons)
  orderTypeButtonsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    marginVertical: 20,
    backgroundColor: "white",
    borderRadius: 30,
    padding: 5,
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 30,
    alignItems: "center",
  },
  buyButton: {
    marginRight: 10,
  },
  buyButtonActive: {
    backgroundColor: Colors.success,
  },
  sellButtonActive: {
    backgroundColor: Colors.danger,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.white,
  },
  buttonTextSellInactive: {
    color: Colors.danger,
  },
  buttonTextBuyInactive: {
    color: Colors.success,
  },
});


export default OrderTypeButtons;
