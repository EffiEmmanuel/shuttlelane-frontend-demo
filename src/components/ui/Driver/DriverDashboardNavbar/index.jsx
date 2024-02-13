import React from "react";
import { Link } from "react-router-dom";
import { FaMap, FaPassport, FaUsers } from "react-icons/fa";
import { IoCarSport, IoPeopleOutline } from "react-icons/io5";
import {
  MdAccountCircle,
  MdFlight,
  MdGavel,
  MdLock,
  MdLockOutline,
  MdLuggage,
  MdOutlineAccountCircle,
  MdOutlineCurrencyExchange,
  MdOutlineFlightTakeoff,
  MdOutlineGavel,
  MdOutlineLocationCity,
  MdOutlineNotifications,
  MdOutlineShield,
  MdQuestionMark,
  MdShield,
} from "react-icons/md";
import { PiBinocularsBold } from "react-icons/pi";
import { AiOutlineDollar } from "react-icons/ai";
import { RiBroadcastFill } from "react-icons/ri";
import { GoMail } from "react-icons/go";
import { IoIosGlobe } from "react-icons/io";
import { TbBrandBooking, TbLogout2, TbSteeringWheel } from "react-icons/tb";
import { BiPlus } from "react-icons/bi";
import { LiaCarSolid, LiaGavelSolid, LiaMailBulkSolid } from "react-icons/lia";
import { useState } from "react";
import { Slide } from "react-awesome-reveal";

// Images
import shuttlelaneSLogo from "../../../../assets/logos/icon.png";
import { FaGavel, FaHandHoldingDollar, FaPerson } from "react-icons/fa6";

function DriverDashboardNavbar(props) {
  const [isBookingMenuOpen, setIsBookingMenuOpen] = useState(false);
  const [isBroadcastMenuOpen, setIsBroadcastMenuOpen] = useState(false);
  const [isUsersMenuOpen, setIsUsersMenuOpen] = useState(false);
  const [isRatesMenuOpen, setIsRatesMenuOpen] = useState(false);

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
          to="/driver/dashboard"
          className={`h-11 w-11 flex justify-center items-center rounded-lg ${
            props?.link == "home" &&
            "bg-shuttlelaneGold shadow-[#ffe788ae] shadow-md"
          }`}
        >
          <PiBinocularsBold
            size={18}
            className={`${
              props?.link == "home" ? "text-white" : "text-gray-400"
            }`}
          />
        </Link>
        <Link
          to="/driver/dashboard/bookings"
          className={`h-11 w-11 flex justify-center items-center rounded-lg ${
            props?.link == "bookings" &&
            "bg-shuttlelaneGold shadow-[#ffe788ae] shadow-md"
          }`}
        >
          <FaMap
            size={15}
            className={`${
              props?.link == "bookings" ? "text-white" : "text-gray-400"
            }`}
          />
        </Link>
        <Link
          to="/driver/dashboard/account"
          className={`h-11 w-11 flex justify-center items-center rounded-lg ${
            props?.link == "account" &&
            "bg-shuttlelaneGold shadow-[#ffe788ae] shadow-md"
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
          to="/driver/dashboard/security"
          className={`h-11 w-11 flex justify-center items-center rounded-lg ${
            props?.link == "security" &&
            "bg-shuttlelaneGold shadow-[#ffe788ae] shadow-md"
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

        <button className="h-11 w-full flex justify-center items-center absolute bottom-0">
          <TbLogout2 size={17} className="text-gray-400" />
        </button>
      </div>
    </div>
  );
}

export default DriverDashboardNavbar;
