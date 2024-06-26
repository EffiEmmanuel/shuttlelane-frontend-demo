// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createVisaOnArrivalRate,
  deleteVisaOnArrivalRate,
  fetchCurrencies,
  fetchRatePerMile,
  fetchVisaOnArrivalBaseRates,
  fetchVisaOnArrivalRates,
  setRatePerMile,
  setVisaOnArrivalBaseFees,
  updateVisaOnArrivalRate,
} from "../../../../../../redux/slices/adminSlice";
import { ImSpinner2 } from "react-icons/im";
import { calculateExchangeRate } from "../../../../../../util";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlinePlus } from "react-icons/ai";
import {
  FaHandHoldingDollar,
  FaTrash,
  FaTrashCan,
  FaXmark,
} from "react-icons/fa6";
import Modal from "react-modal";
import Select from "react-select";
import ReactCountryFlagsSelect from "react-country-flags-select";

// Images
import empty from "../../../../../../assets/images/empty.png";

function AdminVisaOnArrivalRate() {
  const { token, isLoading, visaOnArrivalRates, voaBaseFees } = useSelector(
    (store) => store.admin
  );
  const dispatch = useDispatch();

  //   Fetch currencies and rate per mile
  useEffect(() => {
    dispatch(fetchVisaOnArrivalRates(token));
  }, [token]);

  // Modal states
  const [isModifyBaseFeesModalOpen, setIsModifyBaseFeesModalOpen] =
    useState(false);
  const [isAddCountryModalOpen, setIsAddCountryModalOpen] = useState(false);

  // Modify Base Fees Form Fields
  const [transactionFee, setTransactionFee] = useState();
  const [biometricFee, setBiometricFee] = useState();
  const [processingFee, setProcessingFee] = useState();

  // FUNCTION: This function handles the modification of the base fees
  async function handleModifyBaseFees(e) {
    e.preventDefault();
    if (!transactionFee || !biometricFee || !processingFee) {
      toast.error("Please fill in the missing fields");
      return;
    }
    dispatch(
      setVisaOnArrivalBaseFees({
        token,
        transactionFee,
        biometricFee,
        processingFee,
      })
    );
  }

  // Add Country Form Fields
  const [country, setCountry] = useState();
  const [visaFee, setVisaFee] = useState();
  const [isVisaRequired, setIsVisaRequired] = useState();
  const [isBiometricsRequired, setIsBiometricsRequired] = useState();

  // FUNCTION: This function handles the creation of a country / visa on arrival rate
  async function handleAddCountry(e) {
    e.preventDefault();
    if (!country || !visaFee || !isVisaRequired || !isBiometricsRequired) {
      toast.error("Please fill in the missing fields");
      return;
    }
    dispatch(
      createVisaOnArrivalRate({
        token,
        country: country?.label,
        visaFee,
        isNigerianVisaRequired: isVisaRequired?.value,
        isBiometricsRequired: isBiometricsRequired?.value,
      })
    );

    setIsAddCountryModalOpen(false);
  }

  // FUNCTION: This function handles the modification of the base fees
  async function handleModifyBaseFees(e) {
    e.preventDefault();
    if (!transactionFee || !biometricFee || !processingFee) {
      toast.error("Please fill in the missing fields");
      return;
    }
    dispatch(
      setVisaOnArrivalBaseFees({
        token,
        transactionFee,
        biometricFee,
        processingFee,
        _id: voaBaseFees?._id,
      })
    );
  }

  // Fetch base rates
  useEffect(() => {
    dispatch(fetchVisaOnArrivalBaseRates(token));
  }, [token]);
  // Set base rates
  useEffect(() => {
    setProcessingFee(voaBaseFees?.processingFee);
    setTransactionFee(voaBaseFees?.transactionFee);
    setBiometricFee(voaBaseFees?.biometricFee);
    console.log("BASE FEES:", voaBaseFees);
  }, [voaBaseFees]);

  // MODIFY VISA ON ARRIVAL RATE
  const [isRateDetailModalOpen, setIsRateDetailModalOpen] = useState(false);
  const [currentVOARate, setCurrentVOARate] = useState();
  const [countryModified, setCountryModified] = useState();
  const [visaFeeModified, setVisaFeeModified] = useState(
    currentVOARate?.visaFee
  );
  const [isVisaRequiredModified, setIsVisaRequiredModified] = useState();
  const [isBiometricsRequiredModified, setIsBiometricsRequiredModified] =
    useState();
  useEffect(() => {
    console.log("TF:", currentVOARate?.isNigerianVisaRequired);
    setVisaFeeModified(currentVOARate?.visaFee ?? 0);
    setCountryModified(currentVOARate?.country);
    setIsVisaRequiredModified({
      value: currentVOARate?.isNigerianVisaRequired,
      label: currentVOARate?.isNigerianVisaRequired === true ? "Yes" : "No",
    });
    setIsBiometricsRequiredModified({
      value: currentVOARate?.isBiometricsRequired,
      label: currentVOARate?.isBiometricsRequired === true ? "Yes" : "No",
    });
  }, [currentVOARate]);

  async function handleModifyVisaOnArrivalRate(e) {
    e.preventDefault();

    if (
      !visaFeeModified ||
      !countryModified ||
      !isVisaRequiredModified ||
      !isBiometricsRequiredModified
    ) {
      console.log(visaFeeModified, countryModified, isVisaRequiredModified);
      toast.error("Please fill in the missing fields");
      return;
    }
    dispatch(
      updateVisaOnArrivalRate({
        token,
        _id: currentVOARate?._id,
        country: countryModified?.label,
        isNigerianVisaRequired: isVisaRequiredModified?.value,
        isBiometricsRequired: isBiometricsRequiredModified?.value,
        visaFee: visaFeeModified,
        voaBaseFeeId: voaBaseFees?._id,
      })
    );

    setIsRateDetailModalOpen(false);
  }
  async function handleDeleteVisaOnArrivalRate(e) {
    e.preventDefault();

    dispatch(deleteVisaOnArrivalRate({ token, _id: currentVOARate?._id }));
  }

  // "Is Visa Required For Citizens Of This Country To Visit Nigeria?" Data
  const isVisaRequiredData = [
    { value: false, label: "No" },
    { value: true, label: "Yes" },
  ];

  // "Is Biometrics Required For Citizens Of This Country To Visit Nigeria?" Data
  const isBiometricsRequiredData = [
    { value: false, label: "No" },
    { value: true, label: "Yes" },
  ];

  return (
    <div className="mt-10">
      <ToastContainer />
      {/* Modify Base Fees Modal */}
      <Modal
        isOpen={isModifyBaseFeesModalOpen}
        onRequestClose={() => setIsModifyBaseFeesModalOpen(false)}
        className="flex h-full min-h-screen justify-center items-center lg:px-24 px-7"
      >
        <div className="bg-white shadow-lg rounded-lg text-shuttlelaneBlack lg:w-2/4 w-full p-7 px-10">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Base Fees</h4>

            <FaXmark
              size={20}
              onClick={() => setIsModifyBaseFeesModalOpen(false)}
              className="cursor-pointer"
            />
          </div>

          {/* Modify Base Fees */}
          <form className="w-full mt-5">
            <div className="flex flex-col gap-y-5 lg:items-center gap-x-4">
              <div className="w-full flex flex-col">
                <label htmlFor="transactionFee" className="text-sm">
                  Transaction Fee
                </label>

                <div className="w-full flex items-center justify-between">
                  <div className="w-full flex items-center">
                    <label
                      htmlFor="transactionFee"
                      className="text-sm inline-block p-3 bg-gray-200 h-11 rounded-tl-lg rounded-bl-lg"
                    >
                      $
                    </label>
                    <input
                      type="number"
                      placeholder="30"
                      name="transactionFee"
                      value={transactionFee}
                      onChange={(e) => {
                        console.log("RATE:", e.target.value);
                        setTransactionFee(e.target.value);
                      }}
                      className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-tr-lg rounded-br-lg"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col">
                <label htmlFor="processingFee" className="text-sm">
                  Processing Fee
                </label>

                <div className="w-full flex items-center justify-between">
                  <div className="w-full flex items-center">
                    <label
                      htmlFor="processingFee"
                      className="text-sm inline-block p-3 bg-gray-200 h-11 rounded-tl-lg rounded-bl-lg"
                    >
                      $
                    </label>
                    <input
                      type="number"
                      placeholder="120"
                      name="processingFee"
                      value={processingFee}
                      onChange={(e) => {
                        console.log("RATE:", e.target.value);
                        setProcessingFee(e.target.value);
                      }}
                      className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-tr-lg rounded-br-lg"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col">
                <label htmlFor="biometricFee" className="text-sm">
                  Biometric Fee
                </label>

                <div className="w-full flex items-center justify-between">
                  <div className="w-full flex items-center">
                    <label
                      htmlFor="biometricFee"
                      className="text-sm inline-block p-3 bg-gray-200 h-11 rounded-tl-lg rounded-bl-lg"
                    >
                      $
                    </label>
                    <input
                      type="number"
                      placeholder="90"
                      name="biometricFee"
                      value={biometricFee}
                      onChange={(e) => {
                        console.log("RATE:", e.target.value);
                        setBiometricFee(e.target.value);
                      }}
                      className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-tr-lg rounded-br-lg"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                onClick={(e) => handleModifyBaseFees(e)}
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
      {/* Add Country Modal */}
      <Modal
        isOpen={isAddCountryModalOpen}
        onRequestClose={() => setIsAddCountryModalOpen(false)}
        className="flex h-full min-h-screen justify-center items-center lg:px-24 px-7"
      >
        <div className="bg-white shadow-lg rounded-lg text-shuttlelaneBlack lg:w-2/4 w-full p-7 px-10">
          <div className="flex items-center justify-between">
            <div className="">
              <h4 className="font-semibold">Add Country</h4>
              <small>Add support for a new country</small>
            </div>

            <FaXmark
              size={20}
              onClick={() => setIsAddCountryModalOpen(false)}
              className="cursor-pointer"
            />
          </div>

          {/* Add Country */}
          <form className="w-full mt-5">
            <div className="flex flex-col gap-y-5 lg:items-center gap-x-4">
              <div className="w-full flex flex-col">
                <label htmlFor="country" className="text-sm">
                  Country
                </label>

                <div className="w-full flex items-center justify-between">
                  <ReactCountryFlagsSelect
                    disabled={isLoading}
                    selected={country}
                    onSelect={setCountry}
                    fullWidth
                    searchable
                    classes="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
                  />
                </div>
              </div>

              <div className="w-full flex flex-col">
                <label htmlFor="visaFee" className="text-sm">
                  Visa Fee
                </label>

                <div className="w-full flex items-center justify-between">
                  <div className="w-full flex items-center">
                    <label
                      htmlFor="visaFee"
                      className="text-sm inline-block p-3 bg-gray-200 h-11 rounded-tl-lg rounded-bl-lg"
                    >
                      $
                    </label>
                    <input
                      type="number"
                      placeholder="120"
                      name="visaFee"
                      value={visaFee}
                      onChange={(e) => {
                        console.log("RATE:", e.target.value);
                        setVisaFee(e.target.value);
                      }}
                      className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-tr-lg rounded-br-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col">
                <label htmlFor="visaFee" className="text-sm">
                  Is visa required for citizens of this country to visit
                  Nigeria?
                </label>
                <div className="flex items-center bg-gray-100 h-[47px] px-2 gap-x-2 w-full rounded-lg">
                  <div className="w-full text-shuttlelaneBlack text-sm relative">
                    <Select
                      value={isVisaRequired}
                      onChange={(value) => setIsVisaRequired(value)}
                      options={isVisaRequiredData}
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
                      placeholder="Select Yes or No"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col">
                <label htmlFor="isBiometricsRequired" className="text-sm">
                  Is biometrics required for citizens of this country to visit
                  Nigeria?
                </label>
                <div className="flex items-center bg-gray-100 h-[47px] px-2 gap-x-2 w-full rounded-lg">
                  <div className="w-full text-shuttlelaneBlack text-sm relative">
                    <Select
                      value={isBiometricsRequired}
                      onChange={(value) => setIsBiometricsRequired(value)}
                      options={isBiometricsRequiredData}
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
                      placeholder="Select Yes or No"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                onClick={(e) => handleAddCountry(e)}
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
      {/* Rate Details Modal */}
      <Modal
        isOpen={isRateDetailModalOpen}
        onRequestClose={() => setIsRateDetailModalOpen(false)}
        className="flex h-full min-h-screen justify-center items-center lg:px-24 px-7"
      >
        <div className="bg-white shadow-lg rounded-lg text-shuttlelaneBlack lg:w-2/4 w-full p-7 px-10">
          <div className="flex items-center justify-between">
            <div className="">
              <h4 className="font-semibold">{currentVOARate?.country}</h4>
              <small>Visa On Arrival Rate for {currentVOARate?.country}</small>
            </div>

            <FaXmark
              size={20}
              onClick={() => setIsRateDetailModalOpen(false)}
              className="cursor-pointer"
            />
          </div>

          <form className="w-full mt-5">
            <div className="flex flex-col gap-y-5 lg:items-center gap-x-4">
              <div className="w-full flex flex-col">
                <label htmlFor="country" className="text-sm">
                  Country Name
                </label>

                <div className="w-full flex items-center justify-between">
                  <ReactCountryFlagsSelect
                    disabled={isLoading}
                    selected={countryModified}
                    onSelect={setCountryModified}
                    fullWidth
                    searchable
                    classes="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
                  />
                </div>
              </div>

              <div className="w-full flex flex-col">
                <label htmlFor="visaFee" className="text-sm">
                  Visa Fee
                </label>

                <div className="w-full flex items-center justify-between">
                  <div className="w-full flex items-center">
                    <label
                      htmlFor="visaFee"
                      className="text-sm inline-block p-3 bg-gray-200 h-11 rounded-tl-lg rounded-bl-lg"
                    >
                      $
                    </label>
                    <input
                      type="number"
                      placeholder="120"
                      name="visaFee"
                      value={visaFeeModified}
                      onChange={(e) => {
                        console.log("RATE:", e.target.value);
                        setVisaFeeModified(e.target.value);
                      }}
                      className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-tr-lg rounded-br-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col">
                <label htmlFor="visaFee" className="text-sm">
                  Is visa required for citizens of this country to visit
                  Nigeria?
                </label>
                <div className="flex items-center border-[0.3px] border-gray-400 h-[47px] px-2 gap-x-2 w-full rounded-lg">
                  <div className="w-full text-shuttlelaneBlack text-sm relative">
                    <Select
                      value={isVisaRequiredModified}
                      onChange={(value) => setIsVisaRequiredModified(value)}
                      options={isVisaRequiredData}
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
                      placeholder="Select Yes or No"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col">
                <label
                  htmlFor="isBiometricsRequiredModified"
                  className="text-sm"
                >
                  Is biometrics required for citizens of this country to visit
                  Nigeria?
                </label>
                <div className="flex items-center border-[0.3px] border-gray-400 h-[47px] px-2 gap-x-2 w-full rounded-lg">
                  <div className="w-full text-shuttlelaneBlack text-sm relative">
                    <Select
                      value={isBiometricsRequiredModified}
                      onChange={(value) =>
                        setIsBiometricsRequiredModified(value)
                      }
                      options={isBiometricsRequiredData}
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
                      placeholder="Select Yes or No"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full flex lg:flex-row flex-col lg:justify-between items-center gap-5">
                <button
                  type="submit"
                  disabled={isLoading}
                  onClick={(e) => {
                    handleModifyVisaOnArrivalRate(e);
                    setIsRateDetailModalOpen(false);
                  }}
                  className="w-full lg:w-[50%] flex justify-center items-center text-sm text-white hover:text-shuttlelaneBlack h-11 p-3 transition-all hover:border-[1px] hover:bg-transparent bg-shuttlelanePurple focus:outline-none border-gray-400 rounded-lg"
                >
                  {isLoading ? (
                    <ImSpinner2 size={21} className="animate-spin" />
                  ) : (
                    "Save"
                  )}
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  onClick={(e) => {
                    handleDeleteVisaOnArrivalRate(e);
                    setIsRateDetailModalOpen(false);
                  }}
                  className="w-full lg:w-[50%] flex justify-center items-center text-sm text-white hover:text-shuttlelaneBlack h-11 p-3 transition-all hover:border-[1px] hover:bg-transparent bg-red-500 focus:outline-none border-gray-400 rounded-lg"
                >
                  {isLoading ? (
                    <ImSpinner2 size={21} className="animate-spin" />
                  ) : (
                    <div className="flex items-center gap-x-2">
                      <FaTrashCan size={16} />
                      <span className="text-sm">Delete</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>

      <div className="flex gap-x-5 flex-wrap gap-y-3 items-end pb-3 border-b-[1.3px] lg:border-b-[.5px] border-b-gray-200">
        <div className="">
          <p className="text-lg font-semibold">Visa On Arrival Rates</p>
          <small className="">
            The rates per country for{" "}
            <strong className="text-xs">Visa On Arrival</strong> application on
            Shuttlelane
          </small>
        </div>

        {/* Modify base fees button */}
        <button
          onClick={() => setIsModifyBaseFeesModalOpen(true)}
          className="w-auto border-dashed border-[.8px] lg:border-[.3px] border-shuttlelaneBlack p-1 rounded-sm flex items-center gap-x-1"
        >
          <FaHandHoldingDollar size={16} />
          <span className="text-xs">Modify Base Fees</span>
        </button>

        {/* Add country button */}
        <button
          onClick={() => setIsAddCountryModalOpen(true)}
          className="w-auto border-dashed border-[.8px] lg:border-[.3px] border-shuttlelaneBlack p-1 rounded-sm flex items-center gap-x-1"
        >
          <AiOutlinePlus size={16} />
          <span className="text-xs">Add Country</span>
        </button>
      </div>
      {isLoading && (
        <div className="flex flex-col gap-y-5 mt-5">
          <ImSpinner2
            size={20}
            className="text-shuttlelanePurple animate-spin"
          />
        </div>
      )}

      {/* VOA TABLE */}
      {!isLoading && (
        <div className="mt-5 w-full lg:overflow-x-hidden overflow-x-scroll shuttlelaneScrollbarHoriz shuttlelaneScrollbar">
          <div className="flex flex-col gap-y-1">
            <div className="flex items-center gap-x-1">
              <div className="h-1 w-5 bg-green-400"></div>
              <small>indicates visa is NOT required to visit Nigeria</small>
            </div>
            <div className="flex items-center gap-x-1">
              <div className="h-1 w-5 bg-red-400"></div>
              <small>indicates visa is required to visit Nigeria</small>
            </div>
            <div className="flex items-center gap-x-1">
              <div className="h-1 w-5 bg-yellow-400"></div>
              <small>indicates value not yet set</small>
            </div>
          </div>

          {/* Table header */}
          <div className="maxContent lg:max-w-full lg:min-w-full flex justify-between items-baseline mb-2 border-b-[.3px] border-b-gray-100 text-gray-400 mt-2">
            <p className="w-[200px] lg:w-[14.2%] text-xs">Country</p>
            <p className="w-[200px] lg:w-[14.2%] text-xs">Visa Fee</p>
            <p className="w-[200px] lg:w-[14.2%] text-xs">Transaction Fee</p>
            <p className="w-[200px] lg:w-[14.2%] text-xs">Processing Fee</p>
            <p className="w-[200px] lg:w-[14.2%] text-xs">Biometric Fee</p>
            <p className="w-[200px] lg:w-[14.2%] text-xs">VAT (7.5%)</p>
            <p className="w-[200px] lg:w-[14.2%] text-xs">Total</p>
          </div>

          {/* Table body */}
          {visaOnArrivalRates?.map((visaOnArrivalRate) => (
            <div
              onClick={() => {
                setIsRateDetailModalOpen(true);
                setCurrentVOARate(visaOnArrivalRate);
              }}
              className="flex maxContent cursor-pointer lg:max-w-full lg:min-w-full justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4"
            >
              <p
                className={`w-[200px] lg:w-[14.2%] text-xs ${
                  isLoading && "text-gray-400"
                }`}
              >
                {visaOnArrivalRate?.country}
                {visaOnArrivalRate?.isNigerianVisaRequired ? (
                  <div className="h-1 w-5 bg-red-400"></div>
                ) : visaOnArrivalRate?.isNigerianVisaRequired == null ? (
                  <div className="h-1 w-5 bg-yellow-400"></div>
                ) : (
                  <div className="h-1 w-5 bg-green-400"></div>
                )}
              </p>
              <p
                className={`w-[200px] lg:w-[14.2%] text-xs ${
                  isLoading && "text-gray-400"
                }`}
              >
                ${visaOnArrivalRate?.visaFee}
              </p>
              <p
                className={`w-[200px] lg:w-[14.2%] text-xs ${
                  isLoading && "text-gray-400"
                }`}
              >
                ${voaBaseFees?.transactionFee}
              </p>
              <p
                className={`w-[200px] lg:w-[14.2%] text-xs ${
                  isLoading && "text-gray-400"
                }`}
              >
                ${voaBaseFees?.processingFee}
              </p>
              <p
                className={`w-[200px] lg:w-[14.2%] text-xs ${
                  isLoading && "text-gray-400"
                }`}
              >
                {visaOnArrivalRate?.isBiometricsRequired === true
                  ? `$${voaBaseFees?.biometricFee}`
                  : `N/A`}
              </p>
              <p
                className={`w-[200px] lg:w-[14.2%] text-xs ${
                  isLoading && "text-gray-400"
                }`}
              >
                ${visaOnArrivalRate?.vat}
              </p>
              <p
                className={`w-[200px] lg:w-[14.2%] text-xs ${
                  isLoading && "text-gray-400"
                }`}
              >
                ${visaOnArrivalRate?.total}
              </p>
            </div>
          ))}

          {visaOnArrivalRates?.length < 1 && (
            <div className="flex flex-col items-center gap-y-5 text-center">
              <img
                src={empty}
                className="max-w-[150px] w-[150px] object-contain"
              />
              <p className="text-center text-sm">
                No countries to show for now...
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminVisaOnArrivalRate;
