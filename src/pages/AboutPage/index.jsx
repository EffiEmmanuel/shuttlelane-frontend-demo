// @ts-nocheck
import React, { useRef } from "react";
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
import Footer from "../../components/ui/Footer";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

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
import aboutsvg from "../../assets/images/aboutsvg.svg";
import googlePlay from "../../assets/logos/googlePlay.svg";
import doodleBg from "../../assets/images/doodle.svg";
import experience from "../../assets/images/experience.jpg";
import usp from "../../assets/images/usp.svg";

function AboutPage() {
  const howItWorksRef = useRef(null);
  return (
    <div className="relative bg-white">
      <div className="fixed w-full z-20">
        <NavBar isPurpleLogo={true} />
      </div>

      {/* Our Experience */}
      <div
        className="px-8 relative lg:px-24 py-32 bg-[#C19C52] bg-opacity-40"
        ref={howItWorksRef}
      >
        <div className="absolute z-0 overflow-hidden top-0 left-0 w-full h-full">
          <img src={arrowAsset} className="object-cover w-full h-full" />
        </div>

        <div className="flex relative z-10 lg:flex-row flex-col lg:justify-between lg:items-center">
          <div className="lg:w-[30%] bg-[#F7F6FF] w-full border-l-4 border-l-shuttlelanePurple rounded-lg py-3">
            <h2 className="text-xl font-medium px-5 mb-4 text-shuttlelanePurple">
              Company
            </h2>
            <ul className="text-xs flex flex-col gap-y-1">
              <li className="py-3 px-5 bg-shuttlelanePurple text-white">
                <Link to="/" className="inline-block w-full">
                  About Shuttlelane
                </Link>
              </li>
              <li className="py-3 px-5">
                <Link to="/" className="inline-block w-full text-gray-600">
                  Frequently Asked Questions
                </Link>
              </li>
              <li className="py-3 px-5">
                <Link to="/" className="inline-block w-full text-gray-600">
                  Become a Partner
                </Link>
              </li>
              <li className="py-3 px-5">
                <Link to="/" className="inline-block w-full text-gray-600">
                  Get
                </Link>
              </li>
              <li className="py-3 px-5">
                <Link to="/" className="inline-block w-full text-gray-600">
                  Who We Are
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-y-5 lg:w-[55%] w-full">
            <div className="">
              <div className="">
                <h3 className="text-3xl text-boomRangBlack font-semibold mt-3 max-w-xl leading-[39px]">
                  About Shuttlelane
                </h3>
                <div className="flex flex-col gap-y-3 leading-[22px] mt-3">
                  <p className="text-md">
                    At Shuttlelane, we give you the best of executive airport
                    services. Because we are committed to enriching your travel
                    experiences, we always make sure that you get unique
                    standard services from us.
                  </p>
                  <p className="text-md">
                    Take your time to enjoy our finest customer-centered
                    services because you deserve only the best.
                  </p>
                  <p className="text-md">
                    Registered in England and also under the Corporate Affairs
                    Commission (CAC) laws of Nigeria, Shuttlelane operates from
                    a vantage position of tailoring tastes and desires to suit
                    individual’s demands which are delivered by the best-trained
                    professionals in hospitality and logistics.
                  </p>
                  <p className="text-md">
                    Our focus at Shuttlelane is simple – to give you
                    comfortable, safe airport taxi. And, we do this by putting
                    quality services and customer satisfaction first.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Experience */}
      <div
        className="px-8 lg:px-24 py-20 bg-[#F7F6FF] lg:bg-transparent"
        ref={howItWorksRef}
      >
        {/* <Fade direction="up" duration={500}> */}

        <div className="flex lg:flex-row flex-col lg:justify-between lg:items-center">
          <div className="w-full lg:w-[40%] h-[300px] p-5 bg-[#F7F6FF] rounded-lg hidden lg:inline-block">
            <img
              src={experience}
              alt=""
              className="object-cover h-full w-full rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-y-5 lg:w-[55%] w-full">
            <div className="flex flex-col justify-center lg:text-left text-center">
              <h2 className="text-3xl text-boomRangBlack lg:text-left text-center font-semibold mt-3 lg:max-w-xl leading-[39px]">
                Our Experience
              </h2>
              <h4 className="text-sm lg:text-left text-center">
                Our experience in what we do is impeccable
              </h4>
            </div>
            <p className="text-md lg:text-left text-center">
              We remain a tested and trusted service provider in ground
              transportation in Nigeria’s commercial heartbeat – Lagos. We are
              set out to make travelling experience comfortable and memorable
              for our clients. We are always delighted to have them reach their
              intended destinations with satisfaction. This is what we do, this
              is our forte and we have made a good name of it.
            </p>
          </div>
        </div>

        {/* </Fade> */}
      </div>

      {/* Unique Selling Point */}
      <div
        className="relative px-8 lg:px-24 py-20 bg-shuttlelanePurple text-center"
        ref={howItWorksRef}
      >
        <div className="absolute overflow-hidden top-0 left-0 w-full h-full">
          <img src={arrowAsset} className="object-cover w-full h-full" />
        </div>

        <div className="flex lg:flex-row-reverse flex-col lg:justify-between lg:items-center">
          <div className="flex flex-col gap-y-5 w-full">
            <div className="flex flex-col justify-center text-center text-white">
              <h2 className="text-3xl text-boomRangBlack text-center font-semibold mt-3 leading-[39px]">
                Our Unique Selling Point
              </h2>
              <h4 className="text-sm text-center">
                Dealing with us gives you:
              </h4>
            </div>

            <div className="mt-10">
              <div className="flex  rounded-lg justify-center gap-x-10 items-center flex-wrap gap-y-10">
                <div className="md:max-w-[300px] h-[200px] px-10 w-full justify-center rounded-lg bg-white flex flex-col items-center text-center gap-y-3">
                  <div className="h-12 w-12 rounded-full shadow-[#4540cf85] text-white font-semibold shadow-md flex items-center justify-center bg-shuttlelanePurple">
                    1
                  </div>

                  <p className="text-md">Unparalleled safety and comfort.</p>
                </div>
                <div className="md:max-w-[300px] h-[200px] px-10 w-full justify-center rounded-lg bg-white flex flex-col items-center text-center gap-y-3">
                  <div className="h-12 w-12 rounded-full shadow-[#4540cf85] text-white font-semibold shadow-md flex items-center justify-center bg-shuttlelanePurple">
                    2
                  </div>

                  <p className="text-md">
                    Punctual and responsive service delivery.
                  </p>
                </div>
                <div className="md:max-w-[300px] h-[200px] px-10 w-full justify-center rounded-lg bg-white flex flex-col items-center text-center gap-y-3">
                  <div className="h-12 w-12 rounded-full shadow-[#4540cf85] text-white font-semibold shadow-md flex items-center justify-center bg-shuttlelanePurple">
                    3
                  </div>

                  <p className="text-md">
                    Timely communication via email and text.
                  </p>
                </div>
                <div className="md:max-w-[300px] h-[200px] px-10 w-full justify-center rounded-lg bg-white flex flex-col items-center text-center gap-y-3">
                  <div className="h-12 w-12 rounded-full shadow-[#4540cf85] text-white font-semibold shadow-md flex items-center justify-center bg-shuttlelanePurple">
                    4
                  </div>

                  <p className="text-md">
                    Empathetic and professional Chauffer.
                  </p>
                </div>
                <div className="md:max-w-[300px] h-[200px] px-10 w-full justify-center rounded-lg bg-white flex flex-col items-center text-center gap-y-3">
                  <div className="h-12 w-12 rounded-full shadow-[#4540cf85] text-white font-semibold shadow-md flex items-center justify-center bg-shuttlelanePurple">
                    5
                  </div>

                  <p className="text-md">
                    And indeed, a service provider committed to excellent
                    service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* </Fade> */}
      </div>

      <div className="lg:px-24 px-7 bg-[#F7F6FF] flex lg:flex-row flex-col lg:items-center lg:justify-center gap-x-2">
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

      {/* Our Experience */}
      {/* <div className="mt-10">
            <h3 className="text-xl font-bold">Our Experience</h3>
            <div className="flex flex-col gap-y-3 leading-[22px] mt-3">
              <p className="text-md">
                At Shuttlelane, we give you the best of executive airport
                services. Because we are committed to enriching your travel
                experiences, we always make sure that you get unique standard
                services from us.
              </p>
              <p className="text-md">
                Take your time to enjoy our finest customer-centered services
                because you deserve only the best.
              </p>
              <p className="text-md">
                Registered in England and also under the Corporate Affairs
                Commission (CAC) laws of Nigeria, Shuttlelane operates from a
                vantage position of tailoring tastes and desires to suit
                individual’s demands which are delivered by the best-trained
                professionals in hospitality and logistics.
              </p>
              <p className="text-md">
                Our focus at Shuttlelane is simple – to give you comfortable,
                safe airport taxi. And, we do this by putting quality services
                and customer satisfaction first.
              </p>
            </div>
          </div> */}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default AboutPage;
