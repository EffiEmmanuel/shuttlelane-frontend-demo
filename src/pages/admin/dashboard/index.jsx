// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPassport, FaTrash, FaUser } from "react-icons/fa";
import { MdCheck, MdLocationPin } from "react-icons/md";
import { ImSpinner2 } from "react-icons/im";
import AdminDashboardNavbar from "../../../components/ui/Admin/AdminDashboardNavbar";
import { HiOutlineExternalLink } from "react-icons/hi";
import Chart from "react-apexcharts";
import { BiSearch } from "react-icons/bi";
import AdminTopBar from "../../../components/ui/Admin/AdminTopBar";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import Preloader from "../../../components/ui/Preloader";
import AdminDashboardHomeSkeleton from "../../../components/ui/Admin/Skeletons/DashboardHomeSkeleton";
import AdminDashboardStatistics from "../../../components/ui/Admin/Dashboard/Statistics";
import {
  adminFetchBookingsAwaitingAssignment,
  adminFetchUpcomingBookings,
  assignToJob,
  deleteBooking,
  fetchStatistics,
  approveDriverAccount,
  fetchApprovedDrivers,
  fetchBookingByReference,
  fetchVendors,
  fetchApprovedVendors,
  approveVendorAccount,
} from "../../../redux/slices/adminSlice";
import { Modal as RsuiteModal, Button } from "rsuite";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import { FaXmark } from "react-icons/fa6";
// import RemindIcon from '@rsuite/icons/legacy/Remind';

// Images
import profilePicPlaceholder from "../../../assets/images/profilePicture.png";
import moment from "moment";

