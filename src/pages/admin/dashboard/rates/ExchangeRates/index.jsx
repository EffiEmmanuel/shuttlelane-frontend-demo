// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPassport, FaTrash, FaUser } from "react-icons/fa";
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
  deleteCurrency,
  fetchCurrencies,
  updateCurrency,
} from "../../../../../redux/slices/adminSlice";
import Modal from "react-modal";
import { ImSpinner2 } from "react-icons/im";
import { FaXmark } from "react-icons/fa6";
import { AiOutlinePlus } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { Helmet } from "react-helmet";
import ReactCountryFlagsSelect from "react-country-flags-select";

function AdminDashboardExchangeRatesPage() {
  // Mobile navbar handler
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const { token, isLoading, currencies, admin } = useSelector(
    (store) => store.admin
  );
  const dispatch = useDispatch();

  // Modify Rate Modal
  const [currentCurrency, setCurrentCurrency] = useState();
  const [isModifyRateModalOpen, setIsModifyRateModalOpen] = useState(false);
  // Form fields
  const [modifiedCurrencyLabel, setModifiedCurrencyLabel] = useState();
  const [modifiedExchangeRatePercentage, setModifiedExchangeRatePercentage] =
    useState();
  const [modifiedAdditionalRate, setModifiedAdditionalRate] = useState();
  const [modifiedCurrencySymbol, setModifiedCurrencySymbol] = useState();
  const [modifiedCurrencyAlias, setModifiedCurrencyAlias] = useState();
  const [modifiedSupportedCountries, setModifiedSupportedCountries] =
    useState();
  const [modifiedSupportedCountry, setModifiedSupportedCountry] = useState();

  // Update fields for the modify rae modal
  useEffect(() => {
    if (currentCurrency) {
      setModifiedSupportedCountries(currentCurrency?.supportedCountries);
      setModifiedExchangeRatePercentage(
        currentCurrency?.exchangeRatePercentage
      );
      setModifiedAdditionalRate(currentCurrency?.additionalRate);
      setModifiedCurrencyLabel(currentCurrency?.currencyLabel);
      setModifiedCurrencySymbol(currentCurrency?.symbol);
      setModifiedCurrencyAlias(currentCurrency?.alias);
    }
  }, [currentCurrency]);

  // Add Currency Modal
  const [isAddCurrencyModalOpen, setIsAddCurrencyModalOpen] = useState(false);
  const [currencyLabel, setCurrencyLabel] = useState();
  const [exchangeRatePercentage, setExchangeRatePercentage] = useState();
  const [additionalRate, setAdditionalRate] = useState();
  const [currencySymbol, setCurrencySymbol] = useState();
  const [currencyAlias, setCurrencyAlias] = useState();
  const [supportedCountries, setSupportedCountries] = useState([]);
  const [supportedCountry, setSupportedCountry] = useState();
  const [currencyColor, setCurrencyColor] = useState();

  // FUNCTION: Handles creation of a new currency
  async function handleCreateCurrency(e) {
    e.preventDefault();
    if (
      !currencyLabel ||
      !exchangeRatePercentage ||
      !additionalRate ||
      !currencySymbol ||
      !currencyAlias
    ) {
      console.log(
        "VALUES:::::::::",
        currencyLabel,
        exchangeRatePercentage,
        additionalRate,
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
        exchangeRatePercentage,
        additionalRate,
        currencySymbol,
        currencyAlias,
        currencyColor,
        supportedCountries,
      })
    );
  }

  // FUNCTION: Handles updating a currency
  async function handleUpdateCurrency(e) {
    e.preventDefault();
    if (
      !modifiedCurrencyLabel ||
      !modifiedExchangeRatePercentage ||
      !modifiedAdditionalRate ||
      !modifiedCurrencySymbol ||
      !modifiedCurrencyAlias
    ) {
      toast.error("Please fill in the missing fields before proceeding");
      return;
    }
    dispatch(
      updateCurrency({
        token,
        _id: currentCurrency?._id,
        currencyLabel: modifiedCurrencyLabel,
        exchangeRatePercentage: modifiedExchangeRatePercentage,
        additionalRate: modifiedAdditionalRate,
        currencySymbol: modifiedCurrencySymbol,
        currencyAlias: modifiedCurrencyAlias,
        supportedCountries: modifiedSupportedCountries,
      })
    );
  }

  // FUNCTION: Handles updating a currency
  async function handleDeleteCurrency(e) {
    e.preventDefault();
    dispatch(
      deleteCurrency({
        token,
        _id: currentCurrency?._id,
      })
    );
  }

  // Fetch currencies
  useEffect(() => {
    dispatch(fetchCurrencies(token));
  }, [token]);

  // FUNCTION: Handles adding supported countries to the array
  function handleAddSupportedCountry(
    countryToAdd,
    countryArray,
    countryArraySetter
  ) {
    if (countryToAdd.trim() != "") {
      countryArraySetter([...countryArray, countryToAdd]);
    } else {
      toast.info(
        "Cannot perform operation on an empty string. You must specify a country."
      );
    }
  }

  // FUNCTION: Handles removing a supported country from the array
  function handleRemoveCountrySupport(
    countryToRemove,
    countryArray,
    countryArraySetter
  ) {
    const indexToRemove = countryArray.indexOf(countryToRemove);
    const newArray = countryArray.filter((_, index) => index !== indexToRemove);
    countryArraySetter(newArray);
  }

  return (
    <div className="">
      <Helmet>
        <title>Exchange Rates | Shuttlelane Portal Admin Dashboard</title>
      </Helmet>

      <ToastContainer />
      {/* Modify Rates Modal */}
      <Modal
        isOpen={isModifyRateModalOpen}
        onRequestClose={() => setIsModifyRateModalOpen(false)}
        className="flex h-full min-h-screen justify-center items-center lg:px-24 px-7"
      >
        <div className="bg-white shuttlelaneScrollbar min-h-[90vh] max-h-[90vh] h-[90vh] overflow-y-scroll shadow-lg rounded-lg text-shuttlelaneBlack lg:w-2/4 w-full p-7 px-10">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Modify Exchange Rate</h4>

            <div className="flex items-center gap-2">
              <FaTrash
                size={18}
                onClick={(e) => {
                  handleDeleteCurrency(e);
                  setIsModifyRateModalOpen(false);
                }}
                className="cursor-pointer text-red-500"
              />

              <FaXmark
                size={20}
                onClick={() => setIsModifyRateModalOpen(false)}
                className="cursor-pointer"
              />
            </div>
          </div>

          <form className="w-full mt-5">
            <div className="flex flex-col gap-y-5 lg:items-center gap-x-4">
              {/* Modified Label */}
              <div className="w-full flex flex-col">
                <label htmlFor="modifiedCurrencyLabel" className="text-sm">
                  Currency Label
                </label>
                <input
                  type="text"
                  placeholder="Dollars"
                  name="modifiedCurrencyLabel"
                  value={modifiedCurrencyLabel}
                  onChange={(e) => setModifiedCurrencyLabel(e.target.value)}
                  className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
                />
              </div>

              {/* Modified Rate Percentage */}
              <div className="w-full flex items-center justify-between">
                <div className="w-[100%] flex items-center">
                  <label
                    htmlFor="exchangeRatePercentage"
                    className="text-sm inline-block p-3 bg-gray-200 h-11 rounded-tl-lg rounded-bl-lg"
                  >
                    %
                  </label>
                  <input
                    type="number"
                    placeholder="1000"
                    name="exchangeRatePercentage"
                    value={modifiedExchangeRatePercentage}
                    onChange={(e) =>
                      setModifiedExchangeRatePercentage(e.target.value)
                    }
                    className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-tr-lg rounded-br-lg"
                  />
                </div>
              </div>

              {/* Modified Additional Rate */}
              <div className="w-full flex items-center justify-between">
                <div className="w-[80%] flex items-center">
                  <label
                    htmlFor="modifiedAdditionalRate"
                    className="text-sm inline-block p-3 bg-gray-200 h-11 rounded-tl-lg rounded-bl-lg"
                  >
                    {currentCurrency?.symbol}
                  </label>
                  <input
                    type="number"
                    placeholder="1000"
                    name="modifiedAdditionalRate"
                    value={modifiedAdditionalRate}
                    onChange={(e) => setModifiedAdditionalRate(e.target.value)}
                    className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-tr-lg rounded-br-lg"
                  />
                </div>
                <label htmlFor="modifiedAdditionalRate" className="text-sm">
                  Additional Rate
                </label>
              </div>

              {/* Modified Symbol */}
              <div className="w-full flex flex-col">
                <label htmlFor="modifiedCurrencySymbol" className="text-sm">
                  Currency Symbol
                </label>
                <input
                  type="text"
                  placeholder="$"
                  name="modifiedCurrencySymbol"
                  value={modifiedCurrencySymbol}
                  onChange={(e) => setModifiedCurrencySymbol(e.target.value)}
                  className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
                />
              </div>

              {/* Modified Alias */}
              <div className="w-full flex flex-col">
                <label htmlFor="modifiedCurrencyAlias" className="text-sm">
                  Currency Alias
                </label>
                <input
                  type="text"
                  placeholder="USD"
                  name="modifiedCurrencyAlias"
                  value={modifiedCurrencyAlias}
                  onChange={(e) => setModifiedCurrencyAlias(e.target.value)}
                  className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
                />
              </div>

              {/* Modified Supported Countries */}
              <div className="w-full flex flex-col">
                <label htmlFor="modifiedSupportedCountry" className="text-sm">
                  Supported countries
                </label>
                <div className="flex items-center flex-wrap gap-4 my-2">
                  {modifiedSupportedCountries?.map(
                    (modifiedSupportedCountry) => (
                      <div className="bg-shuttlelanePurple text-white h-10 p-2 flex items-center justify-between rounded-md">
                        <span className="text-sm">
                          {modifiedSupportedCountry}
                        </span>
                        <FaXmark
                          size={16}
                          onClick={() =>
                            handleRemoveCountrySupport(
                              modifiedSupportedCountry,
                              modifiedSupportedCountries,
                              setModifiedSupportedCountries,
                              setModifiedSupportedCountry
                            )
                          }
                          className="cursor-pointer"
                        />
                      </div>
                    )
                  )}
                  {modifiedSupportedCountries?.length < 1 && (
                    <div className="border-[2px] border-gray-300 border-dashed text-gray-300 h-10 p-2 flex items-center justify-between rounded-md">
                      <span className="text-sm">Add supported countries</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center">
                  <ReactCountryFlagsSelect
                    disabled={isLoading}
                    selected={modifiedSupportedCountry}
                    onSelect={setModifiedSupportedCountry}
                    fullWidth
                    searchable
                    classes="w-[85%] text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-tl-lg rounded-bl-lg"
                  />

                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={(e) =>
                      handleAddSupportedCountry(
                        modifiedSupportedCountry?.label,
                        modifiedSupportedCountries,
                        setModifiedSupportedCountries
                      )
                    }
                    className="w-[15%] flex justify-center items-center text-sm text-white hover:text-shuttlelaneBlack h-11 p-3 transition-all hover:border-[1px] hover:bg-transparent bg-shuttlelanePurple focus:outline-none border-gray-400 rounded-tr-lg rounded-br-lg"
                  >
                    Add
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                onClick={(e) => handleUpdateCurrency(e)}
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
        <div className="bg-white max-h[90vh] min-h-[90vh] h-[90vh] shuttlelaneScrollbar overflow-y-scroll shadow-lg rounded-lg text-shuttlelaneBlack lg:w-2/4 w-full p-7 px-10">
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

              {/* Rate Percentage */}
              <div className="w-full flex items-center justify-between">
                <div className="w-[100%] flex items-center">
                  <label
                    htmlFor="exchangeRatePercentage"
                    className="text-sm inline-block p-3 bg-gray-200 h-11 rounded-tl-lg rounded-bl-lg"
                  >
                    %
                  </label>
                  <input
                    type="number"
                    placeholder="1000"
                    name="exchangeRatePercentage"
                    value={exchangeRatePercentage}
                    onChange={(e) => setExchangeRatePercentage(e.target.value)}
                    className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-tr-lg rounded-br-lg"
                  />
                </div>
              </div>

              {/* Additional Rate */}
              <div className="w-full flex items-center justify-between">
                <div className="w-[80%] flex items-center">
                  <label
                    htmlFor="additionalRate"
                    className="text-sm inline-block p-3 bg-gray-200 h-11 rounded-tl-lg rounded-bl-lg"
                  >
                    {currencySymbol}
                  </label>
                  <input
                    type="number"
                    placeholder="1000"
                    name="additionalRate"
                    value={additionalRate}
                    onChange={(e) => setAdditionalRate(e.target.value)}
                    className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-tr-lg rounded-br-lg"
                  />
                </div>
                <label htmlFor="additionalRate" className="text-sm">
                  Additional Rate
                </label>
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

              <div className="w-full flex flex-col">
                <label htmlFor="supportedCountry" className="text-sm">
                  Supported countries
                </label>
                <div className="flex items-center flex-wrap gap-4 my-2">
                  {supportedCountries?.map((supportedCountry) => (
                    <div className="bg-shuttlelanePurple text-white h-10 p-2 flex items-center justify-between rounded-md">
                      <span className="text-sm">{supportedCountry}</span>
                      <FaXmark
                        size={16}
                        onClick={() =>
                          handleRemoveCountrySupport(
                            supportedCountry,
                            supportedCountries,
                            setSupportedCountries,
                            setSupportedCountry
                          )
                        }
                        className="cursor-pointer"
                      />
                    </div>
                  ))}
                  {supportedCountries?.length < 1 && (
                    <div className="border-[2px] border-gray-300 border-dashed text-gray-300 h-10 p-2 flex items-center justify-between rounded-md">
                      <span className="text-sm">Add supported countries</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center">
                  <ReactCountryFlagsSelect
                    disabled={isLoading}
                    selected={supportedCountry}
                    onSelect={setSupportedCountry}
                    fullWidth
                    searchable
                    classes="w-[85%] text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-tl-lg rounded-bl-lg"
                  />

                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={(e) =>
                      handleAddSupportedCountry(
                        supportedCountry?.label,
                        supportedCountries,
                        setSupportedCountries
                      )
                    }
                    className="w-[15%] flex justify-center items-center text-sm text-white hover:text-shuttlelaneBlack h-11 p-3 transition-all hover:border-[1px] hover:bg-transparent bg-shuttlelanePurple focus:outline-none border-gray-400 rounded-tr-lg rounded-br-lg"
                  >
                    Add
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                onClick={(e) => {
                  handleCreateCurrency(e);
                  setIsAddCurrencyModalOpen(false);
                }}
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
      <AdminDashboardNavbar
        link="rates"
        sublink="exchange-rates"
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
                Exchange Rates
              </h2>
              <p className="text-sm">
                The official exchange rates on Shuttlelane
              </p>

              <div className="flex gap-x-6 mt-10 flex-wrap gap-y-10">
                {admin?.role !== "Blogger" && (
                  <button
                    onClick={() => setIsAddCurrencyModalOpen(true)}
                    className="w-full lg:w-auto border-[1.3px] lg:border-[.3px] border-gray-200 rounded-lg p-3 flex items-center justify-center flex-col lg:flex-row gap-x-2"
                  >
                    <div className="flex items-center justify-center h-16 w-16 border-[1px] border-dashed border-gray-400 rounded-full">
                      <AiOutlinePlus size={24} className="text-gray-400" />
                    </div>
                  </button>
                )}
                {currencies?.map((currency) => (
                  <button
                    key={currency?._id}
                    onClick={() => {
                      console.log("CURRENT CURRENCY IS:", currency);
                      if (admin?.role !== "Blogger") {
                        setCurrentCurrency(currency);
                        setIsModifyRateModalOpen(true);
                      } else {
                        toast.error(
                          "You do not have the priviledges to modify exchange rates as a blogger"
                        );
                      }
                    }}
                    className="w-full lg:w-auto border-[1.3px] lg:border-[.3px] border-gray-200 rounded-lg p-3 flex items-center gap-x-2"
                  >
                    <div
                      className={`flex items-center justify-center h-16 w-16 border-[1px] border-shuttlelaneLightPurple rounded-full`}
                    >
                      <h1 className="">{currency?.symbol}</h1>
                    </div>
                    <div className="flex flex-col text-left">
                      <p className="font-semibold">
                        {currency?.exchangeRatePercentage}% + {currency?.symbol}
                        {currency?.additionalRate}
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
