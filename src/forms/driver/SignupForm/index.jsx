// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import DriverSignupStepOne from "./DriverSignupStepOne";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Slide } from "react-awesome-reveal";
import DriverSignupStepTwo from "./DriverSignupStepTwo";
import DriverSignupStepThree from "./DriverSignupStepThree";
import DriverSignupStepFour from "./DriverSignupStepFour";
import DriverSignupStepFive from "./DriverSignupStepFive";
import DriverSignupStepSix from "./DriverSignupStepSix";
import DriverSignupStepSeven from "./DriverSignupStepSeven";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  resendOTP,
  resetHasVerifiedPhone,
  signupDriver,
  verifyOTP,
} from "../../../redux/slices/driverSlice";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";

function DriverSignupForm(props) {
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
        !firstName ||
        !middleName ||
        !lastName ||
        !email ||
        !gender ||
        !mobile ||
        !alternateMobile ||
        !education
      ) {
        toast.error("Please fill in the missing fields");
        return;
      }

      setSlideDirection("right");
      setProgressbarWidth(20);
      setIsStepOne(false);
      setIsStepTwo(true);
      setIsStepThree(false);
      setIsStepFour(false);
      setIsStepFive(false);
      setIsStepSix(false);
    } else if (isStepTwo) {
      if (
        !dateOfBirth ||
        !address ||
        // !city ||
        !state ||
        !maritalStatus ||
        !bvn ||
        !nin ||
        !driverLicense
      ) {
        toast.error("Please fill in the missing fields");
        return;
      }
      setSlideDirection("right");
      setProgressbarWidth(40);
      setIsStepOne(false);
      setIsStepTwo(false);
      setIsStepThree(true);
      setIsStepFour(false);
      setIsStepFive(false);
      setIsStepSix(false);
    } else if (isStepThree) {
      if (!carType || !carName || !carModel || !carYear) {
        toast.error("Please fill in the missing fields");
        return;
      }

      setSlideDirection("right");
      setProgressbarWidth(60);
      setIsStepOne(false);
      setIsStepTwo(false);
      setIsStepThree(false);
      setIsStepFour(true);
      setIsStepFive(false);
      setIsStepSix(false);
    } else if (isStepFour) {
      if (
        !emergencyFirstName ||
        !emergencyLastName ||
        !emergencyAddress ||
        !emergencyMobile ||
        !emergencyRelationship
      ) {
        toast.error("Please fill in the missing fields");
        return;
      }
      setSlideDirection("right");
      setProgressbarWidth(80);
      setIsStepOne(false);
      setIsStepTwo(false);
      setIsStepThree(false);
      setIsStepFour(false);
      setIsStepFive(true);
      setIsStepSix(false);
    } else if (isStepFive) {
      if (!isDrivingForHailingPlatforms) {
        toast.error("Please select YES or NO");
        return;
      }

      setSlideDirection("right");
      setProgressbarWidth(100);
      setIsStepOne(false);
      setIsStepTwo(false);
      setIsStepThree(false);
      setIsStepFour(false);
      setIsStepFive(false);
      setIsStepSix(true);
    } else if (isStepSix) {
      setSlideDirection("right");
      setProgressbarWidth(100);
      setIsStepOne(false);
      setIsStepTwo(false);
      setIsStepThree(false);
      setIsStepFour(false);
      setIsStepFive(false);
      setIsStepSix(false);
      setIsStepSeven(true);
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
      setIsStepFive(false);
      setIsStepSix(false);
    } else if (isStepThree) {
      setSlideDirection("left");
      setProgressbarWidth(20);
      setIsStepOne(false);
      setIsStepTwo(true);
      setIsStepThree(false);
      setIsStepFour(false);
      setIsStepFive(false);
      setIsStepSix(false);
    } else if (isStepFour) {
      setSlideDirection("left");
      setProgressbarWidth(40);
      setIsStepOne(false);
      setIsStepTwo(false);
      setIsStepThree(true);
      setIsStepFour(false);
      setIsStepFive(false);
      setIsStepSix(false);
    } else if (isStepFive) {
      setSlideDirection("left");
      setProgressbarWidth(60);
      setIsStepOne(false);
      setIsStepTwo(false);
      setIsStepThree(false);
      setIsStepFour(true);
      setIsStepFive(false);
      setIsStepSix(false);
    } else if (isStepSix) {
      setSlideDirection("left");
      setProgressbarWidth(80);
      setIsStepOne(false);
      setIsStepTwo(false);
      setIsStepThree(false);
      setIsStepFour(false);
      setIsStepFive(true);
      setIsStepSix(false);
    }
  }

  // Form Fields
  // STEP 1
  const [image, setImage] = useState();
  const [firstName, setFirstName] = useState();
  const [middleName, setMiddleName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [gender, setGender] = useState();
  const [mobile, setMobile] = useState();
  const [alternateMobile, setAlternateMobile] = useState();
  const [education, setEducation] = useState();

  // Object to pass to prop
  const stepOneStates = {
    image,
    setImage,
    firstName,
    setFirstName,
    middleName,
    setMiddleName,
    lastName,
    setLastName,
    email,
    setEmail,
    gender,
    setGender,
    mobile,
    setMobile,
    alternateMobile,
    setAlternateMobile,
    education,
    setEducation,
  };

  // STEP 2
  const [dateOfBirth, setDateOfBirth] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [maritalStatus, setMaritalStatus] = useState();
  const [bvn, setBvn] = useState();
  const [nin, setNin] = useState();
  const [bank, setBank] = useState();
  const [accountNumber, setAccountNumber] = useState();
  const [accountName, setAccountName] = useState();
  const [driverLicense, setDriverLicense] = useState();

  // Object to pass to prop
  const stepTwoStates = {
    dateOfBirth,
    setDateOfBirth,
    address,
    setAddress,
    city,
    setCity,
    state,
    setState,
    maritalStatus,
    setMaritalStatus,
    bvn,
    setBvn,
    nin,
    setNin,
    bank,
    setBank,
    accountNumber,
    setAccountNumber,
    accountName,
    setAccountName,
    driverLicense,
    setDriverLicense,
  };

  // STEP 3
  const [carType, setCarType] = useState();
  const [carName, setCarName] = useState();
  const [carModel, setCarModel] = useState();
  const [carYear, setCarYear] = useState();
  const [carColor, setCarColor] = useState();
  const [carPlateNumber, setCarPlateNumber] = useState();

  // Object to pass to prop
  const stepThreeStates = {
    carType,
    setCarType,
    carName,
    setCarName,
    carModel,
    setCarModel,
    carYear,
    setCarYear,
    carColor,
    setCarColor,
    carPlateNumber,
    setCarPlateNumber,
  };

  // STEP 4
  const [emergencyFirstName, setEmergencyFirstName] = useState();
  const [emergencyLastName, setEmergencyLastName] = useState();
  const [emergencyAddress, setEmergencyAddress] = useState();
  const [emergencyMobile, setEmergencyMobile] = useState();
  const [emergencyRelationship, setEmergencyRelationship] = useState({});

  // Object to pass to prop
  const stepFourStates = {
    emergencyFirstName,
    setEmergencyFirstName,
    emergencyLastName,
    setEmergencyLastName,
    emergencyAddress,
    setEmergencyAddress,
    emergencyMobile,
    setEmergencyMobile,
    emergencyRelationship,
    setEmergencyRelationship,
  };

  // STEP 5
  const [isDrivingForHailingPlatforms, setIsDrivingForHailingPlatforms] =
    useState();
  const [otherHailingPlatforms, setOtherHailingPlatforms] = useState();

  // Object to pass to prop
  const stepFiveStates = {
    isDrivingForHailingPlatforms,
    setIsDrivingForHailingPlatforms,
    otherHailingPlatforms,
    setOtherHailingPlatforms,
  };

  // STEP 6
  const [password, setPassword] = useState();
  // Object to pass to prop
  const stepSixStates = {
    password,
    setPassword,
  };

  // STEP 7
  const [otp, setOtp] = useState();
  // Object to pass to prop
  const stepSevenStates = {
    otp,
    setOtp,
  };

  // Hande Signup Driver
  const { isLoading, hasSignedUp, hasVerifiedPhone, driver } = useSelector(
    (store) => store.driver
  );
  const dispatch = useDispatch();
  async function handleSignupDriver() {
    const values = {
      image,
      firstName,
      middleName,
      lastName,
      email,
      gender: gender?.value,
      mobile,
      alternateMobile,
      education: education?.value,
      dateOfBirth,
      address,
      city,
      state,
      maritalStatus: maritalStatus?.value,
      bvn,
      nin,
      bank,
      accountNumber,
      accountName,
      driverLicense,
      carType: carType?.value,
      carName,
      carModel,
      carYear,
      carColor,
      carPlateNumber,
      emergencyFirstName,
      emergencyLastName,
      emergencyAddress,
      emergencyMobile,
      emergencyRelationship: emergencyRelationship?.value,
      isDrivingForHailingPlatforms: isDrivingForHailingPlatforms?.value,
      otherHailingPlatforms,
      password,
    };

    dispatch(signupDriver({ values: { ...values } }));
  }

  useEffect(() => {
    if (hasSignedUp) {
      setIsStepSeven(true);
      setIsStepSix(false);
      setIsStepFive(false);
      setIsStepFour(false);
      setIsStepThree(false);
      setIsStepTwo(false);
      setIsStepOne(false);
    }
  }, [hasSignedUp]);

  const navigator = useNavigate();
  useEffect(() => {
    if (hasVerifiedPhone && !props?.isUpdateDriverAccount) {
      setTimeout(() => {
        navigator("/driver/dashboard");
      }, 1000);
      dispatch(resetHasVerifiedPhone());
    }
  }, [hasVerifiedPhone]);

  // PRE-FILL ALL THE FORM FIELDS IF IT'S THE DRIVER UPDATE VARIATION
  useEffect(() => {
    if (props?.isUpdateDriverAccount) {
      // PRE-FILL ALL CONTACT INFORMATON DETALS
      setFirstName(driver?.firstName);
      setMiddleName(driver?.middleName);
      setLastName(driver?.lastName);
      setEmail(driver?.email);
      setGender({
        value: driver?.gender,
        label: driver?.gender,
      });
      setMobile(driver?.mobile);
      setAlternateMobile(driver?.alternateMobile);
      setEducation({
        value: driver?.education,
        label: driver?.education,
      });

      // PRE-FILL ALL PERSONAL INFORMATION DETAILS
      //   setDateOfBirth(driver?.dateOfBirth);
      setAddress(driver?.address);
      setCity(driver?.city);
      setState(driver?.state);
      setMaritalStatus({
        value: driver?.maritalStatus,
        label: driver?.maritalStatus,
      });
      setBvn(driver?.bvn);
      setNin(driver?.nin);
      setDriverLicense(driver?.driverLicense);

      // PRE-FILL ALL CAR DETAILS INFORMATION
      setCarType({
        value: driver?.carType,
        label: driver?.carType,
      });
      setCarName(driver?.carName);
      setCarModel(driver?.carModel);
      setCarYear(driver?.carYear);

      // PRE-FILL ALL EMERGENCY CONTACT DETAILS
      setEmergencyFirstName(driver?.emergencyFirstName);
      setEmergencyLastName(driver?.emergencyLastName);
      setEmergencyAddress(driver?.emergencyAddress);
      setEmergencyMobile(driver?.emergencyMobile);
      setEmergencyRelationship({
        value: driver?.emergencyRelationship,
        label: driver?.emergencyRelationship,
      });

      // PRE-FILL ADDITIONAL INFORMATION DETAILS
      setIsDrivingForHailingPlatforms({
        value: driver?.isDrivingForHailingPlatforms,
        label: driver?.isDrivingForHailingPlatforms == false ? "No" : "Yes",
      });
      setOtherHailingPlatforms(driver?.otherHailingPlatforms);
    }
  }, [driver]);

  // VERIFY OTP
  async function handleVerifyOTP() {
    dispatch(
      verifyOTP({
        driver: driver,
        code: otp,
      })
    );
  }

  return (
    <div className="">
      <ToastContainer />
      {/* Progress bar */}
      {!isStepSeven && !props?.isUpdateDriverAccount && (
        <div className="lg:w-[50vw] w-full bg-gray-300 h-1 fixed top-0 z-[95]">
          <div
            className={`w-[${progressbarWidth}%] transition-all bg-shuttlelaneGold h-full`}
            style={{ width: `${progressbarWidth}%` }} // Fallback if the tailwind width class does not work (most likely)
          ></div>
        </div>
      )}
      {/* isUpdateDriverAccount={true}
      isContactInformation={isContactInformation}
      isPersonalDetails={isPersonalDetails}
      carDetails={carDetails}
      isEmergencyContact={isEmergencyContact}
      isPhoneVerification={isPhoneVerification} */}
      {props?.isUpdateDriverAccount ? (
        <div>
          {props?.isContactInformation && (
            <DriverSignupStepOne
              isStepOne={isStepOne}
              stepOneStates={stepOneStates}
              isUpdateDriverAccount={props?.isUpdateDriverAccount}
            />
          )}
          {props?.isPersonalDetails && (
            <DriverSignupStepTwo
              isStepTwo={isStepTwo}
              stepTwoStates={stepTwoStates}
              isUpdateDriverAccount={props?.isUpdateDriverAccount}
            />
          )}
          {props?.carDetails && (
            <>
              {props?.isUpdateDriverAccount ? (
                <DriverSignupStepThree
                  isStepThree={isStepThree}
                  stepThreeStates={stepThreeStates}
                  isUpdateDriverAccount={props?.isUpdateDriverAccount}
                />
              ) : (
                <Slide direction={`${slideDirection}`} duration={500}>
                  <DriverSignupStepThree
                    isStepThree={isStepThree}
                    stepThreeStates={stepThreeStates}
                    isUpdateDriverAccount={props?.isUpdateDriverAccount}
                  />
                </Slide>
              )}
            </>
          )}
          {props?.isEmergencyContact && (
            <>
              {props?.isUpdateDriverAccount ? (
                <DriverSignupStepFour
                  isStepFour={isStepFour}
                  stepFourStates={stepFourStates}
                  isUpdateDriverAccount={props?.isUpdateDriverAccount}
                />
              ) : (
                <Slide direction={`${slideDirection}`} duration={500}>
                  <DriverSignupStepFour
                    isStepFour={isStepFour}
                    stepFourStates={stepFourStates}
                    isUpdateDriverAccount={props?.isUpdateDriverAccount}
                  />
                </Slide>
              )}
            </>
          )}
          {props?.isAdditionalDetails && (
            <DriverSignupStepFive
              isStepFive={isStepFive}
              stepFiveStates={stepFiveStates}
              isUpdateDriverAccount={props?.isUpdateDriverAccount}
            />
          )}
          {props?.isPhoneVerification && (
            <DriverSignupStepSeven
              isStepSeven={isStepSeven}
              stepSevenStates={stepSevenStates}
              isUpdateDriverAccount={props?.isUpdateDriverAccount}
              setIsContactInformation={props?.setIsContactInformation}
              setIsPersonalDetails={props?.setIsPersonalDetails}
              setIsCarDetails={props?.setIsCarDetails}
              setIsEmergencyContact={props?.setIsEmergencyContact}
              setIsAdditionalDetails={props?.setIsAdditionalDetails}
              setIsPhoneVerification={props?.setIsPhoneVerification}
            />
          )}
        </div>
      ) : (
        <div>
          {isStepOne && (
            <Slide direction={`${slideDirection}`} duration={500}>
              <DriverSignupStepOne
                isStepOne={isStepOne}
                stepOneStates={stepOneStates}
                isUpdateDriverAccount={props?.isUpdateDriverAccount}
              />
            </Slide>
          )}
          {isStepTwo && (
            <Slide direction={`${slideDirection}`} duration={500}>
              <DriverSignupStepTwo
                isStepTwo={isStepTwo}
                stepTwoStates={stepTwoStates}
                isUpdateDriverAccount={props?.isUpdateDriverAccount}
              />
            </Slide>
          )}
          {isStepThree && (
            <Slide direction={`${slideDirection}`} duration={500}>
              <DriverSignupStepThree
                isStepThree={isStepThree}
                stepThreeStates={stepThreeStates}
                isUpdateDriverAccount={props?.isUpdateDriverAccount}
              />
            </Slide>
          )}
          {isStepFour && (
            <Slide direction={`${slideDirection}`} duration={500}>
              <DriverSignupStepFour
                isStepFour={isStepFour}
                stepFourStates={stepFourStates}
                isUpdateDriverAccount={props?.isUpdateDriverAccount}
              />
            </Slide>
          )}
          {isStepFive && (
            <Slide direction={`${slideDirection}`} duration={500}>
              <DriverSignupStepFive
                isStepFive={isStepFive}
                stepFiveStates={stepFiveStates}
                isUpdateDriverAccount={props?.isUpdateDriverAccount}
              />
            </Slide>
          )}
          {isStepSix && (
            <Slide direction={`${slideDirection}`} duration={500}>
              <DriverSignupStepSix
                isStepSix={isStepSix}
                stepSixStates={stepSixStates}
                isUpdateDriverAccount={props?.isUpdateDriverAccount}
              />
            </Slide>
          )}
          {isStepSeven && (
            <Slide direction={`${slideDirection}`} duration={500}>
              <DriverSignupStepSeven
                isStepSeven={isStepSeven}
                stepSevenStates={stepSevenStates}
                isUpdateDriverAccount={props?.isUpdateDriverAccount}
              />
            </Slide>
          )}
        </div>
      )}
      {/* Control buttons */}
      {!props?.isUpdateDriverAccount && (
        <div className="lg:pl-[50%] fixed bottom-0 left-0 w-full">
          <div className="w-full flex justify-between items-center bg-shuttlelaneLightPurple h-20 p-7 lg:px-10">
            <button
              onClick={() => handlePrev()}
              disabled={isStepOne}
              className="disabled:text-gray-400 flex gap-x-2 items-center text-shuttlelaneBlack"
            >
              <AiOutlineArrowLeft size={16} className="" />
              <span className="">Go back</span>
            </button>
            {!isStepSeven && !isStepSix && (
              <button
                onClick={() => handleNext()}
                disabled={isStepSeven}
                className="flex gap-x-2 disabled:bg-shuttlelaneLightPurple disabled:text-gray-400 items-center bg-shuttlelaneGold text-white w-32 h-10 rounded-lg p-3 justify-center hover:bg-transparent hover:text-shuttlelaneBlack hover:border-[.5px] hover:border-shuttlelaneBlack transition-all"
              >
                <span className="">Next</span>
              </button>
            )}
            {isStepSix && (
              <button
                onClick={() => handleSignupDriver()}
                className="flex gap-x-2 items-center bg-shuttlelaneGold text-white w-32 h-10 rounded-lg p-3 justify-center hover:bg-transparent hover:text-shuttlelaneBlack hover:border-[.5px] hover:border-shuttlelaneBlack transition-all"
              >
                {isLoading ? (
                  <ImSpinner2 size={18} className="animate-spin" />
                ) : (
                  <span className="">Finish</span>
                )}
              </button>
            )}
            {isStepSeven && (
              <button
                onClick={() => handleVerifyOTP()}
                className="flex gap-x-2 items-center bg-shuttlelaneGold text-white w-32 h-10 rounded-lg p-3 justify-center hover:bg-transparent hover:text-shuttlelaneBlack hover:border-[.5px] hover:border-shuttlelaneBlack transition-all"
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

export default DriverSignupForm;
