// @ts-nocheck
import React, { useEffect, useRef } from "react";
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
import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import AirportTransferForm from "../../forms/HomePage/AirportTransferForm";
import CarRentalForm from "../../forms/HomePage/CarRentalForm";
import Footer from "../../components/ui/Footer";
import PriorityPassForm from "../../forms/HomePage/PriorityPassForm";
import CustomerReviews from "../../components/ui/CustomerReviews";
import PaymentPartners from "../../components/ui/PaymentPartners";
import { ToastContainer, toast } from "react-toastify";
import VisaOnArrivalForm from "../../forms/HomePage/VisaOnArrivalForm";
import WhatsappIcon from "../../components/ui/WhatsappIcon";
import FleetSlide from "../../components/ui/FleetSlide";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

// Images
import circleAsset from "../../assets/images/circle-asset.svg";
import arrowAsset from "../../assets/images/arrow-asset.svg";
import google from "../../assets/logos/google.svg";
import tripAdvisor from "../../assets/logos/tripAdvisor.svg";
import trustpilot from "../../assets/logos/trustpilot.svg";
import appstoreDownload from "../../assets/logos/downloadAppstore.svg";
import playstoreDownload from "../../assets/logos/downloadPlaystore.svg";
import whatsappLogo from "../../assets/logos/whatsapp-icon.png";
import { FaPassport } from "react-icons/fa6";

