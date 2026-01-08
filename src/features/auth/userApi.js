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
        // GET USERS
        getUsers: builder.query({
            query: () => '/api/accounts/users/',
            providesTags: ['Users'],
        }),
        // ADD USER (CREATE)
        addUser: builder.mutation({
            query: (data) => ({
                url: '/api/accounts/users/',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Users'],
        }),
        // UPDATE USER
        updateUser: builder.mutation({
            query: ({ id, data }) => ({
                url: `/api/accounts/users/${id}/`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Users'],
        }),
        // DELETE USER
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/api/accounts/users/${id}/`, // fixed path
                method: 'DELETE',
            }),
            invalidatesTags: ['Users'],
        }),
    }),
});
export const { useGetUsersQuery, useAddUserMutation, useUpdateUserMutation, useDeleteUserMutation, } = usersApi;
