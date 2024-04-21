import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPassport, FaTrash, FaUser } from "react-icons/fa";
import {
  MdLocationPin,
  MdLuggage,
  MdOutlineFlightTakeoff,
} from "react-icons/md";
import { IoCarSport } from "react-icons/io5";
import AdminDashboardNavbar from "../../../../../components/ui/Admin/AdminDashboardNavbar";
import { HiOutlineExternalLink } from "react-icons/hi";
import Chart from "react-apexcharts";
import { BiSearch } from "react-icons/bi";
import AdminTopBar from "../../../../../components/ui/Admin/AdminTopBar";
import { LuCopy } from "react-icons/lu";
import { AiFillDelete, AiOutlineCheckCircle } from "react-icons/ai";
import {
  adminFetchUpcomingBookings,
  deleteBooking,
  fetchAllBookings,
  fetchBookingByReference,
} from "../../../../../redux/slices/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Modal as RsuiteModal, Button } from "rsuite";
import Modal from "react-modal";
import { FaXmark } from "react-icons/fa6";
import { ImSpinner2 } from "react-icons/im";
import { Helmet } from "react-helmet";

function AdminDashboardVisaOnArrivalPage() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const {
    isLoading,
    token,
    admin,
    users,
    drivers,
    approvedDrivers,
    vendors,
    approvedVendors,
    upcomingBookings,
    unassignedBookings,
    bookingFetchedByReference,
    isGetBookingByReferenceLoading,
    visaOnArrivalBookings,
  } = useSelector((store) => store.admin);
  const dispatch = useDispatch();

  // Chart Setup
  const state = {
    options: {
      chart: {
        id: "apexchart-example",
        fontFamily: "Poppins",
        style: {
          fontSize: ".8rem",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        colors: ["#E2B442", "#262471"],
      },
      fill: {
        colors: ["#E2B442", "#262471"],
        pattern: {
          style: "circles",
          strokeWidth: 1,
          height: 1,
          width: 1,
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      yaxis: {
        labels: {
          show: true,
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: [],
            fontSize: "30px",
            fontFamily: "Poppins",
            cssClass: "text-xs",
          },
          formatter: (value) => {
            const formattedValue = Intl.NumberFormat("en-US", {}).format(value);
            return formattedValue;
          },
        },
      },
    },
    series: [
      {
        name: "",
        data: [
          3000, 50000, 25000, 45000, 60000, 30000, 40000, 51000, 135000, 33000,
          200000, 400000,
        ],
      },
    ],
  };

  const [bookings, setBookings] = useState();

  useEffect(() => {
    dispatch(adminFetchUpcomingBookings(token));
    dispatch(fetchAllBookings(token));
  }, [token]);

  // DELETE BOOKING DIALOG STATES
  const [currentBooking, setCurrentBooking] = useState();
  const [isDeleteBookingDialogOpen, setIsDeleteBookingDialogOpen] =
    useState(false);
  async function handleDeleteBooking() {
    dispatch(
      deleteBooking({
        token,
        _id: currentBooking?._id,
      })
    );
    dispatch(adminFetchUpcomingBookings(token));
    dispatch(fetchAllBookings(token));
    setIsDeleteBookingDialogOpen(false);
  }

  // Fetch booking by reference
  useEffect(() => {
    if (currentBooking)
      dispatch(fetchBookingByReference(currentBooking?.bookingReference));
  }, [currentBooking]);

  // Format upcoming airport transfer bookings
  const [upcomingVisaOnArrivalBookings, setUpcomingVisaOnArrivalBookings] =
    useState();
  useEffect(() => {
    if (upcomingBookings) {
      const voaBookings = upcomingBookings?.filter(
        (booking) => booking?.bookingType == "Visa"
      );
      setUpcomingVisaOnArrivalBookings(voaBookings);
    }
  }, [upcomingBookings]);

  // Booking Details Modal States
  const [isBookingDetailsModalOpen, setIsBookingDetailsModalOpen] =
    useState(false);

  return (
    <div className="">
      <Helmet>
        <title>
          Visa On Arrival Bookings | Shuttlelane Portal Admin Dashboard
        </title>
      </Helmet>

      {/* Delete Booking dialog */}
      <RsuiteModal
        backdrop="static"
        role="alertdialog"
        open={isDeleteBookingDialogOpen}
        onClose={() => setIsDeleteBookingDialogOpen(false)}
        size="xs"
      >
        <RsuiteModal.Body>
          {/* <RemindIcon style={{ color: '#ffb300', fontSize: 24 }} /> */}
          This booking will be permanently deleted from the database. This
          action is irreversible. Are you sure you want to proceed ?
        </RsuiteModal.Body>
        <RsuiteModal.Footer>
          <Button onClick={() => handleDeleteBooking()} appearance="primary">
            Ok
          </Button>
          <Button
            onClick={() => setIsDeleteBookingDialogOpen(false)}
            appearance="subtle"
          >
            Cancel
          </Button>
        </RsuiteModal.Footer>
      </RsuiteModal>

      {/* Booking Details Modal */}
      <Modal
        isOpen={isBookingDetailsModalOpen}
        onRequestClose={() => setIsBookingDetailsModalOpen(false)}
        className="flex h-full min-h-screen justify-center items-center lg:px-40 px-7"
      >
        {!isGetBookingByReferenceLoading && (
          <div className="bg-white pb-10 shadow-lg rounded-lg text-shuttlelaneBlack w-full min-h-[80%] max-h-[80%] h-[80%] lg:w-[60%] p-7 px-10 overflow-y-scroll shuttlelaneScrollbar">
            <div className="flex items-center justify-end">
              <FaXmark
                size={20}
                onClick={() => setIsBookingDetailsModalOpen(false)}
                className="cursor-pointer"
              />
            </div>

            <div className="h-full flex flex-col gap-y-5 pb-20">
              <>
                {currentBooking?.bookingType === "Airport" && (
                  <div className="flex items-center justify-center w-full pb-20">
                    <div className="w-full mt-10 lg:p-10 p-7 border-[1px] border-shuttlelanePurple border-dashed">
                      <h2 className="text-2xl font-semibold">Trip Details</h2>
                      <span className="text-sm text-slate-400">
                        Airport Transfer Booking
                      </span>
                      <div className="flex items-center gap-x-1">
                        <span className="text-sm">
                          {currentBooking?.booking?.passengers} passengers
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span className="text-sm">
                          {moment(currentBooking?.booking?.pickupDate).format(
                            "MMM DD, YYYY"
                          )}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span className="text-sm">
                          {moment(currentBooking?.booking?.pickupTime).format(
                            "H:MM A"
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <span className="text-sm">
                          {currentBooking?.bookingCurrency?.symbol}
                          {Intl.NumberFormat("en-US", {}).format(
                            currentBooking?.bookingTotal
                          )}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span
                          className={`text-sm ${
                            !currentBooking?.paymentId?.paymentStatus
                              ? "text-yellow-500"
                              : currentBooking?.paymentId?.paymentStatus ==
                                "Successful"
                              ? "text-green-500"
                              : currentBooking?.paymentId?.paymentStatus ==
                                "Pending"
                              ? "text-yellow-500"
                              : "text-red-500"
                          }`}
                        >
                          Payment{" "}
                          {currentBooking?.paymentId?.paymentStatus ??
                            "Pending"}
                        </span>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <span className="text-sm">
                          {currentBooking?.booking?.vehicleClass?.className}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span
                          className={`text-sm ${
                            currentBooking?.bookingStatus == "Completed" ||
                            currentBooking?.bookingStatus == "Ongoing" ||
                            currentBooking?.bookingStatus == "Scheduled"
                              ? "text-green-500"
                              : currentBooking?.bookingStatus ==
                                  "Awaiting response" ||
                                currentBooking?.bookingStatus ==
                                  "Not yet assigned"
                              ? "text-yellow-500"
                              : "text-red-500"
                          }`}
                        >
                          {currentBooking?.bookingStatus}
                        </span>
                      </div>
                      <div className="flex flex-col mt-4 gap-y-1">
                        <div className="flex items-center gap-x-1">
                          <div className="ml-1 h-4 w-4 border-[.5px] border-shuttlelaneBlack rounded-full"></div>
                          <span className="text-sm">
                            {currentBooking?.booking?.pickupAddress}
                          </span>
                        </div>
                        <div className="border-r-[1px] border-r-shuttlelanePurple h-5 w-3 border-dashed"></div>
                        <div className="flex items-center gap-x-1">
                          <MdLocationPin size={24} className="text-green-500" />
                          <span className="text-sm">
                            {currentBooking?.booking?.dropoffAddress}
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
                              {currentBooking?.user?.firstName ??
                                currentBooking?.firstName}{" "}
                              {currentBooking?.user?.lastName ??
                                currentBooking?.lastName}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Phone Number:{" "}
                            <span className="text-sm font-normal">
                              {currentBooking?.user?.mobile ??
                                currentBooking?.mobile}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Email Address:{" "}
                            <span className="text-sm font-normal">
                              {currentBooking?.user?.email ??
                                currentBooking?.email}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Airline:{" "}
                            <span className="text-sm font-normal">
                              {currentBooking?.booking?.airline}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Flight Number:{" "}
                            <span className="text-sm font-normal">
                              {currentBooking?.booking?.flightNumber}
                            </span>{" "}
                          </span>
                        </div>
                      </div>

                      {/* Driver Details */}
                      <div className="mt-5">
                        <h2 className="text-xl font-semibold">
                          Driver Details
                        </h2>

                        {currentBooking?.assignedDriver ||
                        currentBooking?.vendorAssignedDriver ? (
                          <div className="flex flex-col gap-y-1">
                            <div className="flex items-center gap-x-2">
                              <div className="h-16 w-16 rounded-full overflow-hidden">
                                <img
                                  src={
                                    currentBooking?.assignedDriver?.image ??
                                    currentBooking?.vendorAssignedDriver?.image
                                  }
                                  alt={`${
                                    currentBooking?.assignedDriver?.firstName ??
                                    currentBooking?.vendorAssignedDriver
                                      ?.firstName
                                  } ${
                                    currentBooking?.assignedDriver?.lastName ??
                                    currentBooking?.vendorAssignedDriver
                                      ?.lastName
                                  }`}
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              <div className="flex flex-col">
                                <span className="text-sm font-semibold">
                                  Full Name:{" "}
                                  <span className="text-sm font-normal">
                                    {currentBooking?.assignedDriver
                                      ?.firstName ??
                                      currentBooking?.vendorAssignedDriver
                                        ?.firstName}{" "}
                                    $
                                    {currentBooking?.assignedDriver?.lastName ??
                                      currentBooking?.vendorAssignedDriver
                                        ?.lastName}
                                  </span>{" "}
                                </span>
                                <span className="text-sm font-semibold">
                                  Email Address:{" "}
                                  <span className="text-sm font-normal">
                                    {currentBooking?.assignedDriver?.email ??
                                      currentBooking?.vendorAssignedDriver
                                        ?.email}
                                  </span>{" "}
                                </span>
                                <span className="text-sm font-semibold">
                                  Phone Number:{" "}
                                  <span className="text-sm font-normal">
                                    {currentBooking?.assignedDriver?.mobile ??
                                      currentBooking?.vendorAssignedDriver
                                        ?.mobile}
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
                        {currentBooking?.assignedDriver ||
                        currentBooking?.assignedCar ? (
                          <div className="flex flex-col gap-y-1">
                            <span className="text-sm font-semibold">
                              Type:{" "}
                              <span className="text-sm font-normal">
                                {currentBooking?.assignedDriver?.carType ??
                                  currentBooking?.assignedCar?.carType}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Name:{" "}
                              <span className="text-sm font-normal">
                                {currentBooking?.assignedDriver?.carName ??
                                  currentBooking?.assignedCar?.carName}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Model:{" "}
                              <span className="text-sm font-normal">
                                {currentBooking?.assignedDriver?.carModel ??
                                  currentBooking?.assignedCar?.carModel}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Year:{" "}
                              <span className="text-sm font-normal">
                                {currentBooking?.assignedDriver?.carYear ??
                                  currentBooking?.assignedCar?.carYear}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Plate Number:{" "}
                              <span className="text-sm font-normal">
                                {currentBooking?.assignedDriver
                                  ?.carPlateNumber ??
                                  currentBooking?.assignedCar?.carPlateNumber}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Color:{" "}
                              <span className="text-sm font-normal">
                                {currentBooking?.assignedDriver?.carColor ??
                                  currentBooking?.assignedCar?.carColor}
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
                    {/* {!currentBooking && (
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
                {currentBooking?.bookingType === "Car" && (
                  <div className="flex items-center justify-center w-full pb-20">
                    <div className="w-full mt-10 lg:p-10 p-7 border-[1px] border-shuttlelanePurple border-dashed">
                      <h2 className="text-2xl font-semibold">Trip Details</h2>
                      <span className="text-sm text-slate-400">
                        Car Rental Booking
                      </span>
                      <div className="flex items-center gap-x-1">
                        <span className="text-sm">
                          {currentBooking?.booking?.days} days
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span className="text-sm">
                          {moment(currentBooking?.booking?.pickupDate).format(
                            "MMM DD, YYYY"
                          )}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span className="text-sm">
                          {moment(currentBooking?.booking?.pickupTime).format(
                            "H:MM A"
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <span className="text-sm">
                          {currentBooking?.bookingCurrency?.symbol}
                          {Intl.NumberFormat("en-US", {}).format(
                            currentBooking?.bookingTotal
                          )}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span
                          className={`text-sm ${
                            !currentBooking?.paymentId?.paymentStatus
                              ? "text-yellow-500"
                              : currentBooking?.paymentId?.paymentStatus ==
                                "Successful"
                              ? "text-green-500"
                              : currentBooking?.paymentId?.paymentStatus ==
                                "Pending"
                              ? "text-yellow-500"
                              : "text-red-500"
                          }`}
                        >
                          Payment{" "}
                          {currentBooking?.paymentId?.paymentStatus ??
                            "Pending"}
                        </span>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <span className="text-sm">
                          {currentBooking?.booking?.car?.name}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span
                          className={`text-sm ${
                            currentBooking?.bookingStatus == "Completed" ||
                            currentBooking?.bookingStatus == "Ongoing" ||
                            currentBooking?.bookingStatus == "Scheduled"
                              ? "text-green-500"
                              : currentBooking?.bookingStatus ==
                                  "Awaiting response" ||
                                currentBooking?.bookingStatus ==
                                  "Not yet assigned"
                              ? "text-yellow-500"
                              : "text-red-500"
                          }`}
                        >
                          {currentBooking?.bookingStatus}
                        </span>
                      </div>
                      <div className="flex flex-col mt-4 gap-y-1">
                        <div className="flex items-center gap-x-1">
                          <MdLocationPin size={24} className="text-green-500" />
                          <span className="text-sm">
                            {currentBooking?.booking?.pickupAddress}
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
                              {currentBooking?.user?.firstName ??
                                currentBooking?.firstName}{" "}
                              {currentBooking?.user?.lastName ??
                                currentBooking?.lastName}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Phone Number:{" "}
                            <span className="text-sm font-normal">
                              {currentBooking?.user?.mobile ??
                                currentBooking?.mobile}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Email Address:{" "}
                            <span className="text-sm font-normal">
                              {currentBooking?.user?.email ??
                                currentBooking?.email}
                            </span>{" "}
                          </span>
                        </div>
                      </div>
                      {/* Driver Details */}
                      <div className="mt-5">
                        <h2 className="text-xl font-semibold">
                          Driver Details
                        </h2>

                        {currentBooking?.assignedDriver ||
                        currentBooking?.vendorAssignedDriver ? (
                          <div className="flex flex-col gap-y-1">
                            <div className="flex items-center gap-x-2">
                              <div className="h-16 w-16 rounded-full overflow-hidden">
                                <img
                                  src={
                                    currentBooking?.assignedDriver?.image ??
                                    currentBooking?.vendorAssignedDriver?.image
                                  }
                                  alt={`${
                                    currentBooking?.assignedDriver?.firstName ??
                                    currentBooking?.vendorAssignedDriver
                                      ?.firstName
                                  } ${
                                    currentBooking?.assignedDriver?.lastName ??
                                    currentBooking?.vendorAssignedDriver
                                      ?.lastName
                                  }`}
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              <div className="flex flex-col">
                                <span className="text-sm font-semibold">
                                  Full Name:{" "}
                                  <span className="text-sm font-normal">
                                    {currentBooking?.assignedDriver
                                      ?.firstName ??
                                      currentBooking?.vendorAssignedDriver
                                        ?.firstName}{" "}
                                    $
                                    {currentBooking?.assignedDriver?.lastName ??
                                      currentBooking?.vendorAssignedDriver
                                        ?.lastName}
                                  </span>{" "}
                                </span>
                                <span className="text-sm font-semibold">
                                  Email Address:{" "}
                                  <span className="text-sm font-normal">
                                    {currentBooking?.assignedDriver?.email ??
                                      currentBooking?.vendorAssignedDriver
                                        ?.email}
                                  </span>{" "}
                                </span>
                                <span className="text-sm font-semibold">
                                  Phone Number:{" "}
                                  <span className="text-sm font-normal">
                                    {currentBooking?.assignedDriver?.mobile ??
                                      currentBooking?.vendorAssignedDriver
                                        ?.mobile}
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
                    {/* {!currentBooking && (
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
                {currentBooking?.bookingType === "Priority" && (
                  <div className="flex items-center justify-center w-full pb-20">
                    <div className="w-full mt-10 lg:p-10 p-7 border-[1px] border-shuttlelanePurple border-dashed">
                      <h2 className="text-2xl font-semibold">Trip Details</h2>
                      <span className="text-sm text-slate-400">
                        Priority Pass Booking
                      </span>
                      <div className="flex items-center gap-x-1">
                        <span className="text-sm">
                          {currentBooking?.booking?.passengers} passengers
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span className="text-sm">
                          {moment(currentBooking?.booking?.pickupDate).format(
                            "MMM DD, YYYY"
                          )}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span className="text-sm">
                          {moment(currentBooking?.booking?.pickupTime).format(
                            "H:MM A"
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <span className="text-sm">
                          {currentBooking?.booking?.pass?.name}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span className="text-sm">
                          {currentBooking?.bookingCurrency?.symbol}
                          {Intl.NumberFormat("en-US", {}).format(
                            currentBooking?.bookingTotal
                          )}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span
                          className={`text-sm ${
                            !currentBooking?.paymentId?.paymentStatus
                              ? "text-yellow-500"
                              : currentBooking?.paymentId?.paymentStatus ==
                                "Successful"
                              ? "text-green-500"
                              : currentBooking?.paymentId?.paymentStatus ==
                                "Pending"
                              ? "text-yellow-500"
                              : "text-red-500"
                          }`}
                        >
                          Payment{" "}
                          {currentBooking?.paymentId?.paymentStatus ??
                            "Pending"}
                        </span>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <span className="text-sm">
                          {currentBooking?.booking?.service}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span
                          className={`text-sm ${
                            currentBooking?.bookingStatus == "Completed" ||
                            currentBooking?.bookingStatus == "Ongoing" ||
                            currentBooking?.bookingStatus == "Scheduled"
                              ? "text-green-500"
                              : currentBooking?.bookingStatus ==
                                  "Awaiting response" ||
                                currentBooking?.bookingStatus ==
                                  "Not yet assigned"
                              ? "text-yellow-500"
                              : "text-red-500"
                          }`}
                        >
                          {currentBooking?.bookingStatus}
                        </span>
                      </div>
                      <div className="flex flex-col mt-4 gap-y-1">
                        <div className="flex items-center gap-x-1">
                          <MdLocationPin size={24} className="text-green-500" />
                          <span className="text-sm">
                            {currentBooking?.booking?.pickupAddress}
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
                              {currentBooking?.user?.firstName ??
                                currentBooking?.firstName}{" "}
                              {currentBooking?.user?.lastName ??
                                currentBooking?.lastName}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Phone Number:{" "}
                            <span className="text-sm font-normal">
                              {currentBooking?.user?.mobile ??
                                currentBooking?.mobile}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Email Address:{" "}
                            <span className="text-sm font-normal">
                              {currentBooking?.user?.email ??
                                currentBooking?.email}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Airline:{" "}
                            <span className="text-sm font-normal">
                              {currentBooking?.booking?.airline}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Flight Number:{" "}
                            <span className="text-sm font-normal">
                              {currentBooking?.booking?.flightNumber}
                            </span>{" "}
                          </span>
                        </div>
                      </div>
                      {/* Driver Details */}
                      <div className="mt-5">
                        <h2 className="text-xl font-semibold">
                          Driver Details
                        </h2>

                        {currentBooking?.assignedDriver ||
                        currentBooking?.vendorAssignedDriver ? (
                          <div className="flex flex-col gap-y-1">
                            <div className="flex items-center gap-x-2">
                              <div className="h-16 w-16 rounded-full overflow-hidden">
                                <img
                                  src={
                                    currentBooking?.assignedDriver?.image ??
                                    currentBooking?.vendorAssignedDriver?.image
                                  }
                                  alt={`${
                                    currentBooking?.assignedDriver?.firstName ??
                                    currentBooking?.vendorAssignedDriver
                                      ?.firstName
                                  } ${
                                    currentBooking?.assignedDriver?.lastName ??
                                    currentBooking?.vendorAssignedDriver
                                      ?.lastName
                                  }`}
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              <div className="flex flex-col">
                                <span className="text-sm font-semibold">
                                  Full Name:{" "}
                                  <span className="text-sm font-normal">
                                    {currentBooking?.assignedDriver
                                      ?.firstName ??
                                      currentBooking?.vendorAssignedDriver
                                        ?.firstName}{" "}
                                    $
                                    {currentBooking?.assignedDriver?.lastName ??
                                      currentBooking?.vendorAssignedDriver
                                        ?.lastName}
                                  </span>{" "}
                                </span>
                                <span className="text-sm font-semibold">
                                  Email Address:{" "}
                                  <span className="text-sm font-normal">
                                    {currentBooking?.assignedDriver?.email ??
                                      currentBooking?.vendorAssignedDriver
                                        ?.email}
                                  </span>{" "}
                                </span>
                                <span className="text-sm font-semibold">
                                  Phone Number:{" "}
                                  <span className="text-sm font-normal">
                                    {currentBooking?.assignedDriver?.mobile ??
                                      currentBooking?.vendorAssignedDriver
                                        ?.mobile}
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
                        {currentBooking?.assignedDriver ||
                        currentBooking?.assignedCar ? (
                          <div className="flex flex-col gap-y-1">
                            <span className="text-sm font-semibold">
                              Type:{" "}
                              <span className="text-sm font-normal">
                                {currentBooking?.assignedDriver?.carType ??
                                  currentBooking?.assignedCar?.carType}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Name:{" "}
                              <span className="text-sm font-normal">
                                {currentBooking?.assignedDriver?.carName ??
                                  currentBooking?.assignedCar?.carName}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Model:{" "}
                              <span className="text-sm font-normal">
                                {currentBooking?.assignedDriver?.carModel ??
                                  currentBooking?.assignedCar?.carModel}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Year:{" "}
                              <span className="text-sm font-normal">
                                {currentBooking?.assignedDriver?.carYear ??
                                  currentBooking?.assignedCar?.carYear}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Plate Number:{" "}
                              <span className="text-sm font-normal">
                                {currentBooking?.assignedDriver
                                  ?.carPlateNumber ??
                                  currentBooking?.assignedCar?.carPlateNumber}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Color:{" "}
                              <span className="text-sm font-normal">
                                {currentBooking?.assignedDriver?.carColor ??
                                  currentBooking?.assignedCar?.carColor}
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
                    {/* {!currentBooking && (
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
                {currentBooking?.bookingType === "Visa" && (
                  <div className="flex items-center justify-center w-full pb-20">
                    <div className="w-full mt-10 lg:p-10 p-7 border-[1px] border-shuttlelanePurple border-dashed">
                      <h2 className="text-2xl font-semibold">Trip Details</h2>
                      <span className="text-sm text-slate-400">
                        Visa On Arrival Booking
                      </span>
                      <div className="flex items-center gap-x-1">
                        <span className="text-sm">
                          {currentBooking?.booking?.airline}{" "}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span className="text-sm">
                          {moment(
                            currentBooking?.booking?.departureDate
                          ).format("MMM DD, YYYY")}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span className="text-sm">
                          {moment(currentBooking?.booking?.arrivalDate).format(
                            "MMM DD, YYYY"
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <span className="text-sm">
                          {currentBooking?.booking?.bookingReference}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span className="text-sm">
                          $
                          {Intl.NumberFormat("en-US", {}).format(
                            currentBooking?.bookingTotal
                          )}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span
                          className={`text-sm ${
                            !currentBooking?.paymentId?.paymentStatus
                              ? "text-yellow-500"
                              : currentBooking?.paymentId?.paymentStatus ==
                                "Successful"
                              ? "text-green-500"
                              : currentBooking?.paymentId?.paymentStatus ==
                                "Pending"
                              ? "text-yellow-500"
                              : "text-red-500"
                          }`}
                        >
                          Payment{" "}
                          {currentBooking?.paymentId?.paymentStatus ??
                            "Pending"}
                        </span>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <span className="text-sm">
                          {currentBooking?.booking?.flightNumber}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span
                          className={`text-sm ${
                            currentBooking?.bookingStatus == "Completed" ||
                            currentBooking?.bookingStatus == "Ongoing" ||
                            currentBooking?.bookingStatus == "Scheduled"
                              ? "text-green-500"
                              : currentBooking?.bookingStatus ==
                                  "Awaiting response" ||
                                currentBooking?.bookingStatus ==
                                  "Not yet assigned"
                              ? "text-yellow-500"
                              : "text-red-500"
                          }`}
                        >
                          {currentBooking?.bookingStatus}
                        </span>
                      </div>
                      <div className="flex flex-col mt-4 gap-y-1">
                        <div className="flex items-center gap-x-1">
                          <div className="ml-1 h-4 w-4 border-[.5px] border-shuttlelaneBlack rounded-full"></div>
                          <span className="text-sm">
                            {currentBooking?.booking?.countryOfDeparture}
                          </span>
                        </div>
                        <div className="border-r-[1px] border-r-shuttlelanePurple h-5 w-3 border-dashed"></div>

                        <div className="flex items-center gap-x-1">
                          <MdLocationPin size={24} className="text-green-500" />
                          <span className="text-sm">
                            {currentBooking?.booking?.portOfEntry}
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
                              {currentBooking?.booking?.nationality}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Class Of Visa:{" "}
                            <span className="text-sm font-normal">
                              {currentBooking?.booking?.visaClass}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Passport Type:{" "}
                            <span className="text-sm font-normal">
                              {currentBooking?.booking?.passportType}
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
                              {currentBooking?.booking?.title}{" "}
                              {currentBooking?.booking?.surname}{" "}
                              {currentBooking?.booking?.middleName}{" "}
                              {currentBooking?.booking?.firstName}{" "}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Email Address:{" "}
                            <span className="text-sm font-normal">
                              {currentBooking?.booking?.email}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Date Of Birth:{" "}
                            <span className="text-sm font-normal">
                              {moment(
                                currentBooking?.booking?.dateOfBirth
                              ).format("MMM DD, YYYY")}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Place Of Birth:{" "}
                            <span className="text-sm font-normal">
                              {currentBooking?.booking?.placeOfBirth}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Gender:{" "}
                            <span className="text-sm font-normal">
                              {currentBooking?.booking?.gender}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Marital Status:{" "}
                            <span className="text-sm font-normal">
                              {currentBooking?.booking?.maritalStatus}
                            </span>{" "}
                          </span>

                          <span className="text-sm font-semibold">
                            Passport Number:{" "}
                            <span className="text-sm font-normal">
                              {currentBooking?.booking?.passportNumber}
                            </span>{" "}
                          </span>

                          <span className="text-sm font-semibold">
                            Passport Expiry Date:{" "}
                            <span className="text-sm font-normal">
                              {moment(
                                currentBooking?.booking?.passportExpiryDate
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
                              {currentBooking?.booking?.purposeOfJourney}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Airline:{" "}
                            <span className="text-sm font-normal">
                              {currentBooking?.booking?.airline}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Flight Number:{" "}
                            <span className="text-sm font-normal">
                              {currentBooking?.booking?.flightNumber}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Country Of Departure:{" "}
                            <span className="text-sm font-normal">
                              {currentBooking?.booking?.countryOfDeparture}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Departure Date:{" "}
                            <span className="text-sm font-normal">
                              {moment(
                                currentBooking?.booking?.departureDate
                              ).format("MMM DD, YYYY")}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Arrival Date:{" "}
                            <span className="text-sm font-normal">
                              {moment(
                                currentBooking?.booking?.arrivalDate
                              ).format("MMM DD, YYYY")}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Port Of Entry:{" "}
                            <span className="text-sm font-normal">
                              {currentBooking?.booking?.portOfEntry}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Duration Of Stay:{" "}
                            <span className="text-sm font-normal">
                              {currentBooking?.booking?.durationOfStay} days
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
                              {currentBooking?.booking?.contactName}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Phone Number:{" "}
                            <span className="text-sm font-normal">
                              {currentBooking?.booking?.contactNumber}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Address:{" "}
                            <span className="text-sm font-normal">
                              {currentBooking?.booking?.contactAddress}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            City:{" "}
                            <span className="text-sm font-normal">
                              {currentBooking?.booking?.contactCity}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            State:{" "}
                            <span className="text-sm font-normal">
                              {currentBooking?.booking?.contactState}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Email Address:{" "}
                            <span className="text-sm font-normal">
                              {currentBooking?.booking?.contactEmail}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Postal Code:{" "}
                            <span className="text-sm font-normal">
                              {currentBooking?.booking?.contactPostalCode}
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
                    {/* {!currentBooking && (
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
              <ImSpinner2 size={20} className="cursor-loading animate-spin" />
            </div>
          </div>
        )}
      </Modal>

      {/* Navbar here */}
      <AdminDashboardNavbar
        link="bookings"
        sublink="visa-on-arrival"
        isNavbarOpen={isNavbarOpen}
        setIsNavbarOpen={setIsNavbarOpen}
      />

      {/* Main content goes here */}
      <div className="w-full min-h-screen lg:pl-[6%] bg-[#fff] text-shuttlelaneBlack">
        <div className="px-7 py-5 relative z-0">
          {/* Top bar */}
          <AdminTopBar
            isNavbarOpen={isNavbarOpen}
            setIsNavbarOpen={setIsNavbarOpen}
          />

          {/* Main content */}
          <div className="mt-24 pt-2">
            <div className="flex flex-col gap-y-5">
              {/* Booking Summary - Total number of bookings */}
              <div className="w-full">
                <div className="mt-11 w-full">
                  {/* Searchbar */}
                  {/* <div className="flex items-center gap-x-3 border-[1.3px] lg:border-[.3px] border-gray-300 rounded-lg px-2 my-2 lg:w-1/4 w-full">
                    <BiSearch size={16} className="text-gray-400 rotate-90" />
                    <input
                      type="search"
                      placeholder="Search"
                      className="w-full h-8 bg-transparent text-xs focus:outline-none placeholder:text-xs placeholder:text-gray-400"
                    />
                  </div> */}

                  <div className="w-full rounded-lg border-[1.3px] lg:border-[.3px] p-3 border-gray-100 h-auto">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-center gap-x-2">
                        <p className="font-medium">
                          Visa On Arrival Bookings -{" "}
                          {visaOnArrivalBookings?.length}
                        </p>
                        <div className="h-2 w-2 rounded-full bg-shuttlelanePurple"></div>
                      </div>
                    </div>

                    <div className="w-full shuttlelaneScrollbar shuttlelaneScrollbarHoriz overflow-x-scroll">
                      {/* Table header */}
                      <div className="flex lg:w-auto w-max justify-between items-baseline mb-2 border-b-[.3px] border-b-gray-100 text-gray-400 mt-2">
                        <p className="w-[180px] lg:w-[16.6%] text-xs">
                          Booking Ref
                        </p>
                        <p className="w-[180px] lg:w-[16.6%] text-xs">
                          Full name
                        </p>
                        <p className="w-[180px] lg:w-[16.6%] text-xs">
                          Email Address
                        </p>
                        <p className="w-[180px] lg:w-[16.6%] text-xs">Date</p>
                        <p className="w-[180px] lg:w-[16.6%] text-xs">
                          Payment Status
                        </p>
                        <p className="w-[180px] lg:w-[16.6%] text-xs">
                          Actions
                        </p>
                      </div>

                      {!isLoading && (
                        <>
                          {visaOnArrivalBookings?.map((booking) => (
                            <div className="cursor-pointer flex lg:w-auto w-max justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                              <p
                                onClick={() => {
                                  setCurrentBooking(booking);
                                  console.log("current booking:", booking);
                                  setIsBookingDetailsModalOpen(true);
                                }}
                                className="w-[180px] lg:w-[16.6%] text-xs flex items-center gap-x-2"
                              >
                                <span className="text-xs">
                                  {booking?.bookingReference}
                                </span>
                                {/* <LuCopy
                              size={14}
                              className="text-shuttlelaneBlack"
                            />
                            <AiOutlineCheckCircle
                              size={14}
                              className="text-green-500"
                            /> */}
                              </p>
                              <p
                                onClick={() => {
                                  setCurrentBooking(booking);
                                  console.log("current booking:", booking);
                                  setIsBookingDetailsModalOpen(true);
                                }}
                                className="w-[180px] lg:w-[16.6%] text-xs"
                              >
                                {booking?.user?.firstName ?? booking?.firstName}{" "}
                                {booking?.user?.lastName ?? booking?.lastName}
                              </p>
                              <p
                                onClick={() => {
                                  setCurrentBooking(booking);
                                  console.log("current booking:", booking);
                                  setIsBookingDetailsModalOpen(true);
                                }}
                                className="w-[180px] lg:w-[16.6%] text-xs"
                              >
                                {booking?.user?.email ?? booking?.email}
                              </p>
                              <p
                                onClick={() => {
                                  setCurrentBooking(booking);
                                  console.log("current booking:", booking);
                                  setIsBookingDetailsModalOpen(true);
                                }}
                                className="w-[180px] lg:w-[16.6%] text-xs"
                              >
                                {moment(booking?.pickupDate).format(
                                  "MMM DD, YYYY"
                                )}
                              </p>

                              <div
                                onClick={() => {
                                  setCurrentBooking(booking);
                                  console.log("current booking:", booking);
                                  setIsBookingDetailsModalOpen(true);
                                }}
                                className="w-[180px] lg:w-[16.6%] flex items-center gap-x-1"
                              >
                                <div
                                  className={`h-2 w-2 ${
                                    booking?.paymentId?.paymentStatus ===
                                    "Failed"
                                      ? "bg-red-500"
                                      : booking?.paymentId?.paymentStatus ===
                                        "Successful"
                                      ? "bg-green-500"
                                      : "bg-yellow-500"
                                  } rounded-full`}
                                ></div>
                                <span
                                  className={`text-xs ${
                                    booking?.paymentId?.paymentStatus ===
                                    "Failed"
                                      ? "text-red-500"
                                      : booking?.paymentId?.paymentStatus ===
                                        "Successful"
                                      ? "text-green-500"
                                      : "text-yellow-500"
                                  }`}
                                >
                                  {booking?.paymentId?.paymentStatus ??
                                    "Pending"}
                                </span>
                              </div>

                              <div className="w-[180px] lg:w-[16.6%] flex items-center gap-x-3">
                                <Link
                                  to="/booking/track-booking"
                                  target="_blank"
                                  className="hover:border-b-[.3px] hover:border-b-shuttlelaneBlack text-xs"
                                >
                                  <HiOutlineExternalLink
                                    size={13}
                                    className="text-shuttlelaneBlack"
                                  />
                                </Link>

                                {admin?.role !== "Blogger" && (
                                  <FaTrash
                                    onClick={() => {
                                      setCurrentBooking(booking);
                                      setIsDeleteBookingDialogOpen(true);
                                    }}
                                    size={13}
                                    className="text-red-400 cursor-pointer"
                                  />
                                )}
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                      {!isLoading && visaOnArrivalBookings?.length < 1 && (
                        <div className="flex justify-center items-center w-full">
                          <p className="text-sm">
                            There are no visa on arrival bookings for now.
                          </p>
                        </div>
                      )}

                      {isLoading && (
                        <div className="flex w-full h-full items-center justify-center">
                          <ImSpinner2
                            size={20}
                            className="cursor-loading animate-spin"
                          />
                        </div>
                      )}
                    </div>
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

export default AdminDashboardVisaOnArrivalPage;
