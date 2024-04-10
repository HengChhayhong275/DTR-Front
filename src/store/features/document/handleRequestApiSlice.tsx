import { apiSlice } from "../../api/apiSlice";

export const handleRequestApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    acceptRequest: builder.mutation({
      query(data) {
        const { id, acceptRequest } = data;
        return {
          url: `/draft-records/self/${id}/accept`,
          method: "PATCH",
          body: { ...acceptRequest },
        };
      },
      invalidatesTags: ["SelfRegisteredRecord", "AcceptRequest", "DraftRecord", "OtherRegisteredRecord"],
    }),

    rejectRequest: builder.mutation({
      query: (id) => ({
          url: `/draft-records/self/${id}/reject`,
          method: "DELETE",
        }),
      invalidatesTags: ["RejectRequest", "DraftRecord"]
    }),

  }),
});

export const { 
    useAcceptRequestMutation,
    useRejectRequestMutation,
} =
  handleRequestApiSlice;
