import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminGetAllProductsReq } from "../../apis/index";
const initialState = {
  products: [],
  productsCount: 0,
};

export const adminGetAllProduct = createAsyncThunk(
  "product/AdminGetAllProduct",
  async (arg, thunkAPI) => {
    try {
      const { data } = await adminGetAllProductsReq();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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
        minPrice: action.payload.minPrice,
        maxPrice: action.payload.maxPrice,
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
