import React, { useEffect, useState } from "react";
import {
  MdCheckCircleOutline,
  MdDownload,
  MdLocationPin,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";
import {
  createShuttlelanePayment,
  fetchBookingById,
} from "../../../redux/slices/userSlice";
import { Helmet } from "react-helmet";
import moment from "moment";
import { usePDF } from "react-to-pdf";

export default function PaymentStatus() {
  const {
    isLoading,
    paymentStatus,
    paymentGateway,
    bookingId,
    bookingFromPayment,
  } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const location = useLocation();

  // Get the search string from the location object
  const searchParams = new URLSearchParams(location.search);

  // Get a specific query parameter
  const status = searchParams.get("status");
  const bid = searchParams.get("bid");
  const ch = searchParams.get("ch");

  useEffect(() => {
    console.log("STATUS:", status);
    console.log("bid:", bid);
    console.log("ch:", ch);

    const paymentStatusPayload =
      paymentStatus?.trim() != ""
        ? paymentStatus
        : status == "success"
        ? "Successful"
        : status == "failed"
        ? "Failed"
        : "Pending";

    const gatewayPayload = paymentGateway?.trim() != "" ? paymentGateway : ch;

    console.log("PS::", gatewayPayload);

    if ((paymentStatus && bookingId) || (status && bid && ch)) {
      dispatch(
        createShuttlelanePayment({
          paymentStatus: paymentStatusPayload,
          booking: bookingId ?? bid,
          gateway: gatewayPayload,
        })
      );
    }
  }, [paymentStatus, bookingId, status]);

  const { toPDF, targetRef } = usePDF({
    filename: "Shuttlelane Booking Details.pdf",
  });

  return (
    <div className="relative w-full min-h-screen">
      <div className="fixed top-10 right-10 flex flex-row items-center z-50 justify-center">
        <button
          onClick={() => toPDF()}
          className="bg-slate-300 hover:shadow-lg hover:bg-slate-400 transition-all rounded-lg h-14 w-14 flex items-center justify-center p-3"
        >
          <MdDownload size={18} className="text-shuttlelaneBlack" />
        </button>
      </div>

      <div
        ref={targetRef}
        className="relative min-h-screen w-full flex flex-col bg-white text-white px-7 lg:px-24 py-7"
      >
        <Helmet>
          <title>Payment {paymentStatus ?? status} | Shuttlelane</title>
        </Helmet>

        {(paymentStatus === "Successful" || status === "success") &&
          !isLoading && (
            <div className="w-full">
              <div className="text-green-500 flex flex-col items-center justify-center text-center">
                <div className="flex flex-col items-center gap-y-1">
                  <MdCheckCircleOutline size={80} className="text-green-500" />
                  <p className="text-xl font-semi-semibold">
                    Payment Successful
                  </p>
                </div>

                <div className="">
                  <p className="text-sm">
                    Thank you for booking with Shuttlelane!
                  </p>
                  <p className="mt-10 text-xs">
                    <Link
                      className="text-xs text-green-500 visited:text-green-500 hover:text-shuttlelanePurple"
                      to="/"
                    >
                      Go back to homepage
                    </Link>
                  </p>
                </div>
              </div>

              <div>
                <>
                  {bookingFromPayment?.bookingType === "Airport" && (
                    <div className="flex text-shuttlelaneBlack items-center justify-center w-full">
                      <div className="lg:w-[70%] w-full mt-10 lg:p-10 p-7 border-[1px] border-shuttlelanePurple border-dashed">
                        <h2 className="text-2xl text-shuttlelaneBlack font-semibold">
                          Trip Details
                        </h2>
                        <span className="text-sm text-slate-400">
                          Airport Transfer Booking
                        </span>
                        <div className="flex items-center gap-x-1">
                          <span className="text-sm">
                            {bookingFromPayment?.booking?.passengers} passengers
                          </span>
                          <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                          <span className="text-sm">
                            {moment(
                              bookingFromPayment?.booking?.pickupDate
                            ).format("MMM DD, YYYY")}
                          </span>
                          <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                          <span className="text-sm">
                            {moment(
                              bookingFromPayment?.booking?.pickupTime
                            ).format("H:MM A")}
                          </span>
                        </div>
                        <div className="flex items-center gap-x-1">
                          <span className="text-sm">
                            {bookingFromPayment?.bookingCurrency?.symbol}
                            {Intl.NumberFormat("en-US", {}).format(
                              bookingFromPayment?.bookingTotal
                            )}
                          </span>
                          <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                          <span
                            className={`text-sm ${
                              !bookingFromPayment?.paymentId?.paymentStatus
                                ? "text-yellow-500"
                                : bookingFromPayment?.paymentId
                                    ?.paymentStatus == "Successful"
                                ? "text-green-500"
                                : bookingFromPayment?.paymentId
                                    ?.paymentStatus == "Pending"
                                ? "text-yellow-500"
                                : "text-red-500"
                            }`}
                          >
                            Payment{" "}
                            {bookingFromPayment?.paymentId?.paymentStatus ??
                              "Pending"}
                          </span>
                        </div>
                        <div className="flex items-center gap-x-1">
                          <span className="text-sm">
                            {
                              bookingFromPayment?.booking?.vehicleClass
                                ?.className
                            }
                          </span>
                          <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                          <span
                            className={`text-sm ${
                              bookingFromPayment?.bookingStatus ==
                                "Completed" ||
                              bookingFromPayment?.bookingStatus == "Ongoing" ||
                              bookingFromPayment?.bookingStatus == "Scheduled"
                                ? "text-green-500"
                                : bookingFromPayment?.bookingStatus ==
                                    "Awaiting response" ||
                                  bookingFromPayment?.bookingStatus ==
                                    "Not yet assigned"
                                ? "text-yellow-500"
                                : "text-red-500"
                            }`}
                          >
                            {bookingFromPayment?.bookingStatus}
                          </span>
                        </div>
                        <div className="flex flex-col mt-4 gap-y-1">
                          <div className="flex items-center gap-x-1">
                            <div className="ml-1 h-4 w-4 border-[.5px] border-shuttlelaneBlack rounded-full"></div>
                            <span className="text-sm">
                              {bookingFromPayment?.booking?.pickupAddress}
                            </span>
                          </div>
                          <div className="border-r-[1px] border-r-shuttlelanePurple h-5 w-3 border-dashed"></div>
                          <div className="flex items-center gap-x-1">
                            <MdLocationPin
                              size={24}
                              className="text-green-500"
                            />
                            <span className="text-sm">
                              {bookingFromPayment?.booking?.dropoffAddress}
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
                                {bookingFromPayment?.user?.firstName ??
                                  bookingFromPayment?.firstName}{" "}
                                {bookingFromPayment?.user?.lastName ??
                                  bookingFromPayment?.lastName}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Phone Number:{" "}
                              <span className="text-sm font-normal">
                                {bookingFromPayment?.user?.mobile ??
                                  bookingFromPayment?.mobile}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Email Address:{" "}
                              <span className="text-sm font-normal">
                                {bookingFromPayment?.user?.email ??
                                  bookingFromPayment?.email}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Airline:{" "}
                              <span className="text-sm font-normal">
                                {bookingFromPayment?.booking?.airline}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Flight Number:{" "}
                              <span className="text-sm font-normal">
                                {bookingFromPayment?.booking?.flightNumber}
                              </span>{" "}
                            </span>
                          </div>
                        </div>

                        {/* Driver Details */}
                        <div className="mt-5">
                          <h2 className="text-xl font-semibold">
                            Driver Details
                          </h2>

                          {bookingFromPayment?.assignedDriver ? (
                            <div className="flex flex-col gap-y-1">
                              <div className="flex items-center gap-x-2">
                                <div className="h-16 w-16 rounded-full overflow-hidden">
                                  <img
                                    src={
                                      bookingFromPayment?.assignedDriver?.image
                                    }
                                    alt={`${bookingFromPayment?.assignedDriver?.firstName} ${bookingFromPayment?.assignedDriver?.lastName}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>

                                <div className="flex flex-col">
                                  <span className="text-sm font-semibold">
                                    Full Name:{" "}
                                    <span className="text-sm font-normal">
                                      {
                                        bookingFromPayment?.assignedDriver
                                          ?.firstName
                                      }{" "}
                                      $
                                      {
                                        bookingFromPayment?.assignedDriver
                                          ?.lastName
                                      }
                                    </span>{" "}
                                  </span>
                                  <span className="text-sm font-semibold">
                                    Email Address:{" "}
                                    <span className="text-sm font-normal">
                                      {
                                        bookingFromPayment?.assignedDriver
                                          ?.email
                                      }
                                    </span>{" "}
                                  </span>
                                  <span className="text-sm font-semibold">
                                    Phone Number:{" "}
                                    <span className="text-sm font-normal">
                                      {
                                        bookingFromPayment?.assignedDriver
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
                                A driver has not yet been assigned to this
                                booking
                              </i>
                            </div>
                          )}
                        </div>

                        {/* Car Details */}
                        <div className="mt-5">
                          <h2 className="text-xl font-semibold">Car Details</h2>
                          {bookingFromPayment?.assignedDriver ? (
                            <div className="flex flex-col gap-y-1">
                              <span className="text-sm font-semibold">
                                Type:{" "}
                                <span className="text-sm font-normal">
                                  {bookingFromPayment?.assignedDriver?.carType}
                                </span>{" "}
                              </span>
                              <span className="text-sm font-semibold">
                                Name:{" "}
                                <span className="text-sm font-normal">
                                  {bookingFromPayment?.assignedDriver?.carName}
                                </span>{" "}
                              </span>
                              <span className="text-sm font-semibold">
                                Model:{" "}
                                <span className="text-sm font-normal">
                                  {bookingFromPayment?.assignedDriver?.carModel}
                                </span>{" "}
                              </span>
                              <span className="text-sm font-semibold">
                                Year:{" "}
                                <span className="text-sm font-normal">
                                  {bookingFromPayment?.assignedDriver?.carYear}
                                </span>{" "}
                              </span>
                              <span className="text-sm font-semibold">
                                Plate Number:{" "}
                                <span className="text-sm font-normal">
                                  {
                                    bookingFromPayment?.assignedDriver
                                      ?.carPlateNumber
                                  }
                                </span>{" "}
                              </span>
                              <span className="text-sm font-semibold">
                                Color:{" "}
                                <span className="text-sm font-normal">
                                  {bookingFromPayment?.assignedDriver?.carColor}
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
                      {/* {!bookingFromPayment && (
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
                  {bookingFromPayment?.bookingType === "Car" && (
                    <div className="flex text-shuttlelaneBlack items-center justify-center w-full">
                      <div className="lg:w-[70%] w-full mt-10 lg:p-10 p-7 border-[1px] border-shuttlelanePurple border-dashed">
                        <h2 className="text-2xl font-semibold">Trip Details</h2>
                        <span className="text-sm text-slate-400">
                          Car Rental Booking
                        </span>
                        <div className="flex items-center gap-x-1">
                          <span className="text-sm">
                            {bookingFromPayment?.booking?.days} days
                          </span>
                          <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                          <span className="text-sm">
                            {moment(
                              bookingFromPayment?.booking?.pickupDate
                            ).format("MMM DD, YYYY")}
                          </span>
                          <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                          <span className="text-sm">
                            {moment(
                              bookingFromPayment?.booking?.pickupTime
                            ).format("H:MM A")}
                          </span>
                        </div>
                        <div className="flex items-center gap-x-1">
                          <span className="text-sm">
                            {bookingFromPayment?.bookingCurrency?.symbol}
                            {Intl.NumberFormat("en-US", {}).format(
                              bookingFromPayment?.bookingTotal
                            )}
                          </span>
                          <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                          <span
                            className={`text-sm ${
                              !bookingFromPayment?.paymentId?.paymentStatus
                                ? "text-yellow-500"
                                : bookingFromPayment?.paymentId
                                    ?.paymentStatus == "Successful"
                                ? "text-green-500"
                                : bookingFromPayment?.paymentId
                                    ?.paymentStatus == "Pending"
                                ? "text-yellow-500"
                                : "text-red-500"
                            }`}
                          >
                            Payment{" "}
                            {bookingFromPayment?.paymentId?.paymentStatus ??
                              "Pending"}
                          </span>
                        </div>
                        <div className="flex items-center gap-x-1">
                          <span className="text-sm">
                            {bookingFromPayment?.booking?.car?.name}
                          </span>
                          <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                          <span
                            className={`text-sm ${
                              bookingFromPayment?.bookingStatus ==
                                "Completed" ||
                              bookingFromPayment?.bookingStatus == "Ongoing" ||
                              bookingFromPayment?.bookingStatus == "Scheduled"
                                ? "text-green-500"
                                : bookingFromPayment?.bookingStatus ==
                                    "Awaiting response" ||
                                  bookingFromPayment?.bookingStatus ==
                                    "Not yet assigned"
                                ? "text-yellow-500"
                                : "text-red-500"
                            }`}
                          >
                            {bookingFromPayment?.bookingStatus}
                          </span>
                        </div>
                        <div className="flex flex-col mt-4 gap-y-1">
                          <div className="flex items-center gap-x-1">
                            <MdLocationPin
                              size={24}
                              className="text-green-500"
                            />
                            <span className="text-sm">
                              {bookingFromPayment?.booking?.pickupAddress}
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
                                {bookingFromPayment?.user?.firstName ??
                                  bookingFromPayment?.firstName}{" "}
                                {bookingFromPayment?.user?.lastName ??
                                  bookingFromPayment?.lastName}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Phone Number:{" "}
                              <span className="text-sm font-normal">
                                {bookingFromPayment?.user?.mobile ??
                                  bookingFromPayment?.mobile}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Email Address:{" "}
                              <span className="text-sm font-normal">
                                {bookingFromPayment?.user?.email ??
                                  bookingFromPayment?.email}
                              </span>{" "}
                            </span>
                          </div>
                        </div>

                        {/* Driver Details */}
                        <div className="mt-5">
                          <h2 className="text-xl font-semibold">
                            Driver Details
                          </h2>

                          {bookingFromPayment?.assignedDriver ? (
                            <div className="flex flex-col gap-y-1">
                              <div className="flex items-center gap-x-2">
                                <div className="h-16 w-16 rounded-full overflow-hidden">
                                  <img
                                    src={
                                      bookingFromPayment?.assignedDriver?.image
                                    }
                                    alt={`${bookingFromPayment?.assignedDriver?.firstName} ${bookingFromPayment?.assignedDriver?.lastName}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>

                                <div className="flex flex-col">
                                  <span className="text-sm font-semibold">
                                    Full Name:{" "}
                                    <span className="text-sm font-normal">
                                      {
                                        bookingFromPayment?.assignedDriver
                                          ?.firstName
                                      }{" "}
                                      $
                                      {
                                        bookingFromPayment?.assignedDriver
                                          ?.lastName
                                      }
                                    </span>{" "}
                                  </span>
                                  <span className="text-sm font-semibold">
                                    Email Address:{" "}
                                    <span className="text-sm font-normal">
                                      {
                                        bookingFromPayment?.assignedDriver
                                          ?.email
                                      }
                                    </span>{" "}
                                  </span>
                                  <span className="text-sm font-semibold">
                                    Phone Number:{" "}
                                    <span className="text-sm font-normal">
                                      {
                                        bookingFromPayment?.assignedDriver
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
                                A driver has not yet been assigned to this
                                booking
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
                      {/* {!bookingFromPayment && (
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
                  {bookingFromPayment?.bookingType === "Priority" && (
                    <div className="flex text-shuttlelaneBlack items-center justify-center w-full">
                      <div className="lg:w-[70%] w-full mt-10 lg:p-10 p-7 border-[1px] border-shuttlelanePurple border-dashed">
                        <h2 className="text-2xl font-semibold">Trip Details</h2>
                        <span className="text-sm text-slate-400">
                          Priority Pass Booking
                        </span>
                        <div className="flex items-center gap-x-1">
                          <span className="text-sm">
                            {bookingFromPayment?.booking?.passengers} passengers
                          </span>
                          <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                          <span className="text-sm">
                            {moment(
                              bookingFromPayment?.booking?.pickupDate
                            ).format("MMM DD, YYYY")}
                          </span>
                          <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                          <span className="text-sm">
                            {moment(
                              bookingFromPayment?.booking?.pickupTime
                            ).format("H:MM A")}
                          </span>
                        </div>
                        <div className="flex items-center gap-x-1">
                          <span className="text-sm">
                            {bookingFromPayment?.booking?.pass?.name}
                          </span>
                          <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                          <span className="text-sm">
                            {bookingFromPayment?.bookingCurrency?.symbol}
                            {Intl.NumberFormat("en-US", {}).format(
                              bookingFromPayment?.bookingTotal
                            )}
                          </span>
                          <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                          <span
                            className={`text-sm ${
                              !bookingFromPayment?.paymentId?.paymentStatus
                                ? "text-yellow-500"
                                : bookingFromPayment?.paymentId
                                    ?.paymentStatus == "Successful"
                                ? "text-green-500"
                                : bookingFromPayment?.paymentId
                                    ?.paymentStatus == "Pending"
                                ? "text-yellow-500"
                                : "text-red-500"
                            }`}
                          >
                            Payment{" "}
                            {bookingFromPayment?.paymentId?.paymentStatus ??
                              "Pending"}
                          </span>
                        </div>
                        <div className="flex items-center gap-x-1">
                          <span className="text-sm">
                            {bookingFromPayment?.booking?.service}
                          </span>
                          <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                          <span
                            className={`text-sm ${
                              bookingFromPayment?.bookingStatus ==
                                "Completed" ||
                              bookingFromPayment?.bookingStatus == "Ongoing" ||
                              bookingFromPayment?.bookingStatus == "Scheduled"
                                ? "text-green-500"
                                : bookingFromPayment?.bookingStatus ==
                                    "Awaiting response" ||
                                  bookingFromPayment?.bookingStatus ==
                                    "Not yet assigned"
                                ? "text-yellow-500"
                                : "text-red-500"
                            }`}
                          >
                            {bookingFromPayment?.bookingStatus}
                          </span>
                        </div>
                        <div className="flex flex-col mt-4 gap-y-1">
                          <div className="flex items-center gap-x-1">
                            <MdLocationPin
                              size={24}
                              className="text-green-500"
                            />
                            <span className="text-sm">
                              {bookingFromPayment?.booking?.pickupAddress}
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
                                {bookingFromPayment?.user?.firstName ??
                                  bookingFromPayment?.firstName}{" "}
                                {bookingFromPayment?.user?.lastName ??
                                  bookingFromPayment?.lastName}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Phone Number:{" "}
                              <span className="text-sm font-normal">
                                {bookingFromPayment?.user?.mobile ??
                                  bookingFromPayment?.mobile}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Email Address:{" "}
                              <span className="text-sm font-normal">
                                {bookingFromPayment?.user?.email ??
                                  bookingFromPayment?.email}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Airline:{" "}
                              <span className="text-sm font-normal">
                                {bookingFromPayment?.booking?.airline}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Flight Number:{" "}
                              <span className="text-sm font-normal">
                                {bookingFromPayment?.booking?.flightNumber}
                              </span>{" "}
                            </span>
                          </div>
                        </div>

                        {/* Driver Details */}
                        <div className="mt-5">
                          <h2 className="text-xl font-semibold">
                            Driver Details
                          </h2>

                          {bookingFromPayment?.assignedDriver ? (
                            <div className="flex flex-col gap-y-1">
                              <div className="flex items-center gap-x-2">
                                <div className="h-16 w-16 rounded-full overflow-hidden">
                                  <img
                                    src={
                                      bookingFromPayment?.assignedDriver?.image
                                    }
                                    alt={`${bookingFromPayment?.assignedDriver?.firstName} ${bookingFromPayment?.assignedDriver?.lastName}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>

                                <div className="flex flex-col">
                                  <span className="text-sm font-semibold">
                                    Full Name:{" "}
                                    <span className="text-sm font-normal">
                                      {
                                        bookingFromPayment?.assignedDriver
                                          ?.firstName
                                      }{" "}
                                      $
                                      {
                                        bookingFromPayment?.assignedDriver
                                          ?.lastName
                                      }
                                    </span>{" "}
                                  </span>
                                  <span className="text-sm font-semibold">
                                    Email Address:{" "}
                                    <span className="text-sm font-normal">
                                      {
                                        bookingFromPayment?.assignedDriver
                                          ?.email
                                      }
                                    </span>{" "}
                                  </span>
                                  <span className="text-sm font-semibold">
                                    Phone Number:{" "}
                                    <span className="text-sm font-normal">
                                      {
                                        bookingFromPayment?.assignedDriver
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
                                A driver has not yet been assigned to this
                                booking
                              </i>
                            </div>
                          )}
                        </div>

                        {/* Car Details */}
                        <div className="mt-5">
                          <h2 className="text-xl font-semibold">Car Details</h2>
                          {bookingFromPayment?.assignedDriver ? (
                            <div className="flex flex-col gap-y-1">
                              <span className="text-sm font-semibold">
                                Type:{" "}
                                <span className="text-sm font-normal">
                                  {bookingFromPayment?.assignedDriver?.carType}
                                </span>{" "}
                              </span>
                              <span className="text-sm font-semibold">
                                Name:{" "}
                                <span className="text-sm font-normal">
                                  {bookingFromPayment?.assignedDriver?.carName}
                                </span>{" "}
                              </span>
                              <span className="text-sm font-semibold">
                                Model:{" "}
                                <span className="text-sm font-normal">
                                  {bookingFromPayment?.assignedDriver?.carModel}
                                </span>{" "}
                              </span>
                              <span className="text-sm font-semibold">
                                Year:{" "}
                                <span className="text-sm font-normal">
                                  {bookingFromPayment?.assignedDriver?.carYear}
                                </span>{" "}
                              </span>
                              <span className="text-sm font-semibold">
                                Plate Number:{" "}
                                <span className="text-sm font-normal">
                                  {
                                    bookingFromPayment?.assignedDriver
                                      ?.carPlateNumber
                                  }
                                </span>{" "}
                              </span>
                              <span className="text-sm font-semibold">
                                Color:{" "}
                                <span className="text-sm font-normal">
                                  {bookingFromPayment?.assignedDriver?.carColor}
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
                      {/* {!bookingFromPayment && (
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
                  {bookingFromPayment?.bookingType === "Visa" && (
                    <div className="flex text-shuttlelaneBlack items-center justify-center w-full">
                      <div className="lg:w-[70%] w-full mt-10 lg:p-10 p-7 border-[1px] border-shuttlelanePurple border-dashed">
                        <h2 className="text-2xl font-semibold">Trip Details</h2>
                        <span className="text-sm text-slate-400">
                          Visa On Arrival Booking
                        </span>
                        <div className="flex items-center gap-x-1">
                          <span className="text-sm">
                            {bookingFromPayment?.booking?.airline}{" "}
                          </span>
                          <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                          <span className="text-sm">
                            {moment(
                              bookingFromPayment?.booking?.departureDate
                            ).format("MMM DD, YYYY")}
                          </span>
                          <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                          <span className="text-sm">
                            {moment(
                              bookingFromPayment?.booking?.arrivalDate
                            ).format("MMM DD, YYYY")}
                          </span>
                        </div>
                        <div className="flex items-center gap-x-1">
                          <span className="text-sm">
                            {bookingFromPayment?.booking?.bookingReference}
                          </span>
                          <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                          <span className="text-sm">
                            $
                            {Intl.NumberFormat("en-US", {}).format(
                              bookingFromPayment?.bookingTotal
                            )}
                          </span>
                          <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                          <span
                            className={`text-sm ${
                              !bookingFromPayment?.paymentId?.paymentStatus
                                ? "text-yellow-500"
                                : bookingFromPayment?.paymentId
                                    ?.paymentStatus == "Successful"
                                ? "text-green-500"
                                : bookingFromPayment?.paymentId
                                    ?.paymentStatus == "Pending"
                                ? "text-yellow-500"
                                : "text-red-500"
                            }`}
                          >
                            Payment{" "}
                            {bookingFromPayment?.paymentId?.paymentStatus ??
                              "Pending"}
                          </span>
                        </div>
                        <div className="flex items-center gap-x-1">
                          <span className="text-sm">
                            {bookingFromPayment?.booking?.flightNumber}
                          </span>
                          <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                          <span
                            className={`text-sm ${
                              bookingFromPayment?.bookingStatus ==
                                "Completed" ||
                              bookingFromPayment?.bookingStatus == "Ongoing" ||
                              bookingFromPayment?.bookingStatus == "Scheduled"
                                ? "text-green-500"
                                : bookingFromPayment?.bookingStatus ==
                                    "Awaiting response" ||
                                  bookingFromPayment?.bookingStatus ==
                                    "Not yet assigned"
                                ? "text-yellow-500"
                                : "text-red-500"
                            }`}
                          >
                            {bookingFromPayment?.bookingStatus}
                          </span>
                        </div>
                        <div className="flex flex-col mt-4 gap-y-1">
                          <div className="flex items-center gap-x-1">
                            <div className="ml-1 h-4 w-4 border-[.5px] border-shuttlelaneBlack rounded-full"></div>
                            <span className="text-sm">
                              {bookingFromPayment?.booking?.countryOfDeparture}
                            </span>
                          </div>
                          <div className="border-r-[1px] border-r-shuttlelanePurple h-5 w-3 border-dashed"></div>

                          <div className="flex items-center gap-x-1">
                            <MdLocationPin
                              size={24}
                              className="text-green-500"
                            />
                            <span className="text-sm">
                              {bookingFromPayment?.booking?.portOfEntry}
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
                                {bookingFromPayment?.booking?.nationality}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Class Of Visa:{" "}
                              <span className="text-sm font-normal">
                                {bookingFromPayment?.booking?.visaClass}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Passport Type:{" "}
                              <span className="text-sm font-normal">
                                {bookingFromPayment?.booking?.passportType}
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
                                {bookingFromPayment?.booking?.title}{" "}
                                {bookingFromPayment?.booking?.surname}{" "}
                                {bookingFromPayment?.booking?.middleName}{" "}
                                {bookingFromPayment?.booking?.firstName}{" "}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Email Address:{" "}
                              <span className="text-sm font-normal">
                                {bookingFromPayment?.booking?.email}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Date Of Birth:{" "}
                              <span className="text-sm font-normal">
                                {moment(
                                  bookingFromPayment?.booking?.dateOfBirth
                                ).format("MMM DD, YYYY")}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Place Of Birth:{" "}
                              <span className="text-sm font-normal">
                                {bookingFromPayment?.booking?.placeOfBirth}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Gender:{" "}
                              <span className="text-sm font-normal">
                                {bookingFromPayment?.booking?.gender}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Marital Status:{" "}
                              <span className="text-sm font-normal">
                                {bookingFromPayment?.booking?.maritalStatus}
                              </span>{" "}
                            </span>

                            <span className="text-sm font-semibold">
                              Passport Number:{" "}
                              <span className="text-sm font-normal">
                                {bookingFromPayment?.booking?.passportNumber}
                              </span>{" "}
                            </span>

                            <span className="text-sm font-semibold">
                              Passport Expiry Date:{" "}
                              <span className="text-sm font-normal">
                                {moment(
                                  bookingFromPayment?.booking
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
                                {bookingFromPayment?.booking?.purposeOfJourney}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Airline:{" "}
                              <span className="text-sm font-normal">
                                {bookingFromPayment?.booking?.airline}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Flight Number:{" "}
                              <span className="text-sm font-normal">
                                {bookingFromPayment?.booking?.flightNumber}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Country Of Departure:{" "}
                              <span className="text-sm font-normal">
                                {
                                  bookingFromPayment?.booking
                                    ?.countryOfDeparture
                                }
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Departure Date:{" "}
                              <span className="text-sm font-normal">
                                {moment(
                                  bookingFromPayment?.booking?.departureDate
                                ).format("MMM DD, YYYY")}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Arrival Date:{" "}
                              <span className="text-sm font-normal">
                                {moment(
                                  bookingFromPayment?.booking?.arrivalDate
                                ).format("MMM DD, YYYY")}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Port Of Entry:{" "}
                              <span className="text-sm font-normal">
                                {bookingFromPayment?.booking?.portOfEntry}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Duration Of Stay:{" "}
                              <span className="text-sm font-normal">
                                {bookingFromPayment?.booking?.durationOfStay}{" "}
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
                                {bookingFromPayment?.booking?.contactName}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Phone Number:{" "}
                              <span className="text-sm font-normal">
                                {bookingFromPayment?.booking?.contactNumber}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Address:{" "}
                              <span className="text-sm font-normal">
                                {bookingFromPayment?.booking?.contactAddress}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              City:{" "}
                              <span className="text-sm font-normal">
                                {bookingFromPayment?.booking?.contactCity}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              State:{" "}
                              <span className="text-sm font-normal">
                                {bookingFromPayment?.booking?.contactState}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Email Address:{" "}
                              <span className="text-sm font-normal">
                                {bookingFromPayment?.booking?.contactEmail}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Postal Code:{" "}
                              <span className="text-sm font-normal">
                                {bookingFromPayment?.booking?.contactPostalCode}
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
                      {/* {!bookingFromPayment && (
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
        {(paymentStatus === "Failed" || status === "failed") && !isLoading && (
          <div className="w-full">
            <div className="text-red-500 rounded-lg flex flex-col items-center justify-center text-center">
              <div className="flex flex-col items-center gap-y-1">
                <MdCheckCircleOutline size={80} className="" />
                <p className="text-xl font-semi-semibold">Payment Failed</p>
              </div>

              <div className="">
                <p className="text-sm">Having trouble making payment?</p>
                <p className="mt-10 text-xs">
                  <Link
                    className="text-xs text-white visited:text-white hover:text-shuttlelanePurple"
                    to="/"
                  >
                    Contact info@shuttlelane.com immediately, to lay a complaint
                  </Link>
                </p>
              </div>
            </div>

            <div>
              <>
                {bookingFromPayment?.bookingType === "Airport" && (
                  <div className="flex text-shuttlelaneBlack items-center justify-center w-full">
                    <div className="lg:w-[70%] w-full mt-10 lg:p-10 p-7 border-[1px] border-shuttlelanePurple border-dashed">
                      <h2 className="text-2xl text-shuttlelaneBlack font-semibold">
                        Trip Details
                      </h2>
                      <span className="text-sm text-slate-400">
                        Airport Transfer Booking
                      </span>
                      <div className="flex items-center gap-x-1">
                        <span className="text-sm">
                          {bookingFromPayment?.booking?.passengers} passengers
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span className="text-sm">
                          {moment(
                            bookingFromPayment?.booking?.pickupDate
                          ).format("MMM DD, YYYY")}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span className="text-sm">
                          {moment(
                            bookingFromPayment?.booking?.pickupTime
                          ).format("H:MM A")}
                        </span>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <span className="text-sm">
                          {bookingFromPayment?.bookingCurrency?.symbol}
                          {Intl.NumberFormat("en-US", {}).format(
                            bookingFromPayment?.bookingTotal
                          )}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span
                          className={`text-sm ${
                            !bookingFromPayment?.paymentId?.paymentStatus
                              ? "text-yellow-500"
                              : bookingFromPayment?.paymentId?.paymentStatus ==
                                "Successful"
                              ? "text-green-500"
                              : bookingFromPayment?.paymentId?.paymentStatus ==
                                "Pending"
                              ? "text-yellow-500"
                              : "text-red-500"
                          }`}
                        >
                          Payment{" "}
                          {bookingFromPayment?.paymentId?.paymentStatus ??
                            "Pending"}
                        </span>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <span className="text-sm">
                          {bookingFromPayment?.booking?.vehicleClass?.className}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span
                          className={`text-sm ${
                            bookingFromPayment?.bookingStatus == "Completed" ||
                            bookingFromPayment?.bookingStatus == "Ongoing" ||
                            bookingFromPayment?.bookingStatus == "Scheduled"
                              ? "text-green-500"
                              : bookingFromPayment?.bookingStatus ==
                                  "Awaiting response" ||
                                bookingFromPayment?.bookingStatus ==
                                  "Not yet assigned"
                              ? "text-yellow-500"
                              : "text-red-500"
                          }`}
                        >
                          {bookingFromPayment?.bookingStatus}
                        </span>
                      </div>
                      <div className="flex flex-col mt-4 gap-y-1">
                        <div className="flex items-center gap-x-1">
                          <div className="ml-1 h-4 w-4 border-[.5px] border-shuttlelaneBlack rounded-full"></div>
                          <span className="text-sm">
                            {bookingFromPayment?.booking?.pickupAddress}
                          </span>
                        </div>
                        <div className="border-r-[1px] border-r-shuttlelanePurple h-5 w-3 border-dashed"></div>
                        <div className="flex items-center gap-x-1">
                          <MdLocationPin size={24} className="text-green-500" />
                          <span className="text-sm">
                            {bookingFromPayment?.booking?.dropoffAddress}
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
                              {bookingFromPayment?.user?.firstName ??
                                bookingFromPayment?.firstName}{" "}
                              {bookingFromPayment?.user?.lastName ??
                                bookingFromPayment?.lastName}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Phone Number:{" "}
                            <span className="text-sm font-normal">
                              {bookingFromPayment?.user?.mobile ??
                                bookingFromPayment?.mobile}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Email Address:{" "}
                            <span className="text-sm font-normal">
                              {bookingFromPayment?.user?.email ??
                                bookingFromPayment?.email}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Airline:{" "}
                            <span className="text-sm font-normal">
                              {bookingFromPayment?.booking?.airline}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Flight Number:{" "}
                            <span className="text-sm font-normal">
                              {bookingFromPayment?.booking?.flightNumber}
                            </span>{" "}
                          </span>
                        </div>
                      </div>

                      {/* Driver Details */}
                      <div className="mt-5">
                        <h2 className="text-xl font-semibold">
                          Driver Details
                        </h2>

                        {bookingFromPayment?.assignedDriver ? (
                          <div className="flex flex-col gap-y-1">
                            <div className="flex items-center gap-x-2">
                              <div className="h-16 w-16 rounded-full overflow-hidden">
                                <img
                                  src={
                                    bookingFromPayment?.assignedDriver?.image
                                  }
                                  alt={`${bookingFromPayment?.assignedDriver?.firstName} ${bookingFromPayment?.assignedDriver?.lastName}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              <div className="flex flex-col">
                                <span className="text-sm font-semibold">
                                  Full Name:{" "}
                                  <span className="text-sm font-normal">
                                    {
                                      bookingFromPayment?.assignedDriver
                                        ?.firstName
                                    }{" "}
                                    $
                                    {
                                      bookingFromPayment?.assignedDriver
                                        ?.lastName
                                    }
                                  </span>{" "}
                                </span>
                                <span className="text-sm font-semibold">
                                  Email Address:{" "}
                                  <span className="text-sm font-normal">
                                    {bookingFromPayment?.assignedDriver?.email}
                                  </span>{" "}
                                </span>
                                <span className="text-sm font-semibold">
                                  Phone Number:{" "}
                                  <span className="text-sm font-normal">
                                    {bookingFromPayment?.assignedDriver?.mobile}
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
                        {bookingFromPayment?.assignedDriver ? (
                          <div className="flex flex-col gap-y-1">
                            <span className="text-sm font-semibold">
                              Type:{" "}
                              <span className="text-sm font-normal">
                                {bookingFromPayment?.assignedDriver?.carType}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Name:{" "}
                              <span className="text-sm font-normal">
                                {bookingFromPayment?.assignedDriver?.carName}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Model:{" "}
                              <span className="text-sm font-normal">
                                {bookingFromPayment?.assignedDriver?.carModel}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Year:{" "}
                              <span className="text-sm font-normal">
                                {bookingFromPayment?.assignedDriver?.carYear}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Plate Number:{" "}
                              <span className="text-sm font-normal">
                                {
                                  bookingFromPayment?.assignedDriver
                                    ?.carPlateNumber
                                }
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Color:{" "}
                              <span className="text-sm font-normal">
                                {bookingFromPayment?.assignedDriver?.carColor}
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
                    {/* {!bookingFromPayment && (
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
                {bookingFromPayment?.bookingType === "Car" && (
                  <div className="flex text-shuttlelaneBlack items-center justify-center w-full">
                    <div className="lg:w-[70%] w-full mt-10 lg:p-10 p-7 border-[1px] border-shuttlelanePurple border-dashed">
                      <h2 className="text-2xl font-semibold">Trip Details</h2>
                      <span className="text-sm text-slate-400">
                        Car Rental Booking
                      </span>
                      <div className="flex items-center gap-x-1">
                        <span className="text-sm">
                          {bookingFromPayment?.booking?.days} days
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span className="text-sm">
                          {moment(
                            bookingFromPayment?.booking?.pickupDate
                          ).format("MMM DD, YYYY")}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span className="text-sm">
                          {moment(
                            bookingFromPayment?.booking?.pickupTime
                          ).format("H:MM A")}
                        </span>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <span className="text-sm">
                          {bookingFromPayment?.bookingCurrency?.symbol}
                          {Intl.NumberFormat("en-US", {}).format(
                            bookingFromPayment?.bookingTotal
                          )}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span
                          className={`text-sm ${
                            !bookingFromPayment?.paymentId?.paymentStatus
                              ? "text-yellow-500"
                              : bookingFromPayment?.paymentId?.paymentStatus ==
                                "Successful"
                              ? "text-green-500"
                              : bookingFromPayment?.paymentId?.paymentStatus ==
                                "Pending"
                              ? "text-yellow-500"
                              : "text-red-500"
                          }`}
                        >
                          Payment{" "}
                          {bookingFromPayment?.paymentId?.paymentStatus ??
                            "Pending"}
                        </span>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <span className="text-sm">
                          {bookingFromPayment?.booking?.car?.name}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span
                          className={`text-sm ${
                            bookingFromPayment?.bookingStatus == "Completed" ||
                            bookingFromPayment?.bookingStatus == "Ongoing" ||
                            bookingFromPayment?.bookingStatus == "Scheduled"
                              ? "text-green-500"
                              : bookingFromPayment?.bookingStatus ==
                                  "Awaiting response" ||
                                bookingFromPayment?.bookingStatus ==
                                  "Not yet assigned"
                              ? "text-yellow-500"
                              : "text-red-500"
                          }`}
                        >
                          {bookingFromPayment?.bookingStatus}
                        </span>
                      </div>
                      <div className="flex flex-col mt-4 gap-y-1">
                        <div className="flex items-center gap-x-1">
                          <MdLocationPin size={24} className="text-green-500" />
                          <span className="text-sm">
                            {bookingFromPayment?.booking?.pickupAddress}
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
                              {bookingFromPayment?.user?.firstName ??
                                bookingFromPayment?.firstName}{" "}
                              {bookingFromPayment?.user?.lastName ??
                                bookingFromPayment?.lastName}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Phone Number:{" "}
                            <span className="text-sm font-normal">
                              {bookingFromPayment?.user?.mobile ??
                                bookingFromPayment?.mobile}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Email Address:{" "}
                            <span className="text-sm font-normal">
                              {bookingFromPayment?.user?.email ??
                                bookingFromPayment?.email}
                            </span>{" "}
                          </span>
                        </div>
                      </div>

                      {/* Driver Details */}
                      <div className="mt-5">
                        <h2 className="text-xl font-semibold">
                          Driver Details
                        </h2>

                        {bookingFromPayment?.assignedDriver ? (
                          <div className="flex flex-col gap-y-1">
                            <div className="flex items-center gap-x-2">
                              <div className="h-16 w-16 rounded-full overflow-hidden">
                                <img
                                  src={
                                    bookingFromPayment?.assignedDriver?.image
                                  }
                                  alt={`${bookingFromPayment?.assignedDriver?.firstName} ${bookingFromPayment?.assignedDriver?.lastName}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              <div className="flex flex-col">
                                <span className="text-sm font-semibold">
                                  Full Name:{" "}
                                  <span className="text-sm font-normal">
                                    {
                                      bookingFromPayment?.assignedDriver
                                        ?.firstName
                                    }{" "}
                                    $
                                    {
                                      bookingFromPayment?.assignedDriver
                                        ?.lastName
                                    }
                                  </span>{" "}
                                </span>
                                <span className="text-sm font-semibold">
                                  Email Address:{" "}
                                  <span className="text-sm font-normal">
                                    {bookingFromPayment?.assignedDriver?.email}
                                  </span>{" "}
                                </span>
                                <span className="text-sm font-semibold">
                                  Phone Number:{" "}
                                  <span className="text-sm font-normal">
                                    {bookingFromPayment?.assignedDriver?.mobile}
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
                    {/* {!bookingFromPayment && (
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
                {bookingFromPayment?.bookingType === "Priority" && (
                  <div className="flex text-shuttlelaneBlack items-center justify-center w-full">
                    <div className="lg:w-[70%] w-full mt-10 lg:p-10 p-7 border-[1px] border-shuttlelanePurple border-dashed">
                      <h2 className="text-2xl font-semibold">Trip Details</h2>
                      <span className="text-sm text-slate-400">
                        Priority Pass Booking
                      </span>
                      <div className="flex items-center gap-x-1">
                        <span className="text-sm">
                          {bookingFromPayment?.booking?.passengers} passengers
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span className="text-sm">
                          {moment(
                            bookingFromPayment?.booking?.pickupDate
                          ).format("MMM DD, YYYY")}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span className="text-sm">
                          {moment(
                            bookingFromPayment?.booking?.pickupTime
                          ).format("H:MM A")}
                        </span>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <span className="text-sm">
                          {bookingFromPayment?.booking?.pass?.name}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span className="text-sm">
                          {bookingFromPayment?.bookingCurrency?.symbol}
                          {Intl.NumberFormat("en-US", {}).format(
                            bookingFromPayment?.bookingTotal
                          )}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span
                          className={`text-sm ${
                            !bookingFromPayment?.paymentId?.paymentStatus
                              ? "text-yellow-500"
                              : bookingFromPayment?.paymentId?.paymentStatus ==
                                "Successful"
                              ? "text-green-500"
                              : bookingFromPayment?.paymentId?.paymentStatus ==
                                "Pending"
                              ? "text-yellow-500"
                              : "text-red-500"
                          }`}
                        >
                          Payment{" "}
                          {bookingFromPayment?.paymentId?.paymentStatus ??
                            "Pending"}
                        </span>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <span className="text-sm">
                          {bookingFromPayment?.booking?.service}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span
                          className={`text-sm ${
                            bookingFromPayment?.bookingStatus == "Completed" ||
                            bookingFromPayment?.bookingStatus == "Ongoing" ||
                            bookingFromPayment?.bookingStatus == "Scheduled"
                              ? "text-green-500"
                              : bookingFromPayment?.bookingStatus ==
                                  "Awaiting response" ||
                                bookingFromPayment?.bookingStatus ==
                                  "Not yet assigned"
                              ? "text-yellow-500"
                              : "text-red-500"
                          }`}
                        >
                          {bookingFromPayment?.bookingStatus}
                        </span>
                      </div>
                      <div className="flex flex-col mt-4 gap-y-1">
                        <div className="flex items-center gap-x-1">
                          <MdLocationPin size={24} className="text-green-500" />
                          <span className="text-sm">
                            {bookingFromPayment?.booking?.pickupAddress}
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
                              {bookingFromPayment?.user?.firstName ??
                                bookingFromPayment?.firstName}{" "}
                              {bookingFromPayment?.user?.lastName ??
                                bookingFromPayment?.lastName}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Phone Number:{" "}
                            <span className="text-sm font-normal">
                              {bookingFromPayment?.user?.mobile ??
                                bookingFromPayment?.mobile}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Email Address:{" "}
                            <span className="text-sm font-normal">
                              {bookingFromPayment?.user?.email ??
                                bookingFromPayment?.email}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Airline:{" "}
                            <span className="text-sm font-normal">
                              {bookingFromPayment?.booking?.airline}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Flight Number:{" "}
                            <span className="text-sm font-normal">
                              {bookingFromPayment?.booking?.flightNumber}
                            </span>{" "}
                          </span>
                        </div>
                      </div>

                      {/* Driver Details */}
                      <div className="mt-5">
                        <h2 className="text-xl font-semibold">
                          Driver Details
                        </h2>

                        {bookingFromPayment?.assignedDriver ? (
                          <div className="flex flex-col gap-y-1">
                            <div className="flex items-center gap-x-2">
                              <div className="h-16 w-16 rounded-full overflow-hidden">
                                <img
                                  src={
                                    bookingFromPayment?.assignedDriver?.image
                                  }
                                  alt={`${bookingFromPayment?.assignedDriver?.firstName} ${bookingFromPayment?.assignedDriver?.lastName}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              <div className="flex flex-col">
                                <span className="text-sm font-semibold">
                                  Full Name:{" "}
                                  <span className="text-sm font-normal">
                                    {
                                      bookingFromPayment?.assignedDriver
                                        ?.firstName
                                    }{" "}
                                    $
                                    {
                                      bookingFromPayment?.assignedDriver
                                        ?.lastName
                                    }
                                  </span>{" "}
                                </span>
                                <span className="text-sm font-semibold">
                                  Email Address:{" "}
                                  <span className="text-sm font-normal">
                                    {bookingFromPayment?.assignedDriver?.email}
                                  </span>{" "}
                                </span>
                                <span className="text-sm font-semibold">
                                  Phone Number:{" "}
                                  <span className="text-sm font-normal">
                                    {bookingFromPayment?.assignedDriver?.mobile}
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
                        {bookingFromPayment?.assignedDriver ? (
                          <div className="flex flex-col gap-y-1">
                            <span className="text-sm font-semibold">
                              Type:{" "}
                              <span className="text-sm font-normal">
                                {bookingFromPayment?.assignedDriver?.carType}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Name:{" "}
                              <span className="text-sm font-normal">
                                {bookingFromPayment?.assignedDriver?.carName}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Model:{" "}
                              <span className="text-sm font-normal">
                                {bookingFromPayment?.assignedDriver?.carModel}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Year:{" "}
                              <span className="text-sm font-normal">
                                {bookingFromPayment?.assignedDriver?.carYear}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Plate Number:{" "}
                              <span className="text-sm font-normal">
                                {
                                  bookingFromPayment?.assignedDriver
                                    ?.carPlateNumber
                                }
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Color:{" "}
                              <span className="text-sm font-normal">
                                {bookingFromPayment?.assignedDriver?.carColor}
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
                    {/* {!bookingFromPayment && (
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
                {bookingFromPayment?.bookingType === "Visa" && (
                  <div className="flex text-shuttlelaneBlack items-center justify-center w-full">
                    <div className="lg:w-[70%] w-full mt-10 lg:p-10 p-7 border-[1px] border-shuttlelanePurple border-dashed">
                      <h2 className="text-2xl font-semibold">Trip Details</h2>
                      <span className="text-sm text-slate-400">
                        Visa On Arrival Booking
                      </span>
                      <div className="flex items-center gap-x-1">
                        <span className="text-sm">
                          {bookingFromPayment?.booking?.airline}{" "}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span className="text-sm">
                          {moment(
                            bookingFromPayment?.booking?.departureDate
                          ).format("MMM DD, YYYY")}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span className="text-sm">
                          {moment(
                            bookingFromPayment?.booking?.arrivalDate
                          ).format("MMM DD, YYYY")}
                        </span>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <span className="text-sm">
                          {bookingFromPayment?.booking?.bookingReference}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span className="text-sm">
                          $
                          {Intl.NumberFormat("en-US", {}).format(
                            bookingFromPayment?.bookingTotal
                          )}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span
                          className={`text-sm ${
                            !bookingFromPayment?.paymentId?.paymentStatus
                              ? "text-yellow-500"
                              : bookingFromPayment?.paymentId?.paymentStatus ==
                                "Successful"
                              ? "text-green-500"
                              : bookingFromPayment?.paymentId?.paymentStatus ==
                                "Pending"
                              ? "text-yellow-500"
                              : "text-red-500"
                          }`}
                        >
                          Payment{" "}
                          {bookingFromPayment?.paymentId?.paymentStatus ??
                            "Pending"}
                        </span>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <span className="text-sm">
                          {bookingFromPayment?.booking?.flightNumber}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span
                          className={`text-sm ${
                            bookingFromPayment?.bookingStatus == "Completed" ||
                            bookingFromPayment?.bookingStatus == "Ongoing" ||
                            bookingFromPayment?.bookingStatus == "Scheduled"
                              ? "text-green-500"
                              : bookingFromPayment?.bookingStatus ==
                                  "Awaiting response" ||
                                bookingFromPayment?.bookingStatus ==
                                  "Not yet assigned"
                              ? "text-yellow-500"
                              : "text-red-500"
                          }`}
                        >
                          {bookingFromPayment?.bookingStatus}
                        </span>
                      </div>
                      <div className="flex flex-col mt-4 gap-y-1">
                        <div className="flex items-center gap-x-1">
                          <div className="ml-1 h-4 w-4 border-[.5px] border-shuttlelaneBlack rounded-full"></div>
                          <span className="text-sm">
                            {bookingFromPayment?.booking?.countryOfDeparture}
                          </span>
                        </div>
                        <div className="border-r-[1px] border-r-shuttlelanePurple h-5 w-3 border-dashed"></div>

                        <div className="flex items-center gap-x-1">
                          <MdLocationPin size={24} className="text-green-500" />
                          <span className="text-sm">
                            {bookingFromPayment?.booking?.portOfEntry}
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
                              {bookingFromPayment?.booking?.nationality}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Class Of Visa:{" "}
                            <span className="text-sm font-normal">
                              {bookingFromPayment?.booking?.visaClass}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Passport Type:{" "}
                            <span className="text-sm font-normal">
                              {bookingFromPayment?.booking?.passportType}
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
                              {bookingFromPayment?.booking?.title}{" "}
                              {bookingFromPayment?.booking?.surname}{" "}
                              {bookingFromPayment?.booking?.middleName}{" "}
                              {bookingFromPayment?.booking?.firstName}{" "}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Email Address:{" "}
                            <span className="text-sm font-normal">
                              {bookingFromPayment?.booking?.email}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Date Of Birth:{" "}
                            <span className="text-sm font-normal">
                              {moment(
                                bookingFromPayment?.booking?.dateOfBirth
                              ).format("MMM DD, YYYY")}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Place Of Birth:{" "}
                            <span className="text-sm font-normal">
                              {bookingFromPayment?.booking?.placeOfBirth}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Gender:{" "}
                            <span className="text-sm font-normal">
                              {bookingFromPayment?.booking?.gender}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Marital Status:{" "}
                            <span className="text-sm font-normal">
                              {bookingFromPayment?.booking?.maritalStatus}
                            </span>{" "}
                          </span>

                          <span className="text-sm font-semibold">
                            Passport Number:{" "}
                            <span className="text-sm font-normal">
                              {bookingFromPayment?.booking?.passportNumber}
                            </span>{" "}
                          </span>

                          <span className="text-sm font-semibold">
                            Passport Expiry Date:{" "}
                            <span className="text-sm font-normal">
                              {moment(
                                bookingFromPayment?.booking?.passportExpiryDate
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
                              {bookingFromPayment?.booking?.purposeOfJourney}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Airline:{" "}
                            <span className="text-sm font-normal">
                              {bookingFromPayment?.booking?.airline}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Flight Number:{" "}
                            <span className="text-sm font-normal">
                              {bookingFromPayment?.booking?.flightNumber}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Country Of Departure:{" "}
                            <span className="text-sm font-normal">
                              {bookingFromPayment?.booking?.countryOfDeparture}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Departure Date:{" "}
                            <span className="text-sm font-normal">
                              {moment(
                                bookingFromPayment?.booking?.departureDate
                              ).format("MMM DD, YYYY")}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Arrival Date:{" "}
                            <span className="text-sm font-normal">
                              {moment(
                                bookingFromPayment?.booking?.arrivalDate
                              ).format("MMM DD, YYYY")}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Port Of Entry:{" "}
                            <span className="text-sm font-normal">
                              {bookingFromPayment?.booking?.portOfEntry}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Duration Of Stay:{" "}
                            <span className="text-sm font-normal">
                              {bookingFromPayment?.booking?.durationOfStay} days
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
                              {bookingFromPayment?.booking?.contactName}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Phone Number:{" "}
                            <span className="text-sm font-normal">
                              {bookingFromPayment?.booking?.contactNumber}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Address:{" "}
                            <span className="text-sm font-normal">
                              {bookingFromPayment?.booking?.contactAddress}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            City:{" "}
                            <span className="text-sm font-normal">
                              {bookingFromPayment?.booking?.contactCity}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            State:{" "}
                            <span className="text-sm font-normal">
                              {bookingFromPayment?.booking?.contactState}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Email Address:{" "}
                            <span className="text-sm font-normal">
                              {bookingFromPayment?.booking?.contactEmail}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Postal Code:{" "}
                            <span className="text-sm font-normal">
                              {bookingFromPayment?.booking?.contactPostalCode}
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
                    {/* {!bookingFromPayment && (
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

        {isLoading && (
          <div className="h-64 w-54 p-8 rounded-lg flex flex-col items-center justify-center text-center">
            <ImSpinner2
              size={40}
              className="text-shuttlelanePurple animate-spin"
            />
          </div>
        )}
      </div>
    </div>
  );
}
