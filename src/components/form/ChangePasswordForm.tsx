import { ErrorMessage, Form, FormikValues } from "formik";
import { LoadingSpinner } from "../spinner/LoadingSpinner";
import { FaPlusSquare } from "react-icons/fa";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { ChangeEventHandler } from "react";

export const ChangePasswordForm = ({
  values,
  handleChange,
  isLoading,
}: {
  values: FormikValues;
  handleChange: ChangeEventHandler;
  isLoading: boolean;
}) => {
  return (
    <Form>
      <div className="grid grid-cols-1 gap-y-4 gap-x-4 text-sm font-normal text-black w-full">
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
        {isLoading ? <LoadingSpinner color="white" /> : <FaPlusSquare />}
        Submit
      </button>
    </Form>
  );
};
