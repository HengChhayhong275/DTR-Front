import { useState } from "react";
import { Formik, FormikValues } from "formik";
import { RoleSchema } from "../../schema/RoleSchema";
import { ToastSucess } from "../../toast/ToastSucess";
import { ToastError } from "../../toast/ToastError";
import { useUpdateRoleMutation } from "@/store/features/role/roleApiSlice";
import { Role } from "@/@types";
import { RoleForm } from "../../form/RoleForm";
import { BaseModal } from "../BaseModal";

export const UpdateRoleModal = ({
  open,
  setOpen,
  role,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  role: Role | undefined;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [updateRole] = useUpdateRoleMutation();

  const handleEditRole = async (values: FormikValues) => {
    try {
      setIsLoading(true);
      console.log(values);
      const id = role?.id;
      await updateRole({ id, role: values }).unwrap();
      ToastSucess("Role Updated Successfully!");
      setOpen(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      ToastError(error?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BaseModal open={open} setOpen={setOpen}>
      <div className="max-w-[500px]">
        {/* Name */}
        <h1 className="text-2xl font-bold text-black mb-4">Update role</h1>

        <Formik
          enableReinitialize={true}
          initialValues={{
            name: role?.name,
            description: role?.description,
          }}
          validationSchema={RoleSchema}
          onSubmit={(values) => {
            handleEditRole(values);
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
      </div>
    </BaseModal>
  );
};
