import React from "react";
import { useFormik } from "formik";
import Select from "react-select";
import { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchVisaOnArrivalRates } from "../../../redux/slices/userSlice";

export default function GeneralInformationForm({
  nationality,
  setNationality,
  visaClass,
  setVisaClass,
  passportType,
  setPassportType,
  handleNext,
}) {
  // Select data
  // "CLASS OF VISA" data
  const classOfVisaData = [
    { value: "Business", label: "Business" },
    { value: "Visiting", label: "Visiting" },
  ];
  // "PASSPORT TYPE" data
  const passportTypeData = [{ value: "Standard", label: "Standard" }];

  const { isLoading, voaRates, bookingDetails, bookingType } = useSelector(
    (store) => store.user
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVisaOnArrivalRates());
  }, []);

  // Format voaRates
  const [voaRatesData, setVoaRatesData] = useState();
  useEffect(() => {
    let updatedVoaRatesData = [];
    voaRates?.forEach((voaRate) => {
      updatedVoaRatesData.push({
        value: voaRate?.country,
        label: voaRate?.country,
      });
    });

    setVoaRatesData(updatedVoaRatesData);
  }, [voaRates]);

  useEffect(() => {
    setNationality({
      value: `${bookingDetails?.country?.label}`,
      label: `${bookingDetails?.country?.label}`,
    });
  }, []);

  // TO-DO: Add an error state

  return (
    <form className="my-5 w-full flex flex-col gap-y-4">
      <div className="flex lg:flex-row flex-col gap-4 lg:justify-between lg:items-center">
        {/* Nationality */}
        <div className="w-full flex flex-col gap-y-1 lg:w-[50%]">
          <label htmlFor="visaClass" className="text-xs text-gray-500">
            Nationality
          </label>

          <div className="h-12 border-[.5px] border-gray-400 outline-none focus:outline-none rounded-lg">
            <Select
              value={nationality}
              onChange={(value) => {
                setNationality(value);
              }}
              options={voaRatesData}
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
              placeholder="Select Nationality"
            />
          </div>
        </div>
        {/* Class of visa */}
        <div className="w-full flex flex-col gap-y-1 lg:w-[50%]">
          <label htmlFor="visaClass" className="text-xs text-gray-500">
            Class of visa
          </label>

          <div className="h-12 border-[.5px] border-gray-400 outline-none focus:outline-none rounded-lg">
            <Select
              value={visaClass}
              onChange={(value) => {
                setVisaClass(value);
              }}
              options={classOfVisaData}
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
              placeholder="Select Class Of Visa"
            />
          </div>
        </div>
      </div>
      <div className="flex lg:flex-row flex-col gap-4 lg:justify-between lg:items-center">
        {/* Passport type */}
        <div className="w-full flex flex-col gap-y-1 lg:w-[50%]">
          <label htmlFor="visaClass" className="text-xs text-gray-500">
            Passport type
          </label>

          <div className="h-12 border-[.5px] border-gray-400 outline-none focus:outline-none rounded-lg">
            <Select
              value={passportType}
              onChange={(value) => {
                setPassportType(value);
              }}
              options={passportTypeData}
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
              placeholder="Select Passport Type"
            />
          </div>
        </div>
      </div>

      <div className="flex lg:flex-row flex-col gap-4 lg:justify-between lg:items-center">
        {/* Next */}
        <div className="w-full flex flex-col gap-y-1 lg:w-[50%]">
          <button
            type="submit"
            className="bg-shuttlelanePurple disabled:bg-shuttlelaneLightPurple disabled:text-gray-400 disabled:cursor-not-allowed text-white h-10 rounded-lg mt-3 flex items-center gap-x-3 p-3 w-32 justify-center"
            disabled={!visaClass || !passportType || !nationality}
            onClick={(e) => handleNext(e, "step1")}
          >
            <span className="text-sm">Next</span>
          </button>
        </div>
      </div>
    </form>
  );
}
