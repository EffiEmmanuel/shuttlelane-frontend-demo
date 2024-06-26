import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BsPerson, BsPlusCircleDotted } from "react-icons/bs";
import { HiArrowLongRight } from "react-icons/hi2";
import GoogleLocationInput from "../../../components/ui/GoogleLocationInput";
import { IoAirplaneOutline, IoLocationOutline } from "react-icons/io5";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { CiCalendar, CiClock1 } from "react-icons/ci";
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
  calculateTotal,
  fetchCities,
  setBookingDetails,
} from "../../../redux/slices/userSlice";

function UpdateAirportBookingForm(props) {
  // Date Setup
  const minSelectableDate = new Date(); //
  // A function to disable dates earlier than the minimum date
  const disableDateBeforeMin = (date) => {
    return date < minSelectableDate;
  };

  const { isLoading, cities, bookingDetails, userCurrency } = useSelector(
    (store) => store.user
  );

  //   const [bookingType, setBookingType] = useState("round-trip");
  const [isRoundTrip, setIsRoundTrip] = useState(bookingDetails?.bookingType);
  const [passengers, setPassengers] = useState(bookingDetails?.passengers);

  // FORM FIELDS
  const [pickupLocation, setPickupLocation] = useState();
  const pickupLocationRef = useRef(null);
  const [pickupLocationInput, setPickupLocationInput] = useState();
  const [pickupDate, setPickupDate] = useState();
  const [pickupTime, setPickupTime] = useState();
  const [dropoffLocation, setDropoffLocation] = useState();
  const dropoffLocationRef = useRef(null);
  const [dropoffLocationInput, setDropoffLocationInput] = useState();
  const [dropoffDate, setDropoffDate] = useState();
  const [dropoffTime, setDropoffTime] = useState();
  const [selectedCity, setSelectedCity] = useState();

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
  function handleUpdateBookingDetails(e) {
    e.preventDefault();
    if (
      isRoundTrip &&
      (!pickupLocationInput ||
        !pickupDate ||
        !pickupTime ||
        !dropoffLocationInput ||
        !dropoffDate ||
        !dropoffTime ||
        !selectedCity ||
        !passengers)
    ) {
      toast.info("Please fill in the missing fields.");
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
      return;
    } else {
      dispatch(
        calculateTotal({
          pickupLocation: pickupLocationInput,
          dropoffLocation: dropoffLocationInput,
          currentVehicleClass: props?.currentVehicleClass,
          isAddPriorityPass: props?.isAddPriorityPass,
          numberOfPasses: props?.numberOfPasses,
          passType: props?.passType,
          userCurrency,
          bookingType: "Airport",
        })
      );
      dispatch(
        setBookingDetails({
          bookingType: "Airport",
          bookingDetails: {
            isRoundTrip,
            pickupLocation: pickupLocationInput,
            pickupDate,
            pickupTime,
            dropoffLocation: dropoffLocationInput,
            dropoffDate,
            dropoffTime,
            selectedCity,
            passengers,
          },
        })
      );
      toast.success("Booking updated successfully!");
      props?.setIsEditBookingModalOpen(false);
    }
  }

  // PRE-FILL ALREADY FILLED AIRPORT TRANSFER FORM FIELDS
  useEffect(() => {
    setIsRoundTrip(bookingDetails?.isRoundTrip);
    setPickupLocationInput(bookingDetails?.pickupLocation);
    setPickupDate(bookingDetails?.pickupDate);
    setPickupTime(bookingDetails?.pickupTime);
    setDropoffLocationInput(bookingDetails?.dropoffLocation);
    setDropoffDate(bookingDetails?.dropoffDate);
    setDropoffTime(bookingDetails?.dropoffTime);
    setSelectedCity(bookingDetails?.selectedCity);
    setPassengers(bookingDetails?.passengers);
  }, [bookingDetails]);

  return (
    <>
      <ToastContainer toastClassName="text-sm" />
      <Fade duration={1500}>
        <div className="flex items-center gap-x-5 mt-10">
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
          <div className="flex w-full flex-col">
            <div className="py-3 w-full px-4 border-gray-400 bg-transparent border-dashed border-[.2px] rounded-lg">
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
                      placeholder="Select City"
                    />
                  </div>
                </div>

                {isLoading && (
                  <div className="relative flex h-[47px] items-center bg-gray-100 animate-pulse py-2 px-2 gap-x-2 w-full rounded-lg"></div>
                )}
                {!isLoading && (
                  <div className="relative flex h-[47px] items-center bg-gray-100 py-2 px-2 gap-x-2 w-full rounded-lg">
                    <div className="w-[5%]">
                      <IoLocationOutline size={16} className="text-gray-700" />
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

                <div className="flex flex-col gap-y-2">
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

            <div className="flex justify-center">
              <div className="h-[55px] shadow-[#4540cf85] shadow-md bg-shuttlelanePurple w-[55px] min-h-[55px] min-w-[55px] z-10 relative flex items-center justify-center rounded-full">
                <HiOutlineSwitchHorizontal
                  size={20}
                  className="text-white rotate-90"
                />
              </div>
            </div>

            <div className="py-3 px-4 w-full relative border-gray-400 bg-transparent border-dashed border-[1px] lg:border-[.2px] rounded-lg">
              <div className="flex flex-col gap-y-2">
                {isLoading && (
                  <div className="relative flex h-[47px] items-center bg-gray-100 animate-pulse py-2 px-2 gap-x-2 w-full rounded-lg"></div>
                )}

                {!isLoading && (
                  <div className="flex h-[47px] items-center bg-gray-100 py-2 px-2 gap-x-2 w-full rounded-lg">
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
                        className="text-[16px] px-2 bg-transparent w-full focus:outline-none text-shuttlelaneBlack"
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
                          <AiOutlinePlus size={16} className="text-gray-500" />
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
                              value={dropoffDate}
                              appearance="subtle"
                              onChange={(date) => {
                                setDropoffDate(date);
                              }}
                              placeholder="Dropoff Date"
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
                              value={dropoffTime}
                              appearance="subtle"
                              onChange={(time) => {
                                console.log("TIME:", time);
                                setDropoffTime(time);
                              }}
                              placeholder="Dropoff Time"
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

        <button
          type="submit"
          className="bg-shuttlelanePurple shadow-[#4540cf85] shadow-md text-white h-10 rounded-lg mt-5 flex items-center gap-x-3 p-3 w-full justify-center"
          // disabled={isSubmitting}
          onClick={(e) => handleUpdateBookingDetails(e)}
        >
          <span className="text-sm">Save Changes</span>
        </button>
      </Fade>
    </>
  );
}

export default UpdateAirportBookingForm;
