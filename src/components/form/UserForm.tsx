import { ErrorMessage, Field, Form, FormikValues } from "formik";
import { LoadingSpinner } from "../spinner/LoadingSpinner";
import { FaPlusSquare } from "react-icons/fa";
import { Role, Unit } from "@/@types";
import { Input } from "antd";
import { ChangeEventHandler } from "react";

export const UserForm = ({
  isLoading,
  units,
  roles,
  values,
  handleChange,
}: {
  isLoading: boolean;
  units: Unit[];
  roles: Role[];
  values: FormikValues;
  handleChange: ChangeEventHandler;
}) => {
  return (
    <Form>
      <div className="grid grid-cols-4 gap-y-4 gap-x-4 text-sm font-normal text-black">
        <div className="flex flex-col gap-y-2">
          <div className="flex gap-y-2 flex-col">
            <label htmlFor="firstNameEn" className="text-slate-600">
              Firstname(En):
            </label>
            <Input
              className="rounded-lg border-gray-300 p-2 h-full"
              name="firstNameEn"
              value={values.firstNameEn}
              onChange={handleChange}
              placeholder="Firstname"
            />
          </div>
          <div className="text-red-500 text-sm">
            <ErrorMessage name="firstNameEn" />
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="flex gap-y-2 flex-col">
            <label htmlFor="lastNameEn" className="text-slate-600">
              Lastname(En):
            </label>
            <Input
              className="rounded-lg border-gray-300 p-2 h-full"
              name="lastNameEn"
              value={values.lastNameEn}
              onChange={handleChange}
              placeholder="Firstname"
            />
          </div>
          <div className="text-red-500 text-sm">
            <ErrorMessage name="lastNameEn" />
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="flex gap-y-2 flex-col">
            <label htmlFor="firstNameKh" className="text-slate-600">
              Firstname(Kh):
            </label>
            <Input
              className="rounded-lg border-gray-300 p-2 h-full"
              name="firstNameKh"
              value={values.firstNameKh}
              onChange={handleChange}
              placeholder="Firstname"
            />
          </div>
          <div className="text-red-500 text-sm">
            <ErrorMessage name="firstNameKh" />
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="flex gap-y-2 flex-col">
            <label htmlFor="lastNameKh" className="text-slate-600">
              Lastname(Kh):
            </label>
            <Input
              className="rounded-lg border-gray-300 p-2 h-full"
              name="lastNameKh"
              value={values.lastNameKh}
              onChange={handleChange}
              placeholder="Firstname"
            />
          </div>
          <div className="text-red-500 text-sm">
            <ErrorMessage name="lastNameKh" />
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="flex gap-y-2 flex-col">
            <label htmlFor="gender" className="text-slate-600">
              Gender:
            </label>
            <Field
              component="select"
              className="rounded-lg border-gray-300 p-2 h-full"
              name="gender"
              value={values.gender}
              onChange={handleChange}
              placeholder="Firstname"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Field>
          </div>
          <div className="text-red-500 text-sm">
            <ErrorMessage name="gender" />
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="flex gap-y-2 flex-col">
            <label htmlFor="nationality" className="text-slate-600">
              Nationality:
            </label>
            <Input
              className="rounded-lg border-gray-300 p-2 h-full"
              name="nationality"
              value={values.nationality}
              onChange={handleChange}
              placeholder="Nationality"
            />
          </div>
          <div className="text-red-500 text-sm">
            <ErrorMessage name="nationality" />
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="flex gap-y-2 flex-col">
            <label htmlFor="address" className="text-slate-600">
              Address:
            </label>
            <Input
              className="rounded-lg border-gray-300 p-2 h-full"
              name="address"
              value={values.address}
              onChange={handleChange}
              placeholder="Firstname"
            />
          </div>
          <div className="text-red-500 text-sm">
            <ErrorMessage name="address" />
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="flex gap-y-2 flex-col">
            <label htmlFor="dob" className="text-slate-600">
              Date of Birth:
            </label>
            <Field
              className="rounded-lg border border-gray-300 border-solid p-2 h-full "
              type="date"
              name="dob"
              id="dob"
              placeholder="Date Of Birth"
            />
          </div>
          <div className="text-red-500 text-sm">
            <ErrorMessage name="dob" />
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="flex gap-y-2 flex-col">
            <label htmlFor="email" className="text-slate-600">
              Email:
            </label>
            <Input
              className="rounded-lg border-gray-300 p-2 h-full"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>
          <div className="text-red-500 text-sm">
            <ErrorMessage name="email" />
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="flex gap-y-2 flex-col">
            <label htmlFor="phoneNumber" className="text-slate-600">
              Phone Number:
            </label>
            <Input
              className="rounded-lg border-gray-300 p-2 h-full"
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
            />
          </div>
          <div className="text-red-500 text-sm">
            <ErrorMessage name="phoneNumber" />
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="flex gap-y-2 flex-col">
            <label htmlFor="unit" className="text-slate-600 flex gap-x-2">
              Unit:
            </label>
            <Field
              component="select"
              className="rounded-lg border-gray-300 p-2 h-full"
              name="unit"
              value={values.unit}
              onChange={handleChange}
              placeholder="Firstname"
            >
              <option value="">Select unit</option>
              {units &&
                units?.map((unit: Unit, key: number) => (
                  <option key={key} value={unit.id}>
                    {unit.name}
                  </option>
                ))}{" "}
            </Field>
          </div>
          <div className="text-red-500 text-sm">
            <ErrorMessage name="unit" />
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="flex gap-y-2 flex-col">
            <label htmlFor="role" className="text-slate-600 flex gap-x-2">
              Role:
            </label>
            <Field
              as="select"
              className="rounded-lg border-gray-300 p-2 h-full"
              name="role"
              value={values.role}
              onChange={handleChange}
              placeholder="Firstname"
            >
              <option value="">Select role</option>
              {roles &&
                roles?.map((role: Role, key: number) => (
                  <option key={key} value={role.id}>
                    {role.name}
                  </option>
                ))}{" "}
            </Field>
          </div>
          <div className="text-red-500 text-sm">
            <ErrorMessage name="role" />
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
