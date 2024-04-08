import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCheck, FaPassport, FaUser } from "react-icons/fa";
import {
  MdAirplanemodeActive,
  MdLocationPin,
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
import {
  acceptBooking,
  declineBooking,
  endBooking,
  fetchBookingByReference,
  fetchCompletedJobs,
  startBooking,
} from "../../../../redux/slices/vendorSlice";
import GoogleMapsWithDirections from "../../../../components/ui/GoogleMapsWithDirection";
import moment from "moment";
import Modal from "react-modal";
import { FaXmark } from "react-icons/fa6";
import SwipeButton from "../../../../components/ui/SwipeButton";
import { ImSpinner2 } from "react-icons/im";
import VendorDashboardNavbar from "../../../../components/ui/Vendor/VendorDashboardNavbar";
import VendorTopBar from "../../../../components/ui/Vendor/VendorTopBar";
import { Helmet } from "react-helmet";

function VendorDashboardBookingPage() {
  // Redux setup
  const {
    isLoading,
    token,
    vendor,
    completedBookings,
    bookingFetchedByReference,
    isGetBookingByReferenceLoading,
  } = useSelector((store) => store.vendor);
  const dispatch = useDispatch();

  // Mobile navbar handler
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCompletedJobs({ token, vendorId: vendor?._id }));
  }, [token]);

  // Modal functionalities
  const [
    isAssignedBookingDetailsModalOpen,
    setIsAssignedBookingDetailsModalOpen,
  ] = useState(false);
  const [currentBooking, setCurrentBooking] = useState();

  // Fetch clicked booking (Booking opened in the modal)
  useEffect(() => {
    if (currentBooking)
      dispatch(fetchBookingByReference(currentBooking?.bookingReference));
  }, [currentBooking]);

  // FUNCTION: Handles accepting a booking
  async function handleAcceptBooking() {
    dispatch(
      acceptBooking({
        token,
        vendorId: vendor?._id,
        bookingId: bookingFetchedByReference?._id ?? currentBooking?._id,
      })
    );
    setIsAssignedBookingDetailsModalOpen(false);
  }

  // FUNCTION: Handles accepting a booking
  async function handleDeclineBooking() {
    dispatch(
      declineBooking({
        token,
        vendorId: vendor?._id,
        bookingId: bookingFetchedByReference?._id ?? currentBooking?._id,
      })
    );
    setIsAssignedBookingDetailsModalOpen(false);
  }

  // FUNCTION: Handles starting a booking
  async function handleStartBooking() {
    dispatch(
      startBooking({
        token,
        vendorId: vendor?._id,
        bookingId: bookingFetchedByReference?._id ?? currentBooking?._id,
      })
    );

    setTimeout(() => {
      setIsAssignedBookingDetailsModalOpen(false);
    }, 1500);
  }

  // FUNCTION: Handles ending a booking
  async function handleEndBooking() {
    dispatch(
      endBooking({
        token,
        vendorId: vendor?._id,
        bookingId: bookingFetchedByReference?._id ?? currentBooking?._id,
      })
    );

    setTimeout(() => {
      setIsAssignedBookingDetailsModalOpen(false);
    }, 1500);
  }

  return (
    <div className="">
      <Helmet>
        <title>Completed Bookings - Shuttlelane Portal Vendor Dashboard</title>
      </Helmet>

      {/* Assigned Booking Details Modal */}
      <Modal
        isOpen={isAssignedBookingDetailsModalOpen}
        onRequestClose={() => setIsAssignedBookingDetailsModalOpen(false)}
        className="flex h-full min-h-screen justify-center items-center lg:px-40 px-7"
      >
        {!isGetBookingByReferenceLoading && (
          <div className="bg-white pb-10 shadow-lg rounded-lg text-shuttlelaneBlack w-full min-h-[80%] max-h-[80%] h-[80%] lg:w-[60%] p-7 px-10 overflow-y-scroll shuttlelaneScrollbar">
            <div className="flex items-center justify-end">
              <FaXmark
                size={20}
                onClick={() => setIsAssignedBookingDetailsModalOpen(false)}
                className="cursor-pointer"
              />
            </div>

            <div className="h-full flex flex-col gap-y-5 pb-20">
              <>
                {bookingFetchedByReference?.bookingType === "Airport" && (
                  <div className="flex items-center justify-center w-full pb-20">
                    <div className="w-full mt-10 lg:p-10 p-7 border-[1px] border-shuttlelanePurple border-dashed">
                      <h2 className="text-2xl font-semibold">Trip Details</h2>
                      <span className="text-sm text-slate-400">
                        Airport Transfer Booking
                      </span>
                      <div className="flex items-center gap-x-1">
                        <span className="text-sm">
                          {bookingFetchedByReference?.booking?.passengers}{" "}
                          passengers
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span className="text-sm">
                          {moment(
                            bookingFetchedByReference?.booking?.pickupDate
                          ).format("MMM DD, YYYY")}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span className="text-sm">
                          {moment(
                            bookingFetchedByReference?.booking?.pickupTime
                          ).format("H:MM A")}
                        </span>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <span className="text-sm">
                          ₦
                          {Intl.NumberFormat("en-US", {}).format(
                            bookingFetchedByReference?.bookingRate
                          )}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span
                          className={`text-sm ${
                            !bookingFetchedByReference?.paymentId?.paymentStatus
                              ? "text-yellow-500"
                              : bookingFetchedByReference?.paymentId
                                  ?.paymentStatus == "Successful"
                              ? "text-green-500"
                              : bookingFetchedByReference?.paymentId
                                  ?.paymentStatus == "Pending"
                              ? "text-yellow-500"
                              : "text-red-500"
                          }`}
                        >
                          Payment{" "}
                          {bookingFetchedByReference?.paymentId
                            ?.paymentStatus ?? "Pending"}
                        </span>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <span className="text-sm">
                          {
                            bookingFetchedByReference?.booking?.vehicleClass
                              ?.className
                          }
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span
                          className={`text-sm ${
                            bookingFetchedByReference?.bookingStatus ==
                              "Completed" ||
                            bookingFetchedByReference?.bookingStatus ==
                              "Ongoing" ||
                            bookingFetchedByReference?.bookingStatus ==
                              "Scheduled"
                              ? "text-green-500"
                              : bookingFetchedByReference?.bookingStatus ==
                                  "Awaiting response" ||
                                bookingFetchedByReference?.bookingStatus ==
                                  "Not yet assigned"
                              ? "text-yellow-500"
                              : "text-red-500"
                          }`}
                        >
                          {bookingFetchedByReference?.bookingStatus}
                        </span>
                      </div>
                      <div className="flex flex-col mt-4 gap-y-1">
                        <div className="flex items-center gap-x-1">
                          <div className="ml-1 h-4 w-4 border-[.5px] border-shuttlelaneBlack rounded-full"></div>
                          <span className="text-sm">
                            {bookingFetchedByReference?.booking?.pickupAddress}
                          </span>
                        </div>
                        <div className="border-r-[1px] border-r-shuttlelanePurple h-5 w-3 border-dashed"></div>
                        <div className="flex items-center gap-x-1">
                          <MdLocationPin size={24} className="text-green-500" />
                          <span className="text-sm">
                            {bookingFetchedByReference?.booking?.dropoffAddress}
                          </span>
                        </div>
                      </div>

                      {/* Passenger Details */}
                      <div className="mt-5">
                        <h2 className="text-xl font-semibold">
                          Passenger Details
                        </h2>

                        <div className="flex flex-col gap-y-1">
                          <span className="text-sm font-semibold">
                            Full Name:{" "}
                            <span className="text-sm font-normal">
                              {bookingFetchedByReference?.user?.firstName ??
                                bookingFetchedByReference?.firstName}{" "}
                              {bookingFetchedByReference?.user?.lastName ??
                                bookingFetchedByReference?.lastName}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Phone Number:{" "}
                            <span className="text-sm font-normal">
                              {bookingFetchedByReference?.user?.mobile ??
                                bookingFetchedByReference?.mobile}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Email Address:{" "}
                            <span className="text-sm font-normal">
                              {bookingFetchedByReference?.user?.email ??
                                bookingFetchedByReference?.email}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Airline:{" "}
                            <span className="text-sm font-normal">
                              {bookingFetchedByReference?.booking?.airline}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Flight Number:{" "}
                            <span className="text-sm font-normal">
                              {bookingFetchedByReference?.booking?.flightNumber}
                            </span>{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {bookingFetchedByReference?.bookingType === "Car" && (
                  <div className="flex items-center justify-center w-full pb-20">
                    <div className="w-full mt-10 lg:p-10 p-7 border-[1px] border-shuttlelanePurple border-dashed">
                      <h2 className="text-2xl font-semibold">Trip Details</h2>
                      <span className="text-sm text-slate-400">
                        Car Rental Booking
                      </span>
                      <div className="flex items-center gap-x-1">
                        <span className="text-sm">
                          {bookingFetchedByReference?.booking?.days} days
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span className="text-sm">
                          {moment(
                            bookingFetchedByReference?.booking?.pickupDate
                          ).format("MMM DD, YYYY")}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span className="text-sm">
                          {moment(
                            bookingFetchedByReference?.booking?.pickupTime
                          ).format("H:MM A")}
                        </span>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <span className="text-sm">
                          {bookingFetchedByReference?.bookingCurrency?.symbol}
                          {Intl.NumberFormat("en-US", {}).format(
                            bookingFetchedByReference?.bookingTotal
                          )}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span
                          className={`text-sm ${
                            !bookingFetchedByReference?.paymentId?.paymentStatus
                              ? "text-yellow-500"
                              : bookingFetchedByReference?.paymentId
                                  ?.paymentStatus == "Successful"
                              ? "text-green-500"
                              : bookingFetchedByReference?.paymentId
                                  ?.paymentStatus == "Pending"
                              ? "text-yellow-500"
                              : "text-red-500"
                          }`}
                        >
                          Payment{" "}
                          {bookingFetchedByReference?.paymentId
                            ?.paymentStatus ?? "Pending"}
                        </span>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <span className="text-sm">
                          {bookingFetchedByReference?.booking?.car?.name}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span
                          className={`text-sm ${
                            bookingFetchedByReference?.bookingStatus ==
                              "Completed" ||
                            bookingFetchedByReference?.bookingStatus ==
                              "Ongoing" ||
                            bookingFetchedByReference?.bookingStatus ==
                              "Scheduled"
                              ? "text-green-500"
                              : bookingFetchedByReference?.bookingStatus ==
                                  "Awaiting response" ||
                                bookingFetchedByReference?.bookingStatus ==
                                  "Not yet assigned"
                              ? "text-yellow-500"
                              : "text-red-500"
                          }`}
                        >
                          {bookingFetchedByReference?.bookingStatus}
                        </span>
                      </div>
                      <div className="flex flex-col mt-4 gap-y-1">
                        <div className="flex items-center gap-x-1">
                          <MdLocationPin size={24} className="text-green-500" />
                          <span className="text-sm">
                            {bookingFetchedByReference?.booking?.pickupAddress}
                          </span>
                        </div>
                      </div>

                      {/* Passenger Details */}
                      <div className="mt-5">
                        <h2 className="text-xl font-semibold">
                          Passenger Details
                        </h2>

                        <div className="flex flex-col gap-y-1">
                          <span className="text-sm font-semibold">
                            Full Name:{" "}
                            <span className="text-sm font-normal">
                              {bookingFetchedByReference?.user?.firstName ??
                                bookingFetchedByReference?.firstName}{" "}
                              {bookingFetchedByReference?.user?.lastName ??
                                bookingFetchedByReference?.lastName}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Phone Number:{" "}
                            <span className="text-sm font-normal">
                              {bookingFetchedByReference?.user?.mobile ??
                                bookingFetchedByReference?.mobile}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Email Address:{" "}
                            <span className="text-sm font-normal">
                              {bookingFetchedByReference?.user?.email ??
                                bookingFetchedByReference?.email}
                            </span>{" "}
                          </span>
                        </div>
                      </div>

                      {/* Driver Details */}
                      <div className="mt-5">
                        <h2 className="text-xl font-semibold">
                          Driver Details
                        </h2>

                        {bookingFetchedByReference?.assignedDriver ? (
                          <div className="flex flex-col gap-y-1">
                            <div className="flex items-center gap-x-2">
                              <div className="h-16 w-16 rounded-full overflow-hidden">
                                <img
                                  src={
                                    bookingFetchedByReference?.assignedDriver
                                      ?.image
                                  }
                                  alt={`${bookingFetchedByReference?.assignedDriver?.firstName} ${bookingFetchedByReference?.assignedDriver?.lastName}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              <div className="flex flex-col">
                                <span className="text-sm font-semibold">
                                  Full Name:{" "}
                                  <span className="text-sm font-normal">
                                    {
                                      bookingFetchedByReference?.assignedDriver
                                        ?.firstName
                                    }{" "}
                                    $
                                    {
                                      bookingFetchedByReference?.assignedDriver
                                        ?.lastName
                                    }
                                  </span>{" "}
                                </span>
                                <span className="text-sm font-semibold">
                                  Email Address:{" "}
                                  <span className="text-sm font-normal">
                                    {
                                      bookingFetchedByReference?.assignedDriver
                                        ?.email
                                    }
                                  </span>{" "}
                                </span>
                                <span className="text-sm font-semibold">
                                  Phone Number:{" "}
                                  <span className="text-sm font-normal">
                                    {
                                      bookingFetchedByReference?.assignedDriver
                                        ?.mobile
                                    }
                                  </span>{" "}
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full">
                            <i>
                              A vendor has not yet been assigned to this booking
                            </i>
                          </div>
                        )}
                      </div>
                    </div>
                    {isLoading && (
                      <ImSpinner2
                        size={24}
                        className="text-shuttlelanePurple animate-spin"
                      />
                    )}
                    {/* {!bookingFetchedByReference && (
            <div className="w-full flex flex-col items-center justify-center">
              <img
                src={emptyImage}
                className="max-w-lg object-contain"
                alt="Sorry, there are no blog posts for now."
              />
              <p className="text-sm">Sorry, there are no blog posts for now.</p>
            </div>
          )} */}
                  </div>
                )}
                {bookingFetchedByReference?.bookingType === "Priority" && (
                  <div className="flex items-center justify-center w-full pb-20">
                    <div className="w-full mt-10 lg:p-10 p-7 border-[1px] border-shuttlelanePurple border-dashed">
                      <h2 className="text-2xl font-semibold">Trip Details</h2>
                      <span className="text-sm text-slate-400">
                        Priority Pass Booking
                      </span>
                      <div className="flex items-center gap-x-1">
                        <span className="text-sm">
                          {bookingFetchedByReference?.booking?.passengers}{" "}
                          passengers
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span className="text-sm">
                          {moment(
                            bookingFetchedByReference?.booking?.pickupDate
                          ).format("MMM DD, YYYY")}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span className="text-sm">
                          {moment(
                            bookingFetchedByReference?.booking?.pickupTime
                          ).format("H:MM A")}
                        </span>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <span className="text-sm">
                          {bookingFetchedByReference?.booking?.pass?.name}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span className="text-sm">
                          {bookingFetchedByReference?.bookingCurrency?.symbol}
                          {Intl.NumberFormat("en-US", {}).format(
                            bookingFetchedByReference?.bookingTotal
                          )}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span
                          className={`text-sm ${
                            !bookingFetchedByReference?.paymentId?.paymentStatus
                              ? "text-yellow-500"
                              : bookingFetchedByReference?.paymentId
                                  ?.paymentStatus == "Successful"
                              ? "text-green-500"
                              : bookingFetchedByReference?.paymentId
                                  ?.paymentStatus == "Pending"
                              ? "text-yellow-500"
                              : "text-red-500"
                          }`}
                        >
                          Payment{" "}
                          {bookingFetchedByReference?.paymentId
                            ?.paymentStatus ?? "Pending"}
                        </span>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <span className="text-sm">
                          {bookingFetchedByReference?.booking?.service}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span
                          className={`text-sm ${
                            bookingFetchedByReference?.bookingStatus ==
                              "Completed" ||
                            bookingFetchedByReference?.bookingStatus ==
                              "Ongoing" ||
                            bookingFetchedByReference?.bookingStatus ==
                              "Scheduled"
                              ? "text-green-500"
                              : bookingFetchedByReference?.bookingStatus ==
                                  "Awaiting response" ||
                                bookingFetchedByReference?.bookingStatus ==
                                  "Not yet assigned"
                              ? "text-yellow-500"
                              : "text-red-500"
                          }`}
                        >
                          {bookingFetchedByReference?.bookingStatus}
                        </span>
                      </div>
                      <div className="flex flex-col mt-4 gap-y-1">
                        <div className="flex items-center gap-x-1">
                          <MdLocationPin size={24} className="text-green-500" />
                          <span className="text-sm">
                            {bookingFetchedByReference?.booking?.pickupAddress}
                          </span>
                        </div>
                      </div>

                      {/* Passenger Details */}
                      <div className="mt-5">
                        <h2 className="text-xl font-semibold">
                          Passenger Details
                        </h2>

                        <div className="flex flex-col gap-y-1">
                          <span className="text-sm font-semibold">
                            Full Name:{" "}
                            <span className="text-sm font-normal">
                              {bookingFetchedByReference?.user?.firstName ??
                                bookingFetchedByReference?.firstName}{" "}
                              {bookingFetchedByReference?.user?.lastName ??
                                bookingFetchedByReference?.lastName}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Phone Number:{" "}
                            <span className="text-sm font-normal">
                              {bookingFetchedByReference?.user?.mobile ??
                                bookingFetchedByReference?.mobile}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Email Address:{" "}
                            <span className="text-sm font-normal">
                              {bookingFetchedByReference?.user?.email ??
                                bookingFetchedByReference?.email}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Airline:{" "}
                            <span className="text-sm font-normal">
                              {bookingFetchedByReference?.booking?.airline}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Flight Number:{" "}
                            <span className="text-sm font-normal">
                              {bookingFetchedByReference?.booking?.flightNumber}
                            </span>{" "}
                          </span>
                        </div>
                      </div>

                      {/* Driver Details */}
                      <div className="mt-5">
                        <h2 className="text-xl font-semibold">
                          Driver Details
                        </h2>

                        {bookingFetchedByReference?.assignedDriver ? (
                          <div className="flex flex-col gap-y-1">
                            <div className="flex items-center gap-x-2">
                              <div className="h-16 w-16 rounded-full overflow-hidden">
                                <img
                                  src={
                                    bookingFetchedByReference?.assignedDriver
                                      ?.image
                                  }
                                  alt={`${bookingFetchedByReference?.assignedDriver?.firstName} ${bookingFetchedByReference?.assignedDriver?.lastName}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              <div className="flex flex-col">
                                <span className="text-sm font-semibold">
                                  Full Name:{" "}
                                  <span className="text-sm font-normal">
                                    {
                                      bookingFetchedByReference?.assignedDriver
                                        ?.firstName
                                    }{" "}
                                    $
                                    {
                                      bookingFetchedByReference?.assignedDriver
                                        ?.lastName
                                    }
                                  </span>{" "}
                                </span>
                                <span className="text-sm font-semibold">
                                  Email Address:{" "}
                                  <span className="text-sm font-normal">
                                    {
                                      bookingFetchedByReference?.assignedDriver
                                        ?.email
                                    }
                                  </span>{" "}
                                </span>
                                <span className="text-sm font-semibold">
                                  Phone Number:{" "}
                                  <span className="text-sm font-normal">
                                    {
                                      bookingFetchedByReference?.assignedDriver
                                        ?.mobile
                                    }
                                  </span>{" "}
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full">
                            <i>
                              A vendor has not yet been assigned to this booking
                            </i>
                          </div>
                        )}
                      </div>

                      {/* Car Details */}
                      <div className="mt-5">
                        <h2 className="text-xl font-semibold">Car Details</h2>
                        {bookingFetchedByReference?.assignedDriver ? (
                          <div className="flex flex-col gap-y-1">
                            <span className="text-sm font-semibold">
                              Type:{" "}
                              <span className="text-sm font-normal">
                                {
                                  bookingFetchedByReference?.assignedDriver
                                    ?.carType
                                }
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Name:{" "}
                              <span className="text-sm font-normal">
                                {
                                  bookingFetchedByReference?.assignedDriver
                                    ?.carName
                                }
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Model:{" "}
                              <span className="text-sm font-normal">
                                {
                                  bookingFetchedByReference?.assignedDriver
                                    ?.carModel
                                }
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Year:{" "}
                              <span className="text-sm font-normal">
                                {
                                  bookingFetchedByReference?.assignedDriver
                                    ?.carYear
                                }
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Plate Number:{" "}
                              <span className="text-sm font-normal">
                                {
                                  bookingFetchedByReference?.assignedDriver
                                    ?.carPlateNumber
                                }
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Color:{" "}
                              <span className="text-sm font-normal">
                                {
                                  bookingFetchedByReference?.assignedDriver
                                    ?.carColor
                                }
                              </span>{" "}
                            </span>
                          </div>
                        ) : (
                          <div className="w-full">
                            <i>
                              A car has not yet been assigned to this booking
                            </i>
                          </div>
                        )}
                      </div>
                    </div>
                    {isLoading && (
                      <ImSpinner2
                        size={24}
                        className="text-shuttlelanePurple animate-spin"
                      />
                    )}
                    {/* {!bookingFetchedByReference && (
            <div className="w-full flex flex-col items-center justify-center">
              <img
                src={emptyImage}
                className="max-w-lg object-contain"
                alt="Sorry, there are no blog posts for now."
              />
              <p className="text-sm">Sorry, there are no blog posts for now.</p>
            </div>
          )} */}
                  </div>
                )}
                {bookingFetchedByReference?.bookingType === "Visa" && (
                  <div className="flex items-center justify-center w-full pb-20">
                    <div className="w-full mt-10 lg:p-10 p-7 border-[1px] border-shuttlelanePurple border-dashed">
                      <h2 className="text-2xl font-semibold">Trip Details</h2>
                      <span className="text-sm text-slate-400">
                        Visa On Arrival Booking
                      </span>
                      <div className="flex items-center gap-x-1">
                        <span className="text-sm">
                          {bookingFetchedByReference?.booking?.airline}{" "}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span className="text-sm">
                          {moment(
                            bookingFetchedByReference?.booking?.departureDate
                          ).format("MMM DD, YYYY")}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span className="text-sm">
                          {moment(
                            bookingFetchedByReference?.booking?.arrivalDate
                          ).format("MMM DD, YYYY")}
                        </span>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <span className="text-sm">
                          {bookingFetchedByReference?.booking?.bookingReference}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span className="text-sm">
                          $
                          {Intl.NumberFormat("en-US", {}).format(
                            bookingFetchedByReference?.bookingTotal
                          )}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span
                          className={`text-sm ${
                            !bookingFetchedByReference?.paymentId?.paymentStatus
                              ? "text-yellow-500"
                              : bookingFetchedByReference?.paymentId
                                  ?.paymentStatus == "Successful"
                              ? "text-green-500"
                              : bookingFetchedByReference?.paymentId
                                  ?.paymentStatus == "Pending"
                              ? "text-yellow-500"
                              : "text-red-500"
                          }`}
                        >
                          Payment{" "}
                          {bookingFetchedByReference?.paymentId
                            ?.paymentStatus ?? "Pending"}
                        </span>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <span className="text-sm">
                          {bookingFetchedByReference?.booking?.flightNumber}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span
                          className={`text-sm ${
                            bookingFetchedByReference?.bookingStatus ==
                              "Completed" ||
                            bookingFetchedByReference?.bookingStatus ==
                              "Ongoing" ||
                            bookingFetchedByReference?.bookingStatus ==
                              "Scheduled"
                              ? "text-green-500"
                              : bookingFetchedByReference?.bookingStatus ==
                                  "Awaiting response" ||
                                bookingFetchedByReference?.bookingStatus ==
                                  "Not yet assigned"
                              ? "text-yellow-500"
                              : "text-red-500"
                          }`}
                        >
                          {bookingFetchedByReference?.bookingStatus}
                        </span>
                      </div>
                      <div className="flex flex-col mt-4 gap-y-1">
                        <div className="flex items-center gap-x-1">
                          <div className="ml-1 h-4 w-4 border-[.5px] border-shuttlelaneBlack rounded-full"></div>
                          <span className="text-sm">
                            {
                              bookingFetchedByReference?.booking
                                ?.countryOfDeparture
                            }
                          </span>
                        </div>
                        <div className="border-r-[1px] border-r-shuttlelanePurple h-5 w-3 border-dashed"></div>

                        <div className="flex items-center gap-x-1">
                          <MdLocationPin size={24} className="text-green-500" />
                          <span className="text-sm">
                            {bookingFetchedByReference?.booking?.portOfEntry}
                          </span>
                        </div>
                      </div>

                      {/* General Information */}
                      <div className="mt-5">
                        <h2 className="text-xl font-semibold">
                          General Information
                        </h2>

                        <div className="flex flex-col gap-y-1">
                          <span className="text-sm font-semibold">
                            Nationality:{" "}
                            <span className="text-sm font-normal">
                              {bookingFetchedByReference?.booking?.nationality}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Class Of Visa:{" "}
                            <span className="text-sm font-normal">
                              {bookingFetchedByReference?.booking?.visaClass}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Passport Type:{" "}
                            <span className="text-sm font-normal">
                              {bookingFetchedByReference?.booking?.passportType}
                            </span>{" "}
                          </span>
                        </div>
                      </div>

                      {/* Biodata */}
                      <div className="mt-5">
                        <h2 className="text-xl font-semibold">Biodata</h2>

                        <div className="flex flex-col gap-y-1">
                          <span className="text-sm font-semibold">
                            Full Name:{" "}
                            <span className="text-sm font-normal">
                              {bookingFetchedByReference?.booking?.title}{" "}
                              {bookingFetchedByReference?.booking?.surname}{" "}
                              {bookingFetchedByReference?.booking?.middleName}{" "}
                              {bookingFetchedByReference?.booking?.firstName}{" "}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Email Address:{" "}
                            <span className="text-sm font-normal">
                              {bookingFetchedByReference?.booking?.email}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Date Of Birth:{" "}
                            <span className="text-sm font-normal">
                              {moment(
                                bookingFetchedByReference?.booking?.dateOfBirth
                              ).format("MMM DD, YYYY")}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Place Of Birth:{" "}
                            <span className="text-sm font-normal">
                              {bookingFetchedByReference?.booking?.placeOfBirth}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Gender:{" "}
                            <span className="text-sm font-normal">
                              {bookingFetchedByReference?.booking?.gender}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Marital Status:{" "}
                            <span className="text-sm font-normal">
                              {
                                bookingFetchedByReference?.booking
                                  ?.maritalStatus
                              }
                            </span>{" "}
                          </span>

                          <span className="text-sm font-semibold">
                            Passport Number:{" "}
                            <span className="text-sm font-normal">
                              {
                                bookingFetchedByReference?.booking
                                  ?.passportNumber
                              }
                            </span>{" "}
                          </span>

                          <span className="text-sm font-semibold">
                            Passport Expiry Date:{" "}
                            <span className="text-sm font-normal">
                              {moment(
                                bookingFetchedByReference?.booking
                                  ?.passportExpiryDate
                              ).format("MMM DD, YY")}
                            </span>{" "}
                          </span>
                        </div>
                      </div>

                      {/* Travel Information */}
                      <div className="mt-5">
                        <h2 className="text-xl font-semibold">
                          Travel Information
                        </h2>

                        <div className="flex flex-col gap-y-1">
                          <span className="text-sm font-semibold">
                            Purpose Of Journey:{" "}
                            <span className="text-sm font-normal">
                              {
                                bookingFetchedByReference?.booking
                                  ?.purposeOfJourney
                              }
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Airline:{" "}
                            <span className="text-sm font-normal">
                              {bookingFetchedByReference?.booking?.airline}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Flight Number:{" "}
                            <span className="text-sm font-normal">
                              {bookingFetchedByReference?.booking?.flightNumber}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Country Of Departure:{" "}
                            <span className="text-sm font-normal">
                              {
                                bookingFetchedByReference?.booking
                                  ?.countryOfDeparture
                              }
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Departure Date:{" "}
                            <span className="text-sm font-normal">
                              {moment(
                                bookingFetchedByReference?.booking
                                  ?.departureDate
                              ).format("MMM DD, YYYY")}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Arrival Date:{" "}
                            <span className="text-sm font-normal">
                              {moment(
                                bookingFetchedByReference?.booking?.arrivalDate
                              ).format("MMM DD, YYYY")}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Port Of Entry:{" "}
                            <span className="text-sm font-normal">
                              {bookingFetchedByReference?.booking?.portOfEntry}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Duration Of Stay:{" "}
                            <span className="text-sm font-normal">
                              {
                                bookingFetchedByReference?.booking
                                  ?.durationOfStay
                              }{" "}
                              days
                            </span>{" "}
                          </span>
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div className="mt-5">
                        <h2 className="text-xl font-semibold">
                          Contact Information
                        </h2>

                        <div className="flex flex-col gap-y-1">
                          <span className="text-sm font-semibold">
                            Name:{" "}
                            <span className="text-sm font-normal">
                              {bookingFetchedByReference?.booking?.contactName}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Phone Number:{" "}
                            <span className="text-sm font-normal">
                              {
                                bookingFetchedByReference?.booking
                                  ?.contactNumber
                              }
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Address:{" "}
                            <span className="text-sm font-normal">
                              {
                                bookingFetchedByReference?.booking
                                  ?.contactAddress
                              }
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            City:{" "}
                            <span className="text-sm font-normal">
                              {bookingFetchedByReference?.booking?.contactCity}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            State:{" "}
                            <span className="text-sm font-normal">
                              {bookingFetchedByReference?.booking?.contactState}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Email Address:{" "}
                            <span className="text-sm font-normal">
                              {bookingFetchedByReference?.booking?.contactEmail}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Postal Code:{" "}
                            <span className="text-sm font-normal">
                              {
                                bookingFetchedByReference?.booking
                                  ?.contactPostalCode
                              }
                            </span>{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                    {isLoading && (
                      <ImSpinner2
                        size={24}
                        className="text-shuttlelanePurple animate-spin"
                      />
                    )}
                    {/* {!bookingFetchedByReference && (
            <div className="w-full flex flex-col items-center justify-center">
              <img
                src={emptyImage}
                className="max-w-lg object-contain"
                alt="Sorry, there are no blog posts for now."
              />
              <p className="text-sm">Sorry, there are no blog posts for now.</p>
            </div>
          )} */}
                  </div>
                )}
              </>
            </div>
          </div>
        )}
        {isGetBookingByReferenceLoading && (
          <div className="bg-white pb-10 shadow-lg rounded-lg text-shuttlelaneBlack w-full min-h-[80%] max-h-[80%] h-[80%] lg:w-[60%] p-7 px-10 overflow-y-scroll shuttlelaneScrollbar">
            <div className="flex w-full h-full items-center justify-center">
              <ImSpinner2
                size={20}
                onClick={() => setIsAssignedBookingDetailsModalOpen(false)}
                className="cursor-loading animate-spin"
              />
            </div>
          </div>
        )}
      </Modal>

      {/* Navbar here */}
      <VendorDashboardNavbar
        link="bookings"
        sublink="completed-bookings"
        isNavbarOpen={isNavbarOpen}
        setIsNavbarOpen={setIsNavbarOpen}
      />

      {/* Main content goes here */}
      <div className="w-full min-h-screen lg:pl-[6%] bg-[#fff] text-shuttlelaneBlack">
        <div className="px-7 py-5 relative">
          {/* Top bar */}
          <VendorTopBar
            isNavbarOpen={isNavbarOpen}
            setIsNavbarOpen={setIsNavbarOpen}
          />

          {/* Main content */}
          <div className="mt-24 pt-2">
            <div className="flex xl:flex-row flex-col gap-x-5 gap-y-5">
              {/* Booking Summary - Total number of bookings */}
              <div className="w-full xl:w-[70%]">
                <div className="">
                  {completedBookings?.length > 0 && (
                    <>
                      <div className="flex items-center gap-x-2">
                        <p className="font-medium">Most Recent Job</p>
                        <div className="h-2 w-2 rounded-full bg-shuttlelanePurple"></div>
                      </div>

                      <div className="h-auto w-full rounded-lg allRoundBoxShadow overflow-hidden mt-4">
                        <>
                          <div className="flex items-center justify-center h-[220px] min-h-[220px] max-h-[220px] w-full rounded-tr-lg rounded-tl-lg">
                            <GoogleMapsWithDirections
                              pickupAddress={
                                completedBookings[completedBookings?.length - 1]
                                  ?.booking?.pickupAddress
                              }
                              pickupCoordinates={
                                completedBookings[completedBookings?.length - 1]
                                  ?.booking?.pickupCoordinates
                              }
                              dropoffAddress={
                                completedBookings[completedBookings?.length - 1]
                                  ?.booking?.dropoffAddress
                              }
                              dropoffCoordinates={
                                completedBookings[completedBookings?.length - 1]
                                  ?.booking?.dropoffCoordinates
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-x-2">
                              <div className="h-14 w-14 rounded-lg bg-white shadow-lg flex items-center justify-center">
                                <MdAirplanemodeActive size={20} className="" />
                              </div>

                              <div className="flex flex-col gap-y-1">
                                <small className="font-semibold">
                                  {
                                    completedBookings[
                                      completedBookings?.length - 1
                                    ]?.booking?.pickupAddress
                                  }
                                </small>
                                <small className="">
                                  {moment(
                                    completedBookings[
                                      completedBookings?.length - 1
                                    ]?.booking?.pickupDate
                                  ).format("DD MM, YYYY")}{" "}
                                  .{" "}
                                  {moment(
                                    completedBookings[
                                      completedBookings?.length - 1
                                    ]?.booking?.pickupTime
                                  ).format("H:MM A")}
                                </small>
                                <small className="text-green-500">
                                  {
                                    completedBookings[
                                      completedBookings?.length - 1
                                    ]?.bookingStatus
                                  }
                                </small>
                              </div>
                            </div>

                            {/* CTA */}
                            <div className="">
                              <button
                                onClick={() => {
                                  setCurrentBooking(
                                    completedBookings[
                                      completedBookings?.length - 1
                                    ]
                                  );
                                  setIsAssignedBookingDetailsModalOpen(true);
                                }}
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
                        </>
                      </div>
                    </>
                  )}
                </div>
                {/* Recent Bookings */}
                <div className="mt-11 w-full">
                  <div className="w-full rounded-lg border-[.3px] p-3 border-gray-100 h-auto">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-center gap-x-2">
                        <p className="font-medium">
                          Completed Bookings - {completedBookings?.length}
                        </p>
                        <div className="h-2 w-2 rounded-full bg-shuttlelanePurple"></div>
                      </div>
                    </div>

                    <div className="overflow-x-scroll shuttlelaneScrollbarHoriz shuttlelaneScrollbar">
                      {/* Table header */}
                      <div className="flex justify-between items-baseline mb-2 border-b-[.3px] border-b-gray-100 text-gray-400 mt-2">
                        <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                          Passenger
                        </p>
                        <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                          Pickup Location
                        </p>
                        <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                          Pickup Date
                        </p>
                        <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                          Pickup Time
                        </p>
                        <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                          Booking Type
                        </p>
                      </div>

                      {isLoading && (
                        <div className="flex justify-center items-center h-full w-full mb-2 pb-2 text-shuttlelaneBlack mt-4">
                          <ImSpinner2
                            size={18}
                            className="text-shuttlelanePurple animate-spin"
                          />
                        </div>
                      )}

                      {!isLoading && (
                        <>
                          {completedBookings?.map((booking) => (
                            <div
                              onClick={(e) => {
                                setCurrentBooking(booking);
                                setIsAssignedBookingDetailsModalOpen(true);
                              }}
                              className="cursor-pointer flex justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4"
                            >
                              <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                                {booking?.user?.firstName ?? booking?.firstName}{" "}
                                {booking?.user?.lastName ?? booking?.lastName}
                              </p>
                              <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                                {booking?.booking?.pickupAddress}
                              </p>
                              <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                                {moment(booking?.pickupDate).format(
                                  "MMM DD, YYYY"
                                )}
                              </p>
                              <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                                {moment(booking?.pickupTime).format("H:MM A")}
                              </p>
                              <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                                {booking?.bookingType}
                              </p>
                            </div>
                          ))}
                        </>
                      )}

                      {(completedBookings?.length < 1 || !completedBookings) &&
                        !isLoading && (
                          <div className="flex justify-center items-center h-full w-full mb-2 pb-2 text-shuttlelaneBlack mt-4">
                            <p className="w-full text-xs text-center">
                              You have not completed any bookings just yet...
                            </p>
                          </div>
                        )}
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
                            className="flex items-center gap-x-1 transition-all hover:text-shuttlelanePurple visited:text-shuttlelaneBlack text-shuttlelaneBlack hover:no-underline visited:no-underline"
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
                            className="flex items-center gap-x-1 transition-all hover:text-shuttlelanePurple visited:text-shuttlelaneBlack text-shuttlelaneBlack hover:no-underline visited:no-underline"
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
                            className="flex items-center gap-x-1 transition-all hover:text-shuttlelanePurple visited:text-shuttlelaneBlack text-shuttlelaneBlack hover:no-underline visited:no-underline"
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
                            className="flex items-center gap-x-1 transition-all hover:text-shuttlelanePurple visited:text-shuttlelaneBlack text-shuttlelaneBlack hover:no-underline visited:no-underline"
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
                      className="flex items-center gap-x-1 transition-all hover:text-shuttlelanePurple visited:text-shuttlelaneBlack text-shuttlelaneBlack hover:no-underline visited:no-underline"
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
                      className="flex items-center gap-x-1 transition-all hover:text-shuttlelanePurple visited:text-shuttlelaneBlack text-shuttlelaneBlack hover:no-underline visited:no-underline"
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
                      className="flex items-center gap-x-1 transition-all hover:text-shuttlelanePurple visited:text-shuttlelaneBlack text-shuttlelaneBlack hover:no-underline visited:no-underline"
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
                      className="flex items-center gap-x-1 transition-all hover:text-shuttlelanePurple visited:text-shuttlelaneBlack text-shuttlelaneBlack hover:no-underline visited:no-underline"
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

export default VendorDashboardBookingPage;
