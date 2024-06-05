import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface CustomersState {
  customers: any[];
  pagedCustomers: any[];
  customer: any | null;
  customerOrderRequests: any[];
  pagedCustomerOrderRequests: any[];
  customerOrderRequest: any | null;
  customerOrders: any[];
  pagedCutomerOrders: any[];
  customerOrder: any | null;
  customerPayments: any[];
  pagedCustomerPayments: any[];
  customerPayment: any | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CustomersState = {
  customers: [],
  customerOrderRequests: [],
  customerOrders: [],
  customerPayments: [],
  pagedCustomers: [],
  pagedCustomerOrderRequests: [],
  pagedCutomerOrders: [],
  pagedCustomerPayments: [],
  customer: {},
  customerOrderRequest: {},
  customerOrder: {},
  customerPayment: {},
  status: 'idle',
  error: null,
};

const accessToken = localStorage.getItem('accessToken');

export const fetchCustomers = createAsyncThunk('customers/fetchCustomers', async () => {
  const response = await axios.get('http://localhost:3000/customers', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
});

export const createCustomer = createAsyncThunk(
  'customers/createCustomer',
  async (customer: any) => {
    const response = await axios.post('http://localhost:3000/customer', customer, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }
);

export const updateCustomer = createAsyncThunk(
  'customers/updateCustomer',
  async (customer: any) => {
    const response = await axios.put(`http://localhost:3000/customer/${customer.id}`, customer.data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }
);

export const deleteCustomer = createAsyncThunk(
  'customers/deleteCustomer',
  async (customerId: string) => {
    await axios.delete(`http://localhost:3000/customer/${customerId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return customerId;
  }
);

export const fetchCustomerOrderRequests = createAsyncThunk(
  'customers/fetchCustomerOrderRequests',
  async () => {
    const response = await axios.get('http://localhost:3000/customerOrderRequests', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }
);

export const createCustomerOrderRequest = createAsyncThunk(
  'customers/createCustomerOrderRequest',
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

export const updateCustomerOrderRequest = createAsyncThunk(
  'customers/updateCustomerOrderRequest',
  async (customerOrderRequest: any) => {
    const response = await axios.put(
      `http://localhost:3000/customerOrderRequest/${customerOrderRequest.id}`,
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

export const deleteCustomerOrderRequest = createAsyncThunk(
  'customers/deleteCustomerOrderRequest',
  async (customerOrderRequestId: string) => {
    await axios.delete(`http://localhost:3000/customerOrderRequest/${customerOrderRequestId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return customerOrderRequestId;
  }
);

export const fetchCustomerOrders = createAsyncThunk('customers/fetchCustomerOrders', async () => {
  const response = await axios.get('http://localhost:3000/customerOrders', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
});

export const createCustomerOrder = createAsyncThunk(
  'customers/createCustomerOrder',
  async (customerOrder: any) => {
    const response = await axios.post('http://localhost:3000/customerOrder', customerOrder, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }
);

export const updateCustomerOrder = createAsyncThunk(
  'customers/updateCustomerOrder',
  async (customerOrder: any) => {
    const response = await axios.put(
      `http://localhost:3000/customerOrder/${customerOrder.id}`,
      customerOrder,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  }
);

export const deleteCustomerOrder = createAsyncThunk(
  'customers/deleteCustomerOrder',
  async (customerOrderId: string) => {
    await axios.delete(`http://localhost:3000/customerOrder/${customerOrderId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return customerOrderId;
  }
);

export const fetchCustomerPayments = createAsyncThunk(
  'customers/fetchCustomerPayments',
  async () => {
    const response = await axios.get('http://localhost:3000/customerPayments', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }
);

export const createCustomerPayment = createAsyncThunk(
  'customers/createCustomerPayment',
  async (customerPayment: any) => {
    const response = await axios.post('http://localhost:3000/customerPayments', customerPayment, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }
);

export const updateCustomerPayment = createAsyncThunk(
  'customers/updateCustomerPayment',
  async (customerPayment: any) => {
    const response = await axios.put(
      `http://localhost:3000/customerPayments/${customerPayment.id}`,
      customerPayment,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  }
);

export const deleteCustomerPayment = createAsyncThunk(
  'customers/deleteCustomerPayment',
  async (customerPaymentId: string) => {
    await axios.delete(`http://localhost:3000/customerPayments/${customerPaymentId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return customerPaymentId;
  }
);

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setCustomer: (state, action) => {
      state.customer = action.payload;
    },
    setCustomerOrderRequest: (state, action) => {
      state.customerOrderRequest = action.payload;
    },
    setCustomerOrder: (state, action) => {
      state.customerOrder = action.payload;
    },
    setCustomerPayment: (state, action) => {
      state.customerPayment = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch customers';
      })
      .addCase(createCustomer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customers.push(action.payload);
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to create customer';
      })
      .addCase(updateCustomer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.customers.findIndex((customer) => customer.id === action.payload.id);
        if (index !== -1) {
          state.customers[index] = action.payload;
        }
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update customer';
      })
      .addCase(deleteCustomer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customers = state.customers.filter((customer) => customer.id !== action.payload);
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to delete customer';
      })
      .addCase(fetchCustomerOrderRequests.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCustomerOrderRequests.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customerOrderRequests = action.payload;
      })
      .addCase(fetchCustomerOrderRequests.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch customer order requests';
      })
      .addCase(createCustomerOrderRequest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createCustomerOrderRequest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customerOrderRequests.push(action.payload);
      })
      .addCase(createCustomerOrderRequest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to create customer order request';
      })
      .addCase(updateCustomerOrderRequest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCustomerOrderRequest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.customerOrderRequests.findIndex(
          (request) => request.id === action.payload.id
        );
        if (index !== -1) {
          state.customerOrderRequests[index] = action.payload;
        }
      })
      .addCase(updateCustomerOrderRequest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update customer order request';
      })
      .addCase(deleteCustomerOrderRequest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCustomerOrderRequest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customerOrderRequests = state.customerOrderRequests.filter(
          (request) => request.id !== action.payload
        );
      })
      .addCase(deleteCustomerOrderRequest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to delete customer order request';
      })
      .addCase(fetchCustomerOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCustomerOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customerOrders = action.payload;
      })
      .addCase(fetchCustomerOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch customer orders';
      })
      .addCase(createCustomerOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createCustomerOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customerOrders.push(action.payload);
      })
      .addCase(createCustomerOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to create customer order';
      })
      .addCase(updateCustomerOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCustomerOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.customerOrders.findIndex((order) => order.id === action.payload.id);
        if (index !== -1) {
          state.customerOrders[index] = action.payload;
        }
      })
      .addCase(updateCustomerOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update customer order';
      })
      .addCase(deleteCustomerOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCustomerOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customerOrders = state.customerOrders.filter((order) => order.id !== action.payload);
      })
      .addCase(deleteCustomerOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to delete customer order';
      })
      .addCase(fetchCustomerPayments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCustomerPayments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customerPayments = action.payload;
      })
      .addCase(fetchCustomerPayments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch customer payments';
      })
      .addCase(createCustomerPayment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createCustomerPayment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customerPayments.push(action.payload);
      })
      .addCase(createCustomerPayment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to create customer payment';
      })
      .addCase(updateCustomerPayment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCustomerPayment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.customerPayments.findIndex(
          (payment) => payment.id === action.payload.id
        );
        if (index !== -1) {
          state.customerPayments[index] = action.payload;
        }
      })
      .addCase(updateCustomerPayment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update customer payment';
      })
      .addCase(deleteCustomerPayment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCustomerPayment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customerPayments = state.customerPayments.filter(
          (payment) => payment.id !== action.payload
        );
      })
      .addCase(deleteCustomerPayment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to delete customer payment';
      });

    //write the rest of the code
  },
});

export const { setCustomer, setCustomerOrderRequest, setCustomerOrder, setCustomerPayment } =  customerSlice.actions;

export default customerSlice.reducer;
