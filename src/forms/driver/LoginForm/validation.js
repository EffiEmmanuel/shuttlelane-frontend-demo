import * as yup from "yup";

const requiredText = "This field is required";
const DriverLoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please provide a valid email address")
    .required(requiredText),
  password: yup
    .string()
    .min(5, "Password must be more than 5 characters")
    .required(requiredText),
});

export default DriverLoginSchema;
