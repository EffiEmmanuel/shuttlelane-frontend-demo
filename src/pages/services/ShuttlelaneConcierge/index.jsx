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

// Images
import personalConcierge from "../../../assets/images/concierge/personal-concierge.jpg";
import corporateConcierge from "../../../assets/images/concierge/corporate-concierge.jpg";

function ConciergePage() {
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

      <div className="fixed w-full z-20">
        <NavBar isPurpleLogo={false} />
      </div>

      {/* Concierge */}
      <div
        className="px-8 relative lg:px-24 py-32 pt-44 min-h-screen flex items-center justify-center conciergeBg"
        ref={howItWorksRef}
      >
        <div className="flex relative z-10 lg:flex-row flex-col lg:justify-between lg:items-center">
          <div className="flex flex-col gap-y-5 lg:w-[100%] w-full">
            <div className="">
              <div className="text-white">
                <h3 className="text-3xl lg:text-[5rem] text-center greatVibesText font-semibold mt-3 leading-[39px]">
                  Shuttlelane Concierge
                </h3>
                <div className="flex flex-col text-center gap-y-2 leading-[22px] lg:max-w-3xl">
                  <p className="text-lg font-normal mt-8">
                    It&#39;s More Than A Concierge Service, It&#39;s A Better
                    Lifestyle Experience
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
                  <p className="text-sm spaceGroteskText">Learn more</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Concierges */}
      <div
        className="lg:h-screen h-[60vh] mt-10 lg:mt-0 px-7 py-20 pb-10 lg:pb-0 lg:py-0 lg:px-0 lg:py-0 flex bg-white justify-between"
        ref={moreAboutUsRef}
      >
        <div className="lg:w-[50%] bg-red-400 h-scrreen hidden lg:inline-block">
          <img
            src={personalConcierge}
            alt="Personal Concierge Services"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="lg:w-[50%] w-full h-full justify-center gap-y-4 lg:pl-7 lg:pr-24 flex text-shuttlelaneBlack flex-col lg:text-left text-center">
          <h2 className="text-3xl lg:text-5xl greatVibesText font-semibold mt-3 leading-[39px]">
            Personal Concierges
          </h2>
          <p className="font-normal leading-[25px]">
            Get the life is good feelings - Our team of local personal
            concierges will help connect you to what you enjoy most. And,
            enhance your quality of life with confidential &amp; discreet luxury
            lifestyle management that helps alleviate demands on your time.
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
        className="lg:h-screen h-[60vh] lg:mt-0 px-7 pb-10 lg:px-0 lg:pb-0 flex lg:flex-row-reverse bg-white justify-between"
        ref={moreAboutUsRef}
      >
        <div className="lg:w-[50%] bg-red-400 h-scrreen hidden lg:inline-block">
          <img
            src={corporateConcierge}
            alt="Corporate Concierge Services"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="lg:w-[50%] w-full h-full justify-center gap-y-4 lg:pr-7 lg:pl-24 flex text-shuttlelaneBlack flex-col lg:text-left text-center">
          <h2 className="text-3xl lg:text-5xl font-semibold greatVibesText mt-3 leading-[39px]">
            Corporate Concierges
          </h2>
          <p className="font-normal leading-[25px]">
            Time is a precious resource that we all seem to fall short on!
            Experience the professional luxury touch, Let’s help you manage
            activities while you get on the go and stay connected with other
            business of the day. We offer bespoke concierge solutions for
            businessmen, entrepreneurs, contractors, and many more.
          </p>
          <Link
            to="/"
            className="h-12 p-3 bg-shuttlelanePurple hover:text-shuttlelanePurple hover:border-[.5px] hover:border-shuttlelanePurple transition-all hover:bg-transparent visited:text-white hover:no-underline visited:no-underline text-white rounded-lg text-sm lg:w-32 w-full inline-block flex justify-center items-center "
          >
            Book Now
          </Link>
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

export default ConciergePage;
