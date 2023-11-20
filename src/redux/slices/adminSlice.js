// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// FUNCTION: This function handles admin login
export const loginAdmin = createAsyncThunk(
  "admin/loginAdmin",
  async (payload) => {
    return fetch(`http://localhost:3001/api/v1/auth/admin/login`, {
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

// FUNCTION: This function fetches the admin statistics
export const fetchStatistics = createAsyncThunk(
  "admin/statistics",
  async (token) => {
    console.log("TOKEN FROM FETCH::", token);
    const adminToken = localStorage.getItem("adminToken");
    return fetch(`http://localhost:3001/api/v1/admin/statistics`, {
      headers: {
        token: `Bearer ${JSON.parse(token)}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log("FETCH STATS ERROR:", err));
  }
);

// FUNCTION: This function creates a new city
export const createCity = createAsyncThunk(
  "admin/cities/create",
  async (payload) => {
    return fetch(`http://localhost:3001/api/v1/admin/cities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${JSON.parse(payload?.token)}`,
      },
      body: JSON.stringify({
        cityName: payload?.cityName,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log("CREATE CITY ERROR:", err));
  }
);

// FUNCTION: This function fetches all cities
export const fetchCities = createAsyncThunk(
  "admin/cities/getAll",
  async (token) => {
    return fetch(`http://localhost:3001/api/v1/admin/cities`, {
      headers: {
        token: `Bearer ${JSON.parse(token)}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log("FETCH CITIES ERROR:", err));
  }
);

// FUNCTION: This function adds an airport to a city
export const addAirportToCity = createAsyncThunk(
  "admin/cities/addAirport",
  async (payload) => {
    return fetch(`http://localhost:3001/api/v1/admin/cities/add-airport`, {
      method: "POST",
      headers: {
        token: `Bearer ${JSON.parse(payload?.token)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cityId: payload?.cityId,
        airport: payload?.airport,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log("ADD AIRPORT TO CITY ERROR:", err));
  }
);

// FUNCTION: This function fetches a city
export const fetchCity = createAsyncThunk(
  "admin/cities/getOne",
  async (payload) => {
    return fetch(
      `http://localhost:3001/api/v1/admin/cities/${payload?.cityId}`,
      {
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("FETCH CITIES ERROR:", err));
  }
);

// FUNCTION: This function fetches users
export const fetchUsers = createAsyncThunk(
  "admin/users/getAll",
  async (token) => {
    return fetch(`http://localhost:3001/api/v1/admin/users`, {
      headers: {
        token: `Bearer ${JSON.parse(token)}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log("FETCH USERS ERROR:", err));
  }
);

// FUNCTION: This function deletes a user by Id
export const deleteUserById = createAsyncThunk(
  "admin/users/deleteOne",
  async (payload) => {
    return fetch(
      `http://localhost:3001/api/v1/admin/users/delete/${payload?.userId}`,
      {
        method: "DELETE",
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("DELETE USER ERROR:", err));
  }
);

// FUNCTION: This function fetches drivers
export const fetchDrivers = createAsyncThunk(
  "admin/drivers/getAll",
  async (token) => {
    return fetch(`http://localhost:3001/api/v1/admin/drivers`, {
      headers: {
        token: `Bearer ${JSON.parse(token)}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log("FETCH DRIVERS ERROR:", err));
  }
);

// FUNCTION: This function deletes a driver by Id
export const deleteDriverById = createAsyncThunk(
  "admin/drivers/deleteOne",
  async (payload) => {
    return fetch(
      `http://localhost:3001/api/v1/admin/drivers/delete/${payload?.driverId}`,
      {
        method: "DELETE",
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("DELETE DRIVER ERROR:", err));
  }
);

// FUNCTION: This function fetches vendors
export const fetchVendors = createAsyncThunk(
  "admin/vendors/getAll",
  async (token) => {
    return fetch(`http://localhost:3001/api/v1/admin/vendors`, {
      headers: {
        token: `Bearer ${JSON.parse(token)}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log("FETCH VENDORS ERROR:", err));
  }
);

// FUNCTION: This function deletes a vendor by Id
export const deleteVendorById = createAsyncThunk(
  "admin/vendors/deleteOne",
  async (payload) => {
    return fetch(
      `http://localhost:3001/api/v1/admin/vendors/delete/${payload?.vendorId}`,
      {
        method: "DELETE",
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("DELETE VENDOR ERROR:", err));
  }
);

// FUNCTION: This function fetches enquiries
export const fetchEnquiries = createAsyncThunk(
  "admin/enquiries/getAll",
  async (token) => {
    return fetch(`http://localhost:3001/api/v1/admin/enquiries`, {
      headers: {
        token: `Bearer ${JSON.parse(token)}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log("FETCH ENQUIRIES ERROR:", err));
  }
);

// FUNCTION: This function deletes an enquiry by Id
export const deleteEnquiryById = createAsyncThunk(
  "admin/enquiries/deleteOne",
  async (payload) => {
    return fetch(
      `http://localhost:3001/api/v1/admin/enquiries/delete/${payload?.enquiryId}`,
      {
        method: "DELETE",
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("DELETE ENQUIRY ERROR:", err));
  }
);

// FUNCTION: This function marks an enquiry as read
export const markEnquiryAsRead = createAsyncThunk(
  "admin/enquiries/markAsRead",
  async (payload) => {
    return fetch(
      `http://localhost:3001/api/v1/admin/enquiries/${payload?.enquiryId}/mark-as-read`,
      {
        method: "PATCH",
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("MARK ENQUIRY AS READ ERROR:", err));
  }
);

// FUNCTION: This function marks an enquiry as unread
export const markEnquiryAsUnread = createAsyncThunk(
  "admin/enquiries/markAsUnread",
  async (payload) => {
    return fetch(
      `http://localhost:3001/api/v1/admin/enquiries/${payload?.enquiryId}/mark-as-unread`,
      {
        method: "PATCH",
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("MARK ENQUIRY AS READ ERROR:", err));
  }
);

// BROADCASTS
// FUNCTION: This function sends a bulk email to a target audience
export const sendBulkEmail = createAsyncThunk(
  "admin/broadcasts/bulkEmail",
  async (payload) => {
    return fetch(`http://localhost:3001/api/v1/admin/broadcasts/bulk-email`, {
      method: "POST",
      headers: {
        token: `Bearer ${JSON.parse(payload?.token)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        targetAudience: payload?.targetAudience,
        subject: payload?.subject,
        email: payload?.message,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log("SEND BULK EMAIL ERROR:", err));
  }
);

// CURRENCIES / RATES
// FUNCTION: This function fetches enquiries
export const fetchCurrencies = createAsyncThunk(
  "admin/currencies/getAll",
  async (token) => {
    return fetch(`http://localhost:3001/api/v1/admin/currencies`, {
      headers: {
        token: `Bearer ${JSON.parse(token)}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log("FETCH CURRENCIES ERROR:", err));
  }
);
// FUNCTION: This function creates a new currency
export const createNewCurrency = createAsyncThunk(
  "admin/currencies/createNew",
  async (payload) => {
    return fetch(`http://localhost:3001/api/v1/admin/currencies/create-new`, {
      method: "POST",
      headers: {
        token: `Bearer ${JSON.parse(payload?.token)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currencyLabel: payload?.currencyLabel,
        exchangeRate: payload?.exchangeRate,
        currencySymbol: payload?.currencySymbol,
        currencyAlias: payload?.currencyAlias,
        currencyColor: payload?.currencyColor,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log("CREATE NEW CURRENCY ERROR:", err));
  }
);

// RATE PER MILE
// FUNCTION: This function fetches the rate per mile
export const fetchRatePerMile = createAsyncThunk(
  "admin/rate-per-mile/get",
  async (token) => {
    return fetch(`http://localhost:3001/api/v1/booking/rate-per-mile`, {
      headers: {
        token: `Bearer ${JSON.parse(token)}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log("FETCH RATE PER MILE ERROR:", err));
  }
);
// FUNCTION: This function creates a new currency
export const setRatePerMile = createAsyncThunk(
  "admin/rate-per-mile/set",
  async (payload) => {
    return fetch(`http://localhost:3001/api/v1/admin/rate-per-mile`, {
      method: "POST",
      headers: {
        token: `Bearer ${JSON.parse(payload?.token)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rate: payload?.rate,
        mile: payload?.mile,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log("SET RATE PER MILE ERROR:", err));
  }
);

// VISA ON ARRIVAL RATES
// FUNCTION: This function fetches the visa on arrival rates
export const fetchVisaOnArrivalRates = createAsyncThunk(
  "admin/visa-on-arrival-rates/getAll",
  async (token) => {
    return fetch(`http://localhost:3001/api/v1/admin/visa-on-arrival-rates`, {
      headers: {
        token: `Bearer ${JSON.parse(token)}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log("FETCH VISA ON ARRIVAL RATES ERROR:", err));
  }
);
// FUNCTION: This function creates a new visa on arrival rate / country
export const createVisaOnArrivalRate = createAsyncThunk(
  "admin/visa-on-arrival-rates/create-new",
  async (payload) => {
    return fetch(`http://localhost:3001/api/v1/admin/visa-on-arrival-rates`, {
      method: "POST",
      headers: {
        token: `Bearer ${JSON.parse(payload?.token)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: payload?.country,
        visaFee: payload?.visaFee,
      }),
    })
      .then((res) => res.json())
      .catch((err) =>
        console.log("CREATE NEW VISA ON ARRIVAL RATE ERROR:", err)
      );
  }
);

// VOA BASE FEES
// FUNCTION: This function fetches the visa on arrival rates
export const fetchVisaOnArrivalBaseRates = createAsyncThunk(
  "admin/visa-on-arrival-rates/base/getAll",
  async (token) => {
    return fetch(
      `http://localhost:3001/api/v1/admin/visa-on-arrival-rates/base`,
      {
        headers: {
          token: `Bearer ${JSON.parse(token)}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) =>
        console.log("FETCH VISA ON ARRIVAL BASE RATES ERROR:", err)
      );
  }
);

// FUNCTION: This function sets the visa on arrival base fees
export const setVisaOnArrivalBaseFees = createAsyncThunk(
  "admin/visa-on-arrival-rates/base",
  async (payload) => {
    return fetch(
      `http://localhost:3001/api/v1/admin/visa-on-arrival-rates/base`,
      {
        method: "POST",
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transactionFee: payload?.transactionFee,
          processingFee: payload?.processingFee,
          biometricFee: payload?.biometricFee,
        }),
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("SET VISA ON ARRIVAL BASE RATE ERROR:", err));
  }
);

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admin: null,
    token: "",
    isAdminLoggedIn: false,
    isLoading: false,
    message: "",
    requestStatus: null,

    // The following states are for the admin statistics / overview page
    numberOfAirportTransferBookings: null,
    numberOfCarRentalBookings: null,
    numberOfPriorityPassBookings: null,
    numberOfVisaOnArrivalBookings: null,
    totalRevenue: null,
    users: null,
    drivers: null,
    upcomingBookings: null,

    // The following states are for the "cities" page
    currentCity: null, // The current selected city per time
    cities: null,
    airports: null,

    // The following states are for user management
    currentUser: null,
    users: null,
    userData: null,

    // The following states are for driver management
    currentDriver: null,
    drivers: null,
    driverData: null,

    // The following states are for vendor management
    currentVendor: null,
    vendors: null,
    vendorData: null,

    // The following states are for enquiry management
    currentEnquiry: null,
    enquiries: null,

    // The following states are for currency / rates management
    currentCurrency: null,
    currencies: null,

    // The following state is for rate per mile management
    ratePerMile: null,

    // The following state is for visa on arrival rates management
    visaOnArrivalRates: null,
    voaBaseFees: null,
  },
  reducers: {
    setAdmin: (state, action) => {
      // This action sets an admin
      console.log("ACTION.PAYLOAD:", action.payload);
      state.admin = action.payload;
    },
    setToken: (state, action) => {
      // This action sets an admin token
      console.log("ACTION.PAYLOAD:", action.payload);
      state.token = action.payload;
    },
    resetMessage: (state) => {
      // This action resets the message state
      state.message = "";
    },
    logoutAdmin: (state, action) => {
      // This action logs in an admin
    },
    // CURRENCIES / RATES
    setCurrentCurrency: (state, action) => {
      // This action sets the current currency
      console.log("ACTION.PAYLOAD:", action.payload);
      state.currentCurrency = action.payload;
    },
  },

  extraReducers: (builder) => {
    // loginAdmin AsyncThunk states
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
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
          "adminToken",
          JSON.stringify(action.payload?.token)
        );
        localStorage.setItem("admin", JSON.stringify(action.payload?.admin));
        state.admin = action.payload?.admin;
      })
      .addCase(loginAdmin.rejected, (state) => {
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
        state.numberOfAirportTransferBookings =
          action.payload?.numberOfAirportTransferBookings;
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
      }) // Create City AsyncThunk states
      .addCase(createCity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCity.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD", action.payload);
        state.cities = action.payload?.cities;
        console.log("state.cities:", state.cities);
        state.requestStatus = action.payload?.status;
        state.message = action.payload?.message;
        // Set loading state to false
        state.isLoading = false;
        toast.success("City successfully created");
      })
      .addCase(createCity.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Fetch Cities AsyncThunk states
      .addCase(fetchCities.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD", action.payload);
        state.cities = action.payload?.cities;
        state.isLoading = false;
      })
      .addCase(fetchCities.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Add Airport To City AsyncThunk states
      .addCase(addAirportToCity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAirportToCity.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD", action.payload);
        state.cities = action.payload?.cities;
        state.isLoading = false;
      })
      .addCase(addAirportToCity.rejected, (state) => {
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
        state.isLoading = false;
      })
      .addCase(fetchCity.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Fetch Users AsyncThunk states
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD USERS", action.payload);
        state.users = action.payload?.users;
        state.userData = action.payload?.data;
        state.isLoading = false;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Delete User By Id AsyncThunk states
      .addCase(deleteUserById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD DELETE USER", action.payload);
        state.users = action.payload?.users;
        state.userData = action.payload?.data;
        if (action.payload?.status == 201) {
          toast.success(action.payload?.message);
        } else {
          toast.error(action.payload?.message);
        }
        state.isLoading = false;
      })
      .addCase(deleteUserById.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Fetch Drivers AsyncThunk states
      .addCase(fetchDrivers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDrivers.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD DRIVERS", action.payload);
        state.drivers = action.payload?.drivers;
        state.driverData = action.payload?.data;
        state.isLoading = false;
      })
      .addCase(fetchDrivers.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Delete Driver By Id AsyncThunk states
      .addCase(deleteDriverById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDriverById.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD DELETE DRIVER", action.payload);
        state.drivers = action.payload?.drivers;
        state.driverData = action.payload?.data;
        if (action.payload?.status == 201) {
          toast.success(action.payload?.message);
        } else {
          toast.error(action.payload?.message);
        }
        state.isLoading = false;
      })
      .addCase(deleteDriverById.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Fetch Vendors AsyncThunk states
      .addCase(fetchVendors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchVendors.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD VENDORS", action.payload);
        state.vendors = action.payload?.vendors;
        state.vendorData = action.payload?.data;
        state.isLoading = false;
      })
      .addCase(fetchVendors.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Delete Vendor By Id AsyncThunk states
      .addCase(deleteVendorById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteVendorById.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD DELETE VENDOR", action.payload);
        state.vendors = action.payload?.vendors;
        state.vendorData = action.payload?.data;
        if (action.payload?.status == 201) {
          toast.success(action.payload?.message);
        } else {
          toast.error(action.payload?.message);
        }
        state.isLoading = false;
      })
      .addCase(deleteVendorById.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Fetch Enquiries AsyncThunk states
      .addCase(fetchEnquiries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchEnquiries.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD ENQUIRIES", action.payload);
        state.enquiries = action.payload?.enquiries;
        state.isLoading = false;
      })
      .addCase(fetchEnquiries.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Delete Enquiry By Id AsyncThunk states
      .addCase(deleteEnquiryById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEnquiryById.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD DELETE ENQUIRY", action.payload);
        state.enquiries = action.payload?.enquiries;
        if (action.payload?.status == 201) {
          toast.success(action.payload?.message);
        } else {
          toast.error(action.payload?.message);
        }
        state.isLoading = false;
      })
      .addCase(deleteEnquiryById.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Mark Enquiry as read AsyncThunk states
      .addCase(markEnquiryAsRead.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(markEnquiryAsRead.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD MARK ENQUIRY AS READ", action.payload);
        state.enquiries = action.payload?.enquiries;
        if (action.payload?.status == 201) {
          toast.success(action.payload?.message);
        } else {
          toast.error(action.payload?.message);
        }
        state.isLoading = false;
      })
      .addCase(markEnquiryAsRead.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Mark Enquiry as unread AsyncThunk states
      .addCase(markEnquiryAsUnread.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(markEnquiryAsUnread.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD MARK ENQUIRY AS UNREAD", action.payload);
        state.enquiries = action.payload?.enquiries;
        if (action.payload?.status == 201) {
          toast.success(action.payload?.message);
        } else {
          toast.error(action.payload?.message);
        }
        state.isLoading = false;
      })
      .addCase(markEnquiryAsUnread.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Send Bulk Email AsyncThunk states
      .addCase(sendBulkEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendBulkEmail.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD SEND BULK EMAIL", action.payload);
        if (action.payload?.status == 200) {
          toast.success(action.payload?.message);
        } else {
          toast.error(action.payload?.message);
        }
        state.isLoading = false;
      })
      .addCase(sendBulkEmail.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Fetch Currencies AsyncThunk states
      .addCase(fetchCurrencies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrencies.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD FETCH CURRENCIES", action.payload);
        state.currencies = action.payload?.currencies;
        state.isLoading = false;
      })
      .addCase(fetchCurrencies.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Create New Currency AsyncThunk states
      .addCase(createNewCurrency.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewCurrency.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD CREATE NEW CURRENCY", action.payload);
        if (action.payload?.status == 201) {
          toast.success(action.payload?.message);
          state.currencies = action.payload?.currencies;
        } else {
          toast.error(action.payload?.message);
        }
        state.isLoading = false;
      })
      .addCase(createNewCurrency.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Fetch Rate Per Mile AsyncThunk states
      .addCase(fetchRatePerMile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRatePerMile.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD FETCH RATE PER MILE", action.payload);
        state.ratePerMile = action.payload?.ratePerMile;
        state.isLoading = false;
      })
      .addCase(fetchRatePerMile.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Set Rate Per Mile AsyncThunk states
      .addCase(setRatePerMile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setRatePerMile.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD SET RATE PER MILE", action.payload);
        if (action.payload?.status == 201) {
          toast.success(action.payload?.message);
          state.ratePerMile = action.payload?.ratePerMile;
        } else {
          toast.error(action.payload?.message);
        }
        state.isLoading = false;
      })
      .addCase(setRatePerMile.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Fetch Visa On Arrival Rates AsyncThunk states
      .addCase(fetchVisaOnArrivalRates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchVisaOnArrivalRates.fulfilled, (state, action) => {
        console.log(
          "ACTION.PAYLOAD FETCH VISA ON ARRIVAL RATES",
          action.payload
        );
        state.visaOnArrivalRates = action.payload?.visaOnArrivalRates;
        state.isLoading = false;
      })
      .addCase(fetchVisaOnArrivalRates.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Create Visa On Arrival Rates AsyncThunk states
      .addCase(createVisaOnArrivalRate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createVisaOnArrivalRate.fulfilled, (state, action) => {
        console.log(
          "ACTION.PAYLOAD CREATE VISA ON ARRIVAL RATE",
          action.payload
        );
        if (action.payload?.status == 201) {
          toast.success(action.payload?.message);
          state.visaOnArrivalRates = action.payload?.visaOnArrivalRates;
        } else {
          toast.error(action.payload?.message);
        }
        state.isLoading = false;
      })
      .addCase(createVisaOnArrivalRate.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Set Visa On Arrival BASE Fees AsyncThunk states
      .addCase(setVisaOnArrivalBaseFees.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setVisaOnArrivalBaseFees.fulfilled, (state, action) => {
        console.log(
          "ACTION.PAYLOAD SET VISA ON ARRIVAL BASE FEES",
          action.payload
        );
        if (action.payload?.status == 201) {
          toast.success(action.payload?.message);
          state.voaBaseFees = action.payload?.voaBaseFees;
        } else {
          toast.error(action.payload?.message);
        }
        state.isLoading = false;
      })
      .addCase(setVisaOnArrivalBaseFees.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Fetch Visa On Arrival BASE Fees AsyncThunk states
      .addCase(fetchVisaOnArrivalBaseRates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchVisaOnArrivalBaseRates.fulfilled, (state, action) => {
        console.log(
          "ACTION.PAYLOAD SET VISA ON ARRIVAL BASE FEES",
          action.payload
        );
        state.voaBaseFees = action.payload?.voaBaseFees;
        state.isLoading = false;
      })
      .addCase(fetchVisaOnArrivalBaseRates.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      });
  },
});

export const { setAdmin, setToken, resetMessage, setCurrentCurrency } =
  adminSlice.actions;
export default adminSlice.reducer;
