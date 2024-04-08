// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { MdQuestionMark } from "react-icons/md";
import { FaCircleExclamation } from "react-icons/fa6";
import DriverDashboardNavbar from "../../../../../components/ui/Driver/DriverDashboardNavbar";
import DriverTopBar from "../../../../../components/ui/Driver/DriverTopBar";
import DriverResetPasswordForm from "../../../../../forms/driver/ResetPasswordForm";
import { Helmet } from "react-helmet";

function DriverDashboardSecurityPage() {
  const { token, isLoading, driver } = useSelector((store) => store.driver);
  const dispatch = useDispatch();

  // Mobile navbar handler
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  // Page options
  const [isContactInformation, setIsContactInformation] = useState(true);
  const [isPersonalDetails, setIsPersonalDetails] = useState(false);
  const [carDetails, setIsCarDetails] = useState(false);
  const [isEmergencyContact, setIsEmergencyContact] = useState(false);
  const [isPhoneVerification, setIsPhoneVerification] = useState(false);
  const [isAdditionalDetails, setIsAdditionalDetails] = useState(false);

  // Form Fields
  const [rate, setRate] = useState();
  const [mile, setMile] = useState();

  return (
    <div className="">
      <Helmet>
        <title>
          Driver Security - Reset Password | Shuttlelane Portal Driver Dashboard
        </title>
      </Helmet>

      <ToastContainer />
      {/* Navbar here */}
      <DriverDashboardNavbar
        link="security"
        isNavbarOpen={isNavbarOpen}
        setIsNavbarOpen={setIsNavbarOpen}
      />

      {/* Main content goes here */}
      <div className="w-full min-h-screen lg:pl-[6%] bg-white text-shuttlelaneBlack">
        <div className="px-7 py-5 relative">
          {/* Top bar */}
          <DriverTopBar
            isNavbarOpen={isNavbarOpen}
            setIsNavbarOpen={setIsNavbarOpen}
          />

          {/* Main content */}
          <div className="mt-24 pt-2">
            <div className="w-full">
              <div className="w-full lg:w-[50%]">
                <DriverResetPasswordForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverDashboardSecurityPage;
