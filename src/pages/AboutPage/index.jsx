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
// import appstore from "../../assets/logos/appstore.svg";
import googlePlay from "../../assets/logos/googlePlay.svg";
import Footer from "../../components/ui/Footer";

function AboutPage() {
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
      <div className="min-h-[55vh] flex pt-44 text-white">
        <div className="flex flex-col px-8 gap-y-12 relative lg:px-24 w-full">
          <div className="">
            <Fade direction="up" duration={700}>
              <h1 className="text-4xl text-center font-bold flex md:flex-row flex-col items-baseline gap-x-2 gap-y-2">
                <span className="text-[13rem] text-center text-shuttlelanePurple opacity-70 uppercase">
                  About Us
                </span>
              </h1>
            </Fade>

            <Fade direction="up" duration={700}>
              <h1 className="text-[1rem] lg:text-lg mt-1">
                Schedule your next booking with us!
              </h1>
            </Fade>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="lg:mt-52 mt-72">
        {/* How it works */}
        <div className="px-8 lg:px-24 my-16 lg:pb-20 pb-0">
          <Fade direction="up" duration={800}>
            <h4 className="text-xs text-gray-500 font-semibold uppercase">
              How It Works
            </h4>
          </Fade>

          <Fade direction="up" duration={800} delay={50}>
            <h2 className="text-4xl text-boomRangBlack font-semibold mt-3 max-w-xl leading-[39px]">
              Booking with Shuttlelane is very simple
            </h2>
          </Fade>

          <div className="mt-10">
            <div className="flex justify-between gap-x-10 items-center flex-wrap gap-y-10">
              <Fade duration={800} delay={50}>
                <div className="lg:max-w-[300px] h-[200px] flex flex-col gap-y-3">
                  <div className="h-12 w-12 shadow-[#4540cf85] shadow-md flex items-center justify-center rounded-lg bg-shuttlelanePurple">
                    <BsFillBookmarksFill size={22} className="text-white" />
                  </div>
                  <h4 className="font-semibold text-shuttlelanePurple text-lg">
                    Make Booking
                  </h4>

                  <p className="text-sm">
                    Select from our available services and make a booking by
                    specifying your travel date, pickup location, destination,
                    and other required information
                  </p>
                </div>
              </Fade>

              <Fade duration={800} delay={100}>
                {/* <img className="w-[100px] object-cover" src={stepsArrow} /> */}
                <div className="lg:max-w-[300px] h-[200px] flex flex-col gap-y-3">
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
              </Fade>

              <Fade duration={800} delay={150}>
                {/* <img className="w-[100px] object-cover" src={stepsArrow} /> */}
                <div className="lg:max-w-[300px] h-[200px] flex flex-col gap-y-3">
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
              </Fade>
            </div>
          </div>
        </div>
        {/* Why choose us? */}
        <div className="px-8 lg:px-24 mt-32 overflow-hidden text-white bg-shuttlelanePurple min-h-[90vh] py-20 relative">
          <div className="absolute overflow-hidden top-0 left-0 w-full h-full">
            <img src={arrowAsset} className="object-cover w-full h-full" />
          </div>
          <Fade direction="up" duration={800}>
            <h4 className="text-sm text-white font-semibold uppercase">
              Why choose us
            </h4>
          </Fade>

          <Fade direction="up" duration={800} delay={50}>
            <h2 className="text-4xl text-white font-semibold mt-3 max-w-xl leading-[42px]">
              We strive to provide quality service and great customer
              satisfaction
            </h2>
          </Fade>

          <div className="mt-10">
            <div className="flex justify-between gap-x-10 items-center flex-wrap gap-y-10 bg-white px-10 py-16 lg:py-10 rounded-lg">
              <Fade duration={800} delay={50}>
                <div className="lg:max-w-[300px] h-[200px] text-shuttlelaneBlack flex flex-col gap-y-3">
                  <div className="h-12 w-12 shadow-[#4540cf85] shadow-md flex items-center justify-center rounded-lg bg-shuttlelanePurple">
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
                <div className="lg:max-w-[300px] h-[200px] text-shuttlelaneBlack flex flex-col gap-y-3">
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
                <div className="lg:max-w-[300px] lg:h-[200px] text-shuttlelaneBlack flex flex-col gap-y-3">
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
        <div className="px-8 lg:px-24 mt-32">
          <Fade direction="up" duration={800}>
            <h4 className="text-xs text-gray-500 font-semibold uppercase">
              Our Fleet
            </h4>
          </Fade>

          <Fade direction="up" duration={800} delay={50}>
            <h2 className="text-4xl text-boomRangBlack font-semibold mt-3 max-w-xl leading-[37px]">
              Shuttlelane offers a variety of service class you can choose from,
              depending on your needs.
            </h2>
          </Fade>
          <FleetSlide />
        </div>
        {/* Testimonials */}
        <div className="px-8 lg:px-24 mt-32 overflow-hidden text-white bg-shuttlelanePurple min-h-[90vh] pt-20 relative">
          <div className="absolute overflow-hidden top-0 left-0 w-full h-full">
            <img src={circleAsset} className="object-cover w-full h-full" />
          </div>
          <Fade direction="up" duration={800}>
            <h4 className="text-sm text-white font-semibold uppercase">
              What our Clients are saying
            </h4>
          </Fade>

          <Fade direction="up" duration={800} delay={50}>
            <h2 className="text-4xl text-white font-semibold mt-3 max-w-xl leading-[42px]">
              Our clients are saying great things about us. Here are a few
            </h2>
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
        <div className="px-8 pt-10 lg:px-24">
          <div className="overflow-hidden text-shuttlelaneBlack py-10 relative">
            <Fade direction="up" duration={800}>
              <h4 className="text-sm font-semibold uppercase text-gray-500">
                GET THE APP
              </h4>
            </Fade>

            <Fade direction="up" duration={800} delay={50}>
              <h2 className="text-4xl font-semibold mt-3 max-w-xl leading-[42px]">
                Download the Shuttlelane Mobile App
              </h2>
            </Fade>

            <Fade duration={800}>
              <div className="flex flex-row justify-start mt-4 items-center gap-x-6">
                {/* <img src={appstore} alt="" className="lg:w-[50px] w-[50px]" /> */}
                <img src={googlePlay} alt="" className="lg:w-[45px] w-[45px]" />
              </div>
            </Fade>

            <div className="mt-4 flex lg:flex-row flex-col lg:items-center gap-x-2">
              <Fade duration={800}>
                <div className="flex items-center gap-x-2 mt-10 lg:mt-0">
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
                    className="object-contain lg:w-[150px] w-[150px]"
                  />
                  <img
                    src={paypal}
                    alt=""
                    className="object-contain lg:w-[100px] w-[100px]"
                  />
                  <img
                    src={stripe}
                    alt=""
                    className="object-contain lg:w-[90px] w-[90px]"
                  />
                </div>
              </Fade>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default AboutPage;
