// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { isValidJSON } from "../../util";

// FUNCTION: This function handles driver signup
export const signupDriver = createAsyncThunk(
  "driver/signup",
  async (payload) => {
    console.log("payload.image:::", payload?.values?.image);

    // UPLOAD IMAGE TO CLOUDINARY FIRST
    const formData = new FormData();
    formData.append("file", payload?.values?.image);
    formData.append("upload_preset", "shuttlelane-web"); // Replace with your preset name

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/shuttlelane/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        console.log("upload successful");
        const data = await response.json();
        return fetch(`http://localhost:3001/api/v1/auth/driver/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: data.secure_url,
            firstName: payload?.values?.firstName,
            middleName: payload?.values?.middleName,
            lastName: payload?.values?.lastName,
            email: payload?.values?.email,
            gender: payload?.values?.gender,
            mobile: payload?.values?.mobile,
            alternateMobile: payload?.values?.alternateMobile,
            education: payload?.values?.education,
            dateOfBirth: payload?.values?.dateOfBirth,
            address: payload?.values?.address,
            city: payload?.values?.city,
            state: payload?.values?.state,
            maritalStatus: payload?.values?.maritalStatus,
            bvn: payload?.values?.bvn,
            nin: payload?.values?.nin,
            bank: payload?.values?.bank,
            accountNumber: payload?.values?.accountNumber,
            accountName: payload?.values?.accountName,
            driverLicense: payload?.values?.driverLicense,
            carType: payload?.values?.carType,
            carName: payload?.values?.carName,
            carModel: payload?.values?.carModel,
            carYear: payload?.values?.carYear,
            carColor: payload?.values?.carColor,
            carPlateNumber: payload?.values?.carPlateNumber,
            emergencyFirstName: payload?.values?.emergencyFirstName,
            emergencyLastName: payload?.values?.emergencyLastName,
            emergencyAddress: payload?.values?.emergencyAddress,
            emergencyMobile: payload?.values?.emergencyMobile,
            emergencyRelationship: payload?.values?.emergencyRelationship,
            isDrivingForHailingPlatforms:
              payload?.values?.isDrivingForHailingPlatforms,
            otherHailingPlatforms: payload?.values?.otherHailingPlatforms,
            password: payload?.values?.password,
          }),
        })
          .then((res) => res.json())
          .catch((err) => console.log("SIGNUP DRIVER ERROR:", err));
      } else {
        // Handle error
        console.error("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
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
      `http://localhost:3001/api/v1/drivers/bookings/assigned/${payload?.driverId}`,
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

// FUNCTION: Fetch a booking by its booking reference
export const fetchBookingByReference = createAsyncThunk(
  "driver/booking/getOneByReference",
  async (bookingReference) => {
    console.log("HI");
    return fetch(
      `http://localhost:3001/api/v1/booking/get-booking-by-reference/${bookingReference}`,
      {}
    )
      .then((res) => res.json())
      .catch((err) => console.log("FETCH BOOKING REFERENCE ERROR:", err));
  }
);

// FUNCTION: This function handles accepting a booking
export const acceptBooking = createAsyncThunk(
  "driver/bookings/acceptJob",
  async (payload) => {
    return fetch(
      `http://localhost:3001/api/v1/drivers/booking/accept/${payload?.driverId}/${payload?.bookingId}`,
      {
        method: "PATCH",
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
        },
      }
    )
      .then((res) => {
        console.log("HELLO 6");
        return res.json();
      })
      .catch((err) => console.log("ACCEPT JOB ERROR:", err));
  }
);

// FUNCTION: This function handles accepting a booking
export const declineBooking = createAsyncThunk(
  "driver/bookings/declineJob",
  async (payload) => {
    return fetch(
      `http://localhost:3001/api/v1/drivers/booking/decline/${payload?.driverId}/${payload?.bookingId}`,
      {
        method: "PATCH",
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
        },
      }
    )
      .then((res) => {
        console.log("HELLO 6");
        return res.json();
      })
      .catch((err) => console.log("DECLINE JOB ERROR:", err));
  }
);

// FUNCTION: Fetch a driver's earnings
export const fetchDriverEarnings = createAsyncThunk(
  "driver/earnings/getAll",
  async (payload) => {
    console.log("HI");
    return fetch(
      `http://localhost:3001/api/v1/drivers/earnings/${payload?.driverId}`,
      {
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("FETCH DRIVER EARNINGS ERROR:", err));
  }
);

// FUNCTION: This function fetches the driver's assigned jobs
export const fetchUpcomingJobs = createAsyncThunk(
  "driver/bookings/getUpcomingBookings",
  async (payload) => {
    return fetch(
      `http://localhost:3001/api/v1/drivers/bookings/upcoming/${payload?.driverId}`,
      {
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) =>
        console.log("FETCH DRIVER'S UPCOMING BOOKINGS ERROR:", err)
      );
  }
);

// FUNCTION: This function starts a job
export const startBooking = createAsyncThunk(
  "driver/bookings/start",
  async (payload) => {
    return fetch(
      `http://localhost:3001/api/v1/drivers/booking/start/${payload?.driverId}/${payload?.bookingId}`,
      {
        method: "PATCH",
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("START BOOKING ERROR:", err));
  }
);

// FUNCTION: This function ends a job
export const endBooking = createAsyncThunk(
  "driver/bookings/end",
  async (payload) => {
    return fetch(
      `http://localhost:3001/api/v1/drivers/booking/end/${payload?.driverId}/${payload?.bookingId}`,
      {
        method: "PATCH",
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("END BOOKING ERROR:", err));
  }
);

// FUNCTION: This function fetches the driver's completed jobs
export const fetchCompletedJobs = createAsyncThunk(
  "driver/bookings/getCompletedBookings",
  async (payload) => {
    return fetch(
      `http://localhost:3001/api/v1/drivers/bookings/completed/${payload?.driverId}`,
      {
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) =>
        console.log("FETCH DRIVER'S COMPLETED BOOKINGS ERROR:", err)
      );
  }
);

// FUNCTION: This function fetches the driver's ongoing jobs
export const fetchOngoingJobs = createAsyncThunk(
  "driver/bookings/getOngoingBookings",
  async (payload) => {
    return fetch(
      `http://localhost:3001/api/v1/drivers/bookings/ongoing/${payload?.driverId}`,
      {
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) =>
        console.log("FETCH DRIVER'S ONGOING BOOKINGS ERROR:", err)
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
    ongoingBookings: null,
    completedBookings: null,

    // This state tracks when the driver has been created, in order to redirect to the verification page
    hasSignedUp: false,
    hasVerifiedPhone: false,

    // These states handle the driver OTP verification states on the driver account page
    hasClickedSendCode: false,
    isResendOtpLoading: false,
    hasResetPassword: false,

    // These states handle the driver bookings
    isGetBookingByReferenceLoading: null,
    bookingFetchedByReference: null,

    // These states handle driver earnings
    expectedEarnings: null,
    earnings: null,
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
        if (action.payload?.status == 200) {
          state.assignedBookings = action.payload?.bookings;
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
      }) // fetchBookingByReference AsyncThunk states
      .addCase(fetchBookingByReference.pending, (state) => {
        state.isGetBookingByReferenceLoading = true;
      })
      .addCase(fetchBookingByReference.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD GET BOOKING BY REFERENCE", action.payload);
        state.isGetBookingByReferenceLoading = false;
        if (action.payload?.status == 200) {
          state.bookingFetchedByReference = action.payload?.booking;
        }
      })
      .addCase(fetchBookingByReference.rejected, (state) => {
        state.isGetBookingByReferenceLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // acceptBooking AsyncThunk states
      .addCase(acceptBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(acceptBooking.fulfilled, (state, action) => {
        console.log("ACCEPT BOOKING ACTION.PAYLOAD", action.payload);
        state.message = action.payload?.message;
        state.isLoading = false;
        if (action.payload?.status == 201) {
          toast.success(action.payload?.message);
          state.assignedBookings = action.payload?.assignedBookings;
          state.upcomingBookings = action.payload?.upcomingBookings;
        } else {
          toast.error(action.payload?.message);
        }
      })
      .addCase(acceptBooking.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // declineBooking AsyncThunk states
      .addCase(declineBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(declineBooking.fulfilled, (state, action) => {
        console.log("DECLINE BOOKING ACTION.PAYLOAD", action.payload);
        state.message = action.payload?.message;
        state.isLoading = false;
        if (action.payload?.status == 201) {
          toast.success(action.payload?.message);
          state.assignedBookings = action.payload?.assignedBookings;
          state.upcomingBookings = action.payload?.upcomingBookings;
        } else {
          toast.error(action.payload?.message);
        }
      })
      .addCase(declineBooking.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // fetchDriverEarnings AsyncThunk states
      .addCase(fetchDriverEarnings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDriverEarnings.fulfilled, (state, action) => {
        console.log("FETCH DRIVER EARNINGS ACTION.PAYLOAD", action.payload);
        state.message = action.payload?.message;
        state.isLoading = false;
        if (action.payload?.status == 200) {
          state.earnings = action.payload?.earnings;
          state.expectedEarnings = action.payload?.expectedEarnings;
        } else {
          toast.error(action.payload?.message);
        }
      })
      .addCase(fetchDriverEarnings.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // fetchUpcomingJobs AsyncThunk states
      .addCase(fetchUpcomingJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUpcomingJobs.fulfilled, (state, action) => {
        console.log(
          "FETCH DRIVER'S UPCOMING JOBS ACTION.PAYLOAD",
          action.payload
        );
        if (action.payload?.status == 200) {
          state.upcomingBookings = action.payload?.bookings;
          state.isLoading = false;
        } else {
          toast.error(action.payload?.message);
          state.isLoading = false;
        }
      })
      .addCase(fetchUpcomingJobs.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // startBooking AsyncThunk states
      .addCase(startBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(startBooking.fulfilled, (state, action) => {
        console.log("START BOOKING ACTION.PAYLOAD", action.payload);
        if (action.payload?.status == 201) {
          state.assignedBookings = action.payload?.assignedBookings;
          state.upcomingBookings = action.payload?.upcomingBookings;
          state.ongoingBookings = action.payload?.ongoingBookings;
          state.isLoading = false;
          toast.success(action.payload?.message);
        } else {
          toast.error(action.payload?.message);
          state.isLoading = false;
        }
      })
      .addCase(startBooking.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // endBooking AsyncThunk states
      .addCase(endBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(endBooking.fulfilled, (state, action) => {
        console.log("START BOOKING ACTION.PAYLOAD", action.payload);
        if (action.payload?.status == 201) {
          state.assignedBookings = action.payload?.assignedBookings;
          state.upcomingBookings = action.payload?.upcomingBookings;
          state.ongoingBookings = action.payload?.ongoingBookings;
          state.completedBookings = action.payload?.completedBookings;
          state.isLoading = false;
          toast.success(action.payload?.message);
        } else {
          toast.error(action.payload?.message);
          state.isLoading = false;
        }
      })
      .addCase(endBooking.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // fetchOngoingJobs AsyncThunk states
      .addCase(fetchOngoingJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOngoingJobs.fulfilled, (state, action) => {
        console.log(
          "FETCH DRIVER'S ONGOING JOBS ACTION.PAYLOAD",
          action.payload
        );
        if (action.payload?.status == 200) {
          state.ongoingBookings = action.payload?.bookings;
          state.isLoading = false;
        } else {
          toast.error(action.payload?.message);
          state.isLoading = false;
        }
      })
      .addCase(fetchOngoingJobs.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // fetchCompletedJobs AsyncThunk states
      .addCase(fetchCompletedJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCompletedJobs.fulfilled, (state, action) => {
        console.log(
          "FETCH DRIVER'S UPCOMING JOBS ACTION.PAYLOAD",
          action.payload
        );
        if (action.payload?.status == 200) {
          state.completedBookings = action.payload?.bookings;
          state.isLoading = false;
        } else {
          toast.error(action.payload?.message);
          state.isLoading = false;
        }
      })
      .addCase(fetchCompletedJobs.rejected, (state) => {
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
