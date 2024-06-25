// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { BiSolidCity } from "react-icons/bi";
import Select from "react-select";
import CountryData from "country-codes-list";
import { ImSpinner2 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { validateFields } from "../../../../util";
import { ToastContainer, toast } from "react-toastify";
import { updateDriver } from "../../../../redux/slices/driverSlice";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

function DriverSignupStepFive({
  isStepFive,
  stepFiveStates,
  isUpdateDriverAccount,
}) {
  const otherRideHailingOptions = [
    {
      value: true,
      label: "Yes",
    },
    {
      value: false,
      label: "No",
    },
  ];

  // Form fields
  const [selectedOtherRideHailing, setSelectedOtherRideHailing] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Scroll to top handler
  const scrollTopRef = useRef(null);
  useEffect(() => {
    if (!isUpdateDriverAccount) {
      scrollTopRef.current.scrollIntoView();
    }
  }, [isStepFive]);

  // UPDATE DRIVER STATES
  const { isLoading, token, driver } = useSelector((store) => store.driver);
  const dispatch = useDispatch();

  // UPDATE DRIVER HANDLER
  async function handleUpdateDriver(e) {
    e.preventDefault();
    const areFieldsEmpty = validateFields([
      stepFiveStates?.isDrivingForHailingPlatforms,
      stepFiveStates?.otherHailingPlatforms,
    ]);
    if (areFieldsEmpty) {
      toast.error(areFieldsEmpty?.message);
    } else {
      const values = {
        isDrivingForHailingPlatforms:
          stepFiveStates?.isDrivingForHailingPlatforms?.value,
        otherHailingPlatforms: stepFiveStates?.otherHailingPlatforms,
      };

      dispatch(
        updateDriver({
          values: { ...values },
          token: token,
          driverId: driver?._id,
        })
      );
    }
  }

  return (
    <div
      className={`${!isUpdateDriverAccount && "px-10 pt-10"}`}
      ref={scrollTopRef}
    >
      <ToastContainer />
      {!isUpdateDriverAccount && (
        <>
          <Link
            to="/"
            className="mb-5 flex flex-row items-center gap-x-2 text-shuttlelaneBlack hover:underline no-underline visited:no-underline hover:text-shuttlelaneBlack visited:text-shuttlelaneBlack"
          >
            <BsArrowLeft size={14} className="text-shuttlelaneBlack" />
            <span className="text-xs">Go back to Homepage</span>
          </Link>
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-2xl text-shuttlelaneBlack">
              Additional Information
            </h2>

            {/* <button className="h-5 w-16 text-sm flex items-center justify-center border-[.3px] border-shuttlelaneBlack rounded-full p-2">
    Skip
  </button> */}
          </div>

          <p className="text-sm">Sign up to start driving for Shuttlelane</p>
        </>
      )}

      {/* FORM */}
      <form className="text-shuttlelaneBlack mt-10 flex flex-col gap-y-5">
        {/* Ride Hailing? */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="rideHailing" className="text-sm">
            Are you currently driving for any ride-hailing platforms? (eg. Uber,
            Taxify, Oride,etc.)
          </label>
          <Select
            value={stepFiveStates?.isDrivingForHailingPlatforms}
            onChange={(value) =>
              stepFiveStates?.setIsDrivingForHailingPlatforms(value)
            }
            options={otherRideHailingOptions}
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
            placeholder="Select Answer"
            className="w-full h-12 flex items-center border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        {/* Ride Hailing Service */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="rideHailing" className="text-sm">
            If yes, specify the name
          </label>
          <input
            placeholder="Eg. Bolt, Rida"
            className="text-[16px] w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        {isUpdateDriverAccount && (
          <button
            //   type="submit"
            onClick={(e) => handleUpdateDriver(e)}
            className="lg:w-1/4 w-full h-13 p-3 focus:outline-none bg-shuttlelaneGold flex items-center justify-center text-white border-gray-400 rounded-lg"
          >
            {isLoading ? (
              <ImSpinner2 size={21} className="text-white animate-spin" />
            ) : (
              "Save changes"
            )}
          </button>
        )}
      </form>
    </div>
  );
}

export default DriverSignupStepFive;
