import React from "react";
import { BsPlusCircleDotted } from "react-icons/bs";
import { HiArrowLongRight } from "react-icons/hi2";
import GoogleLocationInput from "../../../components/ui/GoogleLocationInput";
import { IoLocationOutline } from "react-icons/io5";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { CiCalendar, CiClock1 } from "react-icons/ci";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Fade from "react-reveal";

function AirportTransferForm() {
  const [bookingType, setBookingType] = useState("round-trip");
  const [passengers, setPassengers] = useState(1);
  return (
    <>
      <ToastContainer toastClassName="text-sm" />
      <div className="w-full lg:flex-row lg:justify-between lg:items-center -mt-12">
        <div className="bg-white lg:h-[250px] h-[475px] w-auto backdrop-blur-sm bg-opacity-[95%] shadow-lg py-7 pb-10 gap-y-5 gap-x-4 px-7 lg:px-4 lg:pl-10 relative rounded-2xl">
          <Fade duration={1500}>
            <div className="flex items-center gap-x-5">
              <select
                value={bookingType}
                onChange={(e) => setBookingType(e.target.value)}
                className="transition-all active:outline-none focus:outline-none text-sm border-dashed border-[.5px] text-shuttlelaneBlack bg-transparent border-shuttlelaneBlack h-[30px] min-w-[60px] px-5 rounded-full"
              >
                <option value="round-trip" className="text-sm">
                  Round Trip
                </option>
                <option value="one-way" className="text-sm">
                  One Way
                </option>
              </select>

              <div className="flex items-center gap-x-2">
                <input
                  type="tel"
                  maxLength={2}
                  max={10}
                  min={1}
                  value={passengers}
                  // Validate input to ensure it takes in ONLY numbers
                  onInput={(e) => {
                    if (isNaN(e.currentTarget.value)) {
                      e.currentTarget.value = 1;
                      toast.info("This field supports only numbers");
                    }
                  }}
                  onChange={(e) => {
                    // Make sure passengers does not excees 10
                    if (e.target.value > 10) {
                      toast.info("You cannot have more than 10 passengers");
                    } else if (e.target.value < 0) {
                      toast.info("Invalid value passed");
                    } else {
                      setPassengers(e.target.value);
                    }
                  }}
                  className="max-w-[25px] text-sm text-center px-1 py-1 rounded-sm border-b-shuttlelaneBlack bg-transparent border-b-dashed border-b-[.2px] focus:outline-none text-shuttlelaneBlack"
                />
                <p className="text-sm text-shuttlelaneBlack">Passengers</p>
              </div>
            </div>

            <div className="w-full flex items-center mt-5">
              <div className="flex w-full items-center lg:flex-row flex-col">
                <div className="py-3 w-full lg:w-[50%] px-4 border-shuttlelaneBlack bg-transparent border-dashed border-[.2px] rounded-lg">
                  <div className="flex flex-col gap-y-2">
                    <small className="text-[.7rem] text-shuttlelaneBlack">
                      FROM
                    </small>

                    <div className="flex h-[47px] items-center bg-white py-2 px-2 gap-x-2 w-full rounded-lg">
                      <div className="w-[5%]">
                        <IoLocationOutline
                          size={16}
                          className="text-shuttlelaneBlack"
                        />
                      </div>

                      <div className="w-[98%]">
                        <GoogleLocationInput placeholder="Pickup Location" />
                      </div>
                      {/* <input
                          type="text"
                          className="bg-transparent w-full focus:outline-none text-sm text-shuttlelaneBlack"
                        /> */}
                    </div>

                    <div className="flex items-center justify-between gap-x-3">
                      <div className="flex h-[47px] items-center bg-white py-2 px-2 gap-x-2 w-[48%] lg:w-full rounded-lg">
                        <div className="w-[5%]">
                          <CiCalendar
                            size={16}
                            className="text-shuttlelaneBlack"
                          />
                        </div>

                        <div className="w-[98%]">
                          <input
                            type="date"
                            className="text-sm px-3 bg-transparent w-full focus:outline-none text-shuttlelaneBlack"
                          />
                        </div>
                        {/* <input
                          type="text"
                        /> */}
                      </div>
                      <div className="flex h-[47px] items-center bg-white py-2 px-2 gap-x-2 w-[48%] lg:w-full rounded-lg">
                        <div className="w-[5%]">
                          <CiClock1
                            size={16}
                            className="text-shuttlelaneBlack"
                          />
                        </div>

                        <div className="w-[98%]">
                          <input
                            type="time"
                            className="text-sm px-3 bg-transparent w-full focus:outline-none text-shuttlelaneBlack"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-[55px] shadow-[#4540cf85] shadow-md bg-shuttlelanePurple w-[55px] min-h-[55px] min-w-[55px] bg-[#EBEBEF] z-10 relative lg:-left-3 flex items-center justify-center rounded-full">
                  <HiOutlineSwitchHorizontal
                    size={20}
                    className="text-white rotate-90 lg:rotate-0"
                  />
                </div>

                <div className="py-3 px-4 w-full lg:w-[50%] relative lg:-left-6 border-shuttlelaneBlack bg-transparent border-dashed border-[1px] lg:border-[.2px] rounded-lg">
                  <div className="flex flex-col gap-y-2">
                    <small className="text-[.7rem] text-shuttlelaneBlack">
                      TO
                    </small>

                    <div className="flex h-[47px] items-center bg-white py-2 px-2 gap-x-2 w-full rounded-lg">
                      <div className="w-[5%]">
                        <IoLocationOutline
                          size={16}
                          className="text-shuttlelaneBlack"
                        />
                      </div>

                      <div className="w-[95%] text-shuttlelaneBlack">
                        <GoogleLocationInput placeholder="Dropoff Location" />
                      </div>
                      {/* <input
                          type="text"
                          className="bg-transparent w-full focus:outline-none text-sm text-shuttlelaneBlack"
                        /> */}
                    </div>

                    <div className="flex h-[47px] items-center justify-between gap-x-3">
                      {bookingType !== "round-trip" && (
                        <button
                          onClick={() => setBookingType("round-trip")}
                          className="flex text-shuttlelaneBlack items-center bg-white py-2 px-2 gap-x-2 w-full rounded-lg"
                        >
                          <BsPlusCircleDotted size={16} />
                          <p className="text-sm">Add Return</p>
                        </button>
                      )}

                      {bookingType === "round-trip" && (
                        <>
                          <div className="flex h-[47px] items-center bg-white py-2 px-2 gap-x-2 w-[48%] lg:w-full rounded-lg">
                            <div className="w-[5%]">
                              <CiCalendar
                                size={16}
                                className="text-shuttlelaneBlack"
                              />
                            </div>

                            <div className="w-[98%]">
                              <input
                                type="date"
                                className="text-sm px-3 bg-transparent w-full focus:outline-none text-shuttlelaneBlack"
                              />
                            </div>
                          </div>
                          <div className="flex h-[47px] items-center bg-white py-2 px-2 gap-x-2 w-[48%] lg:w-full rounded-lg">
                            <div className="w-[5%]">
                              <CiClock1
                                size={16}
                                className="text-shuttlelaneBlack"
                              />
                            </div>

                            <div className="w-[98%]">
                              <input
                                type="time"
                                className="text-sm px-3 bg-transparent w-full focus:outline-none text-shuttlelaneBlack"
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

            <div className="flex w-full justify-end absolute right-10 -bottom-5">
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
        </div>
      </div>
    </>
  );
}

export default AirportTransferForm;
