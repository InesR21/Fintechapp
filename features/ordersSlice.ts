import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendOrder } from "../api/dummyApi";
import { OrderType } from "@/interfaces";

interface OrdersState {
  orders: OrderType[];
  status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
    id: number | null;
    price: number | null;

}

const initialState: OrdersState = {
  orders: [],
  status: "idle",
    error: null,
    id: null,
    price: null,
};

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData: OrderType, { rejectWithValue }) => {
    try {
      const response = await sendOrder(orderData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
          state.status = "loading";

      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
        state.status = "succeeded";
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default orderSlice.reducer;
