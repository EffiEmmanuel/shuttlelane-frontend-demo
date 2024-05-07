// @ts-nocheck
import { useFormik } from "formik";
import AdminAddBookingUserDetailsSchema from "../validation";
import { useEffect, useState } from "react";
import React, { useRef } from "react";

import { BsAirplane, BsPerson, BsPlusCircleDotted } from "react-icons/bs";
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
import { useDispatch, useSelector } from "react-redux";
import {
  calculateTotal,
  createBooking,
  fetchCities,
  fetchCity,
} from "../../../../redux/slices/adminSlice";
import PersonalDetailsForm from "../../../PersonalDetailsForm";
import { AiOutlinePlus } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import Switch from "react-switch";

function AdminAirportTransferForm() {
  const { bookingDetails, bookingCurrency, bookingTotal } = useSelector(
    (store) => store.admin
  );
  // Date Setup
  const minSelectableDate = new Date(); //
  // A function to disable dates earlier than the minimum date
  const disableDateBeforeMin = (date) => {
    return date < minSelectableDate;
  };

  const [title, setTitle] = useState("");
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  // Dropoff details
  const [dropoffLocation, setDropoffLocation] = useState();
  const [dropoffLocationInput, setDropoffLocationInput] = useState();
  const dropoffLocationRef = useRef();
  const [returnDate, setReturnDate] = useState();
  const [returnTime, setReturnTime] = useState();

  // Pickup details
  const [pickupLocation, setPickupLocation] = useState();
  const [pickupLocationInput, setPickupLocationInput] = useState();
  const pickupLocationRef = useRef();
  const [pickupDate, setPickupDate] = useState();
  const [pickupTime, setPickupTime] = useState();

  // Passengers
  const [passengers, setPassengers] = useState("");

  // City Data
  const cityData = [
    { value: "Lagos", label: "Lagos" },
    { value: "Accra", label: "Accra" },
    { value: "Ogun", label: "Ogun" },
    { value: "Ibadans", label: "Ibadanss" },
  ];

  // FORM FIELDS
  const [selectedCity, setSelectedCity] = useState("");

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

  // Selected Car State
  const [selectedVehicleClass, setSelectedVehicleClass] = useState("");

  // Passenger Form Fields
  const [selectedTitle, setSelectedTitle] = useState();
  const [fullName, setFullName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState();
  const [flightNumber, setFlightNumber] = useState();
  const [airline, setAirline] = useState();

  // Redux store states
  const { isLoading, token, cities, vehicleClasses } = useSelector(
    (store) => store.admin
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      console.log("HELLO FROM HERE:", token);
      dispatch(fetchCities(token));
    }
  }, [token]);

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

  // Handle create booking
  async function handleCreateBooking(e) {
    e.preventDefault();
    console.log("fullname:", fullName);
    console.log("title:", selectedTitle);
    dispatch(
      createBooking({
        bookingType: "Airport",
        bookingDetails: {
          title: selectedTitle?.value,
          firstName: fullName?.split(" ")[0],
          lastName: fullName?.split(" ")[1],
          email: email,
          mobile: phoneNumber,
          bookingCurrency: bookingCurrency?._id,
          bookingTotal: bookingTotal,
          isRoundTrip: isRoundTrip,
          passengers: passengers,
          airline: airline,
          flightNumber: flightNumber,
          vehicleClass: selectedVehicleClass,
          city: selectedCity?.value,
          pickupAddress: pickupLocationInput,
          pickupDate: pickupDate,
          pickupTime: pickupTime,
          dropoffAddress: dropoffLocationInput,
          returnDate: returnDate ?? null,
          returnTime: returnTime ?? null,
          //   hasPriorityPass: hasPriorityPass,
          //   passType: passType?.value ?? null,
          //   priorityPassCount: numberOfPasses ?? null,
        },
      })
    );
  }

  const [currentVehicleClass, setCurrentVehicleClass] = useState();

  // Calculate booking total and watches for changes in the booking details
  useEffect(() => {
    dispatch(
      calculateTotal({
        pickupLocation: bookingDetails?.pickupLocation,
        dropoffLocation: bookingDetails?.dropoffLocation,
        currentVehicleClass,
        //   isAddPriorityPass,
        //   numberOfPasses,
        //   passType,
        bookingCurrency,
        bookingType: "Airport",
      })
    );
  }, [
    // isAddPriorityPass,
    // numberOfPasses,
    // passType,
    currentVehicleClass,
    pickupLocationInput,
    dropoffLocationInput,
  ]);

  return (
    <form className="text-shuttlelaneBlack mt-10 flex flex-col gap-y-5">
      <ToastContainer />
      {/* Booking Details */}
      <div className="mb-1">
        <p className="font-medium">Booking Details</p>
        <div className="h-1 w-[30px] rounded-xl bg-shuttlelanePurple"></div>
      </div>

      <div className="flex items-center gap-x-5">
        {/* TRIP TYPE */}
        <div className="flex transition-all items-center gap-x-1 text-shuttlelaneBlack">
          <p className="text-sm transition-all">
            {!isRoundTrip ? "One Way" : "Round Trip"}
          </p>

          <Switch
            onChange={(checked) => setIsRoundTrip(checked)}
            checked={isRoundTrip}
            height={15}
            width={35}
            handleDiameter={10}
            checkedIcon={false}
            uncheckedIcon={false}
            onColor="#262471"
          />
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

            <div className="w-[95%] text-shuttlelaneBlack text-sm relative">
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
                placeholder="Select Destination City"
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
        {/* Passengers */}
        <div className="flex h-[47px] items-center bg-gray-100 py-2 px-2 gap-x-2 w-full rounded-lg">
          <div className="w-[5%]">
            <BsPerson size={16} className="text-gray-700" />
          </div>

          <div className="w-[95%] text-shuttlelaneBlack relative">
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
                      toast.info("You cannot have more than 10 passengers!");
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
                    const newPassengerValue = +passengers - 1;
                    if (newPassengerValue === 0) {
                      toast.info("You cannot have less than 1 passenger!");
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
                    const newPassengerValue = +passengers + 1;
                    if (newPassengerValue > 10) {
                      toast.info("You cannot have more than 10 passengers!");
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
        {/* Pickup Addresss */}
        <div className="w-full flex flex-col gap-y-1">
          <label htmlFor="pickupLocation" className="text-sm">
            Dropoff Location
          </label>
          <div className="flex h-11 items-center border-[0.3px] bg-transparent focus:outline-none border-gray-400 py-2 px-2 gap-x-2 w-full rounded-lg">
            <div className="w-[5%]">
              <IoLocationOutline size={16} className="text-gray-700" />
            </div>

            <div className="w-[95%] text-shuttlelaneBlack relative">
              <LocationInput
                placeholder="To (Airport, Port, Address)"
                setLocation={setDropoffLocation}
                location={dropoffLocation}
                locationRef={dropoffLocationRef}
                locationInput={dropoffLocationInput}
                setLocationInput={setDropoffLocationInput}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-2 lg:flex-row lg:items-center lg:justify-between gap-x-3">
        {!isRoundTrip && (
          <button
            onClick={() => setIsRoundTrip(true)}
            className="flex h-[47px] text-shuttlelaneBlack items-center bg-gray-100 py-2 px-2 gap-x-2 w-full rounded-lg"
          >
            <BsPlusCircleDotted size={16} />
            <p className="text-sm">Add Return</p>
          </button>
        )}

        {isRoundTrip && (
          <>
            <div className="flex w-full flex-col gap-y-2 lg:flex-row lg:items-center lg:justify-between gap-x-3">
              <div className="flex h-[47px] items-center bg-gray-100 py-2 px-2 gap-x-2 w-full rounded-lg">
                <div className="w-full">
                  <DatePicker
                    locale={enGB}
                    disabledDate={disableDateBeforeMin}
                    value={returnDate}
                    appearance="subtle"
                    onChange={(date) => {
                      setReturnDate(date);
                    }}
                    placeholder="Return Date"
                    style={{
                      backgroundColor: "transparent",
                    }}
                    className="text-sm w-full bg-transparent text-shuttlelaneBlack"
                  />
                </div>
              </div>
              <div className="flex h-[47px] items-center bg-gray-100 py-2 px-2 gap-x-2 w-full rounded-lg">
                <div className="w-full">
                  <DatePicker
                    format="HH:mm"
                    value={returnTime}
                    appearance="subtle"
                    onChange={(time) => {
                      console.log("TIME:", time);
                      setReturnTime(time);
                    }}
                    placeholder="Return Time"
                    style={{
                      backgroundColor: "transparent",
                    }}
                    className="text-sm w-full bg-transparent text-shuttlelaneBlack"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col w-full gap-y-1 mt-3">
        <label htmlFor="selectedVehicleClass" className="text-sm">
          Choose Vehicle Class
        </label>
        <div className="flex lg:justify-between flex-wrap gap-x-4 gap-y-5 items-center">
          {vehicleClasses?.map((vehicleClass) => (
            <div
              onClick={() => {
                setSelectedVehicleClass(vehicleClass?._id);
                setCurrentVehicleClass(vehicleClass);
              }}
              className={`flex cursor-pointer flex-col items-center text-center p-2 justify-center ${
                selectedVehicleClass === vehicleClass?._id
                  ? "bg-shuttlelaneLightPurple shadow-lg"
                  : "border-gray-400 border-[.3px] border-dashed"
              }  rounded-lg w-[150px] h-[100px] transition-all`}
            >
              <img
                src={vehicleClass?.image}
                className="w-[100px] object-contain max-w-[100px] min-w-[100px]"
              />

              <p className="text-sm mt-2">{vehicleClass?.className}</p>
            </div>
          ))}

          {!selectedCity && (
            <p className="text-sm text-slate-400">
              Select a city to show vehicle classes
            </p>
          )}
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

export default AdminAirportTransferForm;
