import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import { useFormik } from "formik";

import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "@/features/ordersSlice";
import { AppDispatch, RootState } from "../store";
import Colors from "@/constants/Colors";
import {
  ORDER_TEXTS,
  ERROR_TEXTS,
  STATUS_TEXTS,
} from "@/constants/textConstants";
import { OrderType } from "@/interfaces";
import {
  initialValues,
  OrderSchema,
  handleCreateOrder,
} from "@/utils/formUtils";
import { FontAwesome } from "@expo/vector-icons";
import { formatCurrency } from "@/utils/financialUtils";

const CreateOrderModal = () => {
  const [showResult, setShowResult] = useState(false);
  const [seletedOrderType, setSelectedOrderType] = useState("BUY");
  const [amount, setAmount] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.orders);
  const params = useLocalSearchParams();
  const { id, name, last_price, close_price, returnPercentage } = params;
  const instrument_id = Array.isArray(id) ? id[0] : id;
  const formattedPrice = formatCurrency(Number(last_price));
  const isPositive = Number(returnPercentage) >= 0;
  const difPrice = (Number(last_price) - Number(close_price)).toFixed(2);

  const formik = useFormik({
    initialValues: initialValues(instrument_id),
    validationSchema: OrderSchema,
    onSubmit: async (values: OrderType) => {
      await handleCreateOrder(values, instrument_id, dispatch, createOrder);
    },
  });

  const { handleChange, handleBlur, setFieldValue, errors, touched, values } =
    formik;

  const { quantity, price } = values as { quantity: number; price: number };

  const handleSelectOrderType = (orderType: string) => {
    setSelectedOrderType(orderType);
    setFieldValue("side", orderType);
  };

  const isOrderTypeBuy = seletedOrderType === ORDER_TEXTS.BUY;
  const isOrderTypeSell = seletedOrderType === ORDER_TEXTS.SELL;
  const buttonTitle = isOrderTypeBuy ? "Comprar" : "Vender";
  const isLoading = status === STATUS_TEXTS.LOADING;
  const hasQuantityValue = quantity > 0;
  const isOrderMarket = values.type === ORDER_TEXTS.MARKET;
  const isOrderLimit = values.type === ORDER_TEXTS.LIMIT;

  // Función para actualizar la cantidad de acciones basado en el monto
  const handleAmountChange = (value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, "");
    setAmount(numericValue);
    if (numericValue && last_price) {
      const calculatedQuantity = Math.floor(
        parseFloat(value) / Number(last_price)
      );
      setStockQuantity(calculatedQuantity.toString());
      setFieldValue("quantity", calculatedQuantity); // Actualiza el valor en Formik
    } else {
      setStockQuantity("");
    }
  };

  // Función para actualizar el monto basado en la cantidad de acciones
  const handleQuantityChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setStockQuantity(numericValue);
    if (numericValue && last_price) {
      const calculatedAmount = (Number(value) * Number(last_price)).toFixed(2);
      setAmount(calculatedAmount);
      setFieldValue("quantity", Number(value)); // Actualiza el valor en Formik
    } else {
      setAmount("");
    }
  };

  useEffect(() => {
    if (status === STATUS_TEXTS.SUCCEEDED || status === STATUS_TEXTS.FAILED) {
      setShowResult(true);
    }
  }, [status]);

  return (
    <View style={styles.modalContainer}>
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
            <Text style={styles.changeValue}>AR$ {difPrice}</Text>
          </View>
        </View>
      </View>

      <View style={styles.orderTypeButtonsContainer}>
        <TouchableOpacity
          style={[styles.button, isOrderTypeSell && styles.sellButtonActive]}
          onPress={() => handleSelectOrderType(ORDER_TEXTS.SELL)}
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
          onPress={() => handleSelectOrderType(ORDER_TEXTS.BUY)}
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
      <View style={styles.content}>
        <Text style={styles.label}>¿Qué monto querés invertir?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={handleAmountChange}
            placeholder="AR$ 0,00"
            placeholderTextColor="#B0B3B5" // Color gris claro
            keyboardType="numeric"
          />
        </View>
        <Text style={styles.label}>Acciones aproximadas a recibir</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={stockQuantity}
            onChangeText={handleQuantityChange}
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
            onPress={() => setFieldValue("type", ORDER_TEXTS.MARKET)}
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
            onPress={() => setFieldValue("type", ORDER_TEXTS.LIMIT)}
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

        {values.type === ORDER_TEXTS.LIMIT && (
          <>
            <Text style={styles.label}>Precio</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder={ORDER_TEXTS.PRICE_PLACEHOLDER}
                keyboardType="numeric"
                value={price.toString()}
                onChangeText={handleChange("price")}
                onBlur={handleBlur("price")}
                style={styles.input}
              />
            </View>
          </>
        )}
        {touched.price && errors.price ? (
          <Text style={styles.error}>{errors.price}</Text>
        ) : null}

        <TouchableOpacity
          onPress={() => formik.handleSubmit()}
          disabled={isLoading}
          style={[
            styles.submmitButton,
            hasQuantityValue && styles.submitButtonActive,
          ]}
        >
          <Text style={styles.submmitButtonText}>{buttonTitle}</Text>
        </TouchableOpacity>
        {error && <Text style={styles.error}>{error}</Text>}

        {showResult && (
          <View>
            <Text>
              {ORDER_TEXTS.ORDER_STATUS}
              {status}
            </Text>
            <Text>
              {ORDER_TEXTS.ORDER_ID}
              {id}
            </Text>
            {error && <Text style={styles.errorText}>{error}</Text>}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    width: "100%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
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
    marginRight: 10, // Espacio entre los botones
  },
  buyButtonActive: {
    backgroundColor: "#28A745", // Color verde para "Comprar"
  },
  sellButtonActive: {
    backgroundColor: "#FF3B30",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  buttonTextSellInactive: {
    color: "#FF3B30",
  },
  buttonTextBuyInactive: {
    color: "#28A745",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#141518", // Color oscuro para el texto
    textAlign: "right", // Alinear texto a la derecha
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  error: {
    color: "red",
    marginVertical: 10,
  },
  submmitButton: {
    width: "100%",
    padding: 20,
    alignItems: "center",
    borderRadius: 5,
    justifyContent: "center",
    marginVertical: 40,
    backgroundColor: Colors.lightGray,
  },
  submmitButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  submitButtonActive: {
    backgroundColor: Colors.primary,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    paddingHorizontal: 4,
    marginVertical: 10,
    backgroundColor: "#E1F1FF",
    width: "36%",
    borderRadius: 30,
  },
  toggleButton: {
    flex: 1,
    borderRadius: 30,
    alignItems: "center",
  },
  inactiveButton: {
    backgroundColor: "#E1F1FF", // Azul claro para el botón inactivo
  },
  activeButton: {
    backgroundColor: "#0052A5", // Azul oscuro para el botón activo
  },
  ButtonText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  inactiveButtonText: {
    color: "#0052A5", // Azul oscuro para el texto del botón inactivo
  },
  activeButtonText: {
    color: Colors.white, // Blanco para el texto del botón activo
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: Colors.white, // Blanco para el fondo de la tarjeta
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
    color: "#0052A5", // Azul oscuro
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  priceText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0052A5", // Azul oscuro
  },
  currency: {
    fontSize: 16,
    color: "#626D77", // Gris para el texto "ARS"
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
    color: "#FF3B30", // Rojo para el cambio negativo
  },
  percentageChangePositive: {
    color: "#28A745", // Verde para el cambio positivo
  },
  changeValue: {
    fontSize: 16,
    color: "#28A745", // Verde para el valor de cambio
  },
  seeMoreContainer: {
    alignItems: "center",
  },
  seeMoreText: {
    fontSize: 16,
    color: "#0052A5", // Azul oscuro para "Ver más"
    marginTop: 4,
  },
  arrowIcon: {
    marginTop: 4,
    color: "#0052A5", // Azul oscuro para la flecha
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0052A5", // Azul oscuro para las etiquetas
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF", // Fondo blanco para el input
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E1F1FF", // Borde azul claro
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 16,
  },
});

export default CreateOrderModal;
