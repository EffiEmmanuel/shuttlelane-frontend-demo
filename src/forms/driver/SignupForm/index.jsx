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
import { useDispatch, useSelector } from "react-redux";
import { signupDriver } from "../../../redux/slices/driverSlice";
import { ImSpinner2 } from "react-icons/im";

function DriverSignupForm() {
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
        !city ||
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
    driverLicense,
    setDriverLicense,
  };

  // STEP 3
  const [carType, setCarType] = useState();
  const [carName, setCarName] = useState();
  const [carModel, setCarModel] = useState();
  const [carYear, setCarYear] = useState();

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
  };

  // STEP 4
  const [emergencyFirstName, setEmergencyFirstName] = useState();
  const [emergencyLastName, setEmergencyLastName] = useState();
  const [emergencyAddress, setEmergencyAddress] = useState();
  const [emergencyMobile, setEmergencyMobile] = useState();
  const [emergencyRelationship, setEmergencyRelationship] = useState();

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

  // Hande Signup Driver
  const { isLoading } = useSelector((store) => store.driver);
  const dispatch = useDispatch();
  async function handleSignupDriver() {
    const values = {
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
      driverLicense,
      carType: carType?.value,
      carName,
      carModel,
      carYear,
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

  return (
    <div className="">
      <ToastContainer />
      {/* Progress bar */}
      {!isStepSeven && (
        <div className="lg:w-[50vw] w-full bg-gray-300 h-1 fixed top-0 z-[95]">
          <div
            className={`w-[${progressbarWidth}%] transition-all bg-shuttlelaneGold h-full`}
            style={{ width: `${progressbarWidth}%` }} // Fallback if the tailwind width class does not work (most likely)
          ></div>
        </div>
      )}

      <div>
        {isStepOne && (
          <Slide direction={`${slideDirection}`} duration={500}>
            <DriverSignupStepOne
              isStepOne={isStepOne}
              stepOneStates={stepOneStates}
            />
          </Slide>
        )}
        {isStepTwo && (
          <Slide direction={`${slideDirection}`} duration={500}>
            <DriverSignupStepTwo
              isStepTwo={isStepTwo}
              stepTwoStates={stepTwoStates}
            />
          </Slide>
        )}
        {isStepThree && (
          <Slide direction={`${slideDirection}`} duration={500}>
            <DriverSignupStepThree
              isStepThree={isStepThree}
              stepThreeStates={stepThreeStates}
            />
          </Slide>
        )}
        {isStepFour && (
          <Slide direction={`${slideDirection}`} duration={500}>
            <DriverSignupStepFour
              isStepFour={isStepFour}
              stepFourStates={stepFourStates}
            />
          </Slide>
        )}
        {isStepFive && (
          <Slide direction={`${slideDirection}`} duration={500}>
            <DriverSignupStepFive
              isStepFive={isStepFive}
              stepFiveStates={stepFiveStates}
            />
          </Slide>
        )}
        {isStepSix && (
          <Slide direction={`${slideDirection}`} duration={500}>
            <DriverSignupStepSix
              isStepSix={isStepSix}
              stepSixStates={stepSixStates}
            />
          </Slide>
        )}
        {isStepSeven && (
          <Slide direction={`${slideDirection}`} duration={500}>
            <DriverSignupStepSeven isStepSeven={isStepSeven} />
          </Slide>
        )}
      </div>

      {/* Control buttons */}
      <div className="lg:pl-[50%] fixed bottom-0 left-0 w-full z-[30]">
        <div className="w-full flex justify-between items-center bg-shuttlelaneLightPurple h-20 p-7 lg:px-10">
          <button
            onClick={() => handlePrev()}
            disabled={isStepOne || isStepSeven}
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
              onClick={() => handleNext()}
              className="flex gap-x-2 items-center bg-shuttlelaneGold text-white w-32 h-10 rounded-lg p-3 justify-center hover:bg-transparent hover:text-shuttlelaneBlack hover:border-[.5px] hover:border-shuttlelaneBlack transition-all"
            >
              <span className="">Verify</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DriverSignupForm;
