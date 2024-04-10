/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useState } from "react";
import { ErrorMessage, Field, Form, Formik, FormikValues } from "formik";
import { RoleSchema } from "../../schema/RoleSchema";
import { ToastSucess } from "../../toast/ToastSucess";
import { ToastError } from "../../toast/ToastError";
import { AcceptingRecord } from "@/@types/accepting-record";
import { LoadingSpinner } from "@/components/spinner/LoadingSpinner";
import { Button, Modal } from "antd";
import { useSaveToReceivedRecordMutation } from "@/store/features/document/receiveRecordApiSlice";
import { FormatDateTime } from "@/components/functions/FormatDateTime";
import { DropOff } from "@/@types";
import { useLocation } from "react-router";

export const SaveToReceiveRecordModal = ({
  open,
  setOpen,
  record,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  record: AcceptingRecord | DropOff | undefined;
}) => {
  const location = useLocation();
  const [saveToReceivedRecord] = useSaveToReceivedRecordMutation();

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (values: FormikValues) => {
    try {
      setIsLoading(true);
      await saveToReceivedRecord(values).unwrap();
      ToastSucess("Record Added Successfully!");
      setOpen(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      ToastError(error?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      width={750}
      closeIcon={false}
      centered
      open={open}
      onCancel={() => {
        setOpen(false);
      }}
      footer={() => <></>}
    >
      <div className="w-full">
        {/* Name */}
        <h1 className="text-2xl font-bold text-black mb-4">
          Save to Received Record List
        </h1>

        <Formik
          enableReinitialize={true}
          initialValues={{
            [location.pathname.includes("dropped-off")
              ? "dropOffRecord"
              : "acceptingRecord"]: record?.id,
            summary: record?.documentOriginInfo?.summary,
            num_of_copies: record?.documentOriginInfo?.num_of_copies,
            other: record?.documentOriginInfo?.other,
          }}
          validationSchema={RoleSchema}
          onSubmit={() => {}}
        >
          {({ values }) => (
            <Form>
              <div className="w-full grid grid-cols-3 gap-x-4 gap-y-4">
                <div className="mb-5">
                  <label
                    htmlFor="doc_sequence_number"
                    className="block mb-2 text-sm font-semibold text-gray-900"
                  >
                    Document ID
                  </label>
                  <p>{record?.documentOriginInfo.doc_sequence_number}</p>
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="doc_sequence_number"
                    className="block mb-2 text-sm font-semibold text-gray-900"
                  >
                    Created by
                  </label>
                  <p>{record?.documentOriginInfo?.created_by?.unit?.name}</p>
                </div>

                {/* Document Id = លេខឯកសារ / លេខសំគាល់លិខិត */}
                <div className="mb-5">
                  <label
                    htmlFor="doc_sequence_number"
                    className="block mb-2 text-sm font-semibold text-gray-900"
                  >
                    Received by
                  </label>
                  <p>
                    {record?.receiver?.firstNameEn}{" "}
                    {record?.receiver?.lastNameEn}
                  </p>
                  <div className="text-red-500 text-sm">
                    <ErrorMessage name="doc_sequence_number" />
                  </div>
                </div>

                {/* Document Type = ប្រភេទឯកសារ */}
                <div className="mb-5">
                  <label
                    htmlFor="documentType"
                    className="block mb-2 text-sm font-semibold text-gray-900"
                  >
                    Document Type
                  </label>
                  <p>{record?.documentOriginInfo?.documentType?.name}</p>
                </div>

                {/* Published Date */}
                <div className="mb-5">
                  <label
                    htmlFor="published_date"
                    className="block mb-2 text-sm font-semibold text-gray-900"
                  >
                    Published Date
                  </label>
                  <p>
                    {FormatDateTime(record?.documentOriginInfo?.published_date)}
                  </p>
                </div>

                {/* Document summary = ខ្លឹមសារសង្ខេប */}
                <div className="mb-5">
                  <label
                    htmlFor="summary"
                    className="block mb-2 text-sm font-semibold text-gray-900"
                  >
                    Document Summary <span className="text-red-500">*</span>
                  </label>
                  <Field
                    name="summary"
                    // rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-custom-blue"
                    placeholder="summary of your document..."
                  />
                  <div className="text-red-500 text-sm">
                    <ErrorMessage name="summary" />
                  </div>
                </div>

                {/* Number of Copies */}
                <div className="mb-5">
                  <label
                    htmlFor="num_of_copies"
                    className="block mb-2 text-sm font-semibold text-gray-90"
                  >
                    Amount
                  </label>
                  <Field
                    type="text"
                    name="num_of_copies"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-custom-blue block w-full p-2.5"
                    placeholder=""
                  />
                </div>

                {/* Other */}
                <div className="mb-5">
                  <label
                    htmlFor="other"
                    className="block mb-2 text-sm font-semibold text-gray-90"
                  >
                    Other
                  </label>
                  <Field
                    type="text"
                    name="other"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-custom-blue block w-full p-2.5"
                    placeholder=""
                  />
                </div>
              </div>
              <div className="flex justify-end gap-x-4 w-full">
                <Button
                  className="py-2 px-4 text-white rounded-lg flex gap-x-2 items-center text-base h-full bg-red-600 hover:!text-red-600 hover:!border-red-600"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    handleSave(values);
                  }}
                  disabled={isLoading}
                  className="py-2 px-4 bg-green-500 text-white rounded-lg flex gap-x-2 items-center text-base h-full hover:!border-green-400 hover:!text-green-400 break-all"
                >
                  {isLoading && <LoadingSpinner color="black" />}
                  Confirm
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};
