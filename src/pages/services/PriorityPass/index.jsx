// @ts-nocheck
import React, { useRef, useState } from "react";
import NavBar from "../../../components/ui/NavBar";
import Typewriter from "typewriter-effect";
import {
  MdArrowRightAlt,
  MdOutlineLuggage,
  MdOutlineModeOfTravel,
  MdWorkspacePremium,
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
import priorityPass from "../../../assets/images/priorityPass.svg";
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
import { FaPassport } from "react-icons/fa";

function PriorityPassPage() {
  const priorityPassRef = useRef(null);
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
                <li className="py-3 px-5">
                  <Link
                    to="/services/car-rental"
                    className="inline-block w-full hover:no-underline visited:no-underline hover:text-shuttlelaneBlack visited:text-shuttlelaneBlack text-shuttlelaneBlack"
                  >
                    Car Rental
                  </Link>
                </li>
                <li className="py-3 px-5 bg-shuttlelanePurple text-white">
                  <Link
                    to="/services/priority-pass"
                    className="inline-block w-full hover:no-underline visited:no-underline hover:text-white visited:text-white text-white"
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

      {/* Priority Pass */}
      <div
        className="px-8 relative bg-shuttlelaneLightPurple lg:px-24 py-32 pt-44 min-h-screen w-full flex items-center justify-center"
        // ref={howItWorksRef}
      >
        <div className="flex relative z-10 lg:flex-row flex-col lg:justify-between lg:items-center">
          <div className="flex flex-col gap-y-5 lg:w-[100%] w-full">
            <div className="">
              <div className="text-shuttlelaneBlack">
                <div className="w-full flex items-center justify-center">
                  <img
                    src={priorityPass}
                    alt=""
                    className="object-contain lg:w-[25%] w-[60%]"
                  />
                </div>
                <h3 className="text-3xl lg:text-6xl text-center font-semibold mt-5 leading-[39px]">
                  Priority Pass
                </h3>
                <div className="flex flex-col text-center gap-y-3 leading-[22px] mt-5">
                  <p className="lg:text-lg font-normal">
                    Skip security and immigration queues. Getting through the
                    airport can be rough, especially when you’re landing with
                    bags and an imminent business meeting weighs heavily on your
                    mind. For those business travellers seeking simplicity,
                    comfort and an assurance that things will run smoothly, the
                    Shuttlelane priority pass service provides customers with a
                    truly VIP travel experience.
                  </p>
                </div>
                {/* <div
                  onClick={() => {
                    priorityPassRef.current.scrollIntoView({
                      behaviour: "smooth",
                    });
                  }}
                  className="cursor-pointer flex flex-col items-center mt-10 justify-center w-full"
                >
                  <div className="h-7 w-7 p-1 rounded-full border-[.5px] border-shuttlelaneBlack flex justify-center items-center animate-bounce-slow">
                    <FiArrowDown size={24} />
                  </div>
                  <p className="text-sm">Learn more</p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Priority Pass */}
      {/* Unique Selling Point */}
      <div
        className="relative px-8 lg:px-24
         bg-[#F7F6FF] text-center"
        ref={priorityPassRef}
      >
        <div
          className="flex lg:flex-row-reverse
           flex-col lg:justify-between lg:items-center"
        >
          <div className="flex flex-col gap-y-5 w-full">
            <div className="-mt-20">
              <div className="flex rounded-lg justify-center gap-x-10 items-center flex-wrap gap-y-10">
                <div className="md:max-w-[400px] h-[270px] px-10 w-full justify-center rounded-lg bg-shuttlelanePurple flex flex-col items-center text-center gap-y-3">
                  <div className="flex flex-col gap-y-2 justify-center w-full items-center">
                    <div className="h-12 w-12 rounded-full shadow-[#4540cf85] text-shuttlelanePurple font-semibold shadow-md flex items-center justify-center bg-white">
                      <FaPassport size={18} className="" />
                    </div>
                    <p className="text-md text-white">Standard Pass</p>
                  </div>
                  <p className="text-md text-white">
                    This pass covers fast-tracking immigration clearance only.
                    Relax and enjoy the environment away from the airport
                    crowds, while we take off the stress hook of immigration
                    clearance.
                  </p>
                </div>
                <div className="md:max-w-[400px] h-[270px] px-10 w-full justify-center rounded-lg bg-shuttlelanePurple flex flex-col items-center text-center gap-y-3">
                  <div className="flex flex-col gap-y-2 justify-center w-full items-center">
                    <div className="h-12 w-12 rounded-full shadow-[#4540cf85] text-shuttlelanePurple font-semibold shadow-md flex items-center justify-center bg-white">
                      <MdWorkspacePremium size={18} className="" />
                    </div>
                    <p className="text-md text-white font-semibold">
                      Premium Pass
                    </p>
                  </div>
                  <p className="text-md text-white">
                    Premium Pass covers both fast-tracking immigration and
                    customs clearance. Find peace, explore, enjoy, and enrich
                    your airport experience, while we take care of both
                    immigration and customs clearance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* </Fade> */}
        <div className="w-full flex md:flex-row flex-col items-center justify-center gap-x-4 gap-y-3 py-20">
          <Link
            to="/company/get-in-touch"
            className="h-12 p-3 bg-transparent hover:text-shuttlelaneBlack border-[.5px] border-white transition-all hover:bg-shuttlelaneLightPurple visited:text-white hover:no-underline visited:no-underline text-white rounded-lg text-sm w-44 inline-block flex justify-center items-center "
          >
            Make Enquiry
          </Link>

          <Link
            to="/"
            className="flex justify-center items-center gap-x-2 h-12 p-3 bg-shuttlelaneLightPurple hover:text-white border-[.5px] hover:border-white transition-all hover:bg-transparent visited:text-shuttlelaneBlack hover:no-underline visited:no-underline text-shuttlelaneBlack rounded-lg text-sm w-44 inline-block flex justify-center items-center "
          >
            <span>Book Now</span>
          </Link>
        </div>
      </div>

      {/* How To Reach Us */}
      <HowToReachUs />
      <PaymentPartners />
      <Footer />
    </div>
  );
}

export default PriorityPassPage;
