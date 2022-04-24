import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../redux/reducers/user";
import { productReducer } from "../redux/reducers/products";
import { cartReducer } from "../redux/reducers/cart";

const store = configureStore({
    reducer: {
      user: userReducer,
      products: productReducer,
      cart: cartReducer
    },
  });


export default store;