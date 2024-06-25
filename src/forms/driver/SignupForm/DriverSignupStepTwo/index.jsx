import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import DatePicker from "rsuite/DatePicker";
import "rsuite/dist/rsuite.css";
import enGB from "date-fns/locale/en-GB";
import { ImSpinner2 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import {
  updateDriver,
  verifyBVN,
  verifyDriversLicense,
  verifyNIN,
} from "../../../../redux/slices/driverSlice";
import { validateFields } from "../../../../util";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import moment from "moment";

function DriverSignupStepTwo({
  isStepTwo,
  stepTwoStates,
  stepOneStates,
  isUpdateDriverAccount,
}) {
  const genderOptions = [
    {
      value: "Male",
      label: "Male",
    },
    {
      value: "Female",
      label: "Female",
    },
    {
      value: "Prefer not to say",
      label: "Prefer not to say",
    },
  ];
  const maritalStatusOptions = [
    {
      value: "Married",
      label: "Married",
    },
    {
      value: "Single",
      label: "Single",
    },
    {
      value: "Divorced",
      label: "Divorced",
    },
    {
      value: "Prefer not to say",
      label: "Prefer not to say",
    },
  ];
  const educationOptions = [
    {
      value: "Primary",
      label: "Primary",
    },
    {
      value: "Secondary",
      label: "Secondary",
    },
    {
      value: "Polytechnic",
      label: "Polytechnic",
    },
    {
      value: "University",
      label: "University",
    },
    {
      value: "Other",
      label: "Other",
    },
  ];

  // Scroll to top handler
  const scrollTopRef = useRef(null);
  useEffect(() => {
    if (!isUpdateDriverAccount) {
      scrollTopRef.current.scrollIntoView();
    }
  }, [isStepTwo]);

  // UPDATE DRIVER STATES
  const {
    isLoading,
    token,
    driver,
    isVerifyingLicense,
    isVerifyingBVN,
    isVerifyingNIN,
    isBVNVerified,
    isNINVerified,
    isLicenseVerified,
    bvnResponseData,
    ninResponseData,
    licenseResponseData,
  } = useSelector((store) => store.driver);
  const dispatch = useDispatch();

  // UPDATE DRIVER HANDLER
  async function handleUpdateDriver(e) {
    e.preventDefault();
    const areFieldsEmpty = validateFields([
      stepTwoStates?.dateOfBirth,
      stepTwoStates?.address,
      stepTwoStates?.city,
      stepTwoStates?.state,
      stepTwoStates?.maritalStatus,
      stepTwoStates?.bvn,
      stepTwoStates?.nin,
      stepTwoStates?.accountNumber,
      stepTwoStates?.accountName,
      stepTwoStates?.bank,
      stepTwoStates?.driverLicense,
    ]);
    if (areFieldsEmpty) {
      toast.error(areFieldsEmpty?.message);
    } else {
      const values = {
        dateOfBirth: stepTwoStates?.dateOfBirth,
        address: stepTwoStates?.address,
        city: stepTwoStates?.city,
        state: stepTwoStates?.state,
        maritalStatus: stepTwoStates?.maritalStatus?.value,
        bvn: stepTwoStates?.bvn,
        nin: stepTwoStates?.nin,
        accountNumber: stepTwoStates?.accountNumber,
        accountName: stepTwoStates?.accountName,
        bank: stepTwoStates?.bank,
        driverLicense: stepTwoStates?.driverLicense,
      };

      dispatch(
        updateDriver({
          values: { ...values },
          token: token,
          driverId: driver?._id,
        })
      );
    }
  }

  // VERIFY IDENTITY HANDLERS
  // Verify driver's BVN
  async function handleVerifyBVN(bvn) {
    // Parse the date string into a Date object
    const date = new Date(stepTwoStates?.dateOfBirth);

    // Extract day, month, and year
    const day = String(date.getDate()).padStart(2, "0"); // Get day and ensure it's two digits
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (0-11), so add 1 and ensure it's two digits
    const year = date.getFullYear(); // Get full year

    // Format the date into DD-MM-YYYY
    const formattedDate = `${day}-${month}-${year}`;

    console.log("FORMATED DATE:", formattedDate);

    dispatch(
      verifyBVN({
        bvn: bvn,
        firstName: stepOneStates?.firstName,
        lastName: stepOneStates?.lastName,
        dob: formattedDate,
      })
    );
  }
  // Verify driver's NIN
  async function handleVerifyNIN(nin) {
    // Parse the date string into a Date object
    const date = new Date(stepTwoStates?.dateOfBirth);

    // Extract day, month, and year
    const day = String(date.getDate()).padStart(2, "0"); // Get day and ensure it's two digits
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (0-11), so add 1 and ensure it's two digits
    const year = date.getFullYear(); // Get full year

    // Format the date into DD-MM-YYYY
    const formattedDate = `${day}-${month}-${year}`;

    dispatch(
      verifyNIN({
        nin: nin,
        firstName: stepOneStates?.firstName,
        lastName: stepOneStates?.lastName,
        dob: formattedDate,
      })
    );
  }
  // Verify driver's license
  async function handleVerifyDriversLicense(license) {
    // Parse the date string into a Date object
    const date = new Date(stepTwoStates?.dateOfBirth);

    // Extract day, month, and year
    const day = String(date.getDate()).padStart(2, "0"); // Get day and ensure it's two digits
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (0-11), so add 1 and ensure it's two digits
    const year = date.getFullYear(); // Get full year

    // Format the date into DD-MM-YYYY
    const formattedDate = `${day}-${month}-${year}`;

    dispatch(
      verifyDriversLicense({
        license: license,
        firstName: stepOneStates?.firstName,
        lastName: stepOneStates?.lastName,
        dob: formattedDate,
      })
    );
  }

  return (
    <div
      className={`${!isUpdateDriverAccount && "px-10 pt-10"}`}
      ref={scrollTopRef}
    >
      {!isUpdateDriverAccount && (
        <>
          <Link
            to="/"
            className="mb-5 flex flex-row items-center gap-x-2 text-shuttlelaneBlack hover:underline no-underline visited:no-underline hover:text-shuttlelaneBlack visited:text-shuttlelaneBlack"
          >
            <BsArrowLeft size={14} className="text-shuttlelaneBlack" />
            <span className="text-xs">Go back to Homepage</span>
          </Link>
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-2xl text-shuttlelaneBlack">
              Personal Details
            </h2>

            {/* <button className="h-5 w-16 text-sm flex items-center justify-center border-[.3px] border-shuttlelaneBlack rounded-full p-2">
          Skip
        </button> */}
          </div>
          <p className="text-sm">Sign up to start driving for Shuttlelane</p>
        </>
      )}

      {/* FORM */}
      <form className="text-shuttlelaneBlack mt-10 flex flex-col gap-y-5">
        {/* Date of birth */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="dateOfBirth" className="text-sm">
            Date Of Birth{" "}
            {isUpdateDriverAccount && (
              <span>
                : {moment(stepTwoStates?.dateOfBirth).format("MMM DD, YYYY")}
              </span>
            )}
          </label>
          <DatePicker
            locale={enGB}
            value={stepTwoStates?.dateOfBirth}
            onChange={(date) => {
              console.log("DATE:", date);
              stepTwoStates?.setDateOfBirth(date);
            }}
            appearance="subtle"
            placeholder="Date of birth"
            style={{
              backgroundColor: "transparent",
              display: "flex",
              alignItems: "center",
              position: "relative",
              outline: "none",
              color: "black",
            }}
            className="w-full h-12 flex items-center border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        {/* Address */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="address" className="text-sm">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={stepTwoStates?.address}
            onChange={(e) => {
              stepTwoStates?.setAddress(e.target.value);
            }}
            placeholder="Home address"
            className="text-[16px] w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        {/* City */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="city" className="text-sm">
            City
          </label>
          <input
            type="text"
            name="city"
            value={stepTwoStates?.city}
            onChange={(e) => {
              stepTwoStates?.setCity(e.target.value);
            }}
            placeholder="City"
            className="text-[16px] w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        {/* State */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="state" className="text-sm">
            State
          </label>
          <input
            type="text"
            name="state"
            value={stepTwoStates?.state}
            onChange={(e) => {
              stepTwoStates?.setState(e.target.value);
            }}
            placeholder="State"
            className="text-[16px] w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        {/* Marital Status */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="maritalStatus" className="text-sm">
            Marital Status
          </label>
          <Select
            value={stepTwoStates?.maritalStatus}
            onChange={(value) => {
              stepTwoStates?.setMaritalStatus(value);
            }}
            options={maritalStatusOptions}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? "transparent" : "transparent",
                borderWidth: state.isFocused ? "0" : "0",
                backgroundColor: "transparent",
                position: "relative",
                zIndex: 80,
                width: "100%",
                height: "100%",
              }),

              placeholder: (baseStyles, state) => ({
                ...baseStyles,
                // fontSize: ".75rem",
              }),

              menuList: (baseStyles, state) => ({
                ...baseStyles,
                // fontSize: ".75rem",
              }),

              input: (baseStyles, state) => ({
                ...baseStyles,
                // fontSize: ".75rem",
              }),
            }}
            placeholder="Select Marital Status"
            className="w-full h-12 flex items-center border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        {/* BVN */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="bvn" className="text-sm">
            BVN
          </label>
          <input
            type="tel"
            value={stepTwoStates?.bvn}
            max={11}
            disabled={isVerifyingBVN || isBVNVerified}
            onChange={(e) => {
              if (e.target.value.length > 11) return;
              if (e.target.value.length === 11 && !isBVNVerified) {
                stepTwoStates?.setBvn(e.target.value);
                console.log("BVN:", e.target.value);
                handleVerifyBVN(e.target.value);
                return;
              } else {
                stepTwoStates?.setBvn(e.target.value);
              }
            }}
            placeholder="***********"
            name="bvn"
            className="text-[16px] w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
          {isVerifyingBVN ? (
            <div className="flex items-center gap-x-2">
              <ImSpinner2 size={12} className="text-gray-400 animate-spin" />
              <span className="text-gray-400 uppercase text-sm lg:max-w-lg">
                Verifying Details
              </span>
            </div>
          ) : (
            <span className="text-gray-400 uppercase text-sm lg:max-w-lg">
              {bvnResponseData}
            </span>
          )}
        </div>

        {/* NIN */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="nin" className="text-sm">
            NIN
          </label>
          <input
            type="tel"
            value={stepTwoStates?.nin}
            max={11}
            disabled={isVerifyingNIN || isNINVerified}
            onChange={(e) => {
              if (e.target.value.length > 11) return;
              if (e.target.value.length === 11 && !isNINVerified) {
                stepTwoStates?.setNin(e.target.value);
                handleVerifyNIN(e.target.value);
                return;
              } else {
                stepTwoStates?.setNin(e.target.value);
              }
            }}
            placeholder="***********"
            name="nin"
            className="text-[16px] w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />

          {isVerifyingNIN ? (
            <div className="flex items-center gap-x-2">
              <ImSpinner2 size={12} className="text-gray-400 animate-spin" />
              <span className="text-gray-400 uppercase text-sm lg:max-w-lg">
                Verifying Details
              </span>
            </div>
          ) : (
            <span className="text-gray-400 uppercase text-sm lg:max-w-lg">
              {ninResponseData}
            </span>
          )}
        </div>

        {/* Bank Name */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="bank" className="text-sm">
            Bank Name
          </label>
          <input
            type="text"
            name="bank"
            value={stepTwoStates?.bank}
            onChange={(e) => {
              stepTwoStates?.setBank(e.target.value);
            }}
            placeholder="UBA - United Bank for Africa"
            className="text-[16px] w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        {/* Account Number */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="accountNumber" className="text-sm">
            Account Number
          </label>
          <input
            type="tel"
            name="accountNumber"
            value={stepTwoStates?.accountNumber}
            onChange={(e) => {
              stepTwoStates?.setAccountNumber(e.target.value);
            }}
            placeholder="***********"
            className="text-[16px] w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        {/* Account Name */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="accountName" className="text-sm">
            Account Name
          </label>
          <input
            type="text"
            name="accountName"
            value={stepTwoStates?.accountName}
            onChange={(e) => {
              stepTwoStates?.setAccountName(e.target.value);
            }}
            placeholder="John Chidera Akube"
            className="text-[16px] w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        {/* Driver's License Number */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="driverLicenseNumber" className="text-sm">
            Driver's License Number
          </label>
          <input
            type="tel"
            name="driverLicenseNumber"
            value={stepTwoStates?.driverLicense}
            max={12}
            disabled={isVerifyingLicense || isLicenseVerified}
            onChange={(e) => {
              if (e.target.value.length > 12) return;
              if (e.target.value.length === 12 && !isLicenseVerified) {
                stepTwoStates?.setDriverLicense(e.target.value);
                handleVerifyDriversLicense(e.target.value);
                return;
              } else {
                stepTwoStates?.setDriverLicense(e.target.value);
              }
            }}
            placeholder="***********"
            className="text-[16px] w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />

          {isVerifyingLicense ? (
            <div className="flex items-center gap-x-2">
              <ImSpinner2 size={12} className="text-gray-400 animate-spin" />
              <span className="text-gray-400 uppercase text-sm lg:max-w-lg">
                Verifying Details
              </span>
            </div>
          ) : (
            <span className="text-gray-400 uppercase text-sm lg:max-w-lg">
              {licenseResponseData}
            </span>
          )}
        </div>

        {isUpdateDriverAccount && (
          <button
            //   type="submit"
            onClick={(e) => handleUpdateDriver(e)}
            className="lg:w-1/4 w-full h-13 p-3 focus:outline-none bg-shuttlelaneGold flex items-center justify-center text-white border-gray-400 rounded-lg"
          >
            {isLoading ? (
              <ImSpinner2 size={21} className="text-white animate-spin" />
            ) : (
              "Save changes"
            )}
          </button>
        )}
      </form>
    </div>
  );
}

export default DriverSignupStepTwo;
