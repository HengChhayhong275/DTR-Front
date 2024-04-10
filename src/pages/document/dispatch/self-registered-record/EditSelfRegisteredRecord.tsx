import { ToastContainer } from "react-toastify";
import { Formik, FormikValues } from "formik";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import { ToastSucess } from "@/components/toast/ToastSucess";
import { ToastError } from "@/components/toast/ToastError";
import { LoadingSpinner } from "@/components/spinner/LoadingSpinner";
import { GoBackArrow } from "@/components/button/GoBackArrow";
import SelfRegisteredRecordForm from "@/components/form/SelfRegisteredRecordForm";
import { DocumentOriginInfoSchema } from "@/components/schema/DocumentOriginInfoSchema";
import { useGetDocumentTypesQuery } from "@/store/features/documentType/documentTypeApiSlice";
import {
  useFindLatestIdSelfRegisteredRecordQuery,
  useGetSelfRegisteredRecordQuery,
  useUpdateSelfRegisteredRecordMutation,
} from "@/store/features/document/selfRegisteredRecordApiSlice";

export const EditSelfRegisteredRecord = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { data: documentTypes } = useGetDocumentTypesQuery(undefined);
  const { data: documentSelfRecord, isLoading } =
    useGetSelfRegisteredRecordQuery(id);
  const { data: selfRecordLatestId } =
    useFindLatestIdSelfRegisteredRecordQuery(undefined);

  const [updateSelfRegisteredRecord] = useUpdateSelfRegisteredRecordMutation();

  const handleEditSelfRegisteredInfo = async (values: FormikValues) => {
    console.log(values);
    try {
      setLoading(true);
      await updateSelfRegisteredRecord({
        id,
        selfRegisteredRecord: values,
      }).unwrap();
      ToastSucess("Document Updated Successfully!");
      navigate("/self-registered");
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
      <div>
        <GoBackArrow url="self-registered"/>
      <ToastContainer />
      </div>
      <h1 className=" text-2xl">Edit Self Registered Record Info</h1>
      
      <Formik
        initialValues={{
          order: selfRecordLatestId,
          doc_given_number:
            documentSelfRecord?.documentOriginInfo?.doc_given_number,
          summary: documentSelfRecord?.documentOriginInfo?.summary,
          published_date:
            documentSelfRecord?.documentOriginInfo?.published_date,
          num_of_copies: documentSelfRecord?.documentOriginInfo?.num_of_copies,
          documentType:
            documentSelfRecord?.documentOriginInfo?.documentType?.id,
          other: documentSelfRecord?.documentOriginInfo?.other,
        }}
        validationSchema={DocumentOriginInfoSchema}
        onSubmit={(values) => {
          handleEditSelfRegisteredInfo(values);
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
