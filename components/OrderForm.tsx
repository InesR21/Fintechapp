import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ORDER_TEXTS } from "@/constants/textConstants";
import Colors from "@/constants/Colors";

type OrderFormProps = {
  amount: string;
  stockQuantity: string;
  onAmountChange: (text: string) => void;
  onQuantityChange: (text: string) => void;
  isOrderTypeBuy: boolean;
  isOrderMarket: boolean;
  isOrderLimit: boolean;
  price: number;
  errors: any;
  touched: any;
  handleChangeInputPrice: (field: string) => void;
  handleChangeOrderType: (orderType: string) => void;
};

const OrderForm = ({
  amount,
  stockQuantity,
  onAmountChange,
  onQuantityChange,
  isOrderTypeBuy,
  isOrderMarket,
  isOrderLimit,
  price,
  errors,
  touched,
  handleChangeInputPrice,
  handleChangeOrderType,
}: OrderFormProps) => {

  const labelPriceTitle = isOrderTypeBuy
    ? "¿Qué monto querés invertir?"
    : "Monton aproximado a recibir";
  const labelQuantityTitle = isOrderTypeBuy
    ? "Acciones aproximadas a recibir"
    : "¿Cuantas Acciones querés vender?";

  return (
    <View>
      <Text style={styles.label}>{labelPriceTitle}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={onAmountChange}
          placeholder="AR$ 0,00"
          keyboardType="numeric"
        />
      </View>
      <Text style={styles.label}>{labelQuantityTitle}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={stockQuantity}
          onChangeText={onQuantityChange}
          placeholder={ORDER_TEXTS.QUANTITY_PLACEHOLDER}
          keyboardType="numeric"
        />
      </View>
      {touched.quantity && errors.quantity ? (
        <Text style={styles.error}>{errors.quantity}</Text>
      ) : null}

      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            isOrderMarket ? styles.activeButton : styles.inactiveButton,
          ]}
          onPress={() => handleChangeOrderType(ORDER_TEXTS.MARKET)}
        >
          <Text
            style={[
              styles.ButtonText,
              isOrderMarket
                ? styles.activeButtonText
                : styles.inactiveButtonText,
            ]}
          >
            Mercado
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            isOrderLimit ? styles.activeButton : styles.inactiveButton,
          ]}
          onPress={() => handleChangeOrderType(ORDER_TEXTS.LIMIT)}
        >
          <Text
            style={[
              styles.ButtonText,
              isOrderLimit
                ? styles.activeButtonText
                : styles.inactiveButtonText,
            ]}
          >
            Límite
          </Text>
        </TouchableOpacity>
      </View>

      {isOrderLimit && (
        <>
          <Text style={styles.label}>Precio</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder={ORDER_TEXTS.PRICE_PLACEHOLDER}
              keyboardType="numeric"
              value={price.toString()}
              onChangeText={(value) =>
                handleChangeInputPrice(value)
              }
              style={styles.input}
            />
          </View>
        </>
      )}
      {touched.price && errors.price ? (
        <Text style={styles.error}>{errors.price}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.blueLight,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.dark,
    textAlign: "right",
  },
  error: {
    color: "red",
    marginVertical: 10,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    paddingHorizontal: 4,
    marginVertical: 10,
    backgroundColor: Colors.blueLight,
    width: "36%",
    borderRadius: 30,
  },
  inactiveButton: {
    backgroundColor: Colors.blueLight,
  },
  activeButton: {
    backgroundColor: Colors.primary,
  },
  toggleButton: {
    flex: 1,
    borderRadius: 30,
    alignItems: "center",
  },
  ButtonText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  inactiveButtonText: {
    color: Colors.primary,
  },
  activeButtonText: {
    color: Colors.white,
  },
});

export default OrderForm;
