import { apiSlice } from "../../api/apiSlice";

export const receiveRecordApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    saveToReceivedRecord: builder.mutation({
      query: (receiveRecord) => ({
        url: "/received-records/save",
        method: "POST",
        body: { ...receiveRecord },
      }),
      invalidatesTags: ["ReceivedRecords", "AcceptingRecord", "DropOff"],
    }),
    createReceivedRecord: builder.mutation({
      query: (receiveRecord) => ({
        url: "/received-records",
        method: "POST",
        body: { ...receiveRecord },
      }),
      invalidatesTags: ["ReceivedRecords", "AcceptingRecord"],
    }),
    getReceivedRecords: builder.query({
      query: () => "/received-records",
      keepUnusedDataFor: 5,
      providesTags: ["ReceivedRecords"],
    }),
    findLatestIdReceivedRecord: builder.query ({
      query: () => '/received-records/latest',
      keepUnusedDataFor: 5,
      providesTags: ["SelfRegisteredRecord"]
    }),
  }),
});

export const { useSaveToReceivedRecordMutation, useGetReceivedRecordsQuery, useCreateReceivedRecordMutation, useFindLatestIdReceivedRecordQuery } = receiveRecordApiSlice;
