import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { OrderType, ParamsInstruments } from "@/interfaces";
import { useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import {
  initialValues,
  OrderSchema,
  handleCreateOrder,
} from "@/utils/formUtils";
import { ORDER_TEXTS, STATUS_TEXTS } from "@/constants/textConstants";
import { AppDispatch, RootState } from "@/app/store";
import { resetOrder, createOrder } from "@/features/ordersSlice";

export const useOrderForm = () => {
  const [showResult, setShowResult] = useState(false);
  const [selectedOrderType, setSelectedOrderType] = useState("BUY");
  const [amount, setAmount] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const params = useLocalSearchParams();
  const dispatch = useDispatch<AppDispatch>();

  const { id, name, last_price, close_price, returnPercentage } =
    params as unknown as ParamsInstruments;

  const { status, error, lastOrder } = useSelector(
    (state: RootState) => state.orders
  );

  const formik = useFormik({
    initialValues: initialValues(id),
    validationSchema: OrderSchema,
    onSubmit: async (values: OrderType) => {
      await handleCreateOrder(values, id, dispatch, createOrder);
    },
  });

  const { setFieldValue, errors, touched, values } = formik;
  const { quantity, price } = values as { quantity: number; price: number };

  const handleSelectOrderType = (orderType: string) => {
    setSelectedOrderType(orderType);
    setFieldValue("side", orderType);
  };

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

  const handlePriceChange = (value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, "");
    setFieldValue("price", numericValue);
  };
  const handleChangeOrderType = (orderType: string) => {
    setFieldValue("type", orderType);
  };

  const handleShowForm = () => {
    console.log("handleShowForm");
    setAmount("");
    setStockQuantity("");
    formik.resetForm();
    dispatch(resetOrder());
    setShowResult(false);
  }

  const isOrderTypeBuy = selectedOrderType === ORDER_TEXTS.BUY;
  const isOrderTypeSell = selectedOrderType === ORDER_TEXTS.SELL;

  const buttonTitle = isOrderTypeBuy ? "Comprar" : "Vender";

  const isLoading = status === STATUS_TEXTS.LOADING;
  const hasQuantityValue = quantity > 0;
  const isOrderMarket = values.type === ORDER_TEXTS.MARKET;
  const isOrderLimit = values.type === ORDER_TEXTS.LIMIT;

  useEffect(() => {
    if (status === STATUS_TEXTS.SUCCEEDED || status === STATUS_TEXTS.FAILED) {
      setShowResult(true);
    }
  }, [status]);

  return {
    showResult,
    amount,
    stockQuantity,
    lastOrder,
    name,
    last_price,
    close_price,
    returnPercentage,
    status,
    error,
    formik,
    errors,
    touched,
    price,
    isOrderTypeBuy,
    isOrderTypeSell,
    buttonTitle,
    isLoading,
    hasQuantityValue,
    isOrderMarket,
    isOrderLimit,
    handleSelectOrderType,
    handleAmountChange,
    handleQuantityChange,
    handlePriceChange,
    handleChangeOrderType,
    handleShowForm
  };
};
