import { GoBackArrow } from "@/components/button/GoBackArrow";
import { LoadingSpinner } from "@/components/spinner/LoadingSpinner";
import { useGetAuthUserQuery } from "@/store/features/auth/authApiSlice";
import { Breadcrumb, Button, Input } from "antd";
import { useState } from "react";
import { FaLock, FaPlusSquare } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import User from "@/assets/images/User.png";
import { BaseModal } from "@/components/modal/BaseModal";
import { ErrorMessage, Form, Formik, FormikValues } from "formik";
import * as Yup from "yup";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { ToastError } from "@/components/toast/ToastError";
import { useChangePasswordForUserMutation } from "@/store/features/user/userApiSlice";
import { ToastSucess } from "@/components/toast/ToastSucess";
import { Link } from "react-router-dom";

export const Profile = () => {
  const { data: authUser, isFetching } = useGetAuthUserQuery(undefined);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [changePasswordForUser] = useChangePasswordForUserMutation();

  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;

  const ChangePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Old password is required."),
    newPassword: Yup.string()
      .required("New password is required.")
      .matches(
        passwordRegex,
        "Password must be at least 6 characters, a number, an Uppercase, and a Lowercase"
      ),
    confPassword: Yup.string()
      .required("Confirm password is required.")
      .oneOf(
        [Yup.ref("newPassword")],
        "Confirm password must match with your new password."
      ),
  });

  if (isFetching) {
    return (
      <div className="grid place-content-center h-full">
        <LoadingSpinner color="black" />
      </div>
    );
  }

  const gender = authUser?.gender;

  const handleChangePassword = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    try {
      setIsLoading(true);
      values.userId = authUser?.id;
      await changePasswordForUser(values).unwrap();
      ToastSucess("Password Changed Successfully.");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      ToastError(error?.data?.message);
    } finally {
      resetForm();
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 w-full flex flex-col gap-y-4">
      <Breadcrumb
            separator=">"
            items={[
              {
                title: <Link to={"/dashboard"}>Dashboard</Link>,
              },
              {
                title: "Profle",
              },
            ]}
          />
      <div className="flex justify-between w-full max-h-[45px]">
        
        <div className="max-h-[40px]">
          <ToastContainer />
          <GoBackArrow url="dashboard" />
        </div>
        <div className="flex gap-x-4">
          <Button
            type="primary"
            className="py-2 px-4 bg-custom-blue text-white rounded-lg flex gap-x-2 items-center text-base h-full hover:!bg-blue-600 hover:!text-white"
            onClick={() => {
              setOpen(true);
            }}
          >
            <FaLock />
            Change Password
          </Button>
        </div>
      </div>
      <h1 className="text-2xl">Profile</h1>
      <img src={User} className="max-w-[200px]" />
      <div className="grid grid-cols-4 gap-y-8 text-sm font-normal text-black">
        <div>
          <p className="text-slate-600 text-base mb-1">Firstname(En):</p>
          <p className="text-base">{authUser?.firstNameEn}</p>
        </div>
        <div>
          <p className="text-slate-600 text-base mb-1">Lastname(En):</p>
          <p className="text-base">{authUser?.lastNameEn}</p>
        </div>
        <div>
          <p className="text-slate-600 text-base mb-1">Firstname(Kh):</p>
          <p className="text-base">{authUser?.firstNameKh}</p>
        </div>
        <div>
          <p className="text-slate-600 text-base mb-1">Lastname(Kh):</p>
          <p className="text-base">{authUser?.lastNameKh}</p>
        </div>
        <div>
          <p className="text-slate-600 text-base mb-1">Gender:</p>
          <p className="text-base">{gender?.toUpperCase()}</p>
        </div>
        <div>
          <p className="text-slate-600 text-base mb-1">Nationality:</p>
          <p className="text-base">{authUser?.nationality}</p>
        </div>
        <div>
          <p className="text-slate-600 text-base mb-1">Address:</p>
          <p className="text-base">{authUser?.address}</p>
        </div>
        <div>
          <p className="text-slate-600 text-base mb-1">Date of Birth:</p>
          <p className="text-base">{authUser?.dob}</p>
        </div>
        <div>
          <p className="text-slate-600 text-base mb-1">Email:</p>
          <p className="text-base">{authUser?.credential.email}</p>
        </div>
        <div>
          <p className="text-slate-600 text-base mb-1">Phone Number:</p>
          <p className="text-base">{authUser?.phoneNumber}</p>
        </div>
        <div>
          <p className="text-slate-600 text-base mb-1">Unit:</p>
          <p className="text-base">{authUser?.unit?.name}</p>
        </div>
        <div>
          <p className="text-slate-600 text-base mb-1">Role:</p>
          <p className="text-base">{authUser?.role?.name}</p>
        </div>
      </div>
      <BaseModal open={open} setOpen={setOpen}>
        <h1 className="text-2xl font-bold text-black mb-4">
          Change User Password
        </h1>
        <Formik
          initialValues={{
            oldPassword: "",
            newPassword: "",
            confPassword: "",
          }}
          validationSchema={ChangePasswordSchema}
          onSubmit={(values, { resetForm }) => {
            handleChangePassword(values, resetForm);
          }}
        >
          {({ values, handleChange }) => (
            <Form>
              <div className="grid grid-cols-1 gap-y-4 gap-x-4 text-sm font-normal text-black w-full">
                <div className="flex flex-col gap-y-2">
                  <label htmlFor="newPassword" className="text-slate-600">
                    Old password:
                  </label>
                  <Input.Password
                    name="oldPassword"
                    value={values.oldPassword}
                    onChange={handleChange}
                    placeholder="input password"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                  <div className="text-red-500 text-sm">
                    <ErrorMessage name="oldPassword" />
                  </div>
                </div>
                <div className="flex flex-col gap-y-2">
                  <label htmlFor="newPassword" className="text-slate-600">
                    New password:
                  </label>
                  <Input.Password
                    name="newPassword"
                    value={values.newPassword}
                    onChange={handleChange}
                    placeholder="input password"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                  <div className="text-red-500 text-sm">
                    <ErrorMessage name="newPassword" />
                  </div>
                </div>
                <div className="flex flex-col gap-y-2">
                  <label htmlFor="confPassword" className="text-slate-600">
                    Confirm new password:
                  </label>
                  <Input.Password
                    name="confPassword"
                    placeholder="re-enter your password"
                    value={values.confPassword}
                    onChange={handleChange}
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                  <div className="text-red-500 text-sm">
                    <ErrorMessage name="confPassword" />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-x-2 bg-green-500 max-w-[150px] w-full justify-center mt-4 px-4 py-2 text-base font-regular text-white rounded-lg hover:bg-green-600 disabled:bg-slate-400 border-none"
              >
                {isLoading ? (
                  <LoadingSpinner color="white" />
                ) : (
                  <FaPlusSquare />
                )}
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </BaseModal>
    </div>
  );
};
