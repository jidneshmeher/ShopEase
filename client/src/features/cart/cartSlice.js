import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as cartApi from './cartService';

export const fetchCartThunk = createAsyncThunk(
  'cart/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const data =  await cartApi.fetchCart();
      return data.cart
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeItemThunk = createAsyncThunk(
  'cart/removeItem',
  async (productId, { rejectWithValue }) => {
    try {
      await cartApi.removeItem(productId);
      return productId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateQuantityThunk = createAsyncThunk(
  'cart/updateQuantity',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const data =  await cartApi.updateItemQuantity(productId, quantity);
      return data.data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const clearCartThunk = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      await cartApi.clearCart();
      return true;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCart(state) {
      state.items = [];
      state.error = null;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload?.items || [];
      })
      .addCase(fetchCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(removeItemThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(removeItemThunk.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.product._id !== action.payload);
        state.error = null;
      })
      .addCase(removeItemThunk.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(updateQuantityThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(updateQuantityThunk.fulfilled, (state, action) => {
        state.items = action.payload.items;
      })
      .addCase(updateQuantityThunk.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(clearCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCartThunk.fulfilled, (state) => {
        state.loading = false;
        state.items = [];
      })
      .addCase(clearCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
