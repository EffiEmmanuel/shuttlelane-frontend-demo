import * as yup from "yup";

const requiredText = "This field is required";
const DriverResetForgotPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(5, "Password must be more than 5 characters")
    .required(requiredText),
});

export default DriverResetForgotPasswordSchema;
