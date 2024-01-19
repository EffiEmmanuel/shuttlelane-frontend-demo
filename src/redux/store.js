import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./slices/adminSlice";
import driverReducer from "./slices/driverSlice";
import userReducer from "./slices/userSlice";

export default configureStore({
  reducer: {
    admin: adminReducer,
    driver: driverReducer,
    user: userReducer,
  },
});
