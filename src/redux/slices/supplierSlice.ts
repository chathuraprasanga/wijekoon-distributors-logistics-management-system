import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface SuppliersState {
  suppliers: any[];
  pagedSuppliers: any[];
  supplier: any | null;
  products: any[];
  pagedProducts: any[];
  product: any | null;
  supplierOrderRequests: any[];
  pagedSupplierOrderRequests: any[];
  supplierOrderRequest: any | null;
  supplierOrders: any[];
  pagedSupplierOrders: any[];
  supplierOrder: any | null;
  supplierPayments: any[];
  pagedSupplierPayments: any[];
  supplierPayment: any | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: SuppliersState = {
  suppliers: [],
  supplierOrderRequests: [],
  supplierOrders: [],
  supplierPayments: [],
  products: [],
  pagedSuppliers: [],
  pagedSupplierOrderRequests: [],
  pagedSupplierOrders: [],
  pagedSupplierPayments: [],
  pagedProducts: [],
  supplier: {},
  supplierOrderRequest: {},
  supplierOrder: {},
  supplierPayment: {},
  product: {},
  status: 'idle',
  error: null,
};

const accessToken = localStorage.getItem('accessToken');

export const fetchSuppliers = createAsyncThunk(
  'suppliers/fetchSuppliers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:3000/suppliers', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const createSupplier = createAsyncThunk(
  'suppliers/createSupplier',
  async (supplier: any, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/supplier', supplier, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const updateSupplier = createAsyncThunk(
  'suppliers/updateSupplier',
  async (supplier: any, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/supplier/${supplier.id}`,
        supplier.data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const deleteSupplier = createAsyncThunk(
  'suppliers/deleteSupplier',
  async (supplierId: string, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:3000/supplier/${supplierId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return supplierId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:3000/products', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (product: any, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/product', product, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProducts',
  async (product: any, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/product/${product.id}`,
        product.data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProducts',
  async (productId: string, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:3000/product/${productId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return productId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const fetchSupplierOrderRequests = createAsyncThunk(
  'suppliers/fetchSupplierOrderRequests',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:3000/supplierOrderRequests', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const fetchConfirmedSupplierOrderRequests = createAsyncThunk(
  'suppliers/fetchConfirmedSupplierOrderRequests',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:3000/supplierOrderRequests/confirmed', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const createSupplierOrderRequest = createAsyncThunk(
  'suppliers/createSupplierOrderRequest',
  async (supplierOrderRequest: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/supplierOrderRequest',
        supplierOrderRequest,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const updateSupplierOrderRequest = createAsyncThunk(
  'suppliers/updateSupplierOrderRequest',
  async (supplierOrderRequest: any, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/supplierOrderRequest/${supplierOrderRequest.id}`,
        supplierOrderRequest,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const updateSupplierOrderRequestStatus = createAsyncThunk(
  'suppliers/updateSupplierOrderRequestStatus',
  async (supplierOrderRequest: any, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/supplierOrderRequest/status/${supplierOrderRequest.id}`,
        supplierOrderRequest,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const getSupplierOrderRequestById = createAsyncThunk(
  'suppliers/getSupplierOrderRequestById',
  async (supplierOrderRequestId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/supplierOrderRequest/${supplierOrderRequestId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const deleteSupplierOrderRequest = createAsyncThunk(
  'suppliers/deleteSupplierOrderRequest',
  async (supplierOrderRequestId: string, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:3000/supplierOrderRequests/${supplierOrderRequestId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return supplierOrderRequestId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const fetchSupplierOrders = createAsyncThunk(
  'suppliers/fetchSupplierOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:3000/supplierOrders', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const createSupplierOrder = createAsyncThunk(
  'suppliers/createSupplierOrder',
  async (supplierOrder: any, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/supplierOrder', supplierOrder, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const updateSupplierOrder = createAsyncThunk(
  'suppliers/updateSupplierOrder',
  async (supplierOrder: any, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/supplierOrders/${supplierOrder.id}`,
        supplierOrder,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const deleteSupplierOrder = createAsyncThunk(
  'suppliers/deleteSupplierOrder',
  async (supplierOrderId: string, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:3000/supplierOrders/${supplierOrderId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return supplierOrderId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const fetchSupplierPayments = createAsyncThunk(
  'suppliers/fetchSupplierPayments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:3000/supplierPayments', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const createSupplierPayment = createAsyncThunk(
  'suppliers/createSupplierPayment',
  async (supplierPayment: any, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/supplierPayments', supplierPayment, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const updateSupplierPayment = createAsyncThunk(
  'suppliers/updateSupplierPayment',
  async (supplierPayment: any, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/supplierPayment/${supplierPayment._id}`,
        supplierPayment,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const deleteSupplierPayment = createAsyncThunk(
  'suppliers/deleteSupplierPayment',
  async (supplierPaymentId: string, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:3000/supplierPayments/${supplierPaymentId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return supplierPaymentId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

const supplierSlice = createSlice({
  name: 'suppliers',
  initialState,
  reducers: {
    setSupplier: (state, action) => {
      state.supplier = action.payload;
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    setSupplierOrderRequest: (state, action) => {
      state.supplierOrderRequest = action.payload;
    },
    setSupplierOrder: (state, action) => {
      state.supplierOrder = action.payload;
    },
    setSupplierPayment: (state, action) => {
      state.supplierPayment = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuppliers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.suppliers = action.payload;
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch suppliers';
      })
      .addCase(createSupplier.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createSupplier.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.suppliers.push(action.payload);
      })
      .addCase(createSupplier.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to create supplier';
      })
      .addCase(updateSupplier.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateSupplier.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.suppliers.findIndex((supplier) => supplier.id === action.payload.id);
        if (index !== -1) {
          state.suppliers[index] = action.payload;
        }
      })
      .addCase(updateSupplier.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update supplier';
      })
      .addCase(deleteSupplier.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteSupplier.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.suppliers = state.suppliers.filter((supplier) => supplier.id !== action.payload);
      })
      .addCase(deleteSupplier.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to delete supplier';
      })
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(createProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to create products';
      })
      .addCase(updateProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.products.findIndex((product) => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update product';
      })
      .addCase(deleteProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = state.products.filter((product) => product.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to delete product';
      })
      .addCase(fetchSupplierOrderRequests.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSupplierOrderRequests.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.supplierOrderRequests = action.payload;
      })
      .addCase(fetchSupplierOrderRequests.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch supplier order requests';
      })
      .addCase(createSupplierOrderRequest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createSupplierOrderRequest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.supplierOrderRequests.push(action.payload);
      })
      .addCase(createSupplierOrderRequest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to create supplier order request';
      })
      .addCase(updateSupplierOrderRequest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateSupplierOrderRequest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.supplierOrderRequests.findIndex(
          (request) => request.id === action.payload.id
        );
        if (index !== -1) {
          state.supplierOrderRequests[index] = action.payload;
        }
      })
      .addCase(updateSupplierOrderRequest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update supplier order request';
      })
      .addCase(deleteSupplierOrderRequest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteSupplierOrderRequest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.supplierOrderRequests = state.supplierOrderRequests.filter(
          (request) => request.id !== action.payload
        );
      })
      .addCase(deleteSupplierOrderRequest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to delete supplier order request';
      })
      .addCase(fetchSupplierOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSupplierOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.supplierOrders = action.payload;
      })
      .addCase(fetchSupplierOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch supplier orders';
      })
      .addCase(createSupplierOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createSupplierOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.supplierOrders.push(action.payload);
      })
      .addCase(createSupplierOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to create supplier order';
      })
      .addCase(updateSupplierOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateSupplierOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.supplierOrders.findIndex((order) => order.id === action.payload.id);
        if (index !== -1) {
          state.supplierOrders[index] = action.payload;
        }
      })
      .addCase(updateSupplierOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update supplier order';
      })
      .addCase(deleteSupplierOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteSupplierOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.supplierOrders = state.supplierOrders.filter((order) => order.id !== action.payload);
      })
      .addCase(deleteSupplierOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to delete supplier order';
      })
      .addCase(fetchSupplierPayments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSupplierPayments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.supplierPayments = action.payload;
      })
      .addCase(fetchSupplierPayments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch supplier payments';
      })
      .addCase(createSupplierPayment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createSupplierPayment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.supplierPayments.push(action.payload);
      })
      .addCase(createSupplierPayment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to create supplier payment';
      })
      .addCase(updateSupplierPayment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateSupplierPayment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.supplierPayments.findIndex(
          (payment) => payment.id === action.payload.id
        );
        if (index !== -1) {
          state.supplierPayments[index] = action.payload;
        }
      })
      .addCase(updateSupplierPayment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update supplier payment';
      })
      .addCase(deleteSupplierPayment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteSupplierPayment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.supplierPayments = state.supplierPayments.filter(
          (payment) => payment.id !== action.payload
        );
      })
      .addCase(deleteSupplierPayment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to delete supplier payment';
      })
      .addCase(updateSupplierOrderRequestStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateSupplierOrderRequestStatus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.supplierOrderRequests.findIndex(
          (request) => request.id === action.payload.id
        );
        if (index !== -1) {
          state.supplierOrderRequests[index] = action.payload;
        }
      })
      .addCase(updateSupplierOrderRequestStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update supplier order request status';
      })
      .addCase(getSupplierOrderRequestById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSupplierOrderRequestById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.supplierOrderRequest = action.payload;
      })
      .addCase(getSupplierOrderRequestById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch supplier order request';
      })
      .addCase(fetchConfirmedSupplierOrderRequests.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchConfirmedSupplierOrderRequests.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.supplierOrderRequests = action.payload;
      })
      .addCase(fetchConfirmedSupplierOrderRequests.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch supplier order requests';
      });
  },
});

export const {
  setSupplier,
  setSupplierOrderRequest,
  setSupplierOrder,
  setSupplierPayment,
  setProduct,
} = supplierSlice.actions;

export default supplierSlice.reducer;
