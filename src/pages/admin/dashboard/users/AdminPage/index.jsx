// @ts-nocheck
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { BiSearch } from "react-icons/bi";
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import AdminDashboardNavbar from "../../../../../components/ui/Admin/AdminDashboardNavbar";
import AdminTopBar from "../../../../../components/ui/Admin/AdminTopBar";
import { useDispatch, useSelector } from "react-redux";
import {
  createAdminAccount,
  deleteAdminAccount,
  deleteUserById,
  fetchAdminAccounts,
  fetchUsers,
} from "../../../../../redux/slices/adminSlice";
import { ImSpinner2 } from "react-icons/im";
import { ToastContainer } from "react-toastify";
import Modal from "react-modal";
import { FaXmark } from "react-icons/fa6";
import Select from "react-select";
import { Helmet } from "react-helmet";

function AdminDashboardAdminAccountsPage() {
  // Mobile navbar handler
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const {
    isLoading,
    admin,
    users,
    currentUser,
    userData,
    token,
    adminAccounts,
  } = useSelector((store) => store.admin);
  const dispatch = useDispatch();

  // Chart Setup
  const [userDataByMonth, setUserDataByMonth] = useState();
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
        colors: ["#262471", "#262471"],
      },
      fill: {
        colors: ["#262471", "#262471"],
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
        data: userDataByMonth,
      },
    ],
  };

  // Fetch Admin Accounts
  useEffect(() => {
    dispatch(fetchAdminAccounts(token));
  }, [token]);

  // function to handle deleting a user
  function deleteUser(userId) {
    dispatch(deleteUserById({ token, userId }));
  }

  // Modal states
  const [isCreateAdminModalOpen, setIsCreateAdminModalOpen] = useState(false);
  // Form fields
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [role, setRole] = useState();

  // Access control
  const [overview, setOverview] = useState(true);
  const [assignPartner, setAssignPartner] = useState(false);
  const [deleteBooking, setDeleteBooking] = useState(false);
  const [addBooking, setAddBooking] = useState(false);
  const [airportTransfer, setAirportTransfer] = useState(false);
  const [carRental, setCarRental] = useState(false);
  const [priorityPass, setPriorityPass] = useState(false);
  const [visaOnArrival, setVisaOnArrival] = useState(false);
  const [citiesAndAirports, setCitiesAndAirports] = useState(false);
  const [manageAdminAccounts, setManageAdminAccounts] = useState(false);
  const [manageUsers, setManageUsers] = useState(false);
  const [manageDrivers, setManageDrivers] = useState(false);
  const [manageVendors, setManageVendors] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [bulkEmail, setBulkEmail] = useState(false);
  const [bookingRates, setBookingRates] = useState(false);
  const [exchangeRates, setExchangeRates] = useState(false);
  const [blog, setBlog] = useState(false);

  // Role options
  const roleOptions = [
    { value: "Super Admin", label: "Super Admin" },
    { value: "Admin", label: "Admin" },
    { value: "Blogger", label: "Blogger" },
  ];

  // Function: This function handles creating a new admin account
  async function handleCreateAdminAccount(e) {
    e.preventDefault();
    console.log("Hi Hi Hi");
    dispatch(
      createAdminAccount({
        token,
        firstName,
        lastName,
        email,
        role: role?.value,
        username,
        accessRights: {
          overview,
          assignPartner,
          deleteBooking,
          addBooking,
          airportTransfer,
          carRental,
          priorityPass,
          visaOnArrival,
          citiesAndAirports,
          manageAdminAccounts,
          manageUsers,
          manageDrivers,
          manageVendors,
          pushNotifications,
          bulkEmail,
          bookingRates,
          exchangeRates,
          blog,
        },
      })
    );

    setIsCreateAdminModalOpen(false);
  }

  // Function: This function handles deleting a new admin account
  async function handleDeleteAdminAccount(adminId) {
    console.log("Hi Hi Hi");
    dispatch(
      deleteAdminAccount({
        token,
        adminId: adminId,
      })
    );
  }

  return (
    <div className="">
      <Helmet>
        <title>
          Manage Admin Accounts | Shuttlelane Portal Admin Dashboard
        </title>
      </Helmet>

      <ToastContainer />

      <Modal
        isOpen={isCreateAdminModalOpen}
        onRequestClose={() => setIsCreateAdminModalOpen(false)}
        className="flex h-full min-h-screen justify-center items-center lg:px-24 px-7"
      >
        <div className="overflow-y-scroll bg-white shadow-lg rounded-lg text-shuttlelaneBlack lg:w-2/4 w-full p-7 px-10 max-h-[90vh] shuttlelaneScrollbar">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Create Admin Account</h4>

            <FaXmark
              size={20}
              onClick={() => setIsCreateAdminModalOpen(false)}
              className="cursor-pointer"
            />
          </div>

          <form className="w-full mt-5 overflow-y-scroll shuttlelaneScrollbar max-h-[90%]">
            <div className="flex flex-col gap-y-5 lg:items-center gap-x-4">
              {/* First Name */}
              <div className="w-full flex flex-col gap-y-1">
                <label htmlFor="firstName" className="cursor-pointertext-sm">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="John"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
                />
              </div>
              {/* Last Name */}
              <div className="w-full flex flex-col gap-y-1">
                <label htmlFor="lastName" className="cursor-pointertext-sm">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Doe"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
                />
              </div>
              {/* Email */}
              <div className="w-full flex flex-col gap-y-1">
                <label htmlFor="email" className="cursor-pointertext-sm">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Doe"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
                />
              </div>
              {/* Username */}
              <div className="w-full flex flex-col gap-y-1">
                <label htmlFor="username" className="cursor-pointertext-sm">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Doe"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
                />
              </div>

              {/* Role */}
              <div className="w-full flex flex-col gap-y-1">
                <label htmlFor="targetAudience" className="text-sm">
                  Role
                </label>
                <Select
                  value={role}
                  onChange={(value) => setRole(value)}
                  options={roleOptions}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderColor: state.isFocused
                        ? "transparent"
                        : "transparent",
                      borderWidth: state.isFocused ? "0" : "0",
                      backgroundColor: "transparent",
                      position: "relative",
                      width: "100%",
                      height: "100%",
                    }),

                    placeholder: (baseStyles, state) => ({
                      ...baseStyles,
                      fontSize: ".875rem",
                      position: "relative",
                    }),

                    menuList: (baseStyles, state) => ({
                      ...baseStyles,
                      fontSize: ".875rem",
                      position: "relative",
                    }),

                    input: (baseStyles, state) => ({
                      ...baseStyles,
                      fontSize: ".875rem",
                      position: "relative",
                    }),
                  }}
                  placeholder="Select Role"
                  className="w-full h-12 flex items-center border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
                />
              </div>

              {/* Access Control */}
              <div className="w-full flex flex-col gap-y-1">
                <label htmlFor="accessControl" className="text-sm">
                  Access Control
                </label>

                {/* Access Control */}
                <div className="flex flex-col gap-y-2">
                  <div className="flex flex-row items-center gap-x-2">
                    <input
                      type="checkbox"
                      name="overview"
                      id="overview"
                      value={overview}
                      checked={overview}
                      onChange={(e) => {
                        console.log("VALUE::", e.target.value);
                        setOverview(e.target.value);
                      }}
                      disabled
                      className=""
                    />
                    <label htmlFor="overview" className="cursor-pointer">
                      Overview page
                    </label>
                  </div>
                  <div className="flex flex-row items-center gap-x-2">
                    <input
                      type="checkbox"
                      name="assignPartner"
                      id="assignPartner"
                      value={assignPartner}
                      checked={assignPartner}
                      onChange={(e) => {
                        console.log("VALUE::", e.target.value);
                        setAssignPartner(e.target.value);
                      }}
                      className=""
                    />
                    <label htmlFor="assignPartner" className="cursor-pointer">
                      Assign partner to booking
                    </label>
                  </div>
                  <div className="flex flex-row items-center gap-x-2">
                    <input
                      type="checkbox"
                      name="deleteBooking"
                      id="deleteBooking"
                      value={deleteBooking}
                      checked={deleteBooking}
                      onChange={(e) => {
                        console.log("VALUE::", e.target.value);
                        setDeleteBooking(e.target.value);
                      }}
                      className=""
                    />
                    <label htmlFor="deleteBooking" className="cursor-pointer">
                      Delete booking
                    </label>
                  </div>
                  <div className="flex flex-row items-center gap-x-2">
                    <input
                      type="checkbox"
                      name="addBooking"
                      id="addBooking"
                      value={addBooking}
                      checked={addBooking}
                      onChange={(e) => {
                        console.log("VALUE::", e.target.value);
                        setAddBooking(e.target.value);
                      }}
                      className=""
                    />
                    <label htmlFor="addBooking" className="cursor-pointer">
                      Add booking page
                    </label>
                  </div>
                  <div className="flex flex-row items-center gap-x-2">
                    <input
                      type="checkbox"
                      name="airportTransfer"
                      id="airportTransfer"
                      value={airportTransfer}
                      checked={airportTransfer}
                      onChange={(e) => {
                        console.log("VALUE::", e.target.value);
                        setAirportTransfer(e.target.value);
                      }}
                      className=""
                    />
                    <label htmlFor="airportTransfer" className="cursor-pointer">
                      Airport transfer bookings page
                    </label>
                  </div>
                  <div className="flex flex-row items-center gap-x-2">
                    <input
                      type="checkbox"
                      name="carRental"
                      id="carRental"
                      value={carRental}
                      checked={carRental}
                      onChange={(e) => {
                        console.log("VALUE::", e.target.value);
                        setCarRental(e.target.value);
                      }}
                      className=""
                    />
                    <label htmlFor="carRental" className="cursor-pointer">
                      Car rental bookings page
                    </label>
                  </div>
                  <div className="flex flex-row items-center gap-x-2">
                    <input
                      type="checkbox"
                      name="priorityPass"
                      id="priorityPass"
                      value={priorityPass}
                      checked={priorityPass}
                      onChange={(e) => {
                        console.log("VALUE::", e.target.value);
                        setPriorityPass(e.target.value);
                      }}
                      className=""
                    />
                    <label htmlFor="priorityPass" className="cursor-pointer">
                      Priority pass bookings page
                    </label>
                  </div>
                  <div className="flex flex-row items-center gap-x-2">
                    <input
                      type="checkbox"
                      name="visaOnArrival"
                      id="visaOnArrival"
                      value={visaOnArrival}
                      checked={visaOnArrival}
                      onChange={(e) => {
                        console.log("VALUE::", e.target.value);
                        setVisaOnArrival(e.target.value);
                      }}
                      className=""
                    />
                    <label htmlFor="visaOnArrival" className="cursor-pointer">
                      Visa on arrival bookings page
                    </label>
                  </div>
                  <div className="flex flex-row items-center gap-x-2">
                    <input
                      type="checkbox"
                      name="citiesAndAirports"
                      id="citiesAndAirports"
                      value={citiesAndAirports}
                      checked={citiesAndAirports}
                      onChange={(e) => {
                        console.log("VALUE::", e.target.value);
                        setCitiesAndAirports(e.target.value);
                      }}
                      className=""
                    />
                    <label
                      htmlFor="citiesAndAirports"
                      className="cursor-pointer"
                    >
                      Cities and airports page
                    </label>
                  </div>
                  <div className="flex flex-row items-center gap-x-2">
                    <input
                      type="checkbox"
                      name="manageAdminAccounts"
                      id="manageAdminAccounts"
                      value={manageAdminAccounts}
                      checked={manageAdminAccounts}
                      onChange={(e) => {
                        console.log("VALUE::", e.target.value);
                        setManageAdminAccounts(e.target.value);
                      }}
                      className=""
                    />
                    <label
                      htmlFor="manageAdminAccounts"
                      className="cursor-pointer"
                    >
                      Manage admin accounts page
                    </label>
                  </div>
                  <div className="flex flex-row items-center gap-x-2">
                    <input
                      type="checkbox"
                      name="manageUsers"
                      id="manageUsers"
                      value={manageUsers}
                      checked={manageUsers}
                      onChange={(e) => {
                        console.log("VALUE::", e.target.value);
                        setManageUsers(e.target.value);
                      }}
                      className=""
                    />
                    <label htmlFor="manageUsers" className="cursor-pointer">
                      Manage users page
                    </label>
                  </div>
                  <div className="flex flex-row items-center gap-x-2">
                    <input
                      type="checkbox"
                      name="manageDrivers"
                      id="manageDrivers"
                      value={manageDrivers}
                      checked={manageDrivers}
                      onChange={(e) => {
                        console.log("VALUE::", e.target.value);
                        setManageDrivers(e.target.value);
                      }}
                      className=""
                    />
                    <label htmlFor="manageDrivers" className="cursor-pointer">
                      Manage drivers page
                    </label>
                  </div>
                  <div className="flex flex-row items-center gap-x-2">
                    <input
                      type="checkbox"
                      name="manageVendors"
                      id="manageVendors"
                      value={manageVendors}
                      checked={manageVendors}
                      onChange={(e) => {
                        console.log("VALUE::", e.target.value);
                        setManageVendors(e.target.value);
                      }}
                      className=""
                    />
                    <label htmlFor="manageVendors" className="cursor-pointer">
                      Manage vendors page
                    </label>
                  </div>
                  <div className="flex flex-row items-center gap-x-2">
                    <input
                      type="checkbox"
                      name="pushNotifications"
                      id="pushNotifications"
                      value={pushNotifications}
                      checked={pushNotifications}
                      onChange={(e) => {
                        console.log("VALUE::", e.target.value);
                        setPushNotifications(e.target.value);
                      }}
                      className=""
                    />
                    <label
                      htmlFor="pushNotifications"
                      className="cursor-pointer"
                    >
                      Push notifications page
                    </label>
                  </div>
                  <div className="flex flex-row items-center gap-x-2">
                    <input
                      type="checkbox"
                      name="bulkEmail"
                      id="bulkEmail"
                      value={bulkEmail}
                      checked={bulkEmail}
                      onChange={(e) => {
                        console.log("VALUE::", e.target.value);
                        setBulkEmail(e.target.value);
                      }}
                      className=""
                    />
                    <label htmlFor="bulkEmail" className="cursor-pointer">
                      Bulk emails page
                    </label>
                  </div>
                  <div className="flex flex-row items-center gap-x-2">
                    <input
                      type="checkbox"
                      name="bookingRates"
                      id="bookingRates"
                      value={bookingRates}
                      checked={bookingRates}
                      onChange={(e) => {
                        console.log("VALUE::", e.target.value);
                        setBookingRates(e.target.value);
                      }}
                      className=""
                    />
                    <label htmlFor="bookingRates" className="cursor-pointer">
                      Booking rates page
                    </label>
                  </div>
                  <div className="flex flex-row items-center gap-x-2">
                    <input
                      type="checkbox"
                      name="exchangeRates"
                      id="exchangeRates"
                      value={exchangeRates}
                      checked={exchangeRates}
                      onChange={(e) => {
                        console.log("VALUE::", e.target.value);
                        setExchangeRates(e.target.value);
                      }}
                      className=""
                    />
                    <label htmlFor="exchangeRates" className="cursor-pointer">
                      Exchange rates page
                    </label>
                  </div>
                  <div className="flex flex-row items-center gap-x-2">
                    <input
                      type="checkbox"
                      name="blog"
                      id="blog"
                      value={blog}
                      checked={blog}
                      onChange={(e) => {
                        console.log("VALUE::", e.target.value);
                        setBlog(e.target.value);
                      }}
                      className=""
                    />
                    <label htmlFor="blog" className="cursor-pointer">
                      Blog page
                    </label>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                onClick={(e) => handleCreateAdminAccount(e)}
                className="w-full flex justify-center items-center text-sm text-white hover:text-shuttlelaneBlack h-11 p-3 transition-all hover:border-[1px] hover:bg-transparent bg-shuttlelanePurple focus:outline-none border-gray-400 rounded-lg"
              >
                {isLoading ? (
                  <ImSpinner2 size={21} className="animate-spin" />
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Navbar here */}
      <AdminDashboardNavbar
        link="users"
        sublink="manage-admin-accounts"
        isNavbarOpen={isNavbarOpen}
        setIsNavbarOpen={setIsNavbarOpen}
      />

      {/* Main content goes here */}
      <div className="w-full min-h-screen lg:pl-[6%] bg-[#fff] text-shuttlelaneBlack">
        <div className="px-7 py-5 relative">
          {/* Top bar */}
          <AdminTopBar
            isNavbarOpen={isNavbarOpen}
            setIsNavbarOpen={setIsNavbarOpen}
          />

          {/* Main content */}
          <div className="mt-24 pt-2">
            <div className="flex gap-x-5">
              {/* Booking Summary - Total number of bookings */}
              <div className="w-full">
                {/* Admin accounts */}
                <div className="w-full">
                  <div className="flex flex-col items-start justify-start lg:flex-row lg:items-center gap-x-5 w-full lg:justify-normal">
                    {/* Searchbar */}
                    <div className="flex items-center gap-x-3 border-[1.3px] lg:border-[.3px] border-gray-300 rounded-lg px-2 my-2 lg:w-1/4 w-full">
                      <BiSearch size={16} className="text-gray-400 rotate-90" />
                      <input
                        type="search"
                        placeholder="Search"
                        className="w-full h-8 bg-transparent text-xs focus:outline-none placeholder:text-xs placeholder:text-gray-400"
                      />
                    </div>

                    {/* create admin button */}
                    {admin?.role !== "Blogger" && (
                      <button
                        onClick={() => {
                          setIsCreateAdminModalOpen(true);
                        }}
                        className="my-2 w-auto border-dashed border-[1.3px] lg:border-[.3px] border-shuttlelaneBlack p-1 rounded-sm flex items-center gap-x-1"
                      >
                        <AiOutlinePlus size={16} />
                        <span className="text-xs">Create admin account</span>
                      </button>
                    )}
                  </div>

                  <div className="w-full rounded-lg border-[1.3px] lg:border-[.3px] p-3 border-gray-100 h-auto">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-center gap-x-2">
                        <p className="font-medium">Admin Accounts</p>
                        <div className="h-2 w-2 rounded-full bg-shuttlelanePurple"></div>
                      </div>
                    </div>

                    <div className="overflow-x-scroll shuttlelaneScrollbarHoriz shuttlelaneScrollbar">
                      {/* Table header */}
                      <div className="w-full flex justify-between items-baseline mb-2 border-b-[.3px] border-b-gray-100 text-gray-400 mt-2">
                        <p className="min-w-[200px] w-[200px] lg:w-[25%] text-xs">
                          Full name
                        </p>
                        <p className="min-w-[200px] w-[200px] lg:w-[25%] text-xs">
                          Email Address
                        </p>
                        <p className="min-w-[200px] w-[200px] lg:w-[25%] text-xs">
                          Role
                        </p>
                        {/* <p className="min-w-[200px] w-[200px] lg:w-[25%] text-xs">Last Booking</p> */}
                        {(admin?.role !== "Blogger" ||
                          admin?.role !== "Admin") && (
                          <p className="min-w-[200px] w-[200px] lg:w-[25%] text-xs">
                            Actions
                          </p>
                        )}
                      </div>

                      {/* Table body - Admin card */}
                      {adminAccounts?.map((adminAccount) => (
                        <div className="w-full flex justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                          <p
                            className={`min-w-[200px] w-[200px] lg:w-[25%] text-xs ${
                              isLoading && "text-gray-400"
                            }`}
                          >
                            {adminAccount?.firstName} {adminAccount?.lastName}
                          </p>
                          <p
                            className={`min-w-[200px] w-[200px] lg:w-[25%] text-xs ${
                              isLoading && "text-gray-400"
                            }`}
                          >
                            {adminAccount?.email}
                          </p>
                          <p
                            className={`min-w-[200px] w-[200px] lg:w-[25%] text-xs ${
                              isLoading && "text-gray-400"
                            }`}
                          >
                            {adminAccount?.role}
                          </p>
                          {/* <p className="min-w-[200px] w-[200px] lg:w-[25%] text-xs">
                        12 November 2023
                      </p> */}

                          {(admin?.role !== "Blogger" ||
                            admin?.role !== "Admin") && (
                            <div className="min-w-[200px] w-[200px] lg:w-[25%] flex items-center gap-x-3">
                              {!isLoading ? (
                                <button
                                  onClick={() =>
                                    handleDeleteAdminAccount(adminAccount?._id)
                                  }
                                  className="text-xs"
                                >
                                  <AiFillDelete
                                    size={16}
                                    className="text-red-500"
                                  />
                                </button>
                              ) : (
                                <ImSpinner2
                                  size={16}
                                  className="text-gray-400 animate-spin"
                                />
                              )}
                            </div>
                          )}
                        </div>
                      ))}

                      {adminAccounts?.length < 1 && (
                        <div className="flex justify-center">
                          <p className="text-center text-sm">
                            No data to show for now...
                          </p>
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

export default AdminDashboardAdminAccountsPage;
