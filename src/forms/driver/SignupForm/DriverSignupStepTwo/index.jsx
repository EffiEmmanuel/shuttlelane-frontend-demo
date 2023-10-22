import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import DatePicker from "rsuite/DatePicker";
import "rsuite/dist/rsuite.css";
import enGB from "date-fns/locale/en-GB";

function DriverSignupStepTwo(props) {
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
  }, [props?.isStepTwo]);

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
            value={dateOfBirth}
            appearance="subtle"
            onChange={(date) => {
              setDateOfBirth(date);
            }}
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
            value={selectedMaritalStatus}
            onChange={(value) => setSelectedMaritalStatus(value)}
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
            placeholder="Select Gender"
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
