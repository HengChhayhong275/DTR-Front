/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formik, FormikValues } from "formik";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetUnitTypesQuery } from "@/store/features/unitType/unitTypeApiSlice";
import {
  useCreateUnitMutation,
  useGetUnitsQuery,
} from "@/store/features/unit/unitApiSlice";
import { UnitForm } from "../../components/form/UnitForm";
import { GoBackArrow } from "../../components/button/GoBackArrow";
import { UnitSchema } from "../../components/schema/UnitSchema";
import { ToastError } from "../../components/toast/ToastError";
import { useNavigate } from "react-router";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

export const CreateUnit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [createUnit] = useCreateUnitMutation();
  const handleCreateUnit = async (values: FormikValues, resetForm: any) => {
    try {
      setIsLoading(true);
      await createUnit(values).unwrap();
      resetForm();
      navigate("/units");
    } catch (err: any) {
      console.log(err?.data?.message);
      ToastError(err?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const { data: unitTypes } = useGetUnitTypesQuery(undefined);
  const { data: units } = useGetUnitsQuery(undefined);

  return (
    <div className="bg-white p-8 w-full flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-4">
        <Breadcrumb
          separator=">"
          items={[
            {
              title: <Link to={"/dashboard"}>Dashboard</Link>,
            },
            {
              title: <Link to={"/units"}>Manage Unit</Link>,
            },
            {
              title: "Create Unit",
            },
          ]}
        />
        <div>
          <GoBackArrow url="units" />
          <ToastContainer />
        </div>
        <h1 className=" text-2xl">Create Unit</h1>
      </div>
      <Formik
        initialValues={{
          name: "",
          abbre_name: "",
          unitPin: "",
          unitType: "",
          parentUnit: "",
        }}
        validationSchema={UnitSchema}
        onSubmit={(values, { resetForm }) => {
          handleCreateUnit(values, resetForm);
          resetForm();
        }}
      >
        {({ values, handleChange }) => (
          <UnitForm
            isLoading={isLoading}
            unitTypes={unitTypes}
            units={units}
            values={values}
            handleChange={handleChange}
          />
        )}
      </Formik>
    </div>
  );
};
