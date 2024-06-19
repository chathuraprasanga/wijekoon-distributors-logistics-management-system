import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface CustomerPortalState {
  customerAccessToken: string | null;
  customerRefreshToken: string | null;
  customerDetails: any | null;
  customerProducts: any[];
  customerOrderRequests: any[];
  customerOrderRequest: any | null;
  customerOrders: any[];
  customerOrder: any | null;
  customerPayments: any[];
  customerPayment: any | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  message: string;
}

const initialState: CustomerPortalState = {
  customerAccessToken: localStorage.getItem('customerAccessToken'),
  customerRefreshToken: localStorage.getItem('customerRefreshToken'),
  customerDetails: localStorage.getItem('customerDetails') ? JSON.parse(localStorage.getItem('customerDetails')!) : null,
  customerProducts: [],
  customerOrderRequests: [],
  customerOrderRequest: null,
  customerOrders: [],
  customerOrder: null,
  customerPayments: [],
  customerPayment: null,
  status: 'idle',
  error: null,
  message: '',
};

export const customerLogin = createAsyncThunk(
  'customerAuth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/customer-login', {
        email,
        password,
      });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        throw new Error('Invalid credentials');
      } else {
        return rejectWithValue(error.response?.data || 'Something went wrong');
      }
    }
  }
);

export const customerForgotPassword = createAsyncThunk(
  'customerAuth/forgotPassword',
  async ({ email }: { email: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/customer-forgot-password', {
        email,
      });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        throw new Error('Email not found');
      } else {
        return rejectWithValue(error.response?.data || 'Something went wrong');
      }
    }
  }
);

const accessToken = localStorage.getItem('accessToken');

export const createCustomerinCustomerPortal = createAsyncThunk(
  'customers/createCustomerInCustomerPortal',
  async (customer: any) => {
    const response = await axios.post('http://localhost:3000/customer', customer, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }
);

const storeTokens = (
  state: CustomerPortalState,
  payload: { customerAccessToken: string; customerRefreshToken: string; customerDetails:any }
) => {
  state.customerAccessToken = payload.customerAccessToken;
  state.customerRefreshToken = payload.customerRefreshToken;
  state.customerDetails = payload.customerDetails,
  localStorage.setItem('customerAccessToken', payload.customerAccessToken);
  localStorage.setItem('customerRefreshToken', payload.customerRefreshToken);
  localStorage.setItem('customerDetails', JSON.stringify(payload.customerDetails));
};

const customerPortalSlice = createSlice({
  name: 'customerPortal',
  initialState,
  reducers: {
    customerLogout: (state) => {
      state.customerAccessToken = null;
      state.customerRefreshToken = null;
      localStorage.removeItem('customerAccessToken');
      localStorage.removeItem('customerRefreshToken');
      localStorage.removeItem('customerDetails');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(customerLogin.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(customerLogin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        storeTokens(state, {
          customerAccessToken: action.payload.accessToken,
          customerRefreshToken: action.payload.refreshToken,
          customerDetails: action.payload.customer,
        });
      })
      .addCase(customerLogin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(customerForgotPassword.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(customerForgotPassword.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload.message;
      })
      .addCase(customerForgotPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(createCustomerinCustomerPortal.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createCustomerinCustomerPortal.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customerDetails = action.payload;
      })
      .addCase(createCustomerinCustomerPortal.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { customerLogout } = customerPortalSlice.actions;

export default customerPortalSlice.reducer;
