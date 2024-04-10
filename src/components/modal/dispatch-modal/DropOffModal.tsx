import { Modal } from "antd";
import { SelfRegisteredRecord } from "@/@types/self-registered-record";
import * as Yup from "yup";
import { ErrorMessage, Field, Formik, FormikValues, Form } from "formik";
import { useState } from "react";
import { LoadingSpinner } from "@/components/spinner/LoadingSpinner";
import { FaPlusSquare } from "react-icons/fa";
import { useDropOffSelfMutation } from "@/store/features/document/selfRegisteredRecordApiSlice";
import { OtherRegisteredRecord } from "@/@types";
import { useLocation } from "react-router";
import { useDropOffOtherMutation } from "@/store/features/document/otherRegisteredRecordApiSlice";
import { ToastSucess } from "@/components/toast/ToastSucess";
import { ToastError } from "@/components/toast/ToastError";

export const DropOffModal = ({
  open,
  setOpen,
  record,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  record: SelfRegisteredRecord | OtherRegisteredRecord | undefined;
}) => {
  const [dropOffSelf] = useDropOffSelfMutation();
  const [dropOffOther] = useDropOffOtherMutation();
  const location = useLocation();


  const DropOffSchema = Yup.object().shape({
    unit_pin: Yup.string().required("Pin code is required."),
    document_id: Yup.string().required("Record ID is required."),
  });

  const handleDropOff = async (values: FormikValues, resetForm: () => void) => {
    try {
      setIsLoading(true);
      if (location.pathname === "/self-registered") {
        await dropOffSelf(values).unwrap();
      } else {
        await dropOffOther(values).unwrap();
      }
      ToastSucess("Document Dropped Off Successfully.")
      resetForm();
      setOpen(false)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      ToastError(error?.data?.message)
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Modal
      width={750}
      centered
      open={open}
      onCancel={() => {
        setOpen(false);
      }}
      footer={() => <></>}
    >
      <div className="min-h-[75px] flex flex-col gap-y-4">
        <h1 className="text-lg font-bold">Drop Off</h1>
        <Formik
          enableReinitialize={true}
          initialValues={{
            unit_pin: "",
            document_id: record?.id,
          }}
          validationSchema={DropOffSchema}
          onSubmit={(values, { resetForm }) => {
            handleDropOff(values, resetForm);
          }}
        >
          <Form>
            <div className="text-sm font-normal text-black flex gap-y-4 flex-col">
              <div className="flex flex-col w-full gap-y-4">
                <div className="flex flex-col gap-y-2">
                  <label htmlFor="unit_pin" className="text-slate-600">
                    Please input drop off unit's pin.
                  </label>
                  <Field
                    name="unit_pin"
                    type="text"
                    className="w-full py-2 px-2 rounded-md shadow-2xl border border-gray-400"
                  />
                  <div className="text-red-500 text-sm">
                    <ErrorMessage name="unit_pin" />
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
              Drop Off
            </button>
          </Form>
        </Formik>
      </div>
    </Modal>
  );
};
