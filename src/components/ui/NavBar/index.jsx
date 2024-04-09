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
import DropdownItem from "../DropdownItem";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

function NavBar(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navClass, setNavClass] = useState("");
  const [navClass2, setNavClass2] = useState("");

  const [{ x, y }, scrollTo] = useWindowScroll();

  return (
    <div className="relative z-[30]">
      <div className={`rec ${navClass} bg-shuttlelanePurple`}></div>
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

          <ul className="flex flex-col w-full gap-y-4">
            <li className="w-full">
              <DropdownItem
                dropdownTitle="About Us"
                dropdownList={
                  <>
                    <Link
                      to="/company/about-shuttlelane"
                      className="w-full py-3 px-5 inline-block transition-all hover:text-xl text-shuttlelaneBlack visited:text-shuttlelaneBlack hover:text-shuttlelaneBlack hover:no-underline"
                    >
                      About Shuttlelane
                    </Link>
                    <Link
                      to="/company/who-we-are"
                      className="w-full py-3 px-5 inline-block transition-all hover:text-xl text-shuttlelaneBlack visited:text-shuttlelaneBlack hover:text-shuttlelaneBlack hover:no-underline"
                    >
                      Who We Are
                    </Link>
                    <Link
                      to="/company/partnership"
                      className="w-full py-3 px-5 inline-block transition-all hover:text-xl text-shuttlelaneBlack visited:text-shuttlelaneBlack hover:text-shuttlelaneBlack hover:no-underline"
                    >
                      Partnership
                    </Link>
                    <Link
                      to="/company/blog"
                      className="w-full py-3 px-5 inline-block transition-all hover:text-xl text-shuttlelaneBlack visited:text-shuttlelaneBlack hover:text-shuttlelaneBlack hover:no-underline"
                    >
                      Blog
                    </Link>
                  </>
                }
              />
            </li>
            <li className="w-full">
              <DropdownItem
                dropdownTitle="Services"
                dropdownList={
                  <>
                    <Link
                      to="/services/airport-transfer"
                      className="w-full py-3 px-5 inline-block transition-all hover:text-xl text-shuttlelaneBlack visited:text-shuttlelaneBlack hover:text-shuttlelaneBlack hover:no-underline"
                    >
                      Airport Transfer
                    </Link>
                    <Link
                      to="/services/car-rental"
                      className="w-full py-3 px-5 inline-block transition-all hover:text-xl text-shuttlelaneBlack visited:text-shuttlelaneBlack hover:text-shuttlelaneBlack hover:no-underline"
                    >
                      Car Rental
                    </Link>
                    <Link
                      to="/services/priority-pass"
                      className="w-full py-3 px-5 inline-block transition-all hover:text-xl text-shuttlelaneBlack visited:text-shuttlelaneBlack hover:text-shuttlelaneBlack hover:no-underline"
                    >
                      Priority Pass
                    </Link>
                    <Link
                      to="/services/visa-on-arrival"
                      className="w-full py-3 px-5 inline-block transition-all hover:text-xl text-shuttlelaneBlack visited:text-shuttlelaneBlack hover:text-shuttlelaneBlack hover:no-underline"
                    >
                      Visa On Arrival
                    </Link>
                    <Link
                      to="/services/shuttlelane-concierge"
                      className="w-full py-3 px-5 inline-block transition-all hover:text-xl text-shuttlelaneBlack visited:text-shuttlelaneBlack hover:text-shuttlelaneBlack hover:no-underline"
                    >
                      Shuttlelane Concierge
                    </Link>
                    <Link
                      to="/services/corporate-travel"
                      className="w-full py-3 px-5 inline-block transition-all hover:text-xl text-shuttlelaneBlack visited:text-shuttlelaneBlack hover:text-shuttlelaneBlack hover:no-underline"
                    >
                      Corporate Travel
                    </Link>
                    <Link
                      to="/services/wedding-services"
                      className="w-full py-3 px-5 inline-block transition-all hover:text-xl text-shuttlelaneBlack visited:text-shuttlelaneBlack hover:text-shuttlelaneBlack hover:no-underline"
                    >
                      Wedding Services
                    </Link>
                  </>
                }
              />
            </li>
            <li className="w-full">
              <DropdownItem
                dropdownTitle="Become A Partner"
                dropdownList={
                  <>
                    <Link
                      to="/services/airport-transfer"
                      className="w-full py-3 px-5 inline-block transition-all hover:text-xl text-shuttlelaneBlack visited:text-shuttlelaneBlack hover:text-shuttlelaneBlack hover:no-underline"
                    >
                      Drive For Shuttlelane
                    </Link>
                    <Link
                      to="/services/fleet-management"
                      className="w-full py-3 px-5 inline-block transition-all hover:text-xl text-shuttlelaneBlack visited:text-shuttlelaneBlack hover:text-shuttlelaneBlack hover:no-underline"
                    >
                      Fleet Management
                    </Link>
                  </>
                }
              />
            </li>
            <li className="w-full">
              <Link
                to="/booking/track-booking"
                className="text-xl w-full py-3 inline-block transition-all hover:text-2xl text-shuttlelaneBlack visited:text-shuttlelaneBlack hover:text-shuttlelaneBlack hover:no-underline"
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
            <div className="hidden lg:flex flex-row gap-x-4 px-7 lg:px-24 items-center">
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

            <div className="lg:hidden">
              <Slide
                transitionDuration={500}
                pauseOnHover={true}
                duration={3000}
              >
                <div className="flex items-center gap-x-1 w-full justify-center">
                  <BiLogoGmail size={14} className="text-red-400" />
                  <Link
                    to="mailto:@info@shuttlelane.com"
                    className="font-light text-xs lg:text-sm text-shuttlelaneBlack hover:no-underline hover:text-shuttlelaneBlack"
                  >
                    info@shuttlelane.com
                  </Link>
                </div>

                <div className="flex items-center gap-x-1 w-full justify-center">
                  <BiSolidPhone size={14} className="text-blue-600" />
                  <Link
                    to="tel:+2349030009452"
                    className="font-light text-xs lg:text-sm text-shuttlelaneBlack hover:no-underline hover:text-shuttlelaneBlack"
                  >
                    +234 903 000 9452
                  </Link>
                </div>

                <div className="flex items-center gap-x-1 w-full justify-center">
                  <IoLogoWhatsapp size={14} className="text-green-600" />
                  <Link
                    to="tel:+2349030009108"
                    className="font-light text-xs lg:text-sm text-shuttlelaneBlack hover:no-underline hover:text-shuttlelaneBlack"
                  >
                    +234 903 000 9108
                  </Link>
                </div>
              </Slide>
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
