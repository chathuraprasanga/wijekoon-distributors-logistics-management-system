import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  name: string;
  email: string;
  role: {
    name: string;
    permissions: string[];
  };
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  permissions: string[] | null; // New state to hold permissions
  message: any;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
  status: 'idle',
  error: null,
  permissions: localStorage.getItem('permissions')
    ? JSON.parse(localStorage.getItem('permissions')!)
    : null,
  message: {},
};

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    fullName: string;
    email: string;
    role: {
      name: string;
      permissions: string[];
    };
  };
}

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post<LoginResponse>('http://localhost:3000/login', {
        email,
        password,
      });
      return response.data;
    } catch (error: any) {
      // Check if the error is due to invalid credentials or other issues
      if (error.response && error.response.status === 401) {
        // If the error is specifically about invalid credentials, throw an error
        throw new Error('Invalid credentials');
      } else {
        // For other types of errors, use rejectWithValue to specify the error message
        return rejectWithValue(error.response?.data || 'Something went wrong');
      }
    }
  }
);

interface ForgotPasswordResponse {
  message: string;
}

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async ({ email }: { email: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post<ForgotPasswordResponse>(
        'http://localhost:3000/forgot-password',
        {
          email,
        }
      );
      return response.data;
    } catch (error: any) {
      // Check if the error is due to invalid email or other issues
      if (error.response && error.response.status === 400) {
        // If the error is specifically about an invalid email, throw an error
        throw new Error('Email not found');
      } else {
        // For other types of errors, use rejectWithValue to specify the error message
        return rejectWithValue(error.response?.data || 'Something went wrong');
      }
    }
  }
);

const storeTokens = (state: AuthState, payload: { accessToken: string; refreshToken: string }) => {
  state.accessToken = payload.accessToken;
  state.refreshToken = payload.refreshToken;
  localStorage.setItem('accessToken', payload.accessToken);
  localStorage.setItem('refreshToken', payload.refreshToken);
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.permissions = null; // Clear permissions on logout
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      localStorage.removeItem('permissions');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.status = 'succeeded';
        storeTokens(state, {
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
        });
        state.user = {
          name: action.payload.user.fullName,
          email: action.payload.user.email,
          role: {
            name: action.payload.user.role.name,
            permissions: action.payload.user.role.permissions,
          },
        };

        state.permissions = action.payload.user.role.permissions; // Set permissions in state
        localStorage.setItem(
          'user',
          JSON.stringify({
            name: action.payload.user.fullName,
            email: action.payload.user.email,
            role: {
              name: action.payload.user.role.name,
              permissions: action.payload.user.role.permissions,
            },
          })
        );
        localStorage.setItem('permissions', JSON.stringify(action.payload.user.role.permissions));
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Login failed';
      })
      .addCase(forgotPassword.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload.message;
      })

      .addCase(forgotPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Forgot Password failed';
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
