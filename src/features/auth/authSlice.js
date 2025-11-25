import { createSlice } from '@reduxjs/toolkit';
const tokenFromStorage = localStorage.getItem('token');
const initialState = {
    token: tokenFromStorage,
    username: null,
    isAuthenticated: !!tokenFromStorage,
    user: tokenFromStorage ? JSON.parse(localStorage.getItem('user') || 'null') : null,
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload.token;
            state.username = action.payload.username;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            const now = new Date().getTime();
            localStorage.setItem('token_created_at', now.toString());
        },
        logout: (state) => {
            state.token = null;
            state.username = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
        },
    },
});
export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
