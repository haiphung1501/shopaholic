import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  productsCount: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    allProductFailed: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },

    allProductRequest: (state) => {
      return {
        loading: true,
        product: [],
      };
    },

    allProductSuccess: (state, action) => {
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
      };
    },
    clearError: (state) => {
      return {
        ...state,
        error: null,
      };
    },
  },
});

export const {
  allProductFailed,
  allProductRequest,
  allProductSuccess,
  clearError,
} = productSlice.actions;

export default productSlice.reducer;
