// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// FUNCTION: This function handles admin login
export const loginAdmin = createAsyncThunk(
  "admin/loginAdmin",
  async (payload) => {
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/admin/login`, {
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
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/statistics`, {
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
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/cities`, {
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
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/cities`, {
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
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/cities/add-airport`,
      {
        method: "POST",
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cityId: payload?.cityId,
          airport: payload?.airport,
        }),
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("ADD AIRPORT TO CITY ERROR:", err));
  }
);

// FUNCTION: This function updates a city
export const updateCity = createAsyncThunk(
  "admin/cities/updateOne",
  async (payload) => {
    console.log(
      "UPDATED VALUES:",
      payload?.cityName,
      payload?.cityId,
      payload?.cityAirports
    );
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/cities/update/${payload?.cityId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${JSON.parse(payload?.token)}`,
        },
        body: JSON.stringify({
          cityName: payload?.cityName,
          airports: payload?.cityAirports,
        }),
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("UPDATE CITY ERROR:", err));
  }
);

// FUNCTION: This function deletes a city by Id
export const deleteCity = createAsyncThunk(
  "admin/cities/deleteOne",
  async (payload) => {
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/cities/delete/${payload?.cityId}`,
      {
        method: "DELETE",
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("DELETE CITY ERROR:", err));
  }
);

// FUNCTION: This function fetches a city
export const fetchCity = createAsyncThunk(
  "admin/cities/getOne",
  async (payload) => {
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/cities/${payload?.cityId}?isAdminRequest=true`,
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
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/users`, {
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
      `${process.env.REACT_APP_API_BASE_URL}/admin/users/delete/${payload?.userId}`,
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
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/drivers`, {
      headers: {
        token: `Bearer ${JSON.parse(token)}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log("FETCH DRIVERS ERROR:", err));
  }
);

// FUNCTION: This function fetches suspended drivers
export const fetchSuspendedDrivers = createAsyncThunk(
  "admin/drivers/suspended/getAll",
  async (token) => {
    console.log("TOKEN:", token);
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/drivers/account/suspended-accounts`,
      //   `${process.env.REACT_APP_API_BASE_URL}/admin/drivers/suspended-accounts`,
      {
        headers: {
          token: `Bearer ${JSON.parse(token)}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("FETCH SUSPENDED DRIVERS ERROR:", err));
  }
);

// FUNCTION: This function fetches approved drivers
export const fetchApprovedDrivers = createAsyncThunk(
  "admin/drivers/getAllApproved",
  async (token) => {
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/drivers/approved`,
      {
        headers: {
          token: `Bearer ${JSON.parse(token)}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("FETCH DRIVERS ERROR:", err));
  }
);

// FUNCTION: This function fetches unapproved drivers
export const fetchUnapprovedDrivers = createAsyncThunk(
  "admin/drivers/getAllUnapproved",
  async (token) => {
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/drivers/unapproved`,
      {
        headers: {
          token: `Bearer ${JSON.parse(token)}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("FETCH UNAPPROVED DRIVERS ERROR:", err));
  }
);

// FUNCTION: This function deletes a driver by Id
export const deleteDriverById = createAsyncThunk(
  "admin/drivers/deleteOne",
  async (payload) => {
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/drivers/delete/${payload?.driverId}`,
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

// FUNCTION: This function suspends a driver by Id
export const suspendDriverById = createAsyncThunk(
  "admin/drivers/suspendOne",
  async (payload) => {
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/drivers/${payload?.driverId}/account/suspend`,
      {
        method: "PATCH",
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("SUSPEND DRIVER ERROR:", err));
  }
);

// FUNCTION: This function unsuspends a driver by Id
export const unsuspendDriverById = createAsyncThunk(
  "admin/drivers/unsuspendOne",
  async (payload) => {
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/drivers/${payload?.driverId}/account/unsuspend`,
      {
        method: "PATCH",
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("UNSUSPEND DRIVER ERROR:", err));
  }
);

// FUNCTION: This function rejects a driver application by Id
export const rejectDriverApplication = createAsyncThunk(
  "admin/drivers/rejectApplication",
  async (payload) => {
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/drivers/${payload?.driverId}/account/reject`,
      {
        method: "PATCH",
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("REJECT DRIVER APPLICATION ERROR:", err));
  }
);

// FUNCTION: This function fetches vendors
export const fetchVendors = createAsyncThunk(
  "admin/vendors/getAll",
  async (token) => {
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/vendors`, {
      headers: {
        token: `Bearer ${JSON.parse(token)}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log("FETCH VENDORS ERROR:", err));
  }
);

// FUNCTION: This function fetches approved vendors
export const fetchApprovedVendors = createAsyncThunk(
  "admin/vendors/getAllApproved",
  async (token) => {
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/vendors/approved`,
      {
        headers: {
          token: `Bearer ${JSON.parse(token)}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("FETCH APPROVED VENDORS ERROR:", err));
  }
);

// FUNCTION: This function fetches unapproved vendors
export const fetchUnapprovedVendors = createAsyncThunk(
  "admin/vendors/getAllUnapproved",
  async (token) => {
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/vendors/unapproved`,
      {
        headers: {
          token: `Bearer ${JSON.parse(token)}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("FETCH UNAPPROVED VENDORS ERROR:", err));
  }
);

// FUNCTION: This function fetches suspended vendors
export const fetchSuspendedVendors = createAsyncThunk(
  "admin/vendors/suspended/getAll",
  async (token) => {
    console.log("TOKEN:", token);
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/vendors/account/suspended-accounts`,
      //   `${process.env.REACT_APP_API_BASE_URL}/admin/vendors/suspended-accounts`,
      {
        headers: {
          token: `Bearer ${JSON.parse(token)}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("FETCH SUSPENDED VENDORS ERROR:", err));
  }
);

// FUNCTION: This function approves a vendor account
export const approveVendorAccount = createAsyncThunk(
  "admin/vendors/approveAccount",
  async (payload) => {
    console.log("PAYLOAD FROM AsyncThunk:", payload);
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/vendors/${payload?.vendorId}/account/approve`,
      {
        method: "PATCH",
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) =>
        console.log("APPROVE VENDOR ACCOUNT ERROR (ADMIN):", err)
      );
  }
);

// FUNCTION: This function deletes a vendor by Id
export const deleteVendorById = createAsyncThunk(
  "admin/vendors/deleteOne",
  async (payload) => {
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/vendors/delete/${payload?.vendorId}`,
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

// FUNCTION: This function suspends a vendor by Id
export const suspendVendorById = createAsyncThunk(
  "admin/vendors/suspendOne",
  async (payload) => {
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/vendors/${payload?.vendorId}/account/suspend`,
      {
        method: "PATCH",
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("SUSPEND DRIVER ERROR:", err));
  }
);

// FUNCTION: This function unsuspends a vendor by Id
export const unsuspendVendorById = createAsyncThunk(
  "admin/vendors/unsuspendOne",
  async (payload) => {
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/vendors/${payload?.vendorId}/account/unsuspend`,
      {
        method: "PATCH",
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("UNSUSPEND DRIVER ERROR:", err));
  }
);

// FUNCTION: This function rejects a vendor application by Id
export const rejectVendorApplication = createAsyncThunk(
  "admin/vendors/rejectApplication",
  async (payload) => {
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/vendors/${payload?.vendorId}/account/reject`,
      {
        method: "PATCH",
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("REJECT DRIVER APPLICATION ERROR:", err));
  }
);

// FUNCTION: This function fetches enquiries
export const fetchEnquiries = createAsyncThunk(
  "admin/enquiries/getAll",
  async (token) => {
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/enquiries`, {
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
      `${process.env.REACT_APP_API_BASE_URL}/admin/enquiries/delete/${payload?.enquiryId}`,
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
      `${process.env.REACT_APP_API_BASE_URL}/admin/enquiries/${payload?.enquiryId}/mark-as-read`,
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
      `${process.env.REACT_APP_API_BASE_URL}/admin/enquiries/${payload?.enquiryId}/mark-as-unread`,
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
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/broadcasts/bulk-email`,
      {
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
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("SEND BULK EMAIL ERROR:", err));
  }
);

// CURRENCIES / RATES
// FUNCTION: This function fetches enquiries
export const fetchCurrencies = createAsyncThunk(
  "admin/currencies/getAll",
  async (token) => {
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/currencies`, {
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
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/currencies/create-new`,
      {
        method: "POST",
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currencyLabel: payload?.currencyLabel,
          exchangeRatePercentage: payload?.exchangeRatePercentage,
          additionalRate: payload?.additionalRate,
          currencySymbol: payload?.currencySymbol,
          currencyAlias: payload?.currencyAlias,
          currencyColor: payload?.currencyColor,
          supportedCountries: payload?.supportedCountries,
        }),
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("CREATE NEW CURRENCY ERROR:", err));
  }
);

// FUNCTION: This function updates a currency
export const updateCurrency = createAsyncThunk(
  "admin/currencies/updateOne",
  async (payload) => {
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/currencies/${payload?._id}`,
      {
        method: "PUT",
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currencyLabel: payload?.currencyLabel,
          exchangeRatePercentage: payload?.exchangeRatePercentage,
          additionalRate: payload?.additionalRate,
          symbol: payload?.symbol,
          alias: payload?.alias,
          supportedCountries: payload?.supportedCountries,
        }),
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("UPDATE CURRENCY ERROR:", err));
  }
);

// FUNCTION: This function deletes a currency
export const deleteCurrency = createAsyncThunk(
  "admin/currencies/deleteOne",
  async (payload) => {
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/currencies/${payload?._id}`,
      {
        method: "DELETE",
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("DELETE CURRENCY ERROR:", err));
  }
);

// RATE PER MILE
// FUNCTION: This function fetches the rate per mile
export const fetchRatesPerMile = createAsyncThunk(
  "admin/rate-per-mile/get",
  async (token) => {
    console.log("token:", token);
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/rate-per-mile`, {
      headers: {
        token: `Bearer ${JSON.parse(token)}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log("FETCH RATE PER MILE ERROR:", err));
  }
);
// FUNCTION: This function deletes a rate
export const deleteRatePerMile = createAsyncThunk(
  "admin/rate-per-mile/deleteOne",
  async (payload) => {
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/rate-per-mile/${payload?._id}`,
      {
        method: "DELETE",
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("DELETE RATE PER MILE ERROR:", err));
  }
);
// FUNCTION: This function creates a new currency
export const setRatePerMile = createAsyncThunk(
  "admin/rate-per-mile/set",
  async (payload) => {
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/rate-per-mile`, {
      method: "POST",
      headers: {
        token: `Bearer ${JSON.parse(payload?.token)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rate: payload?.rate,
        mile: payload?.mile,
        city: payload?.city,
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
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/visa-on-arrival-rates`,
      {
        headers: {
          token: `Bearer ${JSON.parse(token)}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("FETCH VISA ON ARRIVAL RATES ERROR:", err));
  }
);
// FUNCTION: This function creates a new visa on arrival rate / country
export const createVisaOnArrivalRate = createAsyncThunk(
  "admin/visa-on-arrival-rates/create-new",
  async (payload) => {
    console.log("PAYLOAD:", payload);
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/visa-on-arrival-rates`,
      {
        method: "POST",
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country: payload?.country,
          visaFee: payload?.visaFee,
          isNigerianVisaRequired: payload?.isNigerianVisaRequired,
          isBiometricsRequired: payload?.isBiometricsRequired,
        }),
      }
    )
      .then((res) => res.json())
      .catch((err) =>
        console.log("CREATE NEW VISA ON ARRIVAL RATE ERROR:", err)
      );
  }
);
// FUNCTION: This function updates a visa on arrival rate / country
export const updateVisaOnArrivalRate = createAsyncThunk(
  "admin/visa-on-arrival-rates/updateOne",
  async (payload) => {
    console.log("PAYLOAD:", payload);
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/visa-on-arrival-rates/${payload?._id}`,
      {
        method: "PUT",
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country: payload?.country,
          visaFee: payload?.visaFee,
          isNigerianVisaRequired: payload?.isNigerianVisaRequired,
          isBiometricsRequired: payload?.isBiometricsRequired,
          voaBaseFeeId: payload?.voaBaseFeeId,
        }),
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("UPDATE VISA ON ARRIVAL RATE ERROR:", err));
  }
);
// FUNCTION: This function deletes a visa on arrival rate / country
export const deleteVisaOnArrivalRate = createAsyncThunk(
  "admin/visa-on-arrival-rates/deleteOne",
  async (payload) => {
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/visa-on-arrival-rates/${payload?._id}`,
      {
        method: "DELETE",
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("DELETE VISA ON ARRIVAL RATE ERROR:", err));
  }
);

// VOA BASE FEES
// FUNCTION: This function fetches the visa on arrival rates
export const fetchVisaOnArrivalBaseRates = createAsyncThunk(
  "admin/visa-on-arrival-rates/base/getAll",
  async (token) => {
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/visa-on-arrival-rates/base`,
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
      `${process.env.REACT_APP_API_BASE_URL}/admin/visa-on-arrival-rates/base`,
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
          _id: payload?._id,
        }),
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("SET VISA ON ARRIVAL BASE RATE ERROR:", err));
  }
);

// VEHICLE CLASSES
// FUNCTION: This function fetches vehicle classes
export const fetchVehicleClasses = createAsyncThunk(
  "admin/vehicle-classes/getAll",
  async (token) => {
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/vehicle-classes?isAdminRequest=true`,
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
// FUNCTION: This function creates vehicle classes
export const createVehicleClasses = createAsyncThunk(
  "admin/vehicle-classes/createOne",
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
        return fetch(
          `${process.env.REACT_APP_API_BASE_URL}/admin/vehicle-classes`,
          {
            method: "POST",
            headers: {
              token: `Bearer ${JSON.parse(payload?.token)}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              image: data.secure_url,
              className: payload?.vehicleClassName,
              description: payload?.description,
              passengers: payload?.passengers,
              luggages: payload?.luggages,
              basePrice: payload?.basePrice,
              cityId: payload?.cityId,
            }),
          }
        )
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
// FUNCTION: This function updates a vehicle classe
export const updateVehicleClass = createAsyncThunk(
  "admin/vehicle-classes/updateOne",
  async (payload) => {
    switch (typeof payload?.image) {
      // If the image was not updated, no need to upload anything to cloudinary
      case "string":
        return fetch(
          `${process.env.REACT_APP_API_BASE_URL}/admin/vehicle-classes/${payload?.vehicleClassId}/${payload?.cityId}`,
          {
            method: "PUT",
            headers: {
              token: `Bearer ${JSON.parse(payload?.token)}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              className: payload?.className,
              description: payload?.description,
              passengers: payload?.passengers,
              luggages: payload?.luggages,
              basePrice: payload?.basePrice,
            }),
          }
        )
          .then((res) => res.json())
          .catch((err) => console.log("UPLOAD VEHICLE CLASS ERROR:", err));
        break;

      default:
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
            return fetch(
              `${process.env.REACT_APP_API_BASE_URL}/admin/vehicle-classes/${payload?.vehicleClassId}/${payload?.cityId}`,
              {
                method: "PUT",
                headers: {
                  token: `Bearer ${JSON.parse(payload?.token)}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  image: data.secure_url,
                  className: payload?.vehicleClassName,
                  passengers: payload?.passengers,
                  luggages: payload?.luggages,
                  basePrice: payload?.basePrice,
                }),
              }
            )
              .then((res) => res.json())
              .catch((err) => console.log("CREATE VEHICLE CLASS ERROR:", err));
          } else {
            // Handle error
            console.error("Upload failed");
          }
        } catch (error) {
          console.error("Error uploading image:", error);
        }
        break;
    }
  }
);
// FUNCTION: This function deletes a vehicle class
export const deleteVehicleClass = createAsyncThunk(
  "admin/vehicle-classes/deleteOne",
  async (payload) => {
    console.log("hello:", payload);
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/vehicle-classes/${payload?.vehicleClassId}/${payload.cityId}`,
      {
        method: "DELETE",
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("DELETE VEHICLE CLASS ERROR:", err));
  }
);

// CAR RATES
// FUNCTION: This function fetches cars
export const fetchCars = createAsyncThunk(
  "admin/cars/getAll",
  async (token) => {
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/cars?isAdminRequest=true`,
      {
        headers: {
          token: `Bearer ${JSON.parse(token)}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("FETCH CARS ERROR:", err));
  }
);
// FUNCTION: This function creates a car
export const createCar = createAsyncThunk(
  "admin/cars/createOne",
  async (payload) => {
    console.log("payload.image:::", payload.image);

    return fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/cars`, {
      method: "POST",
      headers: {
        token: `Bearer ${JSON.parse(payload?.token)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        city: payload?.city,
        name: payload?.name,
        price: payload?.price,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log("CREATE CAR ERROR:", err));
  }
);
// FUNCTION: This function updates a car
export const updateCar = createAsyncThunk(
  "admin/cars/updateOne",
  async (payload) => {
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/cars/${payload?.carId}/${payload?.city}`,
      {
        method: "PUT",
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: payload?.name,
          price: payload?.price,
        }),
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("UPDATE CAR ERROR:", err));
  }
);
// FUNCTION: This function deletes a car
export const deleteCar = createAsyncThunk(
  "admin/car/deleteOne",
  async (payload) => {
    console.log("city payload:", payload);
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/cars/${payload?.carId}/${payload?.city}`,
      {
        method: "DELETE",
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("DELETE CAR ERROR:", err));
  }
);

// PRIORITY PASS RATES
// FUNCTION: This function fetches passes
export const fetchPasses = createAsyncThunk(
  "admin/passes/getAll",
  async (token) => {
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/passes?isAdminRequest=true`,
      {
        headers: {
          token: `Bearer ${JSON.parse(token)}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("FETCH PASSES ERROR:", err));
  }
);
// FUNCTION: This function creates a pass
export const createPass = createAsyncThunk(
  "admin/passes/createOne",
  async (payload) => {
    console.log("payload.image:::", payload.image);

    return fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/passes`, {
      method: "POST",
      headers: {
        token: `Bearer ${JSON.parse(payload?.token)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: payload?.name,
        price: payload?.price,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log("CREATE PASS ERROR:", err));
  }
);
// FUNCTION: This function updates a pass
export const updatePass = createAsyncThunk(
  "admin/passes/updateOne",
  async (payload) => {
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/passes/${payload?.passId}`,
      {
        method: "PUT",
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: payload?.name,
          price: payload?.price,
        }),
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("UPDATE PASS ERROR:", err));
  }
);
// FUNCTION: This function deletes a pass
export const deletePass = createAsyncThunk(
  "admin/passes/deleteOne",
  async (payload) => {
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/passes/${payload?.passId}`,
      {
        method: "DELETE",
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("DELETE PASS ERROR:", err));
  }
);

// BLOG MANAGEMENT
// FUNCTION: This function fetches blog posts
export const fetchBlogPosts = createAsyncThunk(
  "admin/blog/getPosts",
  async () => {
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/blog-posts`, {})
      .then((res) => res.json())
      .catch((err) => console.log("FETCH BLOG POSTS ERROR:", err));
  }
);
// FUNCTION: This function creates a blog post
export const createBlogPost = createAsyncThunk(
  "admin/blog/createPost",
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
        // SAVE BLOG POST TO THE DATABASE
        return fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/blog-posts`, {
          method: "POST",
          headers: {
            token: `Bearer ${JSON.parse(payload?.token)}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: data.secure_url,
            title: payload?.title,
            content: payload?.content,
            author: payload?.author,
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
// FUNCTION: This function updates a blog post
export const updateBlogPost = createAsyncThunk(
  "admin/blog/updateOne",
  async (payload) => {
    switch (typeof payload?.image) {
      // If the image was not updated, no need to upload anything to cloudinary
      case "string":
        return fetch(
          `${process.env.REACT_APP_API_BASE_URL}/admin/blog-posts/${payload?.blogPostId}`,
          {
            method: "PUT",
            headers: {
              token: `Bearer ${JSON.parse(payload?.token)}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: payload?.title,
              content: payload?.content,
              author: payload?.author,
            }),
          }
        )
          .then((res) => res.json())
          .catch((err) => console.log("UPDATE BLOG POST ERROR:", err));
        break;

      default:
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
            return fetch(
              `${process.env.REACT_APP_API_BASE_URL}/admin/blog-posts/${payload?.blogPostId}`,
              {
                method: "PUT",
                headers: {
                  token: `Bearer ${JSON.parse(payload?.token)}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  title: payload?.title,
                  content: payload?.content,
                  author: payload?.author,
                }),
              }
            )
              .then((res) => res.json())
              .catch((err) => console.log("UPDATE BLOG POST ERROR:", err));
          } else {
            // Handle error
            console.error("Upload failed");
          }
        } catch (error) {
          console.error("Error uploading image:", error);
        }
        break;
    }
  }
);
// FUNCTION: This function deletes a blog post
export const deleteBlogPost = createAsyncThunk(
  "admin/blog/deleteOne",
  async (payload) => {
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/blog-posts/${payload?.blogPostId}`,
      {
        method: "DELETE",
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("DELETE BLOG POST ERROR:", err));
  }
);

// BOOKINGS
// FUNCTION: This function fetches upcoming bookings
export const adminFetchUpcomingBookings = createAsyncThunk(
  "admin/bookings/upcoming",
  async (token) => {
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/bookings/upcoming`,
      {
        headers: {
          token: `Bearer ${JSON.parse(token)}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) =>
        console.log("FETCH UPCOMING BOOKINGS ERROR (ADMIN):", err)
      );
  }
);
// FUNCTION: This function fetches unassigned bookings
export const adminFetchBookingsAwaitingAssignment = createAsyncThunk(
  "admin/bookings/unassigned",
  async (token) => {
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/bookings/unassigned`,
      {
        headers: {
          token: `Bearer ${JSON.parse(token)}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) =>
        console.log("FETCH UNASSIGNED BOOKINGS ERROR (ADMIN):", err)
      );
  }
);
// FUNCTION: This function deletes a booking
export const deleteBooking = createAsyncThunk(
  "admin/bookings/deleteOne",
  async (payload) => {
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/booking/delete-booking/${payload?._id}`,
      {
        method: "DELETE",
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("DELETE BOOKING ERROR:", err));
  }
);
// FUNCTION: This function assigns a driver / vendor to a booking / job
export const assignToJob = createAsyncThunk(
  "admin/bookings/assignToJob",
  async (payload) => {
    console.log("PAYLOAD FROM AsyncThunk:", payload);
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/assign-to-booking/${payload?.userType}/${payload?.userId}/${payload?.bookingId}`,
      {
        method: "PATCH",
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingRate: payload?.bookingRate,
        }),
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("ASSIGN TO BOOKING ERROR (ADMIN):", err));
  }
);
// FUNCTION: This function approves a driver account
export const approveDriverAccount = createAsyncThunk(
  "admin/drivers/approveAccount",
  async (payload) => {
    console.log("PAYLOAD FROM AsyncThunk:", payload);
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/drivers/${payload?.driverId}/account/approve`,
      {
        method: "PATCH",
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) =>
        console.log("APPROVE DRIVER ACCOUNT ERROR (ADMIN):", err)
      );
  }
);

// FUNCTION: Fetch a booking by its booking reference
export const fetchBookingByReference = createAsyncThunk(
  "admin/booking/getOneByReference",
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

// FUNCTION: This function creates a new admin account
export const createAdminAccount = createAsyncThunk(
  "admin/accounts/createNew",
  async (payload) => {
    console.log("AR:", payload?.accessRights);
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/admin/signup`, {
      method: "POST",
      headers: {
        token: `Bearer ${JSON.parse(payload?.token)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: payload?.firstName,
        lastName: payload?.lastName,
        email: payload?.email,
        username: payload?.username,
        role: payload?.role,
        accessRights: payload?.accessRights,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log("CREATE NEW ADMIN ACCOUNT ERROR:", err));
  }
);

// FUNCTION: Fetch all admin accounts
export const fetchAdminAccounts = createAsyncThunk(
  "admin/accounts/getAll",
  async (token) => {
    console.log("HI");
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/admin`, {
      headers: {
        token: `Bearer ${JSON.parse(token)}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log("FETCH ADMIN ACCOUNTS ERROR:", err));
  }
);

// FUNCTION: This function deletes an admin account
export const deleteAdminAccount = createAsyncThunk(
  "admin/accounts/deleteOne",
  async (payload) => {
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/${payload?.adminId}`,
      {
        method: "DELETE",
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("DELETE ADMIN ACCOUNT ERROR:", err));
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
          title: payload?.bookingDetails?.title,
          firstName: payload?.bookingDetails?.firstName,
          lastName: payload?.bookingDetails?.lastName,
          email: payload?.bookingDetails?.email,
          mobile: payload?.bookingDetails?.mobile,
          bookingCurrency: payload?.bookingDetails?.bookingCurrency?._id,
          bookingTotal: payload?.bookingDetails?.bookingTotal,
          isRoundTrip: payload?.bookingDetails?.isRoundTrip,
          passengers: payload?.bookingDetails?.passengers,
          airline: payload?.bookingDetails?.airline,
          flightNumber: payload?.bookingDetails?.flightNumber,
          vehicleClass: payload?.bookingDetails?.vehicleClass,
          city: payload?.bookingDetails?.selectedCity?.cityName,
          pickupAddress: payload?.bookingDetails?.pickupLocation,
          pickupDate: payload?.bookingDetails?.pickupDate,
          pickupTime: payload?.bookingDetails?.pickupTime,
          dropoffAddress: payload?.bookingDetails?.dropoffLocation,
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
          firstName: payload?.bookingDetails?.firstName,
          lastName: payload?.bookingDetails?.lastName,
          email: payload?.bookingDetails?.email,
          mobile: payload?.bookingDetails?.mobile,
          bookingCurrency: payload?.bookingDetails?.bookingCurrency?._id,
          bookingTotal: payload?.bookingDetails?.bookingTotal,
          pickupAddress: payload?.bookingDetails?.pickupAddress,
          pickupDate: payload?.bookingDetails?.pickupDate,
          pickupTime: payload?.bookingDetails?.pickupTime,
          days: payload?.bookingDetails?.days,
          carSelected: payload?.bookingDetails?.carSelected,
          citySelected: payload?.bookingDetails?.citySelected,
        };
        break;
      case "Priority":
        console.log("BOOKING VALUES:", payload);
        values = {
          bookingType: payload?.bookingType,
          title: payload?.bookingDetails?.title?.value,
          firstName: payload?.bookingDetails?.firstName,
          lastName: payload?.bookingDetails?.lastName,
          email: payload?.bookingDetails?.email,
          mobile: payload?.bookingDetails?.mobile,
          airline: payload?.bookingDetails?.airline,
          flightNumber: payload?.bookingDetails?.flightNumber,
          bookingCurrency: payload?.bookingDetails?.bookingCurrency,
          bookingTotal: payload?.bookingDetails?.bookingTotal,
          pickupLocation: payload?.bookingDetails?.pickupAddress,
          pickupDate: payload?.bookingDetails?.pickupDate,
          pickupTime: payload?.bookingDetails?.pickupTime,
          passengers: payload?.bookingDetails?.passengers,
          selectedProtocol: payload?.bookingDetails?.protocolSelected,
          passSelected: payload?.bookingDetails?.passSelected,
          citySelected: payload?.bookingDetails?.citySelected,
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

    return fetch(
      `https://www.shuttlelane.com/api/v1/booking?isAdminRequest=true`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("CREATE BOOKING ERROR:", err));
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

// FUNCTION: Fetch all payments
export const fetchPayments = createAsyncThunk(
  "admin/payments/getAll",
  async (token) => {
    console.log("HI");
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/payments`, {
      headers: {
        token: `Bearer ${JSON.parse(token)}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log("FETCH PAYMENTS ERROR:", err));
  }
);

// FUNCTION: Fetch payment
export const fetchPayment = createAsyncThunk(
  "admin/payments/getOne",
  async (payload) => {
    console.log("HI");
    return fetch(
      `${process.env.REACT_APP_API_BASE_URL}/payments/${payload?.paymentId}`,
      {
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log("FETCH PAYMENT ERROR:", err));
  }
);

// FUNCTION: Fetch all bookings
export const fetchAllBookings = createAsyncThunk(
  "admin/bookings/getAll",
  async (token) => {
    console.log("HI");
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/bookings`, {
      headers: {
        token: `Bearer ${JSON.parse(token)}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log("FETCH BOOKINGS ERROR:", err));
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
    unassignedBookings: null,
    bookingData: null,

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
    suspendedDrivers: null,
    approvedDrivers: null,
    unapprovedDrivers: null,
    driverData: null,

    // The following states are for vendor management
    currentVendor: null,
    vendors: null,
    suspendedVendors: null,
    approvedVendors: null,
    unapprovedVendors: null,
    vendorData: null,

    // The following states are for enquiry management
    currentEnquiry: null,
    enquiries: null,

    // The following states are for currency / rates management
    currentCurrency: null,
    currencies: null,

    // The following state is for rate per mile management
    ratesPerMile: null,

    // The following states are for visa on arrival rates management
    visaOnArrivalRates: null,
    voaBaseFees: null,

    // The following state is for vehicle class management
    vehicleClasses: null,

    // The following state is for car management
    cars: null,

    // The following state is for pass management (Priority Pass)
    passes: null,

    // The following state is for blog management
    blogPosts: null,

    // The following states are for booking / booking modal management
    bookingFetchedByReference: null,
    isGetBookingByReferenceLoading: false,

    // This state holds all admin accounts
    adminAccounts: null,

    // Create booking states
    createBookingStatusCode: null,
    bookingCurrency: null,
    bookingTotal: null,
    bookingDistance: null,
    tripDuration: null,

    // Payment states
    payments: null,
    currentPayment: null,

    // Booking states
    airportTransferBookings: null,
    carRentalBookings: null,
    priorityPassBookings: null,
    visaOnArrivalBookings: null,
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
        state.bookingData = action.payload?.bookingData;
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
        console.log("ACTION.PAYLOAD CITIESSSSS", action.payload);
        state.cities = action.payload?.cities;
        state.bookingCurrency = action.payload?.currency;
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
        state.vehicleClasses = action.payload?.city?.vehicleClasses;
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
      }) // Fetch Suspended Drivers AsyncThunk states
      .addCase(fetchSuspendedDrivers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSuspendedDrivers.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD SUSPENDED DRIVERS", action.payload);
        state.suspendedDrivers = action.payload?.suspendedDriverAccounts;
        state.isLoading = false;
      })
      .addCase(fetchSuspendedDrivers.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Fetch Approved Drivers AsyncThunk states
      .addCase(fetchApprovedDrivers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchApprovedDrivers.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD DRIVERS", action.payload);
        state.approvedDrivers = action.payload?.drivers;
        // state.driverData = action.payload?.data;
        state.isLoading = false;
      })
      .addCase(fetchApprovedDrivers.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Fetch Unapproved Drivers AsyncThunk states
      .addCase(fetchUnapprovedDrivers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUnapprovedDrivers.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD UNAPPROVED DRIVERS", action.payload);
        state.unapprovedDrivers = action.payload?.drivers;
        // state.driverData = action.payload?.data;
        state.isLoading = false;
      })
      .addCase(fetchUnapprovedDrivers.rejected, (state) => {
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
      }) // Fetch Suspended Vendors AsyncThunk states
      .addCase(fetchSuspendedVendors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSuspendedVendors.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD SUSPENDED VENDORS", action.payload);
        state.suspendedVendors = action.payload?.suspendedVendorAccounts;
        state.isLoading = false;
      })
      .addCase(fetchSuspendedVendors.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Fetch Approved Vendors AsyncThunk states
      .addCase(fetchApprovedVendors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchApprovedVendors.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD VENDORS", action.payload);
        state.approvedVendors = action.payload?.vendors;
        // state.driverData = action.payload?.data;
        state.isLoading = false;
      })
      .addCase(fetchApprovedVendors.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Fetch Unapproved Vendors AsyncThunk states
      .addCase(fetchUnapprovedVendors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUnapprovedVendors.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD UNAPPROVED VENDORS", action.payload);
        state.unapprovedVendors = action.payload?.vendors;
        // state.driverData = action.payload?.data;
        state.isLoading = false;
      })
      .addCase(fetchUnapprovedVendors.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Approve vendor account AsyncThunk states
      .addCase(approveVendorAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(approveVendorAccount.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD APPROVE DRIVER ACCOUNT", action.payload);
        if (action.payload?.status == 201) {
          state.vendors = action.payload?.vendors;
          state.unapprovedVendors = action.payload?.unapprovedVendors;
          toast.success(action.payload?.message);
        } else {
          toast.error(action.payload?.message);
        }
        state.isLoading = false;
      })
      .addCase(approveVendorAccount.rejected, (state) => {
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
      }) // Update Currency AsyncThunk states
      .addCase(updateCurrency.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCurrency.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD UPDATE CURRENCY", action.payload);
        if (action.payload?.status == 201) {
          toast.success(action.payload?.message);
          state.currencies = action.payload?.currencies;
        } else {
          toast.error(action.payload?.message);
        }
        state.isLoading = false;
      })
      .addCase(updateCurrency.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Delete Currency AsyncThunk states
      .addCase(deleteCurrency.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCurrency.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD DELETE CURRENCY", action.payload);
        if (action.payload?.status == 201) {
          toast.success(action.payload?.message);
          state.currencies = action.payload?.currencies;
        } else {
          toast.error(action.payload?.message);
        }
        state.isLoading = false;
      })
      .addCase(deleteCurrency.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Fetch Rates Per Mile AsyncThunk states
      .addCase(fetchRatesPerMile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRatesPerMile.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD FETCH RATE PER MILE", action.payload);
        state.ratesPerMile = action.payload?.ratesPerMile;
        state.isLoading = false;
      })
      .addCase(fetchRatesPerMile.rejected, (state) => {
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
          state.ratesPerMile = action.payload?.ratesPerMile;
        } else {
          toast.error(action.payload?.message);
        }
        state.isLoading = false;
      })
      .addCase(setRatePerMile.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Delete Rate Per Mile AsyncThunk states
      .addCase(deleteRatePerMile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRatePerMile.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD DELETE RATE PER MILE", action.payload);
        state.ratesPerMile = action.payload?.ratesPerMile;
        if (action.payload?.status == 201) {
          toast.success(action.payload?.message);
          state.ratesPerMile = action.payload?.ratesPerMile;
        } else {
          toast.error(action.payload?.message);
        }
        state.isLoading = false;
      })
      .addCase(deleteRatePerMile.rejected, (state) => {
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
      }) // Update Visa On Arrival Rates AsyncThunk states
      .addCase(updateVisaOnArrivalRate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateVisaOnArrivalRate.fulfilled, (state, action) => {
        console.log(
          "ACTION.PAYLOAD UPDATE VISA ON ARRIVAL RATE",
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
      .addCase(updateVisaOnArrivalRate.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Delete Visa On Arrival Rates AsyncThunk states
      .addCase(deleteVisaOnArrivalRate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteVisaOnArrivalRate.fulfilled, (state, action) => {
        console.log(
          "ACTION.PAYLOAD UPDATE VISA ON ARRIVAL RATE",
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
      .addCase(deleteVisaOnArrivalRate.rejected, (state) => {
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
          state.visaOnArrivalRates = action.payload?.visaOnArrivalRates;
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
      }) // Fetch Vehicle Classes AsyncThunk states
      .addCase(fetchVehicleClasses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchVehicleClasses.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD FETCH VEHICLE CLASSES", action.payload);
        state.vehicleClasses = action.payload?.vehicleClasses;
        state.isLoading = false;
      })
      .addCase(fetchVehicleClasses.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Create Vehicle Classes AsyncThunk states
      .addCase(createVehicleClasses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createVehicleClasses.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD CREATE VEHICLE CLASSES", action.payload);
        if (action.payload?.status == 201) {
          toast.success(action.payload?.message);
          state.currentCity = action.payload?.updatedCity;
        } else {
          toast.error(action.payload?.message);
        }
        state.isLoading = false;
      })
      .addCase(createVehicleClasses.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Update Vehicle Classes AsyncThunk states
      .addCase(updateVehicleClass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateVehicleClass.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD UPDATE VEHICLE CLASSES", action.payload);
        if (action.payload?.status == 201) {
          toast.success(action.payload?.message);
          state.currentCity = action.payload?.updatedCity;
          state.cities = action.payload?.cities;
        } else {
          toast.error(action.payload?.message);
        }
        state.isLoading = false;
      })
      .addCase(updateVehicleClass.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Delete Vehicle Classes AsyncThunk states
      .addCase(deleteVehicleClass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteVehicleClass.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD DELETE VEHICLE CLASSES", action.payload);
        if (action.payload?.status == 201) {
          toast.success(action.payload?.message);
          state.currentCity = action.payload?.updatedCity;
        } else {
          toast.error(action.payload?.message);
        }
        state.isLoading = false;
      })
      .addCase(deleteVehicleClass.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Fetch Cars AsyncThunk states
      .addCase(fetchCars.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD FETCH CARS", action.payload);
        state.cars = action.payload?.cars;
        state.isLoading = false;
      })
      .addCase(fetchCars.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Create Car AsyncThunk states
      .addCase(createCar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCar.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD CREATE CAR", action.payload);
        if (action.payload?.status == 201) {
          toast.success(action.payload?.message);
          state.currentCity = action.payload?.updatedCity;
        } else {
          toast.error(action.payload?.message);
        }
        state.isLoading = false;
      })
      .addCase(createCar.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Update Car AsyncThunk states
      .addCase(updateCar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCar.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD UPDATE CAR", action.payload);
        if (action.payload?.status == 201) {
          toast.success(action.payload?.message);
          state.currentCity = action.payload?.updatedCity;
        } else {
          toast.error(action.payload?.message);
        }
        state.isLoading = false;
      })
      .addCase(updateCar.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Delete Car AsyncThunk states
      .addCase(deleteCar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCar.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD DELETE CAR", action.payload);
        if (action.payload?.status == 201) {
          toast.success(action.payload?.message);
          state.currentCity = action.payload?.updatedCity;
        } else {
          toast.error(action.payload?.message);
        }
        state.isLoading = false;
      })
      .addCase(deleteCar.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Fetch Passes AsyncThunk states
      .addCase(fetchPasses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPasses.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD FETCH PASS", action.payload);
        state.passes = action.payload?.passes;
        state.isLoading = false;
      })
      .addCase(fetchPasses.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Create Pass AsyncThunk states
      .addCase(createPass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPass.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD CREATE PASS", action.payload);
        if (action.payload?.status == 201) {
          toast.success(action.payload?.message);
          state.passes = action.payload?.passes;
        } else {
          toast.error(action.payload?.message);
        }
        state.isLoading = false;
      })
      .addCase(createPass.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Update Pass AsyncThunk states
      .addCase(updatePass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePass.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD UPDATE PASS", action.payload);
        if (action.payload?.status == 201) {
          toast.success(action.payload?.message);
          state.passes = action.payload?.passes;
        } else {
          toast.error(action.payload?.message);
        }
        state.isLoading = false;
      })
      .addCase(updatePass.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Delete Pass AsyncThunk states
      .addCase(deletePass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePass.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD DELETE PASS", action.payload);
        if (action.payload?.status == 201) {
          toast.success(action.payload?.message);
          state.passes = action.payload?.passes;
        } else {
          toast.error(action.payload?.message);
        }
        state.isLoading = false;
      })
      .addCase(deletePass.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Fetch Blog Posts AsyncThunk states
      .addCase(fetchBlogPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBlogPosts.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD FETCH BLOG POSTS", action.payload);
        state.blogPosts = action.payload?.blogPosts;
        state.isLoading = false;
      })
      .addCase(fetchBlogPosts.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Create Blog Posts AsyncThunk states
      .addCase(createBlogPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlogPost.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD CREATE BLOG POST", action.payload);
        if (action.payload?.status == 201) {
          toast.success(action.payload?.message);
          state.blogPosts = action.payload?.blogPosts;
        } else {
          toast.error(action.payload?.message);
        }
        state.isLoading = false;
      })
      .addCase(createBlogPost.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Update Blog Posts AsyncThunk states
      .addCase(updateBlogPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBlogPost.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD UPDATE BLOG POST", action.payload);
        if (action.payload?.status == 201) {
          toast.success(action.payload?.message);
          state.blogPosts = action.payload?.blogPosts;
        } else {
          toast.error(action.payload?.message);
        }
        state.isLoading = false;
      })
      .addCase(updateBlogPost.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Delete Blog Post AsyncThunk states
      .addCase(deleteBlogPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlogPost.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD DELETE BLOG POST", action.payload);
        if (action.payload?.status == 201) {
          toast.success(action.payload?.message);
          state.blogPosts = action.payload?.blogPosts;
        } else {
          toast.error(action.payload?.message);
        }
        state.isLoading = false;
      })
      .addCase(deleteBlogPost.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Fetch Upcoming Bookings  AsyncThunk states
      .addCase(adminFetchUpcomingBookings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(adminFetchUpcomingBookings.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD FETCH UPCOMING BOOKINGS", action.payload);
        state.upcomingBookings = action.payload?.upcomingBookings;
        state.isLoading = false;
      })
      .addCase(adminFetchUpcomingBookings.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Fetch Unassigned Bookings  AsyncThunk states
      .addCase(adminFetchBookingsAwaitingAssignment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        adminFetchBookingsAwaitingAssignment.fulfilled,
        (state, action) => {
          console.log(
            "ACTION.PAYLOAD FETCH UNASSIGNED BOOKINGS",
            action.payload
          );
          state.unassignedBookings = action.payload?.bookings;
          state.isLoading = false;
        }
      )
      .addCase(adminFetchBookingsAwaitingAssignment.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Delete Booking AsyncThunk states
      .addCase(deleteBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD DELETE BOOKING", action.payload);
        if (action.payload?.status == 201) {
          toast.success(action.payload?.message);
          state.bookings = action.payload?.bookings;
          state.unassignedBookings = action.payload?.bookingsAwaitingAssignment;
          state.upcomingBookings = action.payload?.upcomingBookings;
        } else {
          toast.error(action.payload?.message);
        }
        state.isLoading = false;
      })
      .addCase(deleteBooking.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Assign To Booking AsyncThunk states
      .addCase(assignToJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(assignToJob.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD ASSIGN TO BOOKING", action.payload);
        if (action.payload?.status == 201) {
          state.unassignedBookings = action.payload?.unassignedBookings;
          toast.success(action.payload?.message);
          state.isLoading = false;
        } else {
          toast.error(action.payload?.message);
          state.isLoading = false;
        }
      })
      .addCase(assignToJob.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // Approve driver account AsyncThunk states
      .addCase(approveDriverAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(approveDriverAccount.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD APPROVE DRIVER ACCOUNT", action.payload);
        if (action.payload?.status == 201) {
          state.drivers = action.payload?.drivers;
          state.unapprovedDrivers = action.payload?.unapprovedDrivers;
          toast.success(action.payload?.message);
        } else {
          toast.error(action.payload?.message);
        }
        state.isLoading = false;
      })
      .addCase(approveDriverAccount.rejected, (state) => {
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
      }) // createAdminAccount AsyncThunk states
      .addCase(createAdminAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAdminAccount.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD GET BOOKING BY REFERENCE", action.payload);
        state.isLoading = false;
        if (action.payload?.status == 201) {
          toast.success(action.payload?.message);
          state.adminAccounts = action.payload?.adminAccounts;
        } else {
          toast.error(action.payload?.message);
        }
      })
      .addCase(createAdminAccount.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // fetchAdminAccounts AsyncThunk states
      .addCase(fetchAdminAccounts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAdminAccounts.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD FETCH ADMIN ACCOUNTS", action.payload);
        state.isLoading = false;
        state.adminAccounts = action.payload?.adminAccounts;
      })
      .addCase(fetchAdminAccounts.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // deleteAdminAccount AsyncThunk states
      .addCase(deleteAdminAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAdminAccount.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD DELETE ADMIN ACCOUNT", action.payload);
        state.isLoading = false;
        if (action.payload?.status == 201) {
          state.adminAccounts = action.payload?.adminAccounts;
          toast.success(action.payload?.message);
        } else {
          toast.error(action.payload?.message);
        }
      })
      .addCase(deleteAdminAccount.rejected, (state) => {
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
      }) // calculateTotal AsyncThunk states
      .addCase(calculateTotal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(calculateTotal.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD", action.payload);
        console.log(
          "ACTION.PAYLOAD voaVerificationStatus",
          action.payload?.voaVerificationStatus
        );
        state.isLoading = false;
        state.bookingTotal = action.payload?.total;
        state.bookingCurrency = action.payload?.userCurrency;
        state.bookingDistance = action.payload?.distance;
        state.tripDuration = action.payload?.duration;

        // For visa on arrival
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
      }) // fetchPayments AsyncThunk states
      .addCase(fetchPayments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD FETCH PAYMENTS", action.payload);
        state.isLoading = false;
        state.payments = action.payload?.payments;
      })
      .addCase(fetchPayments.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // fetchPayment AsyncThunk states
      .addCase(fetchPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPayment.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD FETCH PAYMENTS", action.payload);
        state.isLoading = false;
        state.currentPayment = action.payload?.payment;
      })
      .addCase(fetchPayment.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // fetchAllBookings AsyncThunk states
      .addCase(fetchAllBookings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllBookings.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD FETCH PAYMENTS", action.payload);
        state.isLoading = false;
        state.airportTransferBookings = action.payload?.airportTransferBookings;
        state.carRentalBookings = action.payload?.carRentalBookings;
        state.priorityPassBookings = action.payload?.priorityPassBookings;
        state.visaOnArrivalBookings = action.payload?.visaOnArrivalBookings;
      })
      .addCase(fetchAllBookings.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // updateCity AsyncThunk states
      .addCase(updateCity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCity.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD UPDATE CITY", action.payload);
        state.isLoading = false;
        state.cities = action.payload?.cities;
        if (action.payload?.status === 201) {
          toast.success(action.payload?.message);
        } else {
          toast.error(action.payload?.message);
        }
      })
      .addCase(updateCity.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // deleteCity AsyncThunk states
      .addCase(deleteCity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCity.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD DELETE CITY", action.payload);
        state.isLoading = false;
        state.cities = action.payload?.cities;
        if (action.payload?.status === 201) {
          toast.success(action.payload?.message);
        } else {
          toast.error(action.payload?.message);
        }
      })
      .addCase(deleteCity.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // suspendDriverById AsyncThunk states
      .addCase(suspendDriverById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(suspendDriverById.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD SUSPEND DRIVER", action.payload);
        state.isLoading = false;
        if (action.payload?.status === 201) {
          state.suspendedDrivers = action.payload?.suspendedDriverAccounts;
          state.drivers = action.payload?.drivers;
          toast.success(action.payload?.message);
        } else {
          toast.error(action.payload?.message);
        }
      })
      .addCase(suspendDriverById.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // unsuspendDriverById AsyncThunk states
      .addCase(unsuspendDriverById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unsuspendDriverById.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD UNSUSPEND DRIVER", action.payload);
        state.isLoading = false;
        if (action.payload?.status === 201) {
          state.suspendedDrivers = action.payload?.suspendedDriverAccounts;
          state.drivers = action.payload?.drivers;
          toast.success(action.payload?.message);
        } else {
          toast.error(action.payload?.message);
        }
      })
      .addCase(unsuspendDriverById.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // rejectDriverApplication AsyncThunk states
      .addCase(rejectDriverApplication.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(rejectDriverApplication.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD REJECT DRIVER APPLICATION", action.payload);
        state.isLoading = false;
        if (action.payload?.status === 201) {
          state.suspendedDrivers = action.payload?.suspendedDriverAccounts;
          state.drivers = action.payload?.drivers;
          toast.success(action.payload?.message);
        } else {
          toast.error(action.payload?.message);
        }
      })
      .addCase(rejectDriverApplication.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // suspendVendorById AsyncThunk states
      .addCase(suspendVendorById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(suspendVendorById.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD SUSPEND VENDOR", action.payload);
        state.isLoading = false;
        if (action.payload?.status === 201) {
          state.suspendedVendors = action.payload?.suspendedVendorAccounts;
          state.vendors = action.payload?.vendors;
          toast.success(action.payload?.message);
        } else {
          toast.error(action.payload?.message);
        }
      })
      .addCase(suspendVendorById.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // unsuspendVendorById AsyncThunk states
      .addCase(unsuspendVendorById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unsuspendVendorById.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD UNSUSPEND VENDOR", action.payload);
        state.isLoading = false;
        if (action.payload?.status === 201) {
          state.suspendedVendors = action.payload?.suspendedVendorAccounts;
          state.vendors = action.payload?.vendors;
          toast.success(action.payload?.message);
        } else {
          toast.error(action.payload?.message);
        }
      })
      .addCase(unsuspendVendorById.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      }) // rejectVendorApplication AsyncThunk states
      .addCase(rejectVendorApplication.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(rejectVendorApplication.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD REJECT VENDOR APPLICATION", action.payload);
        state.isLoading = false;
        if (action.payload?.status === 201) {
          state.suspendedVendors = action.payload?.suspendedVendorAccounts;
          state.vendors = action.payload?.vendors;
          toast.success(action.payload?.message);
        } else {
          toast.error(action.payload?.message);
        }
      })
      .addCase(rejectVendorApplication.rejected, (state) => {
        state.isLoading = false;
        state.message =
          "An error occured while we processed your request. Please try again.";
      });
  },
});

export const { setAdmin, setToken, resetMessage, setCurrentCurrency } =
  adminSlice.actions;
export default adminSlice.reducer;
