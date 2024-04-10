import { apiSlice } from "../../api/apiSlice";

export const documentTypeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDocumentTypes: builder.query ({
      query: () => '/document-types',
      keepUnusedDataFor: 5,
      providesTags: ["DocumentType"]
    }),
    getDocumentType: builder.query ({
      query: (id) => `/document-types/${id}`,
      keepUnusedDataFor: 5,
      providesTags: ["DocumentType"]
    }),
    createDocumentType: builder.mutation({
      query: (documentType) => ({
        url: "/document-types",
        method: "POST",
        body: { ...documentType },
      }),
      invalidatesTags: ["DocumentType"],
    }),
    updateDocumentType: builder.mutation({
      query (data) {
        const {id, documentType} = data
        console.log(documentType);
        return {
          url: `/document-types/${id}`,
          method: "PATCH",
          body: {...documentType},
        };
      },
      invalidatesTags: ["DocumentType"]
    }),
    deleteDocumentType: builder.mutation({
      query (id) {
        return {
          url: `/document-types/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["DocumentType"]
    })
  })
})

export const {
  useGetDocumentTypesQuery,
  useGetDocumentTypeQuery,
  useUpdateDocumentTypeMutation,
  useCreateDocumentTypeMutation,
  useDeleteDocumentTypeMutation
} = documentTypeApiSlice
