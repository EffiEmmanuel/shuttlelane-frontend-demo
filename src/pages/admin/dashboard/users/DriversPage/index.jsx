import React from "react";
import { Link } from "react-router-dom";
import { FaPassport, FaUser } from "react-icons/fa";
import { MdLuggage, MdOutlineFlightTakeoff } from "react-icons/md";
import { IoCarSport } from "react-icons/io5";
import AdminDashboardNavbar from "../../../../../components/ui/Admin/AdminDashboardNavbar";
import AdminTopBar from "../../../../../components/ui/Admin/AdminTopBar";
import { HiOutlineExternalLink } from "react-icons/hi";
import Chart from "react-apexcharts";
import { BiSearch } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

function AdminDashboardDriversPage() {
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
        data: [20, 70, 10, 5, 30, 100, 60, 200, 50, 40, 20, 6],
      },
    ],
  };

  return (
    <div className="">
      {/* Navbar here */}
      <AdminDashboardNavbar link="users" sublink="manage-drivers" />

      {/* Main content goes here */}
      <div className="w-full min-h-screen pl-[6%] bg-[#fff] text-shuttlelaneBlack">
        <div className="px-7 py-5 relative">
          {/* Top bar */}
          <AdminTopBar />

          {/* Main content */}
          <div className="mt-24 pt-2">
            <div className="flex gap-x-5">
              {/* Booking Summary - Total number of bookings */}
              <div className="w-full">
                {/* Bar Chart */}
                <div className="w-full">
                  <div className="w-full rounded-lg border-[.3px] p-3 border-gray-100 h-auto">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-center gap-x-2">
                        <p className="font-medium">Total Drivers - 20</p>
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

                {/* Drivers */}
                <div className="w-full">
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
                        <p className="font-medium">Drivers</p>
                        <div className="h-2 w-2 rounded-full bg-shuttlelaneGold"></div>
                      </div>
                    </div>

                    {/* Table header */}
                    <div className="flex justify-between items-baseline mb-2 border-b-[.3px] border-b-gray-100 text-gray-400 mt-2">
                      <p className="w-200px lg:w-[20%] text-xs">Full name</p>
                      <p className="w-200px lg:w-[20%] text-xs">
                        Email Address
                      </p>
                      <p className="w-200px lg:w-[20%] text-xs">Phone Number</p>
                      <p className="w-200px lg:w-[20%] text-xs">Last Booking</p>
                      <p className="w-200px lg:w-[20%] text-xs">Actions</p>
                    </div>

                    {/* Table body - Upcoming booking card */}
                    <div className="flex justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                      <p className="w-200px lg:w-[20%] text-xs">
                        Effi Emmanuel
                      </p>
                      <p className="w-200px lg:w-[20%] text-xs">
                        effiemmanuel.n@gmail.com
                      </p>
                      <p className="w-200px lg:w-[20%] text-xs">
                        +2348118412819
                      </p>
                      <p className="w-200px lg:w-[20%] text-xs">
                        12 November 2023
                      </p>

                      <div className="w-[180px] lg:w-[20%] flex items-center gap-x-3">
                        <button className="text-xs">
                          <AiFillDelete size={16} className="text-red-500" />
                        </button>
                      </div>
                    </div>

                    {/* Table body - Upcoming booking card */}
                    <div className="flex justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                      <p className="w-200px lg:w-[20%] text-xs">
                        Effi Emmanuel
                      </p>
                      <p className="w-200px lg:w-[20%] text-xs">
                        effiemmanuel.n@gmail.com
                      </p>
                      <p className="w-200px lg:w-[20%] text-xs">
                        +2348118412819
                      </p>
                      <p className="w-200px lg:w-[20%] text-xs">
                        12 November 2023
                      </p>

                      <div className="w-[180px] lg:w-[20%] flex items-center gap-x-3">
                        <button className="text-xs">
                          <AiFillDelete size={16} className="text-red-500" />
                        </button>
                      </div>
                    </div>

                    {/* Table body - Upcoming booking card */}
                    <div className="flex justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                      <p className="w-200px lg:w-[20%] text-xs">
                        Effi Emmanuel
                      </p>
                      <p className="w-200px lg:w-[20%] text-xs">
                        effiemmanuel.n@gmail.com
                      </p>
                      <p className="w-200px lg:w-[20%] text-xs">
                        +2348118412819
                      </p>
                      <p className="w-200px lg:w-[20%] text-xs">
                        12 November 2023
                      </p>

                      <div className="w-[180px] lg:w-[20%] flex items-center gap-x-3">
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
  );
}

export default AdminDashboardDriversPage;
