import { OrderType } from "@/interfaces";
import axios from "axios";

const BASE_URL = "https://dummy-api-topaz.vercel.app";

export const dummyApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getInstruments = async () => {
    const response = await dummyApi.get("/instruments");
    return response.data;
};


export const getPortfolio = async () => {
    const response = await dummyApi.get("/portfolio");
    return response.data;
}

export const sendOrder = async (orderData: OrderType) => {
  console.log("sendOrder", orderData);
  const response = await dummyApi.post("/orders", orderData);
  return response.data;
};