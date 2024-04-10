// Database Table : Self Registered Record List

import { apiSlice } from "../../api/apiSlice";

export const draftRecordApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
// ------------ Self ------------
    createDraftSelfRecord: builder.mutation({
      query: (values) => ({
        url: "/draft-records/self",
        method: "POST",
        body: { ...values },
      }),
      invalidatesTags: ["DraftRecord"],
    }),

    getDraftSelfRecords: builder.query ({
      query: () => '/draft-records/self',
      keepUnusedDataFor: 5,
      providesTags: ["DraftRecord"]
    }),
    
    getDraftSelfRecord: builder.query ({
      query: (id) => `/draft-records/self/${id}`,
      keepUnusedDataFor: 5,
      providesTags: ["DraftRecord"]
    }),

    updateDraftSelfRecord: builder.mutation({
      query(data) {
        const { id, draftSelfRegisteredRecord } = data;
        return {
          url: `/draft-records/self/${id}`,
          method: "PATCH",
          body: {...draftSelfRegisteredRecord},
        };
      },
      invalidatesTags: ["DraftRecord"],
    }),

    deleteDraftSelfRecord: builder.mutation({
      query: (id) => ({
        url: `/draft-records/self/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["DraftRecord"]
    }),

    saveToSelfRegisteredRecord: builder.mutation({
      query: (id) => ({
        url: `/draft-records/self/save-to-self-registered/${id}`,
        method: "POST"
      }),
      invalidatesTags: ["DraftRecord"],
    }),

    // ------------ Other ------------
    createDraftOtherRecord: builder.mutation({
      query: (values) => ({
        url: "/draft-records/other",
        method: "POST",
        body: { ...values },
      }),
      invalidatesTags: ["DraftRecord"],
    }),

    getDraftOtherRecords: builder.query ({
      query: () => '/draft-records/other',
      keepUnusedDataFor: 5,
      providesTags: ["DraftRecord", "OtherRegisteredRecord"]
    }),
    
    getDraftOtherRecord: builder.query ({
      query: (id) => `/draft-records/other/${id}`,
      keepUnusedDataFor: 5,
      providesTags: ["DraftRecord"]
    }),

    updateDraftOtherRecord: builder.mutation({
      query(data) {
        const { id, draftOtherRegisteredRecord } = data;
        return {
          url: `/draft-records/other/${id}`,
          method: "PATCH",
          body: {...draftOtherRegisteredRecord},
        };
      },
      invalidatesTags: ["DraftRecord"],
    }),

    deleteDraftOtherRecord: builder.mutation({
      query: (id) => ({
        url: `/draft-records/other/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["DraftRecord"]
    }),

    saveToOtherRegisteredRecord: builder.mutation({
      query: (id) => ({
        url: `/draft-records/other/save-to-other-registered/${id}`,
        method: "POST"
      }),
      invalidatesTags: ["DraftRecord"],
    })
  })
})

export const {
  // ------------ Self ------------
  useGetDraftSelfRecordQuery,
  useGetDraftSelfRecordsQuery,
  useCreateDraftSelfRecordMutation,
  useUpdateDraftSelfRecordMutation,
  useDeleteDraftSelfRecordMutation,
  useSaveToSelfRegisteredRecordMutation,
  // ------------ Other ------------
  useGetDraftOtherRecordQuery,
  useGetDraftOtherRecordsQuery,
  useCreateDraftOtherRecordMutation,
  useUpdateDraftOtherRecordMutation,
  useDeleteDraftOtherRecordMutation,
  useSaveToOtherRegisteredRecordMutation,

  } = draftRecordApiSlice
