import React from "react";
import { useFormik } from "formik";
import PersonalDetailsFormSchema from "./validation";
import Select from "react-select";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function PersonalDetailsForm({
  selectedTitle,
  setSelectedTitle,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  phoneNumber,
  setPhoneNumber,
  email,
  setEmail,
  hasFlightDetails,
  flightNumber,
  setFlightNumber,
  airline,
  setAirline,
}) {
  // Select data
  // "TITLE" data
  const titleData = [
    { value: "Mr", label: "Mr" },
    { value: "Mrs", label: "Mrs" },
    { value: "Miss", label: "Miss" },
    { value: "Ms", label: "Ms" },
  ];

  // TO-DO: Add an error state

  return (
    <form className="my-5 w-full flex flex-col gap-y-4">
      <div className="flex lg:flex-row flex-col gap-4 lg:justify-between lg:items-center">
        <div className="w-full flex flex-col gap-y-1 lg:w-[50%]">
          <label htmlFor="title" className="text-xs text-gray-500">
            Title
          </label>

          <div className="h-12 border-[.5px] border-gray-400 outline-none focus:outline-none rounded-lg">
            <Select
              value={selectedTitle}
              onChange={(value) => {
                setSelectedTitle(value);
              }}
              options={titleData}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: state.isFocused ? "transparent" : "transparent",
                  borderWidth: state.isFocused ? "0" : "0",
                  backgroundColor: "transparent",
                  position: "relative",
                  zIndex: 99,
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
              placeholder="Select Title"
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-y-1 lg:w-[50%]">
          <label htmlFor="firstName" className="text-xs text-gray-500">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            placeholder="John"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full h-12 p-3 border-[.5px] border-gray-400 outline-none focus:outline-none rounded-lg text-sm"
          />
        </div>
      </div>

      <div className="flex lg:flex-row flex-col gap-4 lg:justify-between lg:items-center">
        <div className="w-full flex flex-col gap-y-1 lg:w-[50%]">
          <label htmlFor="lastName" className="text-xs text-gray-500">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            placeholder="Doe"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full h-12 p-3 border-[.5px] border-gray-400 outline-none focus:outline-none rounded-lg text-sm"
          />
        </div>

        <div className="w-full flex flex-col gap-y-1 lg:w-[50%]">
          <label htmlFor="phoneNumber" className="text-xs text-gray-500">
            Phone Number
          </label>

          <PhoneInput
            country={"us"}
            searchPlaceholder="Search"
            placeholder="---- --- ----"
            value={phoneNumber}
            onChange={(value) => setPhoneNumber(`+${value}`)}
            containerClass="w-full h-12 p-3 border-[.5px] border-gray-400 outline-none focus:outline-none rounded-lg text-sm"
            inputClass="border-none h-full"
            buttonClass="bg-transparent"
          />
        </div>
      </div>

      <div className="flex lg:flex-row flex-col gap-4 lg:justify-between lg:items-center">
        <div className="w-full flex flex-col gap-y-1 lg:w-[50%]">
          <label htmlFor="email" className="text-xs text-gray-500">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="abc@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 p-3 border-[.5px] border-gray-400 outline-none focus:outline-none rounded-lg text-sm"
          />
        </div>

        {hasFlightDetails && (
          <div className="w-full flex flex-col gap-y-1 lg:w-[50%]">
            <label htmlFor="flightNumber" className="text-xs text-gray-500">
              Flight Number
            </label>

            <input
              type="text"
              name="flightNumber"
              placeholder="GFNV348O9"
              value={flightNumber}
              onChange={(e) => setFlightNumber(e.target.value)}
              className="w-full h-12 p-3 border-[.5px] border-gray-400 outline-none focus:outline-none rounded-lg text-sm"
            />
          </div>
        )}
      </div>

      {hasFlightDetails && (
        <div className="flex lg:flex-row flex-col gap-4 lg:justify-between lg:items-center">
          <div className="w-full flex flex-col gap-y-1 lg:w-[50%]">
            <label htmlFor="airline" className="text-xs text-gray-500">
              Airline
            </label>
            <input
              type="text"
              name="airline"
              placeholder="Fly Emirates"
              value={airline}
              onChange={(e) => setAirline(e.target.value)}
              className="w-full h-12 p-3 border-[.5px] border-gray-400 outline-none focus:outline-none rounded-lg text-sm"
            />
          </div>
        </div>
      )}
    </form>
  );
}
