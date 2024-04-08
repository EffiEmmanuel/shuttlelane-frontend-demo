// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import VendorDashboardNavbar from "../../../../../components/ui/Vendor/VendorDashboardNavbar";
import VendorTopBar from "../../../../../components/ui/Vendor/VendorTopBar";
import VendorResetPasswordForm from "../../../../../forms/vendor/ResetPasswordForm";
import { Helmet } from "react-helmet";

function VendorDashboardSecurityPage() {
  const { token, isLoading, vendor } = useSelector((store) => store.vendor);
  const dispatch = useDispatch();

  // Mobile navbar handler
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  // Page options
  const [isContactInformation, setIsContactInformation] = useState(true);
  const [isContactDetails, setIsContactDetails] = useState(false);
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
          Vendor Security - Reset Password | Shuttlelane Portal Vendor Dashboard
        </title>
      </Helmet>

      <ToastContainer />
      {/* Navbar here */}

      <VendorDashboardNavbar
        link="security"
        isNavbarOpen={isNavbarOpen}
        setIsNavbarOpen={setIsNavbarOpen}
      />

      {/* Main content goes here */}
      <div className="w-full min-h-screen lg:pl-[6%] bg-white text-shuttlelaneBlack">
        <div className="px-7 py-5 relative">
          {/* Top bar */}
          <VendorTopBar
            isNavbarOpen={isNavbarOpen}
            setIsNavbarOpen={setIsNavbarOpen}
          />

          {/* Main content */}
          <div className="mt-24 pt-2">
            <div className="w-full">
              <div className="w-full lg:w-[50%]">
                <VendorResetPasswordForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorDashboardSecurityPage;
