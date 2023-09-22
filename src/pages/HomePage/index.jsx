import React from "react";
import NavBar from "../../components/ui/NavBar";
import Typewriter from "typewriter-effect";
import {
  MdArrowRightAlt,
  MdOutlineLuggage,
  MdOutlineModeOfTravel,
} from "react-icons/md";
import {
  BsAirplane,
  BsCreditCardFill,
  BsFillBookmarksFill,
  BsHourglassSplit,
  BsShieldFillCheck,
  BsStarFill,
} from "react-icons/bs";
import { IoCarSportOutline } from "react-icons/io5";
import { FiChevronDown } from "react-icons/fi";
import { AiOutlineArrowDown } from "react-icons/ai";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import AirportTransferForm from "../../forms/HomePage/AirportTransferForm";
import CarRentalForm from "../../forms/HomePage/CarRentalForm";
import PriorityPassForm from "../../forms/HomePage/PriorityPassForm";
import CustomerReviews from "../../components/ui/CustomerReviews";

// Images
import circleAsset from "../../assets/images/circle-asset.svg";
import arrowAsset from "../../assets/images/arrow-asset.svg";
import FleetSlide from "../../components/ui/FleetSlide";
import google from "../../assets/logos/google.svg";
import tripAdvisor from "../../assets/logos/tripAdvisor.svg";
import trustpilot from "../../assets/logos/trustpilot.svg";
import paypal from "../../assets/logos/paypal.svg";
import stripe from "../../assets/logos/stripe.svg";
import flutterwave from "../../assets/logos/flutterwave.png";
import appstoreDownload from "../../assets/logos/downloadAppstore.svg";
import playstoreDownload from "../../assets/logos/downloadPlaystore.svg";
// import appstore from "../../assets/logos/appstore.svg";
import googlePlay from "../../assets/logos/googlePlay.svg";
import Footer from "../../components/ui/Footer";
import { toast } from "react-toastify";
import doodleBg from "../../assets/images/doodle.svg";

