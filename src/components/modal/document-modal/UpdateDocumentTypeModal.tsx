import { useState } from "react";
import { Formik, FormikValues } from "formik";
import { ToastSucess } from "../../toast/ToastSucess";
import { ToastError } from "../../toast/ToastError";
import { DocumentType } from "@/@types/document-type";
import { useUpdateDocumentTypeMutation } from "@/store/features/documentType/documentTypeApiSlice";
import { DocumentTypeForm } from "../../form/DocumentTypeForm";
import { DocumentTypeSchema } from "../../schema/DocumentTypeSchema";
import { BaseModal } from "../BaseModal";

export const UpdateDocumentTypeModal = ({
  open,
  setOpen,
  documentType,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  documentType: DocumentType | undefined;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [updateDocumentType] = useUpdateDocumentTypeMutation();

  const handleUpdateDocumentType = async (values: FormikValues) => {
    try {
      setIsLoading(true);
      const id = documentType?.id;
      await updateDocumentType({ id, documentType: values }).unwrap();
      ToastSucess("Doc Type Updated Successfully!");
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
    <BaseModal open={open} setOpen={setOpen}
    >
      <div className="max-w-[500px]">
        <h1 className="text-2xl font-bold text-black mb-4">
          Update Document Type
        </h1>
        <Formik
          enableReinitialize={true}
          initialValues={{
            name: documentType?.name,
          }}
          validationSchema={DocumentTypeSchema}
          onSubmit={(values) => {
            handleUpdateDocumentType(values);
          }}
        >
        {({values, handleChange}) => <DocumentTypeForm values={values} handleChange={handleChange} isLoading={isLoading} />}
        </Formik>
      </div>
    </BaseModal>
  );
};
