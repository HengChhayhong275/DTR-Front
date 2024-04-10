import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/environment";
import { RootState } from "@/store/store";
import { logout, setCredentials } from "@/store/features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).auth.accessToken;
    headers.set("content-type", "application/json");
    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
    try {
      if (refreshResult?.data) {
        api.dispatch(setCredentials({ ...refreshResult?.data }));
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    } catch (error) {
      api.dispatch(logout());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "User",
    "Role",
    "Unit",
    "UnitType",
    "DocumentType",
    "DocumentOriginInfo",
    "SelfRegisteredRecord",
    'OtherRegisteredRecord',
    "DraftRecord",
    "AcceptingRecord",
    "ReceivedRecords",
    "Auth",
    "DropOff",
    "AcceptRequest",
    "RejectRequest",
    "FileUpload"
  ],
  endpoints: () => ({}),
});
