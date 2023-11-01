// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { BiSolidCity } from "react-icons/bi";
import Select from "react-select";
import CountryData from "country-codes-list";
import OTPInput from "react-otp-input";

function DriverSignupStepSeven(props) {
  // Scroll to top handler
  const scrollTopRef = useRef(null);
  useEffect(() => {
    console.log("HELLO FROM THIS COMPONENT");
    scrollTopRef.current.scrollIntoView();
  }, [props?.isStepSeven]);

  // Resend OTP setup
  const [seconds, setSeconds] = useState(59);
  const [canRequestOtp, setCanRequestOtp] = useState(false);
  useEffect(() => {
    if (seconds === 0) {
      setCanRequestOtp(true);
    }

    // exit early when we reach 0
    if (!seconds) return;
    const interval = setInterval(() => {
      // Decrement seconds
      let updatedSeconds = +seconds - 1;
      setSeconds(updatedSeconds);
    }, 1000);

    return () => {
      // Cleanup interval
      clearInterval(interval);
    };
  }, [seconds]);

  // Form Fields
  const [otp, setOtp] = useState("");

  return (
    <div className="px-10 pt-10" ref={scrollTopRef}>
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-2xl text-shuttlelaneBlack">
          Confirm Phone Number
        </h2>

        <button
          disabled
          className="h-5 w-16 disabled:border-gray-400 disabled:bg-shuttlelaneLightPurple disabled:text-gray-400 text-sm flex items-center justify-center border-[.3px] border-shuttlelaneBlack rounded-full p-2"
        >
          Skip
        </button>
      </div>

      <p className="text-sm">Sign up to start driving for Shuttlelane</p>

      {/* FORM */}
      <form className="text-shuttlelaneBlack mt-10 flex flex-col gap-y-5">
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={4}
          renderSeparator={<span> </span>}
          renderInput={(props) => (
            <input
              {...props}
              width={"100px"}
              width={"50px"}
              style={{
                width: "50px",
                height: "50px",
                display: "flex",
                justifyContent: "center",
              }}
              className="border-[0.3px] mr-4 text-lg text-center focus:outline-none border-gray-400 rounded-lg flex items-center justify-center"
            />
          )}
        />
      </form>

      {!canRequestOtp && (
        <p className="text-gray-400 text-sm mt-4">
          Resend code in 00:{seconds}
        </p>
      )}
      {canRequestOtp && (
        <button
          onClick={() => {
            setSeconds(59);
            setCanRequestOtp(false);
          }}
          className="text-shuttlelaneBlack text-sm mt-4"
        >
          Resend code
        </button>
      )}
    </div>
  );
}

export default DriverSignupStepSeven;
