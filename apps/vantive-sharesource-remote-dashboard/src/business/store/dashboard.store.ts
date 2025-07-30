import {configureStore} from '@reduxjs/toolkit';
import customersReducer from '../slices/customersSlice';

export const dashboardStore = configureStore({
    reducer: {
        customers: customersReducer
    }
});

export type DashboardStore = ReturnType<typeof dashboardStore.getState>;
export type DashboardDispatch = typeof dashboardStore.dispatch