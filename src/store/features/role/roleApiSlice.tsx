import { apiSlice } from "@/store/api/apiSlice";

export const roleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query({
      query: () => "/roles",
      keepUnusedDataFor: 5,
      providesTags: ["Role"],
    }),
    createRole: builder.mutation({
      query: (data) => ({
        url: "/roles",
        method: "POST",
        body : {...data}
      }),
      invalidatesTags: ["Role"]
    }),
    getRole: builder.query({
      query: (id) => `/roles/${id}`,
      keepUnusedDataFor: 5,
      providesTags: ["Role"],
    }),
    updateRole: builder.mutation({
      query (data) {
        const {id, role} = data
        return {
          url: `/roles/${id}`,
          method: "PATCH",
          body: {...role},
        };
      },
      invalidatesTags: ["Role"]
    })
  }),
});


export const {useGetRolesQuery, useCreateRoleMutation,useGetRoleQuery, useUpdateRoleMutation } = roleApiSlice