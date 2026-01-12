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
    getMyProducts: builder.query<Product[], void>({
      query: () => '/api/products/my/',
      providesTags: ['Products'],
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
    deleteProduct: builder.mutation<{ success: boolean; slug: string }, string>({
      query: (slug) => ({
        url: `/api/products/${slug}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
    addHomeBanner: builder.mutation<any, FormData>({
      query: (data) => ({
        url: '/api/home-banners/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),
    addLoginBanner: builder.mutation<any, FormData>({
      query: (data) => ({
        url: '/api/login-banners/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),
    getHomeBanners: builder.query<any[], void>({
      query: () => '/api/home-banners/',
      providesTags: ['Products'],
    }),
    getLoginBanners: builder.query<any[], void>({
      query: () => '/api/login-banners/',
      providesTags: ['Products'],
    }),
    deleteHomeBanner: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `/api/home-banners/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
    deleteLoginBanner: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `/api/login-banners/${id}/`,
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
  useGetMyProductsQuery,
  useDeleteProductMutation,
  useAddHomeBannerMutation,
  useAddLoginBannerMutation,
  useGetHomeBannersQuery,
  useGetLoginBannersQuery,
  useDeleteHomeBannerMutation,
  useDeleteLoginBannerMutation,
} = productsApi;
