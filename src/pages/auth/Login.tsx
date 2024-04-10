import background from "@/assets/images/background.png";
import MPTC_Logo from "@/assets/images/MPTC_Logo.png";
import { LoadingSpinner } from "@/components/spinner/LoadingSpinner";
import { useLoginMutation } from "@/store/features/auth/authApiSlice";
import {
  logout,
  selectIsAuthenticated,
  setCredentials,
} from "@/store/features/auth/authSlice";
import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [isLoading, setIsLoading] = useState(false);

  const [login, { isSuccess }] = useLoginMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await login({ email, password })
      .unwrap()
      .then((res) => {
        dispatch(setCredentials(res?.accessToken));
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          dispatch(logout());
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isAuthenticated) {
    return <Navigate to={"/dashboard"} replace />;
  }

  // --------------- Style ---------------
  const inputStyle =
    "block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6";
  // --------------- Style ---------------

  return (
    <div
      className="min-h-screen bg-cover flex w-screen"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="flex-1 p-5">
        <div className="flex  flex-col justify-center px-6 py-12 lg:px-8  bg-white bg-opacity-90">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col">
            <img
              className="mx-auto h-20 w-auto"
              src={MPTC_Logo}
              alt="MPTC Logo"
            />
            <h2 className="mt-5 text-center text-2xl text-gray-900 font-robotoRegular">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={inputStyle}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={inputStyle}
                  />
                </div>
              </div>
              <div className="text-sm">
                <Link
                  to="forgot-password"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>
              <div>
                {isLoading ? (
                  <button
                    disabled
                    className="text-white bg-slate-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center me-2 flex w-full items-center justify-center"
                  >
                    <LoadingSpinner color="white" />
                    <span>Loading...</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div>
          <h1>Document Transaction Record System</h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
