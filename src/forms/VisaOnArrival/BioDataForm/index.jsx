import React, { useRef } from "react";
import { useFormik } from "formik";
import Select from "react-select";
import { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchVisaOnArrivalRates } from "../../../redux/slices/userSlice";
import DatePicker from "rsuite/DatePicker";
import "rsuite/dist/rsuite.css";
import enGB from "date-fns/locale/en-GB";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { FaXmark } from "react-icons/fa6";
import { ImSpinner2 } from "react-icons/im";

export default function BiodataForm({
  title,
  setTitle,
  surname,
  setSurname,
  firstName,
  setFirstName,
  middleName,
  setMiddleName,
  email,
  setEmail,
  dateOfBirth,
  setDateOfBirth,
  placeOfBirth,
  setPlaceOfBirth,
  gender,
  setGender,
  maritalStatus,
  setMaritalStatus,
  passportNumber,
  setPassportNumber,
  passportExpiryDate,
  setPassportExpiryDate,
  handleNext,
  handlePrev,
}) {
  // Select data
  // "TITLE" data
  const titleData = [
    { value: "Mr", label: "Mr" },
    { value: "Mrs", label: "Mrs" },
    { value: "Miss", label: "Miss" },
    { value: "Ms", label: "Ms" },
  ];
  // "GENDER" data
  const genderData = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
    { value: "Prefer not to say", label: "Prefer not to say" },
  ];
  // "MARITAL STATUS" data
  const maritalStatusData = [
    { value: "Single", label: "Single" },
    { value: "Married", label: "Married" },
    { value: "Divorced", label: "Divorced" },
    { value: "Prefer not to say", label: "Prefer not to say" },
  ];

  const { isLoading, voaRates, bookingDetails, bookingType } = useSelector(
    (store) => store.user
  );
  const dispatch = useDispatch();

  return (
    <form className="my-5 w-full flex flex-col gap-y-4">
      <div className="flex lg:flex-row flex-col gap-4 lg:justify-between lg:items-center">
        <div className="w-full flex flex-col gap-y-1 lg:w-[50%]">
          <label htmlFor="title" className="text-xs text-gray-500">
            Title
          </label>

          <div className="h-12 border-[.5px] border-gray-400 outline-none focus:outline-none rounded-lg">
            <Select
              value={title}
              onChange={(value) => {
                setTitle(value);
              }}
              options={titleData}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: state.isFocused ? "transparent" : "transparent",
                  borderWidth: state.isFocused ? "0" : "0",
                  backgroundColor: "transparent",
                  position: "relative",
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
          <label htmlFor="surname" className="text-xs text-gray-500">
            Surname
          </label>
          <input
            type="text"
            name="surname"
            placeholder="Doe"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className="w-full h-12 p-3 border-[.5px] border-gray-400 outline-none focus:outline-none rounded-lg text-sm"
          />
        </div>
      </div>

      <div className="flex lg:flex-row flex-col gap-4 lg:justify-between lg:items-center">
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

        <div className="w-full flex flex-col gap-y-1 lg:w-[50%]">
          <label htmlFor="middleName" className="text-xs text-gray-500">
            Middle Name
          </label>
          <input
            type="text"
            name="middleName"
            placeholder="Snow"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
            className="w-full h-12 p-3 border-[.5px] border-gray-400 outline-none focus:outline-none rounded-lg text-sm"
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
            placeholder="abd@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 p-3 border-[.5px] border-gray-400 outline-none focus:outline-none rounded-lg text-sm"
          />
        </div>
        <div className="w-full flex flex-col gap-y-1 lg:w-[50%]">
          <label htmlFor="firstName" className="text-xs text-gray-500">
            Date Of Birth
          </label>
          <div className="flex flex-col gap-y-2 lg:flex-row lg:items-center lg:justify-between gap-x-3">
            <div className="w-full flex items-center h-12 p-3 border-[.5px] border-gray-400 outline-none focus:outline-none rounded-lg text-sm">
              <div className="w-full">
                <DatePicker
                  locale={enGB}
                  value={dateOfBirth}
                  appearance="subtle"
                  onChange={(date) => {
                    setDateOfBirth(date);
                  }}
                  placeholder="Date Of Birth"
                  style={{
                    backgroundColor: "transparent",
                  }}
                  className="text-sm w-full bg-transparent text-shuttlelaneBlack"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex lg:flex-row flex-col gap-4 lg:justify-between lg:items-center">
        <div className="w-full flex flex-col gap-y-1 lg:w-[50%]">
          <label htmlFor="placeOfBirth" className="text-xs text-gray-500">
            Place Of Birth
          </label>
          <input
            type="text"
            name="placeOfBirth"
            placeholder="Place Of Birth"
            value={placeOfBirth}
            onChange={(e) => setPlaceOfBirth(e.target.value)}
            className="w-full h-12 p-3 border-[.5px] border-gray-400 outline-none focus:outline-none rounded-lg text-sm"
          />
        </div>
        <div className="w-full flex flex-col gap-y-1 lg:w-[50%]">
          <label htmlFor="gender" className="text-xs text-gray-500">
            Gender
          </label>

          <div className="h-12 border-[.5px] border-gray-400 outline-none focus:outline-none rounded-lg">
            <Select
              value={gender}
              onChange={(value) => {
                setGender(value);
              }}
              options={genderData}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: state.isFocused ? "transparent" : "transparent",
                  borderWidth: state.isFocused ? "0" : "0",
                  backgroundColor: "transparent",
                  position: "relative",
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
            />
          </div>
        </div>
      </div>

      <div className="flex lg:flex-row flex-col gap-4 lg:justify-between lg:items-center">
        <div className="w-full flex flex-col gap-y-1 lg:w-[50%]">
          <label htmlFor="maritalStatus" className="text-xs text-gray-500">
            Marital Status
          </label>

          <div className="h-12 border-[.5px] border-gray-400 outline-none focus:outline-none rounded-lg">
            <Select
              value={maritalStatus}
              onChange={(value) => {
                setMaritalStatus(value);
              }}
              options={maritalStatusData}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: state.isFocused ? "transparent" : "transparent",
                  borderWidth: state.isFocused ? "0" : "0",
                  backgroundColor: "transparent",
                  position: "relative",
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
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-y-1 lg:w-[50%]">
          <label htmlFor="passportNumber" className="text-xs text-gray-500">
            Passport Number
          </label>
          <input
            type="text"
            name="passportNumber"
            placeholder="Passport Number"
            value={passportNumber}
            onChange={(e) => setPassportNumber(e.target.value)}
            className="w-full h-12 p-3 border-[.5px] border-gray-400 outline-none focus:outline-none rounded-lg text-sm"
          />
        </div>
      </div>

      <div className="flex lg:flex-row flex-col gap-4 lg:justify-between lg:items-center">
        <div className="w-full flex flex-col gap-y-1 lg:w-[50%]">
          <label htmlFor="passportExpiryDate" className="text-xs text-gray-500">
            Passport Expiry Date
          </label>
          <div className="flex flex-col gap-y-2 lg:flex-row lg:items-center lg:justify-between gap-x-3">
            <div className="w-full flex items-center h-12 p-3 border-[.5px] border-gray-400 outline-none focus:outline-none rounded-lg text-sm">
              <div className="w-full">
                <DatePicker
                  locale={enGB}
                  value={passportExpiryDate}
                  appearance="subtle"
                  onChange={(date) => {
                    setPassportExpiryDate(date);
                  }}
                  placeholder="Passport Expiry Date"
                  style={{
                    backgroundColor: "transparent",
                  }}
                  className="text-sm w-full bg-transparent text-shuttlelaneBlack relative z-[0]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-4 lg:items-center">
        {/* Prev */}
        <div className="flex flex-col gap-y-1 w-32">
          <button
            type="submit"
            className="bg-shuttlelaneGold disabled:bg-shuttlelaneLightPurple disabled:text-gray-400 disabled:cursor-not-allowed text-white h-10 rounded-lg mt-3 flex items-center gap-x-3 p-3 w-32 justify-center"
            onClick={(e) => handlePrev(e, "step2")}
          >
            <span className="text-sm">Go back</span>
          </button>
        </div>
        {/* Next */}
        <div className="flex flex-col gap-y-1 w-32">
          <button
            type="submit"
            className="bg-shuttlelanePurple disabled:bg-shuttlelaneLightPurple disabled:text-gray-400 disabled:cursor-not-allowed text-white h-10 rounded-lg mt-3 flex items-center gap-x-3 p-3 w-32 justify-center"
            disabled={
              !title ||
              !surname ||
              !firstName ||
              !middleName ||
              !dateOfBirth ||
              !placeOfBirth ||
              !gender ||
              !maritalStatus ||
              !passportNumber ||
              !passportExpiryDate
            }
            onClick={(e) => handleNext(e, "step2")}
          >
            <span className="text-sm">Next</span>
          </button>
        </div>
      </div>
    </form>
  );
}
