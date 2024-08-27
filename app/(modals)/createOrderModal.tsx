import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import { useFormik } from "formik";

import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "@/features/ordersSlice";
import { AppDispatch, RootState } from "../store";
import Colors from "@/constants/Colors";
import { ORDER_TEXTS, ERROR_TEXTS, STATUS_TEXTS } from "@/constants/textConstants";
import { OrderType } from "@/interfaces";
import {
  initialValues,
  OrderSchema,
  handleCreateOrder,
} from "@/utils/formUtils";

const CreateOrderModal = () => {
  const [showResult, setShowResult] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.orders);
  const params = useLocalSearchParams();
  const { id, ticker, name, type, last_price, close_price } = params;
  const instrument_id = Array.isArray(id) ? id[0] : id;

  const formik = useFormik({
    initialValues: initialValues(instrument_id),
    validationSchema: OrderSchema,
    onSubmit: async (values: OrderType) => {
      await handleCreateOrder(values, instrument_id, dispatch, createOrder);
    },
  });

  const { handleChange, handleBlur, setFieldValue, errors, touched, values } = formik;

  const { quantity, price } = values as { quantity: number; price: number };

  useEffect(() => {
    if (status === STATUS_TEXTS.SUCCEEDED || status === STATUS_TEXTS.FAILED) {
      setShowResult(true);
    }
  }, [status]);

  return (
    <View style={styles.modalContainer}>
      <Text>{ORDER_TEXTS.ORDER_TYPE}</Text>
      <View style={styles.buttons}>
        <Button
          title={ORDER_TEXTS.BUY}
          onPress={() => setFieldValue("side", ORDER_TEXTS.BUY)}
        />
        <Button
          title={ORDER_TEXTS.SELL}
          onPress={() => setFieldValue("type", ORDER_TEXTS.SELL)}
        />
      </View>

      <Text>{ORDER_TEXTS.ORDER_METHOD}</Text>
      <View style={styles.buttons}>
        <Button
          title={ORDER_TEXTS.MARKET}
          onPress={() => setFieldValue("type", ORDER_TEXTS.MARKET)}
        />
        <Button
          title={ORDER_TEXTS.LIMIT}
          onPress={() => setFieldValue("type", ORDER_TEXTS.LIMIT)}
        />
      </View>

      <TextInput
        placeholder={ORDER_TEXTS.QUANTITY_PLACEHOLDER}
        keyboardType="numeric"
        value={quantity.toString()}
        onChangeText={handleChange("quantity")}
        onBlur={handleBlur("quantity")}
        style={styles.input}
      />
      {touched.quantity && errors.quantity ? (
        <Text style={styles.error}>{errors.quantity}</Text>
      ) : null}

      {values.type === ORDER_TEXTS.LIMIT && (
        <TextInput
          placeholder={ORDER_TEXTS.PRICE_PLACEHOLDER}
          keyboardType="numeric"
          value={price.toString()}
          onChangeText={handleChange("price")}
          onBlur={handleBlur("price")}
          style={styles.input}
        />
      )}
      {touched.price && errors.price ? (
        <Text style={styles.error}>{errors.price}</Text>
      ) : null}

      <Button
        title={ORDER_TEXTS.SUBMIT_ORDER}
        onPress={() => formik.handleSubmit()}
        disabled={status === "loading"}
      />
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
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: Colors.background,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: "100%",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  error: {
    color: "red",
    marginVertical: 10,
  },
});

export default CreateOrderModal;