function AdminDashboardHomePage() {
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
  } = useSelector((store) => store.admin);

  const dispatch = useDispatch();

  // Mobile navbar handler
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
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

  useEffect(() => {
    dispatch(fetchStatistics(token));
    dispatch(adminFetchUpcomingBookings(token));
    dispatch(adminFetchBookingsAwaitingAssignment(token));
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
    dispatch(fetchStatistics(token));
    dispatch(adminFetchUpcomingBookings(token));
    dispatch(adminFetchBookingsAwaitingAssignment(token));
    setIsDeleteBookingDialogOpen(false);
  }

  // Booking Details Modal States
  const [isBookingDetailsModalOpen, setIsBookingDetailsModalOpen] =
    useState(false);

  // Assign Driver Modal States
  const [isAssignDriverModalOpen, setIsAssignDriverModalOpen] = useState(false);
  const [isDriver, setIsDriver] = useState({ value: true, label: "Driver" });
  const userTypeData = [
    {
      value: true,
      label: "Driver",
    },
    {
      value: false,
      label: "Vendor",
    },
  ];
  const [driverSelected, setDriverSelected] = useState();
  const [vendorSelected, setVendorSelected] = useState();

  // Format users and drivers data
  const [driversData, setDriversData] = useState();
  const [vendorsData, setVendorsData] = useState();
  useEffect(() => {
    let updatedDriversData = [];
    approvedDrivers?.forEach((driver) => {
      updatedDriversData.push({
        value: driver?._id,
        label: `${driver?.firstName} ${driver?.lastName}`,
      });
    });

    setDriversData(updatedDriversData);
  }, [approvedDrivers]);
  useEffect(() => {
    let updatedVendorsData = [];
    vendors?.forEach((vendor) => {
      updatedVendorsData.push({
        value: vendor?._id,
        label: vendor?.companyName,
      });
    });

    setVendorsData(updatedVendorsData);
  }, [vendors]);

  // FUNCTION: This function handles assigning a driver or vendor to a job / booking
  const [bookingRate, setBookingRate] = useState();
  async function handleAssignToBooking(e) {
    e.preventDefault();
    if (isDriver?.value === true) {
      dispatch(
        assignToJob({
          token,
          userType: "Driver",
          userId: driverSelected?.value,
          bookingRate: bookingRate,
          bookingId: currentBooking?._id,
        })
      );
    } else {
      dispatch(
        assignToJob({
          token,
          userType: "Vendor",
          userId: vendorSelected?.value,
          bookingRate: bookingRate,
          bookingId: currentBooking?._id,
        })
      );
    }

    // Close modal
    setIsAssignDriverModalOpen(false);
  }

  // Driver details modal
  const [isDriverDetailsModalOpen, setIsDriverDetailsModalOpen] =
    useState(false);
  const [currentDriver, setCurrentDriver] = useState();

  async function handleApproveDriverAccount() {
    dispatch(
      approveDriverAccount({
        driverId: currentDriver?._id,
        token: token,
      })
    );

    setIsAssignDriverModalOpen(false);
  }

  // Fetch approved vendor accounts
  useEffect(() => {
    if (token) {
      dispatch(fetchApprovedDrivers(token));
      dispatch(fetchApprovedVendors(token));
      dispatch(fetchVendors(token));
    }
  }, [token]);

  // Vendor details modal
  const [isVendorDetailsModalOpen, setIsVendorDetailsModalOpen] =
    useState(false);
  const [currentVendor, setCurrentVendor] = useState();

  // Assign Driver Modal States
  const [isAssignVendorModalOpen, setIsAssignVendorModalOpen] = useState(false);
  const [isVendor, setIsVendor] = useState({ value: true, label: "Vendor" });
  async function handleApproveVendorAccount() {
    dispatch(
      approveVendorAccount({
        vendorId: currentVendor?._id,
        token: token,
      })
    );

    setIsAssignVendorModalOpen(false);
  }

  // Fetch booking by reference
  useEffect(() => {
    if (currentBooking)
      dispatch(fetchBookingByReference(currentBooking?.bookingReference));
  }, [currentBooking]);

  return (
    <div className="">
      <ToastContainer />
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

      {/* Assign Driver Modal */}
      <Modal
        isOpen={isAssignDriverModalOpen}
        onRequestClose={() => setIsAssignDriverModalOpen(false)}
        className="flex h-full min-h-screen justify-center items-center lg:px-52 px-7"
      >
        <div className="bg-white shadow-lg rounded-lg text-shuttlelaneBlack w-full min-h-[80%] max-h-[80%] h-[80%] lg:w-[60%] p-7 px-10 overflow-y-scroll shuttlelaneScrollbar">
          <div className="flex items-center justify-between">
            <div className="">
              <h4 className="font-semibold">Assign partner to booking</h4>
              <small>Assign either a driver or vendor to this Booking</small>
            </div>

            <FaXmark
              size={20}
              onClick={() => setIsAssignDriverModalOpen(false)}
              className="cursor-pointer"
            />
          </div>

          {/* <Placeholder.Paragraph /> */}
          <div className="h-full mt-8">
            <form className="flex flex-col gap-y-4 w-full">
              <div className="w-full flex flex-col gap-y-1">
                <label htmlFor="partnerType" className="text-sm">
                  Partner type
                </label>
                <div className="flex items-center bg-gray-100 h-[47px] px-2 gap-x-2 w-full rounded-lg">
                  <div className="w-full text-shuttlelaneBlack text-sm relative">
                    <Select
                      value={isDriver}
                      onChange={(value) => setIsDriver(value)}
                      options={userTypeData}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderColor: state.isFocused
                            ? "transparent"
                            : "transparent",
                          borderWidth: state.isFocused ? "0" : "0",
                          backgroundColor: "transparent",
                          position: "relative",
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
                      placeholder="Driver / Vendor"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col gap-y-1">
                <label htmlFor="selectPartner" className="text-sm">
                  Select {isDriver?.value === true ? "Driver" : "Vendor"}
                </label>
                <div className="flex items-center bg-gray-100 h-[47px] px-2 gap-x-2 w-full rounded-lg">
                  {isDriver?.value === true && (
                    <div className="w-full text-shuttlelaneBlack text-sm relative">
                      <Select
                        value={driverSelected}
                        onChange={(value) => {
                          setDriverSelected(value);
                        }}
                        options={driversData}
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: state.isFocused
                              ? "transparent"
                              : "transparent",
                            borderWidth: state.isFocused ? "0" : "0",
                            backgroundColor: "transparent",
                            position: "relative",
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
                        placeholder="Select Driver"
                      />
                    </div>
                  )}
                  {isDriver?.value === false && (
                    <div className="w-full text-shuttlelaneBlack text-sm relative">
                      <Select
                        value={vendorSelected}
                        onChange={(value) => {
                          setVendorSelected(value);
                        }}
                        options={vendorsData}
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: state.isFocused
                              ? "transparent"
                              : "transparent",
                            borderWidth: state.isFocused ? "0" : "0",
                            backgroundColor: "transparent",
                            position: "relative",
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
                        placeholder="Select Vendor"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full flex flex-col gap-y-1">
                <label htmlFor="bookingRate" className="text-sm">
                  Booking rate
                </label>
                <div className="w-full flex items-center justify-between">
                  <div className="w-full flex items-center">
                    <label
                      htmlFor="bookingRate"
                      className="text-sm inline-block p-3 bg-gray-200 h-11 rounded-tl-lg rounded-bl-lg"
                    >
                      ₦
                    </label>
                    <input
                      type="number"
                      placeholder="1000"
                      name="bookingRate"
                      value={bookingRate}
                      onChange={(e) => setBookingRate(e.target.value)}
                      className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-tr-lg rounded-br-lg"
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="bg-shuttlelanePurple shadow-[#4540cf85] shadow-md text-white h-10 rounded-lg mt-5 flex items-center gap-x-3 p-3 w-full justify-center"
                disabled={isLoading}
                onClick={(e) => handleAssignToBooking(e)}
              >
                {isLoading ? (
                  <ImSpinner2 size={16} className="text-white animate-spin" />
                ) : (
                  <span className="text-sm">
                    Assign {isDriver ? "Driver" : "Vendor"}
                  </span>
                )}
              </button>
            </form>
          </div>
        </div>
      </Modal>

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

                        {currentBooking?.assignedDriver || currentBooking?.vendorAssignedDriver ? (
                          <div className="flex flex-col gap-y-1">
                            <div className="flex items-center gap-x-2">
                              <div className="h-16 w-16 rounded-full overflow-hidden">
                                <img
                                  src={currentBooking?.assignedDriver?.image ?? currentBooking?.vendorAssignedDriver?.image}
                                  alt={`${currentBooking?.assignedDriver?.firstName ?? currentBooking?.vendorAssignedDriver?.firstName} ${currentBooking?.assignedDriver?.lastName ?? currentBooking?.vendorAssignedDriver?.lastName}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              <div className="flex flex-col">
                                <span className="text-sm font-semibold">
                                  Full Name:{" "}
                                  <span className="text-sm font-normal">
                                    {currentBooking?.assignedDriver?.firstName ?? currentBooking?.vendorAssignedDriver?.firstName}{" "}
                                    ${currentBooking?.assignedDriver?.lastName ?? currentBooking?.vendorAssignedDriver?.lastName}
                                  </span>{" "}
                                </span>
                                <span className="text-sm font-semibold">
                                  Email Address:{" "}
                                  <span className="text-sm font-normal">
                                    {currentBooking?.assignedDriver?.email ?? currentBooking?.vendorAssignedDriver?.email}
                                  </span>{" "}
                                </span>
                                <span className="text-sm font-semibold">
                                  Phone Number:{" "}
                                  <span className="text-sm font-normal">
                                    {currentBooking?.assignedDriver?.mobile ?? currentBooking?.vendorAssignedDriver?.mobile}
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
              <ImSpinner2
                size={20}
                onClick={() => setIsBookingDetailsModalOpen(false)}
                className="cursor-loading animate-spin"
              />
            </div>
          </div>
        )}
      </Modal>

      {/* Driver Details Modal */}
      <Modal
        isOpen={isDriverDetailsModalOpen}
        onRequestClose={() => setIsDriverDetailsModalOpen(false)}
        className="flex h-full min-h-screen justify-center items-center lg:px-40 px-7"
      >
        <div className="bg-white shadow-lg rounded-lg text-shuttlelaneBlack w-full min-h-[80%] max-h-[80%] h-[80%] lg:w-[60%] p-7 px-10 overflow-y-scroll shuttlelaneScrollbar">
          <div className="flex items-center justify-between">
            <div className="">
              <h4 className="font-semibold">Driver's Details</h4>
              <small>
                Below are {currentDriver?.title} {currentDriver?.firstName}{" "}
                {currentDriver?.lastName}'s details
              </small>
            </div>

            <FaXmark
              size={20}
              onClick={() => setIsDriverDetailsModalOpen(false)}
              className="cursor-pointer"
            />
          </div>

          {/* <Placeholder.Paragraph /> */}
          <div className="h-full mt-10 flex flex-col gap-y-5 pb-20">
            <div className="flex items-center gap-x-2">
              <div className="h-16 w-16 rounded-full overflow-hidden">
                <img
                  src={currentDriver?.image ?? profilePicPlaceholder}
                  alt="Driver's full name"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col">
                <p className="font-semibold text-shuttlelaneBlack">
                  {currentDriver?.firstName} {currentDriver?.lastName}{" "}
                  {currentDriver?.middleName?.split("")[0]}.
                </p>
                <small className="text-sm text-gray-400">
                  Email Address: {currentDriver?.email}
                </small>
                <small className="text-sm text-gray-400 mt-1">
                  Mobile: {currentDriver?.mobile}
                </small>
              </div>
            </div>

            <div className="flex flex-col">
              <p className="font-semibold text-shuttlelaneBlack">
                Contact Information
              </p>
              <small className="text-sm text-gray-400">
                Full Name: {currentDriver?.firstName}{" "}
                {currentDriver?.middleName} {currentDriver?.lastName}
              </small>
              <small className="text-sm text-gray-400">
                Email Address: {currentDriver?.email}
              </small>
              <small className="text-sm text-gray-400 mt-1">
                Gender: {currentDriver?.gender}
              </small>
              <small className="text-sm text-gray-400 mt-1">
                Education: {currentDriver?.education}
              </small>
              <small className="text-sm text-gray-400 mt-1">
                Phone: {currentDriver?.mobile}
              </small>
              <small className="text-sm text-gray-400 mt-1">
                Alternative Phone: {currentDriver?.alternateMobile}
              </small>
            </div>

            <div className="flex flex-col">
              <p className="font-semibold text-shuttlelaneBlack">
                Personal Information
              </p>
              <small className="text-sm text-gray-400">
                Date of birth: {currentDriver?.dateOfBirth}
              </small>
              <small className="text-sm text-gray-400">
                Address: {currentDriver?.address}
              </small>
              <small className="text-sm text-gray-400 mt-1">
                City: {currentDriver?.city}
              </small>
              <small className="text-sm text-gray-400 mt-1">
                Marital Status: {currentDriver?.maritalStatus}
              </small>
              <small className="text-sm text-gray-400 mt-1">
                BVN: {currentDriver?.bvn}
              </small>
              <small className="text-sm text-gray-400 mt-1">
                NIN: {currentDriver?.nin}
              </small>
              <small className="text-sm text-gray-400 mt-1">
                Bank Name: {currentDriver?.bank}
              </small>
              <small className="text-sm text-gray-400 mt-1">
                Account Number: {currentDriver?.accountNumber}
              </small>
              <small className="text-sm text-gray-400 mt-1">
                Account Name: {currentDriver?.accountName}
              </small>
              <small className="text-sm text-gray-400 mt-1">
                Driver's License Number: {currentDriver?.driversLicense}
              </small>
            </div>

            <div className="flex flex-col">
              <p className="font-semibold text-shuttlelaneBlack">Car Details</p>
              <small className="text-sm text-gray-400">
                Car Type: {currentDriver?.carType}
              </small>
              <small className="text-sm text-gray-400">
                Car Name: {currentDriver?.carName}
              </small>
              <small className="text-sm text-gray-400 mt-1">
                Car Model: {currentDriver?.carModel}
              </small>
              <small className="text-sm text-gray-400 mt-1">
                Car Year: {currentDriver?.carYear}
              </small>
            </div>

            <div className="flex flex-col">
              <p className="font-semibold text-shuttlelaneBlack">
                Emergency Contact
              </p>
              <small className="text-sm text-gray-400">
                Full Name: {currentDriver?.emergencyFirstName}{" "}
                {currentDriver?.emergencyLastName}
              </small>
              <small className="text-sm text-gray-400">
                Address: {currentDriver?.emergencyAddress}
              </small>
              <small className="text-sm text-gray-400 mt-1">
                Phone Number: {currentDriver?.emergencyMobile}
              </small>
              <small className="text-sm text-gray-400 mt-1">
                Relationship: {currentDriver?.emergencyRelationship}
              </small>
            </div>

            <div className="flex flex-col">
              <p className="font-semibold text-shuttlelaneBlack">
                Additional Information
              </p>
              <small className="text-sm text-gray-400">
                Drives for other ride hailing platforms?:{" "}
                {currentDriver?.isDrivingForHailingPlatforms ? "Yes" : "No"}{" "}
              </small>
              {currentDriver?.isDrivingForHailingPlatforms && (
                <small className="text-sm text-gray-400">
                  Platforms: {currentDriver?.hailingPlatforms}
                </small>
              )}
            </div>

            {/* APPROVE ACCOUNT */}
            <div className="pb-5">
              {!currentDriver?.isAccountApproved && (
                <div className="flex flex-col gap-y-2 lg:flex-row gap-x-3 items-center">
                  <button
                    onClick={() => {
                      handleApproveDriverAccount();
                    }}
                    className="h-10 flex flex-row gap-x-1 items-center justify-center w-full lg:w-44 p-2 text-white bg-green-500 rounded-lg text-xs"
                  >
                    {isLoading ? (
                      <ImSpinner2 size={16} className="text-white" />
                    ) : (
                      <>
                        <span className="text-xs">Approve account</span>
                        <MdCheck size={20} />
                      </>
                    )}
                  </button>
                  {/* <button
                    onClick={() => {
                      // setCurrentBooking(booking);
                      setIsAssignDriverModalOpen(true);
                    }}
                    className="h-10 w-full lg:w-44 flex flex-row gap-x-1 items-center justify-center p-2 text-white bg-red-500 rounded-lg text-xs"
                  >
                    {isLoading ? (
                      <ImSpinner2 size={16} className="text-white" />
                    ) : (
                      <>
                        <span className="text-xs">Reject application</span>
                        <FaXmark size={20} />
                      </>
                    )}
                  </button> */}
                </div>
              )}
            </div>
            {/*  */}
          </div>
        </div>
      </Modal>

      {/* Vendor Details Modal */}
      <Modal
        isOpen={isVendorDetailsModalOpen}
        onRequestClose={() => setIsVendorDetailsModalOpen(false)}
        className="flex h-full min-h-screen justify-center items-center lg:px-40 px-7"
      >
        <div className="bg-white shadow-lg rounded-lg text-shuttlelaneBlack w-full min-h-[80%] max-h-[80%] h-[80%] lg:w-[60%] p-7 px-10 overflow-y-scroll shuttlelaneScrollbar">
          <div className="flex items-center justify-between">
            <div className="">
              <h4 className="font-semibold">Vendor's Details</h4>
              <small>Below are {currentVendor?.companyName}'s details</small>
            </div>

            <FaXmark
              size={20}
              onClick={() => setIsVendorDetailsModalOpen(false)}
              className="cursor-pointer"
            />
          </div>

          {/* <Placeholder.Paragraph /> */}
          <div className="h-full mt-10 flex flex-col gap-y-5 pb-20">
            <div className="flex items-center gap-x-2">
              <div className="h-16 w-16 rounded-full overflow-hidden">
                <img
                  src={currentVendor?.image ?? profilePicPlaceholder}
                  alt="Vendor's full name"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col">
                <p className="font-semibold text-shuttlelaneBlack">
                  {currentVendor?.companyName}
                </p>
                <small className="text-sm text-gray-400">
                  Email Address: {currentVendor?.companyEmail}
                </small>
                <small className="text-sm text-gray-400 mt-1">
                  Mobile: {currentVendor?.contactMobile}
                </small>
              </div>
            </div>

            <div className="flex flex-col">
              <p className="font-semibold text-shuttlelaneBlack">
                Company Information
              </p>
              <small className="text-sm text-gray-400">
                Company Name: {currentVendor?.companyName}
              </small>
              <small className="text-sm text-gray-400">
                Email Address: {currentVendor?.companyEmail}
              </small>
              <small className="text-sm text-gray-400 mt-1">
                Opening Hours:{" "}
                {currentVendor?.isOpen24Hours
                  ? "Opens 24 hours"
                  : moment(currentVendor?.openingHours)?.format("HH:MM A")}
              </small>
              {!currentVendor?.isOpen24Hours && (
                <small className="text-sm text-gray-400 mt-1">
                  Closing Hours:{" "}
                  {moment(currentVendor?.openingHours)?.format("HH:MM A")}
                </small>
              )}
              <small className="text-sm text-gray-400 mt-1">
                Address: {currentVendor?.address}
              </small>
              <small className="text-sm text-gray-400 mt-1">
                City: {currentVendor?.city}
              </small>
              <small className="text-sm text-gray-400 mt-1">
                Country: {currentVendor?.country}
              </small>
              <small className="text-sm text-gray-400 mt-1">
                Operating Cities:{" "}
                {currentVendor?.operatingCities?.map(
                  (city) => `${city?.cityName}. `
                )}
              </small>
              <small className="text-sm text-gray-400 mt-1">
                Fleet Type:{" "}
                {currentVendor?.fleetType?.map((fleetType) => `${fleetType}. `)}
              </small>
              <small className="text-sm text-gray-400 mt-1">
                Fleet Size: {currentVendor?.fleetSize}
              </small>
              <small className="text-sm text-gray-400 mt-1">
                Bank Name: {currentVendor?.bank}
              </small>
              <small className="text-sm text-gray-400 mt-1">
                Account Number: {currentVendor?.accountNumber}
              </small>
              <small className="text-sm text-gray-400 mt-1">
                Account Name: {currentVendor?.accountName}
              </small>
            </div>

            <div className="flex flex-col">
              <p className="font-semibold text-shuttlelaneBlack">
                Contact Information
              </p>
              <small className="text-sm text-gray-400">
                Full Name: {currentVendor?.contactName}
              </small>
              <small className="text-sm text-gray-400">
                Email Address: {currentVendor?.contactEmail}
              </small>
              <small className="text-sm text-gray-400">
                Mobile: {currentVendor?.contactMobile}
              </small>
            </div>

            {/* APPROVE ACCOUNT */}
            <div className="pb-5">
              {!currentDriver?.isAccountApproved && (
                <div className="flex flex-col gap-y-2 lg:flex-row gap-x-3 items-center">
                  <button
                    onClick={() => {
                      handleApproveVendorAccount();
                    }}
                    className="h-10 flex flex-row gap-x-1 items-center justify-center w-full lg:w-44 p-2 text-white bg-green-500 rounded-lg text-xs"
                  >
                    {isLoading ? (
                      <ImSpinner2 size={16} className="text-white" />
                    ) : (
                      <>
                        <span className="text-xs">Approve account</span>
                        <MdCheck size={20} />
                      </>
                    )}
                  </button>
                  {/* <button
                    onClick={() => {
                      // setCurrentBooking(booking);
                      setIsAssignDriverModalOpen(true);
                    }}
                    className="h-10 w-full lg:w-44 flex flex-row gap-x-1 items-center justify-center p-2 text-white bg-red-500 rounded-lg text-xs"
                  >
                    {isLoading ? (
                      <ImSpinner2 size={16} className="text-white" />
                    ) : (
                      <>
                        <span className="text-xs">Reject application</span>
                        <FaXmark size={20} />
                      </>
                    )}
                  </button> */}
                </div>
              )}
            </div>
            {/*  */}
          </div>
        </div>
      </Modal>

      <div className="">
        {/* Navbar here */}
        <AdminDashboardNavbar
          link="home"
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

            {isLoading ? (
              <AdminDashboardHomeSkeleton />
            ) : (
              <div className="mt-24 pt-2">
                <div className="flex xl:flex-row flex-col gap-y-5 gap-x-5">
                  {/* Booking Summary - Total number of bookings */}
                  <div className="xl:w-[70%] w-full">
                    <AdminDashboardStatistics />

                    {/* Bar Chart */}
                    <div className="mt-11 w-full">
                      <div className="w-full rounded-lg border-[.3px] p-3 border-gray-100 h-auto">
                        <div className="flex items-baseline justify-between">
                          <div className="flex items-center gap-x-2">
                            <p className="font-medium">Total Revenue</p>
                            <div className="h-2 w-2 rounded-full bg-shuttlelaneGold"></div>
                          </div>
                          {/* <p className="text-sm underline offset-7">2023</p> */}
                        </div>

                        {/* Area chart */}
                        <div className="mt-2 text-xs">
                          <Chart
                            options={state.options}
                            series={state.series}
                            type="area"
                            width={"100%"}
                            height={250}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Unassigned Bookings */}
                    <div className="mt-11 w-full">
                      <div className="w-full rounded-lg border-[.3px] p-3 border-gray-100 h-auto">
                        <div className="flex items-baseline justify-between">
                          <div className="flex items-center gap-x-2">
                            <p className="font-medium">
                              Unassigned Bookings - {unassignedBookings?.length}
                            </p>
                            <div className="h-2 w-2 rounded-full bg-shuttlelanePurple"></div>
                          </div>
                          {/* <p className="text-xs underline offset-7">See All</p> */}
                        </div>
                        {unassignedBookings?.length < 1 && (
                          <div className="flex justify-center items-center h-full w-full mb-2 pb-2 text-shuttlelaneBlack mt-4">
                            <p className="w-full text-xs text-center">
                              No data to show for now...
                            </p>
                          </div>
                        )}
                        {!unassignedBookings?.length < 1 && (
                          <div className="overflow-x-scroll shuttlelaneScrollbarHoriz shuttlelaneScrollbar">
                            {/* Table header */}
                            <div className="flex justify-between items-baseline mb-2 border-b-[.3px] border-b-gray-100 text-gray-400 mt-2">
                              <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                                Full name
                              </p>
                              <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                                Pickup Date
                              </p>
                              <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                                Booking Type
                              </p>
                              <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                                Payment Status
                              </p>
                              <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                                Actions
                              </p>
                            </div>

                            {unassignedBookings?.map((booking) => (
                              <div className="cursor-pointer flex justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                                <div
                                  onClick={() => {
                                    setCurrentBooking(booking);
                                    console.log("current booking:", booking);
                                    setIsBookingDetailsModalOpen(true);
                                    // else {
                                    //   toast.error(
                                    //     "You do not have the priviledges to see booking details as a blogger."
                                    //   );
                                    // }
                                  }}
                                  className="cursor-pointer flex justify-between items-baseline"
                                >
                                  <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                                    {booking?.user?.title ?? booking?.title}{" "}
                                    {booking?.user?.firstName ??
                                      booking?.firstName}{" "}
                                    {booking?.user?.firstName ??
                                      booking?.lastName}
                                  </p>
                                  <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                                    {
                                      booking?.booking?.pickupDate?.split(
                                        "T"
                                      )[0]
                                    }
                                  </p>
                                  <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                                    {booking?.bookingType}
                                  </p>

                                  <div className="min-w-[200px] w-[200px] lg:w-[20%] flex items-center gap-x-1">
                                    <div
                                      className={`h-2 w-2 ${
                                        booking?.paymentId?.paymentStatus ===
                                        "Failed"
                                          ? "bg-red-500"
                                          : booking?.paymentId
                                              ?.paymentStatus === "Successful"
                                          ? "bg-green-500"
                                          : "bg-yellow-500"
                                      } rounded-full`}
                                    ></div>
                                    <span
                                      className={`text-xs ${
                                        booking?.paymentId?.paymentStatus ===
                                        "Failed"
                                          ? "text-red-500"
                                          : booking?.paymentId
                                              ?.paymentStatus === "Successful"
                                          ? "text-green-500"
                                          : "text-yellow-500"
                                      }`}
                                    >
                                      {booking?.paymentId?.paymentStatus ===
                                      "Failed"
                                        ? "Failed"
                                        : booking?.paymentId?.paymentStatus ===
                                          "Successful"
                                        ? "Successful"
                                        : "Pending"}
                                    </span>
                                  </div>
                                </div>
                                <div className="min-w-[200px] w-[200px] lg:w-[20%] flex items-center gap-x-3">
                                  {admin?.role !== "Blogger" && (
                                    <button
                                      onClick={() => {
                                        setCurrentBooking(booking);
                                        setIsAssignDriverModalOpen(true);
                                      }}
                                      className="h-7 w-28 p-2 text-white bg-shuttlelanePurple rounded-lg text-xs"
                                    >
                                      Assign driver
                                    </button>
                                  )}
                                  <Link
                                    to="/"
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
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Upcoming Bookings */}
                    <div className="mt-11 w-full">
                      <div className="w-full rounded-lg border-[.3px] p-3 border-gray-100 h-auto">
                        <div className="flex items-baseline justify-between">
                          <div className="flex items-center gap-x-2">
                            <p className="font-medium">
                              Upcoming Bookings - {upcomingBookings?.length}
                            </p>
                            <div className="h-2 w-2 rounded-full bg-shuttlelanePurple"></div>
                          </div>
                          <p className="text-xs underline offset-7">See All</p>
                        </div>

                        <div className="overflow-x-scroll shuttlelaneScrollbarHoriz shuttlelaneScrollbar">
                          {/* Table header */}
                          <div className="flex justify-between items-baseline mb-2 border-b-[.3px] border-b-gray-100 text-gray-400 mt-2">
                            <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                              Full name
                            </p>
                            <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                              Pickup Date
                            </p>
                            <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                              Booking Type
                            </p>
                            <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                              Payment Status
                            </p>
                            <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                              Actions
                            </p>
                          </div>

                          {upcomingBookings?.map((booking) => (
                            <div className="flex justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                              <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                                {booking?.user?.firstName ?? booking?.firstName}{" "}
                                {booking?.user?.firstName ?? booking?.firstName}
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
                                      : booking?.paymentId?.status === "Pending"
                                      ? "bg-yellow-500"
                                      : "bg-green-500"
                                  } rounded-full`}
                                ></div>
                                <span
                                  className={`text-xs ${
                                    booking?.paymentId?.status === "Failed"
                                      ? "tet-red-500"
                                      : booking?.paymentId?.status === "Pending"
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
                                {/* {admin?.role !== "Blogger" && (
                                  <button
                                    onClick={() => {}}
                                    className="h-7 w-28 p-2 text-white bg-shuttlelanePurple rounded-lg text-xs"
                                  >
                                    Assign driver
                                  </button>
                                )} */}
                                <Link
                                  to="/"
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
                      <div className="w-full rounded-lg border-[.3px] p-3 border-gray-100 h-[436px] max-h-[436px] overflow-y-scroll shuttlelaneScrollbar shuttlelaneScrollbarHoriz">
                        <div className="flex items-baseline justify-between">
                          <div className="flex items-center gap-x-2">
                            <p className="font-medium">
                              Users - {users?.length}
                            </p>
                            <div className="h-2 w-2 rounded-full bg-shuttlelanePurple"></div>
                          </div>
                          <Link
                            to="/admin/dashboard/users/manage-users"
                            className="text-xs underline offset-7"
                          >
                            See All
                          </Link>
                        </div>

                        {/* Searchbar */}
                        {/* <div className="flex items-center gap-x-3 border-[.3px] border-gray-300 rounded-lg px-2 my-2">
                          <BiSearch
                            size={16}
                            className="text-gray-400 rotate-90"
                          />
                          <input
                            type="search"
                            placeholder="Search"
                            className="w-full h-8 bg-transparent text-xs focus:outline-none placeholder:text-xs placeholder:text-gray-400"
                          />
                        </div> */}

                        {/* Table header */}
                        <div className="flex justify-between items-baseline mb-2 border-b-[.3px] border-b-gray-100 text-gray-400 mt-2">
                          <p className="w-[50%] text-xs">Full Name</p>
                          <p className="w-[50%] text-xs">Email</p>
                        </div>

                        {users?.map((user) => (
                          <div className="flex justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                            <p className="w-[50%] text-xs">
                              {user?.firstName} {user?.lastName}
                            </p>
                            <p className="w-[50%] text-xs">{user?.email}</p>
                          </div>
                        ))}

                        {users?.length < 1 && (
                          <div className="flex justify-center items-center h-full w-full mb-2 pb-2 text-shuttlelaneBlack mt-4">
                            <p className="w-full text-xs text-center">
                              No data to show for now...
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Drivers */}
                    <div className="mt-11 w-full">
                      <div className="w-full rounded-lg border-[.3px] p-3 border-gray-100 h-[436px] max-h-[436px] overflow-y-scroll shuttlelaneScrollbar shuttlelaneScrollbarHoriz">
                        <div className="flex items-baseline justify-between">
                          <div className="flex items-center gap-x-2">
                            <p className="font-medium">
                              Drivers - {drivers?.length}
                            </p>
                            <div className="h-2 w-2 rounded-full bg-shuttlelaneGold"></div>
                          </div>
                          <Link
                            to="/admin/dashboard/users/manage-drivers"
                            className="text-xs underline offset-7"
                          >
                            See All
                          </Link>
                        </div>

                        {/* Searchbar */}
                        {/* <div className="flex items-center gap-x-3 border-[.3px] border-gray-300 rounded-lg px-2 my-2">
                          <BiSearch
                            size={16}
                            className="text-gray-400 rotate-90"
                          />
                          <input
                            type="search"
                            placeholder="Search"
                            className="w-full h-8 bg-transparent text-xs focus:outline-none placeholder:text-xs placeholder:text-gray-400"
                          />
                        </div> */}

                        {/* Table header */}
                        <div className="flex justify-between items-baseline mb-2 border-b-[.3px] border-b-gray-100 text-gray-400 mt-2">
                          <p className="w-[50%] text-xs">Full Name</p>
                          <p className="w-[50%] text-xs">Email</p>
                        </div>

                        {drivers?.map((driver) => (
                          <div
                            onClick={() => {
                              if (admin?.role == "Blogger") {
                                toast.error(
                                  "You do not have the priviledges to view driver details"
                                );
                              } else {
                                setCurrentDriver(driver);
                                setIsDriverDetailsModalOpen(true);
                              }
                            }}
                            className="cursor-pointer flex justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4"
                          >
                            <p className="w-[50%] text-xs">
                              {driver?.firstName} {driver?.lastName}
                            </p>
                            <p className="w-[50%] text-xs">{driver?.email}</p>
                          </div>
                        ))}

                        {drivers?.length < 1 && (
                          <div className="flex justify-center items-center h-full w-full mb-2 pb-2 text-shuttlelaneBlack mt-4">
                            <p className="w-full text-xs text-center">
                              No data to show for now...
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Vendors */}
                    <div className="mt-11 w-full">
                      <div className="w-full rounded-lg border-[.3px] p-3 border-gray-100 h-[436px] max-h-[436px] overflow-y-scroll shuttlelaneScrollbar shuttlelaneScrollbarHoriz">
                        <div className="flex items-baseline justify-between">
                          <div className="flex items-center gap-x-2">
                            <p className="font-medium">
                              Vendors - {vendors?.length}
                            </p>
                            <div className="h-2 w-2 rounded-full bg-shuttlelanePurple"></div>
                          </div>
                          <Link
                            to="/admin/dashboard/users/manage-vendors"
                            className="text-xs underline offset-7"
                          >
                            See All
                          </Link>
                        </div>

                        {/* Searchbar */}
                        {/* {!isLoading && vendors && (
                          <div className="flex items-center gap-x-3 border-[.3px] border-gray-300 rounded-lg px-2 my-2">
                            <BiSearch
                              size={16}
                              className="text-gray-400 rotate-90"
                            />
                            <input
                              type="search"
                              placeholder="Search"
                              className="w-full h-8 bg-transparent text-xs focus:outline-none placeholder:text-xs placeholder:text-gray-400"
                            />
                          </div>
                        )} */}

                        {/* Table header */}
                        {!isLoading && vendors && (
                          <div className="flex justify-between items-baseline mb-2 border-b-[.3px] border-b-gray-100 text-gray-400 mt-2">
                            <p className="w-[50%] text-xs">Company Name</p>
                            <p className="w-[50%] text-xs">Email</p>
                          </div>
                        )}

                        {vendors?.map((vendor) => (
                          <div
                            onClick={() => {
                              setCurrentVendor(vendor);
                              setIsVendorDetailsModalOpen(true);
                            }}
                            className="cursor-pointer flex justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4"
                          >
                            <p className="w-[50%] text-xs">
                              {vendor?.companyName}
                            </p>
                            <p className="w-[50%] text-xs">
                              {vendor?.companyEmail}
                            </p>
                          </div>
                        ))}

                        {(vendors?.length < 1 || !vendors) && (
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardHomePage;
