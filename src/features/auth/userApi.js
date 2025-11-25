import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { url } from '../../url';
export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: url,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token)
                headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => '/api/accounts/users/',
            providesTags: ['Users'],
        }),
        updateUser: builder.mutation({
            query: ({ id, data }) => ({
                url: `/api/accounts/users/${id}/`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Users'],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/api/users/${id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Users'],
        }),
    }),
});
export const { useGetUsersQuery, useUpdateUserMutation, useDeleteUserMutation } = usersApi;
