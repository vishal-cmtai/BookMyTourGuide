// lib/redux/packagesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiService } from "../service/api";

interface Package {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  duration: string;
  location: string;
  images: string[];
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PackageResponse {
  success: boolean;
  total: number;
  page: number;
  totalPages: number;
  data: Package[];
}

interface PackageRequest {
  title: string;
  description: string;
  price: number;
  duration: string;
  location: string;
  images?: string[];
  highlights?: string[];
  inclusions?: string[];
  exclusions?: string[];
  isActive?: boolean;
}

interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  active?: boolean;
}

interface PackagesState {
  packages: Package[];
  currentPackage: Package | null;
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  totalPages: number;
  // Action-specific loading states
  creating: boolean;
  updating: boolean;
  deleting: boolean;
  toggling: boolean;
}

const initialState: PackagesState = {
  packages: [],
  currentPackage: null,
  loading: false,
  error: null,
  total: 0,
  page: 1,
  totalPages: 0,
  creating: false,
  updating: false,
  deleting: false,
  toggling: false,
};

// Async Thunks
export const fetchPackages = createAsyncThunk<
  PackageResponse,
  QueryParams | undefined,
  { rejectValue: string }
>(
  "packages/fetchPackages",
  async (params: QueryParams = {}, { rejectWithValue }) => {
    try {
      const { page = 1, limit = 10, search = "", active } = params;

      const queryParams = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        search,
      });

      if (active !== undefined) {
        queryParams.append("active", String(active));
      }

      const endpoint = `/api/packages?${queryParams.toString()}`;
      const response = await apiService.get<PackageResponse>(endpoint);

      const safeResponse: PackageResponse = {
        success: response.success ?? true,
        total: Number(response.total ?? 0),
        page: Number(response.page ?? 1),
        totalPages: Number(response.totalPages ?? 1),
        data: Array.isArray(response.data) ? response.data : [],
      };

      return safeResponse;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch packages"
      );
    }
  }
);

export const fetchPackageById = createAsyncThunk(
  "packages/fetchPackageById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await apiService.get(`/api/packages/${id}`);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createPackage = createAsyncThunk(
  "packages/createPackage",
  async (packageData: PackageRequest, { rejectWithValue }) => {
    try {
      const response = await apiService.post("/api/packages", packageData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updatePackage = createAsyncThunk(
  "packages/updatePackage",
  async (
    { id, packageData }: { id: string; packageData: Partial<PackageRequest> },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiService.put(`/api/packages/${id}`, packageData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deletePackage = createAsyncThunk(
  "packages/deletePackage",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(`/api/packages/${id}`);
      return { ...response, id };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const togglePackageStatus = createAsyncThunk(
  "packages/togglePackageStatus",
  async (
    { id, isActive }: { id: string; isActive: boolean },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiService.put(`/api/packages/${id}/toggle`, {
        isActive,
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Slice
const packagesSlice = createSlice({
  name: "packages",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentPackage: (state) => {
      state.currentPackage = null;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch packages
      .addCase(fetchPackages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPackages.fulfilled, (state, action) => {
        state.loading = false;
        state.packages = action.payload.data;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch package by ID
      .addCase(fetchPackageById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPackageById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPackage = action.payload.data;
      })
      .addCase(fetchPackageById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create package
      .addCase(createPackage.pending, (state) => {
        state.creating = true;
        state.error = null;
      })
      .addCase(createPackage.fulfilled, (state, action) => {
        state.creating = false;
        state.packages.unshift(action.payload.data);
        state.total += 1;
      })
      .addCase(createPackage.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload as string;
      })

      // Update package
      .addCase(updatePackage.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updatePackage.fulfilled, (state, action) => {
        state.updating = false;
        const index = state.packages.findIndex(
          (p) => p._id === action.payload.data._id
        );
        if (index !== -1) {
          state.packages[index] = action.payload.data;
        }
        if (state.currentPackage?._id === action.payload.data._id) {
          state.currentPackage = action.payload.data;
        }
      })
      .addCase(updatePackage.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload as string;
      })

      // Delete package
      .addCase(deletePackage.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })
      .addCase(deletePackage.fulfilled, (state, action) => {
        state.deleting = false;
        state.packages = state.packages.filter(
          (p) => p._id !== action.payload.id
        );
        state.total = Math.max(0, state.total - 1);
        if (state.currentPackage?._id === action.payload.id) {
          state.currentPackage = null;
        }
      })
      .addCase(deletePackage.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload as string;
      })

      // Toggle status
      .addCase(togglePackageStatus.pending, (state) => {
        state.toggling = true;
        state.error = null;
      })
      .addCase(togglePackageStatus.fulfilled, (state, action) => {
        state.toggling = false;
        const index = state.packages.findIndex(
          (p) => p._id === action.payload.data._id
        );
        if (index !== -1) {
          state.packages[index] = action.payload.data;
        }
        if (state.currentPackage?._id === action.payload.data._id) {
          state.currentPackage = action.payload.data;
        }
      })
      .addCase(togglePackageStatus.rejected, (state, action) => {
        state.toggling = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearCurrentPackage, setCurrentPage } =
  packagesSlice.actions;
export default packagesSlice.reducer;

// Selectors
export const selectPackages = (state: { packages: PackagesState }) =>
  state.packages.packages;
export const selectCurrentPackage = (state: { packages: PackagesState }) =>
  state.packages.currentPackage;
export const selectPackagesLoading = (state: { packages: PackagesState }) =>
  state.packages.loading;
export const selectPackagesError = (state: { packages: PackagesState }) =>
  state.packages.error;
export const selectPackagesPagination = (state: {
  packages: PackagesState;
}) => ({
  total: state.packages.total,
  page: state.packages.page,
  totalPages: state.packages.totalPages,
});
export const selectPackagesActionStates = (state: {
  packages: PackagesState;
}) => ({
  creating: state.packages.creating,
  updating: state.packages.updating,
  deleting: state.packages.deleting,
  toggling: state.packages.toggling,
});
