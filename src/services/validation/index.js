import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  mobile: Yup.string()
    .matches(
      /^[0-9]{10}$/,
      "Invalid mobile number format. It must be a 10-digit number."
    )
    .required("Mobile number is required"),
   
});

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
    email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
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

export const withdraw_amount_validation_schema = Yup.object().shape({
  amount: Yup.number()
    .required("Amount is required")
    .min(100, "Amount must be greater than or equal to 100"),
    type : Yup.string().required("withdrawal type is required")
  
});

export const topup = Yup.object().shape({
  amount: Yup.number()
    .required("Amount is required")
    .min(200, "Amount must be greater than or equal to 200"),
    deposit_type : Yup.string().required("deposite type is required"),
    transaction_id: Yup.string().required("Transaction id  is required"),
  
});
export const Deposit = Yup.object().shape({
  req_amount: Yup.number()
    .required("Amount is required")
    .min(10, "Amount must be greater than or equal to 10"),
    deposit_type : Yup.string().required("Deposit type is required"),
    transaction_no: Yup.string().required("Transaction No is required"),
   

});
