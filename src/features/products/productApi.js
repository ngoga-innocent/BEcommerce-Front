import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token)
                headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    tagTypes: ['Products'],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => '/api/products/',
            providesTags: ['Products'],
        }),
        getProduct: builder.query({
            query: (slug) => `/api/products/${slug}/`,
            providesTags: ['Products'],
            // refetchOnMountOrArgChange: true,
        }),
        createProduct: builder.mutation({
            query: (data) => ({
                url: '/api/products/',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Products'],
        }),
        updateProduct: builder.mutation({
            query: ({ id, data }) => ({
                url: `/api/products/${id}/`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Products'],
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/api/products/${id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Products'],
        }),
    }),
});
export const { useGetProductsQuery, useGetProductQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation, } = productsApi;
