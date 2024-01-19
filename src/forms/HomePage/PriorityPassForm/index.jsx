import React, { useEffect, useRef } from "react";
import {
  BsAirplane,
  BsPlusCircleDotted,
  BsTicketPerforated,
} from "react-icons/bs";
import { HiArrowLongRight } from "react-icons/hi2";
import GoogleLocationInput from "../../../components/ui/GoogleLocationInput";
import { IoLocationOutline } from "react-icons/io5";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { CiCalendar, CiClock1 } from "react-icons/ci";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoCarSportOutline } from "react-icons/io5";
import Select from "react-select";
import { Fade } from "react-reveal";
import {
  MdOutlineLuggage,
  MdOutlineNordicWalking,
  MdPerson,
  MdPersonOutline,
} from "react-icons/md";
import LocationInput from "../../../components/ui/Form/LocationInput";
import { BiSolidCity } from "react-icons/bi";
import { FaPersonWalkingDashedLineArrowRight } from "react-icons/fa6";
import DatePicker from "rsuite/DatePicker";
import "rsuite/dist/rsuite.css";
import enGB from "date-fns/locale/en-GB";
import { useNavigate } from "react-router-dom";
import {
  fetchCities,
  fetchPasses,
  setBookingDetails,
} from "../../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

function PriorityPassForm() {
  const [passType, setPassType] = useState("standard-pass");

  const services = [
    { value: "Arrival Protocol", label: "Arrival Protocol" },
    { value: "Departure Protocol", label: "Departure Protocol" },
  ];

  // FORM FIELDS
  const [pickupLocation, setPickupLocation] = useState();
  const pickupLocationRef = useRef(null);
  const [pickupLocationInput, setPickupLocationInput] = useState();
  const [pickupDate, setPickupDate] = useState();
  const [pickupTime, setPickupTime] = useState();
  const [days, setDays] = useState("");
  const [selectedPass, setSelectedPass] = useState();
  const [selectedCity, setSelectedCity] = useState();
  const [selectedProtocol, setSelectedProtocol] = useState();

  // Date Setup
  const minSelectableDate = new Date(); //
  // A function to disable dates earlier than the minimum date
  const disableDateBeforeMin = (date) => {
    return date < minSelectableDate;
  };

  const { isLoading, cities, cars, passes } = useSelector(
    (store) => store.user
  );
  const dispatch = useDispatch();

  // Fetch passes and cities
  useEffect(() => {
    dispatch(fetchPasses());
    dispatch(fetchCities());
  }, []);

  // Format passes
  const [passesData, setPassessData] = useState();
  useEffect(() => {
    let updatedPassesData = [];
    passes?.forEach((pass) => {
      updatedPassesData.push({
        value: pass,
        label: pass?.name,
      });
    });

    console.log("PASSES:::", updatedPassesData);

    setPassessData(updatedPassesData);
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
    if (
      !pickupLocationInput ||
      !pickupDate ||
      !pickupTime ||
      !selectedPass ||
      !selectedProtocol ||
      !selectedCity
    ) {
      toast.info("Please fill in the missing fields.");
      return;
    } else {
      dispatch(
        setBookingDetails({
          bookingType: "Priority",
          bookingDetails: {
            pickupLocation: pickupLocationInput,
            pickupDate,
            pickupTime,
            days,
            passSelected: selectedPass,
            protocolSelected: selectedProtocol,
            citySelected: selectedCity,
            passengers: 1,
          },
        })
      );
      navigate("/booking/confirm-booking");
    }
  }

  return (
    <>
      <ToastContainer toastClassName="text-sm" />
      {/* <div className="w-full lg:flex-row lg:justify-between lg:items-center -mt-12">
        <div className="bg-white lg:h-[250px] h-[520px] w-auto shadow-lg py-7 pb-10 gap-y-5 gap-x-4 px-7 lg:px-4 lg:pl-10 relative rounded-2xl"> */}
      <Fade duration={1500}>
        <div className="w-full flex items-center mt-5">
          <div className="flex w-full items-center lg:flex-row flex-col">
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
                      placeholder="Select City"
                    />
                  </div>
                </div>

                <div className="relative flex h-[47px] items-center bg-gray-100 py-2 px-2 gap-x-2 w-full rounded-lg">
                  <div className="w-[5%]">
                    <IoLocationOutline size={16} className="text-gray-700" />
                  </div>

                  <div className="w-full relative text-shuttlelaneBlack">
                    <LocationInput
                      placeholder="Pickup From (Airport, Port, Address)"
                      setLocation={setPickupLocation}
                      location={pickupLocation}
                      locationRef={pickupLocationRef}
                      locationInput={pickupLocationInput}
                      setLocationInput={setPickupLocationInput}
                    />
                  </div>
                </div>

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
            </div>

            <div className="h-[55px] shadow-[#4540cf85] shadow-md bg-shuttlelanePurple w-[55px] min-h-[55px] min-w-[55px] bg-[#EBEBEF] z-10 relative flex items-center justify-center rounded-full">
              <HiOutlineSwitchHorizontal
                size={20}
                className="text-white rotate-90 lg:rotate-0"
              />
            </div>

            <div className="py-3 w-full lg:w-[50%] px-4 border-gray-400 bg-transparent border-dashed border-[.2px] rounded-lg">
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center bg-gray-100 h-[47px] px-2 gap-x-2 w-full rounded-lg">
                  <div className="w-[5%]">
                    <MdOutlineNordicWalking
                      size={18}
                      className="text-gray-500"
                    />
                  </div>

                  <div className="w-[95%] text-shuttlelaneBlack text-sm relative z-[99]">
                    {/* <GoogleLocationInput placeholder="Dropoff Location" /> */}
                    <Select
                      value={selectedProtocol}
                      onChange={(value) => setSelectedProtocol(value)}
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
                <div className="flex items-center bg-gray-100 h-[47px] px-2 gap-x-2 w-full rounded-lg relative z-[80]">
                  <div className="w-[5%]">
                    <FaPersonWalkingDashedLineArrowRight
                      size={18}
                      className="text-gray-500"
                    />
                  </div>

                  <div className="w-[95%] text-shuttlelaneBlack text-sm">
                    {/* <GoogleLocationInput placeholder="Dropoff Location" /> */}
                    <Select
                      value={selectedPass}
                      onChange={(value) => setSelectedPass(value)}
                      options={passesData}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderColor: state.isFocused
                            ? "transparent"
                            : "transparent",
                          borderWidth: state.isFocused ? "0" : "0",
                          backgroundColor: "transparent",
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

                {/* <div className="flex items-center justify-between gap-x-3">
                  <div className="flex h-[47px] items-center bg-gray-100 py-2 px-2 gap-x-2 w-[48%] lg:w-full rounded-lg">
                    <div className="w-[5%]">
                      <BsAirplane size={16} className="text-shuttlelaneBlack" />
                    </div>

                    <div className="w-[95%]">
                      <input
                        type="text"
                        className="text-sm px-3 bg-transparent w-full focus:outline-none text-sm text-shuttlelaneBlack"
                        placeholder="Airline"
                      />
                    </div>
                  </div>
                  <div className="flex h-[47px] items-center bg-gray-100 py-2 px-2 gap-x-2 w-[48%] lg:w-full rounded-lg">
                    <div className="w-[5%]">
                      <BsTicketPerforated
                        size={16}
                        className="text-shuttlelaneBlack"
                      />
                    </div>

                    <div className="w-[95%]">
                      <input
                        type="text"
                        className="text-sm px-3 bg-transparent w-full focus:outline-none text-sm text-shuttlelaneBlack"
                        placeholder="Flight Number"
                      />
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full justify-end absolute right-10 -bottom-5">
          <button
            type="submit"
            className="bg-shuttlelanePurple shadow-[#4540cf85] shadow-md text-white h-10 rounded-lg mt-3 flex items-center gap-x-3 p-3 w-32 justify-center"
            // disabled={isSubmitting}
            onClick={(e) => handleBookNow(e)}
          >
            <span className="text-sm">Book Now</span>
            <HiArrowLongRight size={16} className="" />
          </button>
        </div>
      </Fade>
      {/* </div>
      </div> */}
    </>
  );
}

export default PriorityPassForm;
