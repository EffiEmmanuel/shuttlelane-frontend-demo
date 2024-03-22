import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, redirect, useNavigate } from "react-router-dom";
import { setAdmin, setToken } from "../../../redux/slices/adminSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useMemo } from "react";
import { setDriver, setDriverToken } from "../../../redux/slices/driverSlice";
import { setVendor, setVendorToken } from "../../../redux/slices/vendorSlice";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const driverToken = localStorage.getItem("driverToken");

  async function verifyToken() {
    try {
      const res = await axios.post(
        `http://localhost:3001/api/v1/auth/verify-token`,
        JSON.stringify({
          token: JSON.parse(driverToken),
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data?.status === 200) {
        const driver = JSON.parse(localStorage.getItem("driver"));
        dispatch(setDriver(driver));
        dispatch(setDriverToken(driverToken));
      } else {
        navigate("/driver/login");
        toast.error(
          "Session expired. Please log in to continue to your dashboard"
        );
      }
    } catch (err) {
      console.log("VERIFY ERROR:", err);
      if (err?.response?.data?.status === 403) {
        navigate("/driver/login");
        toast.error(
          "Session expired. Please log in to continue to your dashboard"
        );
      }
    }
  }

  const isDriverLoggedIn = useMemo(() => {
    if (driverToken) {
      verifyToken();
      return true; // Assume driver is logged in; actual status will be updated after token verification
    }
    return false;
  }, [driverToken]);

  return (
    <>{isDriverLoggedIn ? children : <Navigate to="/driver/login" replace />}</>
  );
}

export function VendorProtectedRoute({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const vendorToken = localStorage.getItem("vendorToken");

  async function verifyToken() {
    try {
      const res = await axios.post(
        `http://localhost:3001/api/v1/auth/verify-token`,
        JSON.stringify({
          token: JSON.parse(vendorToken),
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data?.status === 200) {
        const vendor = JSON.parse(localStorage.getItem("vendor"));
        dispatch(setVendor(vendor));
        dispatch(setVendorToken(vendorToken));
      } else {
        navigate("/vendor/login");
        toast.error(
          "Session expired. Please log in to continue to your dashboard"
        );
      }
    } catch (err) {
      console.log("VERIFY ERROR:", err);
      if (err?.response?.data?.status === 403) {
        navigate("/vendor/login");
        toast.error(
          "Session expired. Please log in to continue to your dashboard"
        );
      }
    }
  }

  const isVendorLoggedIn = useMemo(() => {
    if (vendorToken) {
      verifyToken();
      return true; // Assume vendor is logged in; actual status will be updated after token verification
    }
    return false;
  }, [vendorToken]);

  return (
    <>{isVendorLoggedIn ? children : <Navigate to="/vendor/login" replace />}</>
  );
}
