// Database Table : Other Registered Record

import { OtherRegisteredRecord } from "@/@types";
import { apiSlice } from "../../api/apiSlice";

export const otherRegisteredRecordApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOtherRegisteredRecord: builder.mutation({
      query: (values) => ({
        url: "/other-registered-records",
        method: "POST",
        body: { ...values },
      }),
      invalidatesTags: ["OtherRegisteredRecord"],
    }),
    dropOffOther: builder.mutation({
      query: (values) => ({
        url: "/other-registered-records/drop-off",
        method: "POST",
        body: { ...values },
      }),
      invalidatesTags: ["OtherRegisteredRecord"],
    }),
    getOtherRegisteredRecords: builder.query({
      query: () => "/other-registered-records",
      keepUnusedDataFor: 5,
      providesTags: ["OtherRegisteredRecord", "AcceptRequest"],
    }),

    getOtherRegisteredRecord: builder.query<OtherRegisteredRecord, string | undefined>({
      query: (id) => `/other-registered-records/${id}`,
      keepUnusedDataFor: 5,
      providesTags: ["OtherRegisteredRecord"],
    }),
    dispatchOther: builder.mutation({
      query: (values) => ({
        url: "/other-registered-records/dispatch",
        method: "POST",
        body: { ...values },
      }),
      invalidatesTags: ["OtherRegisteredRecord"],
    }),
    getDispatchOtherRecord: builder.query({
      query: () => "/other-registered-records/dispatched",
      keepUnusedDataFor: 5,
      providesTags: ["OtherRegisteredRecord"],
    }),
    updateOtherRegisteredRecord: builder.mutation({
      query(data) {
        const { id, otherRegisteredRecord } = data;
        return {
          url: `/other-registered-records/${id}`,
          method: "PATCH",
          body: { ...otherRegisteredRecord },
        };
      },
      invalidatesTags: ["OtherRegisteredRecord"],
    }),

    deleteOtherRegisteredRecord: builder.mutation({
      query: (id) => ({
        url: `/other-registered-records/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["OtherRegisteredRecord"],
    }),
    getDispatchedRecord: builder.query({
      query: () => "/other-registered-records/dispatched",
      keepUnusedDataFor: 5,
      providesTags: ["OtherRegisteredRecord"],
    }),
  }),
});

export const {
  useGetOtherRegisteredRecordsQuery,
  useGetOtherRegisteredRecordQuery,
  useDeleteOtherRegisteredRecordMutation,
  useCreateOtherRegisteredRecordMutation,
  useUpdateOtherRegisteredRecordMutation,
  useDispatchOtherMutation,
  useGetDispatchOtherRecordQuery,
  useDropOffOtherMutation,
} = otherRegisteredRecordApiSlice;
