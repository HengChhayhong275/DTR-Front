import * as Yup from "yup";
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;

export const ChangeUserPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required("New password is required.")
    .matches(
      passwordRegex,
      "Password must be at least 6 characters, a number, an Uppercase, and a Lowercase"
    ),
  confPassword: Yup.string()
    .required("Confirm password is required.")
    .oneOf(
      [Yup.ref("newPassword")],
      "Confirm password must match with your new password."
    ),
});