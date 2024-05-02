import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRatePerMile,
  fetchCities,
  fetchCurrencies,
  fetchRatesPerMile,
  setRatePerMile,
} from "../../../../../../redux/slices/adminSlice";
import { ImSpinner2 } from "react-icons/im";
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import { calculateExchangeRate } from "../../../../../../util";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { FaXmark } from "react-icons/fa6";
import Select from "react-select";

function AdminRatePerMile() {
  const { token, isLoading, currencies, cities, ratePerMile, ratesPerMile } =
    useSelector((store) => store.admin);
  const dispatch = useDispatch();

  // Form Fields
  const [rate, setRate] = useState();
  const [mile, setMile] = useState();
  const [selectedCity, setSelectedCity] = useState();

  // Add new rate sattes
  const [isAddNewRateModalOpen, setIsAddNewRateModalOpen] = useState(false);
  const [currentRatePerMile, setCurrentRatePerMile] = useState();

  // Update rate states
  const [isUpdateRateModalOpen, setIsUpdateRateModalOpen] = useState(false);
  // Update form fields
  const [modifiedRate, setModifiedRate] = useState();
  const [modifiedMile, setModifiedMile] = useState();
  const [modifiedSelectedCity, setModifiedSelectedCity] = useState();

  // Pre-fill update fields
  useEffect(() => {
    setModifiedRate(currentRatePerMile?.rate);
    setModifiedMile(currentRatePerMile?.mile);
    setModifiedSelectedCity({
      value: currentRatePerMile?.city?._id,
      label: currentRatePerMile?.city?.cityName,
    });
  }, [currentRatePerMile]);

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

  // FUNCTION: Handle save / set rate per mile
  async function handleSetRatePerMile(e) {
    e.preventDefault();
    if (isAddNewRateModalOpen) {
      if (!rate || !mile || !selectedCity) {
        toast.error("Please fill in the missing fields.");
        return;
      }
      dispatch(
        setRatePerMile({ token, rate, mile, city: selectedCity?.value })
      );
      setIsAddNewRateModalOpen(false);
    } else if (isUpdateRateModalOpen) {
      if (!modifiedRate || !modifiedMile || !modifiedSelectedCity) {
        toast.error("Please fill in the missing fields.");
        return;
      }
      dispatch(
        setRatePerMile({
          token,
          rate: modifiedRate,
          mile: modifiedMile,
          city: modifiedSelectedCity?.value,
        })
      );

      setIsUpdateRateModalOpen(false);
    }
  }

  // FUNCTION: Handle save / set rate per mile
  async function handleDeleteRatePerMile(_id) {
    dispatch(deleteRatePerMile({ token, _id }));
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
      const exchangeRate = isAddNewRateModalOpen
        ? calculateExchangeRate(rate, currency?.exchangeRate)
        : isUpdateRateModalOpen
        ? calculateExchangeRate(modifiedRate, currency?.exchangeRate)
        : null;
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
    dispatch(fetchCities(token));
    dispatch(fetchRatesPerMile(token));
  }, [token]);

  return (
    <div className="mt-10">
      {/* Add New Rate Modal */}
      <Modal
        isOpen={isAddNewRateModalOpen}
        onRequestClose={() => setIsAddNewRateModalOpen(false)}
        className="flex h-full min-h-screen justify-center items-center lg:px-24 px-7"
      >
        <div className="bg-white shadow-lg rounded-lg text-shuttlelaneBlack lg:w-2/4 w-full p-7 px-10">
          <div className="flex items-center justify-between">
            <div className="">
              <h4 className="font-semibold">Add New Rate</h4>
              <small>Add a new rate per mile</small>
            </div>

            <FaXmark
              size={20}
              onClick={() => setIsAddNewRateModalOpen(false)}
              className="cursor-pointer"
            />
          </div>

          {/* Add New Rate */}
          <form className="w-full mt-5">
            <div className="flex flex-col gap-y-5 lg:items-center gap-x-4">
              <div className="w-full flex flex-col">
                <label htmlFor="visaFee" className="text-sm">
                  City
                </label>
                <div className="flex items-center bg-gray-100 h-[47px] px-2 gap-x-2 w-full rounded-lg">
                  <div className="w-full text-shuttlelaneBlack text-sm relative">
                    <Select
                      value={selectedCity}
                      onChange={(value) => setSelectedCity(value)}
                      options={citiesData}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderColor: state.isFocused
                            ? "transparent"
                            : "transparent",
                          borderWidth: state.isFocused ? "0" : "0",
                          backgroundColor: "transparent",
                          position: "relative",
                        }),

                        placeholder: (baseStyles, state) => ({
                          ...baseStyles,
                          // fontSize: ".75rem",
                        }),

                        menuList: (baseStyles, state) => ({
                          ...baseStyles,
                          // fontSize: ".75rem",
                        }),

                        input: (baseStyles, state) => ({
                          ...baseStyles,
                          // fontSize: ".75rem",
                        }),
                      }}
                      placeholder="Select City"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col">
                <label htmlFor="rate" className="text-sm">
                  Rate Per Mile
                </label>

                <div className="w-full flex items-center justify-between">
                  <div className="w-full flex items-center">
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
                      value={rate}
                      min={0}
                      minLength={1}
                      onChange={(e) => {
                        console.log("RATE:", e.target.value);
                        setRate(e.target.value);
                      }}
                      className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-tr-lg rounded-br-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col">
                <label htmlFor="mile" className="text-sm">
                  Maximum Mile (Before Charge)
                </label>
                <input
                  type="number"
                  placeholder="Maximum mile before charge applies"
                  name="mile"
                  value={mile}
                  onChange={(e) => setMile(e.target.value)}
                  className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                onClick={(e) => handleSetRatePerMile(e)}
                className="w-full mt-3 flex justify-center items-center text-sm text-white hover:text-shuttlelaneBlack h-11 p-3 transition-all hover:border-[1px] hover:bg-transparent bg-shuttlelanePurple focus:outline-none border-gray-400 rounded-lg"
              >
                {isLoading ? (
                  <ImSpinner2 size={21} className="animate-spin" />
                ) : (
                  "Save"
                )}
              </button>

              <div className="text-left w-full flex flex-col gap-y-1">
                {conversionRates?.map((conversionRate) => (
                  <small>
                    ₦{rate ?? 0} ~ {conversionRate?.currencySymbol}
                    {isNaN(conversionRate?.rate) ? 0 : conversionRate?.rate}
                  </small>
                ))}
              </div>
            </div>
          </form>
        </div>
      </Modal>
      {/* Update Rate Modal */}
      <Modal
        isOpen={isUpdateRateModalOpen}
        onRequestClose={() => setIsUpdateRateModalOpen(false)}
        className="flex h-full min-h-screen justify-center items-center lg:px-24 px-7"
      >
        <div className="bg-white shadow-lg rounded-lg text-shuttlelaneBlack lg:w-2/4 w-full p-7 px-10">
          <div className="flex items-center justify-between">
            <div className="">
              <h4 className="font-semibold">Update Rate</h4>
              <small>
                Update rate per mile for {currentRatePerMile?.city?.cityName}
              </small>
            </div>

            <FaXmark
              size={20}
              onClick={() => setIsUpdateRateModalOpen(false)}
              className="cursor-pointer"
            />
          </div>

          {/* Add New Rate */}
          <form className="w-full mt-5">
            <div className="flex flex-col gap-y-5 lg:items-center gap-x-4">
              <div className="w-full flex flex-col">
                <label htmlFor="visaFee" className="text-sm">
                  City
                </label>
                <div className="flex items-center bg-gray-100 h-[47px] px-2 gap-x-2 w-full rounded-lg">
                  <div className="w-full text-shuttlelaneBlack text-sm relative">
                    <Select
                      value={modifiedSelectedCity}
                      onChange={(value) => setModifiedSelectedCity(value)}
                      options={citiesData}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderColor: state.isFocused
                            ? "transparent"
                            : "transparent",
                          borderWidth: state.isFocused ? "0" : "0",
                          backgroundColor: "transparent",
                          position: "relative",
                        }),

                        placeholder: (baseStyles, state) => ({
                          ...baseStyles,
                          // fontSize: ".75rem",
                        }),

                        menuList: (baseStyles, state) => ({
                          ...baseStyles,
                          // fontSize: ".75rem",
                        }),

                        input: (baseStyles, state) => ({
                          ...baseStyles,
                          // fontSize: ".75rem",
                        }),
                      }}
                      placeholder="Select City"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col">
                <label htmlFor="rate" className="text-sm">
                  Rate Per Mile
                </label>

                <div className="w-full flex items-center justify-between">
                  <div className="w-full flex items-center">
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
                      value={modifiedRate}
                      min={0}
                      minLength={1}
                      onChange={(e) => {
                        console.log("RATE:", e.target.value);
                        setModifiedRate(e.target.value);
                      }}
                      className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-tr-lg rounded-br-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col">
                <label htmlFor="mile" className="text-sm">
                  Maximum Mile (Before Charge)
                </label>
                <input
                  type="number"
                  placeholder="Maximum mile before charge applies"
                  name="mile"
                  value={modifiedMile}
                  onChange={(e) => setModifiedMile(e.target.value)}
                  className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                onClick={(e) => handleSetRatePerMile(e)}
                className="w-full mt-3 flex justify-center items-center text-sm text-white hover:text-shuttlelaneBlack h-11 p-3 transition-all hover:border-[1px] hover:bg-transparent bg-shuttlelanePurple focus:outline-none border-gray-400 rounded-lg"
              >
                {isLoading ? (
                  <ImSpinner2 size={21} className="animate-spin" />
                ) : (
                  "Save"
                )}
              </button>

              <div className="text-left w-full flex flex-col gap-y-1">
                {conversionRates?.map((conversionRate) => (
                  <small>
                    ₦{rate ?? 0} ~ {conversionRate?.currencySymbol}
                    {isNaN(conversionRate?.rate) ? 0 : conversionRate?.rate}
                  </small>
                ))}
              </div>
            </div>
          </form>
        </div>
      </Modal>

      <div className="flex gap-x-5 flex-wrap gap-y-3 items-end pb-3 border-b-[1.3px] lg:border-b-[.5px] border-b-gray-200">
        <div className="">
          <p className="text-lg font-semibold">Rate Per Mile</p>
          <small className="">The rate per mile on Shuttlelane</small>
        </div>

        {/* Add new rate button */}
        <button
          onClick={() => setIsAddNewRateModalOpen(true)}
          className="w-auto border-dashed border-[.8px] lg:border-[.3px] border-shuttlelaneBlack p-1 rounded-sm flex items-center gap-x-1"
        >
          <AiOutlinePlus size={16} />
          <span className="text-xs">Add New Rate</span>
        </button>
      </div>

      <div className="mt-5 shuttlelaneScrollbarHoriz overflow-x-scroll">
        {/* Table header */}
        <div className="maxContent lg:max-w-full lg:min-w-full flex justify-between items-baseline mb-2 border-b-[.3px] border-b-gray-100 text-gray-400 mt-2">
          <p className="w-[200px] lg:w-[25%] text-xs">City</p>
          <p className="w-[200px] lg:w-[25%] text-xs">
            Rate per mile (i.e After maximum mile is reached)
          </p>
          <p className="w-[200px] lg:w-[25%] text-xs">
            Maximum mile (Before charges apply)
          </p>
          <p className="w-[200px] lg:w-[25%] text-xs">Actions</p>
        </div>

        {/* Table body */}
        {!isLoading && (
          <>
            {ratesPerMile?.map((rate) => (
              <div className="flex maxContent cursor-pointer lg:max-w-full lg:min-w-full justify-between items-center mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                <p
                  onClick={() => {
                    setIsUpdateRateModalOpen(true);
                    setCurrentRatePerMile(rate);
                  }}
                  className={`w-[200px] lg:w-[25%] text-xs ${
                    isLoading && "text-gray-400"
                  }`}
                >
                  {rate?.city?.cityName}
                </p>
                <p
                  onClick={() => {
                    setIsUpdateRateModalOpen(true);
                    setCurrentRatePerMile(rate);
                  }}
                  className={`w-[200px] lg:w-[25%] text-xs ${
                    isLoading && "text-gray-400"
                  }`}
                >
                  ₦{Intl.NumberFormat("en-US", {}).format(rate?.rate)}
                </p>
                <p
                  onClick={() => {
                    setIsUpdateRateModalOpen(true);
                    setCurrentRatePerMile(rate);
                  }}
                  className={`w-[200px] lg:w-[25%] text-xs ${
                    isLoading && "text-gray-400"
                  }`}
                >
                  {rate?.mile} miles
                </p>

                <div className="w-[200px] lg:w-[25%] flex items-center gap-x-3">
                  {!isLoading ? (
                    <button
                      onClick={() => {
                        handleDeleteRatePerMile(rate?._id);
                      }}
                      className="text-xs"
                    >
                      <AiFillDelete size={16} className="text-red-500" />
                    </button>
                  ) : (
                    <ImSpinner2
                      size={16}
                      className="text-gray-400 animate-spin"
                    />
                  )}
                </div>
              </div>
            ))}
          </>
        )}

        {ratesPerMile?.length < 1 && (
          <div className="flex flex-col items-center gap-y-5 text-center">
            {/* <img
                    src={empty}
                    className="max-w-[150px] w-[150px] object-contain"
                  /> */}
            <p className="text-center text-sm">No rates to show for now...</p>
          </div>
        )}

        {isLoading && (
          <ImSpinner2
            size={20}
            className="text-shuttlelanePurple animate-spin"
          />
        )}
      </div>
    </div>
  );
}

export default AdminRatePerMile;
