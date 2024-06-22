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
  customerCheques: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  message: string;
}

const initialState: CustomerPortalState = {
  customerAccessToken: localStorage.getItem('customerAccessToken'),
  customerRefreshToken: localStorage.getItem('customerRefreshToken'),
  customerDetails: localStorage.getItem('customerDetails')
    ? JSON.parse(localStorage.getItem('customerDetails')!)
    : null,
  customerProducts: [],
  customerOrderRequests: [],
  customerOrderRequest: null,
  customerOrders: [],
  customerOrder: null,
  customerPayments: [],
  customerPayment: null,
  customerCheques: [],
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

export const fetchCustomerProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('http://localhost:3000/products', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
});

export const createCustomerOrderRequestCP = createAsyncThunk(
  'customers/createCustomerOrderRequestCP',
  async (customerOrderRequest: any) => {
    const response = await axios.post(
      'http://localhost:3000/customerOrderRequest',
      customerOrderRequest,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  }
);

export const fetchCustomerOrderRequestsById = createAsyncThunk(
  'customerOrderRequests/fetchById',
  async (customerId: string) => {
    const response = await axios.get(
      `http://localhost:3000/customerOrderRequestsById/${customerId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  }
);

export const fetchCustomerPaymentsById = createAsyncThunk(
  'customerPayments/fetchById',
  async (customerId: string) => {
    const response = await axios.get(`http://localhost:3000/customerPaymentsById/${customerId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }
);

export const fetchCustomerOrdersById = createAsyncThunk(
  'customerOrders/fetchById',
  async (customerId: string) => {
    const response = await axios.get(`http://localhost:3000/customerOrdersById/${customerId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }
);

export const fetchCustomerChequesByCustomerId = createAsyncThunk(
  'customerCheques/fetchByCustomerId',
  async (customerId: string) => {
    const response = await axios.get(
      `http://localhost:3000/customerChequesByCustomerId/${customerId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  }
);

const storeTokens = (
  state: CustomerPortalState,
  payload: { customerAccessToken: string; customerRefreshToken: string; customerDetails: any }
) => {
  state.customerAccessToken = payload.customerAccessToken;
  state.customerRefreshToken = payload.customerRefreshToken;
  (state.customerDetails = payload.customerDetails),
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
      state.customerDetails = null;
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
      })
      .addCase(fetchCustomerProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCustomerProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customerProducts = action.payload;
      })
      .addCase(fetchCustomerProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(createCustomerOrderRequestCP.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createCustomerOrderRequestCP.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customerOrderRequests.push(action.payload);
      })
      .addCase(createCustomerOrderRequestCP.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to create customer order request';
      })
      .addCase(fetchCustomerOrderRequestsById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCustomerOrderRequestsById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customerOrderRequests = action.payload;
      })
      .addCase(fetchCustomerOrderRequestsById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch customer order requests';
      })
      .addCase(fetchCustomerOrdersById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCustomerOrdersById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customerOrders = action.payload;
      })
      .addCase(fetchCustomerOrdersById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch customer order requests';
      })
      .addCase(fetchCustomerPaymentsById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCustomerPaymentsById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customerPayments = action.payload;
      })
      .addCase(fetchCustomerPaymentsById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch customer order requests';
      })
      .addCase(fetchCustomerChequesByCustomerId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCustomerChequesByCustomerId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customerCheques = action.payload;
      })
      .addCase(fetchCustomerChequesByCustomerId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch customer order requests';
      });
  },
});

export const { customerLogout } = customerPortalSlice.actions;

export default customerPortalSlice.reducer;
