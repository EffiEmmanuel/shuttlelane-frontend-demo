import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import DatePicker from "rsuite/DatePicker";
import "rsuite/dist/rsuite.css";
import enGB from "date-fns/locale/en-GB";
import { ImSpinner2 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { updateDriver } from "../../../../redux/slices/driverSlice";
import { validateFields } from "../../../../util";
import { toast } from "react-toastify";

function DriverSignupStepTwo({
  isStepTwo,
  stepTwoStates,
  isUpdateDriverAccount,
}) {
  const genderOptions = [
    {
      value: "Male",
      label: "Male",
    },
    {
      value: "Female",
      label: "Female",
    },
    {
      value: "Prefer not to say",
      label: "Prefer not to say",
    },
  ];
  const maritalStatusOptions = [
    {
      value: "Married",
      label: "Married",
    },
    {
      value: "Single",
      label: "Single",
    },
    {
      value: "Divorced",
      label: "Divorced",
    },
    {
      value: "Prefer not to say",
      label: "Prefer not to say",
    },
  ];
  const educationOptions = [
    {
      value: "Primary",
      label: "Primary",
    },
    {
      value: "Secondary",
      label: "Secondary",
    },
    {
      value: "Polytechnic",
      label: "Polytechnic",
    },
    {
      value: "University",
      label: "University",
    },
    {
      value: "Other",
      label: "Other",
    },
  ];

  // Scroll to top handler
  const scrollTopRef = useRef(null);
  useEffect(() => {
    if (!isUpdateDriverAccount) {
      scrollTopRef.current.scrollIntoView();
    }
  }, [isStepTwo]);

  // UPDATE DRIVER STATES
  const { isLoading, token, driver } = useSelector((store) => store.driver);
  const dispatch = useDispatch();

  // UPDATE DRIVER HANDLER
  async function handleUpdateDriver(e) {
    e.preventDefault();
    const areFieldsEmpty = validateFields([
      stepTwoStates?.dateOfBirth,
      stepTwoStates?.address,
      stepTwoStates?.city,
      stepTwoStates?.state,
      stepTwoStates?.maritalStatus,
      stepTwoStates?.bvn,
      stepTwoStates?.nin,
      stepTwoStates?.driverLicense,
    ]);
    if (areFieldsEmpty) {
      toast.error(areFieldsEmpty?.message);
    } else {
      const values = {
        dateOfBirth: stepTwoStates?.dateOfBirth?.split("T")[1],
        address: stepTwoStates?.address,
        city: stepTwoStates?.city,
        state: stepTwoStates?.state,
        maritalStatus: stepTwoStates?.maritalStatus?.value,
        bvn: stepTwoStates?.bvn,
        nin: stepTwoStates?.nin,
        driverLicense: stepTwoStates?.driverLicense,
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
      {!isUpdateDriverAccount && (
        <>
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-2xl text-shuttlelaneBlack">
              Personal Details
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
        {/* Date of birth */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="dateOfBirth" className="text-sm">
            Date Of Birth{" "}
            {isUpdateDriverAccount && (
              <span>: {stepTwoStates?.dateOfBirth?.split("T")[0]}</span>
            )}
          </label>
          <DatePicker
            locale={enGB}
            value={stepTwoStates?.dateOfBirth}
            onChange={(date) => {
              console.log("DATE:", date);
              stepTwoStates?.setDateOfBirth(date);
            }}
            appearance="subtle"
            placeholder="Date of birth"
            style={{
              backgroundColor: "transparent",
              display: "flex",
              alignItems: "center",
              position: "relative",
              outline: "none",
              color: "black",
              zIndex: 80,
            }}
            className="w-full h-12 flex items-center border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        {/* Address */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="address" className="text-sm">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={stepTwoStates?.address}
            onChange={(e) => {
              stepTwoStates?.setAddress(e.target.value);
            }}
            placeholder="Home address"
            className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        {/* City */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="city" className="text-sm">
            City
          </label>
          <input
            type="text"
            name="city"
            value={stepTwoStates?.city}
            onChange={(e) => {
              stepTwoStates?.setCity(e.target.value);
            }}
            placeholder="City"
            className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        {/* State */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="state" className="text-sm">
            State
          </label>
          <input
            type="text"
            name="state"
            value={stepTwoStates?.state}
            onChange={(e) => {
              stepTwoStates?.setState(e.target.value);
            }}
            placeholder="State"
            className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        {/* Marital Status */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="maritalStatus" className="text-sm">
            Marital Status
          </label>
          <Select
            value={stepTwoStates?.maritalStatus}
            onChange={(value) => {
              stepTwoStates?.setMaritalStatus(value);
            }}
            options={maritalStatusOptions}
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
            placeholder="Select Marital Status"
            className="w-full h-12 flex items-center border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        {/* BVN */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="bvn" className="text-sm">
            BVN
          </label>
          <input
            type="tel"
            name="bvn"
            value={stepTwoStates?.bvn}
            onChange={(e) => {
              stepTwoStates?.setBvn(e.target.value);
            }}
            placeholder="***********"
            name="bvn"
            className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        {/* NIN */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="nin" className="text-sm">
            NIN
          </label>
          <input
            type="tel"
            name="nin"
            value={stepTwoStates?.nin}
            onChange={(e) => {
              stepTwoStates?.setNin(e.target.value);
            }}
            placeholder="***********"
            name="nin"
            className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        {/* Driver's License Number */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="driverLicenseNumber" className="text-sm">
            Driver's License Number
          </label>
          <input
            type="tel"
            name="driverLicenseNumber"
            value={stepTwoStates?.driverLicense}
            onChange={(e) => {
              stepTwoStates?.setDriverLicense(e.target.value);
            }}
            placeholder="***********"
            name="driverLicenseNumber"
            className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
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

export default DriverSignupStepTwo;
