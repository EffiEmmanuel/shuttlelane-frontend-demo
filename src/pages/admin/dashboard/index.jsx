import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import Preloader from "../../../components/ui/Preloader";
import AdminDashboardHomeSkeleton from "../../../components/ui/Admin/Skeletons/DashboardHomeSkeleton";
import AdminDashboardStatistics from "../../../components/ui/Admin/Dashboard/Statistics";
import { fetchStatistics } from "../../../redux/slices/adminSlice";

function AdminDashboardHomePage() {
  const { isLoading, token, users, drivers, upcomingBookings } = useSelector(
    (store) => store.admin
  );

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
  }, [token]);

  return (
    <div className="">
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
                          <div className="flex justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
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
