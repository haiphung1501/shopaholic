import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/product/productSlice";
import productDetailReducer from "./features/product/productDetailSlice";
import userReducer from "./features/user/userSlice";
const store = configureStore({
  reducer: {
    product: productReducer,
    productDetail: productDetailReducer,
    user: userReducer,
  },
});

export default store;
