// @ts-nocheck
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
  createNewCurrency,
  fetchCurrencies,
  fetchEnquiries,
  markEnquiryAsRead,
  markEnquiryAsUnread,
  setCurrentCurrency,
} from "../../../../../redux/slices/adminSlice";
import Modal from "react-modal";
import { ImSpinner2 } from "react-icons/im";
import { FaXmark } from "react-icons/fa6";
import { AiOutlinePlus } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";

function AdminDashboardExchangeRatesPage() {
  const { token, isLoading, currencies, currentCurrency } = useSelector(
    (store) => store.admin
  );
  const dispatch = useDispatch();

  // Modify Rate Modal
  const [isModifyRateModalOpen, setIsModifyRateModalOpen] = useState(false);
  const [modifiedExchangeRate, setModifiedExchangeRate] = useState();

  // Add Currency Modal
  const [isAddCurrencyModalOpen, setIsAddCurrencyModalOpen] = useState(false);
  const [currencyLabel, setCurrencyLabel] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [currencySymbol, setCurrencySymbol] = useState();
  const [currencyAlias, setCurrencyAlias] = useState();
  const [currencyColor, setCurrencyColor] = useState();

  async function handleCreateCurrency(e) {
    e.preventDefault();
    if (!currencyLabel || !exchangeRate || !currencySymbol || !currencyAlias) {
      console.log(
        "VALUES:::::::::",
        currencyLabel,
        exchangeRate,
        currencySymbol,
        currencyAlias
      );
      toast.error("Please fill in the missing fields before proceeding");
      return;
    }
    dispatch(
      createNewCurrency({
        token,
        currencyLabel,
        exchangeRate,
        currencySymbol,
        currencyAlias,
        currencyColor,
      })
    );
  }

  // Fetch currencies
  useEffect(() => {
    dispatch(fetchCurrencies(token));
  }, [token]);

  return (
    <div className="">
      <ToastContainer />
      {/* Modify Rates Modal */}
      <Modal
        isOpen={isModifyRateModalOpen}
        onRequestClose={() => setIsModifyRateModalOpen(false)}
        className="flex h-full min-h-screen justify-center items-center lg:px-24 px-7"
      >
        <div className="bg-white shadow-lg rounded-lg text-shuttlelaneBlack lg:w-2/4 w-full p-7 px-10">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Modify Exchange Rate</h4>

            <FaXmark
              size={20}
              onClick={() => setIsModifyRateModalOpen(false)}
              className="cursor-pointer"
            />
          </div>

          <form className="w-full mt-5">
            <div className="flex flex-col gap-y-5 lg:items-center gap-x-4">
              {/* Modify Rate */}
              <div className="w-full flex items-center justify-between">
                <div className="w-[80%] flex items-center">
                  <label
                    htmlFor="rate"
                    className="text-sm inline-block p-3 bg-gray-200 h-11 rounded-tl-lg rounded-bl-lg"
                  >
                    ₦
                  </label>
                  <input
                    type="number"
                    placeholder="1000"
                    name="rate"
                    value={modifiedExchangeRate}
                    onChange={(e) => setModifiedExchangeRate(e.target.value)}
                    className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-tr-lg rounded-br-lg"
                  />
                </div>
                <label htmlFor="rate" className="text-sm">
                  / USD
                </label>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                // onClick={(e) => createNewCity(e)}
                className="w-full flex justify-center items-center text-sm text-white hover:text-shuttlelaneBlack h-11 p-3 transition-all hover:border-[1px] hover:bg-transparent bg-shuttlelanePurple focus:outline-none border-gray-400 rounded-lg"
              >
                {isLoading ? (
                  <ImSpinner2 size={21} className="animate-spin" />
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Add Currency Modal */}
      <Modal
        isOpen={isAddCurrencyModalOpen}
        onRequestClose={() => setIsAddCurrencyModalOpen(false)}
        className="flex h-full min-h-screen justify-center items-center lg:px-24 px-7"
      >
        <div className="bg-white shadow-lg rounded-lg text-shuttlelaneBlack lg:w-2/4 w-full p-7 px-10">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Add New Currency</h4>

            <FaXmark
              size={20}
              onClick={() => setIsAddCurrencyModalOpen(false)}
              className="cursor-pointer"
            />
          </div>

          {/* Add New Currency */}
          <form className="w-full mt-5">
            <div className="flex flex-col gap-y-5 lg:items-center gap-x-4">
              <div className="w-full flex flex-col">
                <label htmlFor="currencyLabel" className="text-sm">
                  Currency Label
                </label>
                <input
                  type="text"
                  placeholder="Dollars"
                  name="currencyLabel"
                  value={currencyLabel}
                  onChange={(e) => setCurrencyLabel(e.target.value)}
                  className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
                />
              </div>

              <div className="w-full flex flex-col">
                <label htmlFor="exchangeRate" className="text-sm">
                  Exchange Rate
                </label>

                <div className="w-full flex items-center justify-between">
                  <div className="w-[80%] flex items-center">
                    <label
                      htmlFor="rate"
                      className="text-sm inline-block p-3 bg-gray-200 h-11 rounded-tl-lg rounded-bl-lg"
                    >
                      ₦
                    </label>
                    <input
                      type="number"
                      placeholder="1000"
                      name="rate"
                      value={exchangeRate}
                      onChange={(e) => {
                        console.log("RATE:", e.target.value);
                        setExchangeRate(e.target.value);
                      }}
                      className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-tr-lg rounded-br-lg"
                    />
                  </div>
                  <label htmlFor="rate" className="text-sm">
                    / USD
                  </label>
                </div>
              </div>

              <div className="w-full flex flex-col">
                <label htmlFor="currencySymbol" className="text-sm">
                  Currency Symbol
                </label>
                <input
                  type="text"
                  placeholder="$"
                  name="currencySymbol"
                  value={currencySymbol}
                  onChange={(e) => setCurrencySymbol(e.target.value)}
                  className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
                />
              </div>

              <div className="w-full flex flex-col">
                <label htmlFor="currencyAlias" className="text-sm">
                  Currency Alias
                </label>
                <input
                  type="text"
                  placeholder="USD"
                  name="currencyAlias"
                  value={currencyAlias}
                  onChange={(e) => setCurrencyAlias(e.target.value)}
                  className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                onClick={(e) => handleCreateCurrency(e)}
                className="w-full flex justify-center items-center text-sm text-white hover:text-shuttlelaneBlack h-11 p-3 transition-all hover:border-[1px] hover:bg-transparent bg-shuttlelanePurple focus:outline-none border-gray-400 rounded-lg"
              >
                {isLoading ? (
                  <ImSpinner2 size={21} className="animate-spin" />
                ) : (
                  "Add Currency"
                )}
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Navbar here */}
      <AdminDashboardNavbar link="rates" sublink="exchange-rates" />

      {/* Main content goes here */}
      <div className="w-full min-h-screen pl-[6%] bg-white text-shuttlelaneBlack">
        <div className="px-7 py-5 relative">
          {/* Top bar */}
          <AdminTopBar />

          {/* Main content */}
          <div className="mt-24 pt-2">
            <div className="w-full">
              <h2 className="font-semibold text-xl text-shuttlelaneBlack">
                Exchange Rates
              </h2>
              <p className="text-sm">
                The official exchange rates on Shuttlelane
              </p>

              <div className="flex gap-x-6 mt-10 flex-wrap gap-y-10">
                <button
                  onClick={() => setIsAddCurrencyModalOpen(true)}
                  className="border-[.3px] border-gray-200 rounded-lg p-3 flex items-center gap-x-2"
                >
                  <div className="flex items-center justify-center h-16 w-16 border-[1px] border-dashed border-gray-400 rounded-full">
                    <AiOutlinePlus size={24} className="text-gray-400" />
                  </div>
                </button>
                {currencies?.map((currency) => (
                  <button
                    key={currency?._id}
                    onClick={() => {
                      dispatch(setCurrentCurrency(currency));
                      setIsModifyRateModalOpen(true);
                    }}
                    className="border-[.3px] border-gray-200 rounded-lg p-3 flex items-center gap-x-2"
                  >
                    <div
                      className={`flex items-center justify-center h-16 w-16 border-[1px] border-shuttlelaneLightPurple rounded-full`}
                    >
                      <h1 className="">{currency?.symbol}</h1>
                    </div>
                    <div className="flex flex-col text-left">
                      <p className="font-semibold">
                        ₦{currency?.exchangeRate} / {currency?.alias}
                      </p>
                      <small className="text-gray-400">
                        {currency?.currencyLabel} Exchange Rate
                      </small>
                    </div>
                  </button>
                ))}

                {isLoading && (
                  <div className="flex flex-col items-center gap-y-5 text-center">
                    <ImSpinner2
                      size={20}
                      className="text-shuttlelanePurple animate-spin"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardExchangeRatesPage;
