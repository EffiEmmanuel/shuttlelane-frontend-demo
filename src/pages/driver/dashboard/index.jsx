import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPassport, FaUser } from "react-icons/fa";
import {
  MdArrowRight,
  MdHourglassFull,
  MdLuggage,
  MdOutlineFlightTakeoff,
  MdOutlineHourglassTop,
} from "react-icons/md";
import { BsArrowRight } from "react-icons/bs";
import AdminDashboardNavbar from "../../../components/ui/Admin/AdminDashboardNavbar";
import { HiOutlineExternalLink } from "react-icons/hi";
import Chart from "react-apexcharts";
import { BiSearch, BiSolidBadgeCheck } from "react-icons/bi";
import AdminTopBar from "../../../components/ui/Admin/AdminTopBar";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import Preloader from "../../../components/ui/Preloader";
import AdminDashboardHomeSkeleton from "../../../components/ui/Admin/Skeletons/DashboardHomeSkeleton";
import AdminDashboardStatistics from "../../../components/ui/Admin/Dashboard/Statistics";
import { fetchStatistics } from "../../../redux/slices/adminSlice";
import DriverDashboardNavbar from "../../../components/ui/Driver/DriverDashboardNavbar";
import DriverTopBar from "../../../components/ui/Driver/DriverTopBar";

// Images
import driverHomeGraphics from "../../../assets/images/driver/driver_home_graphics.svg";
import congratsAsset from "../../../assets/images/driver/congrats.svg";
import { IoSearchCircleOutline, IoSearchOutline } from "react-icons/io5";
import { ImSearch } from "react-icons/im";
import { RiSearch2Line } from "react-icons/ri";
import { fetchAssignedJobs } from "../../../redux/slices/driverSlice";

