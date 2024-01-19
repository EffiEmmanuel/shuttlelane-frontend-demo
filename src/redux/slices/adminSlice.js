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
        supportedCountries: payload?.supportedCountries,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log("CREATE NEW CURRENCY ERROR:", err));
  }
);

// FUNCTION: This function updates a currency
export const updateCurrency = createAsyncThunk(
  "admin/currencies/updateOne",
  async (payload) => {
    return fetch(
      `http://localhost:3001/api/v1/admin/currencies/${payload?._id}`,
      {
        method: "PUT",
        headers: {
          token: `Bearer ${JSON.parse(payload?.token)}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currencyLabel: payload?.currencyLabel,
          exchangeRate: payload?.exchangeRate,
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
      `http://localhost:3001/api/v1/admin/currencies/${payload?._id}`,
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
        isNigerianVisaRequired: payload?.isNigerianVisaRequired,
      }),
    })
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
    return fetch(
      `http://localhost:3001/api/v1/admin/visa-on-arrival-rates/${payload?._id}`,
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
      `http://localhost:3001/api/v1/admin/visa-on-arrival-rates/${payload?._id}`,
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
      `http://localhost:3001/api/v1/vehicle-classes?isAdminRequest=true`,
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
        return fetch(`http://localhost:3001/api/v1/admin/vehicle-classes`, {
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
// FUNCTION: This function updates a vehicle classe
export const updateVehicleClass = createAsyncThunk(
  "admin/vehicle-classes/updateOne",
  async (payload) => {
    switch (typeof payload?.image) {
      // If the image was not updated, no need to upload anything to cloudinary
      case "string":
        return fetch(
          `http://localhost:3001/api/v1/admin/vehicle-classes/${payload?.vehicleClassId}`,
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
              `http://localhost:3001/api/v1/admin/vehicle-classes/${payload?.vehicleClassId}`,
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
    return fetch(
      `http://localhost:3001/api/v1/admin/vehicle-classes/${payload?.vehicleClassId}`,
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
    return fetch(`http://localhost:3001/api/v1/cars`, {
      headers: {
        token: `Bearer ${JSON.parse(token)}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log("FETCH CARS ERROR:", err));
  }
);
// FUNCTION: This function creates a car
export const createCar = createAsyncThunk(
  "admin/cars/createOne",
  async (payload) => {
    console.log("payload.image:::", payload.image);

    return fetch(`http://localhost:3001/api/v1/admin/cars`, {
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
      .catch((err) => console.log("CREATE CAR ERROR:", err));
  }
);
// FUNCTION: This function updates a car
export const updateCar = createAsyncThunk(
  "admin/cars/updateOne",
  async (payload) => {
    return fetch(`http://localhost:3001/api/v1/admin/cars/${payload?.carId}`, {
      method: "PUT",
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
      .catch((err) => console.log("UPDATE CAR ERROR:", err));
  }
);
// FUNCTION: This function deletes a car
export const deleteCar = createAsyncThunk(
  "admin/car/deleteOne",
  async (payload) => {
    return fetch(`http://localhost:3001/api/v1/admin/cars/${payload?.carId}`, {
      method: "DELETE",
      headers: {
        token: `Bearer ${JSON.parse(payload?.token)}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log("DELETE CAR ERROR:", err));
  }
);

// PRIORITY PASS RATES
// FUNCTION: This function fetches passes
export const fetchPasses = createAsyncThunk(
  "admin/passes/getAll",
  async (token) => {
    return fetch(`http://localhost:3001/api/v1/passes?isAdminRequest=true`, {
      headers: {
        token: `Bearer ${JSON.parse(token)}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log("FETCH PASSES ERROR:", err));
  }
);
// FUNCTION: This function creates a pass
export const createPass = createAsyncThunk(
  "admin/passes/createOne",
  async (payload) => {
    console.log("payload.image:::", payload.image);

    return fetch(`http://localhost:3001/api/v1/admin/passes`, {
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
      `http://localhost:3001/api/v1/admin/passes/${payload?.passId}`,
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
      `http://localhost:3001/api/v1/admin/passes/${payload?.passId}`,
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
    return fetch(`http://localhost:3001/api/v1/blog-posts`, {})
      .then((res) => res.json())
      .catch((err) => console.log("FETCH BLOG OPSTS ERROR:", err));
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
        return fetch(`http://localhost:3001/api/v1/admin/blog-posts`, {
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
          `http://localhost:3001/api/v1/admin/blog-posts/${payload?.blogPostId}`,
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
              `http://localhost:3001/api/v1/admin/blog-posts/${payload?.blogPostId}`,
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
      `http://localhost:3001/api/v1/admin/blog-posts/${payload?.blogPostId}`,
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
          state.vehicleClasses = action.payload?.vehicleClasses;
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
          state.vehicleClasses = action.payload?.vehicleClasses;
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
          state.vehicleClasses = action.payload?.vehicleClasses;
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
          state.cars = action.payload?.cars;
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
          state.cars = action.payload?.cars;
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
          state.cars = action.payload?.cars;
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
      });
  },
});

export const { setAdmin, setToken, resetMessage, setCurrentCurrency } =
  adminSlice.actions;
export default adminSlice.reducer;
