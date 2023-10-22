import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import DatePicker from "rsuite/DatePicker";
import "rsuite/dist/rsuite.css";
import enGB from "date-fns/locale/en-GB";

function DriverSignupStepThree(props) {
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
  const carTypeOptions = [
    {
      value: "Toyota Rav 4",
      label: "Toyota Rav 4",
    },
    {
      value: "Toyota Rav 5",
      label: "Toyota Rav 5",
    },
    {
      value: "Toyota Rav 6",
      label: "Toyota Rav 6",
    },
    {
      value: "Toyota Rav 6",
      label: "Toyota Rav 6",
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

  // Form fields
  const [selectedCarType, setSelectedCarType] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedEducation, setSelectedEducation] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState();
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState("");

  // Scroll to top handler
  const scrollTopRef = useRef(null);
  useEffect(() => {
    console.log("HELLO FROM THIS COMPONENT");
    scrollTopRef.current.scrollIntoView();
  }, [props?.isStepThree]);

  return (
    <div className="px-10 pt-10" ref={scrollTopRef}>
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-2xl text-shuttlelaneBlack">
          Car Details
        </h2>

        <button className="h-5 w-16 text-sm flex items-center justify-center border-[.3px] border-shuttlelaneBlack rounded-full p-2">
          Skip
        </button>
      </div>
      <p className="text-sm">Sign up to start driving for Shuttlelane</p>

      {/* FORM */}
      <form className="text-shuttlelaneBlack mt-10 flex flex-col gap-y-5">
        {/* Type */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="carType" className="text-sm">
            Car Type
          </label>
          <Select
            value={selectedMaritalStatus}
            onChange={(value) => setSelectedCarType(value)}
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
            placeholder="Car Year"
            className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>
      </form>
    </div>
  );
}

export default DriverSignupStepThree;
