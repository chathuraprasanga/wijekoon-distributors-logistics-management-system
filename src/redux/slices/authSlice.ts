import { createSlice, createAsyncThunk, PayloadAction, SerializedError } from '@reduxjs/toolkit';
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
}

const initialState: AuthState = {
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
  status: 'idle',
  error: null,
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
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post<LoginResponse>('http://localhost:3000/login', {
        email,
        password,
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message || 'Something went wrong');
      } else if (error.request) {
        return thunkAPI.rejectWithValue('No response from server');
      } else {
        return thunkAPI.rejectWithValue(error.message);
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
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    },
    setTokens: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      storeTokens(state, action.payload);
    },
    clearTokens: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
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
      })
      .addCase(
        login.rejected,
        (
          state,
          action: PayloadAction<
            unknown,
            string,
            {
              arg: { email: string; password: string };
              requestId: string;
              requestStatus: 'rejected';
              aborted: boolean;
              condition: boolean;
            } & ({ rejectedWithValue: true } | ({ rejectedWithValue: false } & {})),
            SerializedError
          >
        ) => {
          state.status = 'failed';
          state.error = action.error.message || 'Login failed';
        }
      );
  },
});

export const { logout, setTokens, clearTokens } = authSlice.actions;

export default authSlice.reducer;
