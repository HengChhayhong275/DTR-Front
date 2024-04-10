// Database Table : Self Registered Record

import { apiSlice } from "../../api/apiSlice";

export const selfRegisteredRecordApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSelfRegisteredRecord: builder.mutation({
      query: (values) => ({
        url: "/self-registered-records",
        method: "POST",
        body: { ...values },
      }),
      invalidatesTags: ["SelfRegisteredRecord"],
    }),

    getSelfRegisteredRecords: builder.query ({
      query: () => '/self-registered-records',
      keepUnusedDataFor: 5,
      providesTags: ["SelfRegisteredRecord"]
    }),
    
    getSelfRegisteredRecord: builder.query ({
      query: (id) => `/self-registered-records/${id}`,
      keepUnusedDataFor: 5,
      providesTags: ["SelfRegisteredRecord"]
    }),

    updateSelfRegisteredRecord: builder.mutation({
      query(data) {
        const { id, selfRegisteredRecord } = data;
        return {
          url: `/self-registered-records/${id}`,
          method: "PATCH",
          body: {...selfRegisteredRecord},
        };
      },
      invalidatesTags: ["SelfRegisteredRecord"],
    }),

    deleteSelfRegisteredRecord: builder.mutation({
      query: (id) => ({
        url: `/self-registered-records/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["SelfRegisteredRecord"]
    }),

    findLatestIdSelfRegisteredRecord: builder.query ({
      query: () => '/self-registered-records/latest',
      keepUnusedDataFor: 5,
      providesTags: ["SelfRegisteredRecord"]
    }),

    getDocGivenNumber: builder.query ({
      query: () => '/self-registered-records/doc-given-number',
      keepUnusedDataFor: 5,
      providesTags: ["SelfRegisteredRecord"]
    }),

    dispatchSelf: builder.mutation({
      query: (values) => ({
        url: "/self-registered-records/dispatch",
        method: "POST",
        body: {...values}
      }),
      invalidatesTags: ["SelfRegisteredRecord"]
    }),

    getDispatchedSelfRecord: builder.query({
      query: () => "/self-registered-records/dispatched",
      keepUnusedDataFor: 5,
      providesTags: ["SelfRegisteredRecord"],
    }),
    dropOffSelf: builder.mutation({
      query: (values) => ({
        url: "/self-registered-records/drop-off",
        method: "POST",
        body: {...values}
      }),
      invalidatesTags: ["SelfRegisteredRecord"]
    }),
  })
})

export const {
  useDropOffSelfMutation,
  useGetSelfRegisteredRecordsQuery,
  useGetSelfRegisteredRecordQuery,
  useFindLatestIdSelfRegisteredRecordQuery,
  useGetDocGivenNumberQuery,
  useDeleteSelfRegisteredRecordMutation,
  useCreateSelfRegisteredRecordMutation,
  useUpdateSelfRegisteredRecordMutation,
  useDispatchSelfMutation,
  useGetDispatchedSelfRecordQuery
  } = selfRegisteredRecordApiSlice
