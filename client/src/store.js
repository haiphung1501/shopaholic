import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./components/Product/productSlice";
import productDetailReducer from "./components/Product/productDetailSlice";
const store = configureStore({
  reducer: {
    product: productReducer,
    productDetail: productDetailReducer,
  },
});

export default store;
