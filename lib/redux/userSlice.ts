// userSlice
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../service/api";
import {
  User,
  UserState,
  CreateUserRequest,
  UpdateUserRequest,
  GetUsersParams,
  ApiResponse,
} from "@/types/auth";

const initialState: UserState = {
  users: [],
  currentUser: null,
  guideProfile: null,
  loading: false,
  error: null,
  pagination: { total: 0, page: 1, totalPages: 0 },
};

// Helper function for error handling
const handleError = (err: any) =>
  err.response?.data?.message || err.message || "An error occurred";

// --- Thunks ---
export const getAllUsers = createAsyncThunk<
  ApiResponse<User[]>,
  GetUsersParams | undefined
>("user/getAllUsers", async (params, { rejectWithValue }) => {
  try {
    const result = await apiService.get("/api/users", { params });
    if (!result.success) return rejectWithValue(result.message);
    return result;
  } catch (err: any) {
    return rejectWithValue(handleError(err));
  }
});

export const getUserById = createAsyncThunk<ApiResponse<User>, string>(
  "user/getUserById",
  async (userId, { rejectWithValue }) => {
    try {
      const result = await apiService.get(`/api/users/${userId}`);
      if (!result.success) return rejectWithValue(result.message);
      return result;
    } catch (err: any) {
      return rejectWithValue(handleError(err));
    }
  }
);

export const getUsersByRole = createAsyncThunk<ApiResponse<User[]>, string>(
  "user/getUsersByRole",
  async (role, { rejectWithValue }) => {
    try {
      const result = await apiService.get(`/api/users/role/${role}`);
      if (!result.success) return rejectWithValue(result.message);
      return result;
    } catch (err: any) {
      return rejectWithValue(handleError(err));
    }
  }
);

export const createUser = createAsyncThunk<
  ApiResponse<User>,
  CreateUserRequest
>("user/createUser", async (userData, { rejectWithValue }) => {
  try {
    const result = await apiService.post("/api/users", userData);
    if (!result.success) return rejectWithValue(result.message);
    return result;
  } catch (err: any) {
    return rejectWithValue(handleError(err));
  }
});

export const updateUserById = createAsyncThunk<
  ApiResponse<User>,
  { userId: string; data: UpdateUserRequest }
>("user/updateUserById", async ({ userId, data }, { rejectWithValue }) => {
  try {
    const result = await apiService.put(`/api/users/${userId}`, data);
    if (!result.success) return rejectWithValue(result.message);
    return result;
  } catch (err: any) {
    return rejectWithValue(handleError(err));
  }
});

export const deleteUser = createAsyncThunk<
  { success: boolean; id: string },
  string
>("user/deleteUser", async (userId, { rejectWithValue }) => {
  try {
    const result = await apiService.delete(`/api/users/${userId}`);
    if (!result.success) return rejectWithValue(result.message);
    return { success: true, id: userId };
  } catch (err: any) {
    return rejectWithValue(handleError(err));
  }
});

// --- Slice ---
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearUsers: (state) => {
      state.users = [];
      state.pagination = { total: 0, page: 1, totalPages: 0 };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Helper to set loading and clear error
    const setPending = (state: UserState) => {
      state.loading = true;
      state.error = null;
    };

    const setRejected = (state: UserState, action: any) => {
      state.loading = false;
      state.error = action.payload as string;
    };

    // Get All Users
    builder
      .addCase(getAllUsers.pending, setPending)
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data ?? [];
        state.pagination = {
          total: action.payload.total ?? 0,
          page: action.payload.page ?? 1,
          totalPages: action.payload.totalPages ?? 0,
        };
      })
      .addCase(getAllUsers.rejected, setRejected);

    // Get User By ID
    builder
      .addCase(getUserById.pending, setPending)
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.data ?? null;
      })
      .addCase(getUserById.rejected, setRejected);

    // Get Users By Role
    builder
      .addCase(getUsersByRole.pending, setPending)
      .addCase(getUsersByRole.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data ?? [];
        state.pagination = {
          total: action.payload.total ?? 0,
          page: 1,
          totalPages: 1,
        };
      })
      .addCase(getUsersByRole.rejected, setRejected);

    // Create User
    builder
      .addCase(createUser.pending, setPending)
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.users.unshift(action.payload.data);
          state.pagination.total += 1;
        }
      })
      .addCase(createUser.rejected, setRejected);

    // Update User
    builder
      .addCase(updateUserById.pending, setPending)
      .addCase(updateUserById.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload.data;
        if (updatedUser) {
          const index = state.users.findIndex((u) => u.id === updatedUser.id);
          if (index !== -1) state.users[index] = updatedUser;
          if (state.currentUser?.id === updatedUser.id) {
            state.currentUser = updatedUser;
          }
        }
      })
      .addCase(updateUserById.rejected, setRejected);

    // Delete User
    builder
      .addCase(deleteUser.pending, setPending)
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((u) => u.id !== action.payload.id);
        state.pagination.total = Math.max(0, state.pagination.total - 1);
      })
      .addCase(deleteUser.rejected, setRejected);
  },
});

export const { setError, clearUsers, clearError } = userSlice.actions;
export default userSlice.reducer;
