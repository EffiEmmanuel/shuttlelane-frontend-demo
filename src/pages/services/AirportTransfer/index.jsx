// @ts-nocheck
import React, { useRef, useState } from "react";
import NavBar from "../../../components/ui/NavBar";
import Typewriter from "typewriter-effect";
import {
  MdArrowRightAlt,
  MdOutlineLuggage,
  MdOutlineModeOfTravel,
} from "react-icons/md";
import { AiFillPhone, AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Fade } from "react-reveal";
import Footer from "../../../components/ui/Footer";
import HorizontalScroll from "react-scroll-horizontal";
import PaymentPartners from "../../../components/ui/PaymentPartners";
import HowToReachUs from "../../../components/ui/HowToReachUs";
import { Helmet } from "react-helmet";

// Images
import fleetManagement from "../../../assets/images/fleet.jpg";
import driveForShuttlelane from "../../../assets/images/drive.png";
import hotelManagement from "../../../assets/images/hotel.png";
import airportTransfer from "../../../assets/images/airportTransfer2.svg";
import ourChauffeur from "../../../assets/images/ourChauffeur.jpg";
import meetnGreet from "../../../assets/images/meetnGreet.jpg";
import arrowAsset from "../../../assets/images/arrow-asset.svg";
import paypal from "../../../assets/logos/paypal.svg";
import stripe from "../../../assets/logos/stripe.svg";
import flutterwave from "../../../assets/logos/flutterwave.png";
import aboutsvg from "../../../assets/images/aboutsvg.svg";
import {
  BiLogoGmail,
  BiLogoWhatsapp,
  BiMenu,
  BiSolidArrowFromTop,
  BiSolidPhone,
} from "react-icons/bi";
import { FiArrowDown } from "react-icons/fi";

