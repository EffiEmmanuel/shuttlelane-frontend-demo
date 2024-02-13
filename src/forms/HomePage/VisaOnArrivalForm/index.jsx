import React, { useEffect, useRef } from "react";
import { HiArrowLongRight } from "react-icons/hi2";
import { ImSpinner2 } from "react-icons/im";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Fade } from "react-reveal";
import "rsuite/dist/rsuite.css";
import enGB from "date-fns/locale/en-GB";
import { useNavigate } from "react-router-dom";
import {
  calculateTotal,
  fetchPasses,
  setBookingDetails,
} from "../../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import ReactCountryFlagsSelect from "react-country-flags-select";

function VisaOnArrivalForm() {
  // FORM FIELDS
  const [country, setCountry] = useState();

  const {
    isLoading,
    voaVerificationMessage,
    voaVerificationStatus,
    userCurrency,
  } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  // Handle BOOK NOW
  const navigate = useNavigate();
  function handleBookNow(e) {
    e.preventDefault();
    if (!country) {
      toast.info("Please select a country to proceed.");
      return;
    } else {
      dispatch(
        setBookingDetails({
          bookingType: "Visa",
          bookingDetails: {
            country: country,
          },
        })
      );
      navigate("/booking/confirm-booking");
    }
  }

  // Fetch passes (THIS IS STRICTLY JUST TO SET THE USER CURRENCY!!)
  useEffect(() => {
    dispatch(fetchPasses());
  }, []);

  useEffect(() => {
    console.log("hi from here:", country);
    dispatch(
      calculateTotal({
        bookingType: "Visa",
        country: country?.label,
        userCurrency: userCurrency,
      })
    );
  }, [country]);

  return (
    <>
      <ToastContainer toastClassName="text-sm z-[90]" />
      {/* <div className="w-full lg:flex-row lg:justify-between lg:items-center -mt-12">
        <div className="bg-white lg:h-[250px] h-[520px] w-auto shadow-lg py-7 pb-10 gap-y-5 gap-x-4 px-7 lg:px-4 lg:pl-10 relative rounded-2xl"> */}
      <Fade duration={1500}>
        <div className="w-full flex items-center mt-5 pb-6">
          <div className="flex w-full items-center lg:flex-row flex-col">
            <div className="py-3 w-full lg:w-[50%] px-4 bg-transparent rounded-lg text-shuttlelaneBlack">
              <h4 className="font-semibold">Nigerian Visa On Arrival</h4>
              <p>
                Select country of Nationality below to verify support for a
                Nigerian Visa On Arrival based on your country:
              </p>

              <div className="mt-4 text-sm">
                <ReactCountryFlagsSelect
                  disabled={isLoading}
                  selected={country}
                  onSelect={setCountry}
                  fullWidth
                  searchable
                />
              </div>

              {/* Output message and spinner */}
              <div className="mt-4">
                {!isLoading && country && (
                  <p
                    className={`text-md ${
                      voaVerificationStatus === "noSupport"
                        ? "text-blue-500"
                        : "text-green-500"
                    }`}
                  >
                    {voaVerificationMessage}
                  </p>
                )}

                {isLoading && <ImSpinner2 size={21} className="animate-spin" />}
              </div>
            </div>
            <div className="py-3 hidden lg:inline-block lg:w-[50%] px-4 bg-transparent rounded-lg text-shuttlelaneBlack">
              <div className="flex flex-col items-end justify-center">
                <h1 className="greatVibesText text-shuttlelanePurple opacity-[45%] text-4xl break-keep leading-[35px]">
                  Visa On
                </h1>
                <h1 className="text-shuttlelanePurple opacity-[45%] text-4xl break-keep leading-[35px]">
                  ARRIVAL
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full justify-end absolute right-10 -bottom-5">
          <button
            type="submit"
            className="bg-shuttlelanePurple disabled:bg-shuttlelaneLightPurple disabled:text-gray-400 disabled:cursor-not-allowed shadow-[#4540cf85] shadow-md text-white h-10 rounded-lg mt-3 flex items-center gap-x-3 p-3 w-32 justify-center"
            disabled={voaVerificationStatus !== "visaRequired"}
            onClick={(e) => handleBookNow(e)}
          >
            <span className="text-sm">Book Now</span>
            <HiArrowLongRight size={16} className="" />
          </button>
        </div>
      </Fade>
      {/* </div>
      </div> */}
    </>
  );
}

export default VisaOnArrivalForm;
