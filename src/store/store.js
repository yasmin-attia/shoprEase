import { configureStore } from "@reduxjs/toolkit";
import theUser from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";
export const store = configureStore({
  reducer: {
    user: theUser,
    cart: cartReducer,
  },
});
