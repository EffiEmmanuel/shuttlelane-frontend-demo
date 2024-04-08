// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { isValidJSON } from "../../util";

// FUNCTION: This function handles vendor signup
export const signupVendor = createAsyncThunk(
  "vendor/signup",
  async (payload) => {
    console.log("PAYLOAD:", payload);
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/vendor/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload?.values,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log("SIGNUP VENDOR ERROR:", err));
  }
);

// FUNCTION: This function handles vendor login
export const loginVendor = createAsyncThunk(
  "vendor/loginAdmin",
  async (payload) => {
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/vendor/login`, {
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
      .catch((err) => console.log("LOGIN VENDOR ERROR:", err));
  }
);

// FUNCTION: This function fetches the vendor statistics
export const fetchStatistics = createAsyncThunk(
  "vendor/statistics",
  async (token) => {
    console.log("TOKEN FROM FETCH::", token);
    const adminToken = localStorage.getItem("adminToken");
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/vendor/statistics`, {
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
  "vendor/verification/resendOTP",
  async (payload) => {
    console.log("PAYLOAD.VENDOR:", payload?.vendor);
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/auth/verification/resend-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: payload?.vendor,
        }),
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("RESEND OTP ERROR:", err));
  }
);

// FUNCTION: This function handles verifying OTP
export const verifyOTP = createAsyncThunk(
  "vendor/verification/verifyOTP",
  async (payload) => {
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/auth/verification/verify-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: payload?.vendor,
          code: payload?.code,
          userType: "vendor",
        }),
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("VERIFY OTP ERROR:", err));
  }
);

// FUNCTION: This function handles updating a vendor account details
export const updateVendor = createAsyncThunk(
  "vendor/update/updateVendor",
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
        `${process.env.REACT_APP_API_BASE_URL}/vendors/update-vendor/${payload?.vendorId}`,
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
      console.error("UPDATE VENDOR ERROR:", error);
      // Reject the promise with the error message
      throw error;
    }
    // return fetch(
    //   `${process.env.REACT_APP_API_BASE_URL}/vendors/update-vendor/${payload?.vendorId}`,
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
    //   .catch((err) => console.log("UPDATE VENDOR ERROR:", err));
  }
);

// FUNCTION: This function handles resetting a vendor's password
export const resetVendorPassword = createAsyncThunk(
  "vendor/security/resetPassword",
  async (payload) => {
    const isTokenValidJSON = isValidJSON(payload?.values?.token);
    console.log("IS VALID JSON 1:::", isValidJSON(isTokenValidJSON));
    const token = isTokenValidJSON
      ? JSON.parse(payload?.values?.token)
      : JSON.stringify(payload?.values?.token);
    console.log("TOKEN:::", token);
    console.log("IS VALID JSON 2:::", isValidJSON(token));

    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/vendors/reset-password/${payload?.values?.vendorId}`,
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

// FUNCTION: This function fetches the vendor's assigned jobs
export const fetchVendorAssignedJobs = createAsyncThunk(
  "vendor/bookings/getAssignedBookings",
  async (payload) => {
    console.log("IN VENDOR ASSIGNED");
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/vendors/bookings/assigned/${payload?.vendorId}`,
      {
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) =>
        console.log("FETCH VENDOR'S ASSIGNED BOOKINGS ERROR:", err)
      );
  }
);

