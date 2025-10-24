export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guide' | 'manager';
  avatar?: string;
  isActive: boolean;
  guideProfile?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GuideProfile {
  user: string;
  name: string;
  mobile: string;
  email: string;
  dob?: string;
  state?: string;
  country?: string;
  age?: number;
  languages: string[];
  experience?: string;
  specializations: string[];
  availability: string[];
  hourlyRate?: number;
  description?: string;
  license?: string;
  photo?: string;
  isApproved: boolean;
}

export interface UpdateGuideProfileData {
  name?: string;
  mobile?: string;
  dob?: string;
  state?: string;
  country?: string;
  age?: number;
  languages?: string[];
  experience?: string;
  specializations?: string[];
  availability?: string[];
  hourlyRate?: number;
  description?: string;
}

export interface GuideProfileFormData extends UpdateGuideProfileData {
  photo?: File;
  license?: File;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface UserState {
  users: User[];
  currentUser: User | null;
  guideProfile: GuideProfile | null;
  loading: boolean;
  error: string | null;
  pagination: {
    total: number;
    page: number;
    totalPages: number;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  // role: 'user' | 'guide';
  mobile?: string;
  dob?: string;
  state?: string;
  country?: string;
  age?: number;
  languages?: string[];
  experience?: string;
  specializations?: string[];
  availability?: string[];
  hourlyRate?: number;
  description?: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user' | 'guide' | 'manager';
  avatar?: string;
  isActive?: boolean;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  password?: string;
  role?: 'admin' | 'user' | 'guide' | 'manager';
  avatar?: string;
  isActive?: boolean;
}

export interface GetUsersParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface OTPRequest {
  email: string;
}

export interface VerifyOTPRequest extends RegisterRequest {
  otp: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: User;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  total?: number;
  page?: number;
  totalPages?: number;
}
