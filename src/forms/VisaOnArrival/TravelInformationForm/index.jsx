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
import ReactCountryFlagsSelect from "react-country-flags-select";
import { toast } from "react-toastify";
import { AiOutlinePlus } from "react-icons/ai";
import { BiMinus } from "react-icons/bi";

export default function TravelInformationForm({
  purposeOfJourney,
  setPurposeOfJourney,
  airline,
  setAirline,
  flightNumber,
  setFlightNumber,
  countryOfDeparture,
  setCountryOfDeparture,
  departureDate,
  setDepartureDate,
  arrivalDate,
  setArrivalDate,
  portOfEntry,
  setPortOfEntry,
  durationOfStay,
  setDurationOfStay,
  handleNext,
  handlePrev,
}) {
  // TO-DO: Add "Select" options for "Port of entry"
  //   const maritalStatusData = [
  //     { value: "Single", label: "Single" },
  //     { value: "Married", label: "Married" },
  //     { value: "Divorced", label: "Divorced" },
  //     { value: "Prefer not to say", label: "Prefer not to say" },
  //   ];

  const { isLoading, voaRates, bookingDetails, bookingType } = useSelector(
    (store) => store.user
  );
  const dispatch = useDispatch();

  return (
    <form className="my-5 w-full flex flex-col gap-y-4">
      <div className="flex lg:flex-row flex-col gap-4 lg:justify-between lg:items-center">
        <div className="w-full flex flex-col gap-y-1 lg:w-[50%]">
          <label htmlFor="purposeOfJourney" className="text-xs text-gray-500">
            Purpose Of Journey
          </label>
          <input
            type="text"
            name="purposeOfJourney"
            placeholder="To attend a friend's wedding..."
            value={purposeOfJourney}
            onChange={(e) => setPurposeOfJourney(e.target.value)}
            className="w-full h-12 p-3 border-[.5px] border-gray-400 outline-none focus:outline-none rounded-lg text-sm"
          />
        </div>

        <div className="w-full flex flex-col gap-y-1 lg:w-[50%]">
          <label htmlFor="airline" className="text-xs text-gray-500">
            Airline
          </label>
          <input
            type="text"
            name="airline"
            placeholder="British Airways"
            value={airline}
            onChange={(e) => setAirline(e.target.value)}
            className="w-full h-12 p-3 border-[.5px] border-gray-400 outline-none focus:outline-none rounded-lg text-sm"
          />
        </div>
      </div>

      <div className="flex lg:flex-row flex-col gap-4 lg:justify-between lg:items-center">
        <div className="w-full flex flex-col gap-y-1 lg:w-[50%]">
          <label htmlFor="flightNumber" className="text-xs text-gray-500">
            Flight Number
          </label>
          <input
            type="text"
            name="flightNumber"
            placeholder="JFKT123Z"
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
            className="w-full h-12 p-3 border-[.5px] border-gray-400 outline-none focus:outline-none rounded-lg text-sm"
          />
        </div>

        <div className="w-full flex flex-col gap-y-1 lg:w-[50%]">
          <label htmlFor="countryOfDeparture" className="text-xs text-gray-500">
            Country Of Departure
          </label>
          <ReactCountryFlagsSelect
            selected={countryOfDeparture}
            onSelect={setCountryOfDeparture}
            fullWidth
            searchable
          />
        </div>
      </div>

      <div className="flex lg:flex-row flex-col gap-4 lg:justify-between lg:items-center">
        <div className="w-full flex flex-col gap-y-1 lg:w-[50%]">
          <label htmlFor="departureDate" className="text-xs text-gray-500">
            Departure Date
          </label>
          <div className="flex flex-col gap-y-2 lg:flex-row lg:items-center lg:justify-between gap-x-3">
            <div className="w-full flex items-center h-12 p-3 border-[.5px] border-gray-400 outline-none focus:outline-none rounded-lg text-sm">
              <div className="w-full">
                <DatePicker
                  locale={enGB}
                  value={departureDate}
                  appearance="subtle"
                  onChange={(date) => {
                    setDepartureDate(date);
                  }}
                  placeholder="Departure Date"
                  style={{
                    backgroundColor: "transparent",
                  }}
                  className="text-sm w-full bg-transparent text-shuttlelaneBlack"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-y-1 lg:w-[50%]">
          <label htmlFor="ArrivalDate" className="text-xs text-gray-500">
            Arrival Date
          </label>
          <div className="flex flex-col gap-y-2 lg:flex-row lg:items-center lg:justify-between gap-x-3">
            <div className="w-full flex items-center h-12 p-3 border-[.5px] border-gray-400 outline-none focus:outline-none rounded-lg text-sm">
              <div className="w-full">
                <DatePicker
                  locale={enGB}
                  value={arrivalDate}
                  appearance="subtle"
                  onChange={(date) => {
                    setArrivalDate(date);
                  }}
                  placeholder="Arrival Date"
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
          <label htmlFor="portOfEntry" className="text-xs text-gray-500">
            Port Of Entry
          </label>
          <input
            type="text"
            name="portOfEntry"
            placeholder="Murtala Muhammed International Airport"
            value={portOfEntry}
            onChange={(e) => setPortOfEntry(e.target.value)}
            className="w-full h-12 p-3 border-[.5px] border-gray-400 outline-none focus:outline-none rounded-lg text-sm"
          />
        </div>

        <div className="w-full flex flex-col gap-y-1 lg:w-[50%]">
          <label htmlFor="durationOfStay" className="text-xs text-gray-500">
            Duration Of Stay (In Days)
          </label>
          <div className="flex flex-col gap-y-2 lg:flex-row lg:items-center lg:justify-between gap-x-3">
            <div className="w-full flex items-center h-12 p-3 border-[.5px] border-gray-400 outline-none focus:outline-none rounded-lg text-sm">
              <div className="w-full flex items-center justify-between">
                <input
                  type="tel"
                  onChange={(e) => {
                    if (isNaN(e.target.value)) {
                      e.target.value = durationOfStay;
                      toast.info("This field accepts only numbers!");
                      return;
                    } else {
                      setDurationOfStay(e.target.value);
                    }
                  }}
                  value={durationOfStay}
                  className="text-sm px-2 bg-transparent w-full focus:outline-none text-shuttlelaneBlack"
                  placeholder="Duration Of Stay"
                />

                <div className="flex items-center gap-x-2">
                  <div
                    onClick={() => {
                      let newDurationValue;
                      if (isNaN(durationOfStay)) {
                        newDurationValue = 1;
                      } else {
                        newDurationValue = +durationOfStay - 1;
                      }

                      if (newDurationValue === 0) {
                        toast.info("You cannot select less than 1 day!");
                        return;
                      } else {
                        setDurationOfStay(+durationOfStay - 1);
                      }
                    }}
                    className="flex items-center justify-center cursor-pointer p-1 border-[.5px] border-gray-400 rounded-sm"
                  >
                    <BiMinus size={16} className="text-gray-500" />
                  </div>
                  <div
                    onClick={() => {
                      let newDurationValue;
                      if (isNaN(durationOfStay)) {
                        newDurationValue = 1;
                      } else {
                        newDurationValue = +durationOfStay + 1;
                      }
                      setDurationOfStay(newDurationValue);
                    }}
                    className="flex items-center justify-center cursor-pointer p-1 border-[.5px] border-gray-400 rounded-sm"
                  >
                    <AiOutlinePlus size={16} className="text-gray-500" />
                  </div>
                </div>
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
            onClick={(e) => handlePrev(e, "step3")}
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
              !purposeOfJourney ||
              !airline ||
              !flightNumber ||
              !countryOfDeparture ||
              !departureDate ||
              !arrivalDate ||
              !portOfEntry ||
              !durationOfStay
            }
            onClick={(e) => handleNext(e, "step3")}
          >
            <span className="text-sm">Next</span>
          </button>
        </div>
      </div>
    </form>
  );
}