// FUNCTION: Fetch a booking by its booking reference
export const fetchBookingByReference = createAsyncThunk(
  "vendor/booking/getOneByReference",
  async (bookingReference) => {
    console.log("HI");
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/booking/get-booking-by-reference/${bookingReference}`,
      {}
    )
      .then((res) => res.json())
      .catch((err) => console.log("FETCH BOOKING REFERENCE ERROR:", err));
  }
);

// FUNCTION: This function handles accepting a booking
export const acceptBooking = createAsyncThunk(
  "vendor/bookings/acceptJob",
  async (payload) => {
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/vendors/booking/accept/${payload?.vendorId}/${payload?.bookingId}/${payload?.fleetId}/${payload?.driverId}`,
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
  "vendor/bookings/declineJob",
  async (payload) => {
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/vendors/booking/decline/${payload?.vendorId}/${payload?.bookingId}`,
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

// FUNCTION: Fetch a vendor's earnings
export const fetchVendorEarnings = createAsyncThunk(
  "vendor/earnings/getAll",
  async (payload) => {
    console.log("HI");
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/vendors/earnings/${payload?.vendorId}`,
      {
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("FETCH VENDOR EARNINGS ERROR:", err));
  }
);

// FUNCTION: This function fetches the vendor's assigned jobs
export const fetchUpcomingJobs = createAsyncThunk(
  "vendor/bookings/getUpcomingBookings",
  async (payload) => {
    console.log("IN VENDOR UPCOMING");
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/vendors/bookings/upcoming/${payload?.vendorId}`,
      {
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) =>
        console.log("FETCH VENDOR'S UPCOMING BOOKINGS ERROR:", err)
      );
  }
);

// FUNCTION: This function starts a job
export const startBooking = createAsyncThunk(
  "vendor/bookings/start",
  async (payload) => {
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/vendors/booking/start/${payload?.vendorId}/${payload?.bookingId}`,
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
  "vendor/bookings/end",
  async (payload) => {
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/vendors/booking/end/${payload?.vendorId}/${payload?.bookingId}`,
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

// FUNCTION: This function fetches the vendor's completed jobs
export const fetchCompletedJobs = createAsyncThunk(
  "vendor/bookings/getCompletedBookings",
  async (payload) => {
    console.log("COMPLETED ASYNCTHUNK:", payload?.token);
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/vendors/bookings/completed/${payload?.vendorId}`,
      {
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) =>
        console.log("FETCH VENDOR'S COMPLETED BOOKINGS ERROR:", err)
      );
  }
);

// FUNCTION: This function fetches the vendor's ongoing jobs
export const fetchOngoingJobs = createAsyncThunk(
  "vendor/bookings/getOngoingBookings",
  async (payload) => {
    console.log("IN VENDOR ONGOING TOKEN:", payload?.token);
    console.log("IN VENDOR ONGOING VENDOR ID:", payload?.vendorId);
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/vendors/bookings/ongoing/${payload?.vendorId}`,
      {
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) =>
        console.log("FETCH VENDOR'S ONGOING BOOKINGS ERROR:", err)
      );
  }
);

// FUNCTION: This function fetches a city
export const fetchCity = createAsyncThunk(
  "vendor/cities/getOne",
  async (payload) => {
    console.log("PAYLOAD:", payload);
    // Get user country
    const userCountry = await axios.get("https://ipapi.co/json");

    if (userCountry?.data?.country_name) {
      return fetch(
        `${process.env.REACT_APP_API_BASE_URL}/admin/cities/${payload?.cityId}?userCountry=${userCountry?.data?.country_name}`
      )
        .then((res) => res.json())
        .catch((err) => console.log("FETCH CITIES ERROR:", err));
    } else {
      toast.error(
        "Slow network detected. Please ensure you have internet access. Refresh page if this page does not load correctly."
      );
    }
  }
);

// FUNCTION: This function fetches all cities
export const fetchCities = createAsyncThunk(
  "user/cities/getAll",
  async (payload) => {
    console.log("PAYLOAD:", payload);
    // Get user country
    const userCountry = await axios.get("https://ipapi.co/json");

    if (userCountry?.data?.country_name) {
      return fetch(
        `${process.env.REACT_APP_API_BASE_URL}/cities?userCountry=${userCountry?.data?.country_name}`
      )
        .then((res) => res.json())
        .catch((err) => console.log("FETCH VEHICLE CLASSES ERROR:", err));
    } else {
      toast.error(
        "Slow network detected. Please ensure you have internet access. Refresh page if this page does not load correctly."
      );
    }
  }
);

// FUNCTION: This function creates a vendor driver
export const createVendorDriver = createAsyncThunk(
  "vendor/drivers/createOne",
  async (payload) => {
    console.log("payload.image:::", payload.image);

    // UPLOAD IMAGE TO CLOUDINARY FIRST
    const formData = new FormData();
    formData.append("file", payload.image);
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
        return fetch(`${process.env.REACT_APP_API_BASE_URL}/vendors/drivers`, {
          method: "POST",
          headers: {
            token: `Bearer ${JSON.parse(payload?.token)}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: data.secure_url,
            firstName: payload?.firstName,
            lastName: payload?.lastName,
            mobile: payload?.mobile,
            email: payload?.email,
            vendor: payload?.vendorId,
          }),
        })
          .then((res) => res.json())
          .catch((err) => console.log("CREATE VEHICLE CLASS ERROR:", err));
      } else {
        // Handle error
        console.error("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }
);

// FUNCTION: This function creates a vendor car / fleet
export const createVendorCar = createAsyncThunk(
  "vendor/fleet/createOne",
  async (payload) => {
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/vendors/fleet`, {
      method: "POST",
      headers: {
        token: `Bearer ${JSON.parse(payload?.token)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        carName: payload?.carName,
        carModel: payload?.carModel,
        carType: payload?.carType,
        carYear: payload?.carYear,
        carColor: payload?.carColor,
        carPlateNumber: payload?.carPlateNumber,
        vendor: payload?.vendor,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log("CREATE VENDOR CAR / FLEET ERROR:", err));
  }
);

// FUNCTION: This function fetches all vendor drivers
export const fetchVendorDrivers = createAsyncThunk(
  "vendor/drivers/getAll",
  async (payload) => {
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/vendors/drivers?vendorId=${payload?.vendorId}`,
      {
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("FETCH VENDOR DRIVERS ERROR:", err));
  }
);

// FUNCTION: This function fetches all vendor fleet
export const fetchVendorFleet = createAsyncThunk(
  "vendor/fleet/getAll",
  async (payload) => {
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/vendors/fleet?vendorId=${payload?.vendorId}`,
      {
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("FETCH VENDOR FLEET ERROR:", err));
  }
);

// FUNCTION: This function updates a vendor driver
export const updateVendorDriver = createAsyncThunk(
  "vendor/drivers/updateOne",
  async (payload) => {
    console.log("HELLO 5:", payload);

    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/vendors/drivers/${payload?.driverId}/${payload?.values?.vendor}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${JSON.parse(payload?.token)}`,
        },
        body: JSON.stringify(payload?.values),
      }
    )
      .then((res) => res.json())
      .catch((error) => {
        console.log("UPDATE VENDOR DRIVER ERROR:", error);
      });
  }
);

// FUNCTION: This function updates a vendor fleet
export const updateVendorFleet = createAsyncThunk(
  "vendor/fleet/updateOne",
  async (payload) => {
    console.log("HELLO 5:", payload?.values);
    console.log("HELLO 6:", payload);

    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/vendors/fleet/update/${payload?.fleetId}/${payload?.values?.vendor}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${JSON.parse(payload?.token)}`,
        },
        body: JSON.stringify(payload?.values),
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("UPDATE VENDOR FLEET ERROR:", err));
  }
);

