import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface TripState {
  trips: any[];
  pagedTrips: any[];
  trip: any;
  expenses: any[];
  pagedExpenses: any[];
  expense: any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TripState = {
  trips: [],
  pagedTrips: [],
  trip: {},
  expenses: [],
  pagedExpenses: [],
  expense: {},
  status: 'idle',
  error: null,
};

const accessToken = localStorage.getItem('accessToken');

export const fetchTrips = createAsyncThunk('trips/fetchTrips', async () => {
  const response = await axios.get('http://localhost:3000/trips', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
});

export const createTrip = createAsyncThunk('trips/createTrip', async (trip: any) => {
  const response = await axios.post('http://localhost:3000/trip', trip);
  return response.data;
});

export const updateTrip = createAsyncThunk('trips/updateTrip', async (trip: any) => {
  const response = await axios.put(`http://localhost:3000/trip/${trip.id}`, trip);
  return response.data;
});

export const getPagedTrips = createAsyncThunk(
  'trips/getPagedTrips',
  async ({ page, pageSize }: { page: number; pageSize: number }) => {
    const response = await axios.get('http://localhost:3000/trips', {
      params: { _page: page, _limit: pageSize },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }
);

export const getTripById = createAsyncThunk('trips/getTripById', async (tripId: string) => {
  const response = await axios.get(`http://localhost:3000/trip/${tripId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
});

export const fetchExpenses = createAsyncThunk('trips/fetchExpenses', async () => {
  const response = await axios.get('http://localhost:3000/expenses', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
});

export const createExpense = createAsyncThunk('trips/createExpense', async (expense: any) => {
  const response = await axios.post('http://localhost:3000/expense', expense);
  return response.data;
});

export const updateExpense = createAsyncThunk('trips/updateExpense', async (expense: any) => {
  const response = await axios.put(`http://localhost:3000/expense/${expense.id}`, expense);
  return response.data;
});

export const getPagedExpenses = createAsyncThunk(
  'trips/getPagedExpenses',
  async ({ page, pageSize }: { page: number; pageSize: number }) => {
    const response = await axios.get('http://localhost:3000/expenses', {
      params: { _page: page, _limit: pageSize },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }
);

export const getExpenseById = createAsyncThunk('trips/getExpenseById', async (expenseId: string) => {
  const response = await axios.get(`http://localhost:3000/expense/${expenseId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
});

export const deleteTrip = createAsyncThunk('trips/deleteTrip', async (tripId: string) => {
    const response = await axios.delete(`http://localhost:3000/trip/${tripId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  });
  
  export const deleteExpense = createAsyncThunk('expenses/deleteExpense', async (expenseId: string) => {
    const response = await axios.delete(`http://localhost:3000/expense/${expenseId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  });

const tripSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    setTrip: (state, action) => {
      state.trip = action.payload;
    },
    setExpense: (state, action) => {
      state.expense = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrips.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTrips.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.trips = action.payload;
      })
      .addCase(fetchTrips.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch trips';
      })
      .addCase(getPagedTrips.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPagedTrips.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pagedTrips = action.payload;
      })
      .addCase(getPagedTrips.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch paged trips'
    })
    .addCase(getTripById.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(getTripById.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.trip = action.payload;
    })
    .addCase(getTripById.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || 'Failed to fetch trip';
    })
    .addCase(createTrip.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(createTrip.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.trips.push(action.payload);
    })
    .addCase(createTrip.rejected, (state, action) => {
      state.status = 'failed';
    })
    .addCase(updateTrip.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(updateTrip.fulfilled, (state, action) => {
      const index = state.trips.findIndex((trip) => trip.id === action.payload.id);
      if (index !== -1) {
        state.trips[index] = action.payload;
      }
    })
    .addCase(updateTrip.rejected, (state, action) => {
      state.status = 'failed';
    })
    .addCase(fetchExpenses.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchExpenses.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.expenses = action.payload;
    })
    .addCase(fetchExpenses.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || 'Failed to fetch expenses';
    })
    .addCase(getPagedExpenses.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(getPagedExpenses.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.pagedExpenses = action.payload;
    })
    .addCase(getPagedExpenses.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || 'Failed to fetch paged expenses';
    })
    .addCase(getExpenseById.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(getExpenseById.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.expense = action.payload;
    })
    .addCase(getExpenseById.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || 'Failed to fetch expense';
    })
    .addCase(createExpense.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(createExpense.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.expenses.push(action.payload);
    })
    .addCase(createExpense.rejected, (state, action) => {
      state.status = 'failed';
    })
    .addCase(updateExpense.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(updateExpense.fulfilled, (state, action) => {
      const index = state.expenses.findIndex((expense) => expense.id === action.payload.id);
      if (index !== -1) {
        state.expenses[index] = action.payload;
      }
    })
    .addCase(updateExpense.rejected, (state, action) => {
      state.status = 'failed';
    })
    .addCase(deleteTrip.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteTrip.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.trips = state.trips.filter((trip) => trip.id !== action.payload.id);
      })
      .addCase(deleteTrip.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(deleteExpense.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.expenses = state.expenses.filter((expense) => expense.id !== action.payload.id);
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.status = 'failed';
      });
},
});

export const { setTrip, setExpense } = tripSlice.actions;

export default tripSlice.reducer;
