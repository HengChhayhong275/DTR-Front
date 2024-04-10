/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorMessage, Field, Form, Formik, FormikValues } from "formik";
import { useState } from "react";
import { ToastSucess } from "../../toast/ToastSucess";
import { ToastError } from "../../toast/ToastError";
import * as Yup from "yup";
import { BaseModal } from "../BaseModal";
import { LoadingSpinner } from "@/components/spinner/LoadingSpinner";
import { FaPlusSquare } from "react-icons/fa";
import { useAcceptRecordMutation } from "@/store/features/document/acceptingRecordApiSlice";

export const AcceptDocumentModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [acceptDocument] = useAcceptRecordMutation();

  const handleAcceptDocument = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    try {
      setIsLoading(true);
      console.log(values);
      await acceptDocument(values).unwrap();
      ToastSucess("Document Received!");
      resetForm();
      setOpen(false);
    } catch (error: any) {
      console.log(error);
      ToastError(error?.data?.message);
    } finally {
      setIsLoading(false);
    }
    resetForm();
  };

  const AcceptSchema = Yup.object().shape({
    pin: Yup.number().required("Pin code is required."),
  });

  return (
    <BaseModal setOpen={setOpen} open={open}>
      <h1 className="text-xl font-bold text-black mb-4">
        Please enter the pin code
      </h1>
      <Formik
        initialValues={{
          pin: "",
        }}
        validationSchema={AcceptSchema}
        onSubmit={(values, { resetForm }) => {
          handleAcceptDocument(values, resetForm);
        }}
      >
        <Form>
          <div className="text-sm font-normal text-black flex gap-y-4 flex-col">
            <div className="flex flex-col w-full gap-y-4">
              <div className="flex flex-col gap-y-2">
                <label htmlFor="pin" className="text-slate-600">
                  Pin:
                </label>
                <Field
                  name="pin"
                  type="text"
                  className="w-full py-2 px-2 rounded-md shadow-2xl border border-gray-400"
                />
                <div className="text-red-500 text-sm">
                  <ErrorMessage name="pin" />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-x-2 bg-green-500 max-w-[150px] w-full justify-center mt-4 px-4 py-2 text-base font-regular text-white rounded-lg hover:bg-green-600 disabled:bg-slate-400"
          >
            {isLoading ? <LoadingSpinner color="white" /> : <FaPlusSquare />}
            Receive
          </button>
        </Form>
      </Formik>
    </BaseModal>
  );
};
