import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPassport, FaUser } from "react-icons/fa";
import {
  MdAirplanemodeActive,
  MdLuggage,
  MdOutlineFlightTakeoff,
  MdOutlineSupport,
} from "react-icons/md";
import { IoCarSport } from "react-icons/io5";
import { HiOutlineExternalLink, HiOutlineSupport } from "react-icons/hi";
import Chart from "react-apexcharts";
import { BiKey, BiSearch, BiSolidBadgeCheck, BiSupport } from "react-icons/bi";
import { LuCopy } from "react-icons/lu";
import { AiFillDelete, AiOutlineCheckCircle } from "react-icons/ai";
import DriverDashboardNavbar from "../../../../components/ui/Driver/DriverDashboardNavbar";
import DriverTopBar from "../../../../components/ui/Driver/DriverTopBar";
import { useDispatch, useSelector } from "react-redux";
import { BsArrowRight } from "react-icons/bs";
import { PiChat } from "react-icons/pi";
import { fetchCompletedJobs } from "../../../../redux/slices/driverSlice";
import GoogleMapsWithDirections from "../../../../components/ui/GoogleMapsWithDirection";

function DriverDashboardBookingPage() {
  // Redux setup
  const { isLoading, token, driver, completedBookings } = useSelector(
    (store) => store.driver
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCompletedJobs({ token, driverId: driver?._id }));
  }, [token]);

  return (
    <div className="">
      {/* Navbar here */}
      <DriverDashboardNavbar link="bookings" sublink="airport-transfer" />

      {/* Main content goes here */}
      <div className="w-full min-h-screen pl-[6%] bg-[#fff] text-shuttlelaneBlack">
        <div className="px-7 py-5 relative">
          {/* Top bar */}
          <DriverTopBar />

          {/* Main content */}
          <div className="mt-24 pt-2">
            <div className="flex xl:flex-row flex-col gap-x-5 gap-y-5">
              {/* Booking Summary - Total number of bookings */}
              <div className="w-full xl:w-[70%]">
                <div className="">
                  <div className="flex items-center gap-x-2">
                    <p className="font-medium">Most Recent Job</p>
                    <div className="h-2 w-2 rounded-full bg-shuttlelaneGold"></div>
                  </div>

                  <div className="h-auto w-full rounded-lg allRoundBoxShadow overflow-hidden mt-4">
                    <div className="flex items-center justify-center h-[220px] min-h-[220px] max-h-[220px] w-full rounded-tr-lg rounded-tl-lg">
                      {completedBookings?.length > 0 && (
                        <GoogleMapsWithDirections
                          pickupAddress={
                            completedBookings[0]?.booking?.pickupAddress
                          }
                          dropoffAddress={
                            completedBookings[0]?.booking?.dropoffAddress
                          }
                        />
                      )}
                    </div>

                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-x-2">
                        <div className="h-14 w-14 rounded-lg bg-white shadow-lg flex items-center justify-center">
                          <MdAirplanemodeActive size={20} className="" />
                        </div>

                        <div className="flex flex-col gap-y-1">
                          <small className="font-semibold">
                            35 Olowu street, Ikeja
                          </small>
                          <small className="">Nov 29, 2024 . 8:14AM</small>
                          <small className="text-green-500">Completed</small>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="">
                        <button
                          type="button"
                          className="bg-shuttlelaneBlack rounded-full h-10 w-10 flex items-center justify-center"
                        >
                          <BsArrowRight size={18} className="text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-11 w-full">
                  <div className="w-full rounded-lg border-[.3px] p-3 border-gray-100 h-auto">
                    {/* Searchbar */}
                    <div className="flex items-center gap-x-3 border-[.3px] border-gray-300 rounded-lg px-2 my-2 lg:w-1/4 w-full">
                      <BiSearch size={16} className="text-gray-400 rotate-90" />
                      <input
                        type="search"
                        placeholder="Search"
                        className="w-full h-8 bg-transparent text-xs focus:outline-none placeholder:text-xs placeholder:text-gray-400"
                      />
                    </div>

                    <div className="flex items-baseline justify-between">
                      <div className="flex items-center gap-x-2">
                        <p className="font-medium">Completed Jobs</p>
                        <div className="h-2 w-2 rounded-full bg-shuttlelaneGold"></div>
                      </div>
                    </div>

                    <div className="w-full shuttlelaneScrollbarHoriz overflow-x-scroll">
                      {/* Table header */}
                      <div className="flex justify-between items-baseline mb-2 border-b-[.3px] border-b-gray-100 text-gray-400 mt-2">
                        <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                          Passenger
                        </p>
                        <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                          Pickup Date
                        </p>
                        <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                          Pickup Location
                        </p>
                        <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                          Dropoff Location
                        </p>
                        <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                          Time
                        </p>
                      </div>

                      {completedBookings?.map((booking) => (
                        <div className="flex lg:w-auto w-max justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                          <p className="w-[180px] lg:w-[16.6%] text-xs flex items-center gap-x-2">
                            <span>AT36578</span>
                            <LuCopy
                              size={14}
                              className="text-shuttlelaneBlack"
                            />
                            <AiOutlineCheckCircle
                              size={14}
                              className="text-green-500"
                            />
                          </p>
                          <p className="w-[180px] lg:w-[16.6%] text-xs">
                            {booking?.firstName} {booking?.lastName}
                          </p>
                          <p className="w-[180px] lg:w-[16.6%] text-xs">
                            {booking?.emailAddress}
                          </p>
                          <p className="w-[180px] lg:w-[16.6%] text-xs">
                            {booking?.pickupDate}
                          </p>

                          <div className="w-[180px] lg:w-[16.6%] flex items-center gap-x-1">
                            <div
                              className={`h-2 w-2 ${
                                booking?.paymentStatus === "failed"
                                  ? "bg-success-500"
                                  : booking?.paymentStatus === "pending"
                                  ? "bg-red-500"
                                  : "bg-red-500"
                              } rounded-full`}
                            ></div>
                            <span
                              className={`text-xs ${
                                booking?.paymentStatus === "failed"
                                  ? "text-success-500"
                                  : booking?.paymentStatus === "pending"
                                  ? "text-red-500"
                                  : "text-red-500"
                              }`}
                            >
                              {booking?.paymentStatus}
                            </span>
                          </div>

                          <div className="w-[180px] lg:w-[16.6%] flex items-center gap-x-3">
                            <button className="h-7 w-28 p-2 text-white bg-shuttlelanePurple rounded-lg text-xs">
                              Assign driver
                            </button>
                            <Link
                              to="/"
                              className="hover:border-b-[.3px] hover:border-b-shuttlelaneBlack text-xs"
                            >
                              <HiOutlineExternalLink
                                size={13}
                                className="text-shuttlelaneBlack"
                              />
                            </Link>
                          </div>
                        </div>
                      ))}
                      {completedBookings?.length < 1 && (
                        <div className="flex justify-center items-center w-full">
                          <p className="text-sm">
                            There are no bookings for now.
                          </p>
                        </div>
                      )}
                      {/* Table body - Upcoming booking card */}
                      <div className="flex lg:w-auto w-max justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                        <p className="w-[180px] lg:w-[16.6%] text-xs flex items-center gap-x-2">
                          <span className="text-xs">AT36578</span>
                          <LuCopy size={14} className="text-shuttlelaneBlack" />
                          <AiOutlineCheckCircle
                            size={14}
                            className="text-green-500"
                          />
                        </p>
                        <p className="w-[180px] lg:w-[16.6%] text-xs">
                          Effi Emmanuel
                        </p>
                        <p className="w-[180px] lg:w-[16.6%] text-xs">
                          effiemmanuel@gmail.com
                        </p>
                        <p className="w-[180px] lg:w-[16.6%] text-xs">
                          12 October 2023
                        </p>

                        <div className="w-[180px] lg:w-[16.6%] flex items-center gap-x-1">
                          <div
                            className={`h-2 w-2 bg-red-500 rounded-full`}
                          ></div>
                          <span className={`text-xs text-red-500`}>Failed</span>
                        </div>

                        <div className="w-[180px] lg:w-[16.6%] flex items-center gap-x-3">
                          <button className="text-xs">
                            <AiFillDelete size={16} className="text-red-500" />
                          </button>
                        </div>
                      </div>
                      <div className="flex lg:w-auto w-max justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                        <p className="w-[180px] lg:w-[16.6%] text-xs flex items-center gap-x-2">
                          <span className="text-xs">AT36578</span>
                          <LuCopy size={14} className="text-shuttlelaneBlack" />
                          <AiOutlineCheckCircle
                            size={14}
                            className="text-green-500"
                          />
                        </p>
                        <p className="w-[180px] lg:w-[16.6%] text-xs">
                          Effi Emmanuel
                        </p>
                        <p className="w-[180px] lg:w-[16.6%] text-xs">
                          effiemmanuel@gmail.com
                        </p>
                        <p className="w-[180px] lg:w-[16.6%] text-xs">
                          12 October 2023
                        </p>

                        <div className="w-[180px] lg:w-[16.6%] flex items-center gap-x-1">
                          <div
                            className={`h-2 w-2 bg-red-500 rounded-full`}
                          ></div>
                          <span className={`text-xs text-red-500`}>Failed</span>
                        </div>

                        <div className="w-[180px] lg:w-[16.6%] flex items-center gap-x-3">
                          <button className="text-xs">
                            <AiFillDelete size={16} className="text-red-500" />
                          </button>
                        </div>
                      </div>
                      <div className="flex lg:w-auto w-max justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                        <p className="w-[180px] lg:w-[16.6%] text-xs flex items-center gap-x-2">
                          <span className="text-xs">AT36578</span>
                          <LuCopy size={14} className="text-shuttlelaneBlack" />
                          <AiOutlineCheckCircle
                            size={14}
                            className="text-green-500"
                          />
                        </p>
                        <p className="w-[180px] lg:w-[16.6%] text-xs">
                          Effi Emmanuel
                        </p>
                        <p className="w-[180px] lg:w-[16.6%] text-xs">
                          effiemmanuel@gmail.com
                        </p>
                        <p className="w-[180px] lg:w-[16.6%] text-xs">
                          12 October 2023
                        </p>

                        <div className="w-[180px] lg:w-[16.6%] flex items-center gap-x-1">
                          <div
                            className={`h-2 w-2 bg-red-500 rounded-full`}
                          ></div>
                          <span className={`text-xs text-red-500`}>Failed</span>
                        </div>

                        <div className="w-[180px] lg:w-[16.6%] flex items-center gap-x-3">
                          <button className="text-xs">
                            <AiFillDelete size={16} className="text-red-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full xl:w-[30%] mt-10">
                <div className="w-full rounded-lg border-[.3px] p-4 border-gray-100 h-auto">
                  <div className="flex items-center gap-x-2">
                    <p className="font-semibold text-lg">How Can We Help?</p>
                  </div>

                  {/* Articles */}
                  <div className="flex flex-col gap-y-3 mt-5">
                    <div className="flex flex-col gap-y-3 gap-x-3 lg:flex-row lg:items-center">
                      <div className="p-4 shadow-sm w-full xl:w-[50%] bg-white allRoundBoxShadow rounded-lg">
                        <BiSolidBadgeCheck
                          size={24}
                          className="text-green-400"
                        />
                        <div className="flex flex-col gap-y-1">
                          <p className="font-semibold text-sm">
                            Account Verification
                          </p>
                          <Link
                            to="/"
                            className="flex items-center gap-x-1 transition-all hover:text-shuttlelaneGold visited:text-shuttlelaneBlack text-shuttlelaneBlack hover:no-underline visited:no-underline"
                          >
                            <span className="text-xs">Learn More</span>
                            <BsArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                      <div className="p-4 shadow-sm w-full xl:w-[50%] bg-white allRoundBoxShadow rounded-lg">
                        <BiSolidBadgeCheck
                          size={24}
                          className="text-green-400"
                        />
                        <div className="flex flex-col gap-y-1">
                          <p className="font-semibold text-sm">
                            Account Verification
                          </p>
                          <Link
                            to="/"
                            className="flex items-center gap-x-1 transition-all hover:text-shuttlelaneGold visited:text-shuttlelaneBlack text-shuttlelaneBlack hover:no-underline visited:no-underline"
                          >
                            <span className="text-xs">Learn More</span>
                            <BsArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-y-3 gap-x-3 lg:flex-row lg:items-center">
                      <div className="p-4 shadow-sm w-full xl:w-[50%] bg-white allRoundBoxShadow rounded-lg">
                        <BiSolidBadgeCheck
                          size={24}
                          className="text-green-400"
                        />
                        <div className="flex flex-col gap-y-1">
                          <p className="font-semibold text-sm">
                            Account Verification
                          </p>
                          <Link
                            to="/"
                            className="flex items-center gap-x-1 transition-all hover:text-shuttlelaneGold visited:text-shuttlelaneBlack text-shuttlelaneBlack hover:no-underline visited:no-underline"
                          >
                            <span className="text-xs">Learn More</span>
                            <BsArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                      <div className="p-4 shadow-sm w-full xl:w-[50%] bg-white allRoundBoxShadow rounded-lg">
                        <BiSolidBadgeCheck
                          size={24}
                          className="text-green-400"
                        />
                        <div className="flex flex-col gap-y-1">
                          <p className="font-semibold text-sm">
                            Account Verification
                          </p>
                          <Link
                            to="/"
                            className="flex items-center gap-x-1 transition-all hover:text-shuttlelaneGold visited:text-shuttlelaneBlack text-shuttlelaneBlack hover:no-underline visited:no-underline"
                          >
                            <span className="text-xs">Learn More</span>
                            <BsArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 w-full rounded-lg border-[.3px] p-4 border-gray-100 h-auto">
                  <div className="flex items-center gap-x-1">
                    <HiOutlineSupport size={20} />
                    <p className="font-semibold text-lg">Contact and Support</p>
                  </div>

                  {/* Articles */}
                  <div className="flex flex-col gap-y-5 mt-5">
                    <Link
                      to="/"
                      className="flex items-center gap-x-1 transition-all hover:text-shuttlelaneGold visited:text-shuttlelaneBlack text-shuttlelaneBlack hover:no-underline visited:no-underline"
                    >
                      <div className="w-full flex flex-row justify-between items-center bg-white pb-3 border-b-[.3px] border-b-gray-300">
                        <div className="flex flex-row gap-x-2 items-center">
                          <BiKey size={32} className="" />
                          <div className="flex flex-col gap-y-1">
                            <p className="font-medium text-sm">
                              Find lost item
                            </p>
                            <span className="text-xs">
                              We can help you get in touch with the passenger
                            </span>
                          </div>
                        </div>
                        <BsArrowRight size={14} />
                      </div>
                    </Link>
                    <Link
                      to="/"
                      className="flex items-center gap-x-1 transition-all hover:text-shuttlelaneGold visited:text-shuttlelaneBlack text-shuttlelaneBlack hover:no-underline visited:no-underline"
                    >
                      <div className="w-full flex flex-row justify-between items-center bg-white pb-3 border-b-[.3px] border-b-gray-300">
                        <div className="flex flex-row gap-x-2 items-center">
                          <BiSupport size={24} className="" />
                          <div className="flex flex-col gap-y-1">
                            <p className="font-medium text-sm">
                              Report safety issue
                            </p>
                            <span className="text-xs">
                              Let us know if you have a safety related issue
                            </span>
                          </div>
                        </div>
                        <BsArrowRight size={14} />
                      </div>
                    </Link>
                    <Link
                      to="/"
                      className="flex items-center gap-x-1 transition-all hover:text-shuttlelaneGold visited:text-shuttlelaneBlack text-shuttlelaneBlack hover:no-underline visited:no-underline"
                    >
                      <div className="w-full flex flex-row justify-between items-center bg-white pb-3 border-b-[.3px] border-b-gray-300">
                        <div className="flex flex-row gap-x-2 items-center">
                          <PiChat size={24} className="" />
                          <div className="flex flex-col gap-y-1">
                            <p className="font-medium text-sm">
                              Give user feedback
                            </p>
                            <span className="text-xs">
                              For issues that are not safety related
                            </span>
                          </div>
                        </div>
                        <BsArrowRight size={14} />
                      </div>
                    </Link>
                    <Link
                      to="/"
                      className="flex items-center gap-x-1 transition-all hover:text-shuttlelaneGold visited:text-shuttlelaneBlack text-shuttlelaneBlack hover:no-underline visited:no-underline"
                    >
                      <div className="w-full flex flex-row justify-between items-center bg-white pb-3 border-b-[.3px] border-b-gray-300">
                        <div className="flex flex-row gap-x-2 items-center">
                          <MdOutlineSupport size={24} className="" />
                          <div className="flex flex-col gap-y-1">
                            <p className="font-medium text-sm">Get trip help</p>
                            <span className="text-xs">
                              Need help for something else? Find it here
                            </span>
                          </div>
                        </div>
                        <BsArrowRight size={14} />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverDashboardBookingPage;
