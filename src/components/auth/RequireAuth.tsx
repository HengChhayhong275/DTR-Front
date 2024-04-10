import { useDispatch, useSelector } from "react-redux";
import {
  logout as Logout,
  selectIsAuthenticated,
} from "../../store/features/auth/authSlice";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../environment";
import { useLogoutMutation } from "@/store/features/auth/authApiSlice";

export const RequireAuth = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation()
  



  useEffect(() => {
    async function verifyRefreshToken() {
      await axios
        .get(`${API_BASE_URL}/auth/refresh`, {
          withCredentials: true,
        })
        .catch((error) => {
          if (error?.response?.status === 401) {
            logout(undefined)
            dispatch(Logout());
          }
        });
    }
    if(isAuthenticated){
      verifyRefreshToken();
    }
  }, []);

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} state={{ from: location }} replace />
  );
};
