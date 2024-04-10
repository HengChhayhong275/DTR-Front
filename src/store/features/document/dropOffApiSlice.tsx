import { apiSlice } from "../../api/apiSlice";

export const dropOffApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllDropOff: builder.query ({
      query: () => `/drop-off-records`,
      keepUnusedDataFor: 5,
      providesTags: ["DropOff"]
    }),
    getDropOffRecordById: builder.query ({
      query: (id) => `/drop-off-records/${id}`,
      keepUnusedDataFor: 5,
      providesTags: ["DropOff"]
    }),
  }),
});

export const { 
  useGetDropOffRecordByIdQuery,
  useGetAllDropOffQuery
} =
  dropOffApiSlice;
