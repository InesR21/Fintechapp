import { OrderType } from "@/interfaces";
import { Alert } from "react-native";
import * as Yup from "yup";

export const initialValues = (instrument_id: string) => ({
  instrument_id,
  side: "BUY",
  type: "MARKET",
  quantity: "",
  price: "",
});

export const OrderSchema = Yup.object().shape({
  side: Yup.string().oneOf(["BUY", "SELL"]).required("Required"),
  type: Yup.string().oneOf(["MARKET", "LIMIT"]).required("Required"),
  quantity: Yup.number()
    .positive("Must be positive")
    .integer("Must be an integer")
    .required("Required"),
  price: Yup.number().when("orderType", {
    is: "LIMIT",
    then: (schema) => schema.positive("Must be positive").required("Required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});


  export const handleCreateOrder = async (
    values: OrderType,
    instrument_id: string,
    dispatch: any,
    createOrder: any
  ) => {
    try {
      const response = await dispatch(
        createOrder({
          instrument_id,
          side: values.side,
          type: values.type,
          quantity: values.quantity,
          price: values.price ? values.price : undefined,
        })
      );
    } catch (error) {
      Alert.alert("Error:", (error as Error).message);
    }
  };