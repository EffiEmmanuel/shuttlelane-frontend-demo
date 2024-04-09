// @ts-nocheck
import React, { useRef, useState } from "react";
import NavBar from "../../../components/ui/NavBar";
import Typewriter from "typewriter-effect";
import {
  MdArrowRightAlt,
  MdOutlineLuggage,
  MdOutlineMarkUnreadChatAlt,
  MdOutlineModeOfTravel,
  MdSpeed,
} from "react-icons/md";
import {
  AiFillPhone,
  AiOutlineCheckCircle,
  AiOutlineClose,
  AiOutlineSafety,
  AiOutlineStar,
} from "react-icons/ai";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Fade } from "react-reveal";
import Footer from "../../../components/ui/Footer";
import { Helmet } from "react-helmet";

// Images
import circleAsset from "../../../assets/images/circle-asset.svg";
import arrowAsset from "../../../assets/images/arrow-asset.svg";
import paypal from "../../../assets/logos/paypal.svg";
import stripe from "../../../assets/logos/stripe.svg";
import flutterwave from "../../../assets/logos/flutterwave.png";
import aboutsvg from "../../../assets/images/aboutsvg.svg";
import {
  BiCheckShield,
  BiLogoGmail,
  BiLogoWhatsapp,
  BiMenu,
  BiSolidArrowFromTop,
  BiSolidPhone,
  BiTimer,
} from "react-icons/bi";
import { FiArrowDown } from "react-icons/fi";
import { GrStatusGood, GrUserManager } from "react-icons/gr";
import PaymentPartners from "../../../components/ui/PaymentPartners";
import HowToReachUs from "../../../components/ui/HowToReachUs";
import {
  BsHourglassSplit,
  BsPersonCheck,
  BsShieldFillCheck,
  BsStarFill,
} from "react-icons/bs";
import { HiOutlineCheckBadge } from "react-icons/hi2";
import { FaRegHandshake } from "react-icons/fa";
import WhatsappIcon from "../../../components/ui/WhatsappIcon";

