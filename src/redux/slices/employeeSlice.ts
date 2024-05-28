// src/slices/employeeSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
interface EmployeeState {
  employees: any[];
  pagedEmployees: any[];
  jobRoles: any[];
  employee: any | null;
  jobRole: any | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: EmployeeState = {
  employees: [],
  pagedEmployees: [],
  jobRoles: [],
  employee: null,
  jobRole: null,
  status: 'idle',
  error: null,
};

// Async thunks for backend interactions
export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
  const response = await axios.get('http://localhost:3000/employees');
  return response.data;
});

export const fetchJobRoles = createAsyncThunk('employees/fetchJobRoles', async () => {
  const response = await axios.get('http://localhost:3000/jobRoles');
  return response.data;
});

export const createEmployee = createAsyncThunk('employees/createEmployee', async (employee: any) => {
  const response = await axios.post('http://localhost:3000/employee', employee);
  return response.data;
});

export const updateEmployee = createAsyncThunk('employees/updateEmployee', async (employee: any) => {
  const response = await axios.put(`http://localhost:3000/employees/${employee.id}`, employee);
  return response.data;
});

export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (employeeId: string) => {
  await axios.delete(`http://localhost:3000/employees/${employeeId}`);
  return employeeId;
});

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setEmployee: (state, action) => {
      state.employee = action.payload;
    },
    setJobRole: (state, action) => {
      state.jobRole = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch employees';
      })
      // Similar cases for other thunks
      .addCase(fetchJobRoles.fulfilled, (state, action) => {
        state.jobRoles = action.payload;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex(emp => emp.id === action.payload.id);
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(emp => emp.id !== action.payload);
      });
  },
});

export const { setEmployee, setJobRole } = employeeSlice.actions;

export default employeeSlice.reducer;
