import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  cartList: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartList.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cartList = state.cartList.filter(
        (item) => item.id !== action.payload.id
      );
    },
    updateCartItemQuantity: (state, action) => {
      const { itemId, change } = action.payload;
      const itemToUpdate = state.cartList.find((item) => item.id === itemId);
      if (itemToUpdate) {
        
        // Ensure the quantity doesn't go below 1
        itemToUpdate.quantity = Math.max(1, itemToUpdate.quantity + change);
      }
    },
    
  },
});

export const { addToCart, removeFromCart, updateCartItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;