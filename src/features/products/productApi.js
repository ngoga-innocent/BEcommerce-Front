import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { url } from '@/url';
export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: url,
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
        getMyProducts: builder.query({
            query: () => '/api/products/my/',
            providesTags: ['Products'],
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
            query: ({ slug, data }) => ({
                url: `/api/products/${slug}/`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Products'],
        }),
        deleteProduct: builder.mutation({
            query: (slug) => ({
                url: `/api/products/${slug}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Products'],
        }),
    }),
});
export const { useGetProductsQuery, useGetProductQuery, useCreateProductMutation, useUpdateProductMutation, useGetMyProductsQuery, useDeleteProductMutation, } = productsApi;
