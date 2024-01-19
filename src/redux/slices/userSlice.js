// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// FUNCTION: This function fetches all cities
export const fetchCities = createAsyncThunk(
  "user/cities/getAll",
  async (payload) => {
    console.log("PAYLOAD:", payload);
    return fetch(`http://localhost:3001/api/v1/cities`)
      .then((res) => res.json())
      .catch((err) => console.log("FETCH CITIES ERROR:", err));
  }
);

// FUNCTION: This function fetches all vehicle clsses
export const fetchVehicleClasses = createAsyncThunk(
  "user/vehicleClasses/getAll",
  async (payload) => {
    console.log("PAYLOAD:", payload);
    // Get user country
    const userCountry = await axios.get("https://ipapi.co/json");

    if (userCountry?.data?.country_name) {
      return fetch(
        `http://localhost:3001/api/v1/vehicle-classes?userCountry=${userCountry?.data?.country_name}`
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

// FUNCTION: This function fetches all vehicle clsses
export const fetchCars = createAsyncThunk(
  "user/cars/getAll",
  async (payload) => {
    console.log("PAYLOAD:", payload);
    // Get user country
    const userCountry = await axios.get("https://ipapi.co/json");

    if (userCountry?.data?.country_name) {
      return fetch(
        `http://localhost:3001/api/v1/cars?userCountry=${userCountry?.data?.country_name}`
      )
        .then((res) => res.json())
        .catch((err) => console.log("FETCH CARS ERROR:", err));
    } else {
      toast.error(
        "Slow network detected. Please ensure you have internet access. Refresh page if this page does not load correctly."
      );
    }
  }
);

// FUNCTION: This function fetches all pass types
export const fetchPasses = createAsyncThunk(
  "user/passes/getAll",
  async (payload) => {
    console.log("PAYLOAD:", payload);
    // Get user country
    const userCountry = await axios
      .get("https://ipapi.co/json")
      .catch((err) => {
        toast.error(
          "Slow network detected. Please ensure you have internet access. Refresh page if this page does not load correctly."
        );
      });

    return fetch(
      `http://localhost:3001/api/v1/passes?userCountry=${userCountry?.data?.country_name}`
    )
      .then((res) => res.json())
      .catch((err) => console.log("FETCH PASS TYPES ERROR:", err));
  }
);

// FUNCTION: This function calculates the total for a booking
export const calculateTotal = createAsyncThunk(
  "user/calculateBookingTotal",
  async (payload) => {
    let sum, data;

    console.log("PAYLOAD.BOOKINGTYPE:", payload?.bookingType);

    switch (payload?.bookingType) {
      case "Airport":
        sum = Number(payload?.bookingDetails?.vehicleClass?.baseRate);
        console.log("HELLO FROM THIS FUNCTION:", payload?.isAddPriorityPass);

        if (!payload?.isAddPriorityPass) {
          data = {
            bookingDetails: {
              bookingType: payload?.bookingType,
              currentVehicleClass: payload?.currentVehicleClass,
              pickupLocation: payload?.pickupLocation,
              dropoffLocation: payload?.dropoffLocation,
            },
            userCurrency: payload?.userCurrency,
          };
          console.log("HELLO FALSE:", data);
        } else {
          console.log("HELLO TRUE");
          data = {
            bookingDetails: {
              bookingType: payload?.bookingType,
              currentVehicleClass: payload?.currentVehicleClass,
              pickupLocation: payload?.pickupLocation,
              dropoffLocation: payload?.dropoffLocation,
              isAddPriorityPass: payload?.isAddPriorityPass ?? false,
              numberOfPasses: payload?.numberOfPasses,
              passType: payload?.passType,
            },
            userCurrency: payload?.userCurrency,
          };
        }
        break;

      case "Car":
        console.log("HELLO WORLD ITS A CAR BOOKING:", payload);
        data = {
          bookingDetails: {
            bookingType: payload?.bookingType,
            days: payload?.days,
            carSelected: payload?.carSelected,
          },
          userCurrency: payload?.userCurrency,
        };
        break;

      case "Priority":
        console.log("HELLO WORLD ITS A PRIORITY BOOKING:", payload);
        data = {
          bookingDetails: {
            bookingType: payload?.bookingType,
            passengers: payload?.passengers,
            passSelected: payload?.passSelected,
          },
          userCurrency: payload?.userCurrency,
        };
        break;

      case "Visa":
        console.log("HELLO WORLD ITS A VISA ON ARRIVAL BOOKING:", payload);
        data = {
          bookingDetails: {
            bookingType: payload?.bookingType,
            country: payload?.country,
          },
          userCurrency: payload?.userCurrency,
        };
        break;
      default:
        break;
    }

    console.log("sending data");
    return fetch(`http://localhost:3001/api/v1/booking/calculate-total`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((err) => console.log("CALCULATE BOOKING TOTAL ERROR:", err));
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: "",
    isLoading: false,
    message: "",
    requestStatus: null,

    // The following states are for the user statistics / overview page
    numberOfBookings: null,
    upcomingBookings: null,

    // These states are for the booking forms on the homepage
    cities: null,
    // These states holds the booking details from the homepage so as to avoid url injection
    bookingType: "",
    bookingDetails: null,

    // This state holds the user's base currency based on the location
    userCurrency: null,

    // This state is for vehicle classes on shuttlelane
    vehicleClasses: null,

    // This state is for cars on shuttlelane
    cars: null,

    // This state holds the passes on shuttlelane i.e Priority pass types
    passes: null,

    // This state holds the booking states
    totalInNaira: null,
    bookingTotal: 0,
    bookingDistance: "",
    tripDuration: "",

    // Visa on arrival (Homepage) states
    voaVerificationStatus: "",
    voaVerificationMessage: "",
  },
  reducers: {
    setBookingDetails: (state, action) => {
      // This action sets the bookingDetails
      console.log("ACTION.PAYLOAD:", action.payload);
      state.bookingType = action.payload?.bookingType;
      state.bookingDetails = action.payload?.bookingDetails;
      if (action.payload?.alertUser) {
        toast.success("Booking updated successfully");
      }
    },

    calculateBookingTotal: (state, action) => {
      let sum = Number(action.payload?.currentVehicleClass?.basePrice);
      console.log("SUM:", sum);
      console.log("VEHICLE CLASS:", action.payload);
      state.totalInNaira = Number(sum);
    },
  },

  extraReducers: (builder) => {
    // fetchCities AsyncThunk states
    builder
      .addCase(fetchCities.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        console.log("CITIES OVER HERE:", action.payload);
        state.isLoading = false;
        state.cities = action.payload?.cities;
      })
      .addCase(fetchCities.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // fetchVehicleClasses AsyncThunk states
      .addCase(fetchVehicleClasses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchVehicleClasses.fulfilled, (state, action) => {
        console.log("FETCHED VEHICLE CLASSES:", action.payload?.vehicleClasses);
        state.isLoading = false;
        state.vehicleClasses = action.payload?.vehicleClasses;
        state.userCurrency = action.payload?.currency;
      })
      .addCase(fetchVehicleClasses.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // fetchCars AsyncThunk states
      .addCase(fetchCars.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        console.log("FETCHED CARS:", action.payload?.cars);
        console.log("FETCHED CURRENCY:", action.payload?.currency);
        state.isLoading = false;
        state.cars = action.payload?.cars;
        state.userCurrency = action.payload?.currency;
      })
      .addCase(fetchCars.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // fetchPasses AsyncThunk states
      .addCase(fetchPasses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPasses.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD", action.payload);
        state.isLoading = false;
        state.passes = action.payload?.passes;
        state.userCurrency = action.payload?.currency;
      })
      .addCase(fetchPasses.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // calculateTotal AsyncThunk states
      .addCase(calculateTotal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(calculateTotal.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD", action.payload);
        state.isLoading = false;
        state.bookingTotal = action.payload?.total;
        state.userCurrency = action.payload?.userCurrency;
        state.bookingDistance = action.payload?.distance;
        state.tripDuration = action.payload?.duration;

        // For visa on arrival (Homepage)
        state.voaVerificationStatus = action.payload?.voaVerificationStatus;
        state.voaVerificationMessage = action.payload?.message;
      })
      .addCase(calculateTotal.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
        toast.error("Failed to update booking");
      });
  },
});

export const { setBookingDetails, calculateBookingTotal } = userSlice.actions;
export default userSlice.reducer;
