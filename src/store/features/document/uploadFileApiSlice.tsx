import { apiSlice } from "../../api/apiSlice";

export const uploadFileRecordApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation({
      query: (file) => ({
        url: "/file-upload/upload",
        method: "POST",
        body: file,
      }),
      invalidatesTags: ["FileUpload"],
    }),
  }),
});

export const { useUploadFileMutation } = uploadFileRecordApiSlice;