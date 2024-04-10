import background from "@/assets/images/background.png";
import { Formik, FormikValues } from "formik";
import { ChangeUserPasswordSchema } from "@/components/schema/ChangeUserPasswordSchema";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { ToastError } from "@/components/toast/ToastError";
import { useResetPasswordMutation } from "@/store/features/user/userApiSlice";
import { ToastContainer } from "react-toastify";
import { ChangePasswordForm } from "@/components/form/ChangePasswordForm";

export const ResetPassword = () => {
  const { token } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()

  const [resetPassword] = useResetPasswordMutation()

  const handleChangePassword = async (values: FormikValues) => {
    try {
      setIsLoading(true);
      values.token = token;
      await resetPassword(values).unwrap();
      navigate('/')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      ToastError(`${error?.data?.message}`)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="h-screen bg-cover w-full grid place-content-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className=" bg-white bg-opacity-90 min-h-[250px] min-w-[300px] lg:min-w-[600px] gap-y-4 p-4 flex flex-col">
        <div>
          <h1 className="font-bold text-2xl">Forgot Password</h1>
        </div>
        <ToastContainer/>
        <Formik
          initialValues={{
            newPassword: "",
            confPassword: "",
          }}
          validationSchema={ChangeUserPasswordSchema}
          onSubmit={(values) => {
            handleChangePassword(values);
          }}
        >
          {({values, handleChange}) => (
            <ChangePasswordForm values={values} handleChange={handleChange} isLoading={isLoading}/>
          )}
        </Formik>
      </div>
    </div>
  );
};
