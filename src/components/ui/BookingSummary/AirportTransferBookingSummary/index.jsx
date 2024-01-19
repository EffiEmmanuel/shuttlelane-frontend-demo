// @ts-nocheck
import React, { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { IoCarSportSharp } from "react-icons/io5";
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
  fetchPasses,
  fetchVehicleClasses,
  setBookingDetails,
} from "../../../../redux/slices/userSlice";

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
    setBookingDetails({ ...bookingDetails, vehicleClass: { ...vehicleClass } });
  }

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

  // Fetch Vehicle Classes and passes
  useEffect(() => {
    dispatch(fetchVehicleClasses());
    dispatch(fetchPasses());
  }, []);

  // Calculate booking total and watches for changes in the booking details
  useEffect(() => {
    // Update the total and calculate the exchange rate too
    if (isAddPriorityPass && (!numberOfPasses || !passType)) {
      return;
    } else {
      dispatch(
        calculateTotal({
          pickupLocation: bookingDetails?.pickupLocation,
          dropoffLocation: bookingDetails?.dropoffLocation,
          currentVehicleClass,
          isAddPriorityPass,
          numberOfPasses,
          passType,
          userCurrency,
          bookingType: "Airport",
        })
      );
    }
  }, [isAddPriorityPass, numberOfPasses, passType, currentVehicleClass]);

  return (
    <div className="mt-5 w-full flex lg:flex-row flex-col gap-x-4">
      <div className="lg:w-[65%] w-full">
        <div className="bg-white p-7">
          <div className="flex flex-col">
            <p className="text-xl font-semibold">Airport Transfer</p>
            <p className="text-sm -mt-1">Pick Your Car</p>
          </div>

          {/* Vehicle Classes */}
          <div className="flex flex-col gap-y-14 mt-10">
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
                        <MdPerson size={16} className="text-shuttlelaneBlack" />
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
                    onClick={() => handleSetVehicleClass(vehicleClass)}
                    className={`${
                      currentVehicleClass?._id == vehicleClass?._id
                        ? "bg-green-500 text-white animate-pulse"
                        : "border-[.3px] border-shuttlelaneBlack"
                    } text-sm rounded-lg p-2 flex justify-center items-center`}
                  >
                    {currentVehicleClass?._id == vehicleClass?._id ? (
                      <div className="flex items-center gap-x-2">
                        <span>Selected</span>
                        <MdCheck size={16} />
                      </div>
                    ) : (
                      "Select"
                    )}
                  </button>
                </div>
              </div>
            ))}
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
      <div className="lg:w-[35%] w-full mt-10 lg:mt-0">
        <div className="bg-white p-7 transition-all">
          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold">Booking Summary</p>
            <button className="underline text-xs">Edit</button>
          </div>
          <div className="mt-10">
            <div className="flex flex-col gap-y-4">
              <div className="flex gap-x-1">
                <MdLocationPin size={16} />
                <div className="flex flex-col gap-y-1">
                  <span className="text-xs font-medium">
                    {bookingDetails?.pickupLocationInput ?? (
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
                    {bookingDetails?.dropoffLocationInput ?? (
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

        <div className="bg-white p-7 mt-10">
          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold">Route</p>
            <span className="text-xs">
              {bookingDistance}les, {tripDuration}
            </span>
          </div>
          <div className="mt-5">
            <div className="w-full max-h-[250px] h-[250px] min-h-[250px] overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7928.243562265941!2d3.3680206!3d6.5062651!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8c448e2f97c3%3A0xc95f24c00955aecc!2sShuttlelane!5e0!3m2!1sen!2sng!4v1698936776561!5m2!1sen!2sng"
                width="100%"
                height="100%"
                //   style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
