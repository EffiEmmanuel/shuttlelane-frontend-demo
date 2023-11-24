import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./slices/adminSlice";
import driverReducer from "./slices/driverSlice";

export default configureStore({
  reducer: {
    admin: adminReducer,
    driver: driverReducer,
  },
});
