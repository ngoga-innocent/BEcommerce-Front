import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { url } from '../../url';
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: url }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: `${url}/api/auth/token/`,
                method: 'POST',
                body: credentials,
            }),
        }),
        register: builder.mutation({
            query: (body) => ({
                url: `${url}/api/accounts/register/`,
                method: 'POST',
                body,
            }),
        }),
    }),
});
export const { useLoginMutation, useRegisterMutation } = authApi;
