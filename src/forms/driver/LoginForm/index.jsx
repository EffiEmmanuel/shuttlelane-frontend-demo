// @ts-nocheck
import { useFormik } from "formik";
import React, { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DriverLoginSchema from "./validation";
import { loginDriver } from "../../../redux/slices/driverSlice";

function DriverLoginForm() {
  const navigate = useNavigate();
  const { isLoading, driver, message, requestStatus, token, isAdminLoggedIn } =
    useSelector((store) => store.driver);
  const dispatch = useDispatch();

  // Function: Handle log in admin
  async function onSubmit(values, actions) {
    dispatch(loginDriver({ email: values.email, password: values.password }));
  }

  useEffect(() => {
    if (!isLoading && requestStatus == 200) {
      navigate("/driver/dashboard");
    }
  }, [requestStatus]);

  const { values, errors, handleSubmit, handleChange } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: DriverLoginSchema,
    onSubmit,
  });

  return (
    <div className="px-10 pt-10">
      <ToastContainer />
      <h2 className="font-semibold text-2xl text-shuttlelaneBlack">
        Driver Log in
      </h2>
      <p className="text-sm">Sign in to your driver account</p>

      {/* FORM */}
      <form
        className="text-shuttlelaneBlack mt-10 flex flex-col gap-y-5"
        onSubmit={handleSubmit}
      >
        {/* email */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="email" className="text-sm">
            Email Address
          </label>
          <input
            placeholder="abc@example.com"
            value={values.email}
            onChange={handleChange}
            name="email"
            className="text-[16px] w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
          {errors?.email && (
            <p className="text-sm text-red-400">{errors?.email}</p>
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
            className="text-[16px] w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
          {errors?.password && (
            <p className="text-sm text-red-400">{errors?.password}</p>
          )}
        </div>

        <Link
          className="text-sm -mt-2 hover:text-shuttlelanePurple visited:text-shuttlelaneGold text-shuttlelaneGold hover:no-underline visited:no-underline"
          to="/driver/signup"
        >
          Forgot password?
        </Link>

        <button
          //   type="submit"
          className="lg:w-1/4 w-full h-13 p-3 focus:outline-none bg-shuttlelaneGold flex items-center justify-center text-white border-gray-400 rounded-lg"
        >
          {isLoading ? (
            <ImSpinner2 size={21} className="text-white animate-spin" />
          ) : (
            "Log in"
          )}
        </button>
      </form>

      <div className="flex flex-col mt-3">
        <small>
          Don't have an account?{" "}
          <Link
            className="text-sm hover:text-shuttlelanePurple visited:text-shuttlelaneGold text-shuttlelaneGold hover:no-underline visited:no-underline"
            to="/driver/signup"
          >
            Sign up
          </Link>
        </small>
      </div>
    </div>
  );
}

export default DriverLoginForm;
