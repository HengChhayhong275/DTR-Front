/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorMessage, Field, Form, Formik, FormikValues } from "formik";
import { useState } from "react";
import { ToastSucess } from "../../toast/ToastSucess";
import { ToastError } from "../../toast/ToastError";
import * as Yup from "yup";
import { LoadingSpinner } from "@/components/spinner/LoadingSpinner";
import { Modal } from "antd";
import { useGetDraftSelfRecordQuery } from "@/store/features/draft/draftRecordApiSlice";
import { FormatDateTime } from "@/components/functions/FormatDateTime";
import { useNavigate } from "react-router";
import { useAcceptRequestMutation } from "@/store/features/document/handleRequestApiSlice";
import { useGetDocGivenNumberQuery } from "@/store/features/document/selfRegisteredRecordApiSlice";

export const AcceptIdModal = ({
  open,
  setOpen,
  id,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  id: string | undefined;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { data: documentGivenNumber } = useGetDocGivenNumberQuery(undefined);
  const { data: draftSelfRecord } = useGetDraftSelfRecordQuery(id);

  const [acceptRequest] = useAcceptRequestMutation();
  const handleAcceptRequest = async (values: FormikValues) => {
    try {
      await acceptRequest({ id, acceptRequest: values }).unwrap();
      ToastSucess("Request Accepted Successfully !");
      navigate("/self-registered");
    } catch (err: any) {
      console.log(err);
      ToastError(err?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Full name of creator
  const created_by =
    draftSelfRecord?.documentOriginInfo?.created_by?.firstNameEn +
    " " +
    draftSelfRecord?.documentOriginInfo?.created_by?.lastNameEn;

  const AcceptSchema = Yup.object().shape({
    summary: Yup.string().required("Summary is required."),
    other: Yup.string(),
  });

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
          Accept the Request
        </h1>

        <Formik
          enableReinitialize={true}
          initialValues={{
            amount: draftSelfRecord?.documentOriginInfo?.amount,
            summary: draftSelfRecord?.documentOriginInfo?.summary,
            other: draftSelfRecord?.documentOriginInfo?.other,
          }}
          validationSchema={AcceptSchema}
          onSubmit={(values) => {
            handleAcceptRequest(values);
          }}
        >
          {() => (
            <Form>
              <div className="w-full grid grid-cols-3 gap-x-4 gap-y-4">
                <div className="mb-5">
                  <label
                    htmlFor="doc_given_number"
                    className="block mb-2 text-sm font-semibold text-gray-900"
                  >
                    Document ID
                  </label>
                  <p className="text-red-500">{documentGivenNumber?.doc_given_number}</p>
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="created_by"
                    className="block mb-2 text-sm font-semibold text-gray-900"
                  >
                    Created by
                  </label>
                  <p>{created_by}</p>
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="requested_by"
                    className="block mb-2 text-sm font-semibold text-gray-900"
                  >
                    Requested by
                  </label>
                  <p>
                    {draftSelfRecord?.request_transaction?.requested_by?.name}
                  </p>
                  <div className="text-red-500 text-sm">
                    <ErrorMessage name="requested_by" />
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
                  <p>
                    {draftSelfRecord?.documentOriginInfo?.documentType?.name}
                  </p>
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
                    {FormatDateTime(
                      draftSelfRecord?.documentOriginInfo?.createdAt
                    )}
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
                    className="block p-2.5 w-fit text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-custom-blue"
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-custom-blue block w-fit p-2.5"
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-custom-blue block w-fit p-2.5"
                    placeholder=""
                  />
                </div>
              </div>
              <div className="flex justify-end gap-x-4 w-full">
                <button
                  className="py-2 px-4 text-white rounded-lg flex gap-x-2 items-center text-base h-full bg-red-600 hover:!text-red-600 hover:!border-red-600"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  // onClick={() => {
                  //   // handleSave(values);
                  // }}
                  disabled={isLoading}
                  className="py-2 px-4 bg-green-500 text-white rounded-lg flex gap-x-2 items-center text-base h-full hover:!border-green-400 hover:!text-green-400 break-all"
                >
                  {isLoading && <LoadingSpinner color="black" />}
                  Confirm
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};
