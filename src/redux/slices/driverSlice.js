// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { isValidJSON } from "../../util";

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
        email: payload?.email,
        password: payload?.password,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log("LOGIN DRIVER ERROR:", err));
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

// FUNCTION: This function handles resending OTP
export const resendOTP = createAsyncThunk(
  "driver/verification/resendOTP",
  async (payload) => {
    console.log("PAYLOAD.DRIVER:", payload?.driver);
    return fetch(`http://localhost:3001/api/v1/auth/verification/resend-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: payload?.driver,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log("RESEND OTP ERROR:", err));
  }
);

// FUNCTION: This function handles verifying OTP
export const verifyOTP = createAsyncThunk(
  "driver/verification/verifyOTP",
  async (payload) => {
    return fetch(`http://localhost:3001/api/v1/auth/verification/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: payload?.driver,
        code: payload?.code,
        userType: "driver",
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log("VERIFY OTP ERROR:", err));
  }
);

// FUNCTION: This function handles updating a driver account details
export const updateDriver = createAsyncThunk(
  "driver/update/updateDriver",
  async (payload) => {
    console.log("HELLO 5:", payload);
    try {
      const isTokenValidJSON = isValidJSON(payload?.token);
      console.log("IS VALID JSON 1:::", isValidJSON(isTokenValidJSON));
      const token = isTokenValidJSON
        ? JSON.parse(payload?.token)
        : JSON.stringify(payload?.token);
      console.log("TOKEN:::", token);
      console.log("IS VALID JSON 2:::", isValidJSON(token));

      const response = await fetch(
        `http://localhost:3001/api/v1/drivers/update-driver/${payload?.driverId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${token}`,
          },
          body: JSON.stringify(payload?.values),
        }
      );

      if (!response.ok) {
        // Handle non-2xx status codes
        const errorMessage = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorMessage}`
        );
      }

      const data = await response.json();
      console.log("HELLO 6", data);
      return data;
    } catch (error) {
      console.error("UPDATE DRIVER ERROR:", error);
      // Reject the promise with the error message
      throw error;
    }
    // return fetch(
    //   `http://localhost:3001/api/v1/drivers/update-driver/${payload?.driverId}`,
    //   {
    //     method: "PATCH",
    //     headers: {
    //       "Content-Type": "application/json",
    //       token: `Bearer ${JSON.parse(payload?.token)}`,
    //     },
    //     body: JSON.stringify(payload?.values),
    //   }
    // )
    //   .then((res) => {
    //     console.log("HELLO 6");
    //     return res.json();
    //   })
    //   .catch((err) => console.log("UPDATE DRIVER ERROR:", err));
  }
);

// FUNCTION: This function handles resetting a driver's password
export const resetDriverPassword = createAsyncThunk(
  "driver/security/resetPassword",
  async (payload) => {
    const isTokenValidJSON = isValidJSON(payload?.values?.token);
    console.log("IS VALID JSON 1:::", isValidJSON(isTokenValidJSON));
    const token = isTokenValidJSON
      ? JSON.parse(payload?.values?.token)
      : JSON.stringify(payload?.values?.token);
    console.log("TOKEN:::", token);
    console.log("IS VALID JSON 2:::", isValidJSON(token));

    return fetch(
      `http://localhost:3001/api/v1/drivers/reset-password/${payload?.values?.driverId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${token}`,
        },
        body: JSON.stringify(payload?.values),
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("RESET PASSWORD ERROR:", err));
  }
);

