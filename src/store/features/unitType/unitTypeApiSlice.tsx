import { apiSlice } from "@/store/api/apiSlice";

export const unitTypeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUnitTypes: builder.query ({
      query: () => '/unit-types',
      keepUnusedDataFor: 5,
      providesTags: ["UnitType"]
    }),

    getUnitType: builder.query ({
      query: (id) => `/unit-types/${id}`,
      keepUnusedDataFor: 5,
      providesTags: ["UnitType"]
    }),

    createUnitType: builder.mutation({
      query: (unitType) => ({
        url: "/unit-types",
        method: "POST",
        body: { ...unitType },
      }),
      invalidatesTags: ["UnitType"],
    }),

    updateUnitType: builder.mutation({
      query(data) {
        const { id,unitType } = data;
        return {
          url: `/unit-types/${id}`,
          method: "PATCH",
          body: {...unitType},
        };
      },
      invalidatesTags: ["UnitType"],
    }),
    
    deleteUnitType: builder.mutation({
      query: (id) => ({
        url: `/unit-types/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["UnitType"]
    })
  })
})

export const {
  useGetUnitTypesQuery,
  useGetUnitTypeQuery,
  useCreateUnitTypeMutation,
  useUpdateUnitTypeMutation,
  useDeleteUnitTypeMutation
} = unitTypeApiSlice