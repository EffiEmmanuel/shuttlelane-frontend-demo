import * as yup from "yup";

const requiredText = "This field is required";
const AdminLoginSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, "Username must be more than 4 characters")
    .max(15, "Username cannot be more than 15 characters")
    .required(requiredText),
  password: yup
    .string()
    .min(5, "Password must be more than 5 characters")
    .required(requiredText),
});

export default AdminLoginSchema;
