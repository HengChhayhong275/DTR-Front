import { SearchSelect } from "@/components/search-select/SearchSelect";
import { GoBackArrow } from "@/components/button/GoBackArrow";
import { DocumentOriginInfoSchema } from "@/components/schema/DocumentOriginInfoSchema";
import { LoadingSpinner } from "@/components/spinner/LoadingSpinner";
import { ToastError } from "@/components/toast/ToastError";
import {
  useCreateSelfRegisteredRecordMutation,
  useFindLatestIdSelfRegisteredRecordQuery,
  useGetDocGivenNumberQuery,
} from "@/store/features/document/selfRegisteredRecordApiSlice";
import { useUploadFileMutation } from "@/store/features/document/uploadFileApiSlice";
import { useGetDocumentTypesQuery } from "@/store/features/documentType/documentTypeApiSlice";
import { useCreateDraftSelfRecordMutation } from "@/store/features/draft/draftRecordApiSlice";
import { Breadcrumb, Input } from "antd";
import { ErrorMessage, Field, Form, Formik, FormikValues } from "formik";
import { useState } from "react";
import { FaPlusSquare } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export const CreateSelfRegisteredRecord = () => {
  const [loading, setLoading] = useState(false);
  const [btnClicked, setBtnClicked] = useState("");

  const { data: documentTypes } = useGetDocumentTypesQuery(undefined);
  const { data: documentGivenNumber } = useGetDocGivenNumberQuery(undefined);

  const { data: selfRecordLatestId, isLoading } =
    useFindLatestIdSelfRegisteredRecordQuery(undefined);

  const [createSelfRegisteredRecord] = useCreateSelfRegisteredRecordMutation();
  const handleCreateSelfRegisteredInfo = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    try {
      setLoading(true);
      await createSelfRegisteredRecord(values).unwrap();
      resetForm();
      navigate("/self-registered");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err?.data?.message);
      ToastError(err?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const [createDraftSelfRegisteredRecord] = useCreateDraftSelfRecordMutation();
  const handleCreateDraftSelfRegisteredRecord = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    try {
      setLoading(true);
      await createDraftSelfRegisteredRecord(values).unwrap();
      resetForm();
      navigate("/draft/self-registered");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err?.data?.message);
      ToastError(err?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const [fileUpload] = useUploadFileMutation();
  const handleFileUpload = async (values: FormikValues) => {
    try {
      setLoading(true);

      const formdata = new FormData();
      formdata.append("file", values.file);
      await fileUpload(formdata.get("file")).unwrap();
    } catch (error) {
      console.log("error file upload: ", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  if (isLoading) {
    return <LoadingSpinner color="black" />;
  }

  return (
    <div className="bg-white p-8 flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-4">
        <Breadcrumb
          separator=">"
          items={[
            {
              title: <Link to={"/dashboard"}>Dashboard</Link>,
            },
            {
              title: <Link to={"/self-registered"}>Self-Registered List</Link>,
            },
            {
              title: "Create",
            },
          ]}
        />
        <div>
          <GoBackArrow url="self-registered" />
          <ToastContainer />
        </div>
        <h1 className="text-2xl font-bold mb-2">
          Create Self-Registered Record
        </h1>
      </div>
      <div className="bg-white p-8">
        <Formik
          enableReinitialize={true}
          initialValues={{
            order: selfRecordLatestId,
            doc_given_number: documentGivenNumber?.doc_given_number,
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
            if (btnClicked == "Draft") {
              console.log(values);
              handleCreateDraftSelfRegisteredRecord(values, resetForm);
            } else if (btnClicked == "Submit") {
              console.log(values);
              handleFileUpload(values);
              handleCreateSelfRegisteredInfo(values, resetForm);
            }
          }}
        >
          {({ values, handleChange, setFieldValue }) => (
            <Form>
              {/* Input Field */}
              <div className="w-full grid grid-cols-2 gap-x-8 gap-y-4">
                {/* N.O = លេខរៀង */}
                <div className="flex flex-col gap-y-2">
                  <div className="flex gap-y-2 flex-col">
                    <label htmlFor="order" className="text-slate-600">
                      N.o
                    </label>
                    <Input
                      className="rounded-lg border-gray-300 p-2 h-full"
                      name="order"
                      value={values.order}
                      onChange={handleChange}
                      placeholder="Auto Generated From System"
                      disabled
                    />
                  </div>
                  <div className="text-red-500 text-sm">
                    <ErrorMessage name="order" />
                  </div>
                </div>

                {/* Document ID */}
                <div className="flex flex-col gap-y-2">
                  <div className="flex gap-y-2 flex-col">
                    <label
                      htmlFor="doc_given_number"
                      className="text-slate-600"
                    >
                      Document ID
                    </label>
                    <Input
                      className="rounded-lg border-gray-300 p-2 h-full"
                      name="doc_given_number"
                      value={values.doc_given_number}
                      onChange={handleChange}
                      placeholder="Auto Generated From System"
                      disabled
                    />
                  </div>
                  <div className="text-red-500 text-sm">
                    <ErrorMessage name="doc_given_number" />
                  </div>
                </div>

                {/* Document Type = ប្រភេទឯកសារ */}
                <div className="flex flex-col gap-y-2">
                  <div className="flex gap-y-2 flex-col">
                    <label
                      htmlFor="documentType"
                      className="text-slate-600 flex gap-x-2"
                    >
                      Document Type
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
                      component="select"
                      className="rounded-lg border-gray-300 p-2 h-full"
                      name="documentType"
                      // value={values.documentType}
                      onChange={handleChange}
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
                  </div>
                  <div className="text-red-500 text-sm">
                    <ErrorMessage name="documentType" />
                  </div>
                </div>

                {/* Document summary = ខ្លឹមសារសង្ខេប */}
                <div className="flex flex-col gap-y-2">
                  <div className="flex gap-y-2 flex-col">
                    <label htmlFor="summary" className="text-slate-600">
                      Summary
                    </label>
                    <Input
                      className="rounded-lg border-gray-300 p-2 h-full"
                      name="summary"
                      value={values.summary}
                      onChange={handleChange}
                      placeholder="Summary"
                    />
                  </div>
                  <div className="text-red-500 text-sm">
                    <ErrorMessage name="summary" />
                  </div>
                </div>

                {/* Published Date */}
                <div className="flex flex-col gap-y-2">
                  <div className="flex gap-y-2 flex-col">
                    <label htmlFor="published_date" className="text-slate-600">
                      Date of Birth:
                    </label>
                    <Field
                      className="rounded-lg border border-gray-300 border-solid p-2 h-full "
                      type="date"
                      name="published_date"
                      id="published_date"
                      placeholder="Date Of Birth"
                    />
                  </div>
                  <div className="text-red-500 text-sm">
                    <ErrorMessage name="published_date" />
                  </div>
                </div>

                {/* Number of Copies */}
                <div className="flex flex-col gap-y-2">
                  <div className="flex gap-y-2 flex-col">
                    <label htmlFor="num_of_copies" className="text-slate-600">
                      Number of Copies
                    </label>
                    <Input
                      className="rounded-lg border-gray-300 p-2 h-full"
                      name="num_of_copies"
                      value={values.num_of_copies}
                      onChange={handleChange}
                      placeholder="N.o of copies"
                    />
                  </div>
                  <div className="text-red-500 text-sm">
                    <ErrorMessage name="num_of_copies" />
                  </div>
                </div>

                {/* Other */}
                <div className="flex flex-col gap-y-2">
                  <div className="flex gap-y-2 flex-col">
                    <label htmlFor="other" className="text-slate-600">
                      Remark
                    </label>
                    <Input
                      className="rounded-lg border-gray-300 p-2 h-full"
                      name="other"
                      value={values.other}
                      onChange={handleChange}
                      placeholder="Remark"
                    />
                  </div>
                  <div className="text-red-500 text-sm">
                    <ErrorMessage name="other" />
                  </div>
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
                <button
                  onMouseOver={() => {
                    setBtnClicked("Draft");
                  }}
                  disabled={isLoading}
                  className="py-2 px-4 bg-custom-blue text-white rounded-lg flex gap-x-2 items-center text-base h-full hover:!bg-blue-600 hover:!text-white border-none"
                >
                  {isLoading ? (
                    <LoadingSpinner color="white" />
                  ) : (
                    <FaPlusSquare />
                  )}
                  Save as Draft
                </button>

                <button
                  onMouseOver={() => {
                    setBtnClicked("Submit");
                  }}
                  disabled={loading}
                  className="py-2 px-4 bg-green-500 text-white rounded-lg flex gap-x-2 items-center text-base h-full hover:!bg-green-600 hover:!text-white border-none"
                >
                  {loading ? (
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
