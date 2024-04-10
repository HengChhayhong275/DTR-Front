import * as Yup from "yup";

export const RoleSchema = Yup.object().shape({
  name: Yup.string().required("Role name is required."),
  description: Yup.string().required("Description is required."),
});