import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface AssetsState {
  warehouse: any;
  vehicle: any;
  pagedWarehouses: any[];
  pagedVehicles: any[];
  warehouses: any[];
  vehicles: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AssetsState = {
  warehouse: {},
  vehicle: {},
  pagedWarehouses: [],
  pagedVehicles: [],
  warehouses: [],
  vehicles: [],
  status: 'idle',
  error: null,
};

const accessToken = localStorage.getItem('accessToken');

export const fetchWarehouses = createAsyncThunk('assets/fetchWarehouses', async () => {
  const response = await axios.get('http://localhost:3000/warehouses', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
});

export const createWarehouse = createAsyncThunk(
  'assets/createWarehouse',
  async (warehouse: any) => {
    const response = await axios.post('http://localhost:3000/warehouse', warehouse);
    return response.data;
  }
);

export const updateWarehouse = createAsyncThunk(
  'assets/updateWarehouse',
  async (warehouse: any) => {
    const response = await axios.put(`http://localhost:3000/warehouse/${warehouse._id}`, warehouse);
    return response.data;
  }
);

export const getPagedWarehouses = createAsyncThunk(
  'assets/getPagedWarehouses',
  async ({ page, pageSize }: { page: number; pageSize: number }) => {
    const response = await axios.get('http://localhost:3000/warehouses', {
      params: { _page: page, _limit: pageSize },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }
);

export const fetchVehicles = createAsyncThunk('assets/fetchVehicles', async () => {
  const response = await axios.get('http://localhost:3000/vehicles', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
});

export const createVehicle = createAsyncThunk('assets/createVehicle', async (vehicle: any) => {
  const response = await axios.post('http://localhost:3000/vehicle', vehicle);
  return response.data;
});

export const updateVehicle = createAsyncThunk('assets/updateVehicle', async (vehicle: any) => {
  const response = await axios.put(`http://localhost:3000/vehicle/${vehicle._id}`, vehicle);
  return response.data;
});

export const getPagedVehicles = createAsyncThunk(
  'assets/getPagedVehicles',
  async ({ page, pageSize }: { page: number; pageSize: number }) => {
    const response = await axios.get('http://localhost:3000/vehicles', {
      params: { _page: page, _limit: pageSize },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }
);

export const deleteWarehouse = createAsyncThunk(
  'assets/deleteWarehouse',
  async (warehouseId: string) => {
    const response = await axios.delete(`http://localhost:3000/warehouse/${warehouseId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }
);

export const deleteVehicle = createAsyncThunk('assets/deleteVehicle', async (vehicleId: string) => {
  const response = await axios.delete(`http://localhost:3000/vehicle/${vehicleId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
});

export const getWarehouseById = createAsyncThunk(
  'assets/getWarehouseById',
  async (warehouseId: string) => {
    const response = await axios.get(`http://localhost:3000/warehouse/${warehouseId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }
);

export const getVehicleById = createAsyncThunk(
  'assets/getVehicleById',
  async (vehicleId: string) => {
    const response = await axios.get(`http://localhost:3000/vehicle/${vehicleId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }
);

const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    setWarehouse: (state, action) => {
      state.warehouse = action.payload;
    },
    setVehicle: (state, action) => {
      state.vehicle = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWarehouses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWarehouses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.warehouses = action.payload;
      })
      .addCase(fetchWarehouses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch warehouses';
      })
      .addCase(getPagedWarehouses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPagedWarehouses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pagedWarehouses = action.payload;
      })
      .addCase(getPagedWarehouses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch paged warehouses';
      })
      .addCase(getPagedVehicles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPagedVehicles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pagedVehicles = action.payload;
      })
      .addCase(getPagedVehicles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch paged vehicles';
      })
      // Add similar cases for other thunks
      .addCase(createWarehouse.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createWarehouse.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.warehouses.push(action.payload);
      })
      .addCase(createWarehouse.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(updateWarehouse.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateWarehouse.fulfilled, (state, action) => {
        const index = state.warehouses.findIndex((warehouse) => warehouse.id === action.payload.id);
        if (index !== -1) {
          state.warehouses[index] = action.payload;
        }
      })
      .addCase(updateWarehouse.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(fetchVehicles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.vehicles = action.payload;
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch vehicles';
      })
      .addCase(createVehicle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createVehicle.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.vehicles.push(action.payload);
      })
      .addCase(createVehicle.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(updateVehicle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateVehicle.fulfilled, (state, action) => {
        const index = state.vehicles.findIndex((vehicle) => vehicle.id === action.payload.id);
        if (index !== -1) {
          state.vehicles[index] = action.payload;
        }
      })
      .addCase(updateVehicle.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(deleteWarehouse.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteWarehouse.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.warehouses = state.warehouses.filter(
          (warehouse) => warehouse.id !== action.payload.id
        );
      })
      .addCase(deleteWarehouse.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(deleteVehicle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteVehicle.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.vehicles = state.vehicles.filter((vehicle) => vehicle.id !== action.payload.id);
      })
      .addCase(deleteVehicle.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(getWarehouseById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getWarehouseById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.warehouse = action.payload;
      })
      .addCase(getWarehouseById.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(getVehicleById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getVehicleById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.vehicle = action.payload;
      })
      .addCase(getVehicleById.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export const { setWarehouse, setVehicle } = assetsSlice.actions;

export default assetsSlice.reducer;
