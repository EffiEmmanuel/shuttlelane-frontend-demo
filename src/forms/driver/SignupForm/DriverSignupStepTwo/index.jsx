import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import DatePicker from "rsuite/DatePicker";
import "rsuite/dist/rsuite.css";
import enGB from "date-fns/locale/en-GB";

function DriverSignupStepTwo({ isStepTwo, stepTwoStates }) {
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

  // Form fields
  const [selectedGender, setSelectedGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedEducation, setSelectedEducation] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState();
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState("");

  // Scroll to top handler
  const scrollTopRef = useRef(null);
  useEffect(() => {
    console.log("HELLO FROM THIS COMPONENT");
    scrollTopRef.current.scrollIntoView();
  }, [isStepTwo]);

  return (
    <div className="px-10 pt-10" ref={scrollTopRef}>
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-2xl text-shuttlelaneBlack">
          Personal Details
        </h2>

        <button className="h-5 w-16 text-sm flex items-center justify-center border-[.3px] border-shuttlelaneBlack rounded-full p-2">
          Skip
        </button>
      </div>
      <p className="text-sm">Sign up to start driving for Shuttlelane</p>

      {/* FORM */}
      <form className="text-shuttlelaneBlack mt-10 flex flex-col gap-y-5">
        {/* First Name */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="dateOfBirth" className="text-sm">
            Date Of Birth
          </label>
          <DatePicker
            locale={enGB}
            value={stepTwoStates?.dateOfBirth}
            onChange={(date) => {
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
              zIndex: 80,
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
            className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
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
            className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
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
            className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
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
            name="bvn"
            value={stepTwoStates?.bvn}
            onChange={(e) => {
              stepTwoStates?.setBvn(e.target.value);
            }}
            placeholder="***********"
            name="bvn"
            className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        {/* NIN */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="nin" className="text-sm">
            NIN
          </label>
          <input
            type="tel"
            name="nin"
            value={stepTwoStates?.nin}
            onChange={(e) => {
              stepTwoStates?.setNin(e.target.value);
            }}
            placeholder="***********"
            name="nin"
            className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
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
            onChange={(e) => {
              stepTwoStates?.setDriverLicense(e.target.value);
            }}
            placeholder="***********"
            name="driverLicenseNumber"
            className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>
      </form>
    </div>
  );
}

export default DriverSignupStepTwo;
