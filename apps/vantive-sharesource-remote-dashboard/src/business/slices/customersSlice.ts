import {createSlice} from '@reduxjs/toolkit';

const customersSlice = createSlice({
    name: 'customers',
    initialState: {
        customers: []
    },
    reducers: {}
});

export default customersSlice.reducer;