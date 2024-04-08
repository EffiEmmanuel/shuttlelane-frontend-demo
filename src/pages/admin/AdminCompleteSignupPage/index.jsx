// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import AdminLoginForm from "../../../forms/admin/AdminLoginForm";
import { Helmet } from "react-helmet";

// Images
import arrowAsset from "../../../assets/images/arrow-asset.svg";
import shuttlelaneLogo from "../../../assets/logos/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../../../redux/slices/adminSlice";
import AdminCompleteSignupForm from "../../../forms/admin/AdminCompleteSignupForm";

function AdminCompleteSignupPage(props) {
  return (
    <div className="flex min-h-screen">
      <Helmet>
        <title>Complete Admin Account Sign Up | Shuttlelane</title>
      </Helmet>

      <div className="lg:w-[50vw] overflow-hidden h-screen bg-shuttlelanePurple fixed z-[40] lg:flex flex-col justify-center items-center hidden">
        <div className="absolute overflow-hidden top-0 left-0 w-full h-full">
          <img
            src={arrowAsset}
            className="object-cover w-full h-full opacity-30"
          />
        </div>

        <div className="flex flex-col gapy-y-10">
          <h1 className="text-[17rem] spaceGroteskText text-white opacity-5">
            Admin
          </h1>
        </div>
      </div>
      {/* Driver Signup Form */}
      <div className="lg:pl-[50%] w-full max-w-screen h-[89vh] overflow-x-hidden pb-16">
        <div className="w-full pt-10 px-7 flex relative">
          <img src={shuttlelaneLogo} className="object-contain w-36" />
        </div>

        <AdminCompleteSignupForm />
      </div>
    </div>
  );
}

export default AdminCompleteSignupPage;
