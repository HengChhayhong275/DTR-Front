import { ErrorMessage, Form, FormikValues } from "formik";
import { LoadingSpinner } from "../spinner/LoadingSpinner";
import { FaPlusSquare } from "react-icons/fa";
import { ChangeEventHandler } from "react";
import { Input } from "antd";

export const RoleForm = ({
  isLoading,
  values,
  handleChange,
}: {
  isLoading: boolean;
  values: FormikValues;
  handleChange: ChangeEventHandler;
}) => {
  return (
    <Form>
      <div className="text-sm font-normal text-black flex gap-y-4 flex-col">
        <div className="flex flex-col w-full gap-y-4">
          <div className="flex flex-col gap-y-2">
            <label htmlFor="name" className="text-slate-600">
              Role Name:
            </label>
            <Input
              value={values.name}
              onChange={handleChange}
              name="name"
              type="text"
              className="py-2 px-2 rounded-md shadow-2xl border border-gray-300 border-solid"
            />
            <div className="text-red-500 text-sm">
              <ErrorMessage name="name" />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-y-2">
            <label htmlFor="description" className="text-slate-600">
              Description:
            </label>
            <Input
              value={values.description}
              onChange={handleChange}
              name="description"
              type="text"
              className="py-2 px-2 rounded-md shadow-2xl border border-gray-300 border-solid"
            />
            <div className="text-red-500 text-sm">
              <ErrorMessage name="description" />
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="flex items-center gap-x-2 bg-green-500 max-w-[150px] w-full justify-center mt-4 px-4 py-2 text-base font-regular text-white rounded-lg hover:bg-green-400 disabled:bg-slate-400 border-none"
      >
        {isLoading ? <LoadingSpinner color="white" /> : <FaPlusSquare />}
        Submit
      </button>
    </Form>
  );
};
