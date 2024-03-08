import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import DatePicker from "rsuite/DatePicker";
import "rsuite/dist/rsuite.css";
import enGB from "date-fns/locale/en-GB";
import { useDispatch, useSelector } from "react-redux";
import { ImSpinner2 } from "react-icons/im";
import { validateFields } from "../../../../util";
import { toast } from "react-toastify";
import { updateDriver } from "../../../../redux/slices/driverSlice";

function DriverSignupStepThree({
  isStepThree,
  stepThreeStates,
  isUpdateDriverAccount,
}) {
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
    if (!isUpdateDriverAccount) {
      scrollTopRef.current.scrollIntoView();
    }
  }, [isStepThree]);

  // UPDATE DRIVER STATES
  const { isLoading, token, driver } = useSelector((store) => store.driver);
  const dispatch = useDispatch();

  // UPDATE DRIVER HANDLER
  async function handleUpdateDriver(e) {
    e.preventDefault();
    const areFieldsEmpty = validateFields([
      stepThreeStates?.carType,
      stepThreeStates?.carName,
      stepThreeStates?.carModel,
      stepThreeStates?.carYear,
      stepThreeStates?.carColor,
      stepThreeStates?.carPlateNumber,
    ]);
    if (areFieldsEmpty) {
      toast.error(areFieldsEmpty?.message);
    } else {
      const values = {
        carType: stepThreeStates?.carType?.value,
        carName: stepThreeStates?.carName,
        carModel: stepThreeStates?.carModel,
        carYear: stepThreeStates?.carYear,
        carColor: stepThreeStates?.carColor,
        carPlateNumber: stepThreeStates?.carPlateNumber,
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
              Car Details
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

        {/* Color */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="carColor" className="text-sm">
            Color
          </label>
          <input
            type="text"
            name="carColor"
            value={stepThreeStates?.carColor}
            onChange={(e) => {
              stepThreeStates?.setCarColor(e.target.value);
            }}
            placeholder="Car Color"
            className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        {/* Plate Number */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="carPlateNumber" className="text-sm">
            Plate Number
          </label>
          <input
            type="text"
            name="carPlateNumber"
            value={stepThreeStates?.carPlateNumber}
            onChange={(e) => {
              stepThreeStates?.setCarPlateNumber(e.target.value);
            }}
            placeholder="Car Plate Number"
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

export default DriverSignupStepThree;
