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
import { useDispatch, useSelector } from "react-redux";
import ReactCountryFlagsSelect from "react-country-flags-select";
import {
  calculateTotal,
  fetchPasses,
} from "../../../../redux/slices/adminSlice";
import VisaOnArrivalBookingSummary from "../../../../components/ui/BookingSummary/VisaOnArrivalBooking";

function AdminVisaOnArrivalForm() {
  // FORM FIELDS
  const [country, setCountry] = useState();

  const { isLoading, voaVerificationMessage, voaVerificationStatus } =
    useSelector((store) => store.admin);
  const dispatch = useDispatch();

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
      })
    );
  }, [country]);

  useEffect(() => {
    console.log("voaVerificationStatus:::", voaVerificationStatus);
  }, [voaVerificationStatus]);

  return (
    <>
      <ToastContainer />
      {/* <div className="w-full lg:flex-row lg:justify-between lg:items-center -mt-12">
        <div className="bg-white lg:h-[250px] h-[520px] w-auto shadow-lg py-7 pb-10 gap-y-5 gap-x-4 px-7 lg:px-4 lg:pl-10 relative rounded-2xl"> */}

      <Fade duration={1500}>
        <>
          <div className="w-full flex items-center mt-11 pb-6 relative z-[90]">
            <div className="py-3 w-full lg:w-[50%] px-4 bg-transparent rounded-lg text-shuttlelaneBlack">
              <p>Select country of Nationality below:</p>

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
          </div>

          {voaVerificationStatus === "visaRequired" && (
            <div className="-mt-6">
              <VisaOnArrivalBookingSummary isAdminForm={true} />
            </div>
          )}
        </>
      </Fade>
      {/* </div>
      </div> */}
    </>
  );
}

export default AdminVisaOnArrivalForm;
