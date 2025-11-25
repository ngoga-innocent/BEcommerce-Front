import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout } from '../features/auth/authSlice';
import { url } from '../url';
const baseQuery = fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token)
            headers.set('Authorization', `Bearer ${token}`);
        return headers;
    },
});
const baseQueryWithLogout = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    if (result.error?.status === 401) {
        api.dispatch(logout());
        window.location.href = '/login';
    }
    return result;
};
export default baseQueryWithLogout;
