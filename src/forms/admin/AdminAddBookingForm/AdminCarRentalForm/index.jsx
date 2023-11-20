import { useFormik } from "formik";
import AdminAddBookingUserDetailsSchema from "../validation";
import { useState } from "react";
import React, { useRef } from "react";

import { BsAirplane } from "react-icons/bs";
import { MdOutlineLuggage } from "react-icons/md";
import { IoCarSportOutline, IoLocationOutline } from "react-icons/io5";
import Select from "react-select";
import LocationInput from "../../../../components/ui/Form/LocationInput";
import { BiMinus, BiSolidCity } from "react-icons/bi";
import DatePicker from "rsuite/DatePicker";
import "rsuite/dist/rsuite.css";
import enGB from "date-fns/locale/en-GB";

// Images
import economy from "../../../../assets/images/cars/economy.png";
import business from "../../../../assets/images/cars/business.png";
import executive from "../../../../assets/images/cars/executive.png";
import luxury from "../../../../assets/images/cars/luxury.png";
import shuttle from "../../../../assets/images/cars/shuttle.png";
import shuttleExtra from "../../../../assets/images/cars/shuttleExtra.png";
import { ImSpinner2 } from "react-icons/im";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";
import { TbBrandDaysCounter } from "react-icons/tb";

function AdminCarRentalForm() {
  // Date Setup
  const minSelectableDate = new Date(); //
  // A function to disable dates earlier than the minimum date
  const disableDateBeforeMin = (date) => {
    return date < minSelectableDate;
  };

  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState("");
  // Dropoff details
  const [dropoffLocation, setDropoffLocation] = useState();
  const [dropoffLocationInput, setDropoffLocationInput] = useState();
  const dropoffLocationRef = useRef();

  // Pickup details
  const [pickupLocation, setPickupLocation] = useState();
  const [pickupLocationInput, setPickupLocationInput] = useState();
  const pickupLocationRef = useRef();
  const [pickupDate, setPickupDate] = useState();
  const [pickupTime, setPickupTime] = useState();

  // City Data
  const cityData = [
    { value: "Lagos", label: "Lagos" },
    { value: "Accra", label: "Accra" },
    { value: "Ogun", label: "Ogun" },
    { value: "Ibadans", label: "Ibadanss" },
  ];

  // FORM FIELDS
  const [selectedCity, setSelectedCity] = useState("");

  // Function: Handle log in admin
  async function onSubmit(values, actions) {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }

  // Title options
  const titleOptions = [
    {
      value: "Mr",
      label: "Mr",
    },
    {
      value: "Mrs",
      label: "Mrs",
    },
    {
      value: "Miss",
      label: "Miss",
    },
    {
      value: "Ms",
      label: "Ms",
    },
  ];

  // Days Form Field
  const [days, setDays] = useState("");

  // Passenger Form Fields
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [middleName, setMiddleName] = useState();
  const [emailAddress, setEmailAddress] = useState();
  const [phone, setPhone] = useState();

  return (
    <form className="text-shuttlelaneBlack mt-10 flex flex-col gap-y-5">
      {/* Booking Details */}
      <div className="mb-1">
        <p className="font-medium">Booking Details</p>
        <div className="h-1 w-[30px] rounded-xl bg-shuttlelanePurple"></div>
      </div>

      <div className="flex flex-col lg:flex-row gap-y-5 lg:items-center gap-x-4">
        {/* City */}
        <div className="lg:w-[50%] w-full flex flex-col gap-y-1">
          <label htmlFor="city" className="text-sm">
            City
          </label>
          <div className="flex h-11 items-center border-[0.3px] bg-transparent focus:outline-none border-gray-400 py-2 px-2 gap-x-2 w-full rounded-lg">
            <div className="w-[5%]">
              <BiSolidCity size={16} className="text-gray-500" />
            </div>

            <div className="w-[95%] text-shuttlelaneBlack text-sm relative">
              <Select
                value={selectedCity}
                onChange={(value) => setSelectedCity(value)}
                options={cityData}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: state.isFocused
                      ? "transparent"
                      : "transparent",
                    borderWidth: state.isFocused ? "0" : "0",
                    backgroundColor: "transparent",
                    position: "relative",
                    zIndex: 80,
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
                placeholder="Select City"
              />
            </div>
          </div>
        </div>

        {/* Pickup Addresss */}
        <div className="lg:w-[50%] w-full flex flex-col gap-y-1">
          <label htmlFor="pickupLocation" className="text-sm">
            Pickup Location
          </label>
          <div className="flex h-11 items-center border-[0.3px] bg-transparent focus:outline-none border-gray-400 py-2 px-2 gap-x-2 w-full rounded-lg">
            <div className="w-[5%]">
              <IoLocationOutline size={16} className="text-gray-700" />
            </div>

            <div className="w-[95%] text-shuttlelaneBlack relative">
              <LocationInput
                placeholder="To (Airport, Port, Address)"
                setLocation={setPickupLocation}
                location={pickupLocation}
                locationRef={pickupLocationRef}
                locationInput={pickupLocationInput}
                setLocationInput={setPickupLocationInput}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-y-5 lg:items-center gap-x-4">
        <div className="w-full flex flex-col gap-y-1">
          <label htmlFor="pickupDate" className="text-sm">
            Pickup Date
          </label>
          <div className="flex h-11 items-center border-[0.3px] bg-transparent focus:outline-none border-gray-400 py-2 px-2 gap-x-2 w-full rounded-lg">
            <div className="w-full">
              <DatePicker
                locale={enGB}
                disabledDate={disableDateBeforeMin}
                value={pickupDate}
                appearance="subtle"
                onChange={(date) => {
                  setPickupDate(date);
                }}
                placeholder="Pickup Date"
                style={{
                  backgroundColor: "transparent",
                }}
                className="text-sm w-full bg-transparent text-shuttlelaneBlack"
              />
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-y-1">
          <label htmlFor="pickupTime" className="text-sm">
            Pickup Time
          </label>

          <div className="flex h-11 items-center border-[0.3px] bg-transparent focus:outline-none border-gray-400 py-2 px-2 gap-x-2 w-full rounded-lg">
            <div className="w-full">
              <DatePicker
                format="HH:mm"
                value={pickupTime}
                appearance="subtle"
                onChange={(time) => {
                  console.log("TIME:", time);
                  setPickupTime(time);
                }}
                placeholder="Pickup Time"
                style={{
                  backgroundColor: "transparent",
                }}
                className="text-sm w-full bg-transparent text-shuttlelaneBlack"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-y-5 lg:items-center gap-x-4">
        {/* Car */}
        <div className="lg:w-[50%] w-full flex flex-col gap-y-1">
          <label htmlFor="car" className="text-sm">
            Choose Car
          </label>
          <div className="flex h-11 items-center border-[0.3px] bg-transparent focus:outline-none border-gray-400 py-2 px-2 gap-x-2 w-full rounded-lg">
            <div className="w-[5%]">
              <IoCarSportOutline size={16} className="text-gray-500" />
            </div>

            <div className="w-[95%] text-shuttlelaneBlack text-sm relative z-[80]">
              <Select
                value={selectedCity}
                onChange={(value) => console.log("VALUE:", value)}
                options={cityData}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: state.isFocused
                      ? "transparent"
                      : "transparent",
                    borderWidth: state.isFocused ? "0" : "0",
                    backgroundColor: "transparent",
                    position: "relative",
                    zIndex: 80,
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
                placeholder="Select Car"
              />
            </div>
          </div>
        </div>

        <div className="lg:w-[50%] w-full flex flex-col gap-y-1">
          <label htmlFor="days" className="text-sm">
            Days
          </label>
          <div className="flex h-11 items-center border-[0.3px] bg-transparent focus:outline-none border-gray-400 py-2 px-2 gap-x-2 w-full rounded-lg">
            <div className="w-[5%]">
              <TbBrandDaysCounter size={16} className="text-gray-500" />
            </div>

            <div className="w-[95%] text-shuttlelaneBlack text-sm">
              <div className="flex items-center">
                <input
                  type="tel"
                  onChange={(e) => {
                    if (isNaN(e.target.value)) {
                      e.target.value = days;
                      toast.info("This field accepts only numbers!");
                      return;
                    } else {
                      if (!(e.target.value > 10)) {
                        setDays(e.target.value);
                      } else {
                        toast.info("You cannot select more than 10 days!");
                      }
                    }
                  }}
                  value={days}
                  className="text-sm px-2 bg-transparent w-full focus:outline-none text-shuttlelaneBlack"
                  placeholder="Days"
                />

                <div className="flex items-center gap-x-2">
                  <div
                    onClick={() => {
                      let newDayValue;
                      if (isNaN(days)) {
                        newDayValue = 1;
                      } else {
                        newDayValue = +days - 1;
                      }

                      if (newDayValue === 0) {
                        toast.info("You cannot select less than 1 day!");
                        return;
                      } else {
                        setDays(+days - 1);
                      }
                    }}
                    className="flex items-center justify-center cursor-pointer p-1 border-[.5px] border-gray-400 rounded-sm"
                  >
                    <BiMinus size={16} className="text-gray-500" />
                  </div>
                  <div
                    onClick={() => {
                      let newDayValue;
                      if (isNaN(days)) {
                        newDayValue = 1;
                      } else {
                        newDayValue = +days + 1;
                      }
                      if (newDayValue > 10) {
                        toast.info("You cannot select more than 10 days!");
                        return;
                      } else {
                        setDays(+days + 1);
                      }
                    }}
                    className="flex items-center justify-center cursor-pointer p-1 border-[.5px] border-gray-400 rounded-sm"
                  >
                    <AiOutlinePlus size={16} className="text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Passenger Details */}
      <div className="mb-1 mt-5">
        <p className="font-medium">Passenger's Details</p>
        <div className="h-1 w-[30px] rounded-xl bg-shuttlelanePurple"></div>
      </div>

      <div className="flex flex-col lg:flex-row gap-y-5 lg:items-center gap-x-4">
        {/* Title */}
        <div className="lg:w-[50%] w-full flex flex-col gap-y-1">
          <label htmlFor="title" className="text-sm">
            Title
          </label>
          <Select
            value={title}
            onChange={(value) => setTitle(value)}
            options={titleOptions}
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
            placeholder="Select Title"
            className="w-full h-12 flex items-center border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        {/* First Name */}
        <div className="lg:w-[50%] w-full flex flex-col gap-y-1">
          <label htmlFor="firstName" className="text-sm">
            First Name
          </label>
          <input
            type="text"
            placeholder="John"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-y-5 lg:items-center gap-x-4">
        {/* Middle Name */}
        <div className="lg:w-[50%] w-full flex flex-col gap-y-1">
          <label htmlFor="middleName" className="text-sm">
            Middle Name
          </label>
          <input
            type="text"
            placeholder="Snow"
            name="middleName"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
            className="w-full h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        {/* Last Name */}
        <div className="lg:w-[50%] w-full flex flex-col gap-y-1">
          <label htmlFor="lastName" className="text-sm">
            Last Name
          </label>
          <input
            type="text"
            placeholder="Doe"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-y-5 lg:items-center gap-x-4">
        {/* Email Address */}
        <div className="lg:w-[50%] w-full flex flex-col gap-y-1">
          <label htmlFor="emailAddress" className="text-sm">
            Email Address
          </label>
          <input
            type="email"
            placeholder="abc@example.com"
            name="emailAddress"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            className="w-full h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        {/* Phone Number */}
        <div className="lg:w-[50%] w-full flex flex-col gap-y-1">
          <label htmlFor="phone" className="text-sm">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="+2341234567890"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
          />
        </div>
      </div>

      <button className="lg:w-44 w-full h-13 p-3 border-[0.3px] focus:outline-none bg-shuttlelanePurple flex items-center justify-center text-white border-gray-400 rounded-lg">
        {isLoading ? (
          <ImSpinner2 size={21} className="text-white animate-spin" />
        ) : (
          "Create Booking"
        )}
      </button>
    </form>
  );
}

export default AdminCarRentalForm;
