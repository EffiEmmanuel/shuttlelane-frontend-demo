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
} from "../../../redux/slices/vendorSlice";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function VendorLoginOtpForm(props) {
  // Scroll to top handler
  const scrollTopRef = useRef(null);
  useEffect(() => {
    console.log("HELLO FROM THIS COMPONENT");
    scrollTopRef.current.scrollIntoView();
  }, [props?.isStepSeven]);

  // Form field
  const [otp, setOtp] = useState();

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
    isVerifyOtpLoading,
    vendor,
    hasClickedSendCode,
    hasVerifiedPhone,
    isLoginDetailsCorrect,
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
        code: otp,
        isLoginOtp: true,
      })
    );
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && hasVerifiedPhone && isLoginDetailsCorrect) {
      navigate("/vendor/dashboard");
    }
  }, [isLoading, hasVerifiedPhone, isLoginDetailsCorrect]);

  return (
    <div
      className={`${!props?.isUpdateVendorAccount && "px-10 pt-10"}`}
      ref={scrollTopRef}
    >
      <ToastContainer />
      {!props?.isUpdateVendorAccount && (
        <div className="flex flex-row items-center justify-between">
          <div>
            <h2 className="font-semibold text-2xl text-shuttlelaneBlack">
              2-Factor Authentication
            </h2>

            <p className="text-sm">
              For added security, an OTP has been sent to your registered phone
              number. Please provide that OTP in order to log in to your vendor
              account
            </p>
          </div>
        </div>
      )}

      {/* FORM */}
      <form className="text-shuttlelaneBlack mt-10 flex flex-col gap-y-5">
        <OTPInput
          value={otp}
          onChange={(value) => setOtp(value)}
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

        <>
          <button
            //   type="submit"
            onClick={(e) => handleVerifyOTP(e)}
            disabled={isVerifyOtpLoading}
            className="lg:w-1/4 w-full h-13 p-3 focus:outline-none bg-shuttlelanePurple flex items-center justify-center text-white border-gray-400 rounded-lg"
          >
            {isVerifyOtpLoading ? (
              <ImSpinner2 size={21} className="text-white animate-spin" />
            ) : (
              "Verify OTP"
            )}
          </button>
        </>
      </form>

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

export default VendorLoginOtpForm;
