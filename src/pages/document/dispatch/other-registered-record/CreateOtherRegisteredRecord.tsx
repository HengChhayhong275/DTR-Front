import { CustomError } from "@/@types";
import { SearchSelect } from "@/components/search-select/SearchSelect";
import { DocumentOriginInfoSchema } from "@/components/schema/DocumentOriginInfoSchema";
import { LoadingSpinner } from "@/components/spinner/LoadingSpinner";
import { ToastError } from "@/components/toast/ToastError";
import { ToastSucess } from "@/components/toast/ToastSucess";
import { useCreateOtherRegisteredRecordMutation } from "@/store/features/document/otherRegisteredRecordApiSlice";
import { useGetDocumentTypesQuery } from "@/store/features/documentType/documentTypeApiSlice";
import { useCreateDraftOtherRecordMutation } from "@/store/features/draft/draftRecordApiSlice";
import { useGetUnitsQuery } from "@/store/features/unit/unitApiSlice";
import { Input } from "antd";
import { ErrorMessage, Field, Form, Formik, FormikValues } from "formik";
import { useState } from "react";
import { FaPlusSquare } from "react-icons/fa";
import { UnitSearchSelect } from "@/components/search-select/UnitSearchSelect";

export const CreateOtherRegisteredRecord = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [btnClicked, setBtnClicked] = useState("");

  const { data: documentTypes } = useGetDocumentTypesQuery(undefined);
  const { data: units } = useGetUnitsQuery(undefined);

  // Create
  const [createOtherRegisteredRecord] =
    useCreateOtherRegisteredRecordMutation();
  const handleCreateOtherRegistered = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    try {
      console.log(values);
      setIsLoading(true);
      await createOtherRegisteredRecord(values).unwrap();
      ToastSucess("Other Registered Record and ID Requested Successfully !");
      resetForm();
    } catch (err: CustomError | any) {
      console.log(err?.data?.message);
      ToastError(err?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Draft
  const [createDraftOtherRegisteredRecord] =
    useCreateDraftOtherRecordMutation();
  const handleCreateDraftOtherRegisteredRecord = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    try {
      console.log(values);
      setIsLoading(true);
      await createDraftOtherRegisteredRecord(values).unwrap();
      ToastSucess("Draft Other Registered Record created Successfully!");
      resetForm();
    } catch (err: CustomError | any) {
      console.log(err?.data?.message);
      ToastError(err?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner color="black" />;
  }

  return (
    <section>
      <Formik
        enableReinitialize={true}
        initialValues={{
          order: "",
          requested_from: "",
          summary: "",
          num_of_copies: "",
          published_date: "",
          documentType: "",
          // main_doc_file: null,
          // referral_doc_file: null,
          other: "",
        }}
        validationSchema={DocumentOriginInfoSchema}
        onSubmit={(values, { resetForm }) => {
          if (btnClicked === "DraftOther") {
            handleCreateDraftOtherRegisteredRecord(values, resetForm);
          } else if (btnClicked === "SubmitOther") {
            console.log(values);
            handleCreateOtherRegistered(values, resetForm);
          }
        }}
      >
        {({ values, handleChange, setFieldValue }) => (
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
                <Input
                  value={values.order}
                  onChange={handleChange}
                  name="order"
                  className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-custom-blue block w-full p-2.5 cursor-not-allowed"
                  placeholder="Auto Generated From System"
                  disabled
                />
                <div className="text-red-500 text-sm">
                  <ErrorMessage name="order" />
                </div>
              </div>

              {/* Requested From = សុំលេខពី */}
              <div className="mb-5">
                <label
                  htmlFor="requested_from"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Request ID From: <span className="text-red-500">*</span>
                </label>
                <Field name="requested_from">
                  {() => (
                    <UnitSearchSelect
                      title="Select Unit to Request"
                      childrens={units}
                      setFieldValue={setFieldValue}
                    />
                  )}
                </Field>
                {/* <Field
                  as="select"
                  name="requested_from"
                  className="w-full max-w-full rounded-md border-gray-400 text-gray-800 bg-gray-50"
                >
                  <option value="">Select Unit</option>
                  {units &&
                    units?.map((unit: Unit, key: number) => (
                      <option key={key} value={unit?.id}>
                        {unit?.name}
                      </option>
                    ))}
                </Field> */}
                <div className="text-red-500 text-sm">
                  <ErrorMessage
                    name="requested_from"
                    className="text-red-500 text-sm"
                  />
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
                <Field name="documentType">
                  {() => (
                    <SearchSelect
                      title="Select Document Type"
                      childrens={documentTypes}
                      setFieldValue={setFieldValue}
                    />
                  )}
                </Field>
                {/* <Field
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
                </Field> */}
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
            <div className="grid grid-cols-2 gap-x-8 my-4">
              {/* Main Doc File Upload - Referral */}
              <div className="flex gap-y-2 flex-col">
                <label htmlFor="main_doc_file" className="text-slate-600">
                  Upload Main File:
                </label>
                <Input
                  className="rounded-lg border-gray-300 p-2 h-full w-full"
                  name="main_doc_file"
                  type="file"
                  onChange={(e) => {
                    setFieldValue("file", e.currentTarget.files?.[0]);
                  }}
                />
              </div>

              {/* Referral Doc File Upload - Referral */}
              <div className="flex gap-y-2 flex-col">
                <label htmlFor="referral_doc_file" className="text-slate-600">
                  Upload Referral File:
                </label>
                <Input
                  className="rounded-lg border-gray-300 p-2 h-full"
                  name="referral_doc_file"
                  type="file"
                  onChange={(e) => {
                    setFieldValue("file", e.target.files?.[0]);
                  }}
                />
              </div>
            </div>

            <div className="flex justify-center gap-x-8">
              {location.pathname === "/other-registered/create" && (
                <button
                  type="submit"
                  onMouseOver={() => {
                    setBtnClicked("DraftOther");
                  }}
                  disabled={isLoading}
                  className="flex items-center gap-x-2 bg-custom-blue max-w-[150px] w-full justify-center mt-4 px-4 py-2 text-base font-regular text-white rounded-lg hover:bg-blue-600 disabled:bg-slate-400"
                >
                  {isLoading ? (
                    <LoadingSpinner color="white" />
                  ) : (
                    <FaPlusSquare />
                  )}
                  Save as Draft
                </button>
              )}

              <button
                type="submit"
                onMouseOver={() => {
                  setBtnClicked("SubmitOther");
                }}
                disabled={isLoading}
                className="flex items-center gap-x-2 bg-green-500 max-w-[150px] w-full justify-center mt-4 px-4 py-2 text-base font-regular text-white rounded-lg hover:bg-green-600 disabled:bg-slate-400"
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
    </section>
  );
};
