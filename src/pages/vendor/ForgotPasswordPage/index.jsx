// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import VendorForgotPasswordForm from "../../../forms/vendor/ForgotPasswordForm";

// Images
import arrowAsset from "../../../assets/images/arrow-asset.svg";
import shuttlelaneLogo from "../../../assets/logos/logo.png";

function VendorForgotPasswordPage(props) {
  return (
    <div className="flex min-h-screen">
      <Helmet>
        <title>Vendor Forgot Password: Reset Your Password</title>
      </Helmet>

      <div className="lg:w-[50vw] overflow-hidden h-screen vendorSignupBg fixed z-[40] lg:flex flex-col justify-center items-center hidden">
        <div className="absolute overflow-hidden top-0 left-0 w-full h-full">
          <img
            src={arrowAsset}
            className="object-cover w-full h-full opacity-30"
          />
        </div>

        <div className="flex flex-col gapy-y-10">
          <h1 className="text-[17rem] spaceGroteskText text-white opacity-5">
            Vendor
          </h1>
        </div>
      </div>
      {/* Vendor Forgot Password Form */}
      <div className="lg:pl-[50%] w-full max-w-screen h-[89vh] overflow-x-hidden pb-16">
        <div className="w-full pt-10 px-7 flex relative">
          <img src={shuttlelaneLogo} className="object-contain w-36" />
        </div>

        <VendorForgotPasswordForm />
      </div>
    </div>
  );
}

export default VendorForgotPasswordPage;
