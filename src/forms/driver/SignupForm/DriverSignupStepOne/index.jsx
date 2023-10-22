import React, { useEffect, useRef, useState } from "react";
import { BiSolidCity } from "react-icons/bi";
import Select from "react-select";
import CountryData from "country-codes-list";

function DriverSignupStepOne(props) {
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

  // Scroll to top handler
  const scrollTopRef = useRef(null);
  useEffect(() => {
    console.log("HELLO FROM THIS COMPONENT");
    scrollTopRef.current.scrollIntoView();
  }, [props?.isStepOne]);

  return (
    <div className="px-10 pt-10" ref={scrollTopRef}>
      <h2 className="font-semibold text-2xl text-shuttlelaneBlack">
        Create an account
      </h2>
      <p className="text-sm">Sign up to start driving for Shuttlelane</p>

      {/* FORM */}
      <form className="text-shuttlelaneBlack mt-10 flex flex-col gap-y-5">
        {/* First Name */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="firstName" className="text-sm">
            First Name
          </label>
          <input
            placeholder="John"
            className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>
        {/* Middle Name and Last Name */}
        <div className="flex flex-col w-full lg:flex-row items-center gap-x-3 gap-y-3">
          <div className="flex w-full flex-col gap-y-1">
            <label htmlFor="middleName" className="text-sm">
              Middle Name
            </label>
            <input
              placeholder="Snow"
              className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
            />
          </div>
          <div className="flex w-full flex-col gap-y-1">
            <label htmlFor="lastName" className="text-sm">
              Last Name
            </label>
            <input
              placeholder="Doe"
              className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
            />
          </div>
        </div>

        {/* Email Address */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="emailAddress" className="text-sm">
            Email Address
          </label>
          <input
            type="email"
            placeholder="abc@example.com"
            className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        {/* Gender */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="emailAddress" className="text-sm">
            Gender
          </label>
          <Select
            value={selectedGender}
            onChange={(value) => setSelectedGender(value)}
            options={genderOptions}
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

        {/* Phone */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="emailAddress" className="text-sm">
            Phone
          </label>
          <input
            type="tel"
            placeholder="+2341234567890"
            className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        {/* Alternative Phone */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="emailAddress" className="text-sm">
            Alternative Phone
          </label>
          <input
            type="tel"
            placeholder="+2341234567890"
            className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        {/* Education */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="emailAddress" className="text-sm">
            Education
          </label>
          <Select
            value={selectedEducation}
            onChange={(value) => setSelectedEducation(value)}
            options={educationOptions}
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
            placeholder="Education"
            className="w-full h-12 flex items-center border-[0.3px] z-[80] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>
      </form>
    </div>
  );
}

export default DriverSignupStepOne;
