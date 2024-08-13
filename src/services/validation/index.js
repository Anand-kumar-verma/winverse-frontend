import * as Yup from "yup";

export const signupSchemaValidataon = Yup.object().shape({
  invite_code: Yup.string().required("Referral Code is required"),
  password: Yup.string()
    .min(3, "Password must be 3 characters at minimum")
    .required("Password is required"),
  confirmed_password: Yup.string()
    .min(3, "Password must be 3 characters at minimum")
    .required("Password is required"),
    name: Yup.string()
    .required("Name is required"),
  mobile: Yup.string()
    .matches(
      /^[0-9]{10}$/,
      "Invalid mobile number format. It must be a 10-digit number."
    )
    .required("Mobile number is required"),
});
export const signupSchemaValidataonEmail = Yup.object().shape({
  invite_code: Yup.string().required("Referral Code is required"),
  password: Yup.string()
    .min(3, "Password must be 3 characters at minimum")
    .required("Password is required"),
  confirmed_password: Yup.string()
    .min(3, "Password must be 3 characters at minimum")
    .required("Password is required"),
    name: Yup.string()
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
});
