import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

interface UserInfo {
    sub?: string;
    name?: string;
    email?: string;
    preferred_username?: string;
    [key: string]: any;
}

interface AuthState {
    isAuthenticated: boolean;
    loading: boolean;
    user: UserInfo | null;
    accessToken: string | null;
    idToken: string | null;
    error: string | null;
    lastRequestedId: number;
}

const initialState: AuthState = {
    isAuthenticated: false,
    loading: false,
    user: null,
    accessToken: null,
    idToken: null,
    error: null,
    lastRequestedId: -1
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        // Okta Authentication Actions
        oktaLoginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        oktaLoginSuccess: (state, action: PayloadAction<{ user: UserInfo; accessToken: string; idToken: string }>) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.idToken = action.payload.idToken;
            state.error = null;
        },
        oktaLoginFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.accessToken = null;
            state.idToken = null;
            state.error = action.payload;
        },
        oktaLogout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.accessToken = null;
            state.idToken = null;
            state.error = null;
            state.loading = false;
        },
        clearAuthError: (state) => {
            state.error = null;
        },
        // Legacy profile actions (keep for backward compatibility)
        fetchProfileStart: (state, action: PayloadAction<{ id: number }>) => {
            state.lastRequestedId = action.payload!.id;
            state.loading = true;
            state.error = null;
        },
        fetchProfileSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        fetchProfileFailure: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        },
    }
});

export const {
    oktaLoginStart,
    oktaLoginSuccess,
    oktaLoginFailure,
    oktaLogout,
    clearAuthError,
    fetchProfileStart,
    fetchProfileSuccess,
    fetchProfileFailure
} = profileSlice.actions;

export default profileSlice.reducer;