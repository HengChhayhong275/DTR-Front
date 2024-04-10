/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formik, FormikValues } from "formik";
import { useState } from "react";
import { ToastSucess } from "../../toast/ToastSucess";
import { ToastError } from "../../toast/ToastError";
import { DocumentTypeSchema } from "../../schema/DocumentTypeSchema";
import { useCreateDocumentTypeMutation } from "@/store/features/documentType/documentTypeApiSlice";
import { DocumentTypeForm } from "../../form/DocumentTypeForm";
import { BaseModal } from "../BaseModal";

export const CreateDocumentTypeModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [createDocumentType] = useCreateDocumentTypeMutation();

  const handleCreateDocumentType = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    try {
      setIsLoading(true);
      await createDocumentType(values).unwrap();
      ToastSucess("Document Type Created Successfully!");
      resetForm();
      setOpen(false);
    } catch (error: any) {
      console.log(error);
      ToastError(error?.data?.message);
    } finally {
      setIsLoading(false);
    }
    resetForm();
  };

  return (
    <BaseModal setOpen={setOpen} open={open}>
      <h1 className="text-2xl font-bold text-black mb-4">
        Create a new document type
      </h1>
      <Formik
        initialValues={{
          name: "",
        }}
        validationSchema={DocumentTypeSchema}
        onSubmit={(values, { resetForm }) => {
          handleCreateDocumentType(values, resetForm);
        }}
      >
        {({values, handleChange}) => <DocumentTypeForm values={values} handleChange={handleChange} isLoading={isLoading} />}
      </Formik>
    </BaseModal>
  );
};