// FUNCTION: This function deletes a vendor driver
export const deleteVendorDriver = createAsyncThunk(
  "vendor/drivers/deleteOne",
  async (payload) => {
    console.log("HELLO 5:", payload);

    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/vendors/drivers/${payload?.values?.vendor}/${payload?.driverId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${JSON.parse(payload?.token)}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((error) => {
        console.log("DELETE VENDOR DRIVER ERROR:", error);
      });
  }
);

// FUNCTION: This function deletes a vendor fleet
export const deleteVendorFleet = createAsyncThunk(
  "vendor/fleet/deleteOne",
  async (payload) => {
    console.log("HELLO 5:", payload);

    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/vendors/fleet/${payload?.vendorId}/${payload?.fleetId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${JSON.parse(payload?.token)}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((error) => {
        console.log("DELETE VENDOR FLEET ERROR:", error);
      });
  }
);

export const vendorSlice = createSlice({
  name: "vendor",
  initialState: {
    vendor: null,
    token: "",
    isLoading: false,
    message: "",
    requestStatus: null,

    // The following states are for the vendor statistics / overview page
    numberOfBookings: null,
    upcomingBookings: null,
    assignedBookings: null,
    ongoingBookings: null,
    completedBookings: null,

    // This state tracks when the vendor has been created, in order to redirect to the verification page
    hasSignedUp: false,
    hasVerifiedPhone: false,

    // These states handle the vendor OTP verification states on the vendor account page
    hasClickedSendCode: false,
    isResendOtpLoading: false,
    hasResetPassword: false,

    // These states handle the vendor bookings
    isGetBookingByReferenceLoading: null,
    bookingFetchedByReference: null,

    // These states handle vendor earnings
    expectedEarnings: null,
    earnings: null,

    // Vendor sign up states
    cities: null,

    // Vendor drivers
    vendorDrivers: null,

    // Vendor cars / fleet
    vendorFleet: null,
  },
  reducers: {
    setVendor: (state, action) => {
      // This action sets an vendor
      console.log("ACTION.PAYLOAD:", action.payload);
      state.vendor = action.payload;
    },
    setVendorToken: (state, action) => {
      // This action sets an vendor token
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
    logoutVendor: (state, action) => {
      // This action logs in a vendor
    },
  },

  extraReducers: (builder) => {
    // loginVendor AsyncThunk states
    builder
      .addCase(signupVendor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signupVendor.fulfilled, (state, action) => {
        if (action.payload?.status == 201) {
          toast.success(action.payload?.message);
        } else {
          toast.error(action.payload?.message);
        }
        state.vendor = action.payload?.vendor;
        state.token = action.payload?.token;
        state.hasSignedUp = true;

        console.log("VENDOR:", action.payload?.vendor);
        // save token to the localstorage
        localStorage.setItem(
          "vendorToken",
          JSON.stringify(action.payload?.token)
        );
        localStorage.setItem("vendor", JSON.stringify(action.payload?.vendor));
        state.isLoading = false;
        state.message = action.payload?.message;
      })
      .addCase(signupVendor.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Statistics AsyncThunk states
      .addCase(loginVendor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginVendor.fulfilled, (state, action) => {
        if (action.payload?.status == 200) {
          toast.success(action.payload?.message);
        } else {
          toast.error(action.payload?.message);
        }
        console.log("PAYLOAD VENDOR LOGIN:", action.payload);
        console.log("VENDOR:", action.payload?.vendor);
        state.message = action.payload?.message;
        state.requestStatus = action.payload?.status;
        state.token = action.payload?.token;
        state.vendor = action.payload?.vendor;
        // save token to the localstorage
        localStorage.setItem(
          "vendorToken",
          JSON.stringify(action.payload?.token)
        );
        localStorage.setItem("vendor", JSON.stringify(action.payload?.vendor));
        state.isLoading = false;
      })
      .addCase(loginVendor.rejected, (state) => {
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
        state.vendors = action.payload?.vendors;
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
          state.vendor = { ...action.payload?.user };
          state.token = JSON.stringify(action.payload?.token);
          // save token to the localstorage
          localStorage.setItem(
            "vendorToken",
            JSON.stringify(action.payload?.token)
          );
          localStorage.setItem("vendor", JSON.stringify(action.payload?.user));
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
      }) // updateVendor AsyncThunk states
      .addCase(updateVendor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateVendor.fulfilled, (state, action) => {
        console.log("VERIFICATION ACTION.PAYLOAD", action.payload);
        state.message = action.payload?.message;
        state.isLoading = false;

        if (action.payload?.status == 201) {
          state.vendor = { ...action.payload?.vendor };
          state.token = JSON.stringify(action.payload?.token);
          // save token to the localstorage
          localStorage.setItem(
            "vendorToken",
            JSON.stringify(action.payload?.token)
          );
          localStorage.setItem(
            "vendor",
            JSON.stringify(action.payload?.vendor)
          );
          toast.success(action.payload?.message);
        } else {
          toast.error(action.payload?.message);
        }
      })
      .addCase(updateVendor.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // resetVendorPassword AsyncThunk states
      .addCase(resetVendorPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetVendorPassword.fulfilled, (state, action) => {
        console.log("RESET VENDOR PASSWORD ACTION.PAYLOAD", action.payload);
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
      .addCase(resetVendorPassword.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // fetchVendorAssignedJobs AsyncThunk states
      .addCase(fetchVendorAssignedJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchVendorAssignedJobs.fulfilled, (state, action) => {
        console.log(
          "FETCH VENDOR'S ASSIGNED JOBS ACTION.PAYLOAD",
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
      .addCase(fetchVendorAssignedJobs.rejected, (state) => {
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
      }) // fetchVendorEarnings AsyncThunk states
      .addCase(fetchVendorEarnings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchVendorEarnings.fulfilled, (state, action) => {
        console.log("FETCH VENDOR EARNINGS ACTION.PAYLOAD", action.payload);
        state.message = action.payload?.message;
        state.isLoading = false;
        if (action.payload?.status == 200) {
          state.earnings = action.payload?.earnings;
          state.expectedEarnings = action.payload?.expectedEarnings;
        } else {
          toast.error(action.payload?.message);
        }
      })
      .addCase(fetchVendorEarnings.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // fetchUpcomingJobs AsyncThunk states
      .addCase(fetchUpcomingJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUpcomingJobs.fulfilled, (state, action) => {
        console.log(
          "FETCH VENDOR'S UPCOMING JOBS ACTION.PAYLOAD",
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
          "FETCH VENDOR'S ONGOING JOBS ACTION.PAYLOAD",
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
          "FETCH VENDOR'S UPCOMING JOBS ACTION.PAYLOAD",
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
      }) // Fetch City AsyncThunk states
      .addCase(fetchCity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCity.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD", action.payload);
        state.currentCity = action.payload?.city;
        state.vehicleClasses = action.payload?.city?.vehicleClasses;
        state.isLoading = false;
      })
      .addCase(fetchCity.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      })
      .addCase(fetchCities.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        console.log("CITIES OVER HERE:", action.payload);
        state.isLoading = false;
        state.cities = action.payload?.cities;
        state.userCurrency = action.payload?.currency;
      })
      .addCase(fetchCities.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // createVendorDriver AsyncThunk states
      .addCase(createVendorDriver.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createVendorDriver.fulfilled, (state, action) => {
        console.log("CREATE VENDOR DRIVER ACTION.PAYLOAD", action.payload);
        if (action.payload?.status == 201) {
          state.vendorDrivers = action.payload?.vendorDrivers;
          toast.success(action.payload?.message);
          state.isLoading = false;
        } else {
          toast.error(action.payload?.message);
          state.isLoading = false;
        }
      })
      .addCase(createVendorDriver.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // createVendorCar AsyncThunk states
      .addCase(createVendorCar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createVendorCar.fulfilled, (state, action) => {
        console.log("CREATE VENDOR CAR ACTION.PAYLOAD", action.payload);
        if (action.payload?.status == 201) {
          state.vendorFleet = action.payload?.vendorFleet;
          toast.success(action.payload?.message);
          state.isLoading = false;
        } else {
          toast.error(action.payload?.message);
          state.isLoading = false;
        }
      })
      .addCase(createVendorCar.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // fetchVendorDrivers AsyncThunk states
      .addCase(fetchVendorDrivers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchVendorDrivers.fulfilled, (state, action) => {
        console.log("FETCH VENDOR DRIVERS ACTION.PAYLOAD", action.payload);
        state.vendorDrivers = action.payload?.vendorDrivers;
        state.isLoading = false;
      })
      .addCase(fetchVendorDrivers.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // fetchVendorFleet AsyncThunk states
      .addCase(fetchVendorFleet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchVendorFleet.fulfilled, (state, action) => {
        console.log("FETCH VENDOR FLEET ACTION.PAYLOAD", action.payload);
        state.vendorFleet = action.payload?.vendorFleet;
        state.isLoading = false;
      })
      .addCase(fetchVendorFleet.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // updateVendorFleet AsyncThunk states
      .addCase(updateVendorFleet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateVendorFleet.fulfilled, (state, action) => {
        console.log("FETCH VENDOR FLEET ACTION.PAYLOAD", action.payload);
        if (action.payload?.status == 201) {
          state.vendorFleet = action.payload?.vendorFleet;
          toast.success(action.payload?.message);
        } else {
          toast.error(action.payload?.message);
        }
        state.isLoading = false;
      })
      .addCase(updateVendorFleet.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // deleteVendorFleet AsyncThunk states
      .addCase(deleteVendorFleet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteVendorFleet.fulfilled, (state, action) => {
        console.log("DELETE VENDOR FLEET ACTION.PAYLOAD", action.payload);
        if (action.payload?.status == 201) {
          state.vendorFleet = action.payload?.vendorFleet;
          toast.success(action.payload?.message);
        } else {
          toast.error(action.payload?.message);
        }
        state.isLoading = false;
      })
      .addCase(deleteVendorFleet.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // updateVendorDriver AsyncThunk states
      .addCase(updateVendorDriver.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateVendorDriver.fulfilled, (state, action) => {
        console.log("UPDATE VENDOR DRIVER ACTION.PAYLOAD", action.payload);
        if (action.payload?.status == 201) {
          state.vendorDrivers = action.payload?.vendorDrivers;
          toast.success(action.payload?.message);
        } else {
          toast.error(action.payload?.message);
        }
        state.isLoading = false;
      })
      .addCase(updateVendorDriver.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // deleteVendorDriver AsyncThunk states
      .addCase(deleteVendorDriver.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteVendorDriver.fulfilled, (state, action) => {
        console.log("DELETE VENDOR DRIVER ACTION.PAYLOAD", action.payload);
        if (action.payload?.status == 201) {
          state.vendorDrivers = action.payload?.vendorDrivers;
          toast.success(action.payload?.message);
        } else {
          toast.error(action.payload?.message);
        }
        state.isLoading = false;
      })
      .addCase(deleteVendorDriver.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      });
  },
});

export const {
  setVendor,
  setVendorToken,
  resetMessage,
  setCurrentCurrency,
  setHasClickedSendCode,
  resetHasVerifiedPhone,
} = vendorSlice.actions;
export default vendorSlice.reducer;
