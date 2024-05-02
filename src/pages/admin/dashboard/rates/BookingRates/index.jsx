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
  fetchCities,
  fetchCurrencies,
  fetchEnquiries,
  fetchRatesPerMile,
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
import AdminVehicleClassesRate from "../../../../../components/ui/Admin/Dashboard/rates/VehicleClasses";
import AdminCarRates from "../../../../../components/ui/Admin/Dashboard/rates/CarRates";
import AdminPriorityPassRates from "../../../../../components/ui/Admin/Dashboard/rates/PriorityPassRates";
import { Helmet } from "react-helmet";
import { AiFillDelete } from "react-icons/ai";

function AdminDashboardBookingRatesPage() {
  // Mobile navbar handler
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const { token, isLoading, currencies, ratePerMile, ratesPerMile, cities } =
    useSelector((store) => store.admin);
  const dispatch = useDispatch();

  // Fetch enquiries
  useEffect(() => {
    dispatch(fetchEnquiries(token));
    dispatch(fetchCities(token));
  }, [token]);

  // Format cities
  const [citiesData, setCitiesData] = useState();
  useEffect(() => {
    let updatedCityData = [];
    cities?.forEach((city) => {
      updatedCityData.push({
        value: city?._id,
        label: city?.cityName,
      });
    });

    setCitiesData(updatedCityData);
  }, [cities]);

  // Page options
  const [isRatePerMile, setIsRatePerMile] = useState(true);
  const [isVisaOnArrivalRate, setIsVisaOnArrivalRate] = useState(false);
  const [isVehicleClasses, setIsVehicleClasses] = useState(false);
  const [isCarRates, setIsCarRates] = useState(false);
  const [isPriorityPassRates, setIsPriorityPassRates] = useState(false);

  // Form Fields
  const [rate, setRate] = useState();
  const [mile, setMile] = useState();
  const [selectedCity, setSelectedCity] = useState();

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
    setSelectedCity({
      value: ratePerMile?.city?._id,
      label: ratePerMile?.city?.cityName,
    });

    console.log("RATE PER MILE::::::::::", ratePerMile);
  }, [ratePerMile]);

  //   Fetch currencies and rate per mile
  useEffect(() => {
    dispatch(fetchCurrencies(token));
  }, [token]);

  return (
    <div className="">
      <Helmet>
        <title>Booking Rates | Shuttlelane Portal Admin Dashboard</title>
      </Helmet>

      <ToastContainer />
      {/* Navbar here */}
      <AdminDashboardNavbar
        link="rates"
        sublink="booking-rates"
        isNavbarOpen={isNavbarOpen}
        setIsNavbarOpen={setIsNavbarOpen}
      />

      {/* Main content goes here */}
      <div className="w-full min-h-screen lg:pl-[6%] bg-white text-shuttlelaneBlack">
        <div className="px-7 py-5 relative">
          {/* Top bar */}
          <AdminTopBar
            isNavbarOpen={isNavbarOpen}
            setIsNavbarOpen={setIsNavbarOpen}
          />

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
                    {/* <span
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
                    </span> */}
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
              {/* {isVehicleClasses && <AdminVehicleClassesRate />} */}
              {isCarRates && <AdminCarRates />}
              {isPriorityPassRates && <AdminPriorityPassRates />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardBookingRatesPage;
