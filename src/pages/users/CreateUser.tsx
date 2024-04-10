/* eslint-disable @typescript-eslint/no-explicit-any */
import Users from "@/assets/images/User.png";
import { useGetRolesQuery } from "@/store/features/role/roleApiSlice";
import { useGetUnitsQuery } from "@/store/features/unit/unitApiSlice";
import { Formik, FormikValues } from "formik";
import { useCreateUserMutation } from "@/store/features/user/userApiSlice";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { UserForm } from "../../components/form/UserForm";
import { ToastError } from "../../components/toast/ToastError";
import { UserSchema } from "../../components/schema/UserSchema";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumb } from "antd";
import { GoBackArrow } from "@/components/button/GoBackArrow";

export const CreateUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [createUser] = useCreateUserMutation();
  const { data: roles } = useGetRolesQuery(undefined);
  const { data: units } = useGetUnitsQuery(undefined);

  const navigate = useNavigate();

  const handleCreateUser = async (values: FormikValues, resetForm: any) => {
    values.password = "test";
    try {
      setIsLoading(true);
      await createUser(values).unwrap();
      resetForm();
      navigate("/users");
    } catch (err: any) {
      console.log(err?.data?.message);
      ToastError(err?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-4">
        <Breadcrumb
          separator=">"
          items={[
            {
              title: <Link to={"/dashboard"}>Dashboard</Link>,
            },
            {
              title: <Link to={"/users"}>Users</Link>,
            },
            {
              title: "Create",
            },
          ]}
        />
        <div>
          <GoBackArrow url="users"/>
          <ToastContainer />
        </div>
        <h1 className="text-2xl font-bold mb-2">Create user</h1>
      </div>
      <div className="flex w-full justify-between items-start">
        <img src={Users} className="max-w-[150px]" />
      </div>
      <Formik
        initialValues={{
          firstNameEn: "",
          lastNameEn: "",
          firstNameKh: "",
          lastNameKh: "",
          address: "",
          nationality: "",
          phoneNumber: "",
          email: "",
          gender: "male",
          dob: "",
          unit: "",
          role: "",
        }}
        validationSchema={UserSchema}
        onSubmit={(values, { resetForm }) => {
          handleCreateUser(values, resetForm);
        }}
      >
        {({ values, handleChange }) => (
          <UserForm
            isLoading={isLoading}
            units={units}
            roles={roles}
            values={values}
            handleChange={handleChange}
          />
        )}
      </Formik>
    </div>
  );
};
