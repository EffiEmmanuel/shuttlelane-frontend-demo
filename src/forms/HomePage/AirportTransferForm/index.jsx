import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BsPerson, BsPlusCircleDotted } from "react-icons/bs";
import { HiArrowLongRight } from "react-icons/hi2";
import GoogleLocationInput from "../../../components/ui/GoogleLocationInput";
import { IoAirplaneOutline, IoLocationOutline } from "react-icons/io5";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { CiCalendar, CiClock1 } from "react-icons/ci";
import { ImSpinner2 } from "react-icons/im";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Fade from "react-reveal";
import LocationInput from "../../../components/ui/Form/LocationInput";
import DatePicker from "rsuite/DatePicker";
import "rsuite/dist/rsuite.css";
import enGB from "date-fns/locale/en-GB";
import { BiMinus, BiSolidCity } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import Select from "react-select";
import Switch from "react-switch";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCities,
  setBookingDetails,
} from "../../../redux/slices/userSlice";
import Preloader from "../../../components/ui/Preloader";

function AirportTransferForm() {
  // Date Setup
  const minSelectableDate = new Date();
  minSelectableDate.setDate(minSelectableDate.getDate() - 1);
  // A function to disable dates earlier than the minimum date
  const disableDateBeforeMin = (date) => {
    return date < minSelectableDate;
  };

  const [bookingType, setBookingType] = useState("round-trip");
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [passengers, setPassengers] = useState("");

  const [pickupLocation, setPickupLocation] = useState();
  const pickupLocationRef = useRef(null);
  const [pickupLocationInput, setPickupLocationInput] = useState();
  const [pickupDate, setPickupDate] = useState();
  const [pickupTime, setPickupTime] = useState();
  const [dropoffLocation, setDropoffLocation] = useState();
  const dropoffLocationRef = useRef(null);
  const [dropoffLocationInput, setDropoffLocationInput] = useState();
  const [returnDate, setReturnDate] = useState();
  const [returnTime, setReturnTime] = useState();
  const [selectedCity, setSelectedCity] = useState();

  const { isLoading, cities } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCities());
  }, []);

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
      const citySelected = cities?.filter(
        (city) => city?._id == selectedCity?.value
      );
      setAirports(citySelected[0]?.airports);
    }
  }, [selectedCity]);

  // Handle BOOK NOW
  const navigate = useNavigate();
  function handleBookNow(e) {
    e.preventDefault();
    console.log("PL:", pickupLocation);
    console.log("DL:", dropoffLocation);
    if (
      isRoundTrip &&
      (!pickupLocationInput ||
        !pickupDate ||
        !pickupTime ||
        !dropoffLocationInput ||
        !returnDate ||
        !returnTime ||
        !selectedCity ||
        !passengers)
    ) {
      toast.info("Please fill in the missing fields.");
      setIsRedirecting(false);
      return;
    } else if (
      !isRoundTrip &&
      (!pickupLocationInput ||
        !pickupDate ||
        !pickupTime ||
        !dropoffLocationInput ||
        !selectedCity ||
        !passengers)
    ) {
      toast.info("Please fill in the missing fields.");
      setIsRedirecting(false);
      return;
    } else {
      dispatch(
        setBookingDetails({
          bookingType: "Airport",
          bookingDetails: {
            isRoundTrip,
            pickupLocation: pickupLocationInput,
            pickupCoordinates: {
              lat: pickupLocation?.latitude,
              lng: pickupLocation?.longitude,
            },
            pickupDate,
            pickupTime,
            dropoffLocation: dropoffLocationInput,
            dropoffCoordinates: {
              lat: dropoffLocation?.latitude,
              lng: dropoffLocation?.longitude,
            },
            returnDate,
            returnTime,
            selectedCity,
            passengers,
          },
        })
      );
      navigate("/booking/confirm-booking");
    }
  }

  // Form submission loading state
  const [isRedirecting, setIsRedirecting] = useState(false);

  return (
    <>
      {isLoading ? (
        <div className="flex flex-row items-center justify-center w-full h-full">
          <ImSpinner2
            size={32}
            className="text-shuttlelanePurple animate-spin"
          />
        </div>
      ) : (
        <>
          {isRedirecting && <Preloader />}

          <ToastContainer toastClassName="text-sm" />
          <Fade duration={1500}>
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

            <div className="w-full flex items-center mt-5">
              <div className="flex w-full items-center justify-between gap-x-2 lg:flex-row flex-col">
                <div className="py-3 w-full lg:w-[50%] px-4 border-gray-400 bg-transparent border-dashed border-[.2px] rounded-lg">
                  <div className="flex flex-col gap-y-2">
                    <div className="flex items-center bg-gray-100 h-[47px] px-2 gap-x-2 w-full rounded-lg">
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
                          placeholder="Select Destination City"
                        />
                      </div>
                    </div>

                    {isLoading && (
                      <div className="relative flex h-[47px] items-center bg-gray-100 animate-pulse py-2 px-2 gap-x-2 w-full rounded-lg"></div>
                    )}
                    {!isLoading && (
                      <div className="relative flex h-[47px] items-center bg-gray-100 py-2 px-2 gap-x-2 w-full rounded-lg">
                        <div className="w-[5%]">
                          <IoLocationOutline
                            size={16}
                            className="text-gray-700"
                          />
                        </div>

                        <div className="w-full relative text-shuttlelaneBlack">
                          <LocationInput
                            placeholder="From (Airport, Port, Address)"
                            setLocation={setPickupLocation}
                            location={pickupLocation}
                            locationRef={pickupLocationRef}
                            locationInput={pickupLocationInput}
                            setLocationInput={setPickupLocationInput}
                            airports={airports}
                          />
                        </div>
                      </div>
                    )}

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
                      <div className="flex h-[47px] items-center bg-gray-100 py-2 px-2 gap-x-2 w-full rounded-lg">
                        <div className="w-full">
                          <DatePicker
                            format="HH:mm"
                            hideSeconds={true}
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
                </div>

                <div className="h-[55px] shadow-[#4540cf85] shadow-md bg-shuttlelanePurple w-[55px] min-h-[55px] min-w-[55px] z-10 relative flex items-center justify-center rounded-full">
                  <HiOutlineSwitchHorizontal
                    size={20}
                    className="text-white rotate-90 lg:rotate-0"
                  />
                </div>

                <div className="py-3 px-4 w-full lg:w-[50%] relative border-gray-400 bg-transparent border-dashed border-[1px] lg:border-[.2px] rounded-lg">
                  <div className="flex flex-col gap-y-2">
                    {isLoading && (
                      <div className="relative flex h-[47px] items-center bg-gray-100 animate-pulse py-2 px-2 gap-x-2 w-full rounded-lg"></div>
                    )}

                    {!isLoading && (
                      <div className="flex h-[47px] items-center bg-gray-100 py-2 px-2 gap-x-2 w-full rounded-lg">
                        <div className="w-[5%]">
                          <IoLocationOutline
                            size={16}
                            className="text-gray-700"
                          />
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
                    )}

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
                                const newPassengerValue = +passengers - 1;
                                if (newPassengerValue === 0) {
                                  toast.info(
                                    "You cannot have less than 1 passenger!"
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
                                const newPassengerValue = +passengers + 1;
                                if (newPassengerValue > 10) {
                                  toast.info(
                                    "You cannot have more than 10 passengers!"
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
                  </div>
                </div>
              </div>
            </div>

            <div className="flex w-full justify-end z-[0] absolute right-10 -bottom-5">
              <button
                type="submit"
                className="bg-shuttlelanePurple shadow-[#4540cf85] shadow-md text-white h-10 rounded-lg mt-3 flex items-center gap-x-3 p-3 w-32 justify-center"
                // disabled={isSubmitting}
                onClick={(e) => {
                  setIsRedirecting(true);
                  setTimeout(() => {
                    handleBookNow(e);
                  }, 1500);
                }}
              >
                <span className="text-sm">Book Now</span>
                <HiArrowLongRight size={16} className="" />
              </button>
            </div>
          </Fade>
        </>
      )}
    </>
  );
}

export default AirportTransferForm;
