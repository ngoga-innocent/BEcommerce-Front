// features/categories/categoryApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import type { ProductCategory } from "../../types/ProductCategory";
// import { url } from "../../url";
import baseQueryWithLogout from "../baseQuery";
export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: baseQueryWithLogout,
    tagTypes: ["Category","Product"],
    endpoints: (builder) => ({
        getCategories: builder.query<ProductCategory[], void>({
            query: () => "api/categories/",
            providesTags: ["Category"],
        }),
        addCategory: builder.mutation<ProductCategory, { name: string }>({
            query: (body) => ({
                url: "api/categories/",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Category"],
        }),
        updateCategory: builder.mutation<ProductCategory, { slug: string; name: string }>({
            query: ({ slug, name }) => ({
                url: `categories/${slug}/`,
                method: "PUT",
                body: { name },
            }),
            invalidatesTags: ["Category"],
        }),
        deleteCategory: builder.mutation<{ slug: string }, string>({
            query: (slug) => ({
                url: `categories/${slug}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["Category"],
        }),
        getCategoryProducts: builder.query<any[], string>({
            query: (slug) => `categories/${slug}/products/`,
            providesTags: ["Product"], // optional for caching
        }),
    }),

});

export const {
    useGetCategoriesQuery,
    useAddCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
     useGetCategoryProductsQuery
} = categoryApi;
