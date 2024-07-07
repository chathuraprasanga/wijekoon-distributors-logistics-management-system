import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface TripState {
  emails: any[];
  users: any[];
  user: {};
  email: {};
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TripState = {
  emails: [],
  users: [],
  email: {},
  user: {},
  status: 'idle',
  error: null,
};

const accessToken = localStorage.getItem('accessToken');

export const fetchEmails = createAsyncThunk('settings/fetchEmails', async () => {
  try {
    const response = await axios.get('http://localhost:3000/emails', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || 'Something went wrong');
  }
});

export const updateEmail = createAsyncThunk('email/updateEmail', async (email: any) => {
  try {
    const response = await axios.put(`http://localhost:3000/email/${email._id}`, email);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || 'Something went wrong');
  }
});

const tripSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEmails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.emails = action.payload;
      })
      .addCase(fetchEmails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch trips';
      })
      .addCase(updateEmail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateEmail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.emails.findIndex((trip) => trip.id === action.payload.id);
        if (index !== -1) {
          state.emails[index] = action.payload;
        }
      })
      .addCase(updateEmail.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export const { setEmail, setUser } = tripSlice.actions;

export default tripSlice.reducer;
