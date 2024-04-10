/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formik, FormikValues } from "formik";
import { RoleForm } from "../../form/RoleForm";
import { RoleSchema } from "../../schema/RoleSchema";
import { useCreateRoleMutation } from "@/store/features/role/roleApiSlice";
import { useState } from "react";
import { ToastSucess } from "../../toast/ToastSucess";
import { ToastError } from "../../toast/ToastError";
import { BaseModal } from "../BaseModal";

export const CreateRoleModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [createRole] = useCreateRoleMutation();

  const handleCreateRole = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    try {
      await createRole(values).unwrap();
      ToastSucess("Role Created Successfully!");
      resetForm();
      setOpen(false);
    } catch (error: any) {
      console.log(error);
      ToastError(error?.data?.message);
    } finally {
      setIsLoading(false);
    }
    resetForm();
  };

  return (
    <BaseModal open={open} setOpen={setOpen}>
      <h1 className="text-2xl font-bold text-black mb-4">Create a new role</h1>
      <Formik
        initialValues={{
          name: "",
          description: "",
        }}
        validationSchema={RoleSchema}
        onSubmit={(values, { resetForm }) => {
          handleCreateRole(values, resetForm);
        }}
      >
        {({ values, handleChange }) => (
          <RoleForm
            values={values}
            handleChange={handleChange}
            isLoading={isLoading}
          />
        )}
      </Formik>
    </BaseModal>
  );
};
