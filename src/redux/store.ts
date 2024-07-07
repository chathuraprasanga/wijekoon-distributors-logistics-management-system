import { configureStore } from '@reduxjs/toolkit';
import employeeSlice from './slices/employeeSlice';
import authSlice from './slices/authSlice';
import customerSlice from './slices/customerSlice';
import supplierSlice from './slices/supplierSlice';
import chequesSlice from './slices/chequesSlice';
import tripsSlice from './slices/tripsSlice';
import assetsSlice from './slices/assetsSlice';
import dashboardSlice from './slices/dashboardSlice';
import customerPortalSlice from './slices/customerPortalSlice';
import settingSlice from './slices/settingSlice';

export const store = configureStore({
  reducer: {
    employees: employeeSlice,
    customers: customerSlice,
    suppliers: supplierSlice,
    cheques: chequesSlice,
    trips: tripsSlice,
    assets: assetsSlice,
    auth: authSlice,
    dashboard: dashboardSlice,
    customerPortal: customerPortalSlice,
    settings: settingSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
