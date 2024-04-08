import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { BiSearch } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import AdminDashboardNavbar from "../../../../../components/ui/Admin/AdminDashboardNavbar";
import AdminTopBar from "../../../../../components/ui/Admin/AdminTopBar";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserById,
  fetchUsers,
} from "../../../../../redux/slices/adminSlice";
import { ImSpinner2 } from "react-icons/im";
import { ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";

function AdminDashboardUsersPage() {
  // Mobile navbar handler
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const { isLoading, users, currentUser, userData, token, admin } = useSelector(
    (store) => store.admin
  );
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

  // Fetch Users
  useEffect(() => {
    console.log("UEEFFECT");
    dispatch(fetchUsers(token));
  }, [token]);

  // Configure userDataByMonth
  useEffect(() => {
    function prepareUserDataByMonth() {
      let preparedData = [];
      for (let i = 1; i <= 12; i++) {
        userData?.forEach((data) => {
          if (data?._id?.month == i) {
            preparedData.push(data?.count);
          } else {
            preparedData.push(0);
          }
        });
      }
      setUserDataByMonth(preparedData);
      console.log("PREAPRED DATA:", preparedData);
    }

    prepareUserDataByMonth();
  }, [token, userData]);

  // function to handle deleting a user
  function deleteUser(userId) {
    dispatch(deleteUserById({ token, userId }));
  }

  return (
    <div className="">
      <Helmet>
        <title>Manage Users | Shuttlelane Portal Admin Dashboard</title>
      </Helmet>

      <ToastContainer />

      {/* Navbar here */}
      <AdminDashboardNavbar
        link="users"
        sublink="manage-users"
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
                {/* Bar Chart */}
                <div className="w-full">
                  <div className="w-full rounded-lg border-[.3px] p-3 border-gray-100 h-auto">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-center gap-x-2">
                        <p className="font-medium">
                          Total Users - {users?.length}
                        </p>
                        <div className="h-2 w-2 rounded-full bg-shuttlelanePurple"></div>
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

                {/* Users */}
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
                        <p className="font-medium">Users</p>
                        <div className="h-2 w-2 rounded-full bg-shuttlelanePurple"></div>
                      </div>
                    </div>

                    {/* Table header */}
                    <div className="flex justify-between items-baseline mb-2 border-b-[.3px] border-b-gray-100 text-gray-400 mt-2">
                      <p className="w-200px lg:w-[25%] text-xs">Full name</p>
                      <p className="w-200px lg:w-[25%] text-xs">
                        Email Address
                      </p>
                      <p className="w-200px lg:w-[25%] text-xs">Phone Number</p>
                      {/* <p className="w-200px lg:w-[25%] text-xs">Last Booking</p> */}
                      {admin?.role !== "Blogger" && (
                        <p className="w-200px lg:w-[25%] text-xs">Actions</p>
                      )}
                    </div>

                    {/* Table body - User card */}
                    {users?.map((user) => (
                      <div className="flex justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                        <p
                          className={`w-200px lg:w-[25%] text-xs ${
                            isLoading && "text-gray-400"
                          }`}
                        >
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p
                          className={`w-200px lg:w-[25%] text-xs ${
                            isLoading && "text-gray-400"
                          }`}
                        >
                          {user?.email}
                        </p>
                        <p
                          className={`w-200px lg:w-[25%] text-xs ${
                            isLoading && "text-gray-400"
                          }`}
                        >
                          {user?.countryCode} {user?.mobile}
                        </p>
                        {/* <p className="w-200px lg:w-[25%] text-xs">
                        12 November 2023
                      </p> */}
                        {admin?.role !== "Blogger" && (
                          <div className="w-[180px] lg:w-[25%] flex items-center gap-x-3">
                            {!isLoading ? (
                              <button
                                onClick={() => deleteUser(user?._id)}
                                className="text-xs"
                              >
                                <AiFillDelete
                                  size={16}
                                  className="text-red-500"
                                />
                              </button>
                            ) : (
                              <ImSpinner2 size={16} className="text-gray-400" />
                            )}
                          </div>
                        )}
                      </div>
                    ))}

                    {users?.length < 1 && (
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

export default AdminDashboardUsersPage;
