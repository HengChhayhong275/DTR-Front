/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoBackArrow } from "@/components/button/GoBackArrow";
import SelfRegisteredRecordForm from "@/components/form/SelfRegisteredRecordForm";
import { DocumentOriginInfoSchema } from "@/components/schema/DocumentOriginInfoSchema";
import { LoadingSpinner } from "@/components/spinner/LoadingSpinner";
import { ToastError } from "@/components/toast/ToastError";
import { ToastSucess } from "@/components/toast/ToastSucess";
import { useGetDocumentTypesQuery } from "@/store/features/documentType/documentTypeApiSlice";
import {
  useGetDraftSelfRecordQuery,
  useUpdateDraftSelfRecordMutation,
} from "@/store/features/draft/draftRecordApiSlice";
import { Formik, FormikValues } from "formik";
import { useState } from "react";
import { MdEditDocument } from "react-icons/md";
import { useParams } from "react-router";
import { ToastContainer } from "react-toastify";

export const EditDraftSelfRegisteredRecord = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const { data: documentTypes } = useGetDocumentTypesQuery(undefined);
  const { data: draftSelfRegisteredRecord, isLoading } =
    useGetDraftSelfRecordQuery(id);

  const [updateDraftSelfRegisteredRecord] = useUpdateDraftSelfRecordMutation();

  const handleEditDraftSelfRegistered = async (values: FormikValues) => {
    console.log(values);
    try {
      setLoading(true);
      await updateDraftSelfRegisteredRecord({
        id,
        draftSelfRegisteredRecord: values,
      }).unwrap();
      ToastSucess("Draft Self Registered Record Updated Successfully!");
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

  // console.log(draftSelfRegisteredRecord)

  return (
    <div className="bg-white p-8 w-full flex flex-col gap-y-4">
      <GoBackArrow url="self-registered" />
      <ToastContainer />
      <h1 className=" text-3xl">Edit Draft Self Registered Record Info</h1>
      <div className="flex w-full justify-between items-start">
        <MdEditDocument className="text-9xl" />
      </div>
      <Formik
        initialValues={{
          order: "",
          doc_given_number:
            draftSelfRegisteredRecord?.documentOriginInfo?.doc_given_number,
          summary: draftSelfRegisteredRecord?.documentOriginInfo?.summary,
          published_date:
            draftSelfRegisteredRecord?.documentOriginInfo?.published_date,
          num_of_copies:
            draftSelfRegisteredRecord?.documentOriginInfo?.num_of_copies,
          documentType:
            draftSelfRegisteredRecord?.documentOriginInfo?.documentType?.id,
          other: draftSelfRegisteredRecord?.documentOriginInfo?.other,
        }}
        validationSchema={DocumentOriginInfoSchema}
        onSubmit={(values) => {
          handleEditDraftSelfRegistered(values);
        }}
      >
        {() => (
          <SelfRegisteredRecordForm
            isLoading={loading}
            documentTypes={documentTypes}
          />
        )}
      </Formik>
    </div>
  );
};
