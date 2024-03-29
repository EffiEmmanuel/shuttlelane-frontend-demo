// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import profilePicPlaceholder from "../../../../assets/images/profilePicture.png";
import VendorSignupStepOne from "../../../../forms/vendor/SignupForm/VendorSignupStepOne";
import VendorSignupForm from "../../../../forms/vendor/SignupForm";
import { MdQuestionMark } from "react-icons/md";
import { FaCircleExclamation } from "react-icons/fa6";
import VendorDashboardNavbar from "../../../../components/ui/Vendor/VendorDashboardNavbar";
import VendorTopBar from "../../../../components/ui/Vendor/VendorTopBar";
import moment from "moment";

// Images

function VendorDashboardAccountPage() {
  const { token, isLoading, vendor } = useSelector((store) => store.vendor);
  const dispatch = useDispatch();

  // Mobile navbar handler
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  // Page options
  const [isCompanyInformation, setIsCompanyInformation] = useState(true);
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
      <ToastContainer />
      {/* Navbar here */}
      <VendorDashboardNavbar
        link="account"
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
              <div className="flex items-center gap-x-2">
                <div className="h-24 w-24 rounded-full bg-shuttlelanePurple flex justify-center items-center overflow-hidden">
                  <h1 className="text-white">
                    {vendor?.companyName?.split("")[0]}
                  </h1>
                </div>

                <div className="flex flex-col">
                  <h2 className="font-semibold text-xl text-shuttlelaneBlack">
                    {vendor?.companyName}
                  </h2>
                  <small className="text-sm text-gray-400">
                    Email Address: {vendor?.companyEmail}
                  </small>
                  <small className="text-sm text-gray-400 mt-1">
                    Mobile: {vendor?.contactMobile}
                  </small>
                  {vendor?.isOpen24Hours === true ? (
                    <small className="text-sm text-green-400 mt-1">
                      Opens 24 Hours
                    </small>
                  ) : (
                    <>
                      <small className="text-sm text-gray-400 mt-1">
                        Opening Hours:{" "}
                        {moment(vendor?.openingHours).format("HH:MM A")}
                      </small>
                      <small className="text-sm text-gray-400 mt-1">
                        Closing Hours:{" "}
                        {moment(vendor?.closingHours).format("HH:MM A")}
                      </small>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-10">
                {/* Options */}
                <div className="mt-9 flex justify-between items-baseline pb-1 transition-all border-b-[.3px] border-b-gray-200">
                  <div className="flex items-center gap-x-10 gap-y-4 flex-wrap">
                    <span
                      onClick={() => {
                        setIsCompanyInformation(true);
                        setIsContactDetails(false);
                        setIsCarDetails(false);
                        setIsEmergencyContact(false);
                        setIsAdditionalDetails(false);
                        setIsPhoneVerification(false);
                      }}
                      className={`text-xs cursor-pointer transition-all ${
                        isCompanyInformation
                          ? "font-semibold text-shuttlelaneBlack border-b-2 border-b-shuttlelaneBlack"
                          : "text-gray-400"
                      }`}
                    >
                      Company Information
                    </span>
                    <span
                      onClick={() => {
                        setIsCompanyInformation(false);
                        setIsContactDetails(true);
                        setIsCarDetails(false);
                        setIsEmergencyContact(false);
                        setIsAdditionalDetails(false);
                        setIsPhoneVerification(false);
                      }}
                      className={`text-xs cursor-pointer transition-all ${
                        isContactDetails
                          ? "font-semibold text-shuttlelaneBlack border-b-2 border-b-shuttlelaneBlack"
                          : "text-gray-400"
                      }`}
                    >
                      Contact Details
                    </span>
                    {/* 
                    {!vendor?.phoneVerification ? (
                      <span
                        onClick={() => {
                          setIsCompanyInformation(false);
                          setIsContactDetails(false);
                          setIsCarDetails(false);
                          setIsEmergencyContact(false);
                          setIsAdditionalDetails(false);
                          setIsPhoneVerification(true);
                        }}
                        className={`text-xs flex flex-row gap-x-2 items-center cursor-pointer transition-all ${
                          isPhoneVerification
                            ? "font-semibold text-red-400"
                            : "text-red-400"
                        }`}
                      >
                        <span className="text-xs">Verify Phone Number</span>
                        <FaCircleExclamation size={14} />
                      </span>
                    ) : null} */}
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-[50%]">
                <VendorSignupForm
                  isUpdateVendorAccount={true}
                  isCompanyInformation={isCompanyInformation}
                  isContactDetails={isContactDetails}
                  carDetails={carDetails}
                  isEmergencyContact={isEmergencyContact}
                  isPhoneVerification={isPhoneVerification}
                  isAdditionalDetails={isAdditionalDetails}
                  // For step four
                  setIsCompanyInformation={setIsCompanyInformation}
                  setIsContactDetails={setIsContactDetails}
                  setIsCarDetails={setIsCarDetails}
                  setIsEmergencyContact={setIsEmergencyContact}
                  setIsAdditionalDetails={setIsAdditionalDetails}
                  setIsPhoneVerification={setIsPhoneVerification}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorDashboardAccountPage;
