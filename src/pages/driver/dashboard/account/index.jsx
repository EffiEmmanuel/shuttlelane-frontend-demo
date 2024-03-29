// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import DriverDashboardNavbar from "../../../../components/ui/Driver/DriverDashboardNavbar";
import DriverTopBar from "../../../../components/ui/Driver/DriverTopBar";

// Images
import profilePicPlaceholder from "../../../../assets/images/profilePicture.png";
import DriverSignupStepOne from "../../../../forms/driver/SignupForm/DriverSignupStepOne";
import DriverSignupForm from "../../../../forms/driver/SignupForm";
import { MdQuestionMark } from "react-icons/md";
import { FaCircleExclamation } from "react-icons/fa6";

function DriverDashboardAccountPage() {
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
      <ToastContainer />
      {/* Navbar here */}
      <DriverDashboardNavbar
        link="account"
        isNavbarOpen={isNavbarOpen}
        setIsNavbarOpen={setIsNavbarOpen}
      />

      {/* Main content goes here */}
      <div className="w-full min-h-screen lg:pl-[6%] bg-[#fff] text-shuttlelaneBlack">
        <div className="px-7 py-5 relative z-0">
          {/* Top bar */}
          <DriverTopBar
            isNavbarOpen={isNavbarOpen}
            setIsNavbarOpen={setIsNavbarOpen}
          />

          {/* Main content */}
          <div className="mt-24 pt-2">
            <div className="w-full">
              <div className="flex items-center gap-x-2">
                <div className="h-24 w-24 rounded-full overflow-hidden">
                  <img
                    src={driver?.image}
                    alt={`${driver?.firstName} ${driver?.lastName}`}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-col">
                  <h2 className="font-semibold text-xl text-shuttlelaneBlack">
                    {driver?.firstName} {driver?.lastName}{" "}
                    {driver?.middleName?.split("")[0]}.
                  </h2>
                  <small className="text-sm text-gray-400">
                    Email Address: {driver?.email}
                  </small>
                  <small className="text-sm text-gray-400 mt-1">
                    Mobile: {driver?.mobile}
                  </small>
                </div>
              </div>

              <div className="mt-10">
                {/* Options */}
                <div className="mt-9 flex justify-between items-baseline pb-1 transition-all border-b-[.3px] border-b-gray-200">
                  <div className="flex items-center gap-x-10 gap-y-4 flex-wrap">
                    <span
                      onClick={() => {
                        setIsContactInformation(true);
                        setIsPersonalDetails(false);
                        setIsCarDetails(false);
                        setIsEmergencyContact(false);
                        setIsAdditionalDetails(false);
                        setIsPhoneVerification(false);
                      }}
                      className={`text-xs cursor-pointer transition-all ${
                        isContactInformation
                          ? "font-semibold text-shuttlelaneBlack border-b-2 border-b-shuttlelaneBlack"
                          : "text-gray-400"
                      }`}
                    >
                      Contact Information
                    </span>
                    <span
                      onClick={() => {
                        setIsContactInformation(false);
                        setIsPersonalDetails(true);
                        setIsCarDetails(false);
                        setIsEmergencyContact(false);
                        setIsAdditionalDetails(false);
                        setIsPhoneVerification(false);
                      }}
                      className={`text-xs cursor-pointer transition-all ${
                        isPersonalDetails
                          ? "font-semibold text-shuttlelaneBlack border-b-2 border-b-shuttlelaneBlack"
                          : "text-gray-400"
                      }`}
                    >
                      Personal Details
                    </span>
                    <span
                      onClick={() => {
                        setIsContactInformation(false);
                        setIsPersonalDetails(false);
                        setIsCarDetails(true);
                        setIsEmergencyContact(false);
                        setIsAdditionalDetails(false);
                        setIsPhoneVerification(false);
                      }}
                      className={`text-xs cursor-pointer transition-all ${
                        carDetails
                          ? "font-semibold text-shuttlelaneBlack border-b-2 border-b-shuttlelaneBlack"
                          : "text-gray-400"
                      }`}
                    >
                      Car Details
                    </span>
                    <span
                      onClick={() => {
                        setIsContactInformation(false);
                        setIsPersonalDetails(false);
                        setIsCarDetails(false);
                        setIsEmergencyContact(true);
                        setIsAdditionalDetails(false);
                        setIsPhoneVerification(false);
                      }}
                      className={`text-xs cursor-pointer transition-all ${
                        isEmergencyContact
                          ? "font-semibold text-shuttlelaneBlack border-b-2 border-b-shuttlelaneBlack"
                          : "text-gray-400"
                      }`}
                    >
                      Emergency Contact
                    </span>
                    <span
                      onClick={() => {
                        setIsContactInformation(false);
                        setIsPersonalDetails(false);
                        setIsCarDetails(false);
                        setIsEmergencyContact(false);
                        setIsAdditionalDetails(true);
                        setIsPhoneVerification(false);
                      }}
                      className={`text-xs cursor-pointer transition-all ${
                        isAdditionalDetails
                          ? "font-semibold text-shuttlelaneBlack border-b-2 border-b-shuttlelaneBlack"
                          : "text-gray-400"
                      }`}
                    >
                      Additional Details
                    </span>
                    {!driver?.phoneVerification ? (
                      <span
                        onClick={() => {
                          setIsContactInformation(false);
                          setIsPersonalDetails(false);
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
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-[50%]">
                <DriverSignupForm
                  isUpdateDriverAccount={true}
                  isContactInformation={isContactInformation}
                  isPersonalDetails={isPersonalDetails}
                  carDetails={carDetails}
                  isEmergencyContact={isEmergencyContact}
                  isPhoneVerification={isPhoneVerification}
                  isAdditionalDetails={isAdditionalDetails}
                  // For step seven
                  setIsContactInformation={setIsContactInformation}
                  setIsPersonalDetails={setIsPersonalDetails}
                  setIsCarDetails={setIsCarDetails}
                  setIsEmergencyContact={setIsEmergencyContact}
                  setIsAdditionalDetails={setIsAdditionalDetails}
                  setIsPhoneVerification={setIsPhoneVerification}
                />
                {/* {isPersonalDetails && <AdminVisaOnArrivalRate />} */}
                {/* {carDetails && <AdminVehicleClassesRate />} */}
                {/* {isEmergencyContact && <AdminCarRates />} */}
                {/* {isPhoneVerification && <AdminPriorityPassRates />} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverDashboardAccountPage;
