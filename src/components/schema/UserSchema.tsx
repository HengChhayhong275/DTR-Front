import * as Yup from "yup";

export const UserSchema = Yup.object().shape({
  firstNameEn: Yup.string().required("Firstname is required."),
  firstNameKh: Yup.string().required("Firstname is required."),
  lastNameEn: Yup.string().required("Lastname is required."),
  lastNameKh: Yup.string().required("Lastname is required."),
  email: Yup.string().email("Invalid email.").required("Email is required."),
  nationality: Yup.string().required("Nationality is required."),
  address: Yup.string().required("Address is required."),
  phoneNumber: Yup.string().required("Phone Number is required."),
  dob: Yup.string().required("Date of Birth is required."),
  unit: Yup.string().required("Unit is required."),
  role: Yup.string().required("Role is required."),
});