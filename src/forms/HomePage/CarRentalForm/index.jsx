import React, { useEffect, useRef } from "react";
import { BsPlusCircleDotted } from "react-icons/bs";
import { HiArrowLongRight } from "react-icons/hi2";
import GoogleLocationInput from "../../../components/ui/GoogleLocationInput";
import { IoLocationOutline } from "react-icons/io5";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { CiCalendar, CiClock1 } from "react-icons/ci";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoCarSportOutline } from "react-icons/io5";
import { TbBrandDaysCounter } from "react-icons/tb";
import Select from "react-select";
import { Fade } from "react-reveal";
import LocationInput from "../../../components/ui/Form/LocationInput";
import DatePicker from "rsuite/DatePicker";
import "rsuite/dist/rsuite.css";
import enGB from "date-fns/locale/en-GB";
import { BiMinus, BiSolidCity } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCars,
  fetchCities,
  setBookingDetails,
} from "../../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

function CarRentalForm() {
  // FORM FIELDS
  const [pickupLocation, setPickupLocation] = useState();
  const pickupLocationRef = useRef(null);
  const [pickupLocationInput, setPickupLocationInput] = useState();
  const [pickupDate, setPickupDate] = useState();
  const [pickupTime, setPickupTime] = useState();
  const [days, setDays] = useState("");
  const [selectedCar, setSelectedCar] = useState();
  const [selectedCity, setSelectedCity] = useState();

  // Date Setup
  const minSelectableDate = new Date(); //
  minSelectableDate.setDate(minSelectableDate.getDate() - 1);
  // A function to disable dates earlier than the minimum date
  const disableDateBeforeMin = (date) => {
    return date < minSelectableDate;
  };

  const [bookingType, setBookingType] = useState("round-trip");

  const cityData = [
    { value: "Lagos", label: "Lagos" },
    { value: "Accra", label: "Accra" },
    { value: "Ogun", label: "Ogun" },
    { value: "Ibadans", label: "Ibadanss" },
  ];

  const { isLoading, cities, cars } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  // Fetch cars and cities
  useEffect(() => {
    dispatch(fetchCars());
    dispatch(fetchCities());
  }, []);

  // Format cars
  const [carsData, setCarsData] = useState();
  useEffect(() => {
    let updatedCarsData = [];
    cars?.forEach((car) => {
      updatedCarsData.push({
        value: car,
        label: car?.name,
      });
    });

    console.log("CARS:::", updatedCarsData);

    setCarsData(updatedCarsData);
  }, [cars]);

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
      !days ||
      !selectedCar ||
      !selectedCity
    ) {
      toast.info("Please fill in the missing fields.");
      return;
    } else {
      dispatch(
        setBookingDetails({
          bookingType: "Car",
          bookingDetails: {
            pickupAddress: pickupLocationInput,
            pickupCoordinates: {
              lat: pickupLocation?.latitude,
              lng: pickupLocation?.longitude,
            },
            pickupDate,
            pickupTime,
            days,
            carSelected: selectedCar,
            citySelected: selectedCity,
          },
        })
      );
      navigate("/booking/confirm-booking");
    }
  }

  return (
    <>
      <ToastContainer toastClassName="text-sm" />

      <Fade duration={1500}>
        <div className="w-full flex items-center mt-5">
          <div className="flex w-full justify-center items-center gap-x-2 lg:flex-row flex-col">
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
                      airports={airports}
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
                    <IoCarSportOutline size={16} className="text-gray-500" />
                  </div>

                  <div className="w-[95%] text-shuttlelaneBlack text-sm relative z-[90]">
                    {/* <GoogleLocationInput placeholder="Dropoff Location" /> */}
                    <Select
                      value={selectedCar}
                      onChange={(value) => setSelectedCar(value)}
                      options={carsData}
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
                      placeholder="Select Car"
                    />
                  </div>
                </div>

                <div className="flex items-center bg-gray-100 h-[47px] px-2 gap-x-2 w-full rounded-lg">
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
                              toast.info(
                                "You cannot select more than 10 days!"
                              );
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
                              toast.info(
                                "You cannot select more than 10 days!"
                              );
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
    </>
  );
}

export default CarRentalForm;
