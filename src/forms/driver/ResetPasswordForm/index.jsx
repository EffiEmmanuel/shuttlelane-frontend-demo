// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { BiSolidCity } from "react-icons/bi";
import Select from "react-select";
import CountryData from "country-codes-list";
import { useDispatch, useSelector } from "react-redux";
import { ImSpinner2 } from "react-icons/im";
import { resetDriverPassword } from "../../../redux/slices/driverSlice";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function DriverResetPasswordForm() {
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();

  const { isLoading, driver, token, hasResetPassword } = useSelector(
    (store) => store.driver
  );
  const dispatch = useDispatch();

  async function handleResetPassword(e) {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      toast.error("Please fill in the missing fields!");
      return;
    }
    const values = {
      token: token,
      newPassword: newPassword,
      oldPassword: oldPassword,
      driverId: driver?._id,
      userType: "driver",
    };
    dispatch(resetDriverPassword({ values: { ...values } }));
  }

  const navigator = useNavigate();

  useEffect(() => {
    if (hasResetPassword) {
      setTimeout(() => {
        navigator("/driver/login");
      }, 1000);
    }
  }, [hasResetPassword]);

  return (
    <div>
      <ToastContainer />
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-2xl text-shuttlelaneBlack">
          Reset Password
        </h2>
      </div>

      <p className="text-sm">Reset your account password</p>

      {/* FORM */}
      <form className="text-shuttlelaneBlack mt-10 flex flex-col gap-y-5">
        {/* Old Password */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="oldPassword" className="text-sm">
            Old Password
          </label>
          <input
            type="password"
            name="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="********"
            className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>
        {/* New Password */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="newPassword" className="text-sm">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="********"
            className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        <button
          //   type="submit"
          onClick={(e) => handleResetPassword(e)}
          className="lg:w-1/4 w-full h-13 p-3 focus:outline-none bg-shuttlelaneGold flex items-center justify-center text-white border-gray-400 rounded-lg"
        >
          {isLoading ? (
            <ImSpinner2 size={21} className="text-white animate-spin" />
          ) : (
            "Reset password"
          )}
        </button>
      </form>
    </div>
  );
}

export default DriverResetPasswordForm;
