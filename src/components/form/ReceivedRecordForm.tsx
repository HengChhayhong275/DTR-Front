import { ErrorMessage, Field, Form } from "formik";
import { LoadingSpinner } from "../spinner/LoadingSpinner";
import { FaPlusSquare } from "react-icons/fa";
import { DocumentType } from "@/@types/document-type";
import { CloudUploadOutlined } from "@ant-design/icons";

export const ReceivedRecordForm = ({
  isLoading,
  documentTypes,
}: {
  isLoading: boolean;
  documentTypes: DocumentType[];
}) => {
  return (
    <Form>
      <div className="w-full grid grid-cols-2 gap-x-8 gap-y-4">
        {/* Document Id = លេខឯកសារ / លេខសំគាល់លិខិត */}
        <div className="mb-5">
          <label
            htmlFor="doc_sequence_number"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Document ID <span className="text-red-500">*</span>
          </label>
          <Field
            type="text"
            name="doc_sequence_number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-custom-blue block w-full p-2.5"
            placeholder="Auto Generated From System"
            disabled
          />
          <div className="text-red-500 text-sm">
            <ErrorMessage name="doc_sequence_number" />
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
            className="w-full max-w-full rounded-md border-gray-400 text-gray-800"
          >
            <option value="">Select Document Type</option>
            {documentTypes &&
              documentTypes?.map((documentType: DocumentType, key: number) => (
                <option key={key} value={documentType?.id}>
                  {documentType?.name}
                </option>
              ))}
          </Field>
          <div className="text-red-500 text-sm">
            <ErrorMessage
              name="documentType"
              className="text-red-500 text-sm"
            />
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
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-custom-blue"
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-custom-blue block w-full p-2.5"
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-custom-blue block w-full p-2.5"
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-custom-blue block w-full p-2.5"
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
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <CloudUploadOutlined className="text-6xl" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
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
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <CloudUploadOutlined className="text-6xl" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
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
          // type="submit"
          disabled={isLoading}
          className="flex items-center gap-x-2 bg-green-500 max-w-[150px] w-full justify-center mt-4 px-4 py-2 text-base font-regular text-white rounded-lg hover:bg-green-600 disabled:bg-slate-400"
        >
          {isLoading ? <LoadingSpinner color="white" /> : <FaPlusSquare />}
          Submit
        </button>
      </div>
    </Form>
  );
};
