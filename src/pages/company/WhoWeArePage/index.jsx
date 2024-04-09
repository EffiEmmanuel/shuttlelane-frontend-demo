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
import { Helmet } from "react-helmet";

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
} from "react-icons/bi";
import { FiArrowDown } from "react-icons/fi";
import PaymentPartners from "../../../components/ui/PaymentPartners";
import HowToReachUs from "../../../components/ui/HowToReachUs";
import WhatsappIcon from "../../../components/ui/WhatsappIcon";

function WhoWeArePage() {
  const howItWorksRef = useRef(null);
  const moreAboutUsRef = useRef(null);

  const [isMenuHidden, setIsMenuHidden] = useState(false);
  return (
    <div className="relative bg-white">
      <Helmet>
        <title>Who We Are | Shuttlelane</title>
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
                <li className="py-3 px-5 text-shuttlelaneBlack">
                  <Link
                    to="/company/about-shuttlelane"
                    className="inline-block w-full hover:no-underline visited:no-underline hover:text-shuttlelaneBlack visited:text-shuttlelaneBlack text-shuttlelaneBlack"
                  >
                    About Shuttlelane
                  </Link>
                </li>
                <li className="py-3 px-5 bg-shuttlelanePurple text-white">
                  <Link
                    to="/company/who-we-are"
                    className="inline-block w-full hover:no-underline visited:no-underline hover:text-white visited:text-white text-white"
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
                    to="/company/contact-us"
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
      {isMenuHidden && <WhatsappIcon pageHasFloatingIcon={true} />}

      <div className="fixed w-full z-20">
        <NavBar isPurpleLogo={true} />
      </div>

      {/* About Shuttlelane */}
      <div
        className="px-8 relative bg-shuttlelaneLightPurple lg:px-24 py-32 pt-44 h-[80vh] flex items-center justify-center"
        ref={howItWorksRef}
      >
        <div className="flex relative z-10 lg:flex-row flex-col lg:justify-between lg:items-center">
          <div className="flex flex-col gap-y-5 lg:w-[100%] w-full">
            <div className="">
              <div className="text-shuttlelaneBlack">
                <h3 className="text-3xl lg:text-6xl text-center font-semibold mt-3 leading-[39px]">
                  Our Unique Value System (UVS)
                </h3>
                <div className="flex flex-col text-center gap-y-3 leading-[22px] mt-3">
                  <p className="text-lg font-normal">
                    At Shuttlelane, our thought rests on satisfaction for our
                    clients, and to meet this, we prioritise:
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

      {/* More About Shuttlelane */}
      <div className="" ref={moreAboutUsRef}>
        {/* <Fade direction="up" duration={500}> */}

        <div className="flex items-center flex-col md:flex-row text-center md:text-left">
          <Fade duration={500}>
            <div className="flex flex-col customerServiceBg bg-opacity-90 text-white h-[250px] p-5 py-10 gap-y-2 lg:w-1/3 w-full">
              <h3 className="text-xl font-semibold">Customer Service</h3>
              <p className="text-sm">
                Shuttlelane is a customer-oriented company. We have ingrained in
                our chauffeurs the skills necessary to make every ride with us
                worth it. Our service can be personalized towards your
                individual needs and you shall be attended to anyhow you want.
                The chauffeur also assists you with your baggage and takes you
                to your intended destination safely.
              </p>
            </div>
          </Fade>
          <Fade duration={500}>
            <div className="flex flex-col communicationBg bg-opacity-90 text-white h-[250px] p-5 py-10 gap-y-2 lg:w-1/3 w-full">
              <h3 className="text-xl font-semibold">Communication</h3>
              <p className="text-sm">
                Our team is ready to talk to you every time. We can provide
                answers to all your inquiries. Do not hesitate to ask questions
                as we will be there to reply you eagerly.
              </p>
            </div>
          </Fade>
          <Fade duration={500}>
            <div className="flex flex-col reliabilityBg bg-opacity-90 text-white h-[250px] p-5 py-10 gap-y-2 lg:w-1/3 w-full">
              <h3 className="text-xl font-semibold">Reliability</h3>
              <p className="text-sm">
                You can always bank on us at Shuttlelane. We have a positive
                reputation of dishing out nothing short of quality to our
                clients. Our track record speaks volumes about our reliability
                and trustworthiness.
              </p>
            </div>
          </Fade>
        </div>
        <div className="flex items-center flex-col md:flex-row text-center md:text-left">
          <Fade duration={500}>
            <div className="flex flex-col passengerSafetyBg bg-opacity-90 text-white h-[250px] p-5 py-10 gap-y-2 lg:w-1/3 w-full">
              <h3 className="text-xl font-semibold">Passenger Safety</h3>
              <p className="text-sm">
                You don't need to fret anymore. You are guaranteed the utmost
                safety by dealing with us. We can take transport you from
                anywhere to the airport on time and with no hassles.
              </p>
            </div>
          </Fade>
          <Fade duration={500}>
            <div className="flex flex-col punctualityBg bg-opacity-90 text-white h-[250px] p-5 py-10 gap-y-2 lg:w-1/3 w-full">
              <h3 className="text-xl font-semibold">Punctuality</h3>
              <p className="text-sm">
                Shuttlelane doesn't do African time. We understand the value of
                time so we like to keep to it in all our dealings with you. We
                never disappoint.
              </p>
            </div>
          </Fade>
          <Fade duration={500}>
            <div className="flex flex-col luxuryBg bg-opacity-90 text-white h-[250px] p-5 py-10 gap-y-2 lg:w-1/3 w-full">
              <h3 className="text-xl font-semibold">Luxury</h3>
              <p className="text-sm">
                What do you want? Style? Elegance? Class? Our cars are
                embodiments of luxury and glamour. They are of good standard and
                shall give you a positive atmosphere unrivalled by none other.
              </p>
            </div>
          </Fade>
        </div>

        {/* </Fade> */}
      </div>

      {/* How To Reach Us */}
      <HowToReachUs />
      <PaymentPartners />
      <Footer />
    </div>
  );
}

export default WhoWeArePage;
