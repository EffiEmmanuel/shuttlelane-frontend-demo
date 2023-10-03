import React from "react";
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
import { BiMinus, BiSolidCity } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import Select from "react-select";
import Switch from "react-switch";

function AirportTransferForm() {
  const [bookingType, setBookingType] = useState("round-trip");
  const [isOneWay, setIsOneWay] = useState(false);
  const [passengers, setPassengers] = useState(1);

  // FORM FIELDS
  const [pickupLocation, setPickupLocation] = useState();
  const [dropoffLocation, setDropoffLocation] = useState();
  const [selectedCity, setSelectedCity] = useState();

  const data = [
    { value: "Lagos", label: "Lagos" },
    { value: "Accra", label: "Accra" },
    { value: "Ogun", label: "Ogun" },
    { value: "Ibadans", label: "Ibadanss" },
  ];

  return (
    <>
      <ToastContainer toastClassName="text-sm" />
      {/* <div className="w-full lg:flex-row lg:justify-between lg:items-center -mt-12">
        <div className="bg-white lg:h-[250px] h-[520px] w-auto shadow-lg py-5 gap-y-5 gap-x-4 px-7 lg:px-4 lg:px-5 z-0 relative rounded-2xl"> */}
      <Fade duration={1500}>
        <div className="flex items-center gap-x-5">
          {/* TRIP TYPE */}
          <div className="flex transition-all items-center gap-x-1 text-shuttlelaneBlack">
            <p className="text-sm transition-all">
              {isOneWay ? "One Way" : "Round Trip"}
            </p>

            <Switch
              onChange={(checked) => setIsOneWay(checked)}
              checked={isOneWay}
              height={15}
              width={35}
              handleDiameter={10}
              checkedIcon={false}
              uncheckedIcon={false}
              onColor="#262471"
            />
          </div>
          {/* <select
            value={bookingType}
            onChange={(e) => setBookingType(e.target.value)}
            className="transition-all active:outline-none focus:outline-none text-sm border-dashed border-[1.2px] lg:border-[.5px] text-shuttlelaneBlack bg-transparent border-shuttlelaneBlack h-[30px] min-w-[60px] px-5 rounded-full"
          >
            <option value="round-trip" className="text-sm">
              Round Trip
            </option>
            <option value="one-way" className="text-sm">
              One Way
            </option>
          </select> */}
        </div>

        <div className="w-full flex items-center mt-5">
          <div className="flex w-full items-center justify-between gap-x-2 lg:flex-row flex-col">
            <div className="py-3 w-full lg:w-[50%] px-4 border-gray-400 bg-transparent border-dashed border-[.2px] rounded-lg">
              <div className="flex flex-col gap-y-2">
                {/* <small className="text-[.7rem] text-shuttlelaneBlack">
                      FROM
                    </small> */}
                <div className="flex items-center bg-gray-100 h-[47px] px-2 gap-x-2 w-full rounded-lg">
                  <div className="w-[5%]">
                    <BiSolidCity size={16} className="text-gray-500" />
                  </div>

                  <div className="w-[95%] text-shuttlelaneBlack text-sm">
                    {/* <GoogleLocationInput placeholder="Dropoff Location" /> */}
                    <Select
                      value={selectedCity}
                      onChange={(value) => console.log("VALUE:", value)}
                      options={data}
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
                      placeholder="Select City"
                    />
                  </div>
                </div>

                <div className="relative flex h-[47px] items-center bg-gray-100 py-2 px-2 gap-x-2 w-full rounded-lg">
                  <div className="w-[5%]">
                    <IoLocationOutline
                      size={16}
                      className="text-shuttlelaneBlack"
                    />
                  </div>

                  <div className="w-[98%] relative">
                    <LocationInput
                      placeholder="From (Airport, Port, Address)"
                      setLocation={setPickupLocation}
                    />
                    {/* <DatePicker
                          size="lg"
                          placeholder="Pickup Date"
                          // appearance="subtle"
                          style={{
                            color: "#000",
                          }}
                        /> */}
                  </div>
                </div>

                <div className="flex flex-col gap-y-2 lg:flex-row lg:items-center lg:justify-between gap-x-3">
                  <div className="flex h-[47px] items-center bg-gray-100 py-2 px-2 gap-x-2 w-full rounded-lg">
                    <div className="w-full">
                      <input
                        type="date"
                        className="text-sm px-3 bg-red-500 w-full focus:outline-none text-shuttlelaneBlack"
                      />
                    </div>
                  </div>
                  <div className="flex h-[47px] items-center bg-gray-100 py-2 px-2 gap-x-2 w-full rounded-lg">
                    <div className="w-full">
                      <input
                        type="time"
                        className="text-sm px-3 bg-red-500 w-full focus:outline-none text-shuttlelaneBlack"
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
                <div className="flex h-[47px] items-center bg-gray-100 py-2 px-2 gap-x-2 w-full rounded-lg">
                  <div className="w-[5%]">
                    <IoLocationOutline
                      size={16}
                      className="text-shuttlelaneBlack"
                    />
                  </div>

                  <div className="w-[95%] text-shuttlelaneBlack relative">
                    <LocationInput
                      placeholder="To (Airport, Port, Address)"
                      setLocation={setDropoffLocation}
                    />
                  </div>
                </div>

                <div className="flex h-[47px] items-center bg-gray-100 py-2 px-2 gap-x-2 w-full rounded-lg">
                  <div className="w-[5%]">
                    <BsPerson size={16} className="text-shuttlelaneBlack" />
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
                          <AiOutlinePlus size={16} className="text-gray-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-y-2 lg:flex-row lg:items-center lg:justify-between gap-x-3">
                  {isOneWay && (
                    <button
                      onClick={() => setIsOneWay(false)}
                      className="flex h-[47px] text-shuttlelaneBlack items-center bg-gray-100 py-2 px-2 gap-x-2 w-full rounded-lg"
                    >
                      <BsPlusCircleDotted size={16} />
                      <p className="text-sm">Add Return</p>
                    </button>
                  )}

                  {!isOneWay && (
                    <>
                      <div className="flex h-[47px] items-center bg-gray-100 py-2 px-2 gap-x-2 w-full rounded-lg">
                        <div className="w-[100%]">
                          <input
                            type="date"
                            className="text-sm px-2 bg-transparent w-full focus:outline-none text-shuttlelaneBlack"
                          />
                        </div>
                      </div>
                      <div className="flex h-[47px] items-center bg-gray-100 py-2 px-2 gap-x-2 w-full rounded-lg">
                        <div className="w-[100%]">
                          <input
                            type="time"
                            className="text-sm px-2 bg-transparent w-full focus:outline-none text-shuttlelaneBlack"
                          />
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
            // onClick={() => onSubmit(values)}
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

export default AirportTransferForm;
