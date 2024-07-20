// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
// import AdminLoginForm from "../../../forms/admin/AdminLoginForm";
import { Helmet } from "react-helmet";

// Images
import arrowAsset from "../../../assets/images/arrow-asset.svg";
import shuttlelaneLogo from "../../../assets/logos/logo.png";
import DriverLoginForm from "../../../forms/driver/LoginForm";
import DriverForgotPasswordForm from "../../../forms/driver/ForgotPasswordForm";

function DriverForgotPasswordPage(props) {
  return (
    <div className="flex min-h-screen">
      <Helmet>
        <title>Driver Forgot Password: Reset Your Password</title>
      </Helmet>

      <div className="lg:w-[50vw] overflow-hidden h-screen driverSignupBg fixed z-[40] lg:flex flex-col justify-center items-center hidden">
        <div className="absolute overflow-hidden top-0 left-0 w-full h-full">
          <img
            src={arrowAsset}
            className="object-cover w-full h-full opacity-30"
          />
        </div>

        <div className="flex flex-col gapy-y-10">
          <h1 className="text-[17rem] spaceGroteskText text-white opacity-5">
            Driver
          </h1>
        </div>
      </div>
      {/* Driver Reset Password Form */}
      <div className="lg:pl-[50%] w-full max-w-screen h-[89vh] overflow-x-hidden pb-16">
        <div className="w-full pt-10 px-7 flex relative">
          <img src={shuttlelaneLogo} className="object-contain w-36" />
        </div>

        <DriverForgotPasswordForm />
      </div>
    </div>
  );
}

export default DriverForgotPasswordPage;
