// @ts-nocheck
import React, { useRef, useState } from "react";
import NavBar from "../../../components/ui/NavBar";
import Typewriter from "typewriter-effect";
import {
  MdArrowRightAlt,
  MdOutlineLuggage,
  MdOutlineMarkUnreadChatAlt,
  MdOutlineModeOfTravel,
} from "react-icons/md";
import {
  AiFillPhone,
  AiOutlineCheckCircle,
  AiOutlineClose,
  AiOutlineSafety,
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
import { BsPersonCheck } from "react-icons/bs";
import { HiOutlineCheckBadge } from "react-icons/hi2";
import { Helmet } from "react-helmet";
import WhatsappIcon from "../../../components/ui/WhatsappIcon";

function AboutPage() {
  const howItWorksRef = useRef(null);
  const moreAboutUsRef = useRef(null);

  const [isMenuHidden, setIsMenuHidden] = useState(false);
  return (
    <div className="relative bg-white">
      <Helmet>
        <title>About Us | Shuttlelane</title>
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
                Company
              </h2>
              <ul className="text-xs flex flex-col gap-y-1">
                <li className="py-3 px-5 bg-shuttlelanePurple text-white">
                  <Link
                    to="/company/about-shuttlelane"
                    className="inline-block w-full hover:no-underline visited:no-underline hover:text-white visited:text-white text-white"
                  >
                    About Shuttlelane
                  </Link>
                </li>
                <li className="py-3 px-5">
                  <Link
                    to="/company/who-we-are"
                    className="inline-block w-full hover:no-underline visited:no-underline hover:text-shuttlelaneBlack visited:text-shuttlelaneBlack text-shuttlelaneBlack"
                  >
                    Who We Are
                  </Link>
                </li>
                <li className="py-3 px-5">
                  <Link
                    to="/company/partnership"
                    className="inline-block w-full hover:no-underline visited:no-underline hover:text-shuttlelaneBlack visited:text-shuttlelaneBlack text-shuttlelaneBlack"
                  >
                    Become a Partner
                  </Link>
                </li>
                <li className="py-3 px-5">
                  <Link
                    to="/company/get-in-touch"
                    className="inline-block w-full hover:no-underline visited:no-underline hover:text-shuttlelaneBlack visited:text-shuttlelaneBlack text-shuttlelaneBlack"
                  >
                    Get In Touch
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
      <WhatsappIcon pageHasFloatingIcon={true} />

      <div className="fixed w-full z-20">
        <NavBar isPurpleLogo={false} />
      </div>

      {/* About Shuttlelane */}
      <div
        className="px-8 relative lg:px-24 py-32 pt-44 min-h-screen flex items-center justify-center experienceBg"
        ref={howItWorksRef}
      >
        <div className="flex relative z-10 lg:flex-row flex-col lg:justify-between lg:items-center">
          <div className="flex flex-col gap-y-5 lg:w-[100%] w-full">
            <div className="">
              <div className="text-white">
                <h3 className="text-3xl lg:text-6xl text-center font-semibold mt-3 leading-[39px]">
                  About Shuttlelane
                </h3>
                <div className="flex flex-col text-center gap-y-2 leading-[22px] mt-3 lg:max-w-3xl">
                  <p className="text-lg font-normal">
                    At Shuttlelane, we give you the best of executive airport
                    services. Because we are committed to enriching your travel
                    experiences, we always make sure that you get unique
                    standard services from us.
                  </p>
                  <p className="text-lg">
                    Our focus at Shuttlelane is simple – to give you
                    comfortable, safe airport taxi. And, we do this by putting
                    quality services and customer satisfaction first.
                  </p>
                  <p className="text-lg">
                    Take your time to enjoy our finest customer-centered
                    services because you deserve only the best.
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

      {/* Our Experience */}
      <div ref={moreAboutUsRef} className="px-8 lg:px-24 py-20 ">
        {/* <Fade direction="up" duration={500}> */}

        <div className="flex justify-center text-center items-center">
          <div className="flex flex-col gap-y-5 lg:w-[55%] w-full">
            <div className="flex text-shuttlelaneBlack flex-col justify-center text-center">
              <h2 className="text-3xl text-center font-semibold mt-3 leading-[39px]">
                Our Experience
              </h2>
              <h4 className="text-sm text-center font-normal">
                Our experience in what we do is impeccable
              </h4>
            </div>
            <p className="text-md text-center">
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
        className="relative px-8 lg:px-24 py-20 bg-[#F7F6FF] text-center"
        ref={howItWorksRef}
      >
        <div className="absolute overflow-hidden top-0 left-0 w-full h-full">
          <img
            src={arrowAsset}
            className="object-cover w-full h-full opacity-40"
          />
        </div>

        <div className="flex lg:flex-row-reverse flex-col lg:justify-between lg:items-center">
          <div className="flex flex-col gap-y-5 w-full">
            <div className="flex flex-col justify-center text-center text-white">
              <h2 className="text-3xl text-shuttlelaneBlack text-center font-semibold mt-3 leading-[39px]">
                Our Unique Selling Point
              </h2>
              <h4 className="text-sm font-normal text-center text-shuttlelaneBlack">
                Dealing with us gives you:
              </h4>
            </div>

            <div className="mt-10">
              <div className="flex  rounded-lg justify-center gap-x-10 items-center flex-wrap gap-y-10">
                <div className="md:max-w-[300px] h-[200px] px-10 w-full justify-center rounded-lg bg-shuttlelanePurple flex flex-col items-center text-center gap-y-3">
                  <div className="h-12 w-12 rounded-full shadow-[#4540cf85] text-shuttlelanePurple font-semibold shadow-md flex items-center justify-center bg-white">
                    <AiOutlineSafety size={24} />
                  </div>

                  <p className="text-md text-white">
                    Unparalleled safety and comfort.
                  </p>
                </div>
                <div className="md:max-w-[300px] h-[200px] px-10 w-full justify-center rounded-lg bg-shuttlelanePurple flex flex-col items-center text-center gap-y-3">
                  <div className="h-12 w-12 rounded-full shadow-[#4540cf85] text-shuttlelanePurple font-semibold shadow-md flex items-center justify-center bg-white">
                    <BiTimer size={28} />
                  </div>

                  <p className="text-md text-white">
                    Punctual and responsive service delivery.
                  </p>
                </div>
                <div className="md:max-w-[300px] h-[200px] px-10 w-full justify-center rounded-lg bg-shuttlelanePurple flex flex-col items-center text-center gap-y-3">
                  <div className="h-12 w-12 rounded-full shadow-[#4540cf85] text-shuttlelanePurple font-semibold shadow-md flex items-center justify-center bg-white">
                    <MdOutlineMarkUnreadChatAlt size={24} />
                  </div>

                  <p className="text-md text-white">
                    Timely communication via email and text.
                  </p>
                </div>
                <div className="md:max-w-[300px] h-[200px] px-10 w-full justify-center rounded-lg bg-shuttlelanePurple flex flex-col items-center text-center gap-y-3">
                  <div className="h-12 w-12 rounded-full shadow-[#4540cf85] text-shuttlelanePurple font-semibold shadow-md flex items-center justify-center bg-white">
                    <BsPersonCheck
                      size={23}
                      className="text-shuttlelanePurple"
                    />
                  </div>

                  <p className="text-md text-white">
                    Empathetic and professional Chauffer.
                  </p>
                </div>
                <div className="md:max-w-[300px] h-[200px] px-10 w-full justify-center rounded-lg bg-shuttlelanePurple flex flex-col items-center text-center gap-y-3">
                  <div className="h-12 w-12 rounded-full shadow-[#4540cf85] text-shuttlelanePurple font-semibold shadow-md flex items-center justify-center bg-white">
                    <HiOutlineCheckBadge size={24} />
                  </div>

                  <p className="text-md text-white">
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

export default AboutPage;
