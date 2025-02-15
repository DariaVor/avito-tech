import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Item, CreateItemRequest } from "../types";

export const itemApi = createApi({
  reducerPath: "itemApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["Item"],
  endpoints: (builder) => ({
    getItems: builder.query<Item[], void>({
      query: () => "/items",
      providesTags: ["Item"],
    }),
    getItemById: builder.query<Item, number>({
      query: (id) => `/items/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Item", id }],
    }),
    createItem: builder.mutation<Item, CreateItemRequest>({
      query: (newItem) => ({
        url: "/items",
        method: "POST",
        body: newItem,
      }),
      invalidatesTags: ["Item"],
    }),
    updateItem: builder.mutation<Item, { id: number; item: Partial<Item> }>({
      query: ({ id, item }) => ({
        url: `/items/${id}`,
        method: "PUT",
        body: item,
      }),
      invalidatesTags: ["Item"],
    }),
    deleteItem: builder.mutation<void, number>({
      query: (id) => ({
        url: `/items/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Item"],
    }),
  }),
});

export const {
  useGetItemsQuery,
  useGetItemByIdQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
} = itemApi;