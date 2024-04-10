import { apiSlice } from "../../api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/users",
        keepUnusedDataFor: 5,
        providesTags: ["User"],
      })
    }),
    getUser: builder.query({
      query: (id) => `/users/${id}`,
      keepUnusedDataFor: 5,
      providesTags: ["User"],
    }),
    createUser: builder.mutation({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body: { ...body },
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    changePassword: builder.mutation({
      query: (credentials) => ({
        url: "/users/change-password",
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["User"],
    }),
    changePasswordForUser: builder.mutation({
      query: (credentials) => ({
        url: "/users/change-password-user",
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query(data) {
        const { id,user } = data;
        return {
          url: `/users/${id}`,
          method: "PATCH",
          body: {...user},
        };
      },
      invalidatesTags: ["User"],
    }),
    resetPassword: builder.mutation({
      query: (credentials) => ({
        url: "/users/reset-password",
        method: "POST",
        body: {...credentials}
      }),
    })
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useDeleteUserMutation,
  useCreateUserMutation,
  useChangePasswordMutation,
  useChangePasswordForUserMutation,
  useUpdateUserMutation,
  useResetPasswordMutation
} = userApiSlice;
