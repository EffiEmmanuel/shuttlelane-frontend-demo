// @ts-nocheck
import { useFormik } from "formik";
import React, { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import VendorResetForgotPasswordSchema from "./validation";
import { vendorResetForgottenPassword } from "../../../redux/slices/vendorSlice";

function VendorResetForgotPasswordForm() {
  // Get vid from URL
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const vid = searchParams.get("vid");

  const navigate = useNavigate();
  const {
    isLoading,
    vendor,
    message,
    requestStatus,
    token,
    isAdminLoggedIn,
    hasResetPassword,
  } = useSelector((store) => store.vendor);
  const dispatch = useDispatch();

  // Function: Handle send password reset link
  async function onSubmit(values, actions) {
    dispatch(
      vendorResetForgottenPassword({ password: values.password, vendorId: vid })
    );
  }

  useEffect(() => {
    if (!isLoading && requestStatus == 200) {
      navigate("/vendor/dashboard");
    }
  }, [requestStatus]);

  const { values, errors, handleSubmit, handleChange } = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: VendorResetForgotPasswordSchema,
    onSubmit,
  });

  return (
    <div className="px-10 pt-10">
      <ToastContainer />
      <h2 className="font-semibold text-2xl text-shuttlelaneBlack">
        Reset Password
      </h2>
      <p className="text-sm">Set a new password for your vendor account</p>

      {/* FORM */}
      {hasResetPassword ? (
        <div className="w-full mt-3">
          <p>
            Your password has been successfully reset. You can now proceed to{" "}
            <Link to="/vendor/login" className="text-shuttlelanePurple">
              Log in
            </Link>
          </p>
        </div>
      ) : (
        <>
          <form
            className="text-shuttlelaneBlack mt-10 flex flex-col gap-y-5"
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
              className="lg:w-1/4 w-full h-13 p-3 focus:outline-none bg-shuttlelanePurple flex items-center justify-center text-white border-gray-400 rounded-lg"
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

export default VendorResetForgotPasswordForm;
