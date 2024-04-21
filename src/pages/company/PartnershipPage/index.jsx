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
import WhatsappIcon from "../../../components/ui/WhatsappIcon";

function PartnershipPage() {
  const howItWorksRef = useRef(null);
  const moreAboutUsRef = useRef(null);

  const [isMenuHidden, setIsMenuHidden] = useState(false);
  return (
    <div className="relative bg-white">
      <Helmet>
        <title>Partnership | Shuttlelane</title>
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
                <li className="py-3 px-5">
                  <Link
                    to="/company/about-shuttlelane"
                    className="inline-block w-full hover:no-underline visited:no-underline hover:text-shuttlelaneBlack visited:text-shuttlelaneBlack text-shuttlelaneBlack"
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
                <li className="py-3 px-5 bg-shuttlelanePurple text-white">
                  <Link
                    to="/company/partnership"
                    className="inline-block w-full hover:no-underline visited:no-underline hover:text-white visited:text-white text-white"
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
        className="px-8 relative lg:px-24 py-32 pt-44 h-[100vh] w-full flex items-center justify-center becomeAPartnerBg"
        ref={howItWorksRef}
      >
        <div className="flex relative z-10 lg:flex-row flex-col lg:justify-between lg:items-center">
          <div className="flex flex-col gap-y-5 lg:w-[100%] w-full">
            <div className="">
              <div className="text-white">
                <h3 className="text-3xl lg:text-6xl text-center font-semibold mt-3 leading-[39px]">
                  Become A Partner
                </h3>
                <div className="flex flex-col text-center gap-y-3 leading-[22px] mt-3">
                  <p className="text-lg font-normal">
                    As a customer-oriented company constantly striving for
                    excellence, we are always on the lookout for opportunities
                    to expand our reach and more importantly, improving on the
                    quality of service rendered to our customers. We are open to
                    mutually beneficial partnerships in various capacities. If
                    you wish to partner with us, kindly choose the service that
                    applies to you below
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
                  <p className="text-sm">Choose service</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* More About Shuttlelane */}
      <div
        className="lg:min-h-[90vh] py-20 flex flex-col bg-shuttlelaneLightPurple gap-y-10 items-center justify-center"
        ref={moreAboutUsRef}
      >
        <div className="flex text-shuttlelaneBlack flex-col justify-center text-center">
          <h2 className="text-3xl text-center font-semibold mt-3 leading-[39px]">
            Become A Partner Today
          </h2>
          <h4 className="text-sm text-center font-normal">
            Sign up to become a partner
          </h4>
        </div>

        <div className="flex gap-x-10 flex-wrap gap-y-7 items-center flex-col md:flex-row text-center md:text-left">
          <Fade duration={500}>
            <div className="bg-white flex flex-col items-center shadow-lg rounded-lg overflow-hidden bg-opacity-90 text-shuttlelaneBlack h-[300px] md:w-[280px] w-full">
              <div className="w-full h-[60%]">
                <img
                  src={driveForShuttlelane}
                  alt="Drive For Shuttlelane"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="py-4 px-6 flex flex-col gap-y-2">
                <p className="text-lg font-semibold">Drive For Shuttlelane</p>
                <Link
                  to="/partnership/drive-for-shuttlelane"
                  className="h-12 p-3 bg-shuttlelanePurple hover:text-shuttlelanePurple hover:border-[.5px] hover:border-shuttlelanePurple transition-all hover:bg-transparent visited:text-white hover:no-underline visited:no-underline text-white rounded-lg text-sm w-full inline-block flex justify-center items-center "
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </Fade>
          <Fade duration={500}>
            <div className="bg-white flex flex-col items-center shadow-lg rounded-lg overflow-hidden bg-opacity-90 text-shuttlelaneBlack h-[300px] md:w-[280px] w-full">
              <div className="w-full h-[60%]">
                <img
                  src={fleetManagement}
                  alt="Fleet Management"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="py-4 px-6 flex flex-col gap-y-2">
                <p className="text-lg font-semibold">Fleet Management</p>
                <Link
                  to="/vendor/signup"
                  className="h-12 p-3 bg-shuttlelanePurple hover:text-shuttlelanePurple hover:border-[.5px] hover:border-shuttlelanePurple transition-all hover:bg-transparent visited:text-white hover:no-underline visited:no-underline text-white rounded-lg text-sm w-full inline-block flex justify-center items-center "
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </Fade>
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

export default PartnershipPage;
