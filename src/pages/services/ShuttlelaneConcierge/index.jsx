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
import Footer from "../../../components/ui/Footer";

// Images
import arrowAsset from "../../../assets/images/arrow-asset.svg";
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
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import { Fade } from "react-awesome-reveal";
import Carousel from "re-carousel";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import { Helmet } from "react-helmet";

// Images
import personalConcierge from "../../../assets/images/concierge/personal-concierge.jpg";
import corporateConcierge from "../../../assets/images/concierge/corporate-concierge.jpg";
import WhatsappIcon from "../../../components/ui/WhatsappIcon";

function ConciergePage() {
  const howItWorksRef = useRef(null);
  const moreAboutUsRef = useRef(null);

  const [isMenuHidden, setIsMenuHidden] = useState(false);
  return (
    <ParallaxProvider>
      <div className="relative bg-white" data-scroll-section>
        <Helmet>
          <title>Shuttlelane: Concierge Services</title>
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
        {!isMenuHidden && <WhatsappIcon pageHasFloatingIcon={true} />}

        {/* Navbar */}
        <div className="fixed w-full z-20">
          <NavBar isPurpleLogo={false} />
        </div>

        {/* Concierge */}
        <div
          className="px-8 relative lg:px-24 py-32 overflow-hidden pt-44 min-h-screen flex items-center justify-center conciergeBg"
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

          <div className="absolute bottom-0 w-full flex justify-center items-center">
            <Parallax
              speed={6}
              translateX={["500px", "-500px"]}
              translateY={["0px", "0px"]}
            >
              <p className="text-[5rem] lg:text-[10rem] text-center break-words whitespace-nowrap text-white spaceGroteskText opacity-40">
                SHUTTLELANE CONCIERGE
              </p>
            </Parallax>
          </div>
        </div>

        {/* Personal Concierges */}
        <div
          className="lg:h-screen h-[60vh] mt-10 lg:mt-0 px-7 py-20 pb-10 lg:pb-0 lg:py-0 lg:px-0 flex bg-white justify-between"
          ref={moreAboutUsRef}
        >
          <div className="lg:w-[50%] bg-red-400 h-scrreen hidden lg:inline-block">
            <img
              src={personalConcierge}
              alt="Personal Concierge Services"
              className="w-full h-full object-cover relative z-[2]"
            />
          </div>

          <div className="lg:w-[50%] w-full h-full justify-center gap-y-4 lg:pl-7 lg:pr-24 flex text-shuttlelaneBlack flex-col lg:text-left text-center">
            <Fade duration={500}>
              <Parallax speed={6}>
                <h2 className="text-3xl lg:text-5xl greatVibesText font-semibold mt-3 leading-[39px]">
                  Personal Concierges
                </h2>
              </Parallax>
              <Parallax speed={6}>
                <p className="font-normal leading-[25px]">
                  Get the life is good feelings - Our team of local personal
                  concierges will help connect you to what you enjoy most. And,
                  enhance your quality of life with confidential &amp; discreet
                  luxury lifestyle management that helps alleviate demands on
                  your time.
                </p>
              </Parallax>

              <Parallax speed={6}>
                <Link
                  to="/companies/get-in-touch"
                  className="h-12 p-3 bg-shuttlelanePurple hover:text-shuttlelanePurple hover:border-[.5px] hover:border-shuttlelanePurple transition-all hover:bg-transparent visited:text-white hover:no-underline visited:no-underline text-white rounded-lg text-sm lg:w-32 w-full inline-block flex justify-center items-center "
                >
                  Make Enquiry
                </Link>
              </Parallax>
            </Fade>
          </div>
        </div>

        {/* Corporate Concierge */}
        <div className="lg:h-screen h-[60vh] lg:mt-0 px-7 pb-10 lg:px-0 lg:pb-0 flex lg:flex-row-reverse bg-white justify-between">
          <div className="lg:w-[50%] bg-red-400 h-scrreen hidden lg:inline-block">
            <img
              src={corporateConcierge}
              alt="Corporate Concierge Services"
              className="w-full h-full object-cover relative z-[2]"
            />
          </div>

          <div className="lg:w-[50%] w-full h-full justify-center gap-y-4 lg:pr-7 lg:pl-24 flex text-shuttlelaneBlack flex-col lg:text-left text-center">
            <Fade duration={500}>
              <Parallax speed={6}>
                <h2 className="text-3xl lg:text-5xl font-semibold greatVibesText mt-3 leading-[39px]">
                  Corporate Concierges
                </h2>
              </Parallax>

              <Parallax speed={6}>
                <p className="font-normal leading-[25px]">
                  Time is a precious resource that we all seem to fall short on!
                  Experience the professional luxury touch, Let’s help you
                  manage activities while you get on the go and stay connected
                  with other business of the day. We offer bespoke concierge
                  solutions for businessmen, entrepreneurs, contractors, and
                  many more.
                </p>
              </Parallax>

              <Parallax speed={6}>
                <Link
                  to="/"
                  className="h-12 p-3 bg-shuttlelanePurple hover:text-shuttlelanePurple hover:border-[.5px] hover:border-shuttlelanePurple transition-all hover:bg-transparent visited:text-white hover:no-underline visited:no-underline text-white rounded-lg text-sm lg:w-32 w-full inline-block flex justify-center items-center "
                >
                  Book Now
                </Link>
              </Parallax>
            </Fade>
          </div>
        </div>

        <div className="min-h-screen py-20 bg-white text-shuttlelaneBlack relative overflow-hidden gap-y-5 flex flex-col justify-center items-center px-7 text-center lg:px-24">
          <Fade direction="up" duration={700}>
            <h2 className="text-4xl lg:text-[5rem] font-normal leading-[75px]">
              Achieve it when and where you need it most!
            </h2>
          </Fade>

          <Fade duration={1000}>
            <div className="">
              <p className="text-lg">
                Access the power to multiply your time while achieving desired
                result. We help you win back your time, improve your lifestyle,
                enhance business productivity, performance, and opportunities.
              </p>

              <p className="text-lg">
                We never stop bringing seamless and excellence in concierge
                services to personal lifestyle and corporate world. And we have
                the appetite to always do more!
              </p>
            </div>
          </Fade>
        </div>

        <div className="">
          <Fade direction="up" duration={300}>
            <div className="flex items-center flex-col md:flex-row text-center md:text-left">
              <div className="flex flex-col passengerSafetyBg bg-opacity-90 text-white h-[250px] p-5 py-10 gap-y-2 lg:w-1/3 w-full">
                <h3 className="text-xl font-semibold">Chauffeur Service</h3>
                <p className="text-sm">
                  Get to your destination safely and on time. Stay stress-free;
                  let us take care of the driving. We offer a top-notch
                  experience from start to the end of your trip. Our luxury
                  chauffeur car hire service is extremely customized to meet
                  your needs.
                </p>
              </div>
              <div className="flex flex-col privateJetBg bg-opacity-90 text-white h-[250px] p-5 py-10 gap-y-2 lg:w-1/3 w-full">
                <h3 className="text-xl font-semibold">Private Jet Charter</h3>
                <p className="text-sm">
                  Shuttlelane Concierge provides a high level of safety,
                  convenience, and confidential private jet charter services.
                  Get anywhere in the world at any-time you want, without
                  stressful airline check-ins or any delays. Enjoy the comfort
                  and experience the difference.
                </p>
              </div>
              <div className="flex flex-col helicopterBg bg-opacity-90 text-white h-[250px] p-5 py-10 gap-y-2 lg:w-1/3 w-full">
                <h3 className="text-xl font-semibold">Helicopter Charter</h3>
                <p className="text-sm">
                  Helicopter Charter that guarantees safety and effective use of
                  time. We customized airlifts for corporate and government
                  agencies, business clients, sightseeing enthusiasts, and
                  couples enjoying weekend retreats. We cover it all.
                </p>
              </div>
            </div>
          </Fade>

          <Fade direction="up" duration={300}>
            <div className="flex items-center w-full flex-col md:flex-row text-center md:text-left">
              <div className="flex flex-col yatchBg bg-opacity-90 text-white h-[250px] p-5 py-10 gap-y-2 lg:w-1/3 w-full">
                <h3 className="text-xl font-semibold">Yachts service</h3>
                <p className="text-sm">
                  Cruise trips are one of the most memorable. Tourists enjoy an
                  exclusive lifestyle, unforgettable stunning views, an
                  astonished sea breeze, and more. Cruise with Shuttlelane
                  Concierge yacht services and enjoy the best of service on the
                  wide ocean.
                </p>
              </div>
              <div className="flex flex-col villaBg bg-opacity-90 text-white h-[250px] p-5 py-10 gap-y-2 lg:w-1/3 w-full">
                <h3 className="text-xl font-semibold">Villas & Suites</h3>
                <p className="text-sm">
                  Villas &amp; suites filled with elegant features and modern
                  convenience in one of your most desirable locations. We place
                  you right where you want. Discover your next luxurious villa
                  &amp; suite that meets your lifestyle and fits your budget.
                </p>
              </div>
              <div className="flex flex-col luxuryHotelsBg bg-opacity-90 text-white h-[250px] p-5 py-10 gap-y-2 lg:w-1/3 w-full">
                <h3 className="text-xl font-semibold">Luxury Hotels</h3>
                <p className="text-sm">
                  Helping you find and book all-inclusive luxury hotels where
                  views do the talking. Perfect for honeymoons, romantic
                  vacations, tours, and business trips. Gain access to exclusive
                  VIP treatment that fits your budget through Shuttlelane
                  Concierge
                </p>
              </div>
            </div>
          </Fade>

          <Fade direction="up" duration={300}>
            <div className="flex items-center flex-col-reverse md:flex-row-reverse text-center md:text-left">
              <div className="flex flex-col personalShoppingBg bg-opacity-90 text-white h-[250px] p-5 py-10 gap-y-2 lg:w-1/3 w-full">
                <h3 className="text-xl font-semibold">
                  Personal Shopping Concierge
                </h3>
                <p className="text-sm">
                  Too busy to find time to shop? Allow us to do the shopping for
                  you. Wherever you are in the world, we can help you secure the
                  most sought-after pieces you need. Our global network allows
                  us to accommodate any errand service or concierge request
                  worldwide.
                </p>
              </div>
              <div className="flex flex-col propertyBg bg-opacity-90 text-white h-[250px] p-5 py-10 gap-y-2 lg:w-1/3 w-full">
                <h3 className="text-xl font-semibold">Property Management</h3>
                <p className="text-sm">
                  Our property management concierge services create efficient
                  real estate experiences between property owners and modern
                  tenants. We maintain your properties, maximize cash flow, and
                  enhance concierge services to fit the exact needs of modern
                  tenants.
                </p>
              </div>
              <div className="flex flex-col restaurantBg bg-opacity-90 text-white h-[250px] p-5 py-10 gap-y-2 lg:w-1/3 w-full">
                <h3 className="text-xl font-semibold">Restaurant & Bar</h3>
                <p className="text-sm">
                  Enjoy special moments in a true culinary delight and
                  experience an unforgettable night in the club. Shuttlelane
                  Concierge sources satisfying restaurants and bars where you
                  get a variety of cuisine and fine-dining that exceeds your
                  desired taste.
                </p>
              </div>
            </div>
          </Fade>
        </div>

        {/* About us */}
        <div className="px-8 lg:px-24 overflow-hidden text-white bg-shuttlelaneLightPurple min-h-[70vh] py-20 relative">
          <div className="absolute overflow-hidden top-0 left-0 w-full h-full">
            <img
              src={arrowAsset}
              className="object-cover w-full h-full opacity-30"
            />
          </div>

          <Fade direction="up" duration={800}>
            <div className="w-full flex flex-col text-shuttlelaneBlack">
              <h2 className="text-3xl font-semibold mt-3 max-w-xl leading-[39px]">
                About Us
              </h2>
            </div>
          </Fade>

          <p className="lg:max-w-5xl text-shuttlelaneBlack">
            With a humble beginning, Shuttlelane Concierge has transformed into
            a high demanding Concierge services worldwide. Our core aim is to
            assist our clients anywhere in the world with lifestyle management.
            We offer a variety of luxury concierge services that enable our
            clients to manage their time and achieve greater results. Our vetted
            team of lifestyle managers focuses on the needs of our clients,
            helping them save time and making life easy and convenient.
          </p>

          <p className="lg:max-w-5xl text-shuttlelaneBlack">
            Here are the core principles that guide our work:
          </p>

          <ol className="list-decimal text-shuttlelaneBlack ml-10 mt-5 lg:max-w-5xl flex flex-col gap-y-3">
            <li>
              <p className="font-semibold">Vetted Team</p>
              <div className="">
                <p>
                  Shuttlelane Concierge works in collaboration with trusted
                  locals all over the world who have first-hand experience with
                  Concierge services and lifestyle management. With this, we are
                  able to blend our client concierge requests with local
                  expertise to create a memorable experience with our services.
                </p>
              </div>
            </li>
            <li>
              <p className="font-semibold">Duty Commitment</p>
              <div className="">
                <p>
                  We save you time and deliver the best lifestyle management.
                  When you need someone to be there for you, we are with you all
                  the way. Shuttlelane Concierge offers you support anytime and
                  anywhere you call us. Our clients feedback are overwhelming
                  each time they hire our services.
                </p>
              </div>
            </li>
            <li>
              <p className="font-semibold">Creativity & Confidentiality</p>
              <div className="">
                <p>
                  The ability of our lifestyle managers to think outside the
                  box, promptly, and creatively resolve complex tasks in the
                  most discreet and confidential manner makes us stand out.
                  Creative thinking leads to outstanding solutions, which brings
                  good experience. We continue to put a smile on our client's
                  faces by solving their most challenging needs.
                </p>
              </div>
            </li>
          </ol>
        </div>

        {/* How To Reach Us */}
        <HowToReachUs />
        <PaymentPartners />
        <Footer />
      </div>
    </ParallaxProvider>
  );
}

export default ConciergePage;
