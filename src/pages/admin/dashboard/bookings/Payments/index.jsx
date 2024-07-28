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
  fetchPayments,
  fetchUsers,
} from "../../../../../redux/slices/adminSlice";
import { ImSpinner2 } from "react-icons/im";
import { ToastContainer } from "react-toastify";
import Modal from "react-modal";
import { FaXmark } from "react-icons/fa6";
import Select from "react-select";
import { Helmet } from "react-helmet";

function AdminDashboardPaymentsPage() {
  const { isLoading, token, payments } = useSelector((store) => store.admin);
  const dispatch = useDispatch();

  // Mobile navbar handler
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  // Chart Setup
  //   const [userDataByMonth, setUserDataByMonth] = useState();
  //   const state = {
  //     options: {
  //       chart: {
  //         id: "apexchart-example",
  //         fontFamily: "Poppins",
  //         style: {
  //           fontSize: ".8rem",
  //         },
  //       },
  //       dataLabels: {
  //         enabled: false,
  //       },
  //       stroke: {
  //         colors: ["#262471", "#262471"],
  //       },
  //       fill: {
  //         colors: ["#262471", "#262471"],
  //         pattern: {
  //           style: "circles",
  //           strokeWidth: 1,
  //           height: 1,
  //           width: 1,
  //         },
  //       },
  //       xaxis: {
  //         categories: [
  //           "Jan",
  //           "Feb",
  //           "Mar",
  //           "Apr",
  //           "May",
  //           "Jun",
  //           "Jul",
  //           "Aug",
  //           "Sep",
  //           "Oct",
  //           "Nov",
  //           "Dec",
  //         ],
  //       },
  //       yaxis: {
  //         labels: {
  //           show: true,
  //           minWidth: 0,
  //           maxWidth: 160,
  //           style: {
  //             colors: [],
  //             fontSize: "30px",
  //             fontFamily: "Poppins",
  //             cssClass: "text-xs",
  //           },
  //           formatter: (value) => {
  //             const formattedValue = Intl.NumberFormat("en-US", {}).format(value);
  //             return formattedValue;
  //           },
  //         },
  //       },
  //     },
  //     series: [
  //       {
  //         name: "",
  //         data: userDataByMonth,
  //       },
  //     ],
  //   };

  // Fetch Admin Accounts
  useEffect(() => {
    dispatch(fetchPayments(token));
  }, [token]);

  return (
    <div className="">
      <Helmet>
        <title>Payments | Shuttlelane Portal Admin Dashboard</title>
      </Helmet>

      <ToastContainer />

      {/* Navbar here */}
      <AdminDashboardNavbar
        link="booking"
        sublink="payments"
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
            <div className="flex gap-x-5">
              <div className="w-full">
                {/* Admin accounts */}
                <div className="w-full">
                  <div className="flex flex-row items-center gap-x-5 justify-between w-full lg:justify-normal">
                    {/* Searchbar */}
                    {/* <div className="flex items-center gap-x-3 border-[1.3px] lg:border-[.3px] border-gray-300 rounded-lg px-2 my-2 lg:w-1/4 w-full">
                      <BiSearch size={16} className="text-gray-400 rotate-90" />
                      <input
                        type="search"
                        placeholder="Search"
                        className="w-full h-8 bg-transparent text-xs focus:outline-none placeholder:text-xs placeholder:text-gray-400"
                      />
                    </div> */}

                    {/* create admin button */}
                    {/* <button
                      onClick={() => {
                        setIsCreateAdminModalOpen(true);
                      }}
                      className="w-auto border-dashed border-[1.3px] lg:border-[.3px] border-shuttlelaneBlack p-1 rounded-sm flex items-center gap-x-1"
                    >
                      <AiOutlinePlus size={16} />
                      <span className="text-xs">Create admin account</span>
                    </button> */}
                  </div>

                  <div className="w-full rounded-lg border-[1.3px] lg:border-[.3px] p-3 border-gray-100 h-auto">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-center gap-x-2">
                        <p className="font-medium">
                          Payments - {payments?.length}
                        </p>
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      </div>
                    </div>

                    <div className="w-full shuttlelaneScrollbarHoriz overflow-x-scroll">
                      {/* Table header */}
                      <div className="flex lg:w-auto w-max justify-between items-baseline mb-2 border-b-[.3px] border-b-gray-100 text-gray-400 mt-2">
                        <p className="w-[200px] lg:w-[20%] text-xs">
                          Booking Reference
                        </p>
                        <p className="w-[200px] lg:w-[20%] text-xs">
                          Full Name
                        </p>
                        <p className="w-[200px] lg:w-[20%] text-xs">Amount</p>
                        <p className="w-[200px] lg:w-[20%] text-xs">
                          Payment Gateway
                        </p>
                        <p className="w-[200px] lg:w-[20%] text-xs">
                          Payment Status
                        </p>
                      </div>

                      {/* Table body - Payment card */}
                      {payments?.map((payment) => (
                        <div className="flex lg:w-auto w-max justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                          <p
                            className={`w-200px lg:w-[20%] text-xs ${
                              isLoading && "text-gray-400"
                            }`}
                          >
                            {payment?.booking?.bookingReference}
                          </p>
                          <p
                            className={`w-200px lg:w-[20%] text-xs ${
                              isLoading && "text-gray-400"
                            }`}
                          >
                            {payment?.user?.firstName ?? payment?.firstName}{" "}
                            {payment?.user?.lastName ?? payment?.lastName}
                          </p>
                          <p
                            className={`w-200px lg:w-[20%] text-xs ${
                              isLoading && "text-gray-400"
                            }`}
                          >
                            {payment?.currency?.symbol ?? "₦"}
                            {Intl.NumberFormat("en-US", {}).format(
                              payment?.amount
                            )}
                          </p>
                          <p
                            className={`w-200px lg:w-[20%] text-xs ${
                              isLoading && "text-gray-400"
                            }`}
                          >
                            {payment?.gateway}
                          </p>
                          <div className="min-w-[200px] w-[200px] lg:w-[20%] flex items-center gap-x-1">
                            <div
                              className={`h-2 w-2 ${
                                payment?.paymentStatus === "Failed"
                                  ? "bg-red-500"
                                  : payment?.paymentStatus === "Successful"
                                  ? "bg-green-500"
                                  : "bg-yellow-500"
                              } rounded-full`}
                            ></div>
                            <span
                              className={`text-xs ${
                                payment?.paymentStatus === "Failed"
                                  ? "text-red-500"
                                  : payment?.paymentStatus === "Successful"
                                  ? "text-green-500"
                                  : "text-yellow-500"
                              }`}
                            >
                              {payment?.paymentStatus === "Failed"
                                ? "Failed"
                                : payment?.paymentStatus === "Successful"
                                ? "Successful"
                                : "Pending"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {payments?.length < 1 && (
                      <div className="flex justify-center">
                        <p className="text-center text-sm">
                          No data to show for now...
                        </p>
                      </div>
                    )}

                    {isLoading && (
                      <div className="bg-white pb-10 shadow-lg rounded-lg text-shuttlelaneBlack w-full min-h-[80%] max-h-[80%] h-[80%] lg:w-[60%] p-7 px-10 overflow-y-scroll shuttlelaneScrollbar">
                        <div className="flex w-full h-full items-center justify-center">
                          <ImSpinner2
                            size={20}
                            className="cursor-loading animate-spin"
                          />
                        </div>
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

export default AdminDashboardPaymentsPage;
