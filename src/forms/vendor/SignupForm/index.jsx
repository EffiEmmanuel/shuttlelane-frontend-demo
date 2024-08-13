// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import VendorSignupStepOne from "./VendorSignupStepOne";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Slide } from "react-awesome-reveal";
import VendorSignupStepTwo from "./VendorSignupStepTwo";
import VendorSignupStepThree from "./VendorSignupStepThree";
import VendorSignupStepFour from "./VendorSignupStepFour";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  resendOTP,
  resetHasVerifiedPhone,
  signupVendor,
  verifyOTP,
} from "../../../redux/slices/vendorSlice";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import moment from "moment";

function VendorSignupForm(props) {
  const [isStepOne, setIsStepOne] = useState(true);
  const [isStepTwo, setIsStepTwo] = useState(false);
  const [isStepThree, setIsStepThree] = useState(false);
  const [isStepFour, setIsStepFour] = useState(false);
  const [isStepFive, setIsStepFive] = useState(false);
  const [isStepSix, setIsStepSix] = useState(false);
  const [isStepSeven, setIsStepSeven] = useState(false);

  // Form slide direction
  const [slideDirection, setSlideDirection] = useState("left");
  // Form progress width
  const [progressbarWidth, setProgressbarWidth] = useState(0);
  // NEXT button handler
  function handleNext() {
    if (isStepOne) {
      if (
        !companyName ||
        !companyEmail ||
        !citySelected ||
        !companyEmail ||
        !country ||
        !address ||
        !operatingCities ||
        !fleetSize ||
        !fleetType
      ) {
        toast.error("Please fill in the missing fields");
        return;
      }

      setSlideDirection("right");
      setProgressbarWidth(33.3);
      setIsStepOne(false);
      setIsStepTwo(true);
      setIsStepThree(false);
      setIsStepFour(false);
      setIsStepFive(false);
      setIsStepSix(false);
    } else if (isStepTwo) {
      //   if (
      //     !dateOfBirth ||
      //     !address ||
      //     // !citySelected ||
      //     !state ||
      //     !maritalStatus ||
      //     !bvn ||
      //     !nin ||
      //     !vendorLicense
      //   ) {
      //     toast.error("Please fill in the missing fields");
      //     return;
      //   }
      setSlideDirection("right");
      setProgressbarWidth(66.6);
      setIsStepOne(false);
      setIsStepTwo(false);
      setIsStepThree(true);
      setIsStepFour(false);
      setIsStepFive(false);
      setIsStepSix(false);
    } else if (isStepThree) {
      //   if (!carType || !carName || !carModel || !carYear) {
      //     toast.error("Please fill in the missing fields");
      //     return;
      //   }

      setSlideDirection("right");
      setProgressbarWidth(100);
      setIsStepOne(false);
      setIsStepTwo(false);
      setIsStepThree(false);
      setIsStepFour(true);
      setIsStepFive(false);
      setIsStepSix(false);
    } else if (isStepFour) {
      //   if (
      //     !emergencyFirstName ||
      //     !emergencyLastName ||
      //     !emergencyAddress ||
      //     !emergencyMobile ||
      //     !emergencyRelationship
      //   ) {
      //     toast.error("Please fill in the missing fields");
      //     return;
      //   }
      setSlideDirection("right");
      setProgressbarWidth(100);
      setIsStepOne(false);
      setIsStepTwo(false);
      setIsStepThree(false);
      setIsStepFour(false);
      setIsStepFive(true);
      setIsStepSix(false);
    }
  }
  // GO BACK button handler
  function handlePrev() {
    if (isStepTwo) {
      setSlideDirection("left");
      setProgressbarWidth(0);
      setIsStepOne(true);
      setIsStepTwo(false);
      setIsStepThree(false);
      setIsStepFour(false);
    } else if (isStepThree) {
      setSlideDirection("left");
      setProgressbarWidth(33.3);
      setIsStepOne(false);
      setIsStepTwo(true);
      setIsStepThree(false);
      setIsStepFour(false);
    } else if (isStepFour) {
      setSlideDirection("left");
      setProgressbarWidth(66.6);
      setIsStepOne(false);
      setIsStepTwo(false);
      setIsStepThree(true);
      setIsStepFour(false);
    }
  }

  // Form Fields
  // STEP 1
  const [companyName, setCompanyName] = useState();
  const [companyEmail, setCompanyEmail] = useState();
  const [address, setAddress] = useState();
  const [citySelected, setCitySelected] = useState();
  const [country, setCountry] = useState();
  const [operatingCities, setOperatingCities] = useState();
  const [fleetSize, setFleetSize] = useState();
  const [fleetType, setFleetType] = useState();
  const [openingHours, setOpeningHours] = useState();
  const [closingHours, setClosingHours] = useState();
  const [isOpen24Hours, setIsOpen24Hours] = useState(false);

  // Object to pass to prop
  const stepOneStates = {
    companyName,
    setCompanyName,
    companyEmail,
    setCompanyEmail,
    citySelected,
    setCitySelected,
    companyEmail,
    setCompanyEmail,
    country,
    setCountry,
    address,
    setAddress,
    operatingCities,
    setOperatingCities,
    openingHours,
    setOpeningHours,
    closingHours,
    setClosingHours,
    isOpen24Hours,
    setIsOpen24Hours,
    fleetSize,
    setFleetSize,
    fleetType,
    setFleetType,
  };

  // STEP 2
  const [contactName, setContactName] = useState();
  const [contactEmail, setContactEmail] = useState();
  const [contactMobile, setContactMobile] = useState();
  const [bank, setBank] = useState();
  const [accountNumber, setAccountNumber] = useState();
  const [accountName, setAccountName] = useState();

  // Object to pass to prop
  const stepTwoStates = {
    contactName,
    setContactName,
    contactEmail,
    setContactEmail,
    contactMobile,
    setContactMobile,
    bank,
    setBank,
    accountNumber,
    setAccountNumber,
    accountName,
    setAccountName,
  };

  // STEP 3
  const [password, setPassword] = useState();
  // Object to pass to prop
  const stepThreeStates = {
    password,
    setPassword,
  };

  // STEP 4
  const [otp, setOtp] = useState();
  // Object to pass to prop
  const stepFourStates = {
    otp,
    setOtp,
  };

  // Hande Signup Vendor
  const { isLoading, hasSignedUp, hasVerifiedPhone, vendor } = useSelector(
    (store) => store.vendor
  );
  const dispatch = useDispatch();
  async function handleSignupVendor() {
    // Format operatingCities
    let formattedOperatingCities = [];
    operatingCities?.forEach((operatingCity) => {
      formattedOperatingCities.push(operatingCity?.value);
    });

    // Format fleetType
    let formattedFleetType = [];
    fleetType?.forEach((fleetType) => {
      formattedFleetType.push(fleetType?.value);
    });

    const values = {
      companyName,
      openingHours,
      isOpen24Hours,
      closingHours,
      companyEmail,
      address,
      city: citySelected,
      country,
      operatingCities: formattedOperatingCities,
      fleetType: formattedFleetType,
      fleetSize: fleetSize?.value,
      password,
      contactName,
      contactEmail,
      contactMobile,
      bank,
      accountName,
      accountNumber,
    };

    dispatch(signupVendor({ values: { ...values } }));
  }

  useEffect(() => {
    if (hasSignedUp) {
      setIsStepSeven(false);
      setIsStepSix(false);
      setIsStepFive(false);
      setIsStepFour(true);
      setIsStepThree(false);
      setIsStepTwo(false);
      setIsStepOne(false);
    }
  }, [hasSignedUp]);

  const navigator = useNavigate();
  useEffect(() => {
    if (hasVerifiedPhone && !props?.isUpdateVendorAccount) {
      setTimeout(() => {
        navigator("/vendor/dashboard");
      }, 1000);
      dispatch(resetHasVerifiedPhone());
    }
  }, [hasVerifiedPhone]);

  // PRE-FILL ALL THE FORM FIELDS IF IT'S THE DRIVER UPDATE VARIATION
  useEffect(() => {
    if (props?.isUpdateVendorAccount) {
      console.log("OH:", vendor?.openingHours);
      console.log("CH:", vendor?.closingHours);
      // PRE-FILL ALL COMPANY INFORMATON DETALS
      setCompanyName(vendor?.companyName);
      setCompanyEmail(vendor?.companyEmail);

      setIsOpen24Hours(vendor?.isOpen24Hours);
      if (vendor?.isOpen24Hours === true) {
        const formattedOpeningHours = moment(vendor?.openingHours).toDate();
        setOpeningHours(formattedOpeningHours);
      } else {
        const formattedOpeningHours = moment(vendor?.openingHours).toDate();
        const formattedClosingHours = moment(vendor?.closingHours).toDate();
        setOpeningHours(formattedOpeningHours);
        setClosingHours(formattedClosingHours);
      }
      setCitySelected(vendor?.city);
      setCompanyEmail(vendor?.companyEmail);
      setBank(vendor?.bank);
      setAccountName(vendor?.accountName);
      setAccountNumber(vendor?.accountNumber);
      setAddress(vendor?.address);
      setCountry(vendor?.country);

      let formattedOperatingCities = [];

      vendor?.operatingCities?.forEach((operatingCity) => {
        formattedOperatingCities?.push({
          value: operatingCity,
          label: operatingCity,
        });
      });
      setOperatingCities(formattedOperatingCities);
      setFleetSize({
        value: vendor?.fleetSize,
        label: vendor?.fleetSize,
      });
      // Loop through fleetType
      let formattedFleetType = [];
      vendor?.fleetType?.forEach((fleetType) => {
        formattedFleetType?.push({
          value: fleetType,
          label: fleetType,
        });
      });
      setFleetType(formattedFleetType);

      // PRE-FILL ALL CONTACT INFORMATION DETAILS
      setContactName(vendor?.contactName);
      setContactEmail(vendor?.contactEmail);
      setContactMobile(vendor?.contactMobile);
    }
  }, [vendor]);

  // VERIFY OTP
  async function handleVerifyOTP() {
    dispatch(
      verifyOTP({
        vendor: vendor,
        code: otp,
      })
    );
  }

  return (
    <div className="">
      <ToastContainer />
      {/* Progress bar */}
      {!isStepFour && !props?.isUpdateVendorAccount && (
        <div className="lg:w-[50vw] w-full bg-gray-300 h-1 fixed top-0 z-[95]">
          <div
            className={`w-[${progressbarWidth}%] transition-all bg-shuttlelanePurple h-full`}
            style={{ width: `${progressbarWidth}%` }} // Fallback if the tailwind width class does not work (most likely)
          ></div>
        </div>
      )}

      {props?.isUpdateVendorAccount ? (
        <div>
          {props?.isCompanyInformation && (
            <VendorSignupStepOne
              isStepOne={isStepOne}
              stepOneStates={stepOneStates}
              isUpdateVendorAccount={props?.isUpdateVendorAccount}
            />
          )}
          {props?.isContactDetails && (
            <VendorSignupStepTwo
              isStepTwo={isStepTwo}
              stepTwoStates={stepTwoStates}
              isUpdateVendorAccount={props?.isUpdateVendorAccount}
            />
          )}
        </div>
      ) : (
        <div>
          {isStepOne && (
            <Slide direction={`${slideDirection}`} duration={500}>
              <VendorSignupStepOne
                isStepOne={isStepOne}
                stepOneStates={stepOneStates}
                isUpdateVendorAccount={props?.isUpdateVendorAccount}
              />
            </Slide>
          )}
          {isStepTwo && (
            <Slide direction={`${slideDirection}`} duration={500}>
              <VendorSignupStepTwo
                isStepTwo={isStepTwo}
                stepTwoStates={stepTwoStates}
                isUpdateVendorAccount={props?.isUpdateVendorAccount}
              />
            </Slide>
          )}
          {isStepThree && (
            <Slide direction={`${slideDirection}`} duration={500}>
              <VendorSignupStepThree
                isStepThree={isStepThree}
                stepThreeStates={stepThreeStates}
                isUpdateVendorAccount={props?.isUpdateVendorAccount}
              />
            </Slide>
          )}
          {isStepFour && (
            <Slide direction={`${slideDirection}`} duration={500}>
              <VendorSignupStepFour
                isStepFour={isStepFour}
                stepFourStates={stepFourStates}
                isUpdateVendorAccount={props?.isUpdateVendorAccount}
                setIsCompanyInformation={props?.setIsCompanyInformation}
                isContactDetails={props?.isContactDetails}
              />
            </Slide>
          )}
        </div>
      )}
      {/* Control buttons */}
      {!props?.isUpdateVendorAccount && (
        <div className="lg:pl-[50%] fixed bottom-0 left-0 w-full">
          <div className="w-full flex justify-between items-center bg-shuttlelaneLightPurple h-20 p-7 lg:px-10">
            <button
              onClick={() => handlePrev()}
              disabled={isStepOne || isStepFour}
              className="disabled:text-gray-400 flex gap-x-2 items-center text-shuttlelaneBlack"
            >
              <AiOutlineArrowLeft size={16} className="" />
              <span className="">Go back</span>
            </button>
            {!isStepThree && !isStepFour && (
              <button
                onClick={() => handleNext()}
                disabled={isStepFour}
                className="flex gap-x-2 disabled:bg-shuttlelaneLightPurple disabled:text-gray-400 items-center bg-shuttlelanePurple text-white w-32 h-10 rounded-lg p-3 justify-center hover:bg-transparent hover:text-shuttlelaneBlack hover:border-[.5px] hover:border-shuttlelaneBlack transition-all"
              >
                <span className="">Next</span>
              </button>
            )}
            {isStepThree && (
              <button
                onClick={() => handleSignupVendor()}
                className="flex gap-x-2 items-center bg-shuttlelanePurple text-white w-32 h-10 rounded-lg p-3 justify-center hover:bg-transparent hover:text-shuttlelaneBlack hover:border-[.5px] hover:border-shuttlelaneBlack transition-all"
              >
                {isLoading ? (
                  <ImSpinner2 size={18} className="animate-spin" />
                ) : (
                  <span className="">Finish</span>
                )}
              </button>
            )}
            {isStepFour && (
              <button
                onClick={() => handleVerifyOTP()}
                className="flex gap-x-2 items-center bg-shuttlelanePurple text-white w-32 h-10 rounded-lg p-3 justify-center hover:bg-transparent hover:text-shuttlelaneBlack hover:border-[.5px] hover:border-shuttlelaneBlack transition-all"
              >
                {isLoading ? (
                  <ImSpinner2 size={18} className="animate-spin" />
                ) : (
                  <span className="">Veirfy</span>
                )}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default VendorSignupForm;
