import React, { useEffect, useRef, useState } from "react";
import { BiSolidCity } from "react-icons/bi";
import { ImSpinner2 } from "react-icons/im";
import Select from "react-select";
import CountryData from "country-codes-list";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch, useSelector } from "react-redux";
import { validateFields } from "../../../../util";
import { updateDriver } from "../../../../redux/slices/driverSlice";
import { ToastContainer, toast } from "react-toastify";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { FaXmark } from "react-icons/fa6";

function DriverSignupStepOne({
  isStepOne,
  stepOneStates,
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
    console.log("HELLO FROM THIS COMPONENT");
    if (!isUpdateDriverAccount) {
      scrollTopRef.current.scrollIntoView();
    }
  }, [isStepOne]);

  // UPDATE DRIVER STATES
  const { isLoading, token, driver } = useSelector((store) => store.driver);
  const dispatch = useDispatch();
  // UPDATE DRIVER HANDLER
  async function handleUpdateDriver(e) {
    console.log("HELLO");
    e.preventDefault();
    const areFieldsEmpty = validateFields([
      stepOneStates?.image,
      stepOneStates?.firstName,
      stepOneStates?.middleName,
      stepOneStates?.lastName,
      stepOneStates?.email,
      stepOneStates?.gender,
      stepOneStates?.mobile,
      stepOneStates?.alternateMobile,
      stepOneStates?.education,
    ]);
    if (areFieldsEmpty) {
      console.log("HELLO 2");
      toast.error(areFieldsEmpty?.message);
    } else {
      console.log("HELLO 3");
      const values = {
        firstName: stepOneStates?.firstName,
        middleName: stepOneStates?.middleName,
        lastName: stepOneStates?.lastName,
        email: stepOneStates?.email,
        gender: stepOneStates?.gender?.value,
        mobile: stepOneStates?.mobile,
        alternateMobile: stepOneStates?.alternateMobile,
        education: stepOneStates?.education?.value,
      };

      console.log("HELLO 4");

      dispatch(
        updateDriver({
          values: { ...values },
          token: token,
          driverId: driver?._id,
        })
      );
    }
  }

  // Handle image
  const [renderImage, setRenderImage] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    console.log("FILE:", file);
    stepOneStates?.setImage(file);

    reader.onloadend = () => {
      setRenderImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={`${!isUpdateDriverAccount && "px-10 pt-10"}`}
      ref={scrollTopRef}
    >
      <ToastContainer />
      {!isUpdateDriverAccount && (
        <>
          <h2 className="font-semibold text-2xl text-shuttlelaneBlack">
            Create an account
          </h2>
          <p className="text-sm">Sign up to start driving for Shuttlelane</p>
        </>
      )}

      {/* FORM */}
      <form className="text-shuttlelaneBlack mt-10 flex flex-col gap-y-5">
        {/* Image */}
        <div className="w-full flex flex-col">
          <label htmlFor="profilePicture" className="text-sm">
            Profile Picture
          </label>
          <div className="w-full relative border-dashed border-[1px] border-gray-300 rounded-lg h-24 flex flex-col items-center justify-center overflow-hidden">
            <>
              <MdOutlineAddAPhoto size={24} className="text-gray-300" />
              <small className="text-gray-300 text-center">
                Click to Insert Profile Picture
              </small>
              <input
                className="absolute top-0 bg-transparent w-full h-full opacity-0 cursor-pointer"
                type="file"
                name="image"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </>

            {renderImage && stepOneStates?.image && (
              <div className="absolute w-full h-full top-0 flex justify-center items-center">
                <FaXmark
                  onClick={() => {
                    setRenderImage(null);
                    stepOneStates?.setImage(null);
                  }}
                  size={16}
                  className="absolute top-3 right-3 cursor-pointer"
                />
                <img
                  src={renderImage}
                  alt="Uploaded"
                  className="object-cover h-full w-full z-10"
                />
              </div>
            )}
          </div>
        </div>

        {/* First Name */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="firstName" className="text-sm">
            First Name
          </label>
          <input
            placeholder="John"
            type="text"
            name="firstName"
            value={stepOneStates?.firstName}
            onChange={(e) => {
              console.log("state:", e.target.value);
              stepOneStates?.setFirstName(e.target.value);
            }}
            className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>
        {/* Middle Name and Last Name */}
        <div className="flex flex-col w-full lg:flex-row items-center gap-x-3 gap-y-3">
          <div className="flex w-full flex-col gap-y-1">
            <label htmlFor="middleName" className="text-sm">
              Middle Name
            </label>
            <input
              placeholder="Snow"
              type="text"
              name="middleName"
              value={stepOneStates?.middleName}
              onChange={(e) => {
                console.log("state:", e.target.value);
                stepOneStates?.setMiddleName(e.target.value);
              }}
              className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
            />
          </div>
          <div className="flex w-full flex-col gap-y-1">
            <label htmlFor="lastName" className="text-sm">
              Last Name
            </label>
            <input
              placeholder="Doe"
              type="text"
              name="lastName"
              value={stepOneStates?.lastName}
              onChange={(e) => {
                console.log("state:", e.target.value);
                stepOneStates?.setLastName(e.target.value);
              }}
              className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
            />
          </div>
        </div>

        {/* Email Address */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="email" className="text-sm">
            Email Address
          </label>
          <input
            type="email"
            placeholder="abc@example.com"
            name="email"
            value={stepOneStates?.email}
            onChange={(e) => {
              console.log("state:", e.target.value);
              stepOneStates?.setEmail(e.target.value);
            }}
            className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        {/* Gender */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="emailAddress" className="text-sm">
            Gender
          </label>
          <Select
            value={stepOneStates?.gender}
            onChange={(value) => {
              stepOneStates?.setGender(value);
            }}
            options={genderOptions}
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
            placeholder="Select Gender"
            className="w-full h-12 flex items-center border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        {/* Education */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="education" className="text-sm">
            Education
          </label>
          <Select
            value={stepOneStates?.education}
            onChange={(value) => {
              stepOneStates?.setEducation(value);
            }}
            options={educationOptions}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? "transparent" : "transparent",
                borderWidth: state.isFocused ? "0" : "0",
                backgroundColor: "transparent",
                position: "relative",
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
            placeholder="Education"
            className="w-full h-12 flex items-center border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="mobile" className="text-sm">
            Phone
          </label>

          <PhoneInput
            country={"us"}
            searchPlaceholder="Search"
            placeholder="---- --- ----"
            value={stepOneStates?.mobile}
            onChange={(value) => stepOneStates?.setMobile(`+${value}`)}
            containerClass="w-full h-12 p-3 border-[.5px] border-gray-400 outline-none focus:outline-none rounded-lg text-sm"
            inputClass="border-none h-full"
            buttonClass="bg-transparent"
          />
        </div>

        {/* Alternative Phone */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="alternateMobile" className="text-sm">
            Alternative Phone
          </label>
          <PhoneInput
            country={"us"}
            searchPlaceholder="Search"
            placeholder="---- --- ----"
            value={stepOneStates?.alternateMobile}
            onChange={(value) => stepOneStates?.setAlternateMobile(`+${value}`)}
            containerClass="w-full h-12 p-3 border-[.5px] border-gray-400 outline-none focus:outline-none rounded-lg text-sm"
            inputClass="border-none h-full"
            buttonClass="bg-transparent"
          />
        </div>

        {isUpdateDriverAccount && (
          <button
            type="submit"
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

export default DriverSignupStepOne;