// FUNCTION: This function fetches the driver's assigned jobs
export const fetchAssignedJobs = createAsyncThunk(
  "driver/bookings/getAssignedBookings",
  async (payload) => {
    return fetch(
      `http://localhost:3001/api/v1/driver/bookings/assigned/${payload?.driverId}`,
      {
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) =>
        console.log("FETCH DRIVER'S ASSIGNED BOOKINGS ERROR:", err)
      );
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
    assignedBookings: null,

    // This state tracks when the driver has been created, in order to redirect to the verification page
    hasSignedUp: false,
    hasVerifiedPhone: false,

    // These states handle the driver OTP verification states on the driver account page
    hasClickedSendCode: false,
    isResendOtpLoading: false,
    hasResetPassword: false,
  },
  reducers: {
    setDriver: (state, action) => {
      // This action sets an driver
      console.log("ACTION.PAYLOAD:", action.payload);
      state.driver = action.payload;
    },
    setDriverToken: (state, action) => {
      // This action sets an driver token
      console.log("ACTION.PAYLOAD:", action.payload);
      state.token = action.payload;
    },
    resetMessage: (state) => {
      // This action resets the message state
      state.message = "";
    },
    resetHasVerifiedPhone: (state) => {
      // This action resets the hasVerifiedPhone state
      state.hasVerifiedPhone = false;
    },
    setHasClickedSendCode: (state, action) => {
      // This action resets the hasClickedSendCode state
      state.hasClickedSendCode = action.payload;
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
        if (action.payload?.status == 201) {
          toast.success(action.payload?.message);
        } else {
          toast.error(
            `Sign up successful. However, we encountred an issue sending you an OTP. Please check your internet connection and try again`
          );
        }
        state.isLoading = false;
        state.message = action.payload?.message;
        state.driver = action.payload?.driver;
        state.token = action.payload?.token;
        state.hasSignedUp = true;
        // save token to the localstorage
        localStorage.setItem(
          "driverToken",
          JSON.stringify(action.payload?.token)
        );
        localStorage.setItem("driver", JSON.stringify(action.payload?.driver));
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
      }) // resendOTP AsyncThunk states
      .addCase(resendOTP.pending, (state) => {
        state.isLoading = true;
        state.isResendOtpLoadingg = true;
      })
      .addCase(resendOTP.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD", action.payload);
        state.isLoading = false;
        state.isResendOtpLoading = false;
        state.message = action.payload?.message;
        if (action.payload?.status == 200) {
          console.log("hello from 200");
          toast.success(action.payload?.message);
        } else {
          console.log("hello from 500");
          toast.error(
            `An error occured while processing your request for a new OTP. Please check your internet connection and try again.`
          );
        }
      })
      .addCase(resendOTP.rejected, (state) => {
        state.isLoading = false;
        state.isResendOtpLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
        console.log("HELLO FROM THE REJECTED TAB");
      }) // verifyOTP AsyncThunk states
      .addCase(verifyOTP.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        console.log("VERIFICATION ACTION.PAYLOAD", action.payload);
        state.message = action.payload?.message;
        state.isLoading = false;

        if (action.payload?.status == 200) {
          state.driver = { ...action.payload?.user };
          state.token = JSON.stringify(action.payload?.token);
          // save token to the localstorage
          localStorage.setItem(
            "driverToken",
            JSON.stringify(action.payload?.token)
          );
          localStorage.setItem("driver", JSON.stringify(action.payload?.user));
          toast.success(action.payload?.message);
          state.hasVerifiedPhone = true;
        } else {
          toast.error(action.payload?.message);
        }
      })
      .addCase(verifyOTP.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // updateDriver AsyncThunk states
      .addCase(updateDriver.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDriver.fulfilled, (state, action) => {
        console.log("VERIFICATION ACTION.PAYLOAD", action.payload);
        state.message = action.payload?.message;
        state.isLoading = false;

        if (action.payload?.status == 201) {
          state.driver = { ...action.payload?.driver };
          state.token = JSON.stringify(action.payload?.token);
          // save token to the localstorage
          localStorage.setItem(
            "driverToken",
            JSON.stringify(action.payload?.token)
          );
          localStorage.setItem(
            "driver",
            JSON.stringify(action.payload?.driver)
          );
          toast.success(action.payload?.message);
        } else {
          toast.error(action.payload?.message);
        }
      })
      .addCase(updateDriver.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // resetDriverPassword AsyncThunk states
      .addCase(resetDriverPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetDriverPassword.fulfilled, (state, action) => {
        console.log("RESET DRIVER PASSWORD ACTION.PAYLOAD", action.payload);
        state.message = action.payload?.message;
        state.isLoading = false;

        if (action.payload?.status == 201) {
          toast.success(action.payload?.message);
          localStorage.clear();
          state.hasResetPassword = true;
        } else {
          toast.error(action.payload?.message);
        }
      })
      .addCase(resetDriverPassword.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // fetchAssignedJobs AsyncThunk states
      .addCase(fetchAssignedJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAssignedJobs.fulfilled, (state, action) => {
        console.log(
          "FETCH DRIVER'S ASSIGNED JOBS ACTION.PAYLOAD",
          action.payload
        );
        if (action.payload?.status == 201) {
          state.assignedBookings = action.payload?.assignedBookings;
          state.isLoading = false;
        } else {
          toast.error(action.payload?.message);
          state.isLoading = false;
        }
      })
      .addCase(fetchAssignedJobs.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      });
  },
});

export const {
  setDriver,
  setDriverToken,
  resetMessage,
  setCurrentCurrency,
  setHasClickedSendCode,
  resetHasVerifiedPhone,
} = driverSlice.actions;
export default driverSlice.reducer;
