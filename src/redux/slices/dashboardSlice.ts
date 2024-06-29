import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface TripState {
  summaryDetails: {};
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TripState = {
  summaryDetails: {},
  status: 'idle',
  error: null,
};

const accessToken = localStorage.getItem('accessToken');

export const fetchSummaryDetails = createAsyncThunk(
  'summary-details',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:3000/summary-details', {
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
const tripSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSummaryDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSummaryDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.summaryDetails = action.payload;
      })
      .addCase(fetchSummaryDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch trips';
      });
  },
});

export const {} = tripSlice.actions;

export default tripSlice.reducer;
