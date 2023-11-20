// @ts-nocheck
import { useFormik } from "formik";
import React, { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import AdminLoginSchema from "./validation";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin, resetMessage } from "../../../redux/slices/adminSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
import axios from "axios";

function AdminLoginForm() {
  const navigate = useNavigate();
  const { isLoading, admin, message, requestStatus, token, isAdminLoggedIn } =
    useSelector((store) => store.admin);
  const dispatch = useDispatch();

  // Function: Handle log in admin
  async function onSubmit(values, actions) {
    dispatch(
      loginAdmin({ username: values.username, password: values.password })
    );
  }

  useEffect(() => {
    if (!isLoading && requestStatus == 200) {
      navigate("/admin/dashboard");
    }
  }, [requestStatus]);

  const { values, errors, handleSubmit, handleChange } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: AdminLoginSchema,
    onSubmit,
  });

  return (
    <div className="px-10 pt-10">
      <ToastContainer />
      <h2 className="font-semibold text-2xl text-shuttlelaneBlack">
        Admin Log in
      </h2>
      <p className="text-sm">Sign in to your admin account</p>

      {/* FORM */}
      <form
        className="text-shuttlelaneBlack mt-10 flex flex-col gap-y-5"
        onSubmit={handleSubmit}
      >
        {/* Username */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="username" className="text-sm">
            Username
          </label>
          <input
            placeholder="admin"
            value={values.username}
            onChange={handleChange}
            name="username"
            className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
          {errors?.username && (
            <p className="text-sm text-red-400">{errors?.username}</p>
          )}
        </div>
        {/* Password */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="password" className="text-sm">
            Password
          </label>
          <input
            type="password"
            placeholder="********"
            name="password"
            value={values.password}
            onChange={handleChange}
            className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
          {errors?.password && (
            <p className="text-sm text-red-400">{errors?.password}</p>
          )}
        </div>

        <button
          //   type="submit"
          className="lg:w-1/4 w-full h-13 p-3 border-[0.3px] focus:outline-none bg-shuttlelanePurple flex items-center justify-center text-white border-gray-400 rounded-lg"
        >
          {isLoading ? (
            <ImSpinner2 size={21} className="text-white animate-spin" />
          ) : (
            "Log in"
          )}
        </button>
      </form>
    </div>
  );
}

export default AdminLoginForm;
