// lib/redux/authSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../service/api";
import {
  AuthState,
  LoginRequest,
  OTPRequest,
  User,
  AuthResponse,
  ApiResponse,
} from "@/types/auth";

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Helper function for error handling
const handleError = (err: any) =>
  err.response?.data?.message || err.message || "An error occurred";

// --- Thunks ---
export const loginUser = createAsyncThunk<AuthResponse, LoginRequest>(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const result = await apiService.post("/api/auth/login", credentials);
      if (!result.success) return rejectWithValue(result.message);
      return result;
    } catch (err: any) {
      return rejectWithValue(handleError(err));
    }
  }
);

// Updated to match your backend endpoint
export const verifyOtpAndRegister = createAsyncThunk<AuthResponse, FormData>(
  "auth/verifyOtpAndRegister",
  async (formData, { rejectWithValue }) => {
    try {
      const result = await apiService.post("/api/auth/verify-otp", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (!result.success) return rejectWithValue(result.message);
      return result;
    } catch (err: any) {
      return rejectWithValue(handleError(err));
    }
  }
);

export const sendOTP = createAsyncThunk<ApiResponse, OTPRequest>(
  "auth/sendOTP",
  async (data, { rejectWithValue }) => {
    try {
      const result = await apiService.post("/api/auth/send-otp", data);
      if (!result.success) return rejectWithValue(result.message);
      return result;
    } catch (err: any) {
      return rejectWithValue(handleError(err));
    }
  }
);

export const getCurrentUser = createAsyncThunk<AuthResponse>(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const result = await apiService.get("/api/auth/me");
      if (!result.success) return rejectWithValue(result.message);
      return result;
    } catch (err: any) {
      return rejectWithValue(handleError(err));
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await apiService.post("/api/auth/logout");
    } catch (err: any) {
      return rejectWithValue(handleError(err));
    }
  }
);

// --- Slice ---
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) state.user = { ...state.user, ...action.payload };
    },
    clearAuth: () => initialState,
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data ?? null;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Verify OTP and Register
    builder
      .addCase(verifyOtpAndRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtpAndRegister.fulfilled, (state, action) => {
        state.loading = false;
        // Don't automatically log in after registration
        // User will be redirected to login page
      })
      .addCase(verifyOtpAndRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Send OTP
    builder
      .addCase(sendOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOTP.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Get Current User
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data ?? null;
        state.isAuthenticated = true;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });

    // Logout
    builder.addCase(logoutUser.fulfilled, () => initialState);
  },
});

export const { setError, updateUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;
