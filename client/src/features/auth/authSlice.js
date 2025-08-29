import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "./authService";
import { logger } from "../../utils/logger";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      return await authService.login(email, password);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, email, password, phone}, { rejectWithValue }) => {
    try {
      return await authService.register(name, email, password, phone);
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Registeration Failed");
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      return await authService.getCurrentUser();
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (userData, { rejectWithValue }) => {
    try {
      return await authService.updateUserProfile(userData);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const forgotPasswordUser = createAsyncThunk(
  "auth/forgotPasswordUser",
  async (email, { rejectWithValue }) => {
    try {
      return await authService.forgotPassword(email);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to send reset link");
    }
  }
);

export const resetPasswordUser = createAsyncThunk(
  "auth/resetPasswordUser",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      return await authService.resetPassword(token, password);
    } catch (error) {
      logger.log(error)
      return rejectWithValue(error.response?.data?.message || "Failed to reset password");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    isLoggedIn:false
  },
  reducers: {
    clearUser(state){
      console.log("clearUser Called")
      state.user = null
      state.isLoggedIn = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isLoggedIn = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isLoggedIn = false;
      })

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;  
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isLoggedIn = false;
      })

      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isLoggedIn = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
      })

      .addCase(forgotPasswordUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPasswordUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(forgotPasswordUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(resetPasswordUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPasswordUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(resetPasswordUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

export const { clearUser } = authSlice.actions;
export default authSlice.reducer;