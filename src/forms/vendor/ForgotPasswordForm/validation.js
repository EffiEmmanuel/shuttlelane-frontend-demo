import * as yup from "yup";

const requiredText = "This field is required";
const VendorForgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please provide a valid email address")
    .required(requiredText),
});

export default VendorForgotPasswordSchema;
