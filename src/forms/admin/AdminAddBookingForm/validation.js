import * as yup from "yup";

const requiredText = "This field is required";
const AdminAddBookingUserDetailsSchema = yup.object().shape({
  firstName: yup.string(),
  middleName: yup.string(),
  lastName: yup.string(),
  emailAddress: yup.string().email("Please input a valid email address"),
  phone: yup.string(),
});

export default AdminAddBookingUserDetailsSchema;
