// src/slices/employeeSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
interface EmployeeState {
  employees: any[];
  pagedEmployees: any[];
  employee: any | null;
  driverEmployees: any[];
  jobRoles: any[];
  pagedJobRoles: any[];
  jobRole: any | null;
  permissions: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: EmployeeState = {
  employees: [],
  pagedEmployees: [],
  employee: {},
  jobRoles: [],
  pagedJobRoles: [],
  jobRole: {},
  permissions: [],
  driverEmployees: [],
  status: 'idle',
  error: null,
};

const accessToken = localStorage.getItem('accessToken');

// Async thunks for backend interactions
export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
  const response = await axios.get('http://localhost:3000/employees', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
});

export const fetchDriverEmployees = createAsyncThunk('employees/fetchDriverEmployees', async () => {
  const response = await axios.get('http://localhost:3000/employees/drivers', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
});

export const createEmployee = createAsyncThunk(
  'employees/createEmployee',
  async (employee: any) => {
    const response = await axios.post('http://localhost:3000/employee', employee);
    return response.data;
  }
);

export const getPagedEmployees = createAsyncThunk(
  'employees/getPagedEmployees',
  async ({ page, pageSize }: { page: number; pageSize: number }) => {
    const response = await axios.get('http://localhost:3000/employees', {
      params: { _page: page, _limit: pageSize },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }
);

export const deleteEmployee = createAsyncThunk(
  'employees/deleteEmployee',
  async (employeeId: string) => {
    await axios.delete(`http://localhost:3000/employee/${employeeId}`);
    return employeeId;
  }
);

export const updateEmployee = createAsyncThunk(
  'employees/updateEmployee',
  async (employee: any) => {
    const response = await axios.put(`http://localhost:3000/employee/${employee.id}`, employee, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }
);

export const fetchJobRoles = createAsyncThunk('employees/fetchJobRoles', async () => {
  const response = await axios.get('http://localhost:3000/jobRoles');
  return response.data;
});

export const createJobRole = createAsyncThunk('employees/createJobRole', async (jobRole: any) => {
  const response = await axios.post('http://localhost:3000/jobRole', jobRole);
  return response.data;
});

export const deleteJobRole = createAsyncThunk(
  'employees/deleteJobRole',
  async (jobRoleId: string) => {
    await axios.delete(`http://localhost:3000/jobRole/${jobRoleId}`);
    return jobRoleId;
  }
);

export const updateJobRole = createAsyncThunk('employees/updateJobRole', async (jobRole: any) => {
  const response = await axios.put(`http://localhost:3000/jobRole/${jobRole.id}`, jobRole, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
});

export const fetchPermissions = createAsyncThunk('employees/fetchPermissions', async () => {
  const response = await axios.get('http://localhost:3000/permissions');
  return response.data;
});

export const getPagedJobRoles = createAsyncThunk(
  'jobRoles/getPagedJobRoles',
  async ({ page, pageSize }: { page: number; pageSize: number }) => {
    const response = await axios.get('http://localhost:3000/jobRoles', {
      params: { _page: page, _limit: pageSize },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }
);

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
    setStatus: (state, action) => {
      state.status = action.payload;
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
      .addCase(getPagedEmployees.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPagedEmployees.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pagedEmployees = action.payload;
      })
      .addCase(getPagedEmployees.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch paged employees';
      })
      .addCase(createEmployee.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.employees.push(action.payload);
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to create employee';
      })
      .addCase(updateEmployee.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.employees.findIndex((emp) => emp.id === action.payload.id);
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update employee';
      })
      .addCase(fetchJobRoles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobRoles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobRoles = action.payload;
      })
      .addCase(fetchJobRoles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch job roles';
      })
      .addCase(createJobRole.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createJobRole.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobRoles.push(action.payload);
      })
      .addCase(createJobRole.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(fetchPermissions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPermissions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.permissions = action.payload;
      })
      .addCase(fetchPermissions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch permissions';
      })
      .addCase(getPagedJobRoles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPagedJobRoles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pagedJobRoles = action.payload;
      })
      .addCase(getPagedJobRoles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch paged job roles';
      })
      .addCase(deleteJobRole.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteJobRole.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobRoles = state.jobRoles.filter((jobRole) => jobRole._id !== action.payload);
      })
      .addCase(deleteJobRole.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch paged job roles';
      })
      .addCase(fetchDriverEmployees.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDriverEmployees.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.driverEmployees = action.payload.data;
      })
      .addCase(fetchDriverEmployees.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch employees';
      })
  },
});

export const { setEmployee, setJobRole } = employeeSlice.actions;

export default employeeSlice.reducer;
