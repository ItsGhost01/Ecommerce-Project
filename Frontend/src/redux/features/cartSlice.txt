import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"; // ✅ type-only import

interface CartState {
  total: number;
}

const initialState: CartState = {
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartCount: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
  },
});

export const { setCartCount } = cartSlice.actions;
export default cartSlice.reducer;