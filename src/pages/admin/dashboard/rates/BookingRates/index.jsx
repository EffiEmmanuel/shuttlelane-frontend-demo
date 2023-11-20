import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPassport, FaUser } from "react-icons/fa";
import { MdDelete, MdLuggage, MdOutlineFlightTakeoff } from "react-icons/md";
import { IoCarSport } from "react-icons/io5";
import AdminDashboardNavbar from "../../../../../components/ui/Admin/AdminDashboardNavbar";
import {
  HiOutlineExternalLink,
  HiOutlineMail,
  HiOutlineMailOpen,
} from "react-icons/hi";
import Chart from "react-apexcharts";
import { BiSearch } from "react-icons/bi";
import AdminTopBar from "../../../../../components/ui/Admin/AdminTopBar";
import AdminAddBookingForm from "../../../../../forms/admin/AdminAddBookingForm";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCurrencies,
  fetchEnquiries,
  fetchRatePerMile,
  markEnquiryAsRead,
  markEnquiryAsUnread,
  setRatePerMile,
} from "../../../../../redux/slices/adminSlice";

// Images
import empty from "../../../../../assets/images/empty.png";
import { ImSpinner2 } from "react-icons/im";
import { calculateExchangeRate } from "../../../../../util";
import { ToastContainer, toast } from "react-toastify";
import AdminRatePerMile from "../../../../../components/ui/Admin/Dashboard/rates/RatePerMile";
import AdminVisaOnArrivalRate from "../../../../../components/ui/Admin/Dashboard/rates/VisaOnArrivalRate";

function AdminDashboardBookingRatesPage() {
  const { token, isLoading, currencies, ratePerMile } = useSelector(
    (store) => store.admin
  );
  const dispatch = useDispatch();

  // Fetch enquiries
  useEffect(() => {
    dispatch(fetchEnquiries(token));
  }, [token]);

  // Page options
  const [isRatePerMile, setIsRatePerMile] = useState(true);
  const [isVisaOnArrivalRate, setIsVisaOnArrivalRate] = useState(false);
  const [isVehicleClasses, setIsVehicleClasses] = useState(false);
  const [isCarRates, setIsCarRates] = useState(false);
  const [isPriorityPassRates, setIsPriorityPassRates] = useState(false);

  // Form Fields
  const [rate, setRate] = useState();
  const [mile, setMile] = useState();

  // FUNCTION: Handle save / set rate per mile
  async function handleSetRatePerMile(e) {
    e.preventDefault();
    if (!rate || !mile) {
      toast.error("Please fill in the missing fields.");
      return;
    }
    dispatch(setRatePerMile({ token, rate, mile }));
  }

  // SET THE RATE PER MILE AND MILE
  useEffect(() => {
    setRate(ratePerMile?.rate);
    setMile(ratePerMile?.mile);

    console.log("RATE PER MILE::::::::::", ratePerMile);
  }, [ratePerMile]);

  // Calculate Exchange Rate
  const [conversionRates, setConversionRates] = useState();
  function updateConversionRate() {
    let convertedRates = [];
    currencies?.forEach((currency) => {
      console.log("CURRENCY:", currency);
      const exchangeRate = calculateExchangeRate(rate, currency?.exchangeRate);
      convertedRates?.push({
        rate: exchangeRate,
        currencySymbol: currency?.symbol,
      });
    });

    setConversionRates(convertedRates);
    console.log("HI::", convertedRates);
  }
  useEffect(() => {
    updateConversionRate();
  }, [rate, currencies]);

  //   Fetch currencies and rate per mile
  useEffect(() => {
    dispatch(fetchCurrencies(token));
    dispatch(fetchRatePerMile(token));
  }, [token]);

  return (
    <div className="">
      <ToastContainer />
      {/* Navbar here */}
      <AdminDashboardNavbar link="rates" sublink="booking-rates" />

      {/* Main content goes here */}
      <div className="w-full min-h-screen pl-[6%] bg-white text-shuttlelaneBlack">
        <div className="px-7 py-5 relative">
          {/* Top bar */}
          <AdminTopBar />

          {/* Main content */}
          <div className="mt-24 pt-2">
            <div className="w-full">
              <h2 className="font-semibold text-xl text-shuttlelaneBlack">
                Booking Rates
              </h2>
              <p className="text-sm">Rates for bookings on Shuttlelane</p>

              <div className="mt-10">
                {/* Options */}
                <div className="mt-9 flex justify-between items-baseline pb-1 transition-all border-b-[.3px] border-b-gray-200">
                  <div className="flex items-center gap-x-10 gap-y-4 flex-wrap">
                    <span
                      onClick={() => {
                        setIsRatePerMile(true);
                        setIsVisaOnArrivalRate(false);
                        setIsVehicleClasses(false);
                        setIsCarRates(false);
                        setIsPriorityPassRates(false);
                      }}
                      className={`text-xs cursor-pointer transition-all ${
                        isRatePerMile
                          ? "font-semibold text-shuttlelaneBlack border-b-2 border-b-shuttlelaneBlack"
                          : "text-gray-400"
                      }`}
                    >
                      Rate Per Mile
                    </span>
                    <span
                      onClick={() => {
                        setIsRatePerMile(false);
                        setIsVisaOnArrivalRate(true);
                        setIsVehicleClasses(false);
                        setIsCarRates(false);
                        setIsPriorityPassRates(false);
                      }}
                      className={`text-xs cursor-pointer transition-all ${
                        isVisaOnArrivalRate
                          ? "font-semibold text-shuttlelaneBlack border-b-2 border-b-shuttlelaneBlack"
                          : "text-gray-400"
                      }`}
                    >
                      Visa On Arrival Rate
                    </span>
                    <span
                      onClick={() => {
                        setIsRatePerMile(false);
                        setIsVisaOnArrivalRate(false);
                        setIsVehicleClasses(true);
                        setIsCarRates(false);
                        setIsPriorityPassRates(false);
                      }}
                      className={`text-xs cursor-pointer transition-all ${
                        isVehicleClasses
                          ? "font-semibold text-shuttlelaneBlack border-b-2 border-b-shuttlelaneBlack"
                          : "text-gray-400"
                      }`}
                    >
                      Vehicle Classes
                    </span>
                    <span
                      onClick={() => {
                        setIsRatePerMile(false);
                        setIsVisaOnArrivalRate(false);
                        setIsVehicleClasses(false);
                        setIsCarRates(true);
                        setIsPriorityPassRates(false);
                      }}
                      className={`text-xs cursor-pointer transition-all ${
                        isCarRates
                          ? "font-semibold text-shuttlelaneBlack border-b-2 border-b-shuttlelaneBlack"
                          : "text-gray-400"
                      }`}
                    >
                      Car Rates
                    </span>
                    <span
                      onClick={() => {
                        setIsRatePerMile(false);
                        setIsVisaOnArrivalRate(false);
                        setIsVehicleClasses(false);
                        setIsCarRates(false);
                        setIsPriorityPassRates(true);
                      }}
                      className={`text-xs cursor-pointer transition-all ${
                        isPriorityPassRates
                          ? "font-semibold text-shuttlelaneBlack border-b-2 border-b-shuttlelaneBlack"
                          : "text-gray-400"
                      }`}
                    >
                      Priority Pass Rates
                    </span>
                  </div>
                </div>
              </div>

              {isRatePerMile && <AdminRatePerMile />}
              {isVisaOnArrivalRate && <AdminVisaOnArrivalRate />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardBookingRatesPage;
