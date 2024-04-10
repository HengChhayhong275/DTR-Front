import { ErrorMessage, Field, Form, Formik, FormikValues } from "formik";
import { useState } from "react";
import { useGetDocumentTypesQuery } from "@/store/features/documentType/documentTypeApiSlice";
import * as Yup from "yup";
import { FaPlusSquare } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { Breadcrumb } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { CloudUploadOutlined } from "@ant-design/icons";
import { LoadingSpinner } from "@/components/spinner/LoadingSpinner";
import { DocumentType } from "@/@types/document-type";
import {
  useCreateReceivedRecordMutation,
  useFindLatestIdReceivedRecordQuery,
} from "@/store/features/document/receiveRecordApiSlice";
import { ToastError } from "@/components/toast/ToastError";
import { useGetUnitsQuery } from "@/store/features/unit/unitApiSlice";
import { Unit } from "@/@types";

export const CreateReceivedRecord = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { data: documentTypes } = useGetDocumentTypesQuery(undefined);
  const { data: receivedRecordLatestId, isLoading: fetchIdLoading } =
    useFindLatestIdReceivedRecordQuery(undefined);
  const { data: units } = useGetUnitsQuery(undefined);
  const [createReceivedRecord] = useCreateReceivedRecordMutation();

  const ReceivedRecordSchema = Yup.object().shape({
    doc_given_number: Yup.string(),
    summary: Yup.string().required("Summary is required!"),
    published_date: Yup.string().required("Published Date is required!"),
    documentType: Yup.string().required("Document Type is required"),
    num_of_copies: Yup.number().required("Amount is required!"),
    fromUnit: Yup.string(),
    other: Yup.string(),
  });

  if (fetchIdLoading) {
    return <LoadingSpinner color="black" />;
  }

  const handleCrateReceivedRecord = async (values: FormikValues) => {
    try {
      setIsLoading(true);
      await createReceivedRecord(values).unwrap();
      navigate("/received-record");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      ToastError(error?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      <ToastContainer />
      <div>
        <Breadcrumb
          separator=">"
          items={[
            {
              title: <Link to={"/dashboard"}>Dashboard</Link>,
            },
            {
              title: <Link to={"/received-record"}>Received Record List</Link>,
            },
            {
              title: "Create",
            },
          ]}
        />
        <h1 className="text-2xl font-bold mb-2">Create Received Record</h1>
      </div>
      <div className="bg-white p-8">
        <Formik
          enableReinitialize={true}
          initialValues={{
            order: receivedRecordLatestId,
            doc_given_number: "",
            summary: "",
            num_of_copies: "",
            published_date: "",
            documentType: "",
            fromUnit: "",
            // main_doc_file: "",
            // referral_doc_file: "",
            other: "",
          }}
          validationSchema={ReceivedRecordSchema}
          onSubmit={(values) => {
            handleCrateReceivedRecord(values);
          }}
        >
          {() => (
            <Form>
              {/* Input Field */}
              <div className="w-full grid grid-cols-2 gap-x-8 gap-y-4">
                {/* N.O = លេខរៀង */}
                <div className="mb-5">
                  <label
                    htmlFor="order"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    No.
                  </label>
                  <Field
                    name="order"
                    className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-custom-blue block w-full p-2.5 cursor-not-allowed"
                    placeholder="Auto Generated From System"
                    disabled
                  />
                  <div className="text-red-500 text-sm">
                    <ErrorMessage name="order" />
                  </div>
                </div>

                {/* Document Id = លេខឯកសារ / លេខសំគាល់លិខិត */}
                <div className="mb-5">
                  <label
                    htmlFor="doc_given_number"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Document ID
                    {/* <span className="text-red-500">*</span> */}
                  </label>
                  <Field
                    type="text"
                    name="doc_given_number"
                    className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-custom-blue block w-full p-2.5"
                    placeholder="Auto Generated From System"
                    // required
                  />
                  <div className="text-red-500 text-sm">
                    <ErrorMessage name="doc_given_number" />
                  </div>
                </div>

                {/* Document Type = ប្រភេទឯកសារ */}
                <div className="mb-5">
                  <label
                    htmlFor="documentType"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Document Type <span className="text-red-500">*</span>
                  </label>
                  <Field
                    as="select"
                    name="documentType"
                    className="w-full max-w-full rounded-md border-gray-400 text-gray-800 bg-gray-50"
                  >
                    <option value="">Select Document Type</option>
                    {documentTypes &&
                      documentTypes?.map(
                        (documentType: DocumentType, key: number) => (
                          <option key={key} value={documentType?.id}>
                            {documentType?.name}
                          </option>
                        )
                      )}
                  </Field>
                  <div className="text-red-500 text-sm">
                    <ErrorMessage
                      name="documentType"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-y-2">
                  <label htmlFor="fromUnit" className="text-slate-600">
                    Unit:
                  </label>
                  <Field
                    as="select"
                    name="fromUnit"
                    className="w-full rounded-md border-gray-300 text-gray-800"
                  >
                    <option value="">Select unit</option>
                    {units &&
                      units?.map((unit: Unit, key: number) => (
                        <option key={key} value={unit.id}>
                          {unit.name}
                        </option>
                      ))}
                  </Field>
                  <div className="text-red-500 text-sm">
                    <ErrorMessage name="unit" />
                  </div>
                </div>

                {/* Document summary = ខ្លឹមសារសង្ខេប */}
                <div className="mb-5">
                  <label
                    htmlFor="summary"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Document Summary <span className="text-red-500">*</span>
                  </label>
                  <Field
                    name="summary"
                    // rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-400 focus:ring-blue-500 focus:border-custom-blue"
                    placeholder="summary of your document..."
                  />
                  <div className="text-red-500 text-sm">
                    <ErrorMessage name="summary" />
                  </div>
                </div>

                {/* Published Date */}
                <div className="mb-5">
                  <label
                    htmlFor="published_date"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Published Date <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="date"
                    name="published_date"
                    className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-custom-blue block w-full p-2.5"
                  />
                  <div className="text-red-500 text-sm">
                    <ErrorMessage name="published_date" />
                  </div>
                </div>

                {/* Number of Copies */}
                <div className="mb-5">
                  <label
                    htmlFor="num_of_copies"
                    className="block mb-2 text-sm font-medium text-gray-90"
                  >
                    Amount
                  </label>
                  <Field
                    type="text"
                    name="num_of_copies"
                    className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-custom-blue block w-full p-2.5"
                    placeholder=""
                  />
                </div>

                {/* Other */}
                <div className="mb-5">
                  <label
                    htmlFor="other"
                    className="block mb-2 text-sm font-medium text-gray-90"
                  >
                    Other
                  </label>
                  <Field
                    type="text"
                    name="other"
                    className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-custom-blue block w-full p-2.5"
                    placeholder=""
                  />
                </div>
              </div>

              {/* File Input */}
              <div className="grid grid-cols-2 gap-x-10">
                {/* Main Doc File Upload - Referral */}
                <div className="mb-5">
                  <h1 className="block mb-2 text-sm font-medium text-gray-900">
                    Main Document File Upload
                  </h1>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-400 rounded-lg cursor-pointer bg-gray-50"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <CloudUploadOutlined className="text-6xl" />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          PNG, JPG or PDF (MAX: ...KB)
                        </p>
                      </div>
                      <Field name="dropzone-file" type="file" className="" />
                    </label>
                  </div>
                </div>

                {/* Referral Doc File Upload - Referral */}
                <div className="mb-5">
                  <h1 className="block mb-2 text-sm font-medium text-gray-900">
                    Referral Document File Upload
                  </h1>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-400 rounded-lg cursor-pointer bg-gray-50"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <CloudUploadOutlined className="text-6xl" />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          PNG, JPG or PDF (MAX: ...KB)
                        </p>
                      </div>
                      <Field name="dropzone-file" type="file" className="" />
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-x-8">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="py-2 px-4 bg-green-500 text-white rounded-lg flex gap-x-2 items-center text-base h-full hover:!bg-green-600 hover:!text-white border-none"
                >
                  {isLoading ? (
                    <LoadingSpinner color="white" />
                  ) : (
                    <FaPlusSquare />
                  )}
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
