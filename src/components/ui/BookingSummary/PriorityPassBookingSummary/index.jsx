// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import {
  IoCarSportOutline,
  IoCarSportSharp,
  IoLocationOutline,
} from "react-icons/io5";
import {
  MdCheck,
  MdLocationPin,
  MdLuggage,
  MdOutlineNordicWalking,
  MdPeople,
  MdPerson,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import {
  calculateTotal,
  fetchCars,
  fetchCities,
  fetchPasses,
  fetchVehicleClasses,
  setBookingDetails,
} from "../../../../redux/slices/userSlice";
import PersonalDetailsForm from "../../../../forms/PersonalDetailsForm";
import { BiMinus, BiSolidCity } from "react-icons/bi";
import { TbBrandDaysCounter } from "react-icons/tb";
import Pay from "../Pay";
import Modal from "react-modal";
import { FaPersonWalkingDashedLineArrowRight, FaXmark } from "react-icons/fa6";
import LocationInput from "../../../../components/ui/Form/LocationInput";
import DatePicker from "rsuite/DatePicker";
import "rsuite/dist/rsuite.css";
import enGB from "date-fns/locale/en-GB";
import { AiOutlinePlus } from "react-icons/ai";
import GoogleMapsWithDirections from "../../GoogleMapsWithDirection";

export default function PriorityPassBookingSummary() {
  // Fetch states from redux slice
  const {
    isLoading,
    bookingDetails,
    bookingType,
    userCurrency,
    bookingTotal,
    passes,
    cities,
  } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  // Protocol services
  const services = [
    { value: "Arrival Protocol", label: "Arrival Protocol" },
    { value: "Departure Protocol", label: "Departure Protocol" },
  ];

  // Date Setup
  const minSelectableDate = new Date(); //
  // A function to disable dates earlier than the minimum date
  const disableDateBeforeMin = (date) => {
    return date < minSelectableDate;
  };

  // "TITLE" data
  const titleData = [
    { value: "Mr", label: "Mr" },
    { value: "Mrs", label: "Mrs" },
    { value: "Miss", label: "Miss" },
    { value: "Ms", label: "Ms" },
  ];

  // Personal Details Form Fields
  const [selectedTitle, setSelectedTitle] = useState();
  const [fullName, setFullName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState();
  const [flightNumber, setFlightNumber] = useState();
  const [airline, setAirline] = useState();

  // Edit booking form fields
  const [passengers, setPassengers] = useState(bookingDetails?.passengers);
  const [protocolSelected, setProtocolSelected] = useState(
    bookingDetails?.protocolSelected
  );
  const [passSelected, setPassSelected] = useState(
    bookingDetails?.passSelected
  );
  const [citySelected, setCitySelected] = useState(
    bookingDetails?.citySelected
  );
  const [pickupLocation, setPickupLocation] = useState();
  const pickupLocationRef = useRef(null);
  const [pickupLocationInput, setPickupLocationInput] = useState(
    bookingDetails?.pickupLocation
  );
  const [pickupTime, setPickupTime] = useState(bookingDetails?.pickupTime);
  const [pickupDate, setPickupDate] = useState(bookingDetails?.pickupDate);
  // Modal states
  const [isEditBookingModalOpen, setIsEditBookingModalOpen] = useState(false);
  function updateBooking(e) {
    e.preventDefault();
    if (
      !pickupLocationInput ||
      !pickupDate ||
      !pickupTime ||
      !passengers ||
      !protocolSelected ||
      !passSelected ||
      !citySelected
    ) {
      toast.info("Please fill in the missing fields.");
      return;
    } else {
      dispatch(
        setBookingDetails({
          bookingType: "Priority",
          alertUser: true,
          bookingDetails: {
            pickupLocation: pickupLocationInput,
            pickupDate,
            pickupTime,
            userCurrency: userCurrency,
            citySelected: citySelected,
            protocolSelected: protocolSelected,
            passSelected: passSelected,
            passengers: passengers,
          },
        })
      );

      dispatch(
        calculateTotal({
          bookingType: "Priority",
          userCurrency: userCurrency,
          passSelected: passSelected,
          passengers: passengers,
        })
      );
    }
  }

  // Fetch passes and cities
  useEffect(() => {
    dispatch(fetchPasses());
    dispatch(fetchCities());
  }, []);

  // Format passes
  const [passesData, setPassesData] = useState();
  useEffect(() => {
    let updatedPassesData = [];
    passes?.forEach((pass) => {
      updatedPassesData.push({
        value: pass,
        label: pass?.name,
      });
    });

    setPassesData(updatedPassesData);
  }, [passes]);

  // Format cities
  const [citiesData, setCitiesData] = useState();
  useEffect(() => {
    let updatedCityData = [];
    cities?.forEach((city) => {
      updatedCityData.push({
        value: city?._id,
        label: city?.cityName,
      });
    });

    setCitiesData(updatedCityData);
  }, [cities]);

  // Update airport based on selected city
  const [airports, setAirports] = useState();
  useEffect(() => {
    if (cities) {
      const selectedCity = cities?.filter(
        (city) => city == citySelected?.value
      );
      setAirports(selectedCity[0]?.airports);
    }
  }, [citySelected]);

  // Calculate the total
  useEffect(() => {
    if (!isEditBookingModalOpen) {
      dispatch(
        calculateTotal({
          bookingType: "Priority",
          userCurrency: userCurrency,
          passSelected: bookingDetails?.passSelected,
          passengers: bookingDetails?.passengers,
        })
      );
    }
  }, []);

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
          <form className="w-full mt-5">
            <div className="flex flex-col gap-y-5 lg:items-center gap-x-4">
              <div className="w-full flex flex-col">
                <div className="flex flex-col gap-y-2">
                  <div className="flex flex-col">
                    <small>City</small>
                    <div className="flex items-center bg-gray-100 h-[47px] px-2 gap-x-2 w-full rounded-lg">
                      <div className="w-[5%]">
                        <BiSolidCity size={16} className="text-gray-500" />
                      </div>

                      <div className="w-[95%] text-shuttlelaneBlack text-sm relative z-[80]">
                        <Select
                          value={citySelected}
                          onChange={(value) => setCitySelected(value)}
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

                  <div className="flex flex-col">
                    <small>Pickup Location</small>
                    <div className="relative flex h-[47px] items-center bg-gray-100 py-2 px-2 gap-x-2 w-full rounded-lg">
                      <div className="w-[5%]">
                        <IoLocationOutline
                          size={16}
                          className="text-gray-700"
                        />
                      </div>

                      <div className="w-full relative text-shuttlelaneBlack">
                        <LocationInput
                          placeholder="Pickup From (Airport, Port, Address)"
                          setLocation={setPickupLocation}
                          location={pickupLocation}
                          locationRef={pickupLocationRef}
                          locationInput={pickupLocationInput}
                          setLocationInput={setPickupLocationInput}
                          airports={airports}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <small>Pickup Date</small>
                    <div className="flex flex-col gap-y-2 lg:flex-row lg:items-center lg:justify-between gap-x-3">
                      <div className="flex h-[47px] items-center bg-gray-100 py-2 px-2 gap-x-2 w-full rounded-lg">
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
                  </div>

                  <div className="flex flex-col">
                    <small>Pickup Time</small>
                    <div className="flex h-[47px] items-center bg-gray-100 py-2 px-2 gap-x-2 w-full rounded-lg">
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

                  <div className="flex flex-col">
                    <small>Protocol Service</small>
                    <div className="flex items-center bg-gray-100 h-[47px] px-2 gap-x-2 w-full rounded-lg">
                      <div className="w-[5%]">
                        <MdOutlineNordicWalking
                          size={16}
                          className="text-gray-500"
                        />
                      </div>

                      <div className="w-[95%] text-shuttlelaneBlack text-sm relative z-[90]">
                        {/* <GoogleLocationInput placeholder="Dropoff Location" /> */}
                        <Select
                          value={protocolSelected}
                          onChange={(value) => setProtocolSelected(value)}
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
                              zIndex: 99,
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
                          placeholder="Select Protocol Service"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <small>Pass Type</small>
                    <div className="flex items-center bg-gray-100 h-[47px] px-2 gap-x-2 w-full rounded-lg">
                      <div className="w-[5%]">
                        <FaPersonWalkingDashedLineArrowRight
                          size={16}
                          className="text-gray-500"
                        />
                      </div>

                      <div className="w-[95%] text-shuttlelaneBlack text-sm relative">
                        {/* <GoogleLocationInput placeholder="Dropoff Location" /> */}
                        <Select
                          value={passSelected}
                          onChange={(value) => setPassSelected(value)}
                          options={passesData}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderColor: state.isFocused
                                ? "transparent"
                                : "transparent",
                              borderWidth: state.isFocused ? "0" : "0",
                              backgroundColor: "transparent",
                              position: "relative",
                              //   zIndex: 99,
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

                  <div className="flex flex-col">
                    <small>Passengers</small>
                    <div className="flex items-center bg-gray-100 h-[47px] px-2 gap-x-2 w-full rounded-lg">
                      <div className="w-[5%]">
                        <MdPerson size={16} className="text-gray-500" />
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
                                    "You cannot have more than 10 passengers!"
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
                                let newDayValue;
                                if (isNaN(passengers)) {
                                  newDayValue = 1;
                                } else {
                                  newDayValue = +passengers - 1;
                                }

                                if (newDayValue === 0) {
                                  toast.info(
                                    "You cannot select less than 1 day!"
                                  );
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
                                let newDayValue;
                                if (isNaN(passengers)) {
                                  newDayValue = 1;
                                } else {
                                  newDayValue = +passengers + 1;
                                }
                                if (newDayValue > 10) {
                                  toast.info(
                                    "You cannot select more than 10 passengers!"
                                  );
                                  return;
                                } else {
                                  setPassengers(+passengers + 1);
                                }
                              }}
                              className="flex items-center justify-center cursor-pointer p-1 border-[.5px] border-gray-400 rounded-sm"
                            >
                              <AiOutlinePlus
                                size={16}
                                className="text-gray-500"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                onClick={(e) => {
                  updateBooking(e);
                }}
                className="w-full flex justify-center items-center text-sm text-white hover:text-shuttlelaneBlack h-11 p-3 transition-all hover:border-[1px] hover:bg-transparent bg-shuttlelanePurple focus:outline-none border-gray-400 rounded-lg"
              >
                {isLoading ? (
                  <ImSpinner2 size={21} className="animate-spin" />
                ) : (
                  "Save changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </Modal>

      <div className="mt-5 w-full flex lg:flex-row flex-col gap-x-4">
        <div className="lg:w-[65%] w-full">
          <div className="bg-white p-7">
            <div className="flex flex-col">
              <p className="text-xl font-semibold">Priority Pass</p>
              <p className="text-sm -mt-1">Passenger Details</p>
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
          </div>

          <Pay
            isPaymentDisabled={
              !bookingDetails?.pickupLocation ||
              !bookingDetails?.pickupDate ||
              !bookingDetails?.pickupTime ||
              !bookingDetails?.passSelected ||
              !bookingDetails?.protocolSelected ||
              !selectedTitle ||
              !fullName ||
              !phoneNumber ||
              !email ||
              !flightNumber ||
              !airline
                ? true
                : false
            }
            selectedTitle={selectedTitle}
            fullName={fullName}
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
                onClick={() => {
                  setIsEditBookingModalOpen(true);
                  console.log("HI, you clicked the edit button");
                }}
                className="underline text-xs"
              >
                Edit
              </button>
            </div>
            <div className="mt-10">
              <div className="flex flex-col gap-y-[16.5px]">
                <div className="flex gap-x-1">
                  <BiSolidCity size={16} />
                  <div className="flex flex-col gap-y-1">
                    <span className="text-xs font-medium">
                      {bookingDetails?.citySelected?.label ?? (
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
                  <MdPerson size={16} />
                  <div className="flex flex-col gap-y-1">
                    <span className="text-xs font-medium">
                      {bookingDetails?.passengers ? (
                        `${bookingDetails?.passengers} passengers`
                      ) : (
                        <span className="text-gray-300 text-xs">
                          Not yet selected
                        </span>
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex gap-x-1">
                  <MdOutlineNordicWalking size={16} />
                  <div className="flex flex-col gap-y-1">
                    <span className="text-xs font-medium">
                      {bookingDetails?.protocolSelected?.label ?? (
                        <span className="text-gray-300 text-xs">
                          Not yet selected
                        </span>
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex gap-x-1">
                  <FaPersonWalkingDashedLineArrowRight size={16} />
                  <div className="flex flex-col gap-y-1">
                    <span className="text-xs font-medium">
                      {bookingDetails?.passSelected?.value?.name ?? (
                        <span className="text-gray-300 text-xs">
                          Not yet selected
                        </span>
                      )}
                    </span>
                  </div>
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
            <div className="mt-5">
              <div className="w-full max-h-[163px] h-[163px] min-h-[163px] overflow-hidden">
                <GoogleMapsWithDirections
                  pickupAddress={bookingDetails?.pickupAddress}
                  pickupCoordinates={bookingDetails?.pickupCoordinates}
                  dropoffAddress={bookingDetails?.pickupAddress}
                  dropoffCoordinates={bookingDetails?.pickupCoordinates}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
