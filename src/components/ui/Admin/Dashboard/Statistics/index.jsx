// @ts-nocheck
import React, { useEffect } from "react";
import { FaPassport } from "react-icons/fa";
import { IoCarSport } from "react-icons/io5";
import { MdLuggage, MdOutlineFlightTakeoff } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Slide } from "react-slideshow-image";

function AdminDashboardStatistics() {
  const {
    numberOfAirportTransferBookings,
    numberOfCarRentalBookings,
    numberOfPriorityPassBookings,
    numberOfVisaOnArrivalBookings,
  } = useSelector((store) => store.admin);

  return (
    <>
      {/* FOR LARGE SCREENS */}
      <div className="W-full h-auto hidden xl:flex lg:flex-row flex-col gap-y-3 gap-x-3 rounded-lg">
        {/* Total Card */}
        <Link
          to="/admin/dashboard/bookings/airport-transfer"
          className="text-shuttlelaneBlack hover:text-shuttlelaneBlack visited:text-shuttlelaneBlack no-underline hover:no-underline visited:no-underline flex flex-col text-center gap-y-2 lg:text-left lg:flex-row gap-x-2 p-3 items-center rounded-lg border-[.3px] border-gray-100 lg:w-1/4 w-full"
        >
          <div className="h-10 w-10 rounded-full bg-shuttlelanePurple shadow-[#4540cf85] shadow-md flex justify-center items-center">
            <MdOutlineFlightTakeoff size={16} className="text-white" />
          </div>
          <div className="">
            <p className="text-2xl font-semibold spaceGroteskText">
              {numberOfAirportTransferBookings}
            </p>
            <small className="text-sm text-gray-400 hover:text-gray-400 no-underline hover:no-underline visited:no-underline visited:text-gray-400">
              Airport Bookings
            </small>
          </div>
        </Link>
        {/* Total Card */}
        <Link
          to="/admin/dashboard/bookings/car-rental"
          className="text-shuttlelaneBlack hover:text-shuttlelaneBlack visited:text-shuttlelaneBlack no-underline hover:no-underline visited:no-underline flex flex-col text-center gap-y-2 lg:text-left lg:flex-row gap-x-2 p-3 items-center rounded-lg border-[.3px] border-gray-100 lg:w-1/4 w-full"
        >
          <div className="h-10 w-10 rounded-full bg-shuttlelanePurple shadow-[#4540cf85] shadow-md flex justify-center items-center">
            <IoCarSport size={16} className="text-white" />
          </div>
          <div className="">
            <p className="text-2xl font-semibold spaceGroteskText">
              {numberOfCarRentalBookings}
            </p>
            <small className="text-sm text-gray-400 hover:text-gray-400 no-underline hover:no-underline visited:no-underline visited:text-gray-400">
              Car Rental
            </small>
          </div>
        </Link>
        {/* Total Card */}
        <Link
          to="/admin/dashboard/bookings/priority-pass"
          className="text-shuttlelaneBlack hover:text-shuttlelaneBlack visited:text-shuttlelaneBlack no-underline hover:no-underline visited:no-underline flex flex-col text-center gap-y-2 lg:text-left lg:flex-row gap-x-2 p-3 items-center rounded-lg border-[.3px] border-gray-100 lg:w-1/4 w-full"
        >
          <div className="h-10 w-10 rounded-full bg-shuttlelanePurple shadow-[#4540cf85] shadow-md flex justify-center items-center">
            <MdLuggage size={16} className="text-white" />
          </div>
          <div className="">
            <p className="text-2xl font-semibold spaceGroteskText">
              {numberOfPriorityPassBookings}
            </p>
            <small className="text-sm text-gray-400 hover:text-gray-400 no-underline hover:no-underline visited:no-underline visited:text-gray-400">
              Priority Pass
            </small>
          </div>
        </Link>
        {/* Total Card */}
        <Link
          to="/admin/dashboard/bookings/visa-on-arrival"
          className="text-shuttlelaneBlack hover:text-shuttlelaneBlack visited:text-shuttlelaneBlack no-underline hover:no-underline visited:no-underline flex flex-col text-center gap-y-2 lg:text-left lg:flex-row gap-x-2 p-3 items-center rounded-lg border-[.3px] border-gray-100 lg:w-1/4 w-full"
        >
          <div className="h-10 w-10 rounded-full bg-shuttlelanePurple shadow-[#4540cf85] shadow-md flex justify-center items-center">
            <FaPassport size={16} className="text-white" />
          </div>
          <div className="">
            <p className="text-2xl font-semibold spaceGroteskText">
              {numberOfVisaOnArrivalBookings}
            </p>
            <small className="text-sm text-gray-400 hover:text-gray-400 no-underline hover:no-underline visited:no-underline visited:text-gray-400">
              Visa On Arrival
            </small>
          </div>
        </Link>
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
          <Link
            to="/admin/dashboard/bookings/airport-transfer"
            className="text-shuttlelaneBlack hover:text-shuttlelaneBlack visited:text-shuttlelaneBlack no-underline hover:no-underline visited:no-underline flex flex-col text-center gap-y-2 lg:text-left lg:flex-row gap-x-2 p-3 items-center rounded-lg border-[.3px] border-gray-100 lg:w-1/4 w-full"
          >
            <div className="h-10 w-10 rounded-full bg-shuttlelanePurple shadow-[#4540cf85] shadow-md flex justify-center items-center">
              <MdOutlineFlightTakeoff size={16} className="text-white" />
            </div>
            <div className="">
              <p className="text-2xl font-semibold spaceGroteskText">
                {numberOfAirportTransferBookings}
              </p>
              <small className="text-sm text-gray-400 hover:text-gray-400 no-underline hover:no-underline visited:no-underline visited:text-gray-400  ">
                Airport Bookings
              </small>
            </div>
          </Link>
          {/* Total Card */}
          <Link
            to="/admin/dashboard/bookings/car-rental"
            className="text-shuttlelaneBlack hover:text-shuttlelaneBlack visited:text-shuttlelaneBlack no-underline hover:no-underline visited:no-underline flex flex-col text-center gap-y-2 lg:text-left lg:flex-row gap-x-2 p-3 items-center rounded-lg border-[.3px] border-gray-100 lg:w-1/4 w-full"
          >
            <div className="h-10 w-10 rounded-full bg-shuttlelanePurple shadow-[#4540cf85] shadow-md flex justify-center items-center">
              <IoCarSport size={16} className="text-white" />
            </div>
            <div className="">
              <p className="text-2xl font-semibold spaceGroteskText">
                {numberOfCarRentalBookings}
              </p>
              <small className="text-sm text-gray-400 hover:text-gray-400 no-underline hover:no-underline visited:no-underline visited:text-gray-400  ">
                Car Rental
              </small>
            </div>
          </Link>
          {/* Total Card */}
          <Link
            to="/admin/dashboard/bookings/priority-pass"
            className="text-shuttlelaneBlack hover:text-shuttlelaneBlack visited:text-shuttlelaneBlack no-underline hover:no-underline visited:no-underline flex flex-col text-center gap-y-2 lg:text-left lg:flex-row gap-x-2 p-3 items-center rounded-lg border-[.3px] border-gray-100 lg:w-1/4 w-full"
          >
            <div className="h-10 w-10 rounded-full bg-shuttlelanePurple shadow-[#4540cf85] shadow-md flex justify-center items-center">
              <MdLuggage size={16} className="text-white" />
            </div>
            <div className="">
              <p className="text-2xl font-semibold spaceGroteskText">
                {numberOfPriorityPassBookings}
              </p>
              <small className="text-sm text-gray-400 hover:text-gray-400 no-underline hover:no-underline visited:no-underline visited:text-gray-400  ">
                Priority Pass
              </small>
            </div>
          </Link>
          {/* Total Card */}
          <Link
            to="/admin/dashboard/bookings/visa-on-arrival"
            className="text-shuttlelaneBlack hover:text-shuttlelaneBlack visited:text-shuttlelaneBlack no-underline hover:no-underline visited:no-underline flex flex-col text-center gap-y-2 lg:text-left lg:flex-row gap-x-2 p-3 items-center rounded-lg border-[.3px] border-gray-100 lg:w-1/4 w-full"
          >
            <div className="h-10 w-10 rounded-full bg-shuttlelanePurple shadow-[#4540cf85] shadow-md flex justify-center items-center">
              <FaPassport size={16} className="text-white" />
            </div>
            <div className="">
              <p className="text-2xl font-semibold spaceGroteskText">
                {numberOfVisaOnArrivalBookings}
              </p>
              <small className="text-sm text-gray-400 hover:text-gray-400 no-underline hover:no-underline visited:no-underline visited:text-gray-400  ">
                Visa On Arrival
              </small>
            </div>
          </Link>
        </Slide>
      </div>
    </>
  );
}
export default AdminDashboardStatistics;
