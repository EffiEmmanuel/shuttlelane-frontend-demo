// @ts-nocheck
import { useFormik } from "formik";
import React, { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { driverResetForgottenPassword } from "../../../redux/slices/driverSlice";
import DriverResetForgotPasswordSchema from "./validation";

function DriverResetForgotPasswordForm() {
  // Get did from URL
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const did = searchParams.get("did");

  const navigate = useNavigate();
  const {
    isLoading,
    driver,
    message,
    requestStatus,
    token,
    isAdminLoggedIn,
    hasResetPassword,
  } = useSelector((store) => store.driver);
  const dispatch = useDispatch();

  // Function: Handle log in admin
  async function onSubmit(values, actions) {
    dispatch(
      driverResetForgottenPassword({ password: values.password, driverId: did })
    );
  }

  const { values, errors, handleSubmit, handleChange } = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: DriverResetForgotPasswordSchema,
    onSubmit,
  });

  return (
    <div className="px-10 pt-10">
      <ToastContainer />
      <h2 className="font-semibold text-2xl text-shuttlelaneBlack">
        Reset Password
      </h2>
      <p className="text-sm">Set a new password for your driver account</p>

      {/* FORM */}
      {hasResetPassword ? (
        <div className="w-full mt-3">
          <p>
            Your password has been successfully reset. You can now proceed to{" "}
            <Link to="/driver/login" className="text-shuttlelaneGold">
              Log in
            </Link>
          </p>
        </div>
      ) : (
        <>
          <form
            className="text-shuttlelaneBlack mt-5 flex flex-col gap-y-5"
            onSubmit={handleSubmit}
          >
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

            <button
              //   type="submit"
              className="lg:w-1/4 w-full h-13 p-3 focus:outline-none bg-shuttlelaneGold flex items-center justify-center text-white border-gray-400 rounded-lg"
            >
              {isLoading ? (
                <ImSpinner2 size={21} className="text-white animate-spin" />
              ) : (
                "Reset password"
              )}
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default DriverResetForgotPasswordForm;
