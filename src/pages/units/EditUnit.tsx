import { ToastContainer } from "react-toastify";
import { GoBackArrow } from "../../components/button/GoBackArrow";
import { Formik, FormikValues } from "formik";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import {
  useGetUnitQuery,
  useGetUnitsQuery,
  useUpdateUnitMutation,
} from "@/store/features/unit/unitApiSlice";
import { LoadingSpinner } from "../../components/spinner/LoadingSpinner";
import { ToastError } from "../../components/toast/ToastError";
import { UnitSchema } from "../../components/schema/UnitSchema";
import { useGetUnitTypesQuery } from "@/store/features/unitType/unitTypeApiSlice";
import { UnitForm } from "../../components/form/UnitForm";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

export const EditUnit = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const { data: unitTypes } = useGetUnitTypesQuery(undefined);
  const { data: units } = useGetUnitsQuery(undefined);
  const { data: unit, isLoading } = useGetUnitQuery(id);

  const navigate = useNavigate();

  const [updateUnit] = useUpdateUnitMutation();

  const handleEditUnit = async (values: FormikValues) => {
    try {
      setLoading(true);
      await updateUnit({ id, unit: values }).unwrap();
      navigate("/units");
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
              title: <Link to={"/units"}>Manage Unit</Link>,
            },
            {
              title: "Update Unit",
            },
          ]}
        />
        <div>
          <GoBackArrow url="units" />
          <ToastContainer />
        </div>
        <h1 className=" text-2xl">Edit Unit Info</h1>
      </div>
      <Formik
        initialValues={{
          name: unit?.name,
          abbre_name: unit?.abbre_name,
          unitPin: unit?.unitPin,
          unitType: unit?.unitType?.id,
          parentUnit: unit?.parentUnit?.id,
        }}
        validationSchema={UnitSchema}
        onSubmit={(values) => {
          handleEditUnit(values);
        }}
      >
        {({ values, handleChange }) => (
          <UnitForm
            isLoading={loading}
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
