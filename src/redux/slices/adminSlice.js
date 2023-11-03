import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginAdmin = createAsyncThunk("admin/loginAdmin", () => {
  return axios
    .post(`${process.env.REACT_APP_API_BASE_URL}/auth/admin/login`)
    .then((res) => res.data)
    .catch((err) => console.log("LOGIN ADMIN ERROR:", err.message));
});

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admin: null,
    token: null,
    isAdminLoggedIn: false,
    isLoading: false,
  },
  reducers: {
    loginAdmin: (state, action) => {
      // This action logs in an admin
      state.admin = action.payload;
    },
    logoutAdmin: (state, action) => {
      // This action logs in an admin
    },
  },

  extraReducers: {
    [loginAdmin.pending]: (state) => {
      state.isLoading = true;
    },
    [loginAdmin.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log("ACTION FULFILLED:", action);
    },
    [loginAdmin.rejected]: (state, action) => {
      state.isLoading = false;
      console.log("ACTION REJECTED:", action);
      // state.errorMessage = ''
    },
  },
});
