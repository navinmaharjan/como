import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  cartList: [],
  totalItems: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartList.find(item => item._id === action.payload._id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartList.push({ ...action.payload, quantity: 1 });
      }
      state.totalItems = state.cartList.reduce((total, item) => total + item.quantity, 0);
    },

    removeFromCart: (state, action) => {
      const removedItem = state.cartList.find(item => item._id === action.payload._id);
      state.cartList = state.cartList.filter(
        (item) => item._id !== action.payload._id
      );
      state.totalItems -= removedItem ? removedItem.quantity : 0;
    },

    updateCartItemQuantity: (state, action) => {
      const { _id, change } = action.payload;
      const itemToUpdate = state.cartList.find((item) => item._id === _id);
      if (itemToUpdate) {
        itemToUpdate.quantity = Math.max(1, itemToUpdate.quantity + change);
        state.totalItems = state.cartList.reduce((total, item) => total + item.quantity, 0);
      }
    },

    updateTotalItems: (state) => {
      state.totalItems = state.cartList.reduce((total, item) => total + item.quantity, 0);
    },

    clearCart: (state) => {
      state.cartList = [];
      state.totalItems = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateCartItemQuantity, updateTotalItems, clearCart } = cartSlice.actions;
export default cartSlice.reducer;