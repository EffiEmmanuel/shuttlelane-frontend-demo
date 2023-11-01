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
      setSlideDirection("right");
      setProgressbarWidth(20);
      setIsStepOne(false);
      setIsStepTwo(true);
      setIsStepThree(false);
      setIsStepFour(false);
      setIsStepFive(false);
      setIsStepSix(false);
    } else if (isStepTwo) {
      setSlideDirection("right");
      setProgressbarWidth(40);
      setIsStepOne(false);
      setIsStepTwo(false);
      setIsStepThree(true);
      setIsStepFour(false);
      setIsStepFive(false);
      setIsStepSix(false);
    } else if (isStepThree) {
      setSlideDirection("right");
      setProgressbarWidth(60);
      setIsStepOne(false);
      setIsStepTwo(false);
      setIsStepThree(false);
      setIsStepFour(true);
      setIsStepFive(false);
      setIsStepSix(false);
    } else if (isStepFour) {
      setSlideDirection("right");
      setProgressbarWidth(80);
      setIsStepOne(false);
      setIsStepTwo(false);
      setIsStepThree(false);
      setIsStepFour(false);
      setIsStepFive(true);
      setIsStepSix(false);
    } else if (isStepFive) {
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

  return (
    <div className="">
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
            <DriverSignupStepOne isStepOne={isStepOne} />
          </Slide>
        )}
        {isStepTwo && (
          <Slide direction={`${slideDirection}`} duration={500}>
            <DriverSignupStepTwo isStepTwo={isStepTwo} />
          </Slide>
        )}
        {isStepThree && (
          <Slide direction={`${slideDirection}`} duration={500}>
            <DriverSignupStepThree isStepThree={isStepThree} />
          </Slide>
        )}
        {isStepFour && (
          <Slide direction={`${slideDirection}`} duration={500}>
            <DriverSignupStepFour isStepFour={isStepFour} />
          </Slide>
        )}
        {isStepFive && (
          <Slide direction={`${slideDirection}`} duration={500}>
            <DriverSignupStepFive isStepFive={isStepFive} />
          </Slide>
        )}
        {isStepSix && (
          <Slide direction={`${slideDirection}`} duration={500}>
            <DriverSignupStepSix isStepSix={isStepSix} />
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
              onClick={() => handleNext()}
              className="flex gap-x-2 items-center bg-shuttlelaneGold text-white w-32 h-10 rounded-lg p-3 justify-center hover:bg-transparent hover:text-shuttlelaneBlack hover:border-[.5px] hover:border-shuttlelaneBlack transition-all"
            >
              <span className="">Finish</span>
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