function AirportTransferPage() {
  const howItWorksRef = useRef(null);
  const moreAboutUsRef = useRef(null);

  const [isMenuHidden, setIsMenuHidden] = useState(false);
  return (
    <div className="relative bg-white">
      <Helmet>
        <title>Shuttlelane: Airport Transfer Services</title>
      </Helmet>

      {/* FLOATING MENU */}
      {isMenuHidden && (
        <Fade duration={300}>
          <div
            onMouseOver={() => setIsMenuHidden(true)}
            onMouseOut={() => setIsMenuHidden(false)}
            className="fixed flex p-5 justify-center items-center z-[80] bottom-7 right-7 h-auto lg:w-[25%] md:w-[50%] w-[70%]"
          >
            <div
              onMouseOver={() => setIsMenuHidden(true)}
              onMouseOut={() => setIsMenuHidden(false)}
              className="bg-white shadow-lg rounded-lg h-full w-full py-5"
            >
              <h2 className="text-xl font-medium px-5 mb-4 text-shuttlelanePurple">
                Services
              </h2>
              <ul className="text-xs flex flex-col gap-y-1">
                <li className="py-3 px-5 bg-shuttlelanePurple text-white">
                  <Link
                    to="/services/airport-transfer"
                    className="inline-block w-full hover:no-underline visited:no-underline hover:text-white visited:text-white text-white"
                  >
                    Airport Transfer
                  </Link>
                </li>
                <li className="py-3 px-5">
                  <Link
                    to="/services/car-rental"
                    className="inline-block w-full hover:no-underline visited:no-underline hover:text-shuttlelaneBlack visited:text-shuttlelaneBlack text-shuttlelaneBlack"
                  >
                    Car Rental
                  </Link>
                </li>
                <li className="py-3 px-5">
                  <Link
                    to="/services/priority-pass"
                    className="inline-block w-full hover:no-underline visited:no-underline hover:text-shuttlelaneBlack visited:text-shuttlelaneBlack text-shuttlelaneBlack"
                  >
                    Priority Pass
                  </Link>
                </li>
                <li className="py-3 px-5">
                  <Link
                    to="/services/visa-on-arrival"
                    className="inline-block w-full hover:no-underline visited:no-underline hover:text-shuttlelaneBlack visited:text-shuttlelaneBlack text-shuttlelaneBlack"
                  >
                    Visa On Arrival
                  </Link>
                </li>
                <li className="py-3 px-5">
                  <Link
                    to="/services/shuttlelane-concierge"
                    className="inline-block w-full hover:no-underline visited:no-underline hover:text-shuttlelaneBlack visited:text-shuttlelaneBlack text-shuttlelaneBlack"
                  >
                    Shuttlelane Concierge
                  </Link>
                </li>
                <li className="py-3 px-5">
                  <Link
                    to="/services/corporate-travel"
                    className="inline-block w-full hover:no-underline visited:no-underline hover:text-shuttlelaneBlack visited:text-shuttlelaneBlack text-shuttlelaneBlack"
                  >
                    Corporate Travel
                  </Link>
                </li>
                <li className="py-3 px-5">
                  <Link
                    to="/services/wedding-services"
                    className="inline-block w-full hover:no-underline visited:no-underline hover:text-shuttlelaneBlack visited:text-shuttlelaneBlack text-shuttlelaneBlack"
                  >
                    Wedding Services
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Fade>
      )}

      {/* FLOATING MENU ICON */}
      <div
        onMouseOver={() => setIsMenuHidden(true)}
        onMouseOut={() => setIsMenuHidden(false)}
        onClick={() => setIsMenuHidden(!isMenuHidden)}
        className="fixed shadow-lg cursor-pointer hover:animate-spin-slow flex justify-center items-center z-[85] bottom-10 right-10 bg-shuttlelaneGold h-14 w-14 rounded-full"
      >
        <BiMenu
          size={28}
          className={`text-white transition-all ${
            isMenuHidden ? "hidden" : "inline-block"
          }`}
        />

        <AiOutlineClose
          size={28}
          className={`text-white transition-all ${
            !isMenuHidden ? "hidden" : "inline-block"
          }`}
        />
      </div>

      <div className="fixed w-full z-20">
        <NavBar isPurpleLogo={true} />
      </div>

      {/* About Shuttlelane */}
      <div
        className="px-8 relative lg:px-24 py-32 pt-44 min-h-screen w-full flex items-center justify-center"
        ref={howItWorksRef}
      >
        <div className="flex relative z-10 lg:flex-row flex-col lg:justify-between lg:items-center">
          <div className="flex flex-col gap-y-5 lg:w-[100%] w-full">
            <div className="">
              <div className="text-shuttlelaneBlack">
                <div className="w-full flex items-center justify-center">
                  <img
                    src={airportTransfer}
                    alt=""
                    className="object-contain lg:w-[40%] w-[80%]"
                  />
                </div>
                <h3 className="text-3xl lg:text-6xl text-center font-semibold mt-3 leading-[39px]">
                  Airport Transfer
                </h3>
                <div className="flex flex-col text-center gap-y-3 leading-[22px] mt-3">
                  <p className="lg:text-lg font-normal">
                    We operate executive chauffeur services and corporate
                    travels, undertake city tours, and handle airport transfers,
                    plan weddings and need-base social engagements. Comfort and
                    safety are the key definitions of a memorably good trip, and
                    this is something we are totally given to at Shuttlelane. We
                    will take you from your point of touchdown at the airport to
                    your destination in warmth and ease. We will do this because
                    we have courteous and responsive luggage porter and
                    chauffeur waiting to serve you.
                  </p>
                </div>

                <div
                  onClick={() => {
                    moreAboutUsRef.current.scrollIntoView({
                      behaviour: "smooth",
                    });
                  }}
                  className="cursor-pointer flex flex-col items-center mt-10 justify-center w-full"
                >
                  <div className="h-7 w-7 p-1 rounded-full border-[.5px] border-shuttlelaneBlack flex justify-center items-center animate-bounce-slow">
                    <FiArrowDown size={24} />
                  </div>
                  <p className="text-sm">Learn more</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Chauffeur */}
      <div
        className="lg:h-screen h-[60vh] mt-10 lg:mt-0 px-7 py-20 pb-10 lg:pb-0 lg:py-0 lg:px-0 lg:py-0 flex bg-shuttlelaneLightPurple justify-between"
        ref={moreAboutUsRef}
      >
        <div className="lg:w-[50%] bg-red-400 h-scrreen hidden lg:inline-block">
          <img
            src={ourChauffeur}
            alt="Our Chauffeur Services"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="lg:w-[50%] w-full h-full justify-center gap-y-4 lg:pl-7 lg:pr-24 flex text-shuttlelaneBlack flex-col lg:text-left text-center">
          <h2 className="text-3xl lg:text-5xl font-semibold mt-3 leading-[39px]">
            Our Chauffeur
          </h2>
          <p className="font-normal leading-[25px]">
            The standard at Shuttlelane cuts through all sections, including
            personnel. This is why we are stocked with some of the best
            chauffeurs around. Our professional and well-drilled chauffeurs
            complement the high standard of our services. They are licensed,
            tested and trusted. Our chauffeurs are also customer-friendly and
            boast of a wide range of shuttle service experience.
          </p>

          <Link
            to="/"
            className="h-12 p-3 bg-shuttlelanePurple hover:text-shuttlelanePurple hover:border-[.5px] hover:border-shuttlelanePurple transition-all hover:bg-transparent visited:text-white hover:no-underline visited:no-underline text-white rounded-lg text-sm lg:w-32 w-full inline-block flex justify-center items-center "
          >
            Book Now
          </Link>
        </div>
      </div>

      {/* Meet and Greet */}
      <div
        className="lg:h-screen h-[60vh] lg:mt-0 px-7 pb-10 lg:px-0 lg:pb-0 flex lg:flex-row-reverse bg-shuttlelaneLightPurple justify-between"
        ref={moreAboutUsRef}
      >
        <div className="lg:w-[50%] bg-red-400 h-scrreen hidden lg:inline-block">
          <img
            src={meetnGreet}
            alt="Meet and Greet"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="lg:w-[50%] w-full h-full justify-center gap-y-4 lg:pr-7 lg:pl-24 flex text-shuttlelaneBlack flex-col lg:text-left text-center">
          <h2 className="text-3xl lg:text-5xl font-semibold mt-3 leading-[39px]">
            Meet and Greet
          </h2>
          <p className="font-normal leading-[25px]">
            One exclusive service created for the good of our customers is our
            meet and greet activity. This idea is geared towards instilling
            confidence in you and making you acquainted with us as much as
            possible. One of our Chauffer shall await your arrival at the
            airport and offer you a helping hand with your baggage.
          </p>
          <Link
            to="/"
            className="h-12 p-3 bg-shuttlelanePurple hover:text-shuttlelanePurple hover:border-[.5px] hover:border-shuttlelanePurple transition-all hover:bg-transparent visited:text-white hover:no-underline visited:no-underline text-white rounded-lg text-sm lg:w-32 w-full inline-block flex justify-center items-center "
          >
            Book Now
          </Link>
        </div>
      </div>

      {/* How To Reach Us */}
      <HowToReachUs />
      <PaymentPartners />
      <Footer />

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
                
              </p>
              <p className="text-md">
                
              </p>
              <p className="text-md">
                
              </p>
            </div>
          </div> */}
    </div>
  );
}

export default AirportTransferPage;
