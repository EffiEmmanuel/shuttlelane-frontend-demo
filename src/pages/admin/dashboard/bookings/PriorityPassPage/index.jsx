import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPassport, FaUser } from "react-icons/fa";
import { MdLuggage, MdOutlineFlightTakeoff } from "react-icons/md";
import { IoCarSport } from "react-icons/io5";
import AdminDashboardNavbar from "../../../../../components/ui/Admin/AdminDashboardNavbar";
import { HiOutlineExternalLink } from "react-icons/hi";
import Chart from "react-apexcharts";
import { BiSearch } from "react-icons/bi";
import AdminTopBar from "../../../../../components/ui/Admin/AdminTopBar";
import { LuCopy } from "react-icons/lu";
import { AiFillDelete, AiOutlineCheckCircle } from "react-icons/ai";

function AdminDashboardPriorityPassPage() {
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

  const [upcomingBookings, setUpcomingBookings] = useState();
  const [bookings, setBookings] = useState();

  return (
    <div className="">
      {/* Navbar here */}
      <AdminDashboardNavbar link="bookings" sublink="priority-pass" />

      {/* Main content goes here */}
      <div className="w-full min-h-screen pl-[6%] bg-[#fff] text-shuttlelaneBlack">
        <div className="px-7 py-5 relative">
          {/* Top bar */}
          <AdminTopBar />

          {/* Main content */}
          <div className="mt-24 pt-2">
            <div className="flex flex-col gap-y-5">
              {/* Booking Summary - Total number of bookings */}
              <div className="w-full">
                <div className="w-full">
                  <div className="w-full rounded-lg border-[.3px] p-3 border-gray-100 h-auto overfow-x-scroll">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-center gap-x-2">
                        <p className="font-medium">
                          Upcoming Priority Pass Bookings
                        </p>
                        <div className="h-2 w-2 rounded-full bg-shuttlelaneGold"></div>
                      </div>
                    </div>

                    <div className="w-full overflow-x-scroll shuttlelaneScrollbarHoriz">
                      {/* Table header */}
                      <div className="flex lg:w-auto w-max justify-between items-baseline mb-2 border-b-[.3px] border-b-gray-100 text-gray-400 mt-2">
                        <p className="w-[180px] lg:w-[20%] text-xs">
                          Full name
                        </p>
                        <p className="w-[180px] lg:w-[20%] text-xs">
                          Email Address
                        </p>
                        <p className="w-[180px] lg:w-[20%] text-xs">Date</p>

                        <p className="w-[180px] lg:w-[20%] text-xs">
                          Payment Status
                        </p>

                        <p className="w-[180px] lg:w-[20%] text-xs">Actions</p>
                      </div>

                      {upcomingBookings?.map((booking) => (
                        <div className="flex lg:w-auto w-max justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                          <p className="w-[180px] lg:w-[20%] text-xs">
                            {booking?.firstName} {booking?.lastName}
                          </p>
                          <p className="w-[180px] lg:w-[20%] text-xs">
                            {booking?.emailAddress}
                          </p>
                          <p className="w-[180px] lg:w-[20%] text-xs">
                            {booking?.pickupDate}
                          </p>
                          <div className="w-[180px] lg:w-[16.6%] flex items-center gap-x-1">
                            <div
                              className={`h-2 w-2 ${
                                booking?.paymentStatus === "failed"
                                  ? "bg-success-500"
                                  : booking?.paymentStatus === "pending"
                                  ? "bg-red-500"
                                  : "bg-red-500"
                              } rounded-full`}
                            ></div>
                            <span
                              className={`text-xs ${
                                booking?.paymentStatus === "failed"
                                  ? "text-success-500"
                                  : booking?.paymentStatus === "pending"
                                  ? "text-red-500"
                                  : "text-red-500"
                              }`}
                            >
                              {booking?.paymentStatus}
                            </span>
                          </div>

                          <div className="w-[180px] lg:w-[16.6%] flex items-center gap-x-3">
                            <button className="h-7 w-28 p-2 text-white bg-shuttlelanePurple rounded-lg text-xs">
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
                        <div className="flex justify-center items-center w-full">
                          <p className="text-sm">
                            You are all caught up. There are no upcoming
                            bookings for now.
                          </p>
                        </div>
                      )}

                      {/* Table body - Upcoming booking card */}
                      <div className="flex lg:w-auto w-max justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                        <p className="w-[180px] lg:w-[20%] text-xs">
                          Oluwaseyi Bhadmus
                        </p>
                        <p className="w-[180px] lg:w-[20%] text-xs">
                          seyi@gmail.com
                        </p>
                        <p className="w-[180px] lg:w-[20%] text-xs">
                          25 November 2023
                        </p>
                        <div className="w-[180px] lg:w-[20%] flex items-center gap-x-1">
                          <div
                            className={`h-2 w-2 bg-green-500 rounded-full`}
                          ></div>
                          <span className={`text-xs text-green-500`}>
                            Successful
                          </span>
                        </div>
                        <div className="w-[180px] lg:w-[20%] flex items-center gap-x-3">
                          <button className="h-7 w-28 p-2 text-white bg-shuttlelanePurple rounded-lg text-xs">
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
                      {/* Table body - Upcoming booking card */}
                      <div className="flex lg:w-auto w-max justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                        <p className="w-[180px] lg:w-[20%] text-xs">
                          Oluwaseyi Bhadmus
                        </p>
                        <p className="w-[180px] lg:w-[20%] text-xs">
                          seyi@gmail.com
                        </p>
                        <p className="w-[180px] lg:w-[20%] text-xs">
                          25 November 2023
                        </p>
                        <div className="w-[180px] lg:w-[20%] flex items-center gap-x-1">
                          <div
                            className={`h-2 w-2 bg-green-500 rounded-full`}
                          ></div>
                          <span className={`text-xs text-green-500`}>
                            Successful
                          </span>
                        </div>
                        <div className="w-[180px] lg:w-[20%] flex items-center gap-x-3">
                          <button className="h-7 w-28 p-2 text-white bg-shuttlelanePurple rounded-lg text-xs">
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
                      {/* Table body - Upcoming booking card */}
                      <div className="flex lg:w-auto w-max justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                        <p className="w-[180px] lg:w-[20%] text-xs">
                          Oluwaseyi Bhadmus
                        </p>
                        <p className="w-[180px] lg:w-[20%] text-xs">
                          seyi@gmail.com
                        </p>
                        <p className="w-[180px] lg:w-[20%] text-xs">
                          25 November 2023
                        </p>
                        <div className="w-[180px] lg:w-[20%] flex items-center gap-x-1">
                          <div
                            className={`h-2 w-2 bg-green-500 rounded-full`}
                          ></div>
                          <span className={`text-xs text-green-500`}>
                            Successful
                          </span>
                        </div>
                        <div className="w-[180px] lg:w-[20%] flex items-center gap-x-3">
                          <button className="h-7 w-28 p-2 text-white bg-shuttlelanePurple rounded-lg text-xs">
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
                    </div>
                  </div>
                </div>
              </div>
              {/* Booking Summary - Total number of bookings */}
              <div className="w-full">
                <div className="mt-11 w-full">
                  {/* Searchbar */}
                  <div className="flex items-center gap-x-3 border-[.3px] border-gray-300 rounded-lg px-2 my-2 lg:w-1/4 w-full">
                    <BiSearch size={16} className="text-gray-400 rotate-90" />
                    <input
                      type="search"
                      placeholder="Search"
                      className="w-full h-8 bg-transparent text-xs focus:outline-none placeholder:text-xs placeholder:text-gray-400"
                    />
                  </div>

                  <div className="w-full rounded-lg border-[.3px] p-3 border-gray-100 h-auto">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-center gap-x-2">
                        <p className="font-medium">Priority Pass Bookings</p>
                        <div className="h-2 w-2 rounded-full bg-shuttlelanePurple"></div>
                      </div>
                    </div>

                    <div className="w-full shuttlelaneScrollbarHoriz overflow-x-scroll">
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

                      {bookings?.map((booking) => (
                        <div className="flex lg:w-auto w-max justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                          <p className="w-[180px] lg:w-[16.6%] text-xs flex items-center gap-x-2">
                            <span className="text-xs">PP36578</span>
                            <LuCopy
                              size={14}
                              className="text-shuttlelaneBlack"
                            />
                            <AiOutlineCheckCircle
                              size={14}
                              className="text-green-500"
                            />
                          </p>
                          <p className="w-[180px] lg:w-[16.6%] text-xs">
                            {booking?.firstName} {booking?.lastName}
                          </p>
                          <p className="w-[180px] lg:w-[16.6%] text-xs">
                            {booking?.emailAddress}
                          </p>
                          <p className="w-[180px] lg:w-[16.6%] text-xs">
                            {booking?.pickupDate}
                          </p>
                          <p className="w-[180px] lg:w-[16.6%] text-xs">
                            {booking?.carSelected}
                          </p>

                          <div className="w-[180px] lg:w-[16.6%] flex items-center gap-x-3">
                            <button className="text-xs">
                              <AiFillDelete
                                size={16}
                                className="text-red-500"
                              />
                            </button>
                          </div>
                        </div>
                      ))}
                      {bookings?.length < 1 && (
                        <div className="flex justify-center items-center w-full">
                          <p className="text-sm">
                            There are no bookings for now.
                          </p>
                        </div>
                      )}
                      <div className="flex lg:w-auto w-max justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                        <p className="w-[180px] lg:w-[16.6%] text-xs flex items-center gap-x-2">
                          <span className="text-xs">PP36578</span>
                          <LuCopy size={14} className="text-shuttlelaneBlack" />
                          <AiOutlineCheckCircle
                            size={14}
                            className="text-green-500"
                          />
                        </p>
                        <p className="w-[180px] lg:w-[16.6%] text-xs">
                          Effi Emmanuel
                        </p>
                        <p className="w-[180px] lg:w-[16.6%] text-xs">
                          effiemmanuel@gmail.com
                        </p>
                        <p className="w-[180px] lg:w-[16.6%] text-xs">
                          12 October 2023
                        </p>
                        <div className="w-[180px] lg:w-[16.6%] flex items-center gap-x-1">
                          <div
                            className={`h-2 w-2 bg-red-500 rounded-full`}
                          ></div>
                          <span className={`text-xs text-red-500`}>Failed</span>
                        </div>

                        <div className="w-[180px] lg:w-[16.6%] flex items-center gap-x-3">
                          <button className="text-xs">
                            <AiFillDelete size={16} className="text-red-500" />
                          </button>
                        </div>
                      </div>
                      <div className="flex lg:w-auto w-max justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                        <p className="w-[180px] lg:w-[16.6%] text-xs flex items-center gap-x-2">
                          <span className="text-xs">PP36578</span>
                          <LuCopy size={14} className="text-shuttlelaneBlack" />
                          <AiOutlineCheckCircle
                            size={14}
                            className="text-green-500"
                          />
                        </p>
                        <p className="w-[180px] lg:w-[16.6%] text-xs">
                          Effi Emmanuel
                        </p>
                        <p className="w-[180px] lg:w-[16.6%] text-xs">
                          effiemmanuel@gmail.com
                        </p>
                        <p className="w-[180px] lg:w-[16.6%] text-xs">
                          12 October 2023
                        </p>
                        <div className="w-[180px] lg:w-[16.6%] flex items-center gap-x-1">
                          <div
                            className={`h-2 w-2 bg-red-500 rounded-full`}
                          ></div>
                          <span className={`text-xs text-red-500`}>Failed</span>
                        </div>

                        <div className="w-[180px] lg:w-[16.6%] flex items-center gap-x-3">
                          <button className="text-xs">
                            <AiFillDelete size={16} className="text-red-500" />
                          </button>
                        </div>
                      </div>
                      <div className="flex lg:w-auto w-max justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                        <p className="w-[180px] lg:w-[16.6%] text-xs flex items-center gap-x-2">
                          <span className="text-xs">PP36578</span>
                          <LuCopy size={14} className="text-shuttlelaneBlack" />
                          <AiOutlineCheckCircle
                            size={14}
                            className="text-green-500"
                          />
                        </p>
                        <p className="w-[180px] lg:w-[16.6%] text-xs">
                          Effi Emmanuel
                        </p>
                        <p className="w-[180px] lg:w-[16.6%] text-xs">
                          effiemmanuel@gmail.com
                        </p>
                        <p className="w-[180px] lg:w-[16.6%] text-xs">
                          12 October 2023
                        </p>
                        <div className="w-[180px] lg:w-[16.6%] flex items-center gap-x-1">
                          <div
                            className={`h-2 w-2 bg-red-500 rounded-full`}
                          ></div>
                          <span className={`text-xs text-red-500`}>Failed</span>
                        </div>

                        <div className="w-[180px] lg:w-[16.6%] flex items-center gap-x-3">
                          <button className="text-xs">
                            <AiFillDelete size={16} className="text-red-500" />
                          </button>
                        </div>
                      </div>
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

export default AdminDashboardPriorityPassPage;
