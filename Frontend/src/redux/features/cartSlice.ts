import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface CartState {
  total: number;
}

const initialState: CartState = {
  total: 0,
};

export const fetchCarts = createAsyncThunk(
  "cart/fetchCarts",
  async () => {
    const res = await axios.get("http://localhost:5000/api/cart", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return res.data.data.total;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    CartCount: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCarts.fulfilled, (state, action) => {
      state.total = action.payload;
    });
  },
});

export const { CartCount } = cartSlice.actions;
export default cartSlice.reducer;