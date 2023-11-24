// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { BiSolidCity } from "react-icons/bi";
import Select from "react-select";
import CountryData from "country-codes-list";

function DriverSignupStepFour({ isStepFour, stepFourStates }) {
  const relationshipOptions = [
    {
      value: "Father",
      label: "Father",
    },
    {
      value: "Mother",
      label: "Mother",
    },
    {
      value: "Brother",
      label: "Brother",
    },
    {
      value: "Sister",
      label: "Sister",
    },
    {
      value: "Other",
      label: "Other",
    },
  ];

  // Form fields
  const [selectedRelationship, setSelectedRelationship] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Scroll to top handler
  const scrollTopRef = useRef(null);
  useEffect(() => {
    console.log("HELLO FROM THIS COMPONENT");
    scrollTopRef.current.scrollIntoView();
  }, [isStepFour]);

  return (
    <div className="px-10 pt-10" ref={scrollTopRef}>
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-2xl text-shuttlelaneBlack">
          Emergency Contact
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
          <label htmlFor="emergencyFirstName" className="text-sm">
            First Name
          </label>
          <input
            placeholder="John"
            name="emergencyFirstName"
            value={stepFourStates?.emergencyFirstName}
            onChange={(e) => {
              stepFourStates?.setEmergencyFirstName(e.target.value);
            }}
            className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>
        {/* Last Name */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="emergencyLastName" className="text-sm">
            Last Name
          </label>
          <input
            placeholder="Doe"
            name="emergencylastName"
            value={stepFourStates?.emergencylastName}
            onChange={(e) => {
              stepFourStates?.setEmergencyLastName(e.target.value);
            }}
            className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        {/* Address */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="emergencyAddress" className="text-sm">
            Address
          </label>
          <input
            type="text"
            name="emergencyAddress"
            value={stepFourStates?.emergencyAddress}
            onChange={(e) => {
              stepFourStates?.setEmergencyAddress(e.target.value);
            }}
            placeholder="Home address"
            className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="emergencyMobile" className="text-sm">
            Phone
          </label>
          <input
            type="tel"
            name="emergencyMobile"
            value={stepFourStates?.emergencyMobile}
            onChange={(e) => {
              stepFourStates?.setEmergencyMobile(e.target.value);
            }}
            placeholder="+2341234567890"
            className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        {/* Relationship */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="emergencyRelationship" className="text-sm">
            Relationship
          </label>
          <Select
            value={stepFourStates?.emergencyRelationship}
            onChange={(value) => {
              stepFourStates?.setEmergencyRelationship(value);
            }}
            options={relationshipOptions}
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
            placeholder="Select Relationship"
            className="w-full h-12 flex items-center border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>
      </form>
    </div>
  );
}

export default DriverSignupStepFour;
