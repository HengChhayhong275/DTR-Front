import * as Yup from "yup";

export const UnitSchema = Yup.object().shape({
  name: Yup.string().required("Name is required."),
  abbre_name: Yup.string().required("Abbreviation is required."),
  unitPin: Yup.string().required("Unit Pin is required."),
  unitType: Yup.string().required("Unit Type is required."),
  parentUnit: Yup.string(),
});
