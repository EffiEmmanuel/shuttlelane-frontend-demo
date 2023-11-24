// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// FUNCTION: This function handles driver signup
export const signupDriver = createAsyncThunk(
  "driver/signup",
  async (payload) => {
    console.log("PAYLOAD:", payload);
    return fetch(`http://localhost:3001/api/v1/auth/driver/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload?.values,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log("SIGNUP DRIVER ERROR:", err));
  }
);

// FUNCTION: This function handles driver login
export const loginDriver = createAsyncThunk(
  "driver/loginAdmin",
  async (payload) => {
    return fetch(`http://localhost:3001/api/v1/auth/driver/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: payload?.username,
        password: payload?.password,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log("LOGIN ADMIN ERROR:", err));
  }
);

// FUNCTION: This function fetches the driver statistics
export const fetchStatistics = createAsyncThunk(
  "driver/statistics",
  async (token) => {
    console.log("TOKEN FROM FETCH::", token);
    const adminToken = localStorage.getItem("adminToken");
    return fetch(`http://localhost:3001/api/v1/driver/statistics`, {
      headers: {
        token: `Bearer ${JSON.parse(token)}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log("FETCH STATS ERROR:", err));
  }
);

export const driverSlice = createSlice({
  name: "driver",
  initialState: {
    driver: null,
    token: "",
    isLoading: false,
    message: "",
    requestStatus: null,

    // The following states are for the driver statistics / overview page
    numberOfBookings: null,
    upcomingBookings: null,
  },
  reducers: {
    setDriver: (state, action) => {
      // This action sets an driver
      console.log("ACTION.PAYLOAD:", action.payload);
      state.driver = action.payload;
    },
    setToken: (state, action) => {
      // This action sets an driver token
      console.log("ACTION.PAYLOAD:", action.payload);
      state.token = action.payload;
    },
    resetMessage: (state) => {
      // This action resets the message state
      state.message = "";
    },
    logoutDriver: (state, action) => {
      // This action logs in a driver
    },
  },

  extraReducers: (builder) => {
    // loginDriver AsyncThunk states
    builder
      .addCase(signupDriver.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signupDriver.fulfilled, (state, action) => {
        if (action.payload?.status == 200) {
          toast.success(action.payload?.message);
        } else {
          toast.error(action.payload?.message);
        }
        state.isLoading = false;
        state.message = action.payload?.message;
        // state.requestStatus = action.payload?.status;
        // state.token = action.payload?.token;
        // // save token to the localstorage
        // localStorage.setItem(
        //   "driverToken",
        //   JSON.stringify(action.payload?.token)
        // );
        // localStorage.setItem("driver", JSON.stringify(action.payload?.driver));
        // state.driver = action.payload?.driver;
      })
      .addCase(signupDriver.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Statistics AsyncThunk states
      .addCase(loginDriver.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginDriver.fulfilled, (state, action) => {
        if (action.payload?.status == 200) {
          toast.success(action.payload?.message);
        } else {
          toast.error(action.payload?.message);
        }
        state.isLoading = false;
        state.message = action.payload?.message;
        state.requestStatus = action.payload?.status;
        state.token = action.payload?.token;
        // save token to the localstorage
        localStorage.setItem(
          "driverToken",
          JSON.stringify(action.payload?.token)
        );
        localStorage.setItem("driver", JSON.stringify(action.payload?.driver));
        state.driver = action.payload?.driver;
      })
      .addCase(loginDriver.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Statistics AsyncThunk states
      .addCase(fetchStatistics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD", action.payload);
        state.isLoading = false;
        state.numberOfBookings = action.payload?.numberOfBookings;
        state.numberOfCarRentalBookings =
          action.payload?.numberOfCarRentalBookings;
        state.numberOfPriorityPassBookings =
          action.payload?.numberOfPriorityPassBookings;
        state.numberOfVisaOnArrivalBookings =
          action.payload?.numberOfVisaOnArrivalBookings;
        state.users = action.payload?.users;
        state.drivers = action.payload?.drivers;
        state.upcomingBookings = action.payload?.upcomingBookings;
      })
      .addCase(fetchStatistics.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      });
  },
});

export const { setDriver, setToken, resetMessage, setCurrentCurrency } =
  driverSlice.actions;
export default driverSlice.reducer;
