import { apiSlice } from "../../api/apiSlice";

export const unitApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getUnits: builder.query ({
      query: () => '/units',
      keepUnusedDataFor: 5,
      providesTags: ["Unit"]
    }),

    getUnit: builder.query ({
      query: (id) => `/units/${id}`,
      keepUnusedDataFor: 5,
      providesTags: ["Unit"]
    }),

    createUnit: builder.mutation({
      query: (unit) => ({
        url: "/units",
        method: "POST",
        body: { ...unit },
      }),
      invalidatesTags: ["Unit"],
    }),

    updateUnit: builder.mutation({
      query(data) {
        const { id,unit } = data;
        return {
          url: `/units/${id}`,
          method: "PATCH",
          body: {...unit},
        };
      },
      invalidatesTags: ["Unit"],
    }),
    
    deleteUnit: builder.mutation({
      query: (id) => ({
        url: `/units/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["Unit"]
    })

  })
})

export const {
  useGetUnitsQuery,
  useGetUnitQuery,
  useDeleteUnitMutation, 
  useCreateUnitMutation, 
  useUpdateUnitMutation
} = unitApiSlice