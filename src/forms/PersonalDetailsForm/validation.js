import * as yup from "yup";

const requiredMessage = "*Required";

const PersonalDetailsFormSchema = yup.object().shape({
  title: yup.string(),
  fullName: yup
    .string()
    .min(3, "Full name must be more than 3 characters")
    .required(requiredMessage),
  phoneNumber: yup.string().required(requiredMessage),
  email: yup
    .string()
    .email("Please provide a valid email address")
    .required(requiredMessage),
});

export default PersonalDetailsFormSchema;
