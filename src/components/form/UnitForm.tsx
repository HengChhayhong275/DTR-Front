import { Unit, UnitType } from "@/@types";
import { ErrorMessage, Field, Form, FormikValues } from "formik";
import { LoadingSpinner } from "../spinner/LoadingSpinner";
import { FaPlusSquare } from "react-icons/fa";
import { ChangeEventHandler } from "react";
import { Input } from "antd";

export const UnitForm = ({
  isLoading,
  unitTypes,
  units,
  values,
  handleChange,
}: {
  isLoading: boolean;
  unitTypes: UnitType[];
  units: Unit[];
  values: FormikValues;
  handleChange: ChangeEventHandler;
}) => {
  return (
    <Form>
      <div className="grid grid-cols-4 gap-y-4 gap-x-4 text-sm font-normal text-black">
        {/* Name */}
        <div className="flex flex-col gap-y-2">
          <div className="flex gap-y-2 flex-col">
            <label htmlFor="name" className="text-slate-600">
              Unit name:
            </label>
            <Input
              className="rounded-lg border-gray-300 p-2 h-full"
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Unit name"
            />
          </div>
          <div className="text-red-500 text-sm">
            <ErrorMessage name="name" />
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="flex gap-y-2 flex-col">
            <label htmlFor="abbre_name" className="text-slate-600">
              Abbreviation:
            </label>
            <Input
              className="rounded-lg border-gray-300 p-2 h-full"
              name="abbre_name"
              value={values.abbre_name}
              onChange={handleChange}
              placeholder="Unit Abbreviation"
            />
          </div>
          <div className="text-red-500 text-sm">
            <ErrorMessage name="abbre_name" />
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="flex gap-y-2 flex-col">
            <label htmlFor="unitPin" className="text-slate-600">
              Unit Pin:
            </label>
            <Input
              className="rounded-lg border-gray-300 p-2 h-full"
              name="unitPin"
              value={values.unitPin}
              onChange={handleChange}
              placeholder="Unit Pin"
            />
          </div>
          <div className="text-red-500 text-sm">
            <ErrorMessage name="unitPin" />
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="flex gap-y-2 flex-col">
            <label htmlFor="unit" className="text-slate-600 flex gap-x-2">
              Unit Type:
            </label>
            <Field
              component="select"
              className="rounded-lg border-gray-300 p-2 h-full"
              name="unitType"
              value={values.unitType}
              onChange={handleChange}
              placeholder="unitType"
            >
              <option value="">Select Type</option>
              {unitTypes &&
                unitTypes?.map((unitType: UnitType, key: number) => (
                  <option key={key} value={unitType?.id}>
                    {unitType?.name}
                  </option>
                ))}
            </Field>
          </div>
          <div className="text-red-500 text-sm">
            <ErrorMessage name="unitType" />
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="flex gap-y-2 flex-col">
            <label htmlFor="parentUnit" className="text-slate-600 flex gap-x-2">
              Parent Unit:
            </label>
            <Field
              component="select"
              className="rounded-lg border-gray-300 p-2 h-full"
              name="parentUnit"
              value={values.parentUnit}
              onChange={handleChange}
              placeholder="Parent Unit"
            >
              <option value="">Select Parent Unit</option>
              {units &&
                units?.map((unit: Unit, key: number) => (
                  <option key={key} value={unit.id}>
                    {unit.name}
                  </option>
                ))}{" "}
            </Field>
          </div>
          <div className="text-red-500 text-sm">
            <ErrorMessage name="parentUnit" />
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
