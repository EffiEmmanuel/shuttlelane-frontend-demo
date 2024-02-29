// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPassport, FaTrash, FaUser } from "react-icons/fa";
import { MdCheck } from "react-icons/md";
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
} from "../../../redux/slices/adminSlice";
import { Modal as RsuiteModal, Button } from "rsuite";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import Select from "react-select";
import { FaXmark } from "react-icons/fa6";
// import RemindIcon from '@rsuite/icons/legacy/Remind';

// Images
import profilePicPlaceholder from "../../../assets/images/profilePicture.png";

function AdminDashboardHomePage() {
  const {
    isLoading,
    token,
    users,
    drivers,
    approvedDrivers,
    vendors,
    upcomingBookings,
    unassignedBookings,
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
    dispatch(
      assignToJob({
        token,
        userType: isDriver ? "Driver" : "Vendor",
        userId: driverSelected?.value,
        bookingRate: bookingRate,
        bookingId: currentBooking?._id,
      })
    );

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

  // Fetch approced driver accounts
  useEffect(() => {
    if (token) dispatch(fetchApprovedDrivers(token));
  }, [token]);

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
                  <div className="w-full text-shuttlelaneBlack text-sm relative">
                    <Select
                      value={
                        isDriver?.value === true
                          ? driverSelected
                          : vendorSelected
                      }
                      onChange={(value) => {
                        if (isDriver) {
                          console.log("DRIVER SELECTED:", value);
                          setDriverSelected(value);
                        } else {
                          setVendorSelected(value);
                        }
                      }}
                      options={isDriver ? driversData : vendorsData}
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
                      placeholder={`Select ${
                        isDriver?.value === true ? "Driver" : "Vendor"
                      }`}
                    />
                  </div>
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
                      {currentBooking?.bookingCurrency?.symbol
                        ? currentBooking?.bookingCurrency?.symbol
                        : "₦"}
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
                  <button
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
                  </button>
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
                              <div className="flex justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                                <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                                  {booking?.user?.title ?? booking?.title}{" "}
                                  {booking?.user?.firstName ??
                                    booking?.firstName}{" "}
                                  {booking?.user?.firstName ??
                                    booking?.lastName}
                                </p>
                                <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                                  {booking?.booking?.pickupDate?.split("T")[0]}
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
                                          "Successful"
                                        ? "bg-green-500"
                                        : "bg-yellow-500"
                                    } rounded-full`}
                                  ></div>
                                  <span
                                    className={`text-xs ${
                                      booking?.paymentId?.status === "Failed"
                                        ? "text-red-500"
                                        : booking?.paymentId?.status ===
                                          "Successful"
                                        ? "text-green-500"
                                        : "text-yellow-500"
                                    }`}
                                  >
                                    {booking?.paymentId?.status === "Failed"
                                      ? "Failed"
                                      : booking?.paymentId?.status ===
                                        "Successful"
                                      ? "Successful"
                                      : "Pending"}
                                  </span>
                                </div>

                                <div className="min-w-[200px] w-[200px] lg:w-[20%] flex items-center gap-x-3">
                                  <button
                                    onClick={() => {
                                      setCurrentBooking(booking);
                                      setIsAssignDriverModalOpen(true);
                                    }}
                                    className="h-7 w-28 p-2 text-white bg-shuttlelanePurple rounded-lg text-xs"
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
                                  <FaTrash
                                    onClick={() => {
                                      setCurrentBooking(booking);
                                      setIsDeleteBookingDialogOpen(true);
                                    }}
                                    size={13}
                                    className="text-red-400 cursor-pointer"
                                  />
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
                                <button
                                  onClick={() => {}}
                                  className="h-7 w-28 p-2 text-white bg-shuttlelanePurple rounded-lg text-xs"
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
                      <div className="w-full rounded-lg border-[.3px] p-3 border-gray-100 h-[436px] max-h-[436px] overflow-y-scroll shuttlelaneScrollbar shuttlelaneScrollbarHoriz">
                        <div className="flex items-baseline justify-between">
                          <div className="flex items-center gap-x-2">
                            <p className="font-medium">
                              Users - {users?.length}
                            </p>
                            <div className="h-2 w-2 rounded-full bg-shuttlelanePurple"></div>
                          </div>
                          <p className="text-xs underline offset-7">See All</p>
                        </div>

                        {/* Searchbar */}
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
                          <p className="text-xs underline offset-7">See All</p>
                        </div>

                        {/* Searchbar */}
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

                        {/* Table header */}
                        <div className="flex justify-between items-baseline mb-2 border-b-[.3px] border-b-gray-100 text-gray-400 mt-2">
                          <p className="w-[50%] text-xs">Full Name</p>
                          <p className="w-[50%] text-xs">Email</p>
                        </div>

                        {drivers?.map((driver) => (
                          <div
                            onClick={() => {
                              setCurrentDriver(driver);
                              setIsDriverDetailsModalOpen(true);
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
