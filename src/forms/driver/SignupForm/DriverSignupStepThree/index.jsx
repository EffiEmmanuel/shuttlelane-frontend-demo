import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import DatePicker from "rsuite/DatePicker";
import "rsuite/dist/rsuite.css";
import enGB from "date-fns/locale/en-GB";

function DriverSignupStepThree({ isStepThree, stepThreeStates }) {
  const carTypeOptions = [
    {
      value: "Salon",
      label: "Salon",
    },
    {
      value: "SUV",
      label: "SUV",
    },
    {
      value: "Mini Bus",
      label: "Mini Bus",
    },
  ];

  // Scroll to top handler
  const scrollTopRef = useRef(null);
  useEffect(() => {
    console.log("HELLO FROM THIS COMPONENT");
    scrollTopRef.current.scrollIntoView();
  }, [isStepThree]);

  return (
    <div className="px-10 pt-10" ref={scrollTopRef}>
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-2xl text-shuttlelaneBlack">
          Car Details
        </h2>

        <button className="h-5 w-16 text-sm flex items-center justify-center border-[.3px] border-shuttlelaneBlack rounded-full p-2">
          Skip
        </button>
      </div>
      <p className="text-sm">Sign up to start driving for Shuttlelane</p>

      {/* FORM */}
      <form className="text-shuttlelaneBlack mt-10 flex flex-col gap-y-5">
        {/* Type */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="carType" className="text-sm">
            Car Type
          </label>
          <Select
            value={stepThreeStates?.carType}
            onChange={(value) => {
              stepThreeStates?.setCarType(value);
            }}
            options={carTypeOptions}
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
            placeholder="Car Type"
            className="w-full h-12 flex items-center border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        {/* Name */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="carName" className="text-sm">
            Name
          </label>
          <input
            type="text"
            name="carName"
            value={stepThreeStates?.carName}
            onChange={(e) => {
              stepThreeStates?.setCarName(e.target.value);
            }}
            placeholder="Car Name"
            className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        {/* Model */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="carModel" className="text-sm">
            Model
          </label>
          <input
            type="text"
            name="carModel"
            value={stepThreeStates?.carModel}
            onChange={(e) => {
              stepThreeStates?.setCarModel(e.target.value);
            }}
            placeholder="Car Model"
            className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        {/* Year */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="carYear" className="text-sm">
            Year
          </label>
          <input
            type="text"
            name="carYear"
            value={stepThreeStates?.carYear}
            onChange={(e) => {
              stepThreeStates?.setCarYear(e.target.value);
            }}
            placeholder="Car Year"
            className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>
      </form>
    </div>
  );
}

export default DriverSignupStepThree;
