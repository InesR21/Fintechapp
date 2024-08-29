import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { sendOrder } from "../api/dummyApi";
import { OrderResponse, OrderType } from "@/interfaces";

interface OrdersState {
  orders: OrderResponse[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  id: number | null;
  price: number | null;
  lastOrder: {
    id: number | null;
    side: "BUY" | "SELL" | null;
    type: "MARKET" | "LIMIT" | null;
    quantity: number | null;
    price: number | null;
    status: "FILLED" | "PENDING" | null;
  };
}

const initialState: OrdersState = {
  orders: [],
  status: "idle",
  error: null,
  id: null,
  price: null,
  lastOrder: {
    id: null,
    side: null,
    type: null,
    quantity: null,
    price: null,
    status: null,
  },
};

export const createOrder = createAsyncThunk<
  OrderResponse,
  OrderType,
  { rejectValue: string }>(
    "orders/createOrder",
    async (orderData, { rejectWithValue }) => {
  try {
    const response = await sendOrder(orderData);
    return response as OrderResponse;
  } catch (error) {
   return rejectWithValue((error as Error).message);
  }
});

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.lastOrder = {
        id: null,
        side: null,
        type: null,
        quantity: null,
        price: null,
        status: null,
      };
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        createOrder.fulfilled,
        (state, action: PayloadAction<OrderResponse>) => {
          state.orders.push(action.payload);
          state.status = "succeeded";
          state.lastOrder = {
            id: action.payload.id,
            side: action.payload.side,
            type: action.payload.type,
            quantity: action.payload.quantity,
            price: action.payload.price,
            status: action.payload.status,
          };
        }
      )
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "An error occurred";
      });
  },
});

export const { resetOrder } = orderSlice.actions;

export default orderSlice.reducer;
