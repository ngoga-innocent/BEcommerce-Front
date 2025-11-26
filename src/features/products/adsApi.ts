import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQueryWithLogout from "../baseQuery";
import { Ad } from "@/types/ads";

export const adsApi = createApi({
  reducerPath: "adsApi",
  baseQuery: baseQueryWithLogout,
  tagTypes: ["Ads"],
  endpoints: (builder) => ({
    getAds: builder.query<Ad[],void>({
      query: () => "/api/ads/",
      providesTags: ["Ads"],
    }),

    createAd: builder.mutation({
      query: (formData) => ({
        url: "/api/ads/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Ads"],
    }),

    updateAd: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/api/ads/${id}/`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Ads"],
    }),

    deleteAd: builder.mutation({
      query: (id) => ({
        url: `/api/ads/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Ads"],
    }),
  }),
});

export const {
  useGetAdsQuery,
  useCreateAdMutation,
  useUpdateAdMutation,
  useDeleteAdMutation,
} = adsApi;
