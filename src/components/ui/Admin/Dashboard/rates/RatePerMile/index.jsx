import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCurrencies,
  fetchRatePerMile,
  setRatePerMile,
} from "../../../../../../redux/slices/adminSlice";
import { ImSpinner2 } from "react-icons/im";
import { calculateExchangeRate } from "../../../../../../util";
import { toast } from "react-toastify";

function AdminRatePerMile() {
  const { token, isLoading, currencies, ratePerMile } = useSelector(
    (store) => store.admin
  );
  const dispatch = useDispatch();

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
    <div className="mt-10">
      <div className="">
        <p className="text-lg font-semibold">Rate Per Mile</p>
        <small className="">The rate per mile on Shuttlelane</small>
      </div>

      {isLoading && (
        <div className="flex flex-col gap-y-5 mt-5">
          <ImSpinner2
            size={20}
            className="text-shuttlelanePurple animate-spin"
          />
        </div>
      )}

      {!isLoading && (
        <form className="w-full mt-5">
          <div className="flex flex-col gap-y-2 gap-x-4">
            <div className="w-full flex flex-col">
              <label htmlFor="rate" className="text-sm">
                Rate Per Mile
              </label>

              <div className="w-full flex items-center justify-between">
                <div className="lg:w-[40%] w-full flex items-center">
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

            <div className="lg:w-[40%] w-full flex mt-3 flex-col">
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
              className="lg:w-[40%] w-full mt-3 flex justify-center items-center text-sm text-white hover:text-shuttlelaneBlack h-11 p-3 transition-all hover:border-[1px] hover:bg-transparent bg-shuttlelanePurple focus:outline-none border-gray-400 rounded-lg"
            >
              {isLoading ? (
                <ImSpinner2 size={21} className="animate-spin" />
              ) : (
                "Save"
              )}
            </button>

            <div className="text-left flex flex-col gap-y-1">
              {conversionRates?.map((conversionRate) => (
                <small>
                  ₦{rate ?? 0} ~ {conversionRate?.currencySymbol}
                  {isNaN(conversionRate?.rate) ? 0 : conversionRate?.rate}
                </small>
              ))}
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default AdminRatePerMile;
