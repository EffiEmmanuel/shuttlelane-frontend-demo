import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPassport, FaUser } from "react-icons/fa";
import { MdLuggage, MdOutlineFlightTakeoff } from "react-icons/md";
import { IoCarSport } from "react-icons/io5";
import AdminDashboardNavbar from "../../../components/ui/Admin/AdminDashboardNavbar";
import { HiOutlineExternalLink } from "react-icons/hi";
import Chart from "react-apexcharts";
import { BiSearch } from "react-icons/bi";
import AdminTopBar from "../../../components/ui/Admin/AdminTopBar";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

function AdminDashboardHomePage() {
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

  return (
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

          {/* Main content */}
          <div className="mt-24 pt-2">
            <div className="flex xl:flex-row flex-col gap-y-5 gap-x-5">
              {/* Booking Summary - Total number of bookings */}
              <div className="xl:w-[70%] w-full">
                {/* FOR LARGE SCREENS */}
                <div className="W-full h-auto hidden xl:flex lg:flex-row flex-col gap-y-3 gap-x-3 rounded-lg">
                  {/* Total Card */}
                  <div className="flex flex-col text-center gap-y-2 lg:text-left lg:flex-row gap-x-2 p-3 items-center rounded-lg border-[.3px] border-gray-100 lg:w-1/4 w-full">
                    <div className="h-10 w-10 rounded-full bg-shuttlelanePurple shadow-[#4540cf85] shadow-md flex justify-center items-center">
                      <MdOutlineFlightTakeoff
                        size={16}
                        className="text-white"
                      />
                    </div>
                    <div className="">
                      <p className="text-2xl font-semibold spaceGroteskText">
                        78
                      </p>
                      <small className="text-sm text-gray-400">
                        Airport Bookings
                      </small>
                    </div>
                  </div>
                  {/* Total Card */}
                  <div className="flex flex-col text-center gap-y-2 lg:text-left lg:flex-row gap-x-2 p-3 items-center rounded-lg border-[.3px] border-gray-100 lg:w-1/4 w-full">
                    <div className="h-10 w-10 rounded-full bg-shuttlelanePurple shadow-[#4540cf85] shadow-md flex justify-center items-center">
                      <IoCarSport size={16} className="text-white" />
                    </div>
                    <div className="">
                      <p className="text-2xl font-semibold spaceGroteskText">
                        30
                      </p>
                      <small className="text-sm text-gray-400">
                        Car Rental
                      </small>
                    </div>
                  </div>
                  {/* Total Card */}
                  <div className="flex flex-col text-center gap-y-2 lg:text-left lg:flex-row gap-x-2 p-3 items-center rounded-lg border-[.3px] border-gray-100 lg:w-1/4 w-full">
                    <div className="h-10 w-10 rounded-full bg-shuttlelanePurple shadow-[#4540cf85] shadow-md flex justify-center items-center">
                      <MdLuggage size={16} className="text-white" />
                    </div>
                    <div className="">
                      <p className="text-2xl font-semibold spaceGroteskText">
                        64
                      </p>
                      <small className="text-sm text-gray-400">
                        Priority Pass
                      </small>
                    </div>
                  </div>
                  {/* Total Card */}
                  <div className="flex flex-col text-center gap-y-2 lg:text-left lg:flex-row gap-x-2 p-3 items-center rounded-lg border-[.3px] border-gray-100 lg:w-1/4 w-full">
                    <div className="h-10 w-10 rounded-full bg-shuttlelanePurple shadow-[#4540cf85] shadow-md flex justify-center items-center">
                      <FaPassport size={16} className="text-white" />
                    </div>
                    <div className="">
                      <p className="text-2xl font-semibold spaceGroteskText">
                        23
                      </p>
                      <small className="text-sm text-gray-400">
                        Visa On Arrival
                      </small>
                    </div>
                  </div>
                </div>
                {/* FOR SMALLER SCREENS */}
                <div className="W-full h-auto xl:hidden flex lg:flex-row flex-col gap-y-3 gap-x-3 rounded-lg">
                  <Slide
                    transitionDuration={500}
                    arrows={false}
                    pauseOnHover={false}
                    duration={4000}
                    canSwipe={true}
                    indicators={true}
                  >
                    {/* Total Card */}
                    <div className="flex flex-col text-center gap-y-2 lg:text-left lg:flex-row gap-x-2 p-3 items-center rounded-lg border-[.3px] border-gray-100 lg:w-1/4 w-full">
                      <div className="h-10 w-10 rounded-full bg-shuttlelanePurple shadow-[#4540cf85] shadow-md flex justify-center items-center">
                        <MdOutlineFlightTakeoff
                          size={16}
                          className="text-white"
                        />
                      </div>
                      <div className="">
                        <p className="text-2xl font-semibold spaceGroteskText">
                          78
                        </p>
                        <small className="text-sm text-gray-400">
                          Airport Bookings
                        </small>
                      </div>
                    </div>
                    {/* Total Card */}
                    <div className="flex flex-col text-center gap-y-2 lg:text-left lg:flex-row gap-x-2 p-3 items-center rounded-lg border-[.3px] border-gray-100 lg:w-1/4 w-full">
                      <div className="h-10 w-10 rounded-full bg-shuttlelanePurple shadow-[#4540cf85] shadow-md flex justify-center items-center">
                        <IoCarSport size={16} className="text-white" />
                      </div>
                      <div className="">
                        <p className="text-2xl font-semibold spaceGroteskText">
                          30
                        </p>
                        <small className="text-sm text-gray-400">
                          Car Rental
                        </small>
                      </div>
                    </div>
                    {/* Total Card */}
                    <div className="flex flex-col text-center gap-y-2 lg:text-left lg:flex-row gap-x-2 p-3 items-center rounded-lg border-[.3px] border-gray-100 lg:w-1/4 w-full">
                      <div className="h-10 w-10 rounded-full bg-shuttlelanePurple shadow-[#4540cf85] shadow-md flex justify-center items-center">
                        <MdLuggage size={16} className="text-white" />
                      </div>
                      <div className="">
                        <p className="text-2xl font-semibold spaceGroteskText">
                          64
                        </p>
                        <small className="text-sm text-gray-400">
                          Priority Pass
                        </small>
                      </div>
                    </div>
                    {/* Total Card */}
                    <div className="flex flex-col text-center gap-y-2 lg:text-left lg:flex-row gap-x-2 p-3 items-center rounded-lg border-[.3px] border-gray-100 lg:w-1/4 w-full">
                      <div className="h-10 w-10 rounded-full bg-shuttlelanePurple shadow-[#4540cf85] shadow-md flex justify-center items-center">
                        <FaPassport size={16} className="text-white" />
                      </div>
                      <div className="">
                        <p className="text-2xl font-semibold spaceGroteskText">
                          23
                        </p>
                        <small className="text-sm text-gray-400">
                          Visa On Arrival
                        </small>
                      </div>
                    </div>
                  </Slide>
                </div>

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

                {/* Upcoming Bookings */}
                <div className="mt-11 w-full">
                  <div className="w-full rounded-lg border-[.3px] p-3 border-gray-100 h-auto">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-center gap-x-2">
                        <p className="font-medium">Upcoming Bookings</p>
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
                          Date
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

                      {/* Table body - Upcoming booking card */}
                      <div className="flex justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                        <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                          Effi Emmanuel
                        </p>
                        <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                          12 November 2023
                        </p>
                        <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                          Airport Transfer
                        </p>

                        <div className="min-w-[200px] w-[200px] lg:w-[20%] flex items-center gap-x-1">
                          <div
                            className={`h-2 w-2 bg-red-500 rounded-full`}
                          ></div>
                          <span className={`text-xs text-red-500`}>Failed</span>
                        </div>

                        <div className="min-w-[200px] w-[200px] lg:w-[20%] flex items-center gap-x-3">
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
                      <div className="flex justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                        <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                          Oluwaseyi Bhadmus
                        </p>
                        <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                          25 November 2023
                        </p>
                        <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                          Priority Pass
                        </p>
                        <div className="min-w-[200px] w-[200px] lg:w-[20%] flex items-center gap-x-1">
                          <div
                            className={`h-2 w-2 bg-green-500 rounded-full`}
                          ></div>
                          <span className={`text-xs text-green-500`}>
                            Successful
                          </span>
                        </div>
                        <div className="min-w-[200px] w-[200px] lg:w-[20%] flex items-center gap-x-3">
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
                      <div className="flex justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                        <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                          Shoyemi Olasubomi
                        </p>
                        <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                          16 December 2023
                        </p>
                        <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                          Airport Transfer
                        </p>
                        <div className="min-w-[200px] w-[200px] lg:w-[20%] flex items-center gap-x-1">
                          <div
                            className={`h-2 w-2 bg-yellow-500 rounded-full`}
                          ></div>
                          <span className={`text-xs text-yellow-500`}>
                            Pending
                          </span>
                        </div>

                        <div className="min-w-[200px] w-[200px] lg:w-[20%] flex items-center gap-x-3">
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

              <div className="xl:w-[30%] w-full">
                {/* Users */}
                <div className="w-full">
                  <div className="w-full rounded-lg border-[.3px] p-3 border-gray-100 h-[436px] max-h-[436px] overflow-y-scroll shuttlelaneScrollbar shuttlelaneScrollbarHoriz">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-center gap-x-2">
                        <p className="font-medium">Users</p>
                        <div className="h-2 w-2 rounded-full bg-shuttlelanePurple"></div>
                      </div>
                      <p className="text-xs underline offset-7">See All</p>
                    </div>

                    {/* Searchbar */}
                    <div className="flex items-center gap-x-3 border-[.3px] border-gray-300 rounded-lg px-2 my-2">
                      <BiSearch size={16} className="text-gray-400 rotate-90" />
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

                    {/* Table body - User card */}
                    <div className="flex justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                      <p className="w-[50%] text-xs">Effi Emmanuel</p>
                      <p className="w-[50%] text-xs">
                        effiemmanuel.n@gmail.com
                      </p>
                    </div>

                    {/* Table body - User card */}
                    <div className="flex justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                      <p className="w-[50%] text-xs">Tunde Ojobaro</p>
                      <p className="w-[50%] text-xs">tunde@gmail.com</p>
                    </div>

                    {/* Table body - User card */}
                    <div className="flex justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                      <p className="w-[50%] text-xs">David Samuel</p>
                      <p className="w-[50%] text-xs">david.samuel@gmail.com</p>
                    </div>

                    {/* Table body - User card */}
                    <div className="flex justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                      <p className="w-[50%] text-xs">Effi Emmanuel</p>
                      <p className="w-[50%] text-xs">
                        effiemmanuel.n@gmail.com
                      </p>
                    </div>

                    {/* Table body - User card */}
                    <div className="flex justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                      <p className="w-[50%] text-xs">Tunde Ojobaro</p>
                      <p className="w-[50%] text-xs">tunde@gmail.com</p>
                    </div>

                    {/* Table body - User card */}
                    <div className="flex justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                      <p className="w-[50%] text-xs">David Samuel</p>
                      <p className="w-[50%] text-xs">david.samuel@gmail.com</p>
                    </div>

                    {/* Table body - User card */}
                    <div className="flex justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                      <p className="w-[50%] text-xs">Effi Emmanuel</p>
                      <p className="w-[50%] text-xs">
                        effiemmanuel.n@gmail.com
                      </p>
                    </div>

                    {/* Table body - User card */}
                    <div className="flex justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                      <p className="w-[50%] text-xs">Tunde Ojobaro</p>
                      <p className="w-[50%] text-xs">tunde@gmail.com</p>
                    </div>

                    {/* Table body - User card */}
                    <div className="flex justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                      <p className="w-[50%] text-xs">David Samuel</p>
                      <p className="w-[50%] text-xs">david.samuel@gmail.com</p>
                    </div>
                  </div>
                </div>

                {/* Drivers */}
                <div className="mt-11 w-full">
                  <div className="w-full rounded-lg border-[.3px] p-3 border-gray-100 h-[436px] max-h-[436px] overflow-y-scroll shuttlelaneScrollbar shuttlelaneScrollbarHoriz">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-center gap-x-2">
                        <p className="font-medium">Drivers</p>
                        <div className="h-2 w-2 rounded-full bg-shuttlelaneGold"></div>
                      </div>
                      <p className="text-xs underline offset-7">See All</p>
                    </div>

                    {/* Searchbar */}
                    <div className="flex items-center gap-x-3 border-[.3px] border-gray-300 rounded-lg px-2 my-2">
                      <BiSearch size={16} className="text-gray-400 rotate-90" />
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

                    {/* Table body - User card */}
                    <div className="flex justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                      <p className="w-[50%] text-xs">Effi Emmanuel</p>
                      <p className="w-[50%] text-xs">
                        effiemmanuel.n@gmail.com
                      </p>
                    </div>

                    {/* Table body - User card */}
                    <div className="flex justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                      <p className="w-[50%] text-xs">Tunde Ojobaro</p>
                      <p className="w-[50%] text-xs">tunde@gmail.com</p>
                    </div>

                    {/* Table body - User card */}
                    <div className="flex justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                      <p className="w-[50%] text-xs">David Samuel</p>
                      <p className="w-[50%] text-xs">david.samuel@gmail.com</p>
                    </div>

                    {/* Table body - User card */}
                    <div className="flex justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                      <p className="w-[50%] text-xs">Effi Emmanuel</p>
                      <p className="w-[50%] text-xs">
                        effiemmanuel.n@gmail.com
                      </p>
                    </div>

                    {/* Table body - User card */}
                    <div className="flex justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                      <p className="w-[50%] text-xs">Tunde Ojobaro</p>
                      <p className="w-[50%] text-xs">tunde@gmail.com</p>
                    </div>

                    {/* Table body - User card */}
                    <div className="flex justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                      <p className="w-[50%] text-xs">David Samuel</p>
                      <p className="w-[50%] text-xs">david.samuel@gmail.com</p>
                    </div>

                    {/* Table body - User card */}
                    <div className="flex justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                      <p className="w-[50%] text-xs">Effi Emmanuel</p>
                      <p className="w-[50%] text-xs">
                        effiemmanuel.n@gmail.com
                      </p>
                    </div>

                    {/* Table body - User card */}
                    <div className="flex justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                      <p className="w-[50%] text-xs">Tunde Ojobaro</p>
                      <p className="w-[50%] text-xs">tunde@gmail.com</p>
                    </div>

                    {/* Table body - User card */}
                    <div className="flex justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                      <p className="w-[50%] text-xs">David Samuel</p>
                      <p className="w-[50%] text-xs">david.samuel@gmail.com</p>
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

export default AdminDashboardHomePage;
