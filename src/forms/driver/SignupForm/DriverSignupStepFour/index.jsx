// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { BiSolidCity } from "react-icons/bi";
import Select from "react-select";
import CountryData from "country-codes-list";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch, useSelector } from "react-redux";
import { ImSpinner2 } from "react-icons/im";
import { updateDriver } from "../../../../redux/slices/driverSlice";
import { ToastContainer, toast } from "react-toastify";
import { validateFields } from "../../../../util";

function DriverSignupStepFour({
  isStepFour,
  stepFourStates,
  isUpdateDriverAccount,
}) {
  const relationshipOptions = [
    {
      value: "Father",
      label: "Father",
    },
    {
      value: "Mother",
      label: "Mother",
    },
    {
      value: "Brother",
      label: "Brother",
    },
    {
      value: "Sister",
      label: "Sister",
    },
    {
      value: "Other",
      label: "Other",
    },
  ];

  // Form fields
  const [selectedRelationship, setSelectedRelationship] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Scroll to top handler
  const scrollTopRef = useRef(null);
  useEffect(() => {
    console.log("HELLO FROM THIS COMPONENT");
    if (!isUpdateDriverAccount) {
      scrollTopRef.current.scrollIntoView();
    }
  }, [isStepFour]);

  // UPDATE DRIVER STATES
  const { isLoading, token, driver } = useSelector((store) => store.driver);
  const dispatch = useDispatch();

  // UPDATE DRIVER HANDLER
  async function handleUpdateDriver(e) {
    e.preventDefault();
    const areFieldsEmpty = validateFields([
      stepFourStates?.emergencyFirstName,
      stepFourStates?.emergencyLastName,
      stepFourStates?.emergencyAddress,
      stepFourStates?.emergencyMobile,
      stepFourStates?.emergencyRelationship,
    ]);
    if (areFieldsEmpty) {
      toast.error(areFieldsEmpty?.message);
    } else {
      const values = {
        emergencyFirstName: stepFourStates?.emergencyFirstName,
        emergencyLastName: stepFourStates?.emergencyLastName,
        emergencyAddress: stepFourStates?.emergencyAddress,
        emergencyMobile: stepFourStates?.emergencyMobile?.value,
        emergencyRelationship: stepFourStates?.emergencyRelationship?.value,
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
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-2xl text-shuttlelaneBlack">
              Emergency Contact
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
        {/* First Name */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="emergencyFirstName" className="text-sm">
            First Name
          </label>
          <input
            placeholder="John"
            name="emergencyFirstName"
            value={stepFourStates?.emergencyFirstName}
            onChange={(e) => {
              stepFourStates?.setEmergencyFirstName(e.target.value);
            }}
            className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>
        {/* Last Name */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="emergencyLastName" className="text-sm">
            Last Name
          </label>
          <input
            placeholder="Doe"
            name="emergencylastName"
            value={stepFourStates?.emergencyLastName}
            onChange={(e) => {
              stepFourStates?.setEmergencyLastName(e.target.value);
            }}
            className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        {/* Address */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="emergencyAddress" className="text-sm">
            Address
          </label>
          <input
            type="text"
            name="emergencyAddress"
            value={stepFourStates?.emergencyAddress}
            onChange={(e) => {
              stepFourStates?.setEmergencyAddress(e.target.value);
            }}
            placeholder="Home address"
            className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="emergencyMobile" className="text-sm">
            Phone
          </label>

          <PhoneInput
            country={"us"}
            searchPlaceholder="Search"
            placeholder="---- --- ----"
            value={stepFourStates?.emergencyMobile}
            onChange={(value) =>
              stepFourStates?.setEmergencyMobile(`+${value}`)
            }
            containerClass="w-full h-12 p-3 border-[.5px] border-gray-400 outline-none focus:outline-none rounded-lg text-sm"
            inputClass="border-none h-full"
            buttonClass="bg-transparent"
          />
        </div>

        {/* Relationship */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="emergencyRelationship" className="text-sm">
            Relationship
          </label>
          <Select
            value={stepFourStates?.emergencyRelationship}
            onChange={(value) => {
              stepFourStates?.setEmergencyRelationship(value);
            }}
            options={relationshipOptions}
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
            placeholder="Select Relationship"
            className="w-full h-12 flex items-center border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
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

export default DriverSignupStepFour;
