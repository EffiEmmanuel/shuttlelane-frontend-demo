// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { BiSolidCity } from "react-icons/bi";
import Select from "react-select";
import CountryData from "country-codes-list";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { ImSpinner2 } from "react-icons/im";
import {
  resendOTP,
  resetHasVerifiedPhone,
  setHasClickedSendCode,
  verifyOTP,
} from "../../../../redux/slices/vendorSlice";
import { ToastContainer, toast } from "react-toastify";

function VendorSignupStepSeven(props) {
  // Scroll to top handler
  const scrollTopRef = useRef(null);
  useEffect(() => {
    console.log("HELLO FROM THIS COMPONENT");
    scrollTopRef.current.scrollIntoView();
  }, [props?.isStepSeven]);

  // Resend OTP setup
  const [seconds, setSeconds] = useState(59);
  const [canRequestOtp, setCanRequestOtp] = useState(false);
  const [canRequestOtpUpdateVendor, setCanRequestOtpUpdateVendor] =
    useState(true);
  useEffect(() => {
    if (seconds === 0) {
      setCanRequestOtp(true);
      setCanRequestOtpUpdateVendor(true);
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

  const {
    isLoading,
    isResendOtpLoading,
    vendor,
    hasClickedSendCode,
    hasVerifiedPhone,
  } = useSelector((store) => store.vendor);
  const dispatch = useDispatch();

  async function handleResendOTP(e) {
    // e.preventDefault();
    console.log("DRIVER:", vendor);
    dispatch(resendOTP({ vendor }));
    if (props?.isUpdateVendorAccount) {
      dispatch(setHasClickedSendCode(true));
      toast.success(
        "An OTP has been sent to your registered phone number. Please use it to verify your account."
      );
    }
  }

  // VERIFY OTP
  async function handleVerifyOTP(e) {
    e.preventDefault();
    dispatch(
      verifyOTP({
        vendor: vendor,
        code: props?.stepSevenStates?.otp,
      })
    );
  }

  useEffect(() => {
    // Redirect to step one
    if (hasVerifiedPhone) {
      props?.setIsCompanyInformation(true);
      props?.isContactDetails(false);

      dispatch(resetHasVerifiedPhone());
    }
  }, [hasVerifiedPhone]);

  return (
    <div
      className={`${!props?.isUpdateVendorAccount && "px-10 pt-10"}`}
      ref={scrollTopRef}
    >
      <ToastContainer />
      {!props?.isUpdateVendorAccount && (
        <>
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-2xl text-shuttlelaneBlack">
              Confirm Phone Number
            </h2>

            {/* <button
          disabled
          className="h-5 w-16 disabled:border-gray-400 disabled:bg-shuttlelaneLightPurple disabled:text-gray-400 text-sm flex items-center justify-center border-[.3px] border-shuttlelaneBlack rounded-full p-2"
        >
          Skip
        </button> */}
          </div>

          <p className="text-sm">
            Sign up as a vendor to start driving for Shuttlelane
          </p>
        </>
      )}

      {/* FORM */}
      <form className="text-shuttlelaneBlack mt-10 flex flex-col gap-y-5">
        <OTPInput
          value={props?.stepFourStates?.otp}
          onChange={props?.stepFourStates?.setOtp}
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

        {props?.isUpdateVendorAccount && (
          <>
            {!hasClickedSendCode && (
              <button
                //   type="submit"
                onClick={(e) => {
                  setSeconds(59);
                  setCanRequestOtpUpdateVendor(false);
                  handleResendOTP(e);
                }}
                className="lg:w-1/4 w-full h-13 p-3 focus:outline-none bg-shuttlelaneGold flex items-center justify-center text-white border-gray-400 rounded-lg"
              >
                {isResendOtpLoading ? (
                  <ImSpinner2 size={21} className="text-white animate-spin" />
                ) : (
                  "Send Code"
                )}
              </button>
            )}

            {hasClickedSendCode && (
              <button
                //   type="submit"
                onClick={(e) => handleVerifyOTP(e)}
                className="lg:w-1/4 w-full h-13 p-3 focus:outline-none bg-shuttlelaneGold flex items-center justify-center text-white border-gray-400 rounded-lg"
              >
                {isLoading ? (
                  <ImSpinner2 size={21} className="text-white animate-spin" />
                ) : (
                  "Verify"
                )}
              </button>
            )}
          </>
        )}
      </form>

      {props?.isUpdateVendorAccount && (
        <>
          {!canRequestOtpUpdateVendor && (
            <p className="text-gray-400 text-sm mt-4">
              Resend code in 00:{seconds}
            </p>
          )}
          {canRequestOtpUpdateVendor && hasClickedSendCode && (
            <button
              onClick={(e) => {
                setSeconds(59);
                setCanRequestOtpUpdateVendor(false);
                handleResendOTP(e);
              }}
              className="text-shuttlelaneBlack text-sm mt-4"
            >
              Resend code
            </button>
          )}
        </>
      )}

      {!props?.isUpdateVendorAccount && (
        <>
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
                handleResendOTP();
              }}
              className="text-shuttlelaneBlack text-sm mt-4"
            >
              Resend code
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default VendorSignupStepSeven;
