import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const items = JSON.parse(localStorage.getItem("cart")) || [];
const totalAmount = items.reduce(
  (acc, curr) => acc + curr.quantity * curr.price,
  0,
);

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    items,
    totalAmount,
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      const item = state.items.find((item) => item.id === product.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }

      cartSlice.caseReducers.calcTotalAmount(state);
      localStorage.setItem("cart", JSON.stringify(state.items));
      toast.success("Product Added!");
    },
    removeFromCart: (state, action) => {
      const index = action.payload;
      state.items.splice(index, 1);

      cartSlice.caseReducers.calcTotalAmount(state);
      localStorage.setItem("cart", JSON.stringify(state.items));

      toast.success("Product Removed!");
    },

    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;

      localStorage.removeItem("cart");
    },

    calcTotalAmount: (state) => {
      state.totalAmount = state.items.reduce(
        (acc, curr) => acc + curr.quantity * curr.price,
        0,
      );
    },

    increaseQty: (state, action) => {
      const item = action.payload;
      const { id, stock } = item;

      const product = state.items.find((product) => product.id == id);
      if (product && product.quantity < stock) {
        product.quantity++;

        cartSlice.caseReducers.calcTotalAmount(state);
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    decreaseQty: (state, action) => {
      const item = action.payload;
      const { id } = item;

      const product = state.items.find((product) => product.id == id);
      if (product && product.quantity > 1) {
        product.quantity--;

        cartSlice.caseReducers.calcTotalAmount(state);
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  calcTotalAmount,
  clearCart,
  increaseQty,
  decreaseQty,
} = cartSlice.actions;

export default cartSlice.reducer;
