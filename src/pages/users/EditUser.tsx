import { ToastContainer } from "react-toastify";
import { GoBackArrow } from "../../components/button/GoBackArrow";
import Users from "@/assets/images/User.png";
import { Formik, FormikValues } from "formik";
import { useParams } from "react-router";
import { UserSchema } from "../../components/schema/UserSchema";
import { UserForm } from "../../components/form/UserForm";
import { useState } from "react";
import { useGetRolesQuery } from "@/store/features/role/roleApiSlice";
import { useGetUnitsQuery } from "@/store/features/unit/unitApiSlice";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "@/store/features/user/userApiSlice";
import { LoadingSpinner } from "../../components/spinner/LoadingSpinner";
import { ToastSucess } from "../../components/toast/ToastSucess";
import { ToastError } from "../../components/toast/ToastError";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

export const EditUser = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const { data: roles } = useGetRolesQuery(undefined);
  const { data: units } = useGetUnitsQuery(undefined);
  const { data: user, isLoading } = useGetUserQuery(id);
  const [updateUser] = useUpdateUserMutation();

  const handleEditUser = async (values: FormikValues) => {
    try {
      setLoading(true);
      console.log(values);
      await updateUser({ id, user: values }).unwrap();
      ToastSucess("User Updated Successfully!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err?.data?.message);
      ToastError(err?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner color="black" />;
  }

  return (
    <div className="bg-white p-8 w-full flex flex-col gap-y-4">
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
              title: "Edit User",
            },
          ]}
        />
        <div>
          <GoBackArrow url="users"/>
          <ToastContainer />
        </div>
        <h1 className=" text-2xl">Edit User Info</h1>
      </div>
      <div className="flex w-full justify-between items-start">
        <img src={Users} className="max-w-[200px]" />
      </div>
      <Formik
        initialValues={{
          firstNameEn: user?.firstNameEn,
          lastNameEn: user?.lastNameEn,
          firstNameKh: user?.firstNameKh,
          lastNameKh: user?.lastNameKh,
          address: user?.address,
          nationality: user?.nationality,
          phoneNumber: user?.phoneNumber,
          email: user?.credential?.email,
          gender: user?.gender,
          dob: user?.dob,
          unit: user?.unit?.id,
          role: user?.role?.id,
        }}
        validationSchema={UserSchema}
        onSubmit={(values) => {
          handleEditUser(values);
        }}
      >
        {({ values, handleChange }) => (
          <UserForm
            isLoading={loading}
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
