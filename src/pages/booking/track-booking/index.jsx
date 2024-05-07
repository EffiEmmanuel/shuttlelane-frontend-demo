// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import NavBar from "../../../components/ui/NavBar";
import Typewriter from "typewriter-effect";
import {
  MdArrowRightAlt,
  MdLens,
  MdLocationOn,
  MdLocationPin,
  MdOutlineLens,
  MdOutlineLuggage,
  MdOutlineModeOfTravel,
  MdOutlineSearch,
} from "react-icons/md";
import { AiFillPhone, AiOutlineClose } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Fade } from "react-reveal";
import Footer from "../../../components/ui/Footer";
import PaymentPartners from "../../../components/ui/PaymentPartners";
import HowToReachUs from "../../../components/ui/HowToReachUs";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllBlogPosts,
  fetchBookingByReference,
} from "../../../redux/slices/userSlice";
import TimeAgo from "timeago-react";
import { ImSpinner2 } from "react-icons/im";
import moment from "moment";
import { Helmet } from "react-helmet";

// Images
import emptyImage from "../../../assets/images/empty.png";
import profilePicPlaceholder from "../../../assets/images/profilePicture.png";

function TrackBookingPage() {
  const howItWorksRef = useRef(null);
  const moreAboutUsRef = useRef(null);

  // Create a Moment object with the current date
  const currentDate = moment();

  const [isMenuHidden, setIsMenuHidden] = useState(false);

  // Search states
  const [searchValue, setSearchValue] = useState();

  const { isLoading, bookingFetchedByReference } = useSelector(
    (store) => store.user
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllBlogPosts());
  }, []);

  async function getBookingByBookingReference(value) {
    console.log("SEARCH VALUE:", value);
    if (!value || value?.trim() !== "") {
      dispatch(fetchBookingByReference(searchValue));
    } else {
      toast.info("You must provide a valid booking reference!");
    }
  }

  return (
    <div className="relative bg-white">
      <Helmet>
        <title>Track Booking | Shuttlelane</title>
      </Helmet>

      <ToastContainer />
      <div className="fixed w-full z-20">
        <NavBar isPurpleLogo={true} />
      </div>

      {/* Track Booking */}
      <div
        className="px-8 relative bg-white lg:px-24 py-24 pt-44 h-[30vh] flex items-center justify-center"
        ref={howItWorksRef}
      >
        <div className="flex relative z-10 lg:flex-row flex-col lg:justify-between lg:items-center">
          <div className="flex flex-col gap-y-5 lg:w-[100%] w-full">
            <div className="">
              <div className="text-shuttlelaneBlack">
                <h1 className="text-3xl lg:text-6xl text-center font-bold mt-3 leading-[39px]">
                  Track Booking
                </h1>
                <div className="flex flex-col text-center gap-y-3 leading-[22px] mt-3">
                  <p className="text-lg font-normal">
                    Stay in Control: Track, Modify, and Plan Your Airport and
                    Travel Arrangements with Ease.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* More About Shuttlelane */}
      <div className="p-7 lg:px-24 py-10" ref={moreAboutUsRef}>
        {/* <Fade direction="up" duration={500}> */}
        <div className="w-full flex flex-row justify-center">
          <div className="h-14 w-full lg:w-[35%] border-gray-300 border-[.5px] rounded-full p-4 flex flex-row items-center">
            <input
              type="text"
              placeholder="Booking reference"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-[85%] bg-transparent border-none focus:border-none focus:outline-none"
            />

            <div className="w-[15%]">
              <button
                onClick={() => getBookingByBookingReference(searchValue)}
                className="h-7 w-7 rounded-full text-gray-300 hover:text-white hover:bg-slate-300 p-1 flex items-center justify-center"
              >
                <MdOutlineSearch size={21} className="" />
              </button>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center w-full h-96">
            <div className="h-44 w-44 rounded-full bg-slate-400 animate-ping flex items-center justify-center delay-700">
              <div className="h-20 w-20 rounded-full bg-slate-300 animate-ping flex items-center justify-center delay-500">
                <div className="h-14 w-14 rounded-full bg-slate-200 animate-ping flex items-center justify-center delay-300">
                  <div className="h-8 w-8 rounded-full bg-slate-100 animate-ping flex items-center justify-center delay-0"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!isLoading && bookingFetchedByReference && (
          <>
            {bookingFetchedByReference?.bookingType === "Airport" && (
              <div className="flex items-center justify-center w-full">
                <div className="lg:w-[70%] w-full mt-10 lg:p-10 p-7 border-[1px] border-shuttlelanePurple border-dashed">
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
                      {bookingFetchedByReference?.paymentId?.paymentStatus ??
                        "Pending"}
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
                        bookingFetchedByReference?.bookingStatus == "Ongoing" ||
                        bookingFetchedByReference?.bookingStatus == "Scheduled"
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
                    <h2 className="text-xl font-semibold">Passenger Details</h2>

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
                    <h2 className="text-xl font-semibold">Driver Details</h2>

                    {bookingFetchedByReference?.assignedDriver ? (
                      <div className="flex flex-col gap-y-1">
                        <div className="flex items-center gap-x-2">
                          <div className="h-16 w-16 rounded-full overflow-hidden">
                            <img
                              src={
                                bookingFetchedByReference?.assignedDriver?.image
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
                          A driver has not yet been assigned to this booking
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
                            {bookingFetchedByReference?.assignedDriver?.carType}
                          </span>{" "}
                        </span>
                        <span className="text-sm font-semibold">
                          Name:{" "}
                          <span className="text-sm font-normal">
                            {bookingFetchedByReference?.assignedDriver?.carName}
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
                            {bookingFetchedByReference?.assignedDriver?.carYear}
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
                        <i>A car has not yet been assigned to this booking</i>
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
            {bookingFetchedByReference?.bookingType === "Car" && (
              <div className="flex items-center justify-center w-full">
                <div className="lg:w-[70%] w-full mt-10 lg:p-10 p-7 border-[1px] border-shuttlelanePurple border-dashed">
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
                      {bookingFetchedByReference?.paymentId?.paymentStatus ??
                        "Pending"}
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
                        bookingFetchedByReference?.bookingStatus == "Ongoing" ||
                        bookingFetchedByReference?.bookingStatus == "Scheduled"
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
                    <h2 className="text-xl font-semibold">Passenger Details</h2>

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
                    <h2 className="text-xl font-semibold">Driver Details</h2>

                    {bookingFetchedByReference?.assignedDriver ? (
                      <div className="flex flex-col gap-y-1">
                        <div className="flex items-center gap-x-2">
                          <div className="h-16 w-16 rounded-full overflow-hidden">
                            <img
                              src={
                                bookingFetchedByReference?.assignedDriver?.image
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
                          A driver has not yet been assigned to this booking
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
              <div className="flex items-center justify-center w-full">
                <div className="lg:w-[70%] w-full mt-10 lg:p-10 p-7 border-[1px] border-shuttlelanePurple border-dashed">
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
                      {bookingFetchedByReference?.paymentId?.paymentStatus ??
                        "Pending"}
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
                        bookingFetchedByReference?.bookingStatus == "Ongoing" ||
                        bookingFetchedByReference?.bookingStatus == "Scheduled"
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
                    <h2 className="text-xl font-semibold">Passenger Details</h2>

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
                    <h2 className="text-xl font-semibold">Driver Details</h2>

                    {bookingFetchedByReference?.assignedDriver ? (
                      <div className="flex flex-col gap-y-1">
                        <div className="flex items-center gap-x-2">
                          <div className="h-16 w-16 rounded-full overflow-hidden">
                            <img
                              src={
                                bookingFetchedByReference?.assignedDriver?.image
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
                          A driver has not yet been assigned to this booking
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
                            {bookingFetchedByReference?.assignedDriver?.carType}
                          </span>{" "}
                        </span>
                        <span className="text-sm font-semibold">
                          Name:{" "}
                          <span className="text-sm font-normal">
                            {bookingFetchedByReference?.assignedDriver?.carName}
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
                            {bookingFetchedByReference?.assignedDriver?.carYear}
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
                        <i>A car has not yet been assigned to this booking</i>
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
              <div className="flex items-center justify-center w-full">
                <div className="lg:w-[70%] w-full mt-10 lg:p-10 p-7 border-[1px] border-shuttlelanePurple border-dashed">
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
                      {bookingFetchedByReference?.paymentId?.paymentStatus ??
                        "Pending"}
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
                        bookingFetchedByReference?.bookingStatus == "Ongoing" ||
                        bookingFetchedByReference?.bookingStatus == "Scheduled"
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
                        {bookingFetchedByReference?.booking?.countryOfDeparture}
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
                          {bookingFetchedByReference?.booking?.maritalStatus}
                        </span>{" "}
                      </span>

                      <span className="text-sm font-semibold">
                        Passport Number:{" "}
                        <span className="text-sm font-normal">
                          {bookingFetchedByReference?.booking?.passportNumber}
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
                          {bookingFetchedByReference?.booking?.purposeOfJourney}
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
                            bookingFetchedByReference?.booking?.departureDate
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
                          {bookingFetchedByReference?.booking?.durationOfStay}{" "}
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
                          {bookingFetchedByReference?.booking?.contactNumber}
                        </span>{" "}
                      </span>
                      <span className="text-sm font-semibold">
                        Address:{" "}
                        <span className="text-sm font-normal">
                          {bookingFetchedByReference?.booking?.contactAddress}
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
        )}

        {!bookingFetchedByReference && (
          <div className="w-full flex flex-col items-center justify-center">
            <img
              src={emptyImage}
              className="max-w-lg object-contain"
              alt="Sorry, there are no blog posts for now."
            />
            <p className="text-sm text-center">
              Try searching for a booking using a valid booking reference...
            </p>
          </div>
        )}

        {/* </Fade> */}
      </div>

      {/* How To Reach Us */}
      <HowToReachUs />
      <PaymentPartners />
      <Footer />
    </div>
  );
}

export default TrackBookingPage;
