import { Formik, FormikValues } from "formik";
import { BaseModal } from "../BaseModal";
import { ChangeUserPasswordSchema } from "@/components/schema/ChangeUserPasswordSchema";
import { useState } from "react";
import { useChangePasswordMutation } from "@/store/features/user/userApiSlice";
import { ToastSucess } from "@/components/toast/ToastSucess";
import { ToastError } from "@/components/toast/ToastError";
import { ChangePasswordForm } from "@/components/form/ChangePasswordForm";

export const ChangeUserPasswordModal = ({open,
  setOpen, userId}: {  open: boolean;
    setOpen: (val: boolean) => void;
    userId: string | undefined
  }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [changePassword] = useChangePasswordMutation();


  const handleChangePassword = async (values: FormikValues, resetForm: () => void) => {
    try {
      setIsLoading(true);
      values.userId = userId
      await changePassword(values).unwrap();
      ToastSucess("Password Changed Successfully!")
      resetForm()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      ToastError(`${error?.data?.message}`)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BaseModal open={open} setOpen={setOpen}>
    <h1 className="text-2xl font-bold text-black mb-4">
      Change User Password
    </h1>
      <Formik
          initialValues={{
            newPassword: "",
            confPassword: "",
          }}
          validationSchema={ChangeUserPasswordSchema}
          onSubmit={(values, {resetForm}) => {
            handleChangePassword(values, resetForm);
          }}
        >
          {({values, handleChange}) => (
            <ChangePasswordForm values={values} handleChange={handleChange} isLoading={isLoading}/>
          )}
        </Formik>
    </BaseModal>
    
  )
}
