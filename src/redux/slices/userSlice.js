// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// FUNCTION: This function fetches all cities
export const fetchCities = createAsyncThunk(
  "user/cities/getAll",
  async (payload) => {
    console.log("PAYLOAD:", payload);
    // Get user country
    const userCountry = await axios.get("https://ipapi.co/json");

    console.log("USER COUNTRY:", userCountry);

    if (userCountry?.data?.country_name) {
      console.log("HELLO BEFORE API CALL");
      return axios
        .get(
          `${process.env.REACT_APP_API_BASE_URL}/cities?userCountry=${userCountry?.data?.country_name}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => res.data)
        .catch((error) => console.log("FETCH CITIES ERROR:", error));
      //   return fetch(
      //     `${process.env.REACT_APP_API_BASE_URL}/cities?userCountry=${userCountry?.data?.country_name}`
      //   )
      //     .then((res) => res.json())
      //     .catch((err) => console.log("FETCH CITIES ERROR:", err));
    } else {
      toast.error(
        "Slow network detected. Please ensure you have internet access. Refresh page if this page does not load correctly."
      );
    }
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
        `${process.env.REACT_APP_API_BASE_URL}/vehicle-classes?userCountry=${userCountry?.data?.country_name}`
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
        `${process.env.REACT_APP_API_BASE_URL}/cars?userCountry=${userCountry?.data?.country_name}`
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
      `${process.env.REACT_APP_API_BASE_URL}/passes?userCountry=${userCountry?.data?.country_name}`
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

    // Get user country
    const userCountry = await axios.get("https://ipapi.co/json");

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
              city: payload?.city,
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
              city: payload?.city,
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
            city: payload?.city,
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
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/booking/calculate-total?userCountry=${userCountry.data?.country_name}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("CALCULATE BOOKING TOTAL ERROR:", err));
  }
);

// FUNCTION: This function fetches all visa on arrival rates
export const fetchVisaOnArrivalRates = createAsyncThunk(
  "user/voaRates/getAll",
  async (payload) => {
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/users/voaRatesWithNigerianVisa`
    )
      .then((res) => res.json())
      .catch((err) => console.log("FETCH VOA RATES ERROR:", err));
  }
);

// FUNCTION: This function fetches all visa on arrival rates
export const createBooking = createAsyncThunk(
  "user/bookings/createOne",
  async (payload) => {
    console.log("VALUES:", payload);
    let values;

    switch (payload?.bookingType) {
      case "Airport":
        values = {
          bookingType: payload?.bookingType,
          title: payload?.bookingDetails?.title?.value,
          firstName: payload?.bookingDetails?.fullName?.split(" ")[0],
          lastName: payload?.bookingDetails?.fullName?.split(" ")[1],
          email: payload?.bookingDetails?.email,
          mobile: payload?.bookingDetails?.mobile,
          bookingCurrency: payload?.bookingDetails?.bookingCurrency?._id,
          bookingTotal: payload?.bookingDetails?.bookingTotal,
          isRoundTrip: payload?.bookingDetails?.isRoundTrip,
          passengers: payload?.bookingDetails?.passengers,
          airline: payload?.bookingDetails?.airline,
          flightNumber: payload?.bookingDetails?.flightNumber,
          vehicleClass: payload?.bookingDetails?.vehicleClass?._id,
          city: payload?.bookingDetails?.selectedCity?.cityName,
          pickupAddress: payload?.bookingDetails?.pickupLocation,
          pickupCoordinates: payload?.bookingDetails?.pickupCoordinates,
          pickupDate: payload?.bookingDetails?.pickupDate,
          pickupTime: payload?.bookingDetails?.pickupTime,
          dropoffAddress: payload?.bookingDetails?.dropoffLocation,
          dropoffCoordinates: payload?.bookingDetails?.dropoffCoordinates,
          returnDate: payload?.bookingDetails?.returnDate ?? null,
          returnTime: payload?.bookingDetails?.returnTime ?? null,
          hasPriorityPass: payload?.bookingDetails?.hasPriorityPass,
          passType: payload?.bookingDetails?.passType?.value ?? null,
          priorityPassCount: payload?.bookingDetails?.numberOfPasses ?? null,
        };
        break;
      case "Car":
        console.log("I AM IN CAR:", payload?.bookingDetails?.carSelected);
        values = {
          bookingType: payload?.bookingType,
          title: payload?.bookingDetails?.title?.value,
          firstName: payload?.bookingDetails?.fullName?.split(" ")[0],
          lastName: payload?.bookingDetails?.fullName?.split(" ")[1],
          email: payload?.bookingDetails?.email,
          mobile: payload?.bookingDetails?.mobile,
          bookingCurrency: payload?.bookingDetails?.bookingCurrency?._id,
          bookingTotal: payload?.bookingDetails?.bookingTotal,
          pickupAddress: payload?.bookingDetails?.pickupAddress,
          pickupCoordinates: payload?.bookingDetails?.pickupCoordinates,
          pickupDate: payload?.bookingDetails?.pickupDate,
          pickupTime: payload?.bookingDetails?.pickupTime,
          days: payload?.bookingDetails?.days,
          carSelected: payload?.bookingDetails?.carSelected?.value?._id,
          citySelected: payload?.bookingDetails?.citySelected?.cityName,
        };
        break;
      case "Priority":
        console.log("BOOKING VALUES:", payload);
        values = {
          bookingType: payload?.bookingType,
          title: payload?.bookingDetails?.title?.value,
          firstName: payload?.bookingDetails?.fullName?.split(" ")[0],
          lastName: payload?.bookingDetails?.fullName?.split(" ")[1],
          email: payload?.bookingDetails?.email,
          mobile: payload?.bookingDetails?.mobile,
          airline: payload?.bookingDetails?.airline,
          flightNumber: payload?.bookingDetails?.flightNumber,
          bookingCurrency: payload?.bookingDetails?.bookingCurrency?._id,
          bookingTotal: payload?.bookingDetails?.bookingTotal,
          pickupLocation: payload?.bookingDetails?.pickupLocation,
          pickupCoordinates: payload?.bookingDetails?.pickupCoordinates,
          pickupDate: payload?.bookingDetails?.pickupDate,
          pickupTime: payload?.bookingDetails?.pickupTime,
          passengers: payload?.bookingDetails?.passengers,
          selectedProtocol: payload?.bookingDetails?.protocolSelected?.value,
          passSelected: payload?.bookingDetails?.passSelected?.value?._id,
          citySelected: payload?.bookingDetails?.citySelected?.value,
        };
        break;
      case "Visa":
        values = {
          bookingType: "Visa",
          visaClass: payload?.bookingDetails?.visaClass?.value,
          passportType: payload?.bookingDetails?.passportType?.value,
          nationality: payload?.bookingDetails?.nationality?.value,
          title: payload?.bookingDetails?.title?.value,
          surname: payload?.bookingDetails?.surname,
          firstName: payload?.bookingDetails?.firstName,
          middleName: payload?.bookingDetails?.middleName,
          email: payload?.bookingDetails?.email,
          dateOfBirth: payload?.bookingDetails?.dateOfBirth,
          placeOfBirth: payload?.bookingDetails?.placeOfBirth,
          gender: payload?.bookingDetails?.gender?.value,
          maritalStatus: payload?.bookingDetails?.maritalStatus?.value,
          passportNumber: payload?.bookingDetails?.passportNumber,
          passportExpiryDate: payload?.bookingDetails?.passportExpiryDate,
          purposeOfJourney: payload?.bookingDetails?.purposeOfJourney,
          airline: payload?.bookingDetails?.airline,
          flightNumber: payload?.bookingDetails?.flightNumber,
          countryOfDeparture:
            payload?.bookingDetails?.countryOfDeparture?.label,
          arrivalDate: payload?.bookingDetails?.arrivalDate,
          portOfEntry: payload?.bookingDetails?.portOfEntry,
          durationOfStay: payload?.bookingDetails?.durationOfStay,
          contactName: payload?.bookingDetails?.contactName,
          contactNumber: payload?.bookingDetails?.contactNumber,
          contactAddress: payload?.bookingDetails?.contactAddress,
          contactCity: payload?.bookingDetails?.contactCity,
          contactState: payload?.bookingDetails?.contactState,
          contactEmail: payload?.bookingDetails?.contactEmail,
          contactPostalCode: payload?.bookingDetails?.contactPostalCode,
          bookingCurrency: payload?.bookingDetails?.bookingCurrency?._id,
          bookingTotal: payload?.bookingDetails?.bookingTotal,
        };
        break;
      default:
        toast.error("Invalid booking type detected!");
        return;
        break;
    }

    console.log("VALS:", values);

    return fetch(`${process.env.REACT_APP_API_BASE_URL}/booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .catch((err) => console.log("CREATE BOOKING ERROR:", err));
  }
);

// FUNCTION: Fetch all blog posts
export const fetchAllBlogPosts = createAsyncThunk(
  "user/blog/getPosts",
  async () => {
    console.log("HI");
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/blog-posts`, {})
      .then((res) => res.json())
      .catch((err) => console.log("FETCH BLOG POSTS ERROR:", err));
  }
);

// FUNCTION: Fetch a blog post
export const fetchBlogPost = createAsyncThunk(
  "user/blog/getOne",
  async (slug) => {
    console.log("HI");
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/blog-posts/${slug}`, {})
      .then((res) => res.json())
      .catch((err) => console.log("FETCH BLOG POST ERROR:", err));
  }
);

// FUNCTION: Fetch a booking by its booking reference
export const fetchBookingByReference = createAsyncThunk(
  "user/booking/getOneByReference",
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

// FUNCTION: Send Enquiry Email
export const sendEnquiryEmail = createAsyncThunk(
  "user/enquiries/sendMessage",
  async (payload) => {
    console.log("HI");
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/users/enquiries/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: payload?.fullName,
          email: payload?.email,
          message: payload?.message,
        }),
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("SEND ENQUIRY EMAIL ERROR:", err));
  }
);

// FUNCTION: This function creates a stripe payment intent
export const createStripePaymentIntent = createAsyncThunk(
  "user/cities/getOne",
  async (payload) => {
    console.log("PAYLOAD:", payload);
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/stripe/create-intent`)
      .then((res) => res.json())
      .catch((err) => console.log("CREATE STRIPE PAYMENT INTENT ERROR:", err));
  }
);

