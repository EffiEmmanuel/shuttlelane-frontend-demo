import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMap } from "react-icons/fa";
import { MdAccountCircle, MdLock, MdShield } from "react-icons/md";
import { PiBinocularsBold } from "react-icons/pi";
import { TbLogout2 } from "react-icons/tb";
import { useState } from "react";

// Images
import shuttlelaneSLogo from "../../../../assets/logos/icon.png";
import {
  FaCar,
  FaClockRotateLeft,
  FaGavel,
  FaPeopleGroup,
  FaSackDollar,
} from "react-icons/fa6";

function VendorDashboardNavbar(props) {
  const [isBookingMenuOpen, setIsBookingMenuOpen] = useState(false);
  const [isBroadcastMenuOpen, setIsBroadcastMenuOpen] = useState(false);
  const [isUsersMenuOpen, setIsUsersMenuOpen] = useState(false);
  const [isRatesMenuOpen, setIsRatesMenuOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <div
      className={`lg:w-[6vw] w-24 ${
        props?.isNavbarOpen ? "flex" : "hidden"
      } bg-white shadow-lg h-screen fixed top-0 left-0 z-[50] lg:flex flex-col items-center py-5`}
    >
      <div className="h-12 w-12 rounded-lg shadow-md">
        <img src={shuttlelaneSLogo} alt="" className="w-full h-full" />
      </div>

      <div className="flex flex-col mt-14 gap-y-2 relative h-full">
        <Link
          to="/vendor/dashboard"
          className={`h-11 w-11 flex justify-center items-center rounded-lg ${
            props?.link == "home" &&
            "bg-shuttlelanePurple shadow-[#4540cf85] shadow-md"
          }`}
        >
          <PiBinocularsBold
            size={18}
            className={`${
              props?.link == "home" ? "text-white" : "text-gray-400"
            }`}
          />
        </Link>
        <div
          className={`relative h-11 w-11 cursor-pointer flex justify-center items-center rounded-lg ${
            props?.link == "bookings" &&
            "bg-shuttlelanePurple shadow-[#4540cf85] shadow-md"
          }`}
          onMouseOver={() => {
            setIsBookingMenuOpen(true);
            setIsBroadcastMenuOpen(false);
            setIsUsersMenuOpen(false);
            setIsRatesMenuOpen(false);
          }}
          onMouseOut={() => {
            setIsBookingMenuOpen(false);
            setIsBroadcastMenuOpen(false);
            setIsUsersMenuOpen(false);
            setIsRatesMenuOpen(false);
          }}
          onClick={() => {
            setIsBookingMenuOpen(true);
            setIsBroadcastMenuOpen(false);
            setIsUsersMenuOpen(false);
            setIsRatesMenuOpen(false);
          }}
        >
          <FaMap
            size={15}
            className={`${
              props?.link == "bookings" ? "text-white" : "text-gray-400"
            }`}
          />

          {/* SUB MENUS */}
          {isBookingMenuOpen && (
            <div
              className={`flex flex-col gap-y-4 absolute left-12 top-0 maxContent max-w-none h-auto p-3 z-[30] rounded-lg bg-white shadow-lg`}
              style={{
                zIndex: 30,
              }}
            >
              <Link
                to="/vendor/dashboard/completed-bookings"
                className={`flex items-center gap-x-2 text-xs ${
                  props?.sublink === "completed-bookings"
                    ? "text-shuttlelanePurple hover:text-shuttlelanePurple visited:text-shuttlelanePurple focus:text-shuttlelanePurple"
                    : "text-gray-400 hover:text-gray-400 visited:text-gray-400 focus:text-gray-400"
                } hover:no-underline visited:no-underline`}
              >
                <FaClockRotateLeft size={15} />
                <span
                  className={`text-sm ${
                    props?.sublink === "completed-bookings" && "font-semibold"
                  }`}
                >
                  Completed Bookings
                </span>
                {props?.sublink === "completed-bookings" && (
                  <div className="h-2 w-2 rounded-full bg-shuttlelanePurple"></div>
                )}
              </Link>

              <Link
                to="/vendor/dashboard/manage-drivers"
                className={`flex items-center gap-x-2 text-xs ${
                  props?.sublink === "manage-drivers"
                    ? "text-shuttlelanePurple hover:text-shuttlelanePurple visited:text-shuttlelanePurple focus:text-shuttlelanePurple"
                    : "text-gray-400 hover:text-gray-400 visited:text-gray-400 focus:text-gray-400"
                } hover:no-underline visited:no-underline`}
              >
                <FaPeopleGroup size={15} />
                <span
                  className={`text-sm ${
                    props?.sublink === "manage-drivers" && "font-semibold"
                  }`}
                >
                  Manage Drivers
                </span>
                {props?.sublink === "manage-drivers" && (
                  <div className="h-2 w-2 rounded-full bg-shuttlelanePurple"></div>
                )}
              </Link>

              <Link
                to="/vendor/dashboard/manage-fleet"
                className={`flex items-center gap-x-2 text-xs ${
                  props?.sublink === "manage-fleet"
                    ? "text-shuttlelanePurple hover:text-shuttlelanePurple visited:text-shuttlelanePurple focus:text-shuttlelanePurple"
                    : "text-gray-400 hover:text-gray-400 visited:text-gray-400 focus:text-gray-400"
                } hover:no-underline visited:no-underline`}
              >
                <FaCar size={15} />
                <span
                  className={`text-sm ${
                    props?.sublink === "manage-fleet" && "font-semibold"
                  }`}
                >
                  Manage Fleet
                </span>
                {props?.sublink === "manage-fleet" && (
                  <div className="h-2 w-2 rounded-full bg-shuttlelanePurple"></div>
                )}
              </Link>
            </div>
          )}
        </div>

        <Link
          to="/vendor/dashboard/earnings"
          className={`h-11 w-11 flex justify-center items-center rounded-lg ${
            props?.link == "earnings" &&
            "bg-shuttlelanePurple shadow-[#4540cf85] shadow-md"
          }`}
        >
          <FaSackDollar
            size={15}
            className={`${
              props?.link == "earnings" ? "text-white" : "text-gray-400"
            }`}
          />
        </Link>
        <Link
          to="/vendor/dashboard/account"
          className={`h-11 w-11 flex justify-center items-center rounded-lg ${
            props?.link == "account" &&
            "bg-shuttlelanePurple shadow-[#4540cf85] shadow-md"
          }`}
        >
          <MdAccountCircle
            size={20}
            className={`${
              props?.link == "account" ? "text-white" : "text-gray-400"
            }`}
          />
        </Link>
        <Link
          to="/vendor/dashboard/security"
          className={`h-11 w-11 flex justify-center items-center rounded-lg ${
            props?.link == "security" &&
            "bg-shuttlelanePurple shadow-[#4540cf85] shadow-md"
          }`}
        >
          <MdLock
            size={19}
            className={`${
              props?.link == "security" ? "text-white" : "text-gray-400"
            }`}
          />
        </Link>

        <Link
          to="/customer-service/terms-of-use"
          target="_blank"
          className={`h-11 w-11 flex justify-center items-center rounded-lg`}
        >
          <FaGavel size={17} className={`text-gray-400`} />
        </Link>

        <Link
          to="/customer-service/privacy-policy"
          target="_blank"
          className={`h-11 w-11 flex justify-center items-center rounded-lg`}
        >
          <MdShield size={19} className={`text-gray-400`} />
        </Link>

        {/* <Link
          to="/customer-service/faqs"
          target="_blank"
          className={`h-11 w-11 flex justify-center items-center rounded-lg`}
        >
          <MdQuestionMark size={20} className={`text-gray-400`} />
        </Link> */}

        <button
          onClick={() => {
            localStorage.removeItem("vendor");
            localStorage.removeItem("vendorToken");
            navigate("/vendor/login");
          }}
          className="h-11 w-full flex justify-center items-center absolute bottom-0"
        >
          <TbLogout2 size={17} className="text-gray-400" />
        </button>
      </div>
    </div>
  );
}

export default VendorDashboardNavbar;
