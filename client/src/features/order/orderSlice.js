import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllOrdersReq } from "../../apis/index";

export const getAllOrders = createAsyncThunk(
  "order/getAllOrders",
  async (arg, thunkAPI) => {
    try {
      const { data } = await getAllOrdersReq();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllOrders.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    });
    builder.addCase(getAllOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default orderSlice.reducer;
