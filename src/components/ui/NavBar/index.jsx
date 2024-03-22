import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { IoLogoWhatsapp, IoMenuOutline } from "react-icons/io5";
import { VscClose } from "react-icons/vsc";
import { useState } from "react";
import NavLink from "./NavLink";

// Logos
import ShuttlelaneLogoWhite from "../../../assets/logos/shuttlelane-white.png";
import ShuttlelaneLogoColored from "../../../assets/logos/logo.png";
import { Fade } from "react-awesome-reveal";
import { useWindowScroll } from "@uidotdev/usehooks";
import { BiLogoGmail, BiSolidPhone } from "react-icons/bi";

function NavBar(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navClass, setNavClass] = useState("");
  const [navClass2, setNavClass2] = useState("");

  const [{ x, y }, scrollTo] = useWindowScroll();

  return (
    <div className="relative z-[30]">
      <div className={`rec ${navClass} bg-[#E6C061]`}></div>
      <div className={`rec2 ${navClass2}`}>
        <nav className="lg:hidden relative z-[40] w-full min-h-screen flex flex-col gap-y-12 items-start bg-white py-4 px-8 pl-14 drop-shadow-sm">
          <div className="flex justify-end w-full relative top-4 -right-5">
            <VscClose
              size={26}
              className="cursor-pointer"
              onClick={() => {
                setNavClass("animateFirstRecReverse");
                setNavClass2("animateSecondRecReverse");
              }}
            />
          </div>

          <ul className="flex flex-col w-full gap-y-7">
            <li className="w-full">
              <Link
                to="/company/about-us"
                className="text-xl w-full py-3 px-5 inline-block transition-all hover:text-2xl"
              >
                About Us
              </Link>
            </li>
            <li className="w-full">
              <Link
                to=""
                className="text-xl w-full py-3 px-5 inline-block transition-all hover:text-2xl"
              >
                Services
              </Link>
            </li>
            <li className="w-full">
              <Link
                to=""
                className="text-xl w-full py-3 px-5 inline-block transition-all hover:text-2xl"
              >
                Become a partner
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="/booking/track-booking"
                className="text-xl w-full py-3 px-5 inline-block transition-all hover:text-2xl"
              >
                Track booking
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* NavBar */}
      <Fade duration={700} delay={70}>
        <div className="">
          <div
            className={`transition-all bg-[#F7F6FF] w-full h-5 ${
              y > 5 || props?.isPurpleLogo ? "block" : "hidden"
            }`}
          >
            <div className="flex flex-row gap-x-4 px-7 lg:px-24 items-center">
              <div className="flex items-center gap-x-1">
                <BiLogoGmail size={14} className="text-red-400" />
                <Link
                  to="mailto:@info@shuttlelane.com"
                  className="font-light text-xs lg:text-sm text-shuttlelaneBlack hover:no-underline hover:text-shuttlelaneBlack"
                >
                  info@shuttlelane.com
                </Link>
              </div>

              <div className="flex items-center gap-x-1">
                <BiSolidPhone size={14} className="text-blue-600" />
                <Link
                  to="tel:+2349030009452"
                  className="font-light text-xs lg:text-sm text-shuttlelaneBlack hover:no-underline hover:text-shuttlelaneBlack"
                >
                  +234 903 000 9452
                </Link>
              </div>

              <div className="flex items-center gap-x-1">
                <IoLogoWhatsapp size={14} className="text-green-600" />
                <Link
                  to="tel:+2349030009108"
                  className="font-light text-xs lg:text-sm text-shuttlelaneBlack hover:no-underline hover:text-shuttlelaneBlack"
                >
                  +234 903 000 9108
                </Link>
              </div>
            </div>
          </div>
          <nav
            className={`flex justify-between ${
              y > 5 || props?.isPurpleLogo
                ? "bg-white text-shuttlelaneBlack"
                : "text-white"
            } items-center transition-all duration-700 py-5 px-8 lg:px-24 drop-shadow-sm`}
          >
            <Link to="/" className="">
              {y > 5 || props?.isPurpleLogo ? (
                <img
                  src={ShuttlelaneLogoColored}
                  className="object-contain w-36"
                />
              ) : (
                <img
                  src={ShuttlelaneLogoWhite}
                  className="object-contain w-36"
                />
              )}
            </Link>
            <ul className="hidden lg:flex items-center md:gap-x-12 mb-0">
              <NavLink
                title="About Us"
                isPurpleLogo={props?.isPurpleLogo}
                y={y}
                linkHeading="company"
                subLinks={[
                  "About Shuttlelane",
                  "Who We Are",
                  "Partnership",
                  "Blog",
                ]}
              />
              <NavLink
                title="Services"
                isPurpleLogo={props?.isPurpleLogo}
                y={y}
                linkHeading="services"
                subLinks={[
                  "Airport Transfer",
                  "Car Rental",
                  "Priority Pass",
                  "Visa On Arrival",
                  "Shuttlelane Concierge",
                  "Corporate Travel",
                  "Wedding Services",
                ]}
              />

              <NavLink
                title="Become A Partner"
                isPurpleLogo={props?.isPurpleLogo}
                y={y}
                linkHeading="partnership"
                subLinks={["Drive For Shuttlelane", "Fleet Management"]}
              />

              <li>
                <Link
                  to="/booking/track-booking"
                  className={`text-sm hover:no-underline hover:text-gray-200 transition-colors ${
                    y > 5 || props?.isPurpleLogo
                      ? "text-shuttlelaneBlack"
                      : "text-white"
                  }`}
                >
                  Track booking
                </Link>
              </li>
            </ul>

            <div className="inline-block lg:hidden">
              {/* <IoMenuOutline
              size={26}
              className="cursor-pointer btn"
                onClick={() => setIsMenuOpen(true)}
            /> */}
              <IoMenuOutline
                size={26}
                className="cursor-pointer btn"
                onClick={() => {
                  setNavClass("animateFirstRec");
                  setNavClass2("animateSecondRec");
                  console.log("Hi");
                }}
              />
            </div>
          </nav>
        </div>
      </Fade>
    </div>
  );
}

export default NavBar;
