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

  // Role options
  const roleOptions = [
    { value: "Super Admin", label: "Super Admin" },
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
      })
    );
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
        <div className="bg-white shadow-lg rounded-lg text-shuttlelaneBlack lg:w-2/4 w-full p-7 px-10">
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
                <label htmlFor="firstName" className="text-sm">
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
                <label htmlFor="lastName" className="text-sm">
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
                <label htmlFor="email" className="text-sm">
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
                <label htmlFor="username" className="text-sm">
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
                      zIndex: 0,
                      width: "100%",
                      height: "100%",
                    }),

                    placeholder: (baseStyles, state) => ({
                      ...baseStyles,
                      fontSize: ".875rem",
                      position: "relative",
                      zIndex: 0,
                    }),

                    menuList: (baseStyles, state) => ({
                      ...baseStyles,
                      fontSize: ".875rem",
                      position: "relative",
                      zIndex: 0,
                    }),

                    input: (baseStyles, state) => ({
                      ...baseStyles,
                      fontSize: ".875rem",
                      position: "relative",
                      zIndex: 0,
                    }),
                  }}
                  placeholder="Select Role"
                  className="w-full h-12 flex items-center border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
                />
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
                  <div className="flex flex-row items-center gap-x-5 justify-between w-full lg:justify-normal">
                    {/* Searchbar */}
                    <div className="flex items-center gap-x-3 border-[1px] lg:border-[.3px] border-gray-300 rounded-lg px-2 my-2 lg:w-1/4 w-full">
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
                        className="w-auto border-dashed border-[1px] lg:border-[.3px] border-shuttlelaneBlack p-1 rounded-sm flex items-center gap-x-1"
                      >
                        <AiOutlinePlus size={16} />
                        <span className="text-xs">Create admin account</span>
                      </button>
                    )}
                  </div>

                  <div className="w-full rounded-lg border-[1px] lg:border-[.3px] p-3 border-gray-100 h-auto">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-center gap-x-2">
                        <p className="font-medium">Admin Accounts</p>
                        <div className="h-2 w-2 rounded-full bg-shuttlelanePurple"></div>
                      </div>
                    </div>

                    {/* Table header */}
                    <div className="flex justify-between items-baseline mb-2 border-b-[.3px] border-b-gray-100 text-gray-400 mt-2">
                      <p className="w-200px lg:w-[25%] text-xs">Full name</p>
                      <p className="w-200px lg:w-[25%] text-xs">
                        Email Address
                      </p>
                      <p className="w-200px lg:w-[25%] text-xs">Role</p>
                      {/* <p className="w-200px lg:w-[25%] text-xs">Last Booking</p> */}
                      {admin?.role !== "Blogger" && (
                        <p className="w-200px lg:w-[25%] text-xs">Actions</p>
                      )}
                    </div>

                    {/* Table body - Admin card */}
                    {adminAccounts?.map((adminAccount) => (
                      <div className="flex justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                        <p
                          className={`w-200px lg:w-[25%] text-xs ${
                            isLoading && "text-gray-400"
                          }`}
                        >
                          {adminAccount?.firstName} {adminAccount?.lastName}
                        </p>
                        <p
                          className={`w-200px lg:w-[25%] text-xs ${
                            isLoading && "text-gray-400"
                          }`}
                        >
                          {adminAccount?.email}
                        </p>
                        <p
                          className={`w-200px lg:w-[25%] text-xs ${
                            isLoading && "text-gray-400"
                          }`}
                        >
                          {adminAccount?.role}
                        </p>
                        {/* <p className="w-200px lg:w-[25%] text-xs">
                        12 November 2023
                      </p> */}

                        {admin?.role !== "Blogger" && (
                          <div className="w-[180px] lg:w-[25%] flex items-center gap-x-3">
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
  );
}

export default AdminDashboardAdminAccountsPage;
