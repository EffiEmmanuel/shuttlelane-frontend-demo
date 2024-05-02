// @ts-nocheck
import React, { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { IoCarSportSharp } from "react-icons/io5";
import { PiCaretUpBold } from "react-icons/pi";
import {
  MdCheck,
  MdLocationPin,
  MdLuggage,
  MdPeople,
  MdPerson,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import {
  calculateTotal,
  fetchCity,
  fetchPasses,
  fetchVehicleClasses,
  setBookingDetails,
} from "../../../../redux/slices/userSlice";
import Pay from "../Pay";
import PersonalDetailsForm from "../../../../forms/PersonalDetailsForm";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import Modal from "react-modal";
import AirportTransferForm from "../../../../forms/HomePage/AirportTransferForm";
import UpdateAirportBookingForm from "../../../../forms/BookingSummary/UpdateAirportBookingForm";
import GoogleMapsWithDirections from "../../GoogleMapsWithDirection";
import GoogleMapsDirections from "../../GoogleMapsDirections";

export default function AirportTransferBookingSummary() {
  // Fetch states from redux slice
  const {
    isLoading,
    bookingDetails,
    bookingType,
    vehicleClasses,
    userCurrency,
    passes,
    totalInNaira,
    bookingTotal,
    bookingDistance,
    tripDuration,
  } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  // STATES
  const [currentVehicleClass, setCurrentVehicleClass] = useState(); // Tracks the current vehicle class selected
  const [isAddPriorityPass, setIsAddPriorityPass] = useState(false); // Handle add priority pass
  const [passTypes, setPassTypes] = useState(); // Holds the pass types

  // FORM FIELD STATES
  // Priority pass form field(s)
  const [passType, setPassType] = useState();
  const [numberOfPasses, setNumberOfPasses] = useState();
  const numberOfPassesAllowed = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "10", label: "10" },
  ];
  // Edit booking form fields

  // FUNCTIONS
  // This function handles the "Select" button action
  function handleSetVehicleClass(vehicleClass) {
    setCurrentVehicleClass(vehicleClass);
    dispatch(
      setBookingDetails({
        bookingDetails: {
          ...bookingDetails,
          vehicleClass: vehicleClass ?? currentVehicleClass,
        },
        bookingType,
      })
    );
  }

  useEffect(() => {
    if (bookingTotal == null || !bookingTotal || bookingTotal == 0) {
      handleSetVehicleClass(null);
    } else {
      handleSetVehicleClass(currentVehicleClass);
    }
  }, [bookingTotal]);

  // USE EFFECTS
  // Setup pass types
  useEffect(() => {
    if (passes) {
      let formattedPassTypes = [];
      passes?.forEach((pass) => {
        formattedPassTypes.push({ value: pass, label: pass?.name });
      });
      setPassTypes(formattedPassTypes);
    }
  }, [passes]);

  useEffect(() => {
    dispatch(fetchPasses());
    dispatch(
      fetchCity({
        cityId: bookingDetails?.selectedCity?.value,
      })
    );
  }, []);

  // Calculate booking total and watches for changes in the booking details
  useEffect(() => {
    // Update the total and calculate the exchange rate too
    if (isAddPriorityPass && (!numberOfPasses || !passType)) {
      return;
    } else {
      console.log("USER CURRENCY OVER HERE:", userCurrency);
      dispatch(
        calculateTotal({
          pickupLocation: bookingDetails?.pickupLocation,
          dropoffLocation: bookingDetails?.dropoffLocation,
          city: bookingDetails?.selectedCity?.value,
          currentVehicleClass,
          isAddPriorityPass,
          numberOfPasses,
          passType,
          userCurrency,
          bookingType: "Airport",
        })
      );
    }
  }, [
    isAddPriorityPass,
    numberOfPasses,
    passType,
    currentVehicleClass,
    bookingDetails?.pickupLocation,
    bookingDetails?.dropoffLocation,
  ]);

  // Personal Details Form Fields
  const [selectedTitle, setSelectedTitle] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState();
  const [flightNumber, setFlightNumber] = useState();
  const [airline, setAirline] = useState();

  // Form Stage States
  const [isSelectVehicleClasses, setIsSelectVehicleClasses] = useState(true);
  const [isPersonalDetails, setIsPersonalDetails] = useState(false);
  const [isPaymentOptions, setIsPaymentOptions] = useState(false);

  // Update booking states
  const [isEditBookingModalOpen, setIsEditBookingModalOpen] = useState(false);

  return (
    <div className="">
      <ToastContainer />
      {/* Edit Booking Modal */}
      <Modal
        isOpen={isEditBookingModalOpen}
        onRequestClose={() => setIsEditBookingModalOpen(false)}
        className="flex h-full min-h-screen justify-center items-center lg:px-52 px-7"
      >
        <div className="bg-white shadow-lg rounded-lg text-shuttlelaneBlack w-full min-h-[80%] max-h-[80%] h-[80%] lg:w-[60%] p-7 px-10 overflow-y-scroll shuttlelaneScrollbar">
          <div className="flex items-center justify-between">
            <div className="">
              <h4 className="font-semibold">Edit Booking</h4>
              <small>Make changes to your booking</small>
            </div>

            <FaXmark
              size={20}
              onClick={() => setIsEditBookingModalOpen(false)}
              className="cursor-pointer"
            />
          </div>

          {/* Edit Booking Form */}
          <UpdateAirportBookingForm
            setIsEditBookingModalOpen={setIsEditBookingModalOpen}
            currentVehicleClass={currentVehicleClass}
            isAddPriorityPass={isAddPriorityPass}
            numberOfPasses={numberOfPasses}
            passType={passType}
          />
        </div>
      </Modal>

      <div className="mt-5 w-full flex lg:flex-row flex-col gap-x-4">
        <div className="lg:w-[65%] w-full">
          <div className="bg-white p-7">
            <button
              onClick={(e) => {
                setIsSelectVehicleClasses(!isSelectVehicleClasses);
                setIsPersonalDetails(false);
                setIsPaymentOptions(false);
              }}
              className="flex flex-row w-full justify-between items-center outline-none focus:outline-none"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-x-2">
                  <span className="text-xl font-semibold text-left">
                    1. Vehicle Information
                  </span>

                  <FaRegCheckCircle
                    size={20}
                    className={`${
                      currentVehicleClass ? "text-green-500" : "text-gray-400"
                    }`}
                  />
                </div>
                <p className="text-sm -mt-1 text-left">
                  Please select your preffered vehicle class before proceeding
                  to the next step
                </p>
              </div>

              <PiCaretUpBold
                size={20}
                className={`${
                  isSelectVehicleClasses && "rotate-180"
                } transition-all`}
              />
            </button>

            {/* Vehicle Classes */}
            <div
              className={`${
                !isSelectVehicleClasses ? "h-[0px]" : "h-auto"
              } overflow-y-hidden`}
            >
              <div className="flex flex-col gap-y-14 mt-10">
                {!isLoading && (
                  <>
                    {vehicleClasses?.map((vehicleClass) => (
                      <div className="w-full flex lg:flex-row flex-col lg:items-center gap-x-5 gap-y-4 pb-3">
                        <div className="lg:w-[20%] w-full">
                          <img
                            src={vehicleClass?.image}
                            className="object-contain w-[170px]"
                            alt={`${vehicleClass?.className} Class`}
                          />
                        </div>

                        <div className="lg:w-[55%] w-full flex flex-col">
                          <div className="flex items-center gap-x-2">
                            <p className="font-semibold text-lg">
                              {vehicleClass?.className}
                            </p>

                            <div className="flex items-center justify-center gap-x-2 p-1 border-[.3px] border-shuttlelaneBlack rounded-full min-w-[80px] border-dashed">
                              <div className="flex items-center">
                                <MdPerson
                                  size={16}
                                  className="text-shuttlelaneBlack"
                                />
                                <span className="text-xs">
                                  {vehicleClass?.passengers}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <MdLuggage
                                  size={16}
                                  className="text-shuttlelaneBlack"
                                />
                                <span className="text-xs">
                                  {vehicleClass?.luggages}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm">{vehicleClass?.description}</p>
                        </div>
                        <div className="lg:w-[25%] w-full flex flex-col text-left lg:text-right gap-y-1">
                          <p className="font-bold text-lg">
                            {!userCurrency?.symbol ? "₦" : userCurrency?.symbol}
                            {Intl.NumberFormat("en-US", {}).format(
                              vehicleClass?.basePrice
                            )}
                          </p>
                          <button
                            onClick={() => {
                              handleSetVehicleClass(vehicleClass);
                              setIsSelectVehicleClasses(false);
                              setIsPersonalDetails(true);
                            }}
                            className={`${
                              currentVehicleClass?._id == vehicleClass?._id
                                ? "bg-green-500 text-white animate-pulse"
                                : "border-[.3px] border-shuttlelaneBlack"
                            } text-sm rounded-lg p-2 flex justify-center items-center`}
                          >
                            {!isLoading && (
                              <>
                                {currentVehicleClass?._id ==
                                vehicleClass?._id ? (
                                  <div className="flex items-center gap-x-2">
                                    <span>Selected</span>
                                    <MdCheck size={16} />
                                  </div>
                                ) : (
                                  "Select"
                                )}
                              </>
                            )}
                            {isLoading && (
                              <div className="flex items-center justify-center">
                                <ImSpinner2
                                  size={20}
                                  className="text-white animate-spin"
                                />
                              </div>
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </>
                )}
                {isLoading && (
                  <div className="flex items-center justify-center">
                    <ImSpinner2
                      size={24}
                      className="text-shuttlelanePurple animate-spin"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white p-7 mt-4">
            <button
              onClick={(e) => {
                if (!currentVehicleClass) {
                  toast.info(
                    "You must select a vehicle class before proceeding to this section"
                  );
                  return;
                } else {
                  setIsSelectVehicleClasses(false);
                  setIsPersonalDetails(!isPersonalDetails);
                  setIsPaymentOptions(false);
                }
              }}
              className="flex flex-row w-full justify-between items-center outline-none focus:outline-none"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-x-2">
                  <span className="text-xl font-semibold">
                    2. Personal Details
                  </span>

                  <FaRegCheckCircle
                    size={20}
                    className={`${
                      selectedTitle &&
                      firstName &&
                      lastName &&
                      phoneNumber &&
                      email
                        ? "text-green-500"
                        : "text-gray-400"
                    }`}
                  />
                </div>
                <p className="text-sm -mt-1">
                  Enter your personal details below
                </p>
              </div>

              <PiCaretUpBold
                size={20}
                className={`${
                  isPersonalDetails && "rotate-180"
                } transition-all`}
              />
            </button>

            <div
              className={`${
                !isPersonalDetails ? "h-[0px]" : "h-auto"
              } overflow-y-hidden`}
            >
              <PersonalDetailsForm
                selectedTitle={selectedTitle}
                setSelectedTitle={setSelectedTitle}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                email={email}
                setEmail={setEmail}
                flightNumber={flightNumber}
                setFlightNumber={setFlightNumber}
                airline={airline}
                setAirline={setAirline}
                hasFlightDetails={true}
              />
            </div>
          </div>

          <Pay
            isPaymentDisabled={
              !currentVehicleClass ||
              !selectedTitle ||
              !firstName ||
              !lastName ||
              !phoneNumber ||
              !email ||
              !flightNumber ||
              !airline
                ? true
                : false
            }
            selectedTitle={selectedTitle}
            firstName={firstName}
            lastName={lastName}
            phoneNumber={phoneNumber}
            email={email}
            flightNumber={flightNumber}
            airline={airline}
            bookingTotal={bookingTotal}
          />
        </div>
        <div className="lg:w-[35%] w-full mt-10 lg:mt-0">
          <div className="bg-white p-7 transition-all">
            <div className="flex items-center justify-between">
              <p className="text-xl font-semibold">Booking Summary</p>
              <button
                onClick={() => setIsEditBookingModalOpen(true)}
                className="underline text-xs"
              >
                Edit
              </button>
            </div>
            <div className="mt-10">
              <div className="flex flex-col gap-y-4">
                <div className="flex gap-x-1">
                  <MdLocationPin size={16} />
                  <div className="flex flex-col gap-y-1">
                    <span className="text-xs font-medium">
                      {bookingDetails?.pickupLocation ?? (
                        <span className="text-gray-300 text-xs">
                          Not yet selected
                        </span>
                      )}
                    </span>
                    <span className="text-xs">
                      {bookingDetails?.pickupDate?.toDateString() ?? (
                        <span className="text-gray-300 text-xs">
                          Not yet selected
                        </span>
                      )}
                      .{" "}
                      {bookingDetails?.pickupTime ? (
                        <>
                          {
                            bookingDetails?.pickupTime
                              ?.toLocaleTimeString()
                              ?.split(":")[0]
                          }
                          :
                          {
                            bookingDetails?.pickupTime
                              ?.toLocaleTimeString()
                              ?.split(":")[1]
                          }
                          {
                            bookingDetails?.pickupTime
                              ?.toLocaleTimeString()
                              ?.split(" ")[1]
                          }
                        </>
                      ) : (
                        <span className="text-gray-300 text-xs">
                          Not yet selected
                        </span>
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex gap-x-1">
                  <MdLocationPin size={16} />
                  <div className="flex flex-col gap-y-1">
                    <span className="text-xs font-medium">
                      {bookingDetails?.dropoffLocation ?? (
                        <span className="text-gray-300 text-xs">
                          Not yet selected
                        </span>
                      )}
                    </span>
                    <span className="text-xs">
                      {bookingDetails?.dropoffDate?.toDateString() ? (
                        bookingDetails?.dropoffDate?.toDateString()
                      ) : !bookingDetails?.isRoundTrip ? (
                        <span className="text-gray-300 text-xs">One Way</span>
                      ) : (
                        <span className="text-gray-300 text-xs">
                          Not yet selected
                        </span>
                      )}
                      .{" "}
                      {bookingDetails?.dropoffTime ? (
                        <>
                          {
                            bookingDetails?.dropoffTime
                              ?.toLocaleTimeString()
                              ?.split(":")[0]
                          }
                          :
                          {
                            bookingDetails?.dropoffTime
                              ?.toLocaleTimeString()
                              ?.split(":")[1]
                          }
                          {
                            bookingDetails?.dropoffTime
                              ?.toLocaleTimeString()
                              ?.split(" ")[1]
                          }
                        </>
                      ) : !bookingDetails?.isRoundTrip ? (
                        <span className="text-gray-300 text-xs">One Way</span>
                      ) : (
                        <span className="text-gray-300 text-xs">
                          Not yet selected
                        </span>
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex gap-x-1">
                  <div className="flex flex-row gap-x-2">
                    <div className="flex items-center text-shuttlelaneBlack gap-x-1">
                      <IoCarSportSharp size={18} className="" />
                      <span className="text-xs font-medium">
                        {currentVehicleClass?.className ?? (
                          <span className="text-gray-300 text-xs">
                            Not yet selected
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="flex items-center text-shuttlelaneBlack gap-x-1">
                      <MdPeople size={18} className="" />
                      <span className="text-xs font-medium">
                        {bookingDetails?.passengers ?? (
                          <span className="text-gray-300 text-xs">
                            Not yet selected
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="gap-x-1">
                  <div className="flex items-center gap-x-1">
                    <input
                      type="checkbox"
                      value={isAddPriorityPass}
                      onChange={(e) => {
                        console.log("VALUE::", e.target.checked);
                        setIsAddPriorityPass(e.target.checked);
                      }}
                    />
                    <span className="text-xs">Add priority pass</span>
                  </div>

                  {isAddPriorityPass && (
                    <div className="flex flex-col gap-y-1">
                      <div className="flex text-sm mt-2 items-center bg-gray-100 h-[43px] px-2 gap-x-2 w-full rounded-lg selectContainer">
                        <Select
                          value={passType}
                          onChange={(value) => setPassType(value)}
                          options={passTypes}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderColor: state.isFocused
                                ? "transparent"
                                : "transparent",
                              borderWidth: state.isFocused ? "0" : "0",
                              width: "100%",
                              fontSize: ".85rem",
                              backgroundColor: "transparent",
                              position: "relative",
                              //   zIndex: 80,
                            }),

                            placeholder: (baseStyles, state) => ({
                              ...baseStyles,
                              fontSize: ".85rem",
                            }),

                            menuList: (baseStyles, state) => ({
                              ...baseStyles,
                              width: "100%",
                              fontSize: ".85rem",
                            }),

                            input: (baseStyles, state) => ({
                              ...baseStyles,
                              width: "100%",
                              fontSize: ".85rem",
                            }),
                          }}
                          placeholder="Select Pass"
                        />
                      </div>
                      <div className="flex text-sm mt-2 items-center bg-gray-100 h-[43px] px-2 gap-x-2 w-full rounded-lg selectContainer">
                        <Select
                          value={numberOfPasses}
                          onChange={(value) => setNumberOfPasses(value)}
                          options={numberOfPassesAllowed}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderColor: state.isFocused
                                ? "transparent"
                                : "transparent",
                              borderWidth: state.isFocused ? "0" : "0",
                              width: "100%",
                              fontSize: ".85rem",
                              backgroundColor: "transparent",
                              position: "relative",
                              //   zIndex: 50,
                            }),

                            placeholder: (baseStyles, state) => ({
                              ...baseStyles,
                              fontSize: ".85rem",
                              width: "100%",
                            }),

                            menuList: (baseStyles, state) => ({
                              ...baseStyles,
                              width: "100%",
                              fontSize: ".85rem",
                            }),

                            input: (baseStyles, state) => ({
                              ...baseStyles,
                              width: "100%",
                              fontSize: ".85rem",
                            }),
                          }}
                          placeholder="Number of passes"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="h-[.3px] w-full bg-gray-300"></div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-y-1">
                    <span className="font-medium text-xs">Total price</span>
                    <span className="text-gray-400 text-xs">
                      Taxes & fees included
                    </span>
                  </div>

                  <h3 className="text-shuttlelanePurple font-bold">
                    {isLoading && (
                      <div className="flex items-center justify-center">
                        <ImSpinner2
                          size={24}
                          className="text-shuttlelanePurple animate-spin"
                        />
                      </div>
                    )}

                    {!isLoading && (
                      <>
                        {!userCurrency?.symbol ? "₦" : userCurrency?.symbol}
                        {isNaN(bookingTotal)
                          ? "0.00"
                          : Intl.NumberFormat("en-US", {}).format(bookingTotal)}
                      </>
                    )}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-7 mt-4">
            <div className="flex items-center justify-between">
              <p className="text-xl font-semibold">Route</p>
              <span className="text-xs">
                {bookingDistance} miles, {tripDuration}
              </span>
            </div>
            <div className="mt-5">
              <div className="w-full max-h-[250px] h-[250px] min-h-[250px] overflow-hidden">
                <GoogleMapsWithDirections
                  pickupAddress={bookingDetails?.pickupLocation}
                  pickupCoordinates={bookingDetails?.pickupCoordinates}
                  dropoffAddress={bookingDetails?.dropoffLocation}
                  dropoffCoordinates={bookingDetails?.dropoffCoordinates}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
