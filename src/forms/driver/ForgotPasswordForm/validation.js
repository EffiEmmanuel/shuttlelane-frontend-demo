import * as yup from "yup";

const requiredText = "This field is required";
const DriverForgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please provide a valid email address")
    .required(requiredText),
});

export default DriverForgotPasswordSchema;
