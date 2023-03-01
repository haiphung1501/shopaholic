import { createSlice } from "@reduxjs/toolkit";
import { createOrderReq } from "../../apis/index";

const initialState = {
  order: null,
  error: null,
  loading: false,
  success: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    createOrderRequest: (state, action) => {
      state.loading = true;
    },
    createOrderSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.order = action.payload;
    },
    createOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.order = null;
    },
  },
});

export const { createOrderRequest, createOrderSuccess, createOrderFail } =
  orderSlice.actions;

//Actions

export const createOrderAction = (order) => async (dispatch) => {
  try {
    dispatch(createOrderRequest());
    const { data } = await createOrderReq(order);
    dispatch(createOrderSuccess(data));
  } catch (error) {
    dispatch(
      createOrderFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
export default orderSlice.reducer;
