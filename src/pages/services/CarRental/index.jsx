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

// Images
import carRental from "../../../assets/images/carRental.svg";
import ourChauffeur from "../../../assets/images/ourChauffeur.jpg";
import meetnGreet from "../../../assets/images/meetnGreet.jpg";

import {
  BiLogoGmail,
  BiLogoWhatsapp,
  BiMenu,
  BiSolidArrowFromTop,
  BiSolidPhone,
} from "react-icons/bi";
import { FiArrowDown } from "react-icons/fi";

function CarRentalPage() {
  const howItWorksRef = useRef(null);
  const moreAboutUsRef = useRef(null);

  const [isMenuHidden, setIsMenuHidden] = useState(false);
  return (
    <div className="relative bg-white">
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
                <li className="py-3 px-5">
                  <Link
                    to="/services/airport-transfer"
                    className="inline-block w-full hover:no-underline visited:no-underline hover:text-shuttlelaneBlack visited:text-shuttlelaneBlack text-shuttlelaneBlack"
                  >
                    Airport Transfer
                  </Link>
                </li>
                <li className="py-3 px-5 bg-shuttlelanePurple text-white">
                  <Link
                    to="/services/car-rental"
                    className="inline-block w-full hover:no-underline visited:no-underline hover:text-white visited:text-white text-white"
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

      {/* Car Rental */}
      <div
        className="px-8 relative bg-shuttlelaneLightPurple lg:px-24 py-32 pt-44 min-h-screen w-full flex items-center justify-center"
        ref={howItWorksRef}
      >
        <div className="flex relative z-10 lg:flex-row flex-col lg:justify-between lg:items-center">
          <div className="flex flex-col gap-y-5 lg:w-[100%] w-full">
            <div className="">
              <div className="text-shuttlelaneBlack">
                <div className="w-full flex items-center justify-center">
                  <img
                    src={carRental}
                    alt=""
                    className="object-contain lg:w-[40%] w-[80%]"
                  />
                </div>
                <h3 className="text-3xl lg:text-6xl text-center font-semibold mt-5 leading-[39px]">
                  Car Rental
                </h3>
                <div className="flex flex-col text-center gap-y-3 leading-[22px] mt-5">
                  <p className="lg:text-lg font-normal">
                    You don’t need the world to make that holiday travels or
                    family vacation come through because booking for your
                    holiday car with Shuttlelane won’t cost you an arm. Our car
                    hire service covers both short and long trips. We prioritize
                    your satisfaction above other things and as such, we provide
                    you with the most favourable car hire deals.
                  </p>
                  <p className="lg:text-lg font-normal">
                    You only need to search through our collection, make a
                    choice of car, reach us to book and you are on your way to
                    fulfilling that family vacation. Shuttlelane is a reality
                    maker. We make vacation dreams become realities with
                    functional safety guaranteed car hire service.
                  </p>
                </div>

                <div className="w-full flex justify-center mt-5">
                  <Link
                    to="/"
                    className="h-12 p-3 bg-transparent hover:text-white border-[.5px] border-shuttlelanePurple transition-all hover:bg-shuttlelanePurple visited:text-shuttlelanePurple hover:no-underline visited:no-underline text-shuttlelanePurple rounded-lg text-sm w-44 inline-block flex justify-center items-center "
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
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

export default CarRentalPage;
