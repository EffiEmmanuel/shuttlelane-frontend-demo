// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { BiSolidCity } from "react-icons/bi";
import Select from "react-select";
import CountryData from "country-codes-list";

function DriverSignupStepSix(props) {
  // Scroll to top handler
  const scrollTopRef = useRef(null);
  useEffect(() => {
    console.log("HELLO FROM THIS COMPONENT");
    scrollTopRef.current.scrollIntoView();
  }, [props?.isStepSix]);

  return (
    <div className="px-10 pt-10" ref={scrollTopRef}>
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-2xl text-shuttlelaneBlack">
          Create Password
        </h2>

        <button
          disabled
          className="h-5 w-16 disabled:bg-shuttlelaneLightPurple disabled:border-gray-400 disabled:text-gray-400 text-sm flex items-center justify-center border-[.3px] border-shuttlelaneBlack rounded-full p-2"
        >
          Skip
        </button>
      </div>

      <p className="text-sm">Sign up to start driving for Shuttlelane</p>

      {/* FORM */}
      <form className="text-shuttlelaneBlack mt-10 flex flex-col gap-y-5">
        {/* Password */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="password" className="text-sm">
            Password
          </label>
          <input
            type="password"
            placeholder="********"
            className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="confirmPassword" className="text-sm">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="********"
            className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>
      </form>
    </div>
  );
}

export default DriverSignupStepSix;
