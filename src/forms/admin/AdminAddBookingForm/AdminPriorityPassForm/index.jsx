import { useFormik } from "formik";
import AdminAddBookingUserDetailsSchema from "../validation";
import { useEffect, useState } from "react";
import React, { useRef } from "react";

import { BsAirplane, BsPeople } from "react-icons/bs";
import { MdOutlineLuggage, MdOutlineNordicWalking } from "react-icons/md";
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
import { TbBrandDaysCounter } from "react-icons/tb";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlinePlus } from "react-icons/ai";
import {
  createBooking,
  fetchCities,
  fetchCity,
  fetchPasses,
} from "../../../../redux/slices/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaPersonWalkingDashedLineArrowRight } from "react-icons/fa6";
import PersonalDetailsForm from "../../../PersonalDetailsForm";

function AdminPriorityPassForm() {
  // Date Setup
  const minSelectableDate = new Date(); //
  // A function to disable dates earlier than the minimum date
  const disableDateBeforeMin = (date) => {
    return date < minSelectableDate;
  };

  const [title, setTitle] = useState("");

  const [selectedService, setSelectedService] = useState();
  const [selectedPass, setSelectedPass] = useState();

  // Pickup details
  const [pickupLocation, setPickupLocation] = useState();
  const [pickupLocationInput, setPickupLocationInput] = useState();
  const pickupLocationRef = useRef();
  const [pickupDate, setPickupDate] = useState();
  const [pickupTime, setPickupTime] = useState();

  // Redux store states
  const { isLoading, token, cities, passes, bookingCurrency, bookingTotal } =
    useSelector((store) => store.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      console.log("HELLO FROM HERE:", token);
      dispatch(fetchCities(token));
      dispatch(fetchPasses(token));
    }
  }, [token]);

  // FORM FIELDS
  const [selectedCity, setSelectedCity] = useState("");
  // Format cities
  const [citiesData, setCitiesData] = useState();
  useEffect(() => {
    let updatedCityData = [];
    console.log("CITIES FETCHED:", cities);
    cities?.forEach((city) => {
      updatedCityData.push({
        value: city?._id,
        label: city?.cityName,
      });
    });

    setCitiesData(updatedCityData);
  }, [cities]);

  useEffect(() => {
    dispatch(
      fetchCity({
        cityId: selectedCity?.value,
        token,
      })
    );
  }, [selectedCity]);

  // Format passes
  const [passData, setPassData] = useState();
  useEffect(() => {
    let updatedPassData = [];
    console.log("PASSES FETCHED:", passes);
    passes?.forEach((pass) => {
      updatedPassData.push({
        value: pass?._id,
        label: pass?.name,
      });
    });

    setPassData(updatedPassData);
  }, [passes]);

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

  // Service options
  const services = [
    { value: "Arrival Protocol", label: "Arrival Protocol" },
    { value: "Departure Protocol", label: "Departure Protocol" },
  ];

  // Selected Car State
  const [passengers, setPassengers] = useState("");

  // Passenger Form Fields
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [selectedTitle, setSelectedTitle] = useState();
  const [flightNumber, setFlightNumber] = useState();
  const [airline, setAirline] = useState();

  // Handle create booking
  async function handleCreateBooking(e) {
    e.preventDefault();
    dispatch(
      createBooking({
        bookingType: "Priority",
        bookingDetails: {
          title: selectedTitle?.value,
          firstName: fullName?.split(" ")[0],
          lastName: fullName?.split(" ")[1],
          email: email,
          mobile: phoneNumber,
          bookingCurrency: bookingCurrency?._id,
          bookingTotal: bookingTotal,
          passengers: passengers,
          airline: airline,
          flightNumber: flightNumber,
          passSelected: selectedPass?.value,
          citySelected: selectedCity?.value,
          selectedProtocol: selectedService?.value,
          pickupAddress: pickupLocationInput,
          pickupDate: pickupDate,
          pickupTime: pickupTime,
        },
      })
    );
  }

  return (
    <form className="text-shuttlelaneBlack mt-10 flex flex-col gap-y-5">
      <ToastContainer />
      {/* Booking Details */}
      <div className="mb-1">
        <p className="font-medium">Booking Details</p>
        <div className="h-1 w-[30px] rounded-xl bg-shuttlelanePurple"></div>
      </div>

      <div className="flex flex-col lg:flex-row gap-y-5 lg:items-center gap-x-4">
        {/* Service */}
        <div className="lg:w-[50%] w-full flex flex-col gap-y-1">
          <label htmlFor="service" className="text-sm">
            Select Service
          </label>
          <div className="flex h-11 items-center border-[0.3px] bg-transparent focus:outline-none border-gray-400 py-2 px-2 gap-x-2 w-full rounded-lg">
            <div className="w-[5%]">
              <MdOutlineNordicWalking size={16} className="text-gray-500" />
            </div>

            <div className="w-[95%] text-shuttlelaneBlack text-sm relative z-[80]">
              <Select
                value={selectedService}
                onChange={(value) => setSelectedService(value)}
                options={services}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: state.isFocused
                      ? "transparent"
                      : "transparent",
                    borderWidth: state.isFocused ? "0" : "0",
                    backgroundColor: "transparent",
                    position: "relative",
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
                placeholder="Select Service"
              />
            </div>
          </div>
        </div>

        {/* Pass */}
        <div className="lg:w-[50%] w-full flex flex-col gap-y-1">
          <label htmlFor="pass" className="text-sm">
            Select Pass
          </label>
          <div className="flex h-11 items-center border-[0.3px] bg-transparent focus:outline-none border-gray-400 py-2 px-2 gap-x-2 w-full rounded-lg">
            <div className="w-[5%]">
              <FaPersonWalkingDashedLineArrowRight
                size={16}
                className="text-gray-500"
              />
            </div>

            <div className="w-[95%] text-shuttlelaneBlack text-sm relative z-[80]">
              <Select
                value={selectedPass}
                onChange={(value) => setSelectedPass(value)}
                options={passData}
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
                placeholder="Select Pass"
              />
            </div>
          </div>
        </div>
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

            <div className="w-[95%] text-shuttlelaneBlack text-sm relative z-[80]">
              <Select
                value={selectedCity}
                onChange={(value) => setSelectedCity(value)}
                options={citiesData}
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

      <div className="w-full flex flex-col gap-y-1">
        <label htmlFor="passengers" className="text-sm">
          Passengers
        </label>
        <div className="flex h-11 items-center border-[0.3px] bg-transparent focus:outline-none border-gray-400 py-2 px-2 gap-x-2 w-full rounded-lg">
          <div className="w-[5%]">
            <BsPeople size={16} className="text-gray-500" />
          </div>

          <div className="w-[95%] text-shuttlelaneBlack text-sm">
            <div className="flex items-center">
              <input
                type="tel"
                onChange={(e) => {
                  if (isNaN(e.target.value)) {
                    e.target.value = passengers;
                    toast.info("This field accepts only numbers!");
                    return;
                  } else {
                    if (!(e.target.value > 10)) {
                      setPassengers(e.target.value);
                    } else {
                      toast.info(
                        "You cannot select more than 10 passengers / passes!"
                      );
                    }
                  }
                }}
                value={passengers}
                className="text-sm px-2 bg-transparent w-full focus:outline-none text-shuttlelaneBlack"
                placeholder="Passengers"
              />

              <div className="flex items-center gap-x-2">
                <div
                  onClick={() => {
                    let newPassengerValue;
                    if (isNaN(passengers)) {
                      newPassengerValue = 1;
                    } else {
                      newPassengerValue = +passengers - 1;
                    }

                    if (newPassengerValue === 0) {
                      toast.info("You cannot select less than 1 day!");
                      return;
                    } else {
                      setPassengers(+passengers - 1);
                    }
                  }}
                  className="flex items-center justify-center cursor-pointer p-1 border-[.5px] border-gray-400 rounded-sm"
                >
                  <BiMinus size={16} className="text-gray-500" />
                </div>
                <div
                  onClick={() => {
                    let newPassengerValue;
                    if (isNaN(passengers)) {
                      newPassengerValue = 1;
                    } else {
                      newPassengerValue = +passengers + 1;
                    }
                    if (newPassengerValue > 10) {
                      toast.info("You cannot select more than 10 passengers!");
                      return;
                    } else {
                      setPassengers(+passengers + 1);
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

      {/* Passenger Details */}
      <div className="mb-1 mt-5">
        <p className="font-medium">Passenger's Details</p>
        <div className="h-1 w-[30px] rounded-xl bg-shuttlelanePurple"></div>
      </div>

      <PersonalDetailsForm
        selectedTitle={selectedTitle}
        setSelectedTitle={setSelectedTitle}
        fullName={fullName}
        setFullName={setFullName}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        email={email}
        setEmail={setEmail}
        hasFlightDetails={true}
        flightNumber={flightNumber}
        setFlightNumber={setFlightNumber}
        airline={airline}
        setAirline={setAirline}
      />

      <button
        onClick={(e) => handleCreateBooking(e)}
        className="lg:w-44 w-full h-13 p-3 border-[0.3px] focus:outline-none bg-shuttlelanePurple flex items-center justify-center text-white border-gray-400 rounded-lg"
      >
        {isLoading ? (
          <ImSpinner2 size={21} className="text-white animate-spin" />
        ) : (
          "Create Booking"
        )}
      </button>
    </form>
  );
}

export default AdminPriorityPassForm;