// FUNCTION: This function fetches a city
export const fetchCity = createAsyncThunk(
  "user/cities/getOne",
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

// FUNCTION: This function creates a payment (Shuttlelane Payment)
export const createShuttlelanePayment = createAsyncThunk(
  "user/payments/createOne",
  async (payload) => {
    console.log("PAYLOAD:", payload);
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/users/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .catch((err) =>
        console.log("CREATE SHUTTLELANE PAYMENT INTENT ERROR:", err)
      );
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
    currentCity: null,
    cities: null,
    // These states holds the booking details from the homepage so as to avoid url injection
    bookingType: "",
    bookingDetails: null,

    // This state holds the just created booking (Primarily used in payment ids)
    justCreatedBooking: null,

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
    // Visa on arrival states
    voaRates: null,
    // Visa on arrival fees per country
    currentVisaFee: 0,
    currentTransactionFee: 0,
    currentProcessingFee: 0,
    currentBiometricFee: 0,
    currentVatFee: 0,

    // This state holds the 'booking creation' status code
    createBookingStatusCode: null,

    // This state handles blog posts
    blogPosts: null,
    currentBlogPost: null,

    // This state handles the "track booking" page
    bookingFetchedByReference: null,

    // Google maps api states
    googleMaps: {
      apiKey: "", // Initial API key
      libraries: [], // Initial libraries
    },

    // These states are for the payment status page
    bookingId: null,
    paymentStatus: "",
    paymentGateway: "",
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

    setGoogleMapsApiKey: (state, action) => {
      state.googleMaps.apiKey = action.payload;
    },
    setGoogleMapsLibraries: (state, action) => {
      state.googleMaps.libraries = action.payload;
    },

    // THESE REDUCERS ARE FOR THE PAYMENT STATUS PAGE
    // OPTED FOR REDUX STATES INSTEAD OF URL SEARCH PARAMS FOR SECURITY PURPOSES
    setPaymentStatus: (state, action) => {
      state.paymentStatus = action.payload;
    },
    setBookingId: (state, action) => {
      state.bookingId = action.payload;
    },
    setPaymentGateway: (state, action) => {
      state.paymentGateway = action.payload;
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
        state.userCurrency = action.payload?.currency;
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
        state.currentVisaFee = action.payload?.visaFee;
        state.currentTransactionFee = action.payload?.transactionFee;
        state.currentProcessingFee = action.payload?.processingFee;
        state.currentBiometricFee = action.payload?.biometricFee;
        state.currentVatFee = action.payload?.vat;
      })
      .addCase(calculateTotal.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
        toast.error("Failed to update booking");
      }) // fetchVisaOnArrivalRates AsyncThunk states
      .addCase(fetchVisaOnArrivalRates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchVisaOnArrivalRates.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD", action.payload);
        state.isLoading = false;
        state.voaRates = action.payload?.visaOnArrivalRates;
      })
      .addCase(fetchVisaOnArrivalRates.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // createBooking AsyncThunk states
      .addCase(createBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD", action.payload);
        state.isLoading = false;
        if (action.payload?.status == 201) {
          state.justCreatedBooking = action.payload?.booking;
          state.createBookingStatusCode = action.payload?.status;
          toast.success(
            "Booking successfully created, redirecting to your chosen payment portal"
          );
        } else {
          state.createBookingStatusCode = action.payload?.status;
          toast.error("Failed to create booking. Please try again.");
        }
        // state.voaRates = action.payload?.visaOnArrivalRates;
      })
      .addCase(createBooking.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // fetchAllBlogPosts AsyncThunk states
      .addCase(fetchAllBlogPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllBlogPosts.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD BLOG POSTS", action.payload);
        state.isLoading = false;
        state.blogPosts = action.payload?.blogPosts;
      })
      .addCase(fetchAllBlogPosts.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // fetchBlogPost AsyncThunk states
      .addCase(fetchBlogPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBlogPost.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD BLOG POSTS", action.payload);
        state.isLoading = false;
        state.currentBlogPost = action.payload?.blogPost;
      })
      .addCase(fetchBlogPost.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // fetchBookingByReference AsyncThunk states
      .addCase(fetchBookingByReference.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBookingByReference.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD GET BOOKING BY REFERENCE", action.payload);
        state.isLoading = false;
        if (action.payload?.status == 200) {
          state.bookingFetchedByReference = action.payload?.booking;
          toast.success(action.payload?.message);
        } else {
          toast.error(action.payload?.message);
        }
      })
      .addCase(fetchBookingByReference.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // sendEnquiryEmail AsyncThunk states
      .addCase(sendEnquiryEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendEnquiryEmail.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD SEND ENQUIRY EMAIL", action.payload);
        state.isLoading = false;
        if (action.payload?.status == 200) {
          toast.success(action.payload?.message);
        } else {
          toast.error(action.payload?.message);
        }
      })
      .addCase(sendEnquiryEmail.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Fetch City AsyncThunk states
      .addCase(fetchCity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCity.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD FETCH CITY", action.payload);
        state.currentCity = action.payload?.city;
        state.vehicleClasses = action.payload?.city?.vehicleClasses;
        state.isLoading = false;
      })
      .addCase(fetchCity.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Create Shuttlelane Payment AsyncThunk states
      .addCase(createShuttlelanePayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createShuttlelanePayment.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD", action.payload);
        state.isLoading = false;
      })
      .addCase(createShuttlelanePayment.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      });
  },
});

export const {
  setBookingDetails,
  calculateBookingTotal,
  setGoogleMapsApiKey,
  setGoogleMapsLibraries,
  setBookingId,
  setPaymentStatus,
  setPaymentGateway,
} = userSlice.actions;
export default userSlice.reducer;
