import * as Yup from "yup";

export const DocumentTypeSchema = Yup.object().shape({
  name: Yup.string().required("Document Type is required."),
});