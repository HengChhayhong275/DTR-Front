import { apiSlice } from "../../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAuthUser: builder.query({
      query: () => '/auth/me',
      keepUnusedDataFor: 5,
      providesTags: ["Auth"]
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: {...credentials}
      }),
      invalidatesTags: ["Auth"]
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: {...email}
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'GET'
      }),
    })
  }),
});

export const { useGetAuthUserQuery, useForgotPasswordMutation, useLogoutMutation, useLoginMutation} = authApiSlice;
