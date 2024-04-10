/* eslint-disable @typescript-eslint/no-explicit-any */
import background from "@/assets/images/background.png";
import { LoadingSpinner } from "@/components/spinner/LoadingSpinner";
import { useForgotPasswordMutation } from "@/store/features/auth/authApiSlice";
import { ErrorMessage, Field, Form, Formik, FormikValues } from "formik";
import { useState } from "react";
import { FaPlusSquare } from "react-icons/fa";
import * as Yup from "yup";
import { useNavigate } from "react-router";

export const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const [forgotPassword] = useForgotPasswordMutation();

  const handleForgotPassword = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    try {
      setIsLoading(true);
      await forgotPassword(values)
        .unwrap()
        .then(() => setIsSuccess(true));
    } catch (error: any) {
      console.log(error?.data?.message);
      setError(error?.data?.message);
    } finally {
      setIsLoading(false);
    }
    resetForm();
  };

  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email.").required("Email is required."),
  });

  const renderContent = (
    <div className=" bg-white bg-opacity-90 min-h-[250px] min-w-[300px] lg:min-w-[600px] gap-y-4 flex flex-col p-4">
      <div>
        <h1 className="font-bold text-2xl">Forgot Password</h1>
      </div>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={ForgotPasswordSchema}
        onSubmit={(values, { resetForm }) => {
          handleForgotPassword(values, resetForm);
        }}
      >
        {({ isValid }) => (
          <Form>
            <div className="text-sm font-normal text-black">
              {/* Name */}
              <div className="flex flex-col gap-y-2">
                <label htmlFor="email" className="text-slate-600">
                  Email:
                </label>
                <Field
                  name="email"
                  type="text"
                  className="w-full py-2 px-2 rounded-md shadow-2xl border border-gray-400"
                />
                <div className="text-red-500 text-sm">
                  <ErrorMessage name="email" />
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={!isValid || isLoading}
              className="flex items-center gap-x-2 bg-custom-blue max-w-[150px] w-full justify-center mt-4 px-4 py-2 text-base font-regular text-white rounded-lg hover:bg-blue-600 disabled:bg-slate-400"
            >
              {isLoading ? <LoadingSpinner color="white" /> : <FaPlusSquare />}
              Submit
            </button>
            {error && <p>{error}</p>}
          </Form>
        )}
      </Formik>
    </div>
  );

  const success = (
    <div className=" bg-white bg-opacity-90 min-h-[250px] min-w-[300px] lg:min-w-[600px] gap-y-4 flex flex-col p-4 justify-center items-center">
      <h1 className="text-2xl max-w-[300px] text-center">
        You will receive an email with instructions on how to reset your
        password in a few minutes.
      </h1>
      <button
        onClick={() => {
          navigate("/");
        }}
        className="flex items-center gap-x-2 bg-custom-blue max-w-[150px] w-full justify-center mt-4 px-4 py-2 text-base font-regular text-white rounded-lg hover:bg-blue-600"
      >
        Back to login page.
      </button>
    </div>
  );

  return (
    <div
      className="h-screen bg-cover w-full grid place-content-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      {isSuccess ? success : renderContent}
    </div>
  );
};
