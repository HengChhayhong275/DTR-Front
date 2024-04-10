import { apiSlice } from "../../api/apiSlice";

export const acceptingRecordApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    acceptRecord: builder.mutation({
      query: (data) => ({
        url: "/received-records/receive",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["SelfRegisteredRecord", "AcceptingRecord"],
    }),

    getAcceptingRecords: builder.query({
      query: () => "/accepting-records",
      keepUnusedDataFor: 5,
      providesTags: ["AcceptingRecord"],
    }),
  }),
});

export const { 
  useAcceptRecordMutation, 
  useGetAcceptingRecordsQuery 
} =
  acceptingRecordApiSlice;