function HomePage() {
  // SERVICE STATES
  const [isAirportTransfer, setIsAirportTransfer] = useState(true); // It is Airport Transfer by default
  const [isCarRental, setIsCarRental] = useState(false);
  const [isPriorityPass, setIsPriorityPass] = useState(false);
  const [isVisaOnArrival, setIsVisaOnArrival] = useState(false);

  const howItWorksRef = useRef(null); // useRef for scrolling to the "How it works" section

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

  const handleScroll = (ref) => {
    window.scrollTo({
      top: ref.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  // This checks for changes in the URL
  // Solely for "scrolling to content"
  useEffect(() => {
    if (window.location.href.includes("#")) {
      const scrollTag = window.location.href.split("#")[1];
      console.log(scrollTag);
      if (scrollTag == "howItWorks") {
        console.log("HELLO::");
        howItWorksRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [window.location.href]);

  // Check if the user was redirected from the "confirm-booking" page
  const queryParameters = new URLSearchParams(window.location.search);
  useEffect(() => {
    if (queryParameters.get("redirectFrom")) {
      toast.error(
        "You must select a booking type before proceeding to the booking summary page."
      );
    }
  }, [queryParameters.get("redirectFrom")]);

  return (
    <div className="relative bg-white">
      {/* Use Helmet to set the title */}
      <Helmet>
        <title>
          Shuttlelane: Airport Transfer, Car Rental, Priority Pass & Visa On
          Arrival Booking
        </title>
      </Helmet>

      <ToastContainer />
      <div className="fixed w-full z-20">
        <NavBar />
      </div>

      {/* Floating whatsapp icon */}
      <WhatsappIcon />

      {/* Hero Section */}
      <div className="h-[80vh] lg:min-h-screen heroBg relative text-white pt-32 pb-52 lg:pb-10 lg:px-24 px-7">
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
          <div className="lg:h-14 mt-5 h-auto gap-y-3 w-full flex flex-wrap justify-center items-center lg:items-center lg:justify-center py-2 gap-x-4 px-4 relative rounded-2xl">
            <button
              onClick={() => toggleService("airport")}
              className={`flex  items-center gap-x-[5px] h-[30px] min-w-[60px] px-5 rounded-full ${
                isAirportTransfer
                  ? "text-shuttlelanePurple bg-white border-shuttlelaneBlack"
                  : "text-white bg-transparent border-white"
              } transition-all border-dashed border-[1.2px] lg:border-[.5px]`}
            >
              <BsAirplane size={16} />
              <p className="text-sm">Airport Transfer</p>
            </button>
            <button
              onClick={() => toggleService("carRental")}
              className={`flex items-center gap-x-[5px] h-[30px] min-w-[60px] px-5 rounded-full ${
                isCarRental
                  ? "text-shuttlelanePurple bg-white border-shuttlelaneBlack"
                  : "text-white bg-transparent border-white"
              } transition-all border-dashed border-[1.2px] lg:border-[.5px]`}
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
              } transition-all border-dashed border-[1.2px] lg:border-[.5px]`}
            >
              <MdOutlineLuggage size={18} />
              <p className="text-sm">Priority Pass</p>
            </button>
            <button
              onClick={() => toggleService("visaOnArrival")}
              className={`flex items-center gap-x-[5px] h-[30px] min-w-[60px] px-5 rounded-full ${
                isVisaOnArrival
                  ? "text-shuttlelanePurple bg-white border-shuttlelaneBlack"
                  : "text-white bg-transparent border-white"
              } transition-all border-dashed border-[1.2px] lg:border-[.5px]`}
            >
              <FaPassport size={16} />
              <p className="text-sm">Visa On Arrival</p>
            </button>
          </div>

          {/* FORMS */}
          <div className="bg-white shadow-lg bg-opacity-60 w-full mt-20 lg:mt-16 h-auto transition-all p-3 rounded-xl">
            <div className="w-full lg:flex-row lg:justify-between lg:items-center -mt-12">
              <div
                className={`transition-all bg-white ${
                  isAirportTransfer
                    ? "lg:h-[280px] h-auto pb-10 lg:pb-0"
                    : isCarRental
                    ? "lg:h-[250px] h-auto pb-10 lg:pb-0"
                    : isPriorityPass
                    ? "lg:h-[250px] h-auto pb-10 lg:pb-0"
                    : "h-auto pb-10 lg:pb-0"
                } w-auto shadow-lg py-5 gap-y-5 gap-x-4 px-7 lg:px-4 lg:px-5 z-0 relative rounded-2xl`}
              >
                {isAirportTransfer && <AirportTransferForm />}
                {isCarRental && <CarRentalForm />}
                {isPriorityPass && <PriorityPassForm />}
                {isVisaOnArrival && <VisaOnArrivalForm />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div
        // Adjusting the margin between the "How it works" section and the forms based on what form is selected
        className={`transition-all ${
          isAirportTransfer
            ? "mt-[500px] md:mt-[450px] lg:mt-0"
            : isCarRental
            ? "mt-[450px] md:mt-[350px] lg:mt-0"
            : isPriorityPass
            ? "mt-[450px] md:mt-[350px] lg:mt-0"
            : "mt-[350px] md:mt-[250px] lg:mt-0"
        }`}
      >
        {/* How it works */}
        <div
          className="px-8 lg:px-24 pb-10 lg:py-44"
          id="howItWorks"
          ref={howItWorksRef}
        >
          {/* <Fade direction="up" duration={500}> */}
          <div className="w-full flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl text-shuttlelaneBlack font-semibold mt-3 max-w-xl leading-[39px]">
              How it works
            </h2>
            <h4 className="text-sm text-shuttlelaneBlack font-normal">
              Booking with Shuttlelane is very easy
            </h4>
          </div>
          {/* </Fade> */}

          <div className="mt-20 text-shuttlelaneBlack">
            <div className="flex justify-center gap-x-20 items-center flex-wrap gap-y-10">
              <div className="lg:max-w-[300px] h-[200px] flex flex-col items-center text-center gap-y-3">
                <div className="h-12 w-12 shadow-[#4540cf85] shadow-md flex items-center justify-center rounded-lg bg-shuttlelanePurple">
                  <BsFillBookmarksFill size={22} className="text-white" />
                </div>
                <h4 className="font-semibold text-shuttlelanePurple text-lg ">
                  Make Booking
                </h4>

                <p className="text-sm ">
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
                <h4 className="font-semibold text-shuttlelanePurple text-lg ">
                  Pay
                </h4>

                <p className="text-sm ">
                  Confirm your booking by securely making instant online
                  payment, either using a credit or debit card.
                </p>
              </div>

              {/* <img className="w-[100px] object-cover" src={stepsArrow} /> */}
              <div className="lg:max-w-[300px] h-[200px] flex flex-col gap-y-3 items-center text-center ">
                <div className="h-12 w-12 shadow-[#4540cf85] shadow-md flex items-center justify-center rounded-lg bg-shuttlelanePurple">
                  <MdOutlineModeOfTravel size={22} className="text-white" />
                </div>
                <h4 className="font-semibold text-shuttlelanePurple text-lg ">
                  Travel
                </h4>

                <p className="text-sm ">
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
            <img
              src={arrowAsset}
              className="object-cover w-full h-full opacity-30"
            />
          </div>

          <Fade direction="up" duration={800}>
            <div className="w-full flex flex-col items-center justify-center text-white text-center">
              <h2 className="text-3xl font-semibold mt-3 max-w-xl leading-[39px]">
                Why choose us?
              </h2>
              <h4 className="text-sm lgLtext-md font-normal">
                We strive to provide quality service and great customer
                satisfaction
              </h4>
            </div>
          </Fade>

          <div className="mt-10">
            <div className="flex justify-center gap-x-20 items-center bg-white flex-wrap gap-y-10 px-10 py-16 rounded-lg">
              <Fade duration={800} delay={50}>
                <div className="lg:max-w-[300px] h-[200px] text-shuttlelaneBlack flex flex-col items-center text-center gap-y-3">
                  <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-shuttlelanePurple">
                    <BsHourglassSplit size={22} className="text-white" />
                  </div>
                  <h4 className="font-semibold text-shuttlelanePurple text-lg ">
                    Always on time
                  </h4>

                  <p className="text-sm ">
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
                  <h4 className="font-semibold text-shuttlelanePurple text-lg ">
                    Great Value
                  </h4>

                  <p className="text-sm ">
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
                  <h4 className="font-semibold text-shuttlelanePurple text-lg ">
                    Secure and Reliable
                  </h4>

                  <p className="text-sm ">
                    Our client's safety and satisfaction is our priority and as
                    such, we prioritize their security and comfort.
                  </p>
                </div>
              </Fade>
            </div>
          </div>
        </div>
        {/* Our fleet */}
        <div className="px-8 lg:px-24 py-32 text-shuttlelaneBlack">
          <Fade direction="up" duration={800}>
            <div className="w-full flex flex-col items-center justify-center text-shuttlelaneBlack text-center">
              <h2 className="text-3xl font-semibold mt-3 max-w-xl leading-[39px]">
                Our Fleet
              </h2>
              <h4 className="text-sm  font-normal">
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
            <img
              src={circleAsset}
              className="object-cover w-full h-full opacity-30"
            />
          </div>

          <Fade direction="up" duration={800}>
            <div className="w-full flex flex-col items-center justify-center text-white text-center">
              <h2 className="text-3xl font-semibold mt-3 max-w-xl leading-[39px]">
                What our Clients are saying
              </h2>
              <h4 className="text-sm font-normal">
                Our clients are saying great things about us. Here are a few
              </h4>
            </div>
          </Fade>

          <div className="mt-10">
            <CustomerReviews />
            <div className="flex flex-row justify-center items-center gap-10 relative z-[10]">
              <Link
                to="https://www.trustpilot.com/review/shuttlelane.com"
                target="_blank"
              >
                <img
                  src={trustpilot}
                  alt=""
                  className="object-contain lg:w-[130px] w-[100px]"
                />
              </Link>

              <Link
                to="https://www.google.com/search?q=shuttlelane+limited&sca_esv=635483f0705dd420&ei=3OQUZqFe2beFsg-vojc&udm=&oq=shuttlelane+lim&gs_lp=Egxnd3Mtd2l6LXNlcnAiD3NodXR0bGVsYW5lIGxpbSoCCAAyBRAhGKABMgUQIRigATIFECEYoAEyBRAhGKABSOFiUABY405wBHgAkAEAmAH0AaAB6RyqAQYwLjEyLje4AQHIAQD4AQGYAhegArQdwgIIEAAYgAQYsQPCAgsQABiABBixAxiDAcICBBAAGAPCAgUQABiABMICChAAGIAEGIoFGEPCAgcQABiABBgTwgIJEAAYgAQYExgKwgIIEAAYHhgTGArCAgYQABgeGBPCAgoQABgWGB4YExgKmAMAkgcGNC4xMC45oAfISA&sclient=gws-wiz-serp#lrd=0x103b8c448e2f97c3:0xc95f24c00955aecc,1"
                target="_blank"
              >
                <img
                  src={google}
                  alt=""
                  className="object-contain lg:w-[45px] w-[25px]"
                />
              </Link>

              <Link
                to="https://www.tripadvisor.co.uk/ShowUserReviews-g304026-d17527097-r740298121-Shuttlelane-Lagos_Lagos_State.html"
                target="_blank"
              >
                <img
                  src={tripAdvisor}
                  alt=""
                  className="object-contain lg:w-[130px] w-[100px]"
                />
              </Link>
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
                <h4 className="text-sm font-normal">
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

        <PaymentPartners />
      </div>

      {/* Footer */}
      <Footer howItWorksRef={howItWorksRef} />
    </div>
  );
}

export default HomePage;