function VisaOnArrivalPage() {
  const howItWorksRef = useRef(null);
  const moreAboutUsRef = useRef(null);

  const [isMenuHidden, setIsMenuHidden] = useState(false);
  return (
    <div className="relative bg-white">
      <Helmet>
        <title>Shuttlelane: Visa On Arrival Services</title>
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
                <li className="py-3 px-5">
                  <Link
                    to="/services/priority-pass"
                    className="inline-block w-full hover:no-underline visited:no-underline hover:text-shuttlelaneBlack visited:text-shuttlelaneBlack text-shuttlelaneBlack"
                  >
                    Priority Pass
                  </Link>
                </li>
                <li className="py-3 px-5 bg-shuttlelanePurple text-white">
                  <Link
                    to="/services/visa-on-arrival"
                    className="inline-block w-full hover:no-underline visited:no-underline hover:text-white visited:text-white text-white"
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

      {/* Floating whatsapp icon */}
      {isMenuHidden && <WhatsappIcon pageHasFloatingIcon={true} />}

      <div className="fixed w-full z-20">
        <NavBar isPurpleLogo={false} />
      </div>

      {/* Visa On Arrival */}
      <div
        className="px-8 relative lg:px-24 py-32 pt-44 min-h-screen flex items-center justify-center voaBg"
        ref={howItWorksRef}
      >
        <div className="flex relative z-10 lg:flex-row flex-col lg:justify-between lg:items-center">
          <div className="flex flex-col gap-y-5 lg:w-[100%] w-full">
            <div className="">
              <div className="text-white">
                <h3 className="text-3xl lg:text-6xl text-center font-semibold mt-3 leading-[39px]">
                  Visa On Arrival
                </h3>
                <div className="flex flex-col text-center gap-y-2 leading-[22px] mt-3 lg:max-w-3xl">
                  <p className="text-lg font-normal">
                    If you need to process a Nigeria visa application urgently,
                    our urgent Nigeria Visa on Arrival service would be of
                    benefit to you. The benefit of the service is that it makes
                    your desire to travel to Nigeria come true and gives you
                    peace of mind that your visa case is being handled properly
                    by our visa team experts. We take away the stress that comes
                    with applying for an emergency Nigeria visa so that you can
                    focus on other travel plans of yours.
                  </p>
                </div>

                <div
                  onClick={() => {
                    moreAboutUsRef.current.scrollIntoView({
                      behaviour: "smooth",
                    });
                  }}
                  className="cursor-pointer flex flex-col items-center mt-20 justify-center w-full"
                >
                  <div className="h-7 w-7 p-1 rounded-full border-[.5px] border-white flex justify-center items-center animate-bounce-slow">
                    <FiArrowDown size={24} />
                  </div>
                  <p className="text-sm">Learn more</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why choose us? */}
      <div
        ref={moreAboutUsRef}
        className="px-8 lg:px-24 overflow-hidden text-white bg-shuttlelaneLightPurple min-h-[70vh] py-20 relative"
      >
        <div className="absolute overflow-hidden top-0 left-0 w-full h-full">
          <img
            src={arrowAsset}
            className="object-cover w-full h-full opacity-30"
          />
        </div>

        <Fade direction="up" duration={800}>
          <div className="w-full flex flex-col items-center justify-center text-shuttlelaneBlack text-center">
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
          <div className="flex justify-center gap-x-20 items-center bg-white flex-wrap gap-y-14 px-10 py-16 rounded-lg">
            <Fade duration={800} delay={50}>
              <div className="lg:max-w-[300px] h-[200px] text-shuttlelaneBlack flex flex-col items-center text-center gap-y-3">
                <div className="max-h-[48px] max-w-[48px] h-[48px] w-[48px] min-h-[48px] min-w-[48px] flex items-center justify-center rounded-lg bg-shuttlelanePurple">
                  <AiOutlineStar size={22} className="text-white" />
                </div>
                <h4 className="font-semibold text-shuttlelanePurple text-lg ">
                  Service Simplicity
                </h4>

                <p className="text-sm ">
                  We guarantee a seamless, traveler-friendly application
                  process. Our long and good working relationship with the
                  Nigeria Immigration Service makes it much less complicated to
                  work with us than dealing with the government.
                </p>
              </div>
            </Fade>

            <Fade duration={800} delay={100}>
              {/* <img className="w-[100px] object-cover" src={stepsArrow} /> */}
              <div className="lg:max-w-[300px] h-[200px] text-shuttlelaneBlack flex flex-col items-center text-center gap-y-3">
                <div className="max-h-[48px] max-w-[48px] h-[48px] w-[48px] min-h-[48px] min-w-[48px] shadow-[#4540cf85] shadow-md flex items-center justify-center rounded-lg bg-shuttlelanePurple">
                  <MdSpeed size={22} className="text-white" />
                </div>
                <h4 className="font-semibold text-shuttlelanePurple text-lg ">
                  Fast-track Visa Approval
                </h4>

                <p className="text-sm ">
                  Our team of experts works with Nigeria Immigration to expedite
                  your visa approval and send all documents to you within 12-24
                  hours.
                </p>
              </div>
            </Fade>

            <Fade duration={800} delay={150}>
              {/* <img className="w-[100px] object-cover" src={stepsArrow} /> */}
              <div className="lg:max-w-[300px] lg:h-[200px] text-shuttlelaneBlack flex flex-col items-center text-center gap-y-3">
                <div className="max-h-[48px] max-w-[48px] h-[48px] w-[48px] min-h-[48px] min-w-[48px] shadow-[#4540cf85] shadow-md flex items-center justify-center rounded-lg bg-shuttlelanePurple">
                  <BiCheckShield size={22} className="text-white" />
                </div>
                <h4 className="font-semibold text-shuttlelanePurple text-lg ">
                  Tested And Trusted
                </h4>

                <p className="text-sm ">
                  Over the years, we have proven to be a reliable and trusted
                  Nigerian Visa Assistance Partner when it comes to processing
                  and securing Nigeria visa on arrival.
                </p>
              </div>
            </Fade>

            <Fade duration={800} delay={150}>
              {/* <img className="w-[100px] object-cover" src={stepsArrow} /> */}
              <div className="lg:max-w-[300px] lg:h-[200px] text-shuttlelaneBlack flex flex-col items-center text-center gap-y-3">
                <div className="max-h-[48px] max-w-[48px] h-[48px] w-[48px] min-h-[48px] min-w-[48px] shadow-[#4540cf85] shadow-md flex items-center justify-center rounded-lg bg-shuttlelanePurple">
                  <FaRegHandshake size={22} className="text-white" />
                </div>
                <h4 className="font-semibold text-shuttlelanePurple text-lg ">
                  Hasle-free Experience
                </h4>

                <p className="text-sm ">
                  We ensure that you enjoy your travels and take away the
                  hurdles and pains people go through to procure Nigeria visa on
                  arrival, and our customer support is open to help 24/7.
                </p>
              </div>
            </Fade>
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

export default VisaOnArrivalPage;
