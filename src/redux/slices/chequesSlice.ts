import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface ChequeState {
  cheques: any[];
  pendingCheques: any[];
  cheque: {};
  pagedCheques: any[];
  payments: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ChequeState = {
  cheque: [],
  cheques: [],
  pagedCheques: [],
  pendingCheques: [],
  payments: [],
  status: 'idle',
  error: null,
};

const accessToken = localStorage.getItem('accessToken');

// Async thunks for backend interactions
export const fetchCheques = createAsyncThunk('cheques/fetchCheques', async () => {
  const response = await axios.get('http://localhost:3000/cheques', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
});

export const fetchPendingCheques = createAsyncThunk('cheques/fetchPendingCheques', async () => {
  const response = await axios.get('http://localhost:3000/cheques/pending', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
});

export const createCheque = createAsyncThunk('cheques/createCheques', async (cheque: any) => {
  const response = await axios.post('http://localhost:3000/cheque', cheque);
  return response.data;
});

export const updateCheque = createAsyncThunk('cheques/updateCheques', async (cheque: any) => {
  const response = await axios.put(`http://localhost:3000/cheque/${cheque.id}`, cheque);
  return response.data;
});

export const getPagedCheques = createAsyncThunk(
  'cheques/getPagedCheques',
  async ({ page, pageSize }: { page: number; pageSize: number }) => {
    const response = await axios.get('http://localhost:3000/cheques', {
      params: { _page: page, _limit: pageSize },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }
);

export const getChequeById = createAsyncThunk('cheques/getChequeById', async (chequeId: string) => {
  const response = await axios.get(`http://localhost:3000/cheques/${chequeId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
});

const chequeSlice: any = createSlice({
  name: 'cheques',
  initialState,
  reducers: {
    setCheque: (state, action) => {
      state.cheque = action.payload;
    },
    setPaymenets: (state, action) => {
      state.payments = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCheques.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCheques.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cheques = action.payload;
      })
      .addCase(fetchCheques.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch employees';
      })
      // Similar cases for other thunks
      .addCase(getPagedCheques.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPagedCheques.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pagedCheques = action.payload;
      })
      .addCase(getPagedCheques.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch employees';
      })
      .addCase(getChequeById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getChequeById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cheque = action.payload;
      })
      .addCase(getChequeById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch employees';
      })
      .addCase(createCheque.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(createCheque.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cheques.push(action.payload);
      })
      .addCase(createCheque.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(updateCheque.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(updateCheque.fulfilled, (state, action) => {
        const index = state.cheques.findIndex((cheque) => cheque.id === action.payload.id);
        if (index !== -1) {
          state.cheques[index] = action.payload;
        }
      })
      .addCase(updateCheque.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(fetchPendingCheques.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPendingCheques.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pendingCheques = action.payload;
      })
      .addCase(fetchPendingCheques.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch employees';
      });
  },
});

export const { setCheque, setPaymenets } = chequeSlice.actions;

export default chequeSlice.reducer;