function HomePage() {
  // SERVICE STATES
  const [isAirportTransfer, setIsAirportTransfer] = useState(true); // It is Airport Transfer by default
  const [isCarRental, setIsCarRental] = useState(false);
  const [isPriorityPass, setIsPriorityPass] = useState(false);
  const [isVisaOnArrival, setIsVisaOnArrival] = useState(false);

  // TOGGLE SERVICE STATE
  function toggleService(service) {
    switch (service) {
      case "airport":
        setIsAirportTransfer(true);
        setIsCarRental(false);
        setIsPriorityPass(false);
        setIsVisaOnArrival(false);
        break;

      case "carRental":
        setIsAirportTransfer(false);
        setIsCarRental(true);
        setIsPriorityPass(false);
        setIsVisaOnArrival(false);
        break;

      case "priorityPass":
        setIsAirportTransfer(false);
        setIsCarRental(false);
        setIsPriorityPass(true);
        setIsVisaOnArrival(false);
        break;

      case "visaOnArrival":
        setIsAirportTransfer(false);
        setIsCarRental(false);
        setIsPriorityPass(false);
        setIsVisaOnArrival(true);
        break;

      default:
        setIsAirportTransfer(true);
        setIsCarRental(false);
        setIsPriorityPass(false);
        setIsVisaOnArrival(false);
        break;
    }
  }

  return (
    <div className="relative">
      <div className="fixed w-full z-20">
        <NavBar />
      </div>
      {/* Hero Section */}
      <div className="min-h-screen heroBg relative text-white pt-36 pb-52 lg:pb-10 lg:px-24 px-7">
        <div className="h-full w-full">
          {/* HEADLINE */}
          <div className="">
            <h1 className="text-[2rem] font-bold text-center gap-x-2 gap-y-2">
              Are you looking for Airport Transfers?
            </h1>

            <p className="text-center text-[1.3rem]">
              Schedule your next booking with us
            </p>
          </div>

          {/* SERVICE OPTIONS */}
          <div className="lg:h-14 mt-10 h-auto gap-y-3 w-full flex flex-wrap justify-center items-center lg:items-center lg:justify-center py-2 gap-x-4 px-4 relative rounded-2xl">
            <button
              onClick={() => toggleService("airport")}
              className={`flex  items-center gap-x-[5px] h-[30px] min-w-[60px] px-5 rounded-full ${
                isAirportTransfer
                  ? "text-shuttlelanePurple bg-white border-shuttlelaneBlack"
                  : "text-white bg-transparent border-white"
              } transition-all border-dashed border-[.5px]`}
            >
              <BsAirplane size={16} />
              <p className="text-sm">Airport</p>
            </button>
            <button
              onClick={() => toggleService("carRental")}
              className={`flex items-center gap-x-[5px] h-[30px] min-w-[60px] px-5 rounded-full ${
                isCarRental
                  ? "text-shuttlelanePurple bg-white border-shuttlelaneBlack"
                  : "text-white bg-transparent border-white"
              } transition-all border-dashed border-[1.5px] lg:border-[.5px]`}
            >
              <IoCarSportOutline size={18} />
              <p className="text-sm">Car Rental</p>
            </button>
            <button
              onClick={() => toggleService("priorityPass")}
              className={`flex items-center gap-x-[5px] h-[30px] min-w-[60px] px-5 rounded-full ${
                isPriorityPass
                  ? "text-shuttlelanePurple bg-white border-shuttlelaneBlack"
                  : "text-white bg-transparent border-white"
              } transition-all border-dashed border-[.5px]`}
            >
              <MdOutlineLuggage size={18} />
              <p className="text-sm">Priority Pass</p>
            </button>
            <button
              //   onClick={() => toggleService("visaOnArrival")}
              onClick={() => {
                toast.info("This service is under construction");
              }}
              className={`flex items-center gap-x-[5px] h-[30px] min-w-[60px] px-5 rounded-full ${
                isVisaOnArrival
                  ? "text-white bg-shuttlelanePurple border-white"
                  : "text-white bg-transparent border-white "
              } transition-all border-dashed border-[.5px]`}
            >
              <BsAirplane size={16} />
              <p className="text-sm">Visa On Arrival</p>
            </button>
          </div>

          {/* FORMS */}
          <div className="bg-white bg-opacity-60 w-full mt-14 h-auto transition-all p-7 rounded-xl">
            {isAirportTransfer && <AirportTransferForm />}
            {isCarRental && <CarRentalForm />}
            {isPriorityPass && <PriorityPassForm />}
          </div>

          {/* GO DOWN BUTTON */}
          <div className="flex justify-center">
            <div
              onClick={() => {}}
              className="animate-bounce cursor-pointer w-8 h-8 flex justify-center items-center rounded-full border-white border-[1px] mt-10"
            >
              <AiOutlineArrowDown size={16} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="">
        {/* How it works */}
        <div className="px-8 lg:px-24 lg:py-20 pb-0">
          {/* <Fade direction="up" duration={500}> */}
          <div className="w-full flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl text-boomRangBlack font-semibold mt-3 max-w-xl leading-[39px]">
              How it works
            </h2>
            <h4 className="text-sm">Booking with Shuttlelane is very easy</h4>
          </div>
          {/* </Fade> */}

          <div className="mt-20">
            <div className="flex justify-between gap-x-10 items-center flex-wrap gap-y-10">
              <div className="lg:max-w-[300px] h-[200px] flex flex-col items-center text-center gap-y-3">
                <div className="h-12 w-12 shadow-[#4540cf85] shadow-md flex items-center justify-center rounded-lg bg-shuttlelanePurple">
                  <BsFillBookmarksFill size={22} className="text-white" />
                </div>
                <h4 className="font-semibold text-shuttlelanePurple text-lg">
                  Make Booking
                </h4>

                <p className="text-sm">
                  Select from our available services and make a booking by
                  specifying your travel date, pickup location, destination, and
                  other required information
                </p>
              </div>

              {/* <img className="w-[100px] object-cover" src={stepsArrow} /> */}
              <div className="lg:max-w-[300px] h-[200px] flex flex-col gap-y-3 items-center text-center ">
                <div className="h-12 w-12 shadow-[#4540cf85] shadow-md flex items-center justify-center rounded-lg bg-shuttlelanePurple">
                  <BsCreditCardFill size={22} className="text-white" />
                </div>
                <h4 className="font-semibold text-shuttlelanePurple text-lg">
                  Pay
                </h4>

                <p className="text-sm">
                  Confirm your booking by securely making instant online
                  payment, either using a credit or debit card.
                </p>
              </div>

              {/* <img className="w-[100px] object-cover" src={stepsArrow} /> */}
              <div className="lg:max-w-[300px] h-[200px] flex flex-col gap-y-3 items-center text-center ">
                <div className="h-12 w-12 shadow-[#4540cf85] shadow-md flex items-center justify-center rounded-lg bg-shuttlelanePurple">
                  <MdOutlineModeOfTravel size={22} className="text-white" />
                </div>
                <h4 className="font-semibold text-shuttlelanePurple text-lg">
                  Travel
                </h4>

                <p className="text-sm">
                  Our driver will arrive on schedule for pickup at pickup
                  location and proceed to your destination
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Why choose us? */}
        <div className="px-8 lg:px-24 overflow-hidden text-white bg-shuttlelanePurple min-h-[70vh] py-20 relative">
          <div className="absolute overflow-hidden top-0 left-0 w-full h-full">
            <img src={arrowAsset} className="object-cover w-full h-full" />
          </div>

          <Fade direction="up" duration={800}>
            <div className="w-full flex flex-col items-center justify-center text-white text-center">
              <h2 className="text-3xl font-semibold mt-3 max-w-xl leading-[39px]">
                Why choose us?
              </h2>
              <h4 className="text-sm">
                We strive to provide quality service and great customer
                satisfaction
              </h4>
            </div>
          </Fade>

          <div className="mt-10">
            <div className="flex justify-between gap-x-10 items-center bg-white flex-wrap gap-y-10 px-10 py-16 rounded-lg">
              <Fade duration={800} delay={50}>
                <div className="lg:max-w-[300px] h-[200px] text-shuttlelaneBlack flex flex-col items-center text-center gap-y-3">
                  <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-shuttlelanePurple">
                    <BsHourglassSplit size={22} className="text-white" />
                  </div>
                  <h4 className="font-semibold text-shuttlelanePurple text-lg">
                    Always on time
                  </h4>

                  <p className="text-sm">
                    Punctuality is one of our strength. We strictly keep to
                    schedule as we don't want to keep our clients waiting.
                  </p>
                </div>
              </Fade>

              <Fade duration={800} delay={100}>
                {/* <img className="w-[100px] object-cover" src={stepsArrow} /> */}
                <div className="lg:max-w-[300px] h-[200px] text-shuttlelaneBlack flex flex-col items-center text-center gap-y-3">
                  <div className="h-12 w-12 shadow-[#4540cf85] shadow-md flex items-center justify-center rounded-lg bg-shuttlelanePurple">
                    <BsStarFill size={22} className="text-white" />
                  </div>
                  <h4 className="font-semibold text-shuttlelanePurple text-lg">
                    Great Value
                  </h4>

                  <p className="text-sm">
                    Despite the quality of the service we render to our clients,
                    our rates are one of the most affordable in the industry.
                  </p>
                </div>
              </Fade>

              <Fade duration={800} delay={150}>
                {/* <img className="w-[100px] object-cover" src={stepsArrow} /> */}
                <div className="lg:max-w-[300px] lg:h-[200px] text-shuttlelaneBlack flex flex-col items-center text-center gap-y-3">
                  <div className="h-12 w-12 shadow-[#4540cf85] shadow-md flex items-center justify-center rounded-lg bg-shuttlelanePurple">
                    <BsShieldFillCheck size={22} className="text-white" />
                  </div>
                  <h4 className="font-semibold text-shuttlelanePurple text-lg">
                    Secure and Reliable
                  </h4>

                  <p className="text-sm">
                    Our client's safety and satisfaction is our priority and as
                    such, we prioritize their security and comfort.
                  </p>
                </div>
              </Fade>
            </div>
          </div>
        </div>
        {/* Our fleet */}
        <div className="px-8 lg:px-24 py-32">
          <Fade direction="up" duration={800}>
            <div className="w-full flex flex-col items-center justify-center text-shuttlelaneBlack text-center">
              <h2 className="text-3xl font-semibold mt-3 max-w-xl leading-[39px]">
                Our Fleet
              </h2>
              <h4 className="text-sm">
                Shuttlelane offers a variety of service class you can choose
                from, depending on your needs.
              </h4>
            </div>
          </Fade>

          <div className="mt-28">
            <FleetSlide />
          </div>
        </div>
        {/* Testimonials */}
        <div className="px-8 lg:px-24 overflow-hidden text-white bg-shuttlelanePurple min-h-[90vh] pt-20 relative">
          <div className="absolute overflow-hidden top-0 left-0 w-full h-full">
            <img src={circleAsset} className="object-cover w-full h-full" />
          </div>

          <Fade direction="up" duration={800}>
            <div className="w-full flex flex-col items-center justify-center text-white text-center">
              <h2 className="text-3xl font-semibold mt-3 max-w-xl leading-[39px]">
                What our Clients are saying
              </h2>
              <h4 className="text-sm">
                Our clients are saying great things about us. Here are a few
              </h4>
            </div>
          </Fade>

          <div className="mt-10">
            <CustomerReviews />
            <div className="flex flex-row justify-center items-center gap-10">
              <img
                src={trustpilot}
                alt=""
                className="object-contain lg:w-[120px] w-[100px]"
              />
              <img
                src={google}
                alt=""
                className="object-contain lg:w-[35px] w-[25px]"
              />
              <img
                src={tripAdvisor}
                alt=""
                className="object-contain lg:w-[120px] w-[100px]"
              />
            </div>
          </div>
        </div>

        {/* Download */}
        <div className="px-8 py-10 lg:px-24 ">
          <div className="overflow-hidden text-shuttlelaneBlack py-10 relative">
            <Fade direction="up" duration={800}>
              <div className="w-full flex flex-col items-center justify-center text-shuttlelaneBlack text-center">
                <h2 className="text-3xl font-semibold mt-3 max-w-xl leading-[39px]">
                  Download the Shuttlelane Mobile App
                </h2>
                <h4 className="text-sm">
                  Available on both Google PlayStore and Apple AppStore
                </h4>
              </div>
            </Fade>

            <Fade duration={800}>
              <div className="flex flex-row justify-center mt-10 items-center gap-x-6">
                <img
                  src={appstoreDownload}
                  alt="Download the Shuttlelane mobile app on AppStore"
                  className="lg:w-[140px] w-[140px]"
                />
                <img
                  src={playstoreDownload}
                  alt="Download the Shuttlelane mobile app on PlayStore"
                  className="lg:w-[140px] w-[140px]"
                />
              </div>
            </Fade>
          </div>
        </div>

        <div className="mt-4 lg:px-24 px-7 bg-[#F7F6FF] flex lg:flex-row flex-col lg:items-center lg:justify-center gap-x-2">
          <Fade duration={800}>
            <div className="flex items-center justify-center lg:justify-normal gap-x-2 mt-10 lg:mt-0">
              <h4 className="text-sm font-semibold uppercase text-gray-500">
                OUR PAYMENT PARTNERS
              </h4>

              <MdArrowRightAlt size={16} className="text-gray-500" />
            </div>
          </Fade>

          <Fade duration={800}>
            <div className="flex flex-row items-center gap-y-0 gap-x-10 -mt-5 lg:mt-0 flex-wrap">
              <img
                src={flutterwave}
                alt=""
                className="object-contain lg:w-[140px] w-[140px]"
              />
              <img
                src={paypal}
                alt=""
                className="object-contain lg:w-[90px] w-[90px]"
              />
              <img
                src={stripe}
                alt=""
                className="object-contain lg:w-[80px] w-[80px]"
              />
            </div>
          </Fade>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomePage;
