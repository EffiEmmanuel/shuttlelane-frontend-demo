// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { BiSolidCity } from "react-icons/bi";
import Select from "react-select";
import CountryData from "country-codes-list";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { ImSpinner2 } from "react-icons/im";
import { verifyTotp } from "../../../redux/slices/adminSlice";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AdminLoginOtpForm(props) {
  // Scroll to top handler
  const scrollTopRef = useRef(null);

  // Form field
  const [otp, setOtp] = useState();

  const {
    isLoading,
    is2faLoading,
    admin,
    isLoginDetailsCorrect,
    hasVerifiedTotp,
  } = useSelector((store) => store.admin);
  const dispatch = useDispatch();

  // VERIFY OTP
  async function handleVerifyOTP(e) {
    e.preventDefault();
    dispatch(
      verifyTotp({
        adminId: admin?._id,
        code: otp,
      })
    );
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && hasVerifiedTotp && isLoginDetailsCorrect) {
      navigate("/admin/dashboard");
    }
  }, [isLoading, hasVerifiedTotp, isLoginDetailsCorrect]);

  return (
    <div
      className={`${!props?.isUpdateVendorAccount && "px-10 pt-10"}`}
      ref={scrollTopRef}
    >
      <ToastContainer />

      <div className="flex flex-row items-center justify-between">
        <div>
          <h2 className="font-semibold text-2xl text-shuttlelaneBlack">
            2-Factor Authentication
          </h2>

          <p className="text-sm">
            For added security, please provide an OTP from your authenticator
            app in order to log in to your admin account
          </p>
        </div>
      </div>

      {/* FORM */}
      <form className="text-shuttlelaneBlack mt-10 flex flex-col gap-y-5">
        <OTPInput
          value={otp}
          onChange={(value) => setOtp(value)}
          numInputs={6}
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
            disabled={is2faLoading}
            className="lg:w-1/4 w-full h-13 p-3 focus:outline-none bg-shuttlelanePurple flex items-center justify-center text-white border-gray-400 rounded-lg"
          >
            {is2faLoading ? (
              <ImSpinner2 size={21} className="text-white animate-spin" />
            ) : (
              "Verify OTP"
            )}
          </button>
        </>
      </form>
    </div>
  );
}

export default AdminLoginOtpForm;
