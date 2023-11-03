import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./slices/adminSlice";

export default configureStore({
  reducer: {
    admin: adminReducer,
  },
});