function DriverDashboardHomePage() {
  const { isLoading, token, driver, upcomingBookings, assignedBookings } =
    useSelector((store) => store.driver);

  const dispatch = useDispatch();

  // Mobile navbar handler
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAssignedJobs({ token, driverId: driver?._id }));
  }, [token]);

  return (
    <div className="">
      {!driver?.isAccountApproved ? (
        <div className="w-full min-h-screen bg-white flex justify-center lg:px-24 px-7">
          <div className="mt-16 flex flex-col items-center gap-y-2 lg:max-w-xl w-full">
            <RiSearch2Line size={40} className="text-shuttlelaneGold" />
            <div className="flex flex-col gap-y-1 text-center">
              <h3>Your account is still under review</h3>
              <small>
                Our team is currently reviewing your account details and will
                provide a response within 72 hours of your application. You will
                be notified via email on the decision made by the team. Thank
                you for choosing Shuttlelane.
              </small>

              <Link to="/" className="text-xs">
                Go back to Homepage
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="">
          {/* Navbar here */}
          <DriverDashboardNavbar
            link="home"
            isNavbarOpen={isNavbarOpen}
            setIsNavbarOpen={setIsNavbarOpen}
          />
          {/* Main content goes here */}
          <div className="w-full min-h-screen lg:pl-[6%] bg-[#fff] text-shuttlelaneBlack">
            <div className="px-7 py-5 relative z-0">
              {/* Top bar */}
              <DriverTopBar
                isNavbarOpen={isNavbarOpen}
                setIsNavbarOpen={setIsNavbarOpen}
              />

              {isLoading ? (
                <AdminDashboardHomeSkeleton />
              ) : (
                <div className="mt-24 pt-2">
                  <div className="flex xl:flex-row flex-col gap-y-5 gap-x-5">
                    {/* Booking Summary - Total number of bookings */}
                    <div className="xl:w-[70%] w-full">
                      {/* <AdminDashboardStatistics /> */}

                      <div className="w-full items-center justify-center">
                        <img
                          src={driverHomeGraphics}
                          alt=""
                          className="w-full object-contain"
                        />
                      </div>

                      {/* Assigned Jobs */}
                      <div className="mt-11 w-full">
                        <p className="font-medium">
                          Assigned Jobs ({assignedBookings?.length})
                        </p>
                        <div className="flex flex-col gap-y-3 mt-5">
                          {assignedBookings?.map(booking => (

                          <div className="flex h-28 p-3 justify-between items-center allRoundBoxShadow bg-white rounded-lg w-full">
                            <div className="flex flex-row items-center gap-x-1">
                              <img
                                src={congratsAsset}
                                alt=""
                                className="object-contain"
                              />

                              <div className="flex flex-col">
                                <p className="font-semibold">New Job Alert!</p>
                                <small className="max-w-sm">
                                  Hello {driver?.firstName}, you have been assigned to a
                                  new booking with pickup location at {booking?.booking?.pickupAddress}
                                </small>
                              </div>
                            </div>

                            {/* CTA */}
                            <div className="">
                              <button
                                type="button"
                                className="bg-shuttlelaneBlack rounded-full h-10 w-10 flex items-center justify-center"
                              >
                                <BsArrowRight
                                  size={18}
                                  className="text-white"
                                />
                              </button>
                            </div>
                          </div>
                          ))}
                          <div className="flex h-28 p-3 justify-between items-center allRoundBoxShadow bg-white rounded-lg w-full">
                            <div className="flex flex-row items-center gap-x-1">
                              <img
                                src={congratsAsset}
                                alt=""
                                className="object-contain"
                              />

                              <div className="flex flex-col">
                                <p className="font-semibold">New Job Alert!</p>
                                <small className="max-w-sm">
                                  Hello Emmanuel, you have been assigned to a
                                  new booking with pickup location at Sheraton
                                  Hotels, Victoria Island
                                </small>
                              </div>
                            </div>

                            {/* CTA */}
                            <div className="">
                              <button
                                type="button"
                                className="bg-shuttlelaneBlack rounded-full h-10 w-10 flex items-center justify-center"
                              >
                                <BsArrowRight
                                  size={18}
                                  className="text-white"
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Recent Bookings */}
                      <div className="mt-11 w-full">
                        <div className="w-full rounded-lg border-[.3px] p-3 border-gray-100 h-auto">
                          <div className="flex items-baseline justify-between">
                            <div className="flex items-center gap-x-2">
                              <p className="font-medium">
                                Recent Bookings - {upcomingBookings?.length}
                              </p>
                              <div className="h-2 w-2 rounded-full bg-shuttlelaneGold"></div>
                            </div>
                            <p className="text-xs underline offset-7">
                              See All
                            </p>
                          </div>

                          <div className="overflow-x-scroll shuttlelaneScrollbarHoriz shuttlelaneScrollbar">
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

                            {upcomingBookings?.map((booking) => (
                              <div className="flex justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                                <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                                  {booking?.user?.firstName ??
                                    booking?.firstName}{" "}
                                  {booking?.user?.firstName ??
                                    booking?.firstName}
                                </p>
                                <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                                  {booking?.pickupDate}
                                </p>
                                <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                                  {booking?.bookingType}
                                </p>

                                <div className="min-w-[200px] w-[200px] lg:w-[20%] flex items-center gap-x-1">
                                  <div
                                    className={`h-2 w-2 ${
                                      booking?.paymentId?.status === "Failed"
                                        ? "bg-red-500"
                                        : booking?.paymentId?.status ===
                                          "Pending"
                                        ? "bg-yellow-500"
                                        : "bg-green-500"
                                    } rounded-full`}
                                  ></div>
                                  <span
                                    className={`text-xs ${
                                      booking?.paymentId?.status === "Failed"
                                        ? "tet-red-500"
                                        : booking?.paymentId?.status ===
                                          "Pending"
                                        ? "tet-yellow-500"
                                        : "tet-green-500"
                                    }`}
                                  >
                                    {booking?.paymentId?.status === "Failed"
                                      ? "Failed"
                                      : booking?.paymentId?.status === "Pending"
                                      ? "Pending"
                                      : "Successful"}
                                  </span>
                                </div>

                                <div className="min-w-[200px] w-[200px] lg:w-[20%] flex items-center gap-x-3">
                                  <button
                                    onClick={() => {}}
                                    className="h-7 w-28 p-2 text-white bg-shuttlelaneGold rounded-lg text-xs"
                                  >
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

                            {upcomingBookings?.length < 1 && (
                              <div className="flex justify-center items-center h-full w-full mb-2 pb-2 text-shuttlelaneBlack mt-4">
                                <p className="w-full text-xs text-center">
                                  No data to show for now...
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="xl:w-[30%] w-full">
                      {/* Users */}
                      <div className="w-full">
                        <div className="w-full rounded-lg border-[.3px] p-4 border-gray-100 h-auto">
                          <div className="flex items-center gap-x-2">
                            <p className="font-semibold text-lg">
                              How Can We Help?
                            </p>
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
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DriverDashboardHomePage;
