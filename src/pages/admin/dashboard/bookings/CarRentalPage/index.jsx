import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCheck, FaPassport, FaTrash, FaUser } from "react-icons/fa";
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
  fetchUpcomingCarBookings,
  updateBookingStatus,
} from "../../../../../redux/slices/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Modal as RsuiteModal, Button } from "rsuite";
import Modal from "react-modal";
import { FaXmark } from "react-icons/fa6";
import { ImSpinner2 } from "react-icons/im";
import { Helmet } from "react-helmet";

function AdminDashboardCarRentalPage() {
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
    carRentalBookings,
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
    // dispatch(adminFetchUpcomingBookings(token));
    dispatch(fetchUpcomingCarBookings(token));
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
    dispatch(fetchUpcomingCarBookings(token));
    setIsDeleteBookingDialogOpen(false);
  }

  // Fetch booking by reference
  useEffect(() => {
    if (currentBooking)
      dispatch(fetchBookingByReference(currentBooking?.bookingReference));
  }, [currentBooking]);

  // Booking Details Modal States
  const [isBookingDetailsModalOpen, setIsBookingDetailsModalOpen] =
    useState(false);

  // Update Booking Status Modal States
  const [isUpdateBookingStatusModalOpen, setIsUpdateBookingStatusModalOpen] =
    useState(false);

  const [selectedBookingStatus, setSelectedBookingStatus] = useState();

  async function handleUpdateBookingStatus() {
    dispatch(
      updateBookingStatus({
        token: token,
        bookingId: currentBooking?._id,
        status: selectedBookingStatus,
        bookingType: "car",
      })
    );

    setIsUpdateBookingStatusModalOpen(false);
  }

  return (
    <div className="">
      <Helmet>
        <title>Car Rental Bookings | Shuttlelane Portal Admin Dashboard</title>
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
                            "LL"
                          )}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span className="text-sm">
                          {moment(currentBooking?.booking?.pickupTime).format(
                            "H:mm A"
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <span className="text-sm">
                          {currentBooking?.bookingCurrency?.symbol}
                          {bookingFetchedByReference?.paymentId?.gateway ==
                            "Admin Dashboard" && "₦"}
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
                          {
                            bookingFetchedByReference?.booking?.vehicleClass
                              ?.className
                          }
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
                      {currentBooking?.hasPriorityPass && (
                        <div className="flex items-center gap-x-1">
                          <span className="text-sm">
                            {currentBooking?.booking?.priorityPassCount}
                            {currentBooking?.booking?.priorityPassType?.name}
                          </span>
                        </div>
                      )}
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
                            "LL"
                          )}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span className="text-sm">
                          {moment(currentBooking?.booking?.pickupTime).format(
                            "H:mm A"
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <span className="text-sm">
                          {currentBooking?.bookingCurrency?.symbol}
                          {bookingFetchedByReference?.paymentId?.gateway ==
                            "Admin Dashboard" && "₦"}
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
                          {bookingFetchedByReference?.booking?.car?.name}
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
                            "LL"
                          )}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span className="text-sm">
                          {moment(currentBooking?.booking?.pickupTime).format(
                            "H:mm A"
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <span className="text-sm">
                          {bookingFetchedByReference?.booking?.pass?.name}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span className="text-sm">
                          {currentBooking?.bookingCurrency?.symbol}
                          {bookingFetchedByReference?.paymentId?.gateway ==
                            "Admin Dashboard" && "₦"}
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
                          ).format("LL")}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span className="text-sm">
                          {moment(currentBooking?.booking?.arrivalDate).format(
                            "LL"
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
                              ).format("LL")}
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
                              ).format("LL")}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Arrival Date:{" "}
                            <span className="text-sm font-normal">
                              {moment(
                                currentBooking?.booking?.arrivalDate
                              ).format("LL")}
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
              <ImSpinner2
                size={20}
                onClick={() => setIsBookingDetailsModalOpen(false)}
                className="cursor-loading animate-spin"
              />
            </div>
          </div>
        )}
      </Modal>

      {/* Update Booking Status Modal */}
      <Modal
        isOpen={isUpdateBookingStatusModalOpen}
        onRequestClose={() => setIsUpdateBookingStatusModalOpen(false)}
        className="flex h-full min-h-screen justify-center items-center lg:px-40 px-7"
      >
        {!isGetBookingByReferenceLoading && (
          <div className="bg-white pb-10 shadow-lg rounded-lg text-shuttlelaneBlack w-full min-h-[80%] max-h-[80%] h-[80%] lg:w-[60%] p-7 px-10 overflow-y-scroll shuttlelaneScrollbar">
            <div className="flex items-center justify-between">
              <FaXmark
                size={20}
                onClick={() => setIsUpdateBookingStatusModalOpen(false)}
                className="cursor-pointer"
              />

              <button
                className={`h-10 w-28 px-4 rounded-md ${
                  selectedBookingStatus
                    ? "bg-shuttlelanePurple text-white"
                    : "bg-gray-300 text-slate-500"
                } `}
                onClick={() => {
                  handleUpdateBookingStatus();
                }}
                disabled={!selectedBookingStatus}
              >
                Save
              </button>
            </div>

            <div className="h-full flex flex-col gap-y-5 pb-20 mt-5">
              <div className="">
                <h2 className="text-2xl font-semibold">
                  Update Booking Status
                </h2>
                <span className="text-sm text-slate-400">
                  Ref: {bookingFetchedByReference?.bookingReference}
                </span>

                {/* Booking status */}
                <div className="flex flex-row items-center gap-3 flex-wrap mt-2">
                  <button
                    className={`flex items-center gap-x-2 border-[1px] ${
                      selectedBookingStatus == "Completed"
                        ? "border-none bg-shuttlelanePurple text-white"
                        : "border-slate-400 text-slate-400"
                    } p-1 px-4 rounded-full`}
                    onClick={() => setSelectedBookingStatus("Completed")}
                  >
                    <span className="text-sm ">Completed</span>
                    {selectedBookingStatus == "Completed" && (
                      <FaCheck size={16} />
                    )}
                  </button>
                  <button
                    className={`flex items-center gap-x-2 border-[1px] ${
                      selectedBookingStatus == "Canceled"
                        ? "border-none bg-shuttlelanePurple text-white"
                        : "border-slate-400 text-slate-400"
                    } p-1 px-4 rounded-full`}
                    onClick={() => setSelectedBookingStatus("Canceled")}
                  >
                    <span className="text-sm ">Canceled</span>
                    {selectedBookingStatus == "Canceled" && (
                      <FaCheck size={16} />
                    )}
                  </button>
                  <button
                    className={`flex items-center gap-x-2 border-[1px] ${
                      selectedBookingStatus == "Customer no show"
                        ? "border-none bg-shuttlelanePurple text-white"
                        : "border-slate-400 text-slate-400"
                    } p-1 px-4 rounded-full`}
                    onClick={() => setSelectedBookingStatus("Customer no show")}
                  >
                    <span className="text-sm ">Customer no show</span>
                    {selectedBookingStatus == "Customer no show" && (
                      <FaCheck size={16} />
                    )}
                  </button>
                </div>
              </div>
              <>
                {bookingFetchedByReference?.bookingType === "Airport" && (
                  <div className="flex items-center justify-center w-full pb-20">
                    <div className="w-full mt-5 lg:p-10 p-7 border-[1px] border-shuttlelanePurple border-dashed">
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
                          ).format("LL")}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span className="text-sm">
                          {moment(
                            bookingFetchedByReference?.booking?.pickupTime
                          ).format("H:mm A")}
                        </span>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <span className="text-sm">
                          {bookingFetchedByReference?.bookingCurrency?.symbol}
                          {bookingFetchedByReference?.paymentId?.gateway ==
                            "Admin Dashboard" && "₦"}
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
                      {bookingFetchedByReference?.hasPriorityPass && (
                        <div className="flex items-center gap-x-1">
                          <span className="text-sm">
                            {
                              bookingFetchedByReference?.booking
                                ?.priorityPassCount
                            }
                            {
                              bookingFetchedByReference?.booking
                                ?.priorityPassType?.name
                            }
                          </span>
                        </div>
                      )}
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

                      {/* Driver Details */}
                      <div className="mt-5">
                        <h2 className="text-xl font-semibold">
                          Driver Details
                        </h2>

                        {bookingFetchedByReference?.assignedDriver ||
                        bookingFetchedByReference?.vendorAssignedDriver ? (
                          <div className="flex flex-col gap-y-1">
                            <div className="flex items-center gap-x-2">
                              <div className="h-16 w-16 rounded-full overflow-hidden">
                                <img
                                  src={
                                    bookingFetchedByReference?.assignedDriver
                                      ?.image ??
                                    bookingFetchedByReference
                                      ?.vendorAssignedDriver?.image
                                  }
                                  alt={`${
                                    bookingFetchedByReference?.assignedDriver
                                      ?.firstName ??
                                    bookingFetchedByReference
                                      ?.vendorAssignedDriver?.firstName
                                  } ${
                                    bookingFetchedByReference?.assignedDriver
                                      ?.lastName ??
                                    bookingFetchedByReference
                                      ?.vendorAssignedDriver?.lastName
                                  }`}
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              <div className="flex flex-col">
                                <span className="text-sm font-semibold">
                                  Full Name:{" "}
                                  <span className="text-sm font-normal">
                                    {bookingFetchedByReference?.assignedDriver
                                      ?.firstName ??
                                      bookingFetchedByReference
                                        ?.vendorAssignedDriver?.firstName}{" "}
                                    {bookingFetchedByReference?.assignedDriver
                                      ?.lastName ??
                                      bookingFetchedByReference
                                        ?.vendorAssignedDriver?.lastName}
                                  </span>{" "}
                                </span>
                                <span className="text-sm font-semibold">
                                  Email Address:{" "}
                                  <span className="text-sm font-normal">
                                    {bookingFetchedByReference?.assignedDriver
                                      ?.email ??
                                      bookingFetchedByReference
                                        ?.vendorAssignedDriver?.email}
                                  </span>{" "}
                                </span>
                                <span className="text-sm font-semibold">
                                  Phone Number:{" "}
                                  <span className="text-sm font-normal">
                                    {bookingFetchedByReference?.assignedDriver
                                      ?.mobile ??
                                      bookingFetchedByReference
                                        ?.vendorAssignedDriver?.mobile}
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
                        {bookingFetchedByReference?.assignedDriver ||
                        bookingFetchedByReference?.assignedCar ? (
                          <div className="flex flex-col gap-y-1">
                            <span className="text-sm font-semibold">
                              Type:{" "}
                              <span className="text-sm font-normal">
                                {bookingFetchedByReference?.assignedDriver
                                  ?.carType ??
                                  bookingFetchedByReference?.assignedCar
                                    ?.carType}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Name:{" "}
                              <span className="text-sm font-normal">
                                {bookingFetchedByReference?.assignedDriver
                                  ?.carName ??
                                  bookingFetchedByReference?.assignedCar
                                    ?.carName}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Model:{" "}
                              <span className="text-sm font-normal">
                                {bookingFetchedByReference?.assignedDriver
                                  ?.carModel ??
                                  bookingFetchedByReference?.assignedCar
                                    ?.carModel}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Year:{" "}
                              <span className="text-sm font-normal">
                                {bookingFetchedByReference?.assignedDriver
                                  ?.carYear ??
                                  bookingFetchedByReference?.assignedCar
                                    ?.carYear}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Plate Number:{" "}
                              <span className="text-sm font-normal">
                                {bookingFetchedByReference?.assignedDriver
                                  ?.carPlateNumber ??
                                  bookingFetchedByReference?.assignedCar
                                    ?.carPlateNumber}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Color:{" "}
                              <span className="text-sm font-normal">
                                {bookingFetchedByReference?.assignedDriver
                                  ?.carColor ??
                                  bookingFetchedByReference?.assignedCar
                                    ?.carColor}
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
                {bookingFetchedByReference?.bookingType === "Car" && (
                  <div className="flex items-center justify-center w-full pb-20">
                    <div className="w-full mt-5 lg:p-10 p-7 border-[1px] border-shuttlelanePurple border-dashed">
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
                          ).format("LL")}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span className="text-sm">
                          {moment(
                            bookingFetchedByReference?.booking?.pickupTime
                          ).format("H:mm A")}
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

                        {bookingFetchedByReference?.assignedDriver ||
                        bookingFetchedByReference?.vendorAssignedDriver ? (
                          <div className="flex flex-col gap-y-1">
                            <div className="flex items-center gap-x-2">
                              <div className="h-16 w-16 rounded-full overflow-hidden">
                                <img
                                  src={
                                    bookingFetchedByReference?.assignedDriver
                                      ?.image ??
                                    bookingFetchedByReference
                                      ?.vendorAssignedDriver?.image
                                  }
                                  alt={`${
                                    bookingFetchedByReference?.assignedDriver
                                      ?.firstName ??
                                    bookingFetchedByReference
                                      ?.vendorAssignedDriver?.firstName
                                  } ${
                                    bookingFetchedByReference?.assignedDriver
                                      ?.lastName ??
                                    bookingFetchedByReference
                                      ?.vendorAssignedDriver?.lastName
                                  }`}
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              <div className="flex flex-col">
                                <span className="text-sm font-semibold">
                                  Full Name:{" "}
                                  <span className="text-sm font-normal">
                                    {bookingFetchedByReference?.assignedDriver
                                      ?.firstName ??
                                      bookingFetchedByReference
                                        ?.vendorAssignedDriver?.firstName}{" "}
                                    $
                                    {bookingFetchedByReference?.assignedDriver
                                      ?.lastName ??
                                      bookingFetchedByReference
                                        ?.vendorAssignedDriver?.lastName}
                                  </span>{" "}
                                </span>
                                <span className="text-sm font-semibold">
                                  Email Address:{" "}
                                  <span className="text-sm font-normal">
                                    {bookingFetchedByReference?.assignedDriver
                                      ?.email ??
                                      bookingFetchedByReference
                                        ?.vendorAssignedDriver?.email}
                                  </span>{" "}
                                </span>
                                <span className="text-sm font-semibold">
                                  Phone Number:{" "}
                                  <span className="text-sm font-normal">
                                    {bookingFetchedByReference?.assignedDriver
                                      ?.mobile ??
                                      bookingFetchedByReference
                                        ?.vendorAssignedDriver?.mobile}
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
                  <div className="flex items-center justify-center w-full pb-20">
                    <div className="w-full mt-5 lg:p-10 p-7 border-[1px] border-shuttlelanePurple border-dashed">
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
                          ).format("LL")}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span className="text-sm">
                          {moment(
                            bookingFetchedByReference?.booking?.pickupTime
                          ).format("H:mm A")}
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

                        {bookingFetchedByReference?.assignedDriver ||
                        bookingFetchedByReference?.vendorAssignedDriver ? (
                          <div className="flex flex-col gap-y-1">
                            <div className="flex items-center gap-x-2">
                              <div className="h-16 w-16 rounded-full overflow-hidden">
                                <img
                                  src={
                                    bookingFetchedByReference?.assignedDriver
                                      ?.image ??
                                    bookingFetchedByReference
                                      ?.vendorAssignedDriver?.image
                                  }
                                  alt={`${
                                    bookingFetchedByReference?.assignedDriver
                                      ?.firstName ??
                                    bookingFetchedByReference
                                      ?.vendorAssignedDriver?.firstName
                                  } ${
                                    bookingFetchedByReference?.assignedDriver
                                      ?.lastName ??
                                    bookingFetchedByReference
                                      ?.vendorAssignedDriver?.lastName
                                  }`}
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              <div className="flex flex-col">
                                <span className="text-sm font-semibold">
                                  Full Name:{" "}
                                  <span className="text-sm font-normal">
                                    {bookingFetchedByReference?.assignedDriver
                                      ?.firstName ??
                                      bookingFetchedByReference
                                        ?.vendorAssignedDriver?.firstName}{" "}
                                    $
                                    {bookingFetchedByReference?.assignedDriver
                                      ?.lastName ??
                                      bookingFetchedByReference
                                        ?.vendorAssignedDriver?.lastName}
                                  </span>{" "}
                                </span>
                                <span className="text-sm font-semibold">
                                  Email Address:{" "}
                                  <span className="text-sm font-normal">
                                    {bookingFetchedByReference?.assignedDriver
                                      ?.email ??
                                      bookingFetchedByReference
                                        ?.vendorAssignedDriver?.email}
                                  </span>{" "}
                                </span>
                                <span className="text-sm font-semibold">
                                  Phone Number:{" "}
                                  <span className="text-sm font-normal">
                                    {bookingFetchedByReference?.assignedDriver
                                      ?.mobile ??
                                      bookingFetchedByReference
                                        ?.vendorAssignedDriver?.mobile}
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
                        {bookingFetchedByReference?.assignedDriver ||
                        bookingFetchedByReference?.assignedCar ? (
                          <div className="flex flex-col gap-y-1">
                            <span className="text-sm font-semibold">
                              Type:{" "}
                              <span className="text-sm font-normal">
                                {bookingFetchedByReference?.assignedDriver
                                  ?.carType ??
                                  bookingFetchedByReference?.assignedCar
                                    ?.carType}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Name:{" "}
                              <span className="text-sm font-normal">
                                {bookingFetchedByReference?.assignedDriver
                                  ?.carName ??
                                  bookingFetchedByReference?.assignedCar
                                    ?.carName}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Model:{" "}
                              <span className="text-sm font-normal">
                                {bookingFetchedByReference?.assignedDriver
                                  ?.carModel ??
                                  bookingFetchedByReference?.assignedCar
                                    ?.carModel}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Year:{" "}
                              <span className="text-sm font-normal">
                                {bookingFetchedByReference?.assignedDriver
                                  ?.carYear ??
                                  bookingFetchedByReference?.assignedCar
                                    ?.carYear}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Plate Number:{" "}
                              <span className="text-sm font-normal">
                                {bookingFetchedByReference?.assignedDriver
                                  ?.carPlateNumber ??
                                  bookingFetchedByReference?.assignedCar
                                    ?.carPlateNumber}
                              </span>{" "}
                            </span>
                            <span className="text-sm font-semibold">
                              Color:{" "}
                              <span className="text-sm font-normal">
                                {bookingFetchedByReference?.assignedDriver
                                  ?.carColor ??
                                  bookingFetchedByReference?.assignedCar
                                    ?.carColor}
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
                    <div className="w-full mt-5 lg:p-10 p-7 border-[1px] border-shuttlelanePurple border-dashed">
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
                          ).format("LL")}
                        </span>
                        <span className="h-1 w-1 bg-shuttlelaneBlack rounded-full"></span>
                        <span className="text-sm">
                          {moment(
                            bookingFetchedByReference?.booking?.arrivalDate
                          ).format("LL")}
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
                              ).format("LL")}
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
                              ).format("LL")}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold">
                            Arrival Date:{" "}
                            <span className="text-sm font-normal">
                              {moment(
                                bookingFetchedByReference?.booking?.arrivalDate
                              ).format("LL")}
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
                onClick={() => setIsBookingDetailsModalOpen(false)}
                className="cursor-loading animate-spin"
              />
            </div>
          </div>
        )}
      </Modal>

      {/* Navbar here */}
      <AdminDashboardNavbar
        link="bookings"
        sublink="car-rental"
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
                <div className="w-full">
                  <div className="w-full rounded-lg border-[1.3px] lg:border-[.3px] p-3 border-gray-100 h-auto">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-center gap-x-2">
                        <p className="font-medium">
                          Upcoming Car Rental Bookings -{" "}
                          {upcomingBookings?.length}
                        </p>
                        <div className="h-2 w-2 rounded-full bg-shuttlelanePurple"></div>
                      </div>
                      <p className="text-xs underline offset-7">See All</p>
                    </div>

                    <div className="overflow-x-scroll shuttlelaneScrollbarHoriz shuttlelaneScrollbar">
                      {/* Table header */}
                      <div className="flex lg:w-auto w-max justify-between items-baseline mb-2 border-b-[.3px] border-b-gray-100 text-gray-400 mt-2">
                        <p className="w-[180px] lg:w-[20%] text-xs">
                          Booking Ref
                        </p>
                        <p className="w-[180px] lg:w-[20%] text-xs">
                          Full name
                        </p>
                        <p className="w-[180px] lg:w-[20%] text-xs">
                          Email Address
                        </p>
                        <p className="w-[180px] lg:w-[20%] text-xs">
                          Pickup Date
                        </p>
                        <p className="w-[180px] lg:w-[20%] text-xs">Actions</p>
                      </div>

                      {!isLoading && (
                        <>
                          {upcomingBookings?.map((booking) => (
                            <div className="flex cursor-pointer justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                              <p
                                onClick={() => {
                                  setCurrentBooking(booking);
                                  console.log("current booking:", booking);
                                  setIsBookingDetailsModalOpen(true);
                                }}
                                className="w-[180px] lg:w-[20%] text-xs flex items-center gap-x-2"
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
                                className="w-[180px] lg:w-[20%] text-xs"
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
                                className="w-[180px] lg:w-[20%] text-xs"
                              >
                                {booking?.user?.email ?? booking.email}
                              </p>
                              <p
                                onClick={() => {
                                  setCurrentBooking(booking);
                                  console.log("current booking:", booking);
                                  setIsBookingDetailsModalOpen(true);
                                }}
                                className="w-[180px] lg:w-[20%] text-xs"
                              >
                                {moment(booking?.booking?.pickupDate).format(
                                  "LL"
                                )}
                              </p>

                              <div className="w-[180px] lg:w-[20%] flex items-center gap-x-3">
                                <Link
                                  to={`/booking/track-booking?bookingRef=${booking?.bookingReference}`}
                                  target="_blank"
                                  className="hover:border-b-[.3px] hover:border-b-shuttlelaneBlack text-xs"
                                >
                                  <HiOutlineExternalLink
                                    size={13}
                                    className="text-shuttlelaneBlack"
                                  />
                                </Link>

                                <button
                                  onClick={() => {
                                    setCurrentBooking(booking);
                                    setIsUpdateBookingStatusModalOpen(true);
                                  }}
                                  className="h-7 w-28 p-2 text-white bg-shuttlelanePurple rounded-lg text-xs"
                                >
                                  Update status
                                </button>

                                {/* {admin?.accessRights?.deleteBooking && (
                                  <FaTrash
                                    onClick={() => {
                                      setCurrentBooking(booking);
                                      setIsDeleteBookingDialogOpen(true);
                                    }}
                                    size={13}
                                    className="text-red-400 cursor-pointer"
                                  />
                                )} */}
                              </div>
                            </div>
                          ))}
                        </>
                      )}

                      {!isLoading && upcomingBookings?.length < 1 && (
                        <div className="flex justify-center items-center h-full w-full mb-2 pb-2 text-shuttlelaneBlack mt-4">
                          <p className="w-full text-xs text-center">
                            No data to show for now...
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
                          Car Rental Bookings - {carRentalBookings?.length}
                        </p>
                        <div className="h-2 w-2 rounded-full bg-shuttlelanePurple"></div>
                      </div>
                    </div>

                    <div className="w-full shuttlelaneScrollbarHoriz overflow-x-scroll">
                      {/* Table header */}
                      <div className="flex lg:w-auto w-max justify-between items-baseline mb-2 border-b-[.3px] border-b-gray-100 text-gray-400 mt-2">
                        <p className="w-[180px] lg:w-[20%] text-xs">
                          Booking Ref
                        </p>
                        <p className="w-[180px] lg:w-[20%] text-xs">
                          Full name
                        </p>
                        <p className="w-[180px] lg:w-[20%] text-xs">
                          Email Address
                        </p>
                        <p className="w-[180px] lg:w-[20%] text-xs">
                          Pickup Date
                        </p>
                        <p className="w-[180px] lg:w-[20%] text-xs">Actions</p>
                      </div>

                      {!isLoading && (
                        <>
                          {carRentalBookings?.map((booking) => (
                            <div className="cursor-pointer flex lg:w-auto w-max justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                              <p
                                onClick={() => {
                                  setCurrentBooking(booking);
                                  console.log("current booking:", booking);
                                  setIsBookingDetailsModalOpen(true);
                                }}
                                className="w-[180px] lg:w-[20%] text-xs flex items-center gap-x-2"
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
                                className="w-[180px] lg:w-[20%] text-xs"
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
                                className="w-[180px] lg:w-[20%] text-xs"
                              >
                                {booking?.user?.email ?? booking.email}
                              </p>
                              <p
                                onClick={() => {
                                  setCurrentBooking(booking);
                                  console.log("current booking:", booking);
                                  setIsBookingDetailsModalOpen(true);
                                }}
                                className="w-[180px] lg:w-[20%] text-xs"
                              >
                                {moment(booking?.booking?.pickupDate).format(
                                  "LL"
                                )}
                              </p>

                              <div className="w-[180px] lg:w-[20%] flex items-center gap-x-3">
                                <Link
                                  to={`/booking/track-booking?bookingRef=${booking?.bookingReference}`}
                                  target="_blank"
                                  className="hover:border-b-[.3px] hover:border-b-shuttlelaneBlack text-xs"
                                >
                                  <HiOutlineExternalLink
                                    size={13}
                                    className="text-shuttlelaneBlack"
                                  />
                                </Link>

                                {/* {admin?.accessRights?.deleteBooking && (
                                  <FaTrash
                                    onClick={() => {
                                      setCurrentBooking(booking);
                                      setIsDeleteBookingDialogOpen(true);
                                    }}
                                    size={13}
                                    className="text-red-400 cursor-pointer"
                                  />
                                )} */}
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                      {!isLoading && carRentalBookings?.length < 1 && (
                        <div className="flex justify-center items-center w-full">
                          <p className="text-sm">
                            There are no car rental bookings for now.
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

export default AdminDashboardCarRentalPage;
