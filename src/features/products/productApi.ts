import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Product } from '../../types/Product';
import { url } from '@/url';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => '/api/products/',
      providesTags: ['Products'],
    }),
    getProduct: builder.query<Product, string>({
      query: (slug) => `/api/products/${slug}/`,
      providesTags: ['Products'],
      // refetchOnMountOrArgChange: true,
    }),
    createProduct: builder.mutation<Product, FormData>({
      query: (data) => ({
        url: '/api/products/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),
    updateProduct: builder.mutation<Product, { slug: string; data: FormData }>({
      query: ({ slug, data }) => ({
        url: `/api/products/${slug}/`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),
    deleteProduct: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `/api/products/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
