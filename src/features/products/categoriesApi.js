// features/categories/categoryApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
// import { url } from "../../url";
import baseQueryWithLogout from "../baseQuery";
export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: baseQueryWithLogout,
    tagTypes: ["Category", "Product"],
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => "api/categories/",
            providesTags: ["Category"],
        }),
        addCategory: builder.mutation({
            query: (body) => ({
                url: "api/categories/",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Category"],
        }),
        updateCategory: builder.mutation({
            query: ({ slug, name }) => ({
                url: `api/categories/${slug}/`,
                method: "PUT",
                body: { name },
            }),
            invalidatesTags: ["Category"],
        }),
        deleteCategory: builder.mutation({
            query: (slug) => ({
                url: `api/categories/${slug}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["Category"],
        }),
        getCategoryProducts: builder.query({
            query: (slug) => `api/categories/${slug}/products/`,
            providesTags: ["Product"], // optional for caching
        }),
    }),
});
export const { useGetCategoriesQuery, useAddCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation, useGetCategoryProductsQuery } = categoryApi;
