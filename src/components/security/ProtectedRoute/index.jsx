import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, redirect, useNavigate } from "react-router-dom";
import { setAdmin, setToken } from "../../../redux/slices/adminSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useMemo } from "react";

export function AdminProtectedRoute({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const adminToken = localStorage.getItem("adminToken");

  async function verifyToken() {
    try {
      const res = await axios.post(
        `http://localhost:3001/api/v1/auth/verify-token`,
        JSON.stringify({
          token: JSON.parse(adminToken),
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data?.status === 200) {
        const admin = JSON.parse(localStorage.getItem("admin"));
        dispatch(setAdmin(admin));
        dispatch(setToken(adminToken));
      } else {
        navigate("/admin");
        toast.error("Session expired. Please log in to view your dashboard");
      }
    } catch (err) {
      console.log("VERIFY ERROR:", err);
      if (err?.response?.data?.status === 403) {
        navigate("/admin");
        toast.error("Session expired. Please log in to view your dashboard");
      }
    }
  }

  const isAdminLoggedIn = useMemo(() => {
    if (adminToken) {
      verifyToken();
      return true; // Assume admin is logged in; actual status will be updated after token verification
    }
    return false;
  }, [adminToken]);

  return <>{isAdminLoggedIn ? children : <Navigate to="/admin" replace />}</>;
}

export function DriverProtectedRoute({ children }) {
  // Check if driver is logged in
  const isDriverLoggedIn = localStorage.getItem("driverToken");

  if (!isDriverLoggedIn) {
    return <Navigate to="/driver/login" replace />;
  } else {
    return children;
  }
}

export function VendorProtectedRoute({ children }) {
  // Check if vendor is logged in
  const isVendorLoggedIn = localStorage.getItem("vendorToken");

  if (!isVendorLoggedIn) {
    return <Navigate to="/vendor/login" replace />;
  } else {
    return children;
  }
}
